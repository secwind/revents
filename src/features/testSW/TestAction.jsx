import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_STARTED, COUNTER_ACTION_FINISHED } from './TestConstans'

export const incrementConuter = () => {
    return {
        type:INCREMENT_COUNTER
    }
}

export const decrementConuter = () => {
    return {
        type:DECREMENT_COUNTER
    }
}

// หน้าที่ของ TestAction คือ สร้าง func ไปตาม Component เพื่อให้เกิดเหตุการณ์ แล้ว func ในนี้ทำงาน
// พอ func ในนี้ทำงาน จะทำหน้าที่แค่ส่ง TYPE และหรือ PAYLOAD ไปให้ testReducer และใน testReducer จะกำหนดเงื่อนไขการทำงานเอง

export const startCounterAction = () => {
    return {
        type:COUNTER_ACTION_STARTED
    }
}

export const finishCounterAction = () => {
    return {
        type:COUNTER_ACTION_FINISHED
    }
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const incrementAsync = () => {
    return async dispatch => {
        // func นี้กำลังบอกว่า ให้ startCounterAction ทำงานคือ return State.data และ เปิด loading
        dispatch({type: COUNTER_ACTION_STARTED})        
         // ต่อมาให้เกิด หน่วงเวลา 1 วิ
        await delay(1000)
        // แล้วให้เกิด ส่ง type INCREMENT_COUNTER ทำให้เกิด func + ค่า data +1
        dispatch({type: INCREMENT_COUNTER})
        // แล้วส่ง func finishCounterAction ทำให้เกิด func return State.data (+1 จาก func ข้างบน) และ ปิด loading      
        dispatch(finishCounterAction())
    }
}

export const decrementAsync = () => {
    return async dispatch => {
        dispatch(startCounterAction())
        await delay(1000)
        dispatch({type: DECREMENT_COUNTER})
        dispatch(finishCounterAction())
    }
}