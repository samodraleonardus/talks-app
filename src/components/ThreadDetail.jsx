import React from 'react';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';

const ThreadDetail = ({ title, category, owner, createdAt, body, isCollapsed = true }) => {
  return (
    <div className="thread-detail">
      <p className="thread-meta">
        {owner.name} | {postedAt(createdAt)} |{' '}
        <span className="thread-category-detail">#{category}</span>
      </p>
      <h4 className="title">{title}</h4>
      <div
        className={`thread-body ${isCollapsed ? 'collapsed' : ''}`}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
};

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool,
};

export default ThreadDetail;
