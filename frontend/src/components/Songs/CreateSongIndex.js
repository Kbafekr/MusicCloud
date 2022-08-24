import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { CreateASong } from '../../store/songs';
import CreateSong from './CreateSongForm';
import './CreateSong.css'

function CreateSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='CreateSongButton' onClick={() => setShowModal(true)}>Create Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSong />
        </Modal>
      )}
    </>
  );
}

export default CreateSongModal;
