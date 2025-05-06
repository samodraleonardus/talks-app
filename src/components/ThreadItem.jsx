import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThreadDetail from './ThreadDetail';
import Avatar from './Avatar';
import ActionThumbUp from './ActionThumbUp';
import ActionThumbDown from './ActionThumbDown';
import ActionComment from './ActionComment';


const ThreadItem = ({ thread, onUpVote, onDownVote, authUser }) => {
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.errorMessage.threadErrors[thread.id]);

  const onThreadClick = () => {
    navigate(`/threads/${thread.id}`);
  };

  const onThreadKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${thread.id}`);
    }
  };

  const isUpVoted = thread.upVotesBy.includes(authUser);
  const isDownVoted = thread.downVotesBy.includes(authUser);

  return (
    <div
      className="thread-item"
      role="button"
      tabIndex={0}
      onClick={onThreadClick}
      onKeyDown={onThreadKeyPress}
    >
      <Avatar
        src={thread.owner.avatar}
        alt={thread.owner.name}
        className="thread-avatar"
      />
      <div className="thread-content">
        <ThreadDetail
          title={thread.title}
          category={thread.category}
          owner={thread.owner}
          createdAt={thread.createdAt}
          body={thread.body}
          threadId={thread.id}
          isCollapsed={true}
        />
        <div className="thread-action">
          <ActionThumbUp
            count={thread.upVotesBy.length}
            onClick={() => onUpVote(thread.id)}
            color={isUpVoted ? 'red' : 'gray'}
          />
          <ActionThumbDown
            count={thread.downVotesBy.length}
            onClick={() => onDownVote(thread.id)}
            color={isDownVoted ? 'red' : 'gray'}
          />
          <ActionComment
            count={thread.totalComments}
            threadId={thread.id}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  thread: PropTypes.shape({
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
  }).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  authUser: PropTypes.string,
};

export default ThreadItem;




