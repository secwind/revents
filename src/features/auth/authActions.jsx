import { SubmissionError } from 'redux-form'
import { SIGN_OUT_USER } from './authConstants'
import { closeModal } from '../modals/modalActions'

export const login = (refUser) => {
    return async (dispatch, getState, {getFirebase}) => {
        // ส่งข้อมูล refUser คือข้อมูลที่มา จาก ReduxForm ในรูปแบบ object จึงต้องมี {refUser}
        // dispatch({type: LOGIN_USER, payload: {refUser}})
        const firebase = getFirebase()
        try {
            await firebase.auth().signInWithEmailAndPassword(refUser.email, refUser.password)
            dispatch(closeModal())
        } catch (error) {
            console.log(error)
            throw new SubmissionError({
                _error: 'เกิดข้อผิดพลาด ตรวจสอบ User & Password' 
                //error.message คือการกำหนด ข้อความ error ตามระบบ
            })
        };
        
    }
}

export const logout = () => {
    return {
        type: SIGN_OUT_USER
    }
}
