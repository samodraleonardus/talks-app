import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardsItem from './LeaderboardsItem';

const LeaderboardsList = ({ leaderboards = [] }) => {
  return (
    <div className="leaderboards-list">
      {leaderboards.map(({ user, score }) => (
        <LeaderboardsItem
          key={user.id}
          name={user.name}
          avatar={user.avatar}
          score={score}
        />
      ))}
    </div>
  );
};

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
    })
  ),
};

export default LeaderboardsList;

