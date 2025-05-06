// import React from 'react';
// import { IoIosSpeedometer } from 'react-icons/io';
// import { Link, useLocation } from 'react-router-dom';

// const ButtonLeaderBoard = () => {
//   const location = useLocation();
//   const isActive = location.pathname === '/leaderboards';

//   return (
//     <Link to="/leaderboards" className={`button ${isActive ? 'active' : ''}`}>
//       <IoIosSpeedometer className="icon" />
//     </Link>
//   );
// };

// export default ButtonLeaderBoard;

import React from 'react';
import { IoIosSpeedometer } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { StyledLinkButton } from './style_components/buttonStyle';

const ButtonLeaderBoard = () => {
  const location = useLocation();
  const isActive = location.pathname === '/leaderboards';

  return (
    <StyledLinkButton to="/leaderboards" className={isActive ? 'active' : ''}>
      <IoIosSpeedometer />
    </StyledLinkButton>
  );
};

export default ButtonLeaderBoard;