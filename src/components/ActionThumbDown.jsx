import React from 'react';
import { MdThumbDown } from 'react-icons/md';
import PropTypes from 'prop-types';

const ActionThumbDown = ({ count, onClick, color }) => (
  <div className="action-item" data-testid="downvote-button" onClick={(e) => {
    e.stopPropagation();
    onClick();
  }} style={{ cursor: 'pointer', color }}>
    <MdThumbDown /> <span data-testid="downvote-count">{count}</span>
  </div>
);

ActionThumbDown.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export default ActionThumbDown;