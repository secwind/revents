import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';
import firebase from '../../app/config/firebase';
import { FETCH_EVENT } from '../event/eventConstans';

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isEmpty, isLoaded, ...updateUser } = user;
  if (updateUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updateUser.dateOfBirth = moment(updateUser.dateOfBirth).toDate();
  }

  try {
    await firebase.updateProfile(updateUser);
    toastr.success('Success', 'Profile ของคุณได้รับการเปลี่ยนแปลง');
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    // upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    // get userdoc
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo, if not update profile with new image
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    // add the new photos collection
    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error('การอัฟไฟล์รูปภาพมีปัญหา');
  }
};

export const deletedPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error('การลบไฟล์รูปภาพเกิดปัญหา');
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    console.log(error);
    throw new Error('ไม่สามารถเปลี่ยนรูปโปรไฟล์ได้');
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  const photoURL = getState().firebase.profile.photoURL;
  const attendee = {
    going: true,
    joinDate: Date.now(),
    photoURL: photoURL || '/assets/images/user.png',
    displayName: user.displayName,
    host: false
  };
  try {
    // ให้ update ข้อมูลของ Collection->events/doc ${event.id}
    // โดยในข้อมูลคือ attendees.เลข id ของ doc users ข้อมูลคือ const attendee
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee
    });
    //ให้สร้าง Doc ให้ใน Collection event_attendee ชื่อ doc: ${event.id}_${user.uid}
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      //eventId คือเลข doc ของ Collection->events
      eventId: event.id,
      //userId คือเลข doc ของ Collection->users
      userUid: user.uid,
      // วันที่โพสจอย event ของเพื่อน
      eventDate: event.date,
      // เราไม่ใช่เจ้าของโพส เพราะเราแค่ join post
      host: false
    });
    toastr.success('Success', `คุณได้ร่วม Evnt ของ ${event.hostedBy} สำเร็จ`);
  } catch (error) {
    console.log(error);
    toastr.error('Error!!', 'พบปัญหาการร่วม Event');
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  try {
    // สั่งให้ไปแก้ไขใน  collection events/${event.id}
    // ให้ ลบฟิลทั้งหมดของ attendees.${user.uid}
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });
    // และไปลบข้อมูลทั้งหมด collection event_attendee doc -> ${event.id}_${user.uid}
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success(
      'Success',
      `คุณได้ยกเลิกการ Join Post ทั้งหมดใน Event นี้ของ ${
        event.hostedBy
      } สำเร็จ`
    );
  } catch (error) {
    console.log(error);
    toastr.error('Error!!', 'พบปัญหาการยกเลิก Event');
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  let eventRef = firestore.collection('event_attendee');
  let query;
  switch (activeTab) {
    case 1: // past events
      query = eventRef
        .where('userUid', '==', userUid)
        .where('eventDate', '<=', today)
        .orderBy('eventDate', 'desc');
      break;
    case 2: // future events
      query = eventRef
        .where('userUid', '==', userUid)
        .where('eventDate', '>=', today)
        .orderBy('eventDate');
      break;
    case 3: // hosted events
      query = eventRef
        .where('userUid', '==', userUid)
        .where('host', '==', true)
        .orderBy('eventDate', 'desc');
      break;
    default:
      query = eventRef
        .where('userUid', '==', userUid)
        .orderBy('eventDate', 'desc');
  }

  try {
      let querySnap = await query.get()
      let events = []

      for (let i = 0; i < querySnap.docs.length; i++) {
          const evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get()
          events.push({...evt.data(), id: evt.id})  
      }
    console.log(querySnap)
      dispatch({type: FETCH_EVENT, payload: {events}})
      dispatch(asyncActionFinish())
  } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
  }
};
