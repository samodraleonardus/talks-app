
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { FaComments, FaHome } from 'react-icons/fa';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { StyledLinkButton } from './style_components/buttonStyle';


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


  // const isActive =
  //   location.pathname === '/' || /^\/threads\/[^/]+$/.test(location.pathname);
  const isActive = location.pathname === to || (to === '/' && /^\/threads\/[^/]+$/.test(location.pathname));

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


