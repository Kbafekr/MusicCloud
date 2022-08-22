import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpForm.css'

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="SignupForm">

    <form onSubmit={handleSubmit} autoComplete='off'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        <input
        autoComplete="email"
          placeholder="Email..."
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        placeholder="Username..."
        autoComplete="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        placeholder="First Name..."
        type="text"
        autoComplete="cc-given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          />
      </label>
      <label>
        <input
          placeholder="Last Name..."
          autoComplete="cc-family-name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        autoComplete="new-password"
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        autoComplete="new-password"
        placeholder="Confirm Password..."
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
      </label>
      <button type="submit">Accept & Continue</button>
    </form>
          </div>
  );
}

export default SignupForm;
