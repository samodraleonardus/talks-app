import React from 'react';
import ButtonCreateThread from './ButtonCreateThread';
import ButtonLeaderBoard from './ButtonLeaderBoard';
import ButtonLogin from './ButtonLogin';
import ButtonThread from './ButtonThread';


const Navigation = () => {
  return (
    <div className="navigation-container">
      <div className="navigation-title">
        <h1 className="app-title">
        Tal<span className="highlight">k</span>s
        </h1>
      </div>
      <div className="navigation-button">
        <ButtonThread />
        <ButtonCreateThread />
        <ButtonLeaderBoard />
        <ButtonLogin />
      </div>
    </div>
  );
};

export default Navigation;