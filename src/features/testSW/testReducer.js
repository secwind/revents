import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_STARTED, COUNTER_ACTION_FINISHED } from './TestConstans'
import { createReducer } from '../../app/common/unit/reducerMain'

const initialState = {
    data: 191,
    loading: false
}
const incrementCounter = (state, payload) => {
    return {...state, data: state.data + 1 }
}

const decrementCounter = (state, payload) => {
    return {...state, data: state.data - 1 }
}

export const counterActionStarted = (state, payload)  => {
    return {...state, loading: true }
}

export const counterActionFinished= (state, payload)  => {
    return {...state, loading: false }
}



export default createReducer(initialState, {
    // กำลังบอกว่าถ้า createReducer รับค่า Type เป็น [INCREMENT_COUNTER] นี้ให้ส่งออก func incrementCounter นี้ทำงาน
    [INCREMENT_COUNTER]:incrementCounter,
    [DECREMENT_COUNTER]:decrementCounter,
    [COUNTER_ACTION_STARTED]:counterActionStarted,
    [COUNTER_ACTION_FINISHED]:counterActionFinished
});























// const testReducer = (state = initialState, action) => {
//        switch (action.type) {
//             case INCREMENT_COUNTER:
//                 return {
//                 ...state,
//                 data: state.data+1
//                 }
            
//             case DECREMENT_COUNTER:
//                 return{
//                     ...state,
//                     data: state.data-1
//                 }

//             default:    
//             return state
//        }
// }