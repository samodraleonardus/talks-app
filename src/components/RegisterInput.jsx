import React from 'react';
import PropTypes from 'prop-types';
import { RiLoginCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

const RegisterInput = ({ register }) => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="login-input" onSubmit={handleSubmit}>
      <h2>Create your Talks account</h2>

      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onNameChange}
        required
        autoComplete="name"
      />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
        autoComplete="email"
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        required
        autoComplete="new-password"
      />
      <button type="submit" className="login-button">
        <RiLoginCircleFill /> Register
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
