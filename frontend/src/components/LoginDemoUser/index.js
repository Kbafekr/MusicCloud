import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginDemo.css'






function LoginAsDemo() {

    // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    return dispatch(sessionActions.login({ credential: 'DemoUser@me.com', password: 'password' }))
  }

  return (
    <>
      <button className='LogInDemo' onClick={handleSubmit}>Demo user</button>
    </>
  );
}

export default LoginAsDemo;
