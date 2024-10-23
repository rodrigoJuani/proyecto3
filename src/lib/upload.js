import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const upload =async(file)=>{
    const storage = getStorage(); 
    const storageRef = ref(storage, `images/${date.now()+file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve,reject)=>{
    })
}

export default upload
