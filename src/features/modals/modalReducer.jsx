import { MODAL_OPEN, MODAL_CLOSE } from  './modalConstanst'
import { createReducer } from './../../app/common/unit/reducerMain'

const initialState = null;

export const openModal = (state, payload) => {
    const { modalType, modalPorps } = payload
    return { modalType, modalPorps }
}

export const closeModal = (state, payload) => {
    return null
}


export default createReducer(initialState, { 
   [MODAL_OPEN]: openModal, 
   [MODAL_CLOSE]: closeModal
})