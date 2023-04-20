
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


import { getFirestore ,initializeFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAd_NUwS4UegtKxXz_QieSe5W-9vwNqC2I",
    authDomain: "secret-37942.firebaseapp.com",
    projectId: "secret-37942",
    storageBucket: "secret-37942.appspot.com",
    messagingSenderId: "854329978065",
    appId: "1:854329978065:web:6172055c3957e6d22ca9f0"
  };
//firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
//const auth = getAuth(app);

//const analytics = getAnalytics(app);
//const db=getFirestore(app);
const db = initializeFirestore(app, {
experimentalForceLongPolling: true,
useFetchStreams: false,
})
console.log(db);
export {db};
