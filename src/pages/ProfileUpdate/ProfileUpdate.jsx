import React,{useEffect, useState} from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
const ProfileUpdate=()=>{
    const [image,setImage]=useState(false);
    const[name,setName]=useState("");
    const[bio,setBio]=useState("");
    const[uid,setUid]=useState("");

    useEffect(()=>{
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                setUid(user.uid)
                const docRef=doc(db,"users",user.uid);
                const docSnap=getDoc(docRef);
            }
        })
    },[])

    return(
        <div className='profile'>
            <div className="profile-container">
                <form action=''>
                    <h3>Profile details</h3>
                    <label htmlFor='avatar'>
                        <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='avatar' accept='.png, .jpg, .jpeg' hidden/>
                        <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt=""/>
                        upload profile image
                    </label>
                    <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Your name' required />
                    <textarea onChange={(e)=>setBio(e.target.bio)} value={bio} placeholder='Write profile bio' required></textarea>
                    <button type='submit'>Save</button>
                </form>
                <img  className="profile-pic" src={image? URL.createObjectURL(image) : assets.logo_icon} alt=''/>
            </div>
        </div>
    )
}
export default ProfileUpdate
