import { async } from "@firebase/util";
import { loginWithPasswordAndEmail, logoutFirebase, registerUserWhithEmailPassword, singInWhithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );

    }
}

export const startGoogleSingIn = () => {
    return async(dispatch) => {

        dispatch( checkingCredentials() );
        const result = await singInWhithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMenssage))

        dispatch( login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {

        dispatch(checkingCredentials());
        const { ok, uid, phothoURL, errorMenssage } = await registerUserWhithEmailPassword({email, displayName, password})

        if(!ok) return dispatch(logout( {errorMenssage} ))

        dispatch(login({ email, displayName, uid, phothoURL}))
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithPasswordAndEmail({email, password});
        console.log(result)

        if (!result.ok) return dispatch(logout(result))
        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch(logout({errorMenssage}));
    }
}