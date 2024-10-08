import React from "react";
import './RightSidebar.css'
import assets from "../../assets/assets"
const RightSidebar=()=>{
    return(
    <div className="rs">
        <div className="rs-profile">
            <img src={assets.profile_img} alt=""/>
            <h3>Richard Sanford<img src={assets.green_dot} className="dot" alt=""/></h3>
            <p>HEy, there u am richar sanford using chat app</p>
        </div>
    </div>)
}

export default RightSidebar