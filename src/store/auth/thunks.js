import { loginWithEmailPassword, logoutFireBase, registeUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    
    return async( dispatch ) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = (email, password) => {
    
    return async( dispatch ) => {
        dispatch(checkingCredentials())
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result))
    }
}

export const starCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid, photoURL, errorMessage} = await registeUserWithEmailPassword({email, password, displayName})
        if(!ok) return dispatch(logout({errorMessage}))
        dispatch(login({ uid, displayName, email, photoURL}))
    }
}

export const starLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await loginWithEmailPassword({email, password})
        const {errorMessage} = result

        if(!result.ok) return dispatch(logout({errorMessage}))
        dispatch(login(result))
    }
}

export const starLogout = () => {
    return async (dispatch) => {
        await logoutFireBase();
        dispatch(clearNotesLogout())
        dispatch(logout({}))

    }
}