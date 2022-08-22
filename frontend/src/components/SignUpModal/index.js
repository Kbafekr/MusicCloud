import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignUpForm';
import './SignUpForm.css'

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='SignupNavBar' onClick={() => setShowModal(true)}>Create account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
