import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditAlbum from './EditAlbumForm';
import './EditAlbum.css'

function EditAlbumModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='EditAlbumButton' onClick={() => setShowModal(true)}>Edit Album</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbum setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditAlbumModal;
