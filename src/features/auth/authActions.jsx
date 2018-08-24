import { LOGIN_USER, SIGN_OUT_USER } from './authConstants'

export const login = (refUser) => {
    return {
        type: LOGIN_USER,
        payload:{
            refUser
        }
    }
}

export const logout = () => {
    return {
        type: SIGN_OUT_USER
    }
}
