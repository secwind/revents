import { createReducer } from '../../app/common/unit/reducerMain'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENT } from './eventConstans'

   const initialState = []

  export const createEvent = (state, payload) => {
    return [...state, Object.assign({}, payload.event)]
  }

  export const updateEvent = (state, payload) => {
    return [
        ...state.filter(event => event.id !== payload.event.id), //ให้ลบข้อมูลที่ตรงกับ event.id
        Object.assign({}, payload.event) // แล้วเพิ่ม ข้อมูล payload.event
        // เพราะ ลบ row  event.id ทิ้งก่อน แล้วเพิ่มกลับเข้าไปใหม่ ทำให้ การรัน Row เปลี่ยนไป
        // เช่น ลบ id ที่ 3 แล้วเพิ่มใหม่ กลายเป็น  1 2 4 5 6 3  ลบ id 3 แล้ว เพิ่มใหม่ ดั่งเช่นตัวอย่าง
    ]
  }

  export const deleteEvent = (state, payload) => {
    return [
        ...state.filter(event => event.id !== payload.eventId) //ให้ลบข้อมูลที่ตรงกับ event.id
    ]
  }

  export const fetchEvents = (state, payload) => {
    return payload.events
  }

  export default createReducer(initialState, {
      [CREATE_EVENT]: createEvent,
      [UPDATE_EVENT]: updateEvent,
      [DELETE_EVENT]: deleteEvent,
      [FETCH_EVENT]: fetchEvents
  })