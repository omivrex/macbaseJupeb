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
        console.log(courseName)
        getOnlineCollections(rootPath).then(collectionData => {
            collectionData.forEach(async (data, index) => {
                let [label] = Object.values(data)
                data.content = []
                data.key = label
                courseData.push(data)
                let currentPath = rootPath+`/${label}/${label}`
                await getSubCollections(currentPath, data)
                index === collectionData[collectionData.length-1]?resolve(courseData):null
            });
        }).catch(err=> reject(err))
     })
}

const getSubCollections = async (path, parentObj) => {
    getOnlineCollections(path).then((data) =>{
        parentObj.key = [Object.keys(parentObj)[0]]
        parentObj.content = [...data]
        parentObj.content.forEach(async item => {
            let [label] = Object.keys(item)
            let itemDataPath = path + `/${item[label]}/${item[label]}`
            console.log(item)
            label === 'questionNumber'?getQuestionData(item, itemDataPath):
            await getSubCollections(itemDataPath, item)
        });
    })
}

const getQuestionData = async (questionObj, path) => {
    await getOnlineCollections(path, true).then(([questionData]) => {
        questionObj.content = questionData
        const courseName = path.split('/')[1]
        console.log('courseName', courseName)
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
            console.log('returnedData', returnedData)
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

// export const getOfflineCollections = (pathObj) => {
//     const collectionData = []
//     try {
//         if (pathObj) {
//             const path = Object.values(pathObj).filter(Boolean) /** remove falsey values */
//             let recordToSearch = pqData
//             path.forEach((item) => {
//                 recordToSearch = recordToSearch[item.index].content
//             })
//             recordToSearch.forEach((item, index)=> {
//                 const [key] = Object.keys(item)
//                 const [value] = Object.values(item)
//                 collectionData.push({[key]: value, index})
//             })
//         } else {
//             pqData.forEach(({courseName}, index) => {
//                 collectionData.push({courseName, index})
//             });
//         }
//         return collectionData
//     } catch (error) {
//         console.log('error from getOfflineCollections:', error)
//     }
// }

// export const getSectionsLocalQuestions = (pathObj, questionNumber) => {
//     try {
//         const questionData = pqData[pathObj.courseName.index]
//         .content[pathObj.year.index]
//         .content[pathObj.subject.index]
//         .content[pathObj.section.index]
//         .content[questionNumber.index]
//         .content.Data.Data
//         return questionData
//     } catch (error) {
//         console.log(error)
//     }

// }