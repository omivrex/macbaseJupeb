import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/database'
// import {FIREBASE_PROJECT_KEY, MESSAGING_SENDER_ID} from '@env'

const app = firebase.initializeApp({
    apiKey: "AIzaSyC2F7JanDLFe5bQ7kVNUhajVUbHBXiMpIE",
    authDomain: "jupebmacbase.firebaseapp.com",
    projectId: "jupebmacbase",
    databaseURL: "https://jupebmacbase-default-rtdb.firebaseio.com",
    storageBucket: "jupebmacbase.appspot.com",
    messagingSenderId: "271272994760",
    appId: "1:271272994760:web:5ba6bdf9c329aa2dbcc2fd",
    measurementId: "G-YFE7Q5GGLW"
});

export const auth = firebase.auth()
export const firestore = firebase.firestore()
firestore.settings({ experimentalForceLongPolling: true, merge:true });
export const rtdb = firebase.database()
// export const storage = firebase.storage()