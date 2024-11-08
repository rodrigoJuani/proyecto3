import React, { useContext, useState, useEffect } from "react";
import './LeftSidebar.css';
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { userData, chatData,chatUser, setChatUser,setMessagesId, MessagesId } = useContext(AppContext);
    const [users, setUsers] = useState([]); // Estado para almacenar todos los usuarios
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userRef = collection(db, 'users');
                const querySnap = await getDocs(userRef);
                const allUsers = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(allUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Error fetching users: " + error.message);
            }
        };

        fetchUsers();
    }, []);

    const inputHandler = async (e) => {
        try {
            const input = e.target.value;
            if (input) {
                setShowSearch(true);
                const userRef = collection(db, 'users');
                const q = query(userRef, where("username", "==", input.toLowerCase()));
                const querySnap = await getDocs(q);

                console.log("Query Snapshot:", querySnap);
                console.log("Documents:", querySnap.docs);

                if (!querySnap.empty && querySnap.docs[0].data().id!==userData.id) {
                    let userExist=false;
                    chatData.map((user)=>{
                        userExist=true;
                    })
                        if (!userExist) {
                            setUser(querySnap.docs[0].data());
                        }
                    
                } else {
                    setUser(null);
                }
            } else {
                setShowSearch(false);
                setUser(null); // Resetea el usuario cuando el input está vacío
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            toast.error("Error fetching user: " + error.message);
        }
    };

    const addChat = async () => {
        const messagesRef=collection(db,"messages");
        const chatsRef=collection(db,"chats");
        try {
            const newMessageRef=doc(messagesRef);
            await setDoc(newMessageRef,{
                createAt:serverTimestamp(),
                messages:[]
            })
            await updateDoc(doc(chatsRef,user.id),{
                chatsData:arrayUnion({
                    messageId:newMessageRef.id,
                    lastMessage:"",
                    rId:userData.id,
                    updateAt:Date.now(),
                    messageSeen:true
                })
            })
            await updateDoc(doc(chatsRef,userData.id),{
                chatsData:arrayUnion({
                    messageId:newMessageRef.id,
                    lastMessage:"",
                    rId:user.id,
                    updateAt:Date.now(),
                    messageSeen:true
                })
            })
        } catch (error) {
            toast.error(error.message);
            console.error("Error al agregar el chat:", error);
        }
    };
    const setChat = async (item) => {
        try{
            setMessagesId(item.messageId);
        setChatUser(item)
        const userChatsRef=doc(db,'chats',userData.id);
        const userChatsSnapshot=await getDoc(userChatsRef);
        const userChatsData=userChatsSnapshot.data();
        const chatIndex=userChatsData.chatsData.findIndex((c)=>c.messageId===item.messageId);
        userChatsData.chatsData[chatIndex].messageSeen=true;
        await updateDoc(userChatsRef,{
            chatsData:userChatsData.chatsData//chatData
        })
        }catch(error){
            toast.error(error.message)
        }
        
    };
    return (
        <div className="ls">
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} className="logo" alt='' />
                    <div className="menu">
                        <img src={assets.menu_icon} alt='' />
                        <div className="sub-menu">
                            <p onClick={() => navigate('/profile')}>Edit profile</p>
                            <hr />
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="ls-search">
                    <img src={assets.search_icon} alt='' />
                    <input onChange={inputHandler} type="text" placeholder="Search here.." />
                </div>
            </div>
            <div className="ls-list">
                {showSearch && user ? (
                    <div onClick={addChat} className="friends add-user">
                        <img src={user.avatar} alt="" /> 
                        <p>{user.name}</p>
                    </div>
                ) : (
                    chatData.length > 0 ? (
                        chatData.map((item, index) => (
                            <div onClick={() => setChat(item)} key={index} className={`friends ${item.messageSeen || item.messageId===messageId? "":"border"}`}>
                                <img src={item.userData.avatar} alt="" />
                                <div>
                                    <p>{item.userData.name}</p>
                                    <span>{item.lastMessage}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay usuarios disponibles.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default LeftSidebar;

/*import React, { useContext, useState } from "react";
import './LeftSidebar.css'
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { arrayUnion, collection, doc,getDocs, query, serverTimestamp,setDoc,updateDoc,where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const LeftSidebar=()=>{
    const navigate=useNavigate();
    const {userData,chatData,chatUser,setChatUser,setMessagesId,messagesId}=useContext(AppContext);
    const {user,setUser}=useState(null);
    const [showSearch,setShowSearch]=useState(false);

    const inputHandler=async(e)=>{
        try{
            const input =e.target.value;
            if(input){
                setShowSearch(true);
                const userRef=collection(db,'users');
                const q=query(userRef,where("username","==",input.toLowerCase()));
                const querySnap=await getDocs(q);
            if(!querySnap.empty && querySnap.docs[0].data.id!==userData.id){
                let userExist=false
                chatData.map(user=>{ 
                    if(user.rId===querySnap.docs[0].data.id){
                        userExist=true;
                    }
                })
                if(!userExist){
                    setUser(querySnap.docs[0].data());
                }
            }else{
                setUser(null);
            }
            }else{
                setShowSearch(false);
            }
        }catch(error){
        }
    }


    const addChat=async()=>{
        const messagesRef=collection(db,"messages");
        const chatsRef=collection(db,"chats");
        try{
            const newMessageRef=doc(messagesRef);
            await setDoc(newMessageRef,{
                createAt:serverTimestamp(),
                messages:[]
            })
            await updateDoc(doc(chatsRef,user.id),{
                chatData:arrayUnion({
                    messageId:newMessageRef.id,
                    lastMessage:"",
                    rId:userData.id,
                    updatedAt:Date.now(),
                    messageSeen:true
                })
            })
            await updateDoc(doc(chatsRef,userData.id),{
                chatData:arrayUnion({
                    messageId:newMessageRef.id,
                    lastMessage:"",
                    rId:user.id,
                    updatedAt:Date.now(),
                    messageSeen:true
                })
            })
        }catch(error){
            toast.error(error.message);

        }
    }
    const setChat=async(item)=>{
        setMessagesId(item.messageId);
        setChatUser(item)
    }
    return(
        <div className="ls">
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} className="logo" alt=''/>
                    <div className="menu">
                        <img src={assets.menu_icon} alt=''/>
                        <div className="sub-menu">
                            <p onClick={()=>navigate('/profile')}>Edit profile</p>
                            <hr/>
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="ls-search">
                    <img src={assets.search_icon} alt=''/>
                    <input onChange={inputHandler} type="text" placeholder="Search here.."/>
                </div>
            </div>
            <div className="ls-list">
            {showSearch && user
            ? <div onClick={addChat} className="friends add-user">
                <img src={user.avatar} alt=""/>
                <p>{user.name}</p>
            </div>
            :chatData.map((item,index)=>(
                <div onClick={()=>setChat(item)} key={index} className="friends">
                <img src={item.userData.avatar} alt=""/>
                <div>
                    <p>{item.userData.name}</p>
                    <span>{item.lastMessage}</span>
                </div>
            </div>
           ))
            }
            </div>
        </div>
    )
}
export default LeftSidebar*/