import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardsList from '../components/LeaderboardsList';
import { asyncReceiveLeaderboards } from '../states/leaderBoardsNew/action';
import { IoIosSpeedometer } from 'react-icons/io';

const LeaderboardsPage = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderBoardsNew);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="scoreboard-wrapper">
      <div className="icon-box-container">
        <div className="icon-box-wrapper">
          <div className="icon-box">
            <IoIosSpeedometer />
          </div>
        </div >
      </div>
      <LeaderboardsList leaderboards={leaderboards} />
    </div>
  );
};

export default LeaderboardsPage;