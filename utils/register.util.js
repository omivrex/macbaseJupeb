import { auth, rtdb } from './firebaseInit';
const usersCollection =  rtdb.ref('users')
 
 export const validateEmail = email => {
    if (email?.includes('.com') && email?.includes('@')) {
        const validChars = new RegExp(/[abcdefghijklmnopqrstuvwxyz1234567890]/)
        const emailName = email.slice(0, email.indexOf('@'))
        const emailProvider = email.slice(email.indexOf('@')+1, email.indexOf('.com'))
        if (emailName.search(validChars) !== -1 && emailProvider.search(validChars) !== -1) {
          return true
        }
    }
    return false
}

export const validatePswd = pswd => pswd?.length >= 8

export const validatePhone = phone => {
    if (phone?.includes('+') && phone?.length === 14) { /** length of a nigerian number og format +23480XXX... is 14 including + sign */
        const queryStr = phone.replace('+', '')
        const validPrifixsInNigeria = [new RegExp(/\b23470/), new RegExp(/\b23480/), new RegExp(/\b23481/), new RegExp(/\b23490/), new RegExp(/\b23491/)]
        const validPhoneChars = new RegExp(/[1234567890]/)
        if (validPrifixsInNigeria.filter(prefix=> queryStr.search(prefix) === 0).length) {
            if (queryStr.search(validPhoneChars) !== -1) {
                return true
            }  
        }
    }
    return false
}

export const signup = (userData, selectedCourses) => {
    return new Promise((resolve, reject) => { 
        auth.createUserWithEmailAndPassword(userData.email, userData.pswd).then(()=> {
            auth.onAuthStateChanged(({uid}) => {
              if (uid) {
                const uploadData = {...userData, selectedCourses, regDate: new Date().getTime()}
                usersCollection.child(uid).set(uploadData).then(() => {
                    resolve(uid)
                })
              }
            })
        }).catch(err=> reject(err))
     })
    
}