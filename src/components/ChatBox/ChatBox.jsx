import React from "react";
import './ChatBox.css'
import assets from "../../assets/assets";
const ChatBox=()=>{
    return(
    <div className="chat-box">
        <div className="chat-user">
            <img src={assets.profile_img} alt=''/>
            <p>Richard Sanford <img className="dot" src={assets.green_dot} alt=''/></p>
            <img src={assets.help_icon} className="help" alt=""/>
        </div>
        <div className="chat-input">
            <input type="text" placeholder="Send a Message" />
            <input type="file" id="image" accept="image/png,image/jpeg" hidden/>
        </div>
    </div>)
}
export default ChatBox