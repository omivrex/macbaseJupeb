import { auth, rtdb } from './firebaseInit';
import { get, ref, set, update } from 'firebase/database';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';

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
  throw 'Email is not valid'
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

export const signIn = (userData) => { //user exists it throws an error then tries to log that user in
  return new Promise((resolve, reject) => { 
    validateEmail(userData.email)
    createUserWithEmailAndPassword(auth, userData.email, userData.pswd).then(()=> {
      auth.onAuthStateChanged(({uid}) => {
        uid? resolve({userExists: false, uid}):reject('something went wrong!')
      })
    }).catch(err=> {
      const [errorMessage] = Object.values(err)
      errorMessage === "auth/email-already-in-use"? signInWithEmailAndPassword(auth, userData.email, userData.pswd).then(userCredentials => {
        const uid = userCredentials.user.uid
        resolve({userExists: true, uid})
      }).catch(err=> {
        const [errorMessage] = Object.values(err)
        errorMessage === "auth/wrong-password" ?
        Alert.alert('Your password is incorrect!', 'Do You want to reset it', [
          {
            text: 'Reset',
            onPress: ()=> sendPasswordResetEmail(auth, userData.email)
            .then(Alert.alert('', `A Password Reset email has been sent to ${userData.email}`)).then(reject).catch(reject)
          },
          {
            text: 'Try again',
            onPress: ()=> reject()
          }
        ]) : reject(err)
      })
      : reject(err)
    })
  })
}


export const saveUserDataLocally = (uid) => {
  return new Promise((resolve, reject) => {
    get(ref(rtdb, `users/${uid}`)).then(snapshot=> {
      const userDetails = snapshot.val()
      userStorage.save({
        key: 'userDetails',
        data: {uid, ...userDetails},
      }).then(()=> resolve(userDetails))
    }).catch(reject)
  })
}

export const uploadUserData = ({uid, pswd, ...userDetails}) => {
  return new Promise((resolve, reject) => { 
    set(ref(rtdb, `users/${uid}`), userDetails).then(() => {
      resolve({...userDetails, uid})
    }).catch(err=> reject(err))   
  })
}

// userStorage.remove({key: 'userDetails'})

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

export const updateOnlineUserData = (updateData, uid) => {
  return new Promise((resolve, reject) => { 
    updateData.selectedCourses?.forEach((course) => {
      course.paid = true
    });
    update(ref(rtdb, `users/${uid}`), {...updateData}).then(() => {
      resolve(updateData)
    }).catch(err=> reject(err))
  })
}

// export const updateLocalUserData = (selectedCourses, uid, userData) => {
//   return new Promise((resolve, reject) => { 
//     saveUserDetails({selectedCourses, uid, ...userData}).then(userDetails => {
//       resolve(userDetails)
//     }).catch(err=> reject(err))
//   })
// }


