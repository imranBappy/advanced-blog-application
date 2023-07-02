import { getApp } from "firebase/app";
import { getStorage,ref } from "firebase/storage";
import { app } from "../firebase/firebase";

const upload = async (file:any) => {
    const storage = getStorage();
    try {
        const mountainsRef = ref(storage, file); 
        return {done:true}
    } catch (error) {
        return {done:false}
    }
}

export default upload;