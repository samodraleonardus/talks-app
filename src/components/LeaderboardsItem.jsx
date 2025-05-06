import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const LeaderboardsItem = ({ name, score, avatar }) => {
  return (
    <div className="score-item">
      <Avatar src={avatar} alt={name} className="leaderboard-avatar" />
      <div className="name">{name}</div>
      <div className="score">{score}</div>
    </div>
  );
};

LeaderboardsItem.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default LeaderboardsItem;
