import React, { useState} from 'react';
import { Modal } from '../../../context/Modal';
import CreateAlbum from './CreateAlbumForm'
import './CreateAlbum.css'

function CreateAlbumModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='CreateAlbumButton' onClick={() => setShowModal(true)}>Create Album</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateAlbum setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateAlbumModal;
