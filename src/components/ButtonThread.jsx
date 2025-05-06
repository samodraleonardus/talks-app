// import React from 'react';
// import { FaComments } from 'react-icons/fa';
// import { Link, useLocation } from 'react-router-dom';

// const ButtonThread = () => {
//   const location = useLocation();
//   const isActive = location.pathname === '/';

//   return (
//     <Link to="/" className={`button ${isActive ? 'active' : ''}`}>
//       <FaComments className="icon" />
//     </Link>
//   );
// };

// export default ButtonThread;


// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { FaComments } from 'react-icons/fa';
// import { StyledLinkButton } from './style_components/buttonStyle';

// const ButtonThread = () => {
//   const location = useLocation();
//   const isActive = location.pathname === '/';

//   return (
//     <StyledLinkButton to="/" className={isActive ? 'active' : ''}>
//       <FaComments />
//     </StyledLinkButton>
//   );
// };

// export default ButtonThread;





// import React from 'react';
// import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
// import { FaComments } from 'react-icons/fa';
// import { StyledLinkButton } from './style_components/buttonStyle';

// const ButtonThread = ({
//   to = '/',
//   bgColor = 'white',
//   iconColor = 'red',
//   border = 'none',
//   beforeBg = 'conic-gradient(yellow 0deg 90deg, red 90deg 270deg, yellow 270deg 360deg)',
//   afterBg = 'conic-gradient(white 0deg 90deg, white 90deg 270deg, white 270deg 360deg)',
// }) => {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   // Pisahkan props untuk StyledLinkButton
//   const buttonProps = {
//     bgColor,
//     iconColor,
//     border,
//     beforeBg,
//     afterBg,
//   };

//   return (
//     <StyledLinkButton
//       to={to}
//       className={isActive ? 'active' : ''}
//       {...buttonProps} // Menyebarkan props styling ke StyledLinkButton
//     >
//       <FaComments />
//     </StyledLinkButton>
//   );
// };

// ButtonThread.propTypes = {
//   to: PropTypes.string,
//   bgColor: PropTypes.string,
//   iconColor: PropTypes.string,
//   border: PropTypes.string,
//   beforeBg: PropTypes.string,
//   afterBg: PropTypes.string,
// };

// export default ButtonThread;



import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { FaComments, FaHome } from 'react-icons/fa';
import { StyledLinkButton } from './style_components/buttonStyle';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';

// Daftar ikon yang tersedia
const icons = {
  FaComments: <FaComments />,
  FaHome: <FaHome />,
  HiChatBubbleLeftRight: <HiChatBubbleLeftRight />,
};

const ButtonThread = ({
  to = '/',
  bgColor = 'white',
  iconColor = 'red',
  border = 'none',
  beforeBg = 'conic-gradient(yellow 0deg 90deg, red 90deg 270deg, yellow 270deg 360deg)',
  afterBg = 'conic-gradient(white 0deg 90deg, white 90deg 270deg, white 270deg 360deg)',
  iconName = 'FaComments',
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const buttonProps = {
    bgColor,
    iconColor,
    border,
    beforeBg,
    afterBg,
  };

  return (
    <StyledLinkButton
      to={to}
      className={isActive ? 'active' : ''}
      {...buttonProps}
    >
      {icons[iconName] || <FaComments />}
    </StyledLinkButton>
  );
};

ButtonThread.propTypes = {
  to: PropTypes.string,
  bgColor: PropTypes.string,
  iconColor: PropTypes.string,
  border: PropTypes.string,
  beforeBg: PropTypes.string,
  afterBg: PropTypes.string,
  iconName: PropTypes.oneOf(['FaComments', 'FaHome', 'HiChatBubbleLeftRight']),
};

export default ButtonThread;
