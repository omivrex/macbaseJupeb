import { collection, getDocs } from "firebase/firestore"
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { documentDirectory, EncodingType, writeAsStringAsync } from "expo-file-system";
import { firestore } from "./firebaseInit";



const courseStorage = new Storage({
    storageBackend: AsyncStorage, // for web: window.localStorage
    defaultExpires: null,
    enableCache: false,
    sync: {
        callUpdateCourseData(...args) {
            updateCourseData(...args)
            .then(()=>loadCourseData(courseName))
        }
    }
})

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
    
let courseData = []
let courseName = ''
export const updateCourseData = (name) => {
    courseData = []
    courseName = name
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
                promiseArray.push(getSubCollections(currentPath, data)
                .then(()=> {
                    index === collectionData.length-1 && Promise.all(promiseArray)
                    .then(resolve).catch(err=> console.log(err))
                }))
            })
        }).catch(reject)
     })
}

const getSubCollections = (path, parentObj) => {
    return new Promise((resolve, reject) => { 
        getOnlineCollections(path).then(data =>{
            try {
                parentObj.data = [...data]
                const questionPromises = []

                parentObj.data.forEach((collection, index) => {
                    let [label] = Object.values(collection)
                    let [key] = Object.keys(collection)
                    let itemDataPath = path + `/${label}/${label}`
                    questionPromises.push(
                        key === 'questionNumber'?getQuestionData(collection, itemDataPath).then(() => {
                            console.log('Downloading Data For:', itemDataPath, index, (index === parentObj.data.length-1));
                            (index === parentObj.data.length-1) && Promise.all(questionPromises).then(()=> {
                                // console.log(itemDataPath)
                                saveCourseData(courseName, courseData)
                            }).catch(err=> console.log('saving questions error: ', err))
                        }).catch(reject)
                        : getSubCollections(itemDataPath, collection)
                    )
                });

                resolve()
            } catch (error) {
                reject (error)
            }
        })
    })
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

const saveCourseData = (courseName, courseData) => {
    const fileName = documentDirectory+courseName
    const data = JSON.stringify(courseData, function replacer(key, value) { return value})
    console.log('data to save:', fileName)
    // console.log('courseData: ', courseName)
    writeAsStringAsync(fileName, data, {encoding: EncodingType.UTF8}).catch(err=> console.log('error from saveCourseData: ', err))
    // courseStorage.save({
    //     id: courseName,
    //     key: 'course-data',
    //     data: courseData,
    // })
}

// courseStorage.clearMapForKey({
//     key: 'course-data',
// })

export const loadCourseData = (courseName) => {
    return new Promise((resolve, reject) => {
        courseStorage.load({
          key: 'course-data',
          id: courseName,
          syncInBackground: true,
          syncParams: {
            courseName
          }
        }).then(returnedData=> {
            resolve(returnedData)
        })
        .catch(
            err=> err.name==='NotFoundError'?
                courseStorage.sync.callUpdateCourseData(courseName)
            :
                reject(err)
        )
     })
}

// courseStorage.clearMapForKey('course-data');

export const loadAllSavedCourses = () => {
    return new Promise((resolve, reject) => {
        courseStorage.getIdsForKey('course-data').then(savedCourses=> {
            resolve(savedCourses)
        }).catch(err=> reject(err))
    })
}

export const getOfflineCollections = (pathObj, dataToSearch) => {
    const collectionData = []
    try {
        if (pathObj) {
            const {course, ...usefulPath}= pathObj
            const path = Object.values(usefulPath).filter(Boolean) /** remove falsey values */
            path.forEach((item) => {
                dataToSearch = [... dataToSearch[item.index].data]
            })
            dataToSearch.forEach((item, index)=> {
                const [key] = Object.keys(item)
                const [value] = Object.values(item)
                collectionData.push({[key]: value, index})
            })
        }
        return collectionData
    } catch (error) {
        console.log('error from getOfflineCollections:', error)
    }
}

export const getSectionsLocalQuestions = (pathObj, questionNumber, dataToSearch) => {
    try {
        const questionData = dataToSearch[pathObj.year.index]
        .data[pathObj.section.index]
        .data[questionNumber.index]
        .data.data
        return questionData
    } catch (error) {
        console.log(error)
    }

}

export const getAllQuestionsInCourse = (course) => {
    let questions = []
    return new Promise((resolve, reject) => {
        loadCourseData(course)
        .then(years => {
            years.forEach(year => {
                const sections = year.data
                const [objData] = sections.filter(({section})=> section === 'Objective')
                const sectionQuestion = objData?.data
                questions = questions.concat(sectionQuestion)
            });
        }).then(() => {
            questions.length && resolve(questions.filter(Boolean))
            console.log('questions',questions)
        }).catch(err=>{
            reject(err)
            console.log('Error from getAllQuestionsInCourse', err)
        });
    })
}

export const shuffleAndCutQuestions = (questionsArray, lengthToCut) => {
    const shuffledArray = questionsArray.sort(() => 0.5 - Math.random())
    return shuffledArray.slice(0, lengthToCut)
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

