// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri';
// import { asyncUnsetAuthUser } from '../states/authUser/action';

// const ButtonLogin = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authUser = useSelector((state) => state.authUser);

//   const handleLogout = () => {
//     dispatch(asyncUnsetAuthUser());
//     navigate('/');
//   };

//   const isActive = location.pathname === '/login';

//   if (authUser) {
//     return (
//       <button className="button" onClick={handleLogout}>
//         <RiLogoutCircleFill className="icon" />
//       </button>
//     );
//   }

//   return (
//     <Link to="/login" className={`button ${isActive ? 'active' : ''}`}>
//       <RiLoginCircleFill className="icon" />
//     </Link>
//   );
// };

// export default ButtonLogin;


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { StyledLinkButton, StyledPlainButton } from './style_components/buttonStyle';

const ButtonLogin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  const isActive = location.pathname === '/login';

  if (authUser) {
    return (
      <StyledPlainButton onClick={handleLogout}>
        <RiLogoutCircleFill />
      </StyledPlainButton>
    );
  }

  return (
    <StyledLinkButton to="/login" className={isActive ? 'active' : ''}>
      <RiLoginCircleFill />
    </StyledLinkButton>
  );
};

export default ButtonLogin;