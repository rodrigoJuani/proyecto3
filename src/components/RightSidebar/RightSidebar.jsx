import React, { useContext } from "react";
import './RightSidebar.css'
import assets from "../../assets/assets"
import { logout } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
const RightSidebar=()=>{
    const {chatUser,messages}=useContext(AppContext)
    return chatUser ?(
    <div className="rs">
        <div className="rs-profile">
            <img src={chatUser.userData.avatar} alt=""/>
            <h3>{chatUser.userData.name}<img src={assets.green_dot} className="dot" alt=""/></h3>
            <p>HEy, there u am richar sanford using chat app</p>
        </div>
        <hr/>
        <div className="rs-media">
            <p>Media</p>
            <div>
                <img src={assets.pic1} alt="" />
                <img src={assets.pic2} alt="" />
                <img src={assets.pic3} alt="" />
                <img src={assets.pic4} alt="" />
                <img src={assets.pic1} alt="" />
                <img src={assets.pic2} alt="" />
            </div>
        </div>
        <button onClick={()=>logout()}>Logout</button>
    </div>)
    :(<div className="rs">
        <button onClick={()=>logout()}>Logout</button>
    </div>
    )
}

export default RightSidebar