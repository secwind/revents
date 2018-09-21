import { toastr } from 'react-redux-toastr';
import { FETCH_EVENT } from './eventConstans';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';
// import { fetchSampleData } from '../../app/data/mockApi';
import { createNewEvent } from '../../app/common/unit/helpers';
import moment from 'moment';
import firebase from '../../app/config/firebase';

// export const fetchEvent = (events) => {
//     return {
//         type: FETCH_EVENT,
//         payload: events
//     }
// }

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const profileName = getState().firebase.profile.displayName;
    let newEvent = createNewEvent(user, photoURL, event, profileName);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      // create collection 'event_attendee' และให้ doc ชื่อว่า ${createdEvent.id}_${user.uid}`
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        // และใน   collection event_attendee/ ${createdEvent.id}_${user.uid} ก็มีข้อมูลภายในตามนี้
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success('Success!', 'Event has been created');
    } catch (error) {
      toastr.error('Opp', 'Somting went wrong!!');
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate();
    }
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success!', 'Event has been updated');
    } catch (error) {
      toastr.error('Opp', 'Somting went wrong!!');
    }
  };
};

export const cancelToggle = (cancelled, eventID) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? 'คุณแน่ใจไหมว่าจะยกเลิกโพสของคุณ'
    : 'คุณแน่ใจไหม ว่าจะให้แสดงโพสนี้อีกครั้ง';
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventID}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

// export const loadEvents = () => {
//     return async dispatch => {
//         try {
//             dispatch(asyncActionStart())
//             let events = await fetchSampleData()
//             dispatch(fetchEvent(events))
//             dispatch(asyncActionFinish())
//         } catch (error) {
//             console.log(error)
//             dispatch(asyncActionError())
//         }
//     }
// }

export const getEventsForDashboard = (lastEvent) => 
async (dispatch,  getState ) => {
  
  // let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection('events');
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastEvent &&
      await firestore
        .collection('events')
        .doc(lastEvent.id)
        .get();
    let query;

    lastEvent
      ? (query = eventsRef
          // .where('date', '>=', today)
          .orderBy('date')
          // .startAfter(startAfter) เริ่มหลังจาก Doc id นี้
          .startAfter(startAfter)
          .limit(4))
      : (query = eventsRef
          // .where('date', '>=', today)
          .orderBy('date')
          .limit(4));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
        dispatch(asyncActionFinish())
        return querySnap;
    }

    let events = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      events.push(evt);
    }
    dispatch({ type: FETCH_EVENT, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

// func สร้าง Chat ด้วย RealTimeDataBase
export const addEventComment = (eventId, values, parentId) => 
  async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase()
  const profile = getState().firebase.profile
  const user = firebase.auth().currentUser
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || 'assets/images/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  }
  try {
    await firebase.push(`event_chat/${eventId}`, newComment)
  } catch (error) {
    console.log(error)
    toastr.error('Error', 'เกิดปัญหาในการComment')
  }
}