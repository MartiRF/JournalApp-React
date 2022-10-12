import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWhithGoogle = async() => {
    try {
        
        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const { displayName, email, photoURL, uid} = result.user
         
        return {
            ok:true,
            displayName, email, photoURL, uid,
        }

    } catch (error) {
        console.log(error)
        const errorCode = error.code;
        const errorMenssage = error.message;
        return {
            ok:false,
            errorMenssage,
            
        }
    }
}


export const registerUserWhithEmailPassword = async({ email, displayName, password}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user

        await updateProfile(FirebaseAuth.currentUser,{ displayName })
        // TODO actuilizar el displayName en firebase

        return {
            ok:true,
            uid, photoURL, email, displayName,
        }

    } catch (error) {
        // console.log(error)
        return {
            ok:false,
            errorMenssage: error.message,
        }
    }
}

export const loginWithPasswordAndEmail =async({email, password}) => {
    //! singWithEmailAndPassword
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;
        return{
            ok:true,
            uid, photoURL, displayName,
        }
        
    } catch (error) {
        return{
            ok:false,
            errorMenssage:error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}