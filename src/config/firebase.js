// firebase.js (o el nombre que le hayas dado)
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBcDoorNpVzQ5oGGktzNEcgmNoLxmDoH88",
  authDomain: "chat-app-gs-6d381.firebaseapp.com",
  projectId: "chat-app-gs-6d381",
  storageBucket: "chat-app-gs-6d381.appspot.com",
  messagingSenderId: "195164874775",
  appId: "1:195164874775:web:7a55c645a1da2262d91452"
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
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        })
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const resetPass=async (email) =>{
    if(!email){
        toast.error("Enter your email");
        return null;
    }
    try{
        const userRef =collection(sb,'users');
        const q=query(userRef,where("email","==",email))
        const querySnap=await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Sent")
        }
        else{
            toast.error("Email doesn't exists")
        }
    }catch(error){
        console.error(error);
        toast.error(error.message)
    }
}
export  { signup , login, logout, auth, db,resetPass };
