import React, { useState} from 'react';
import { Modal } from '../../context/Modal';
import CreateSong from './CreateSongForm';
import './CreateSong.css'

function CreateSongModal({setSongCreated, songCreated}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='CreateSongButton' onClick={() => setShowModal(true)}>Create Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSong setShowModal={setShowModal} setSongCreated={setSongCreated} songCreated={songCreated}/>
        </Modal>
      )}
    </>
  );
}

export default CreateSongModal;
