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
 
// userStorage.remove({
//   key: 'userDetails'
// })

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
            auth.onAuthStateChanged(({uid}) => {
                console.log('uid:', uid)
              if (uid) {
                const {pswd, ...uploadData} = {...userData, selectedCourses, regDate: new Date().getTime()}
                console.log('uploadData:', uploadData)
                usersCollection.child(uid).set(uploadData, () => {
                  resolve({...uploadData, uid})
                })
              }
            })
        }).catch(err=> reject(err))
        : (()=> {
          resolve({...userData})
        })()
    })
}

export const saveUserDetails = (userDetails) => {
  return new Promise((resolve, reject) => {
    if (userDetails) {
      userStorage.save({
        key: 'userDetails',
        data: userDetails,
      })
      resolve (userDetails)
    } else {
      reject('User details is not present')
    }
  })
}

export const getUserDetails = () => {
  return userStorage.load({
    key: 'userDetails',
    autoSync: true,
    syncInBackground: false,
  })
}

export const generateTransactionRef = (length) => {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `flw_tx_ref_${result}`;
};

export const updateOnlineUserData = (selectedCourses, uid) => {
  return new Promise((resolve, reject) => { 
    selectedCourses.forEach((course) => {
      course.paid = true
    });
    usersCollection.child(uid).update({selectedCourses}, () => {
      resolve(selectedCourses)
    }).catch(err=> reject(err))
  })
}

export const updateLocalUserData = (selectedCourses, uid, userData) => {
  return new Promise((resolve, reject) => { 
    saveUserDetails({selectedCourses, uid, ...userData}).then(userDetails => {
      resolve(userDetails)
    }).catch(err=> reject(err))
  })
}


