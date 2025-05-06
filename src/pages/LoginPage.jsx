import React from 'react';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };


  return (
    <section className="login-page">
      <LoginInput Login={onLogin } />
    </section>
  );
};

export default LoginPage;
