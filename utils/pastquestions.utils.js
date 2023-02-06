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
export const updateCourseData = async (courseName) => {
    try {
        console.log('sent request to update course...')
        const res = await fetch(`https://jupeb-macbase-server.onrender.com/${courseName}`)
        const data = await res.json()
        console.log('updating course...', data.course)
        await saveCourseData(data, courseName)
    } catch (error) {
        console.log(error)
    }
}

// updateCourseData('physics')


const saveCourseData = async (courseContent, courseName) => {
    try {
        const fileName = documentDirectory+`pastquestions-${courseName}`
        for (let index = 0; index < courseContent.data.length; index++) {
            const year = courseContent.data[index];
            for (let index = 0; index < year.data.length; index++) {
                const section = year.data[index];
                for (let index = 0; index < section.data.length; index++) {
                    const questions = section.data[index];
                    const filePath = documentDirectory+`pastquestions-${courseName}-${year.year}-${section.section}`
                    await writeAsStringAsync(filePath, JSON.stringify(questions, (key, value) => value), {encoding: EncodingType.UTF8})
                    console.log('succesfully saved :', filePath)
                }
            }
        }
    } catch (error) {
        console.log('error from saveCourseData: ', error)
    }
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

