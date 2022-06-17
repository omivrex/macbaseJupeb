import {firestore} from "./firebaseInit"


export const getSectionData = (section) => {
    let sectionArray = []
    return new Promise((resolve, reject) => { 
        firestore.collection(section).get().then(snapShot=> {
            snapShot.forEach(doc => {
                sectionArray.push(doc.data())
            });
            resolve(sectionArray)
        }).catch(err=> reject(err))
    })
}