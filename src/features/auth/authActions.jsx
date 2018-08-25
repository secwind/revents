import { LOGIN_USER, SIGN_OUT_USER } from './authConstants'
import { closeModal } from '../modals/modalActions'

export const login = (refUser) => {
    return dispatch => {
        // ส่งข้อมูล refUser คือข้อมูลที่มา จาก ReduxForm ในรูปแบบ object จึงต้องมี {refUser}
        dispatch({type: LOGIN_USER, payload: {refUser}})
        dispatch(closeModal())
    }
}

export const logout = () => {
    return {
        type: SIGN_OUT_USER
    }
}
