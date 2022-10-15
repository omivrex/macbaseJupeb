import { collection, getDocs } from "firebase/firestore"
import { firestore } from "./firebaseInit"

export const getSectionData = (section) => {
    let sectionArray = []
    return new Promise((resolve, reject) => { 
        getDocs(collection(firestore, section)).then(snapShot=> {
            snapShot.forEach(doc => {
                sectionArray.push(doc.data())
            });
            resolve(sectionArray)
        }).catch(err=> reject(err))
    })
}