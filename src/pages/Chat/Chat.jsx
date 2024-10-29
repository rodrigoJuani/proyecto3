import React, { useContext } from 'react'
import './Chat.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import { AppContext } from '../../context/AppContext'
const Chat=()=>{
    const{chatData,userData}=useContext(AppContext);
    return(
        <div className='chat'>
            <div className="chat-container">
                <LeftSidebar/>
                <ChatBox/>
                <RightSidebar/>
            </div>
        </div>
    )
}
export default Chat