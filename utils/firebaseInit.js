import {initializeApp} from "firebase/app"
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'
// import {FIREBASE_PROJECT_KEY, MESSAGING_SENDER_ID} from '@env'

const app = initializeApp({
    apiKey: "AIzaSyC2F7JanDLFe5bQ7kVNUhajVUbHBXiMpIE",
    authDomain: "jupebmacbase.firebaseapp.com",
    projectId: "jupebmacbase",
    databaseURL: "https://jupebmacbase-default-rtdb.firebaseio.com",
    storageBucket: "jupebmacbase.appspot.com",
    messagingSenderId: "271272994760",
    appId: "1:271272994760:web:5ba6bdf9c329aa2dbcc2fd",
    measurementId: "G-YFE7Q5GGLW"
});

export const auth = getAuth(app)
export const firestore = getFirestore(app)
// firestore.settings({ experimentalForceLongPolling: true, merge:true });
export const rtdb = getDatabase(app)
// export const storage = firebase.storage()