import { auth, rtdb } from './firebaseInit';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const usersCollection =  rtdb.ref('users')

const userStorage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: null,
  enableCache: true,
  sync: {
    userDetails() {
      return null
    }
  }
});
 

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

export const signIn = (userData, selectedCourses, userExists) => {
    return new Promise((resolve, reject) => { 
        !userExists? auth.createUserWithEmailAndPassword(userData.email, userData.pswd).then(()=> {
            auth.onAuthStateChanged(({userId}) => {
              if (userId) {
                const uploadData = {...userData, selectedCourses, regDate: new Date().getTime()}
                usersCollection.child(userId).set(uploadData).then(() => {
                    resolve({userData, userId})
                })
              }
            })
        }).catch(err=> reject(err))
        : usersCollection.orderByChild('email').once('value', snapshot => {
            const [userDetails, userId] = [Object.values(snapshot.val())[0], Object.keys(snapshot.val())[0]]
            if (userDetails.email === userData.email) {
              resolve({userData, userId})
            }
        }).catch(err=> reject(err))
    })
}

export const saveUserDetails = (userData, userId) => {
  userStorage.save({
    key: 'userDetails',
    data: userData,
    id: userId
  })
}
