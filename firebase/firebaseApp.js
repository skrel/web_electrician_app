// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import { getAuth } from "@firebase/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJqnTgM6I9vc5h45x_8CxkfKK085_wG1E",
  authDomain: "electrician-app-70e32.firebaseapp.com",
  projectId: "electrician-app-70e32",
  storageBucket: "electrician-app-70e32.appspot.com",
  messagingSenderId: "424462050984",
  appId: "1:424462050984:web:127e92812741f7c78b449d"
};

const app = firebase.initializeApp(firebaseConfig);

const database = app.firestore();

export const auth = getAuth(app);

export default database