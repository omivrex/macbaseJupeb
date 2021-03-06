import {firestore} from "./firebaseInit"
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const updateCourseData = (courseName, callback) => {
    return new Promise((resolve, reject) => { 
        let courseData = []
        const rootPath = `pastquestions/${courseName}/${courseName}`
        getOnlineCollections(rootPath).then(async collectionData => {
            console.log(collectionData)
            let index = 0
            for await (const data of collectionData){
                let [label] = Object.values(data)
                data.data = []
                courseData.push(data)
                let currentPath = rootPath+`/${label}/${label}`
                getSubCollections(currentPath, data, courseData)
                index === collectionData[collectionData.length-1]?resolve(courseData):null
                index++
            }
            callback()
        }).catch(err=> reject(err))
     })
}

const getSubCollections = (path, parentObj, courseData) => {
    getOnlineCollections(path).then(async data =>{
        parentObj.data = [...data]
        for await (const item of parentObj.data) {
            let [label] = Object.values(item)
            let [key] = Object.keys(item)
            let itemDataPath = path + `/${label}/${label}`
            key === 'questionNumber'?getQuestionData(item, itemDataPath, courseData)
            : getSubCollections(itemDataPath, item, courseData)
        }
    })
}

const getQuestionData = (questionObj, path, courseData) => {
    getOnlineCollections(path, true).then(([questionData]) => {
        questionObj.data = questionData
        const courseName = path.split('/')[1]
        // console.log('getQuestionData courseData', courseData)
        saveCourseData(courseName, courseData)
    })
}

const saveCourseData = (courseName, courseData) => {
    courseStorage.save({
        id: courseName,
        key: 'course-data',
        data: courseData,
    })
}

// courseStorage.remove({
//     key: 'course-data',
//     id: 'maths'
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

// courseStorage.remove({
//   key: 'course-data',
//   id: 'physics'
// });


export const getOnlineCollections = (collectionName, returnId) => {
    const collectionData = []
    return new Promise((resolve, reject) => {
        let maxWaitTime = setTimeout(() => { /** add maximum time to prevent app from seemimg like it hanged */
            resolve(collectionData)
        }, 5000);
        firestore.collection(collectionName?collectionName:'pastquestions').get().then((snapShot)=> {
            snapShot.forEach(doc => {
                returnId?collectionData.push({data:doc.data().Data, id:doc.id})
                :collectionData.push(doc.data())
            });
            if (collectionData.length>0) {
                clearTimeout(maxWaitTime);
                resolve(collectionData)
            }
        }).catch (err => {
            console.log(err)
            reject(err)
        })
    })
}

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

