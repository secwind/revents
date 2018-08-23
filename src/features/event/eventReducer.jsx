import { createReducer } from '../../app/common/unit/reducerMain'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstans'

   const initialState = [
      {
        id: '1',
        title: 'Trip to Empire State building',
        date: '2018-03-21',
        category: 'culture',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'NY, USA',
        venue: 'Empire State Building, 5th Avenue, New York, NY, USA',
        venueLatLng: {
          lat: 40.7484405,
          lng: -73.98566440000002
        },
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
          {
            id: 'a',
            name: 'Bob',
            photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
          },
          {
            id: 'b',
            name: 'Tom',
            photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
          }
        ]
      },
      {
        id: '2',
        title: 'Trip to Punch and Judy Pub',
        date: '2018-03-18',
        category: 'drinks',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Punch & Judy, Henrietta Street, London, UK',
        venueLatLng: {
          lat: 51.5118074,
          lng: -0.12300089999996544
        },
        hostedBy: 'Tom',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: [
          {
            id: 'a',
            name: 'Bob',
            photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
          },
          {
            id: 'b',
            name: 'Tom',
            photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
          }
        ]
      }
    ];

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

  export default createReducer(initialState, {
      [CREATE_EVENT]: createEvent,
      [UPDATE_EVENT]: updateEvent,
      [DELETE_EVENT]: deleteEvent
  })