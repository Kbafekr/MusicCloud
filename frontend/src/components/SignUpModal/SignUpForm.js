import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignUpForm.css";

function SignupForm({ setModalState }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const formValidationErrors = [];

    if (firstName.length < 2 || firstName.length > 30)
      formValidationErrors.push(
        "First name must be between 2 and 30 characters"
      );
    if (firstName.includes("@"))
      formValidationErrors.push("First name cannot be an email");
    if (lastName.length < 2 || lastName.length > 30)
      formValidationErrors.push(
        "Last name must be between 2 and 30 characters"
      );
    if (lastName.includes("@"))
      formValidationErrors.push("First name cannot be an email");
    if (email.length < 3 || email.length > 256)
      formValidationErrors.push("Email must be between 3 and 256 characters");
    if (!email.includes("@"))
      formValidationErrors.push('Email must have an "@"');
    if (username.length < 4 || username.length > 30)
      formValidationErrors.push("Username must be between 4 and 30 characters");
    if (username.includes("@"))
      formValidationErrors.push("Username cannot be an email");
    if (password.length < 8)
      formValidationErrors.push("Passwords must be at least 8 characters");
    if (password !== confirmPassword)
      formValidationErrors.push("Passwords must match");

    setErrors(formValidationErrors);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      setModalState(false);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          imageUrl,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return errors;
  };

  return (
    <div className="SignupForm-outer">
      {/* <button className='closeButton' onClick={handleSubmit}>Close</button> */}
      <form
        className="SignupForm-inner"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="errorHandlingContainer">
          {errors.length > 0 && (
            <div className="HeaderErrorStyling">
              <ul className="UlBulletErrorStyling">
                {errors.map((error, idx) => (
                  <li className="ErrorPoints" key={idx}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <h1 className="labelHeader">Create an account</h1>
        <label className="label">
          <h2 className="SignupModalHeader2">Email</h2>
          <input
            className="labelInput"
            autoComplete="email"
            placeholder="Email..."
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="label">
          <h2 className="SignupModalHeader2">Username</h2>
          <input
            className="labelInput"
            placeholder="Username..."
            autoComplete="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="label">
          <h2 className="SignupModalHeader2">First Name</h2>

          <input
            className="labelInput"
            placeholder="First Name..."
            type="text"
            autoComplete="cc-given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className="label">
          <h2 className="SignupModalHeader2">Last Name</h2>

          <input
            className="labelInput"
            placeholder="Last Name..."
            autoComplete="cc-family-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className="label">
          <h2 className="SignupModalHeader2">Profile Image (Optional)</h2>
          <input
            className="labelInput"
            placeholder="Profile Image Url (Optional)..."
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label className="label">
          <h2 className="SignupModalHeader2">Password</h2>
          <input
            className="labelInput"
            autoComplete="new-password"
            placeholder="Password..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="label">
          <h2 className="SignupModalHeader2">Confirm Password</h2>
          <input
            className="labelInput"
            autoComplete="new-password"
            placeholder="Confirm Password..."
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="submitInputSignup" type="submit">
          Accept & Continue
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
