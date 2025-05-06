import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';

const CommentDetail = ({ content, createdAt, owner }) => {
  return (
    <div className="comment-detail">
      <p className="comment-meta">
        {owner.name} | {postedAt(createdAt)}
      </p>
      <p className="comment-body"
        dangerouslySetInnerHTML={{ __html: content }}>
      </p>
    </div>
  );
};

CommentDetail.propTypes = {
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentDetail;