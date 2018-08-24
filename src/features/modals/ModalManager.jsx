import React from 'react'
import { connect } from 'react-redux'
import TestModal from './TestModal'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'


// modalLookup คือ คลัง Modal ที่ได้รับอนุญาติ
const modalLookup = {
    TestModal,
    LoginModal,
    RegisterModal
}

const mapState = (state) => ({
    currentModal: state.modals
})

const ModalManager = ({currentModal}) => {
    let renderedModal;

    if (currentModal) {
        // modalType คือ detail หรือ โครสร้างทั้งหมดของ func modalProps คือ dataที่เราส่งค่า props ข้าม component กัน
        const {modalType, modalProps} = currentModal
        const ModalComponent = modalLookup[modalType]

        renderedModal = <ModalComponent {...modalProps}/>
    }
  return <span>{renderedModal}</span>
}

export default connect(mapState)(ModalManager)
