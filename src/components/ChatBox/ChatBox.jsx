import React, { useContext, useEffect, useState } from "react";
import './ChatBox.css'
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { arrayUnion, doc,onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
const ChatBox=()=>{
    const {userData,messagesId,chatUser,messages,setMessages}=useContext(AppContext);
    const [input,setInput]=useState("");
    const sendMessage=async(id)=>{
        try{
            if(input && messagesId){
                await updateDoc(doc(db,'messages',messagesId),{
                    messages:arrayUnion({
                        sId:userData.id,
                        text:input,
                        createdAt:new Date()
                    })
                })
            }
        }catch(error){}
    }

    const sendImage=async(e)=>{
        try{
            const fileUrl=await upload(e.target.files[0])
        } catch(error){}
    }
    const convertTimestamp=(timestamp)=>{
        let date=timestamp.toDate();
        const hour=date.getHours();
        const minute=date.getMinutes();
        if(hours>12){
            return hour-12+":"+minute+" PM";
        }else{
            return hour+":"+minute+" AM";
        }
    }
    useEffect(()=>{
        if(messagesId){
            const unSub=onSnapshot(doc(db,'messages',messagesId),(res)=>{
                setMessages(res.data().messages.reverse())
            })
            return()=>{
                unSub();
            }
        }
    },[messagesId])
    return chatUser && chatUser.userData? (
    <div className="chat-box">
        <div className="chat-user">
            <img src={chatUser.userData.avatar} alt=''/>
            <p>{chatUser.userData.name}<img className="dot" src={assets.green_dot} alt=''/></p>
            <img src={assets.help_icon} className="help" alt=""/>
        </div>

            <div className="chat-msg">
            {messages.map((msg,index)=>(
                <div key={index} className={msg.sId===userData.id ? "s-msg" : "r-msg"}>
                    <p className="msg">{msg.text}</p>
                <div>
                <img src={msg.sId===userData.id? userData.avatar: chatUser.userData.avatar} alt=''/>
                <p>{convertTimestamp(msg.createdAt)}</p>
                </div>
                </div>
            
            ))}

                
            </div>
        

        <div className="chat-input">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Send a Message" />
            <input onChange={sendImage} type="file" id="image" accept="image/png,image/jpeg" hidden/>
            <label htmlFor="image">
                <img src={assets.gallery_icon} alt=""/>
            </label>
            <img src={assets.send_button} al=''/> 
        </div>
    </div>)
    :<div className="chat-welcome">
        <img src={assets.logo_icon} alt=""/>
        <p>Chat anytime, anywhere</p>
    </div>
}
export default ChatBox