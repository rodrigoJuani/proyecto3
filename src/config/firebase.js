// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcDoorNpVzQ5oGGktzNEcgmNoLxmDoH88",
  authDomain: "chat-app-gs-6d381.firebaseapp.com",
  projectId: "chat-app-gs-6d381",
  storageBucket: "chat-app-gs-6d381.appspot.com",
  messagingSenderId: "195164874775",
  appId: "1:195164874775:web:7a55c645a1da2262d91452"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(username,email,password)=>{
    try{

    }catch(error){
        Con la base de datos
    }
}