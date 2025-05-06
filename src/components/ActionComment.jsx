import React from 'react';
import { MdInsertComment } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionComment = ({ count, threadId }) => {
  return (
    <Link to={`/threads/${threadId}`} className="action-item" data-testid="comment-button">
      <MdInsertComment className="comment-icon" />
      <span className="count-text">{count}</span>
    </Link>
  );
};

ActionComment.propTypes = {
  count: PropTypes.number.isRequired,
  threadId: PropTypes.string.isRequired
};

export default ActionComment;