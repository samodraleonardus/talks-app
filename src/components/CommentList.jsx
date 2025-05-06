import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentList = ({ comments, onUpVote, onDownVote, authUser }) => {
  if (comments.length === 0) {

    const dummyComment = {
      id: 'dummy-comment',
      content: 'Be the first to leave a comment.',
      createdAt: new Date().toISOString(),
      owner: {
        name: 'System Bot',
        avatar: 'https://ui-avatars.com/api/?name=System+Bot',
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    return (
      <div>
        <CommentItem
          key={dummyComment.id}
          comment={dummyComment}
          onUpVote={() => {}}
          onDownVote={() => {}}
          authUser={authUser}
        />
      </div>
    );
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          authUser={authUser}
        />
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  authUser: PropTypes.string,
};

export default CommentList;
