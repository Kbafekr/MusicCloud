import React, { useState } from "react";
import { useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";
import './SignUpForm.css'

function SignupForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, imageUrl, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="SignupForm-outer">
      {/* <button className='closeButton' onClick={handleSubmit}>Close</button> */}
    <form className="SignupForm-inner" onSubmit={handleSubmit} autoComplete='off'>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <h1>Create an account</h1>
      <label className= 'label'>
        <input
        className="emailInputSignup"
        autoComplete="email"
          placeholder="Email..."
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </label>
      <label className= 'label'>
        <input
        className="usernameInputSignup"
        placeholder="Username..."
        autoComplete="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </label>
      <label className= 'label'>
        <input
        className="firstnameInputSignup"
        placeholder="First Name..."
        type="text"
        autoComplete="cc-given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          />
      </label>
      <label className= 'label'>
        <input
        className="lastnameInputSignup"
          placeholder="Last Name..."
          autoComplete="cc-family-name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          />
      </label>
      <label className= 'label'>
        <input
        className="imageUrlInputSignup"
          placeholder="Profile Image Url..."
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          />
      </label>
      <label className= 'label'>
        <input
        className="passwordInputSignup"
        autoComplete="new-password"
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <label className= 'label'>
        <input
        className="confirmpasswordInputSignup"
        autoComplete="new-password"
        placeholder="Confirm Password..."
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
      </label>
      <button className="submitInputSignup" type="submit">Accept & Continue</button>
    </form>
          </div>
  );
}

export default SignupForm;
