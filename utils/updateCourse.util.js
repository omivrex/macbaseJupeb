import {getOnlineCollections} from "./pastquestions.utils"

const courseData = []

export const updateQuestions = (path = `pastquestions/${path}/${path}`) => {
    getOnlineCollections(path).then(collectionData => {
        collectionData.forEach(data => {
            let [label] = Object.keys(data)
            courseData.push(data)
            let currentPath = rootPath+`/${data[label]}/${data[label]}`
            getSubCollections(currentPath, data)
        });
        console.log(courseData)
    })
}

const getSubCollections = (path, parentObj) => {
    getOnlineCollections(path).then((data) =>{
        parentObj.content = data
        parentObj.content.forEach(item => {
            let [label] = Object.keys(item)
            let itemDataPath = path + `/${item[label]}/${item[label]}`
            label === 'questionNumber'?getQuestionData(item, itemDataPath):
            getSubCollections(itemDataPath, item)
        });
    })
}

const getQuestionData = (questionObj, path) => {
    getOnlineCollections(path, true).then(([questionData]) => {
        questionObj.content = questionData
    })
}
