import { toastr } from 'react-redux-toastr'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENT } from './eventConstans'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions'
import { fetchSampleData } from '../../app/data/mockApi'
       
export const fetchEvent = (events) => {
    return {
        type: FETCH_EVENT,
        payload: events
    }
}

export const createEvent = (event) => {
    return async dispatch => {
        try {
            dispatch({
                type:CREATE_EVENT,
                payload: { event }     
            })
            toastr.success('Success!','Event has been created')
        } catch (error) {
            toastr.error('Opp','Somting went wrong!!')
        }
    }
};

export const updateEvent = (event) => {
    return async dispatch => {
        try {
            dispatch({
                type:UPDATE_EVENT,
                payload: { event }     
            })
            toastr.success('Success!','Event has been updated')
        } catch (error) {
            toastr.error('Opp','Somting went wrong!!')
        }
    }
};

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
};

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