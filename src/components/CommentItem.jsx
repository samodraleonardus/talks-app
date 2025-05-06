import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import ActionThumbUp from './ActionThumbUp';
import ActionThumbDown from './ActionThumbDown';
import CommentDetail from './CommentDetail';
import { useSelector } from 'react-redux';

const CommentItem = ({ comment, onUpVote, onDownVote, authUser }) => {
  const commentError = useSelector((state) => state.errorMessage.commentErrors[comment.id]);
  const isUpVoted = comment.upVotesBy.includes(authUser);
  const isDownVoted = comment.downVotesBy.includes(authUser);

  return (
    <div className="comment-item">
      <Avatar src={comment.owner.avatar} alt={comment.owner.name} className="thread-avatar"/>
      <div className="comment-content">
        <CommentDetail {...comment} />
        <div className="comment-action">
          <ActionThumbUp
            count={comment.upVotesBy.length}
            onClick={() => onUpVote(comment.id)}
            color={isUpVoted ? 'red' : 'gray'}
          />
          <ActionThumbDown
            count={comment.downVotesBy.length}
            onClick={() => onDownVote(comment.id)}
            color={isDownVoted ? 'red' : 'gray'}
          />
        </div>
        {commentError && <div className="error-message">{commentError}</div>}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  authUser: PropTypes.string,
};

export default CommentItem;

