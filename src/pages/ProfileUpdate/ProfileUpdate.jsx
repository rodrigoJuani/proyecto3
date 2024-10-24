import React, { useContext, useEffect, useState } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [uid, setUid] = useState("");
    const [prevImage, setPrevImage] = useState("");
    const {setUserData}=useContext(AppContext)

    const upload = async (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    };

    const profileUpdate = async (event) => {
        event.preventDefault();
        try {
            if (!prevImage && !image) {
                toast.error("Upload profile picture");
                return;
            }
            const docRef = doc(db, 'users', uid);
            if (image) {
                const imgUrl = await upload(image);
                setPrevImage(imgUrl);
                await updateDoc(docRef, {
                    avatar: imgUrl,
                    bio: bio,
                    name: name
                });
            } else {
                await updateDoc(docRef, {
                    bio: bio,
                    name: name
                });
            }
            const snap=await getDoc(docRef);
            setUserData(snap.data());
            

        } catch (error) {
            console.error(error);
            toast.error("Error updating profile: " + error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setName(docSnap.data().name || "");
                    setBio(docSnap.data().bio || "");
                    setPrevImage(docSnap.data().avatar || "");
                }
            } else {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className='profile'>
            <div className="profile-container">
                <form onSubmit={profileUpdate}>
                    <h3>Profile details</h3>
                    <label htmlFor='avatar'>
                        <input onChange={(e) => setImage(e.target.files[0])} type='file' id='avatar' accept='.png, .jpg, .jpeg' hidden />
                        <img src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
                        upload profile image
                    </label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your name' required />
                    <textarea onChange={(e) => setBio(e.target.bio)} value={bio} placeholder='Write profile bio' required></textarea>
                    <button type='submit'>Save</button>
                </form>
                <img className="profile-pic" src={image ? URL.createObjectURL(image) : assets.logo_icon} alt='' />
            </div>
        </div>
    );
};

export default ProfileUpdate;
