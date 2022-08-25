import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { EditASong } from '../../store/songs';
import EditSong from './EditSongForm';
import './EditSong.css'

function EditSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='EditSongButton' onClick={() => setShowModal(true)}>Edit Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;
