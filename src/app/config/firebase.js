import firebase from 'firebase'
import 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyBScUOWmPPquMMz-_gBBgHYns43I864hFw",
    authDomain: "revents-3aac5.firebaseapp.com",
    databaseURL: "https://revents-3aac5.firebaseio.com",
    projectId: "revents-3aac5",
    storageBucket: "revents-3aac5.appspot.com",
    messagingSenderId: "1043525366984"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings)

export default firebase;