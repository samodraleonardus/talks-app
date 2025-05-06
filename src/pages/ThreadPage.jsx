import React, { useEffect } from 'react';
import ThreadCategory from '../components/ThreadCategory';
import ThreadList from '../components/ThreadList';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shareNew/action';
import { asyncToggleVoteThread } from '../states/threads/action';
import { showTemporaryThreadError } from '../states/errorMessage/action';
import { Link } from 'react-router-dom';

const selectThreads = (state) => state.threads;
const selectUsers = (state) => state.users;
const selectAuthUser = (state) => state.authUser;
const selectCategory = (state) => state.category;


const ThreadPage = () => {
  const dispatch = useDispatch();
  const threads = useSelector(selectThreads);
  const users = useSelector(selectUsers);
  const authUser = useSelector(selectAuthUser);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const filteredThreads = category
    ? threads.filter((thread) => thread.category === category)
    : threads;

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id || null,
  }));

  const onUpVote = (threadId) => {
    if (!authUser) {
      dispatch(showTemporaryThreadError(threadId, (
        <span>
          Please <Link to="/login" onClick={(e) => e.stopPropagation()}>login</Link> to vote
        </span>
      )));
      return;
    }
    dispatch(asyncToggleVoteThread(threadId, 'up'));
  };

  const onDownVote = (threadId) => {
    if (!authUser) {
      dispatch(showTemporaryThreadError(threadId, (
        <span>
          Please <Link to="/login" onClick={(e) => e.stopPropagation()}>login</Link> to vote
        </span>
      )));
      return;
    }
    dispatch(asyncToggleVoteThread(threadId, 'down'));
  };

  return (
    <section className="thread-page">
      <ThreadCategory categories={categories} />

      <ThreadList
        threads={threadList}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        authUser={authUser?.id || null}
      />
    </section>
  );
};

export default ThreadPage;

