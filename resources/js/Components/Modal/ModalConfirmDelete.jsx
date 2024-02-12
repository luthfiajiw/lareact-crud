import React from 'react'
import Modal from '../Modal'

function ModalConfirmDelete({ show }) {
  function onClose() {
    window.history.back()
  }

  return (
    <Modal show={show} onClose={onClose}>
      
    </Modal>
  )
}

export default ModalConfirmDelete