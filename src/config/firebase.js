// firebase.js (o el nombre que le hayas dado)
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATGjeeGZy3_J-xvDL_pbGeKyQEG_dDgIk",
    authDomain: "chat-app-gs-8b364.firebaseapp.com",
    projectId: "chat-app-gs-8b364",
    storageBucket: "chat-app-gs-8b364.firebasestorage.app",
    messagingSenderId: "231121174390",
    appId: "1:231121174390:web:60205e3abe66cd571f0457"
  };
  
  

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey there, I am using chat app",
            lastSeen: Date.now()
        });
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        });
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

export  { signup , login, logout, auth, db };

////1:57 es la base de datos