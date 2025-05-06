import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadCreate from '../components/ThreadCreate';
import { asyncAddThread } from '../states/threads/action';

const ThreadCreatePage = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const onThreadSubmit = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
  };

  return (
    <section>
      <ThreadCreate onSubmit={onThreadSubmit}
        isLoggedIn={authUser !== null}
      />
    </section>
  );
};

export default ThreadCreatePage;