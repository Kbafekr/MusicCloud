import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="loginStyle-outer">

    <form className='loginStyle-inner' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
            <li className='ErrorLi' key={idx}>{error}</li>
            ))}
      </ul>
      <h1 className="SignInModalHeader">Sign in</h1>
      <label className= 'SignUplabel'>
        <input
        className="SignInInputLabel"
        placeholder="Username or Email..."
          type="text"
          autoComplete="email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label>
      <label className= 'SignUplabel'>
        <input
        className="SignInInputLabel"
        placeholder="Password..."
        autoComplete="current-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <button className='submitloginButton' type="submit">Continue</button>
    </form>
          </div>
  );
}

export default LoginForm;
