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
            <li key={idx}>{error}</li>
            ))}
      </ul>
      <h1>Sign in</h1>
      <label>
        <input
        className="credentialInputLogin"
        placeholder="Username or Email..."
          type="text"
          autoComplete="email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        className="passwordInputLogin"
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
