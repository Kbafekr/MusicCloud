import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteAlbum from './DeleteAlbumForm';
import './DeleteAlbum.css'

function DeleteAlbumModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='DeleteAlbumButton' onClick={() => setShowModal(true)}>Delete Album</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteAlbum setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteAlbumModal;
