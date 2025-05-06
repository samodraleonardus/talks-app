import React from 'react';
import PropTypes from 'prop-types';
import ThreadDetail from './ThreadDetail';
import Avatar from './Avatar';
import ActionThumbUp from './ActionThumbUp';
import ActionThumbDown from './ActionThumbDown';
import { useSelector } from 'react-redux';


const CommentThreadDetail = ({ thread, onUpVote, onDownVote, authUser }) => {
  const threadError = useSelector((state) => state.errorMessage.threadErrors[thread.id]);

  const isUpVoted = authUser ? thread.upVotesBy.includes(authUser) : false;
  const isDownVoted = authUser ? thread.downVotesBy.includes(authUser) : false;

  return (
    <div className="thread-item" >
      <Avatar
        src={thread.owner.avatar}
        alt={thread.owner.name}
        className="thread-avatar"
      />
      <div className="thread-content">
        <ThreadDetail
          {...thread}
          isCollapsed={false}
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
        </div>
        {threadError && <div className="error-message">{threadError}</div>}
      </div>
    </div>
  );
};

CommentThreadDetail.propTypes = {
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

export default CommentThreadDetail;
