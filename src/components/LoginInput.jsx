import React from 'react';
import PropTypes from 'prop-types';
import { RiLoginCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

const LoginInput = ({ Login }) => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Login({ email, password });
  };

  return (
    <form className="login-input" onSubmit={handleSubmit}>
      <h2>
        See <strong>The World</strong>, <br /> Through Talks.
      </h2>

      <input
        type="text"
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
        autoComplete="current-password"
      />
      <button type="submit" className="login-button">
        <RiLoginCircleFill /> Login
      </button>

      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

LoginInput.propTypes = {
  Login: PropTypes.func.isRequired,
};

export default LoginInput;
