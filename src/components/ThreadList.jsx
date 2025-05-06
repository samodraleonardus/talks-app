import React from 'react';
import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';

const ThreadList = ({ threads, onUpVote, onDownVote, authUser }) => {
  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          authUser={authUser}
        />
      ))}
    </div>
  );
};
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      body: PropTypes.string,
      category: PropTypes.string,
      createdAt: PropTypes.string,
      owner: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  authUser: PropTypes.string,
};

export default ThreadList;







