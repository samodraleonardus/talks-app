import React from 'react';
import { MdThumbUp } from 'react-icons/md';
import PropTypes from 'prop-types';

const ActionThumbUp = ({ count, onClick, color }) => (
  <div className="action-item" data-testid="upvote-button" onClick={(e) => {
    e.stopPropagation();
    onClick();
  }} style={{ cursor: 'pointer', color }}>
    <MdThumbUp /> <span data-testid="upvote-count">{count}</span>
  </div>
);

ActionThumbUp.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};


export default ActionThumbUp;
