// import React from 'react';
// import { IoIosAddCircle } from 'react-icons/io';
// import { Link, useLocation } from 'react-router-dom';

// const ButtonCreateThread = () => {
//   const location = useLocation();
//   const isActive = location.pathname === '/threads';

//   return (
//     <Link to="/threads" className={`button ${isActive ? 'active' : ''}`}>
//       <IoIosAddCircle className="icon" />
//     </Link>
//   );
// };

// export default ButtonCreateThread;

import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { StyledLinkButton } from './style_components/buttonStyle';

const ButtonCreateThread = () => {
  const location = useLocation();
  const isActive = location.pathname === '/threads';

  return (
    <StyledLinkButton to="/threads" className={isActive ? 'active' : ''}>
      <IoIosAddCircle />
    </StyledLinkButton>
  );
};

export default ButtonCreateThread;