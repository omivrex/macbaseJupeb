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

let courseData = []
export const updateCourseData = (courseName) => {
    return new Promise((resolve, reject) => { 
        courseData = []
        const rootPath = `pastquestions/${courseName}/${courseName}`
        getOnlineCollections(rootPath).then(collectionData => {
            console.log(collectionData)
            collectionData.forEach((data, index) => {
                let [label] = Object.values(data)
                data.data = []
                courseData.push(data)
                let currentPath = rootPath+`/${label}/${label}`
                getSubCollections(currentPath, data)
                index === collectionData[collectionData.length-1]?resolve(courseData):null
            });
        }).catch(err=> reject(err))
     })
}

const getSubCollections = (path, parentObj) => {
    getOnlineCollections(path).then((data) =>{
        parentObj.data = [...data]
        parentObj.data.forEach(item => {
            let [label] = Object.values(item)
            let [key] = Object.keys(item)
            let itemDataPath = path + `/${label}/${label}`
            console.log('called...', label)
            key === 'questionNumber'?getQuestionData(item, itemDataPath)
            : getSubCollections(itemDataPath, item)
        });
    })
}

const getQuestionData = (questionObj, path) => {
    getOnlineCollections(path, true).then(([questionData]) => {
        questionObj.data = questionData
        const courseName = path.split('/')[1]
        // console.log('getQuestionData courseData', courseData)
        saveCourseData(courseName)
    })
}

const saveCourseData = (courseName) => {
    courseStorage.save({
        id: courseName,
        key: 'course-data',
        data: courseData,
    })
}

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
//   id: 'maths'
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
            const path = Object.values(pathObj).filter(Boolean) /** remove falsey values */
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
        .data[pathObj.subject.index]
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
                let subjects = year.data
                subjects.forEach(subject => {
                    const sections = subject.data
                    const [objData] = sections.filter(({section})=> section === 'Objective')
                    const sectionQuestion = objData?.data
                    questions = questions.concat(sectionQuestion)
                });
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

const testResulStorage = new Storage({
    storageBackend: AsyncStorage, // for web: window.localStorage
    defaultExpires: null,
    enableCache: false,
    sync: {
        update() {
            return null // do not sync
        }
    }
})

// testResulStorage.remove({
//     key: 'test-data',
//     id: 'physics'
// });

export const loadResultData = courseName => {
    return new Promise((resolve, reject) => {
        testResulStorage.load({
            key: 'test-result',
            id: courseName,
            syncInBackground: true,
        }).then(returnedData=> {
            resolve(returnedData)
        }).catch(err=> {
            console.log(err)
            reject(err)
        })
    })
}


export const storeTestResult = ({courseName, ...remainingData}) => {
    return new Promise((resolve, reject) => {
        loadResultData(courseName).then(testData => {
            testResulStorage.save({
                id: courseName,
                key: 'test-result',
                data: testData?testData.concat({time: new Date().getTime(), courseName, ...remainingData}):[remainingData],
            })
        }).finally(resolve).catch(reject)
    })
}