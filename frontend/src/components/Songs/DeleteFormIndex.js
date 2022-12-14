import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSong from './DeleteSongForm';
import './EditSong.css'

function DeleteSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='DeleteSongButton' onClick={() => setShowModal(true)}>Delete Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSong setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteSongModal;
