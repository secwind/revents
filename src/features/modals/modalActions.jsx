import { MODAL_OPEN, MODAL_CLOSE } from './modalConstanst'

export const openModal = (modalType, modalProps) => {
    return {
        type: MODAL_OPEN,
        payload: {
            modalType,
            modalProps
        }
    }
}

export const closeModal = (modalType, modalProps) => {
    return {
        type: MODAL_CLOSE,
        payload: {
            modalType,
            modalProps
        }
    }
}