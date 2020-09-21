import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCn55kFTJcBLEnPAAM9BX9pwbsN92bArUs",
  authDomain: "whatsapp-mern-81ce4.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-81ce4.firebaseio.com",
  projectId: "whatsapp-mern-81ce4",
  storageBucket: "whatsapp-mern-81ce4.appspot.com",
  messagingSenderId: "445919722215",
  appId: "1:445919722215:web:2b2407b1407155c4c48042",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
