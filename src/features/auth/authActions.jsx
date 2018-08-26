import { SubmissionError } from 'redux-form'
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

export const registerUser = (user) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        try {
            // create user in auth
            let createUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
            // update the auth profile
            await createUser.updateProfile({
                displayName: user.displayName 
            })
            // create in profile in firestore
            // newUser คือการสร้างข้อมูลไป firestore Collection 'users'
            let newUser = {
                displayName: user.displayName,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            //firestore.set(`users/${createUser.uid}`, {...newUser}) คือ
            // คือการสร้างข้อมูลไป firestore Collection 'users'  ${createUser.uid}`คือ docชื่อตรงกับ auth.uid, ตามด้วย {...newUser} คือข้อมูลที่บันทึกลงไป
            await firestore.set(`users/${createUser.uid}`, {...newUser})
            dispatch(closeModal())
        } catch (error) {
            console.log(error)
            
        }
    }
