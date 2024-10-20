import{doc, getDoc} from "firebase/firestore";
import { createContext,useState } from "react";
import{db} from "../config/firebase";

export const AppContext=createContext();

const AppContextProvider=(props)=>{

    const[useData,setUserData]=useState(null);
    const[chatData,setChatData]=useState(null);

    const loadUserData=async(uid)=>{
        try{
            const userRef=doc(db,'users',uid);
            const userSnap=await getDoc(userRef);
            const userData=userSnap.data();
            setUserData(userData);
            if(userData.avatar){
                
            }
        }catch(error){
        }
    }
///2:39 ultimo punto
    const value={
        useData,setUserData,
        chatData,setChatData,
        loadUserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider