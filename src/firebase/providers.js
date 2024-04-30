import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { fireBaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(fireBaseAuth, googleProvider);
        /* const credentials = GoogleAuthProvider.credentialFromResult(result); */
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            //userInfo
            displayName, email, photoURL, uid
        }

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorCode,
            errorMessage
        }
       
    }
}

export const registeUserWithEmailPassword = async({email, password, displayName})=> {
    try {
        
        const resp = await createUserWithEmailAndPassword(fireBaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        await updateProfile(fireBaseAuth.currentUser, {
            displayName
        })
        
        return {
            ok: true,
            uid, photoURL, email, displayName
            
        }
    } catch (error) {
       return {ok: false, errorMessage: error.message} 
    }
}

export const loginWithEmailPassword = async({ email, password}) => {
    try {
        const userCrendential = await signInWithEmailAndPassword(fireBaseAuth, email, password)
        const {uid, photoURL, displayName} = userCrendential.user
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        return {ok: false, errorMessage: error.message} 
    }
}

export const logoutFireBase = async() => {
    return await fireBaseAuth.signOut();
}