import React from "react";
import './LeftSidebar.css'
import assets from "../../assets/assets";
const LeftSidebar=()=>{
    return(
        <div className="ls">
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} className="logo" alt=''/>
                    <div className="menu">
                        <img src={assets.menu_icon} alt=''/>
                    </div>
                </div>
                <div className="ls-search">
                    <img src={assets.search_icon} alt=''/>
                    <input type="text" placeholder="Search here.."/>
                </div>
            </div>
        </div>
    )
}
export default LeftSidebar