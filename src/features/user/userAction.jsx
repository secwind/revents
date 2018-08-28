import moment from 'moment'
import { toastr } from 'react-redux-toastr'
import cuid from 'cuid'

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

export const uploadProfileImage = (file, fileName) =>    
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const imageName = cuid();
        const firebase = getFirebase()
        const firestore = getFirestore()
        const user = firebase.auth().currentUser
        const path = `${user.uid}/user_images`
        const options = {
            name: imageName
        }
        try {
            // upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options)
            // get url of image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL
            // get userdoc
            let userDoc = await firestore.get(`users/${user.uid}`)
            // check if user has photo, if not update profile with new image
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                })
                await user.updateProfile({
                    photoURL: downloadURL
                })
            }
            // add the new photos collection
            return await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos'}]
            }, {
                name: imageName,
                url: downloadURL
            })
        } catch (error) {
            console.log(error)
            throw new Error('การอัฟไฟล์รูปภาพมีปัญหา')
        }
    }

    export const deletedPhoto = (photo) =>  
        async (dispatch, getState, {getFirebase, getFirestore}) => {
            const firebase = getFirebase()
            const firestore = getFirestore()
            const user = firebase.auth().currentUser
            try {
                await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
                await firestore.delete({
                    collection: 'users',
                    doc: user.uid,
                    subcollections: [{collection: 'photos', doc: photo.id}]
                })
            } catch (error) {
                console.log(error)
                throw new Error('การลบไฟล์รูปภาพเกิดปัญหา')
            }
        } 

    export const setMainPhoto = photo =>
        async (dispatch, getState, {getFirebase}) => {    
            const firebase = getFirebase()
            try {
                return await firebase.updateProfile({
                    photoURL: photo.url
                })
            } catch (error) {
                console.log(error)
                throw new Error('ไม่สามารถเปลี่ยนรูปโปรไฟล์ได้')
            }
        } 