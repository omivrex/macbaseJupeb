import { collection, getDocs } from "firebase/firestore"
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { documentDirectory, EncodingType, readAsStringAsync, readDirectoryAsync, writeAsStringAsync } from "expo-file-system";
import { firestore } from "./firebaseInit";

export const getOnlineCollections = (collectionName = 'pastquestions', returnId) => {
    return new Promise((resolve, reject) => {
        const collectionData = []
        getDocs(collection(firestore, collectionName)).then((snapShot)=> {
            snapShot.forEach(doc => {
                if (returnId) {
                    const content = doc.data()
                    collectionData.push({data:content.Data, id:doc.id})
                } else {
                    collectionData.push(doc.data())
                }
            });
            resolve(collectionData)
        }).catch (err => {
            console.log(err)
            reject(err)
        })
    })
}

let finishFunc = null    
export const updateCourseData = (courseName, callback) => {
    let courseData = []
    return new Promise((resolve, reject) => { 
        const rootPath = `pastquestions/${courseName}/${courseName}`
        getOnlineCollections(rootPath).then(collectionData => {
            
            const promiseArray = []
            
            collectionData.forEach((data, index) => {
                let [label] = Object.values(data)
                data.data = []
                courseData.push(data)
                let currentPath = rootPath+`/${label}/${label}`
                console.log(currentPath)
                promiseArray.push(getSubCollections(currentPath, data, callback)
                .then(()=> {
                    index === collectionData.length-1 && Promise.allSettled(promiseArray) //the last item
                    .then(resolve).catch(err=> console.log(err))
                }))
            })
        }).catch(reject)
     })
}

const getSubCollections = async (path, parentObj) => {
    try {
        const data = await getOnlineCollections(path)

        parentObj.data = [...data]
        const questionPromises = []

        for (let index = 0; index < parentObj.data.length; index++) {
            const collection = parentObj.data[index];
            let [label] = Object.values(collection)
            let [key] = Object.keys(collection)
            let itemDataPath = path + `/${label}/${label}`
            key === 'questionNumber'? await getQuestionData(collection, itemDataPath).then(() => {
                (index === parentObj.data.length-1) && saveCourseData(parentObj.data, path)
            }).catch(err => console.log(err))
            : await getSubCollections(itemDataPath, collection)
        }

    } catch (error) {
        console.log(error)
    }
}

const getQuestionData = (question, path) => {
    return new Promise((resolve, reject) => {
        getOnlineCollections(path, true).then(([returned]) => {
            const {data} = returned
            question.data = data?{...data}:null
            resolve(question)
        }).catch(reject)
    })
}

const saveCourseData = (data, path) => {
    const fileName = documentDirectory+[... new Set(path.split('/'))].join('-')
    writeAsStringAsync(fileName, JSON.stringify(data, function replacer(key, value) { return value}), {encoding: EncodingType.UTF8}).then(()=> console.log('succesfully saved :', path)).catch(err=> console.log('error from saveCourseData: ', err))
}


// courseStorage.clearMapForKey({
//     key: 'course-data',
// })

// courseStorage.clearMapForKey('course-data');

export const getBranchData = (level, courseName = '') => {
    const levelLabels = ['course', 'year', 'section']
    return new Promise((resolve, reject) => {
        readDirectoryAsync(documentDirectory).then(dir=> {
            let fileNames = dir.filter(fileName => fileName.includes('pastquestions') && fileName.includes(courseName))
            .map(name=> name = name.split('-')[level+1])
            fileNames = ([... new Set(fileNames)])
            .map(name=> name = {[levelLabels[level]]: name})
            .sort((a,b)=> Object.values(a)[0]-Object.values(b)[0])
            resolve(fileNames)
        })
        .catch(err=> reject(err))
    })
}

export const getQuestionSelection = ({course, section, year}) => {
    return new Promise((resolve, reject) => { 
        const filePath = `pastquestions-${course.value}-${year.value}-${section.value}`
        readAsStringAsync(documentDirectory+filePath, {encoding: EncodingType.UTF8})
        .then(JSON.parse).then(resolve)
        .catch(err=> console.log('error reaading question data: ', err))
    })
}

export const getAllQuestionsInCourse = (course) => {
    console.log(course)
    const promiseArray = []
    let questions = []
    return new Promise((resolve, reject) => {
        getBranchData(1, course)
        .then(data => {
            console.log(data)
            const years = Object.values(data)
            years.forEach(({year})=> {
                promiseArray.push(
                    getQuestionSelection({
                        course: {value: course},
                        section: {value: 'Objective'}, 
                        year: {value: year}
                    })
                    .then(data=> questions.push(...data))
                )
            })
        }).then(() =>Promise.all(promiseArray))
        .finally(()=> questions.length && resolve(questions.filter(Boolean)))
        .catch(err=>{
            console.log('Error from getAllQuestionsInCourse', err)
            reject(err)
        });
    })
}

export const shuffleAndCutQuestions = (questionsArray, lengthToCut) => {
    const shuffledArray = questionsArray.sort(() => 0.5 - Math.random()).slice(0, lengthToCut)
    return shuffledArray
}

const testResultStorage = new Storage({
    storageBackend: AsyncStorage, // for web: window.localStorage
    defaultExpires: null,
    enableCache: false,
    sync: {
        update(courseName) {
            testResultStorage.save({
                id: courseName,
                key: 'test-result',
                data: [],
            })
        }
    }
})

// testResultStorage.remove({
//     key: 'test-data',
// });

export const loadResultData = courseName => {
    return new Promise((resolve, reject) => {
        testResultStorage.load({
            key: 'test-result',
            id: courseName,
            syncInBackground: true,
        }).then(returnedData=> {
            resolve(returnedData)
        }).catch(err=> {
            err.name==='NotFoundError'?
                testResultStorage.sync.update(courseName)
            :
            console.log(err)
            reject(err)
        })
    })
}

// loadResultData('PHYSICS')
export const loadAllTestData = () => {
    return new Promise((resolve, reject) => {
        const courseTests = {}
        testResultStorage.getIdsForKey('test-result').then(courses=> {
            courses.forEach((course, index) => {
                loadResultData(course).then(testResults => {
                    courseTests[course] = [...testResults]
                    index===courses.length-1&&resolve(courseTests)
                })
            });
        }).catch(reject)
    })
}

export const storeTestResult = ({courseName, ...remainingData}) => {
    return new Promise((resolve, reject) => {
        console.log(courseName, remainingData)
        loadResultData(courseName).then(testData => {
            testResultStorage.save({
                id: courseName,
                key: 'test-result',
                data: testData?testData.concat({time: new Date().getTime(), courseName, ...remainingData}):[remainingData],
            })
        }).finally(resolve).catch(reject)
    })
}

export const resetTestData = (courseName) => {
    return new Promise((resolve, reject) => {
        loadResultData(courseName).then(testData => {
            testResultStorage.save({
                id: courseName,
                key: 'test-result',
                data: []
            })
        }).then(resolve).catch(reject)
    })
}

export const capitalize1stLetter = ([first, ...rest]) =>{
    return first.toUpperCase() + rest.join("").toLowerCase()
}; 

