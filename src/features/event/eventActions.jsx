import { toastr } from 'react-redux-toastr'
import { DELETE_EVENT, FETCH_EVENT } from './eventConstans'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions'
import { fetchSampleData } from '../../app/data/mockApi'
import { createNewEvent } from '../../app/common/unit/helpers'
import moment from 'moment'
       
export const fetchEvent = (events) => {
    return {
        type: FETCH_EVENT,
        payload: events
    }
}

export const createEvent = (event) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        const user = firestore.auth().currentUser
        const photoURL = getState().firebase.profile.photoURL
        let newEvent = createNewEvent(user, photoURL, event )
        try {
            let createdEvent = await firestore.add(`events`, newEvent)
            // create collection 'event_attendee' และให้ doc ชื่อว่า ${createdEvent.id}_${user.uid}`
            await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
            // และใน   collection event_attendee/ ${createdEvent.id}_${user.uid} ก็มีข้อมูลภายในตามนี้ 
                eventId: createdEvent.id,
                userUid: user.uid,
                eventDate: event.date,
                host: true
            })
            toastr.success('Success!','Event has been created')
        } catch (error) {
            toastr.error('Opp','Somting went wrong!!')
        }
    }
};

export const updateEvent = (event) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        if (event.date !== getState().firestore.ordered.events[0].date) {
            event.date = moment(event.date).toDate()
        }
        try {
            await firestore.update(`events/${event.id}`, event)
            toastr.success('Success!','Event has been updated')
        } catch (error) {
            toastr.error('Opp','Somting went wrong!!')
        }
    }
};

export const cancelToggle = (cancelled, eventID) => 
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        const message = cancelled ? 'คุณแน่ใจไหมว่าจะยกเลิกโพสของคุณ' : 'คุณแน่ใจไหม ว่าจะให้แสดงโพสนี้อีกครั้ง'
        try {
            toastr.confirm(message, {
                onOk: () =>
                firestore.update(`events/${eventID}`, {
                cancelled: cancelled
                })
            })
        } catch (error) {
            console.log(error)
        }
    }


export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
}

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart())
            let events = await fetchSampleData()
            dispatch(fetchEvent(events))
            dispatch(asyncActionFinish())
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError())
        }
    }
}