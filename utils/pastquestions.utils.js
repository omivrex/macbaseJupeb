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

export const getOnlineCollections = (collectionName = 'pastquestions', returnId) => {
    const collectionData = []
    return new Promise((resolve, reject) => {
        // let maxWaitTime = setTimeout(() => { /** add maximum time to prevent app from seemimg like it hanged */
        //     resolve(collectionData)
        // }, 5000);
        firestore.collection(collectionName).get().then((snapShot)=> {
            snapShot.forEach(doc => {
                if (returnId) {
                    const content = doc.data()
                    // console.log('content:', content)
                    collectionData.push({data:content.Data, id:doc.id})
                } else {
                    collectionData.push(doc.data())
                }
            });

            // if (collectionData.length>0) {
            //     clearTimeout(maxWaitTime);
            // }
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
                    .then(values=> console.log('promise values:', values))
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
                                // console.log(courseName, courseData)
                                saveCourseData(courseName, courseData)
                            }) 
                        }).catch(reject)
                        : getSubCollections(itemDataPath, collection)
                    )
                });

                resolve()

                // for (let i = 0, p = Promise.resolve(); i < parentObj.data.length; i++) {
                //     const collection = parentObj.data[i]
                    
                //     p = key === 'questionNumber'?p.then(() => getQuestionData(collection, itemDataPath).then(()=> {
                //         console.log('Downloading Data For:', itemDataPath, i, (i === parentObj.data.length-1))
                //         (i === parentObj.data.length-1) && Promise.all(p)
                //     })).catch(reject)
                //     : p.then(()=> getSubCollections(itemDataPath, collection))
                // }
                // resolve(parentObj)
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
            // console.log(path, returned)
            question.data = data?{...data}:null
            // const label = path.split('/')
            // console.log('test for section', label)
            // console.log('data: ', path, question)
            resolve(question)
        }).catch(reject)
    })
}

const saveCourseData = (courseName, courseData) => {
    // console.log('courseData: ', courseData)
    courseStorage.save({
        id: courseName,
        key: 'course-data',
        data: courseData,
    }).catch(err=> console.log(err))
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

