import moment from 'moment'
import { toastr } from 'react-redux-toastr'

export const updateProfile = (user) =>  
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        const {isEmpty, isLoaded, ...updateUser} = user
        if (updateUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
            updateUser.dateOfBirth = moment(updateUser.dateOfBirth).toDate()
        }

        try {
            await firebase.updateProfile(updateUser)
            toastr.success('Success','Profile ของคุณได้รับการเปลี่ยนแปลง')
        } catch (error) {
            console.log(error) 
        }
    }

