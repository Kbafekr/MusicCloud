import React, { useState} from 'react';
import { Modal } from '../../context/Modal';
import CreateComment from './CreateCommentForm';
import './CreateCommentForm.css'

function CreateCommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='CreateCommentButton' onClick={() => setShowModal(true)}>Create Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateComment setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateCommentModal;
