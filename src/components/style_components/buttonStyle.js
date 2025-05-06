// import styled, { css } from 'styled-components';
// import { Link } from 'react-router-dom';

// export const buttonStyle = css`
//   position: relative;
//   width: 35px;
//   height: 35px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   border: none;

//   &::before {
//     content: '';
//     position: absolute;
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     background: conic-gradient(
//       yellow 0deg 90deg,
//       red 90deg 270deg,
//       yellow 270deg 360deg
//     );
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: -1;
//   }

//   &::after {
//     content: '';
//     position: absolute;
//     width: 55px;
//     height: 55px;
//     border-radius: 50%;
//     background: conic-gradient(
//       white 0deg 90deg,
//       white 90deg 270deg,
//       white 270deg 360deg
//     );
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: -2;
//   }

//   &.active::before,
//   &:hover::before {
//     background: conic-gradient(
//       white 0deg 90deg,
//       white 90deg 270deg,
//       white 270deg 360deg
//     );
//   }

//   &.active,
//   &:hover {
//     border: 2px solid black;
//   }

//   svg {
//     font-size: 20px;
//     color: red;
//     transition: color 0.3s ease;
//   }

//   &.active svg,
//   &:hover svg {
//     color: black;
//   }
// `;

// export const StyledLinkButton = styled(Link)`
//   ${buttonStyle}
// `;

// export const StyledPlainButton = styled.button`
//   ${buttonStyle}
// `;


import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// Daftar props kustom yang tidak boleh diteruskan ke DOM
const customProps = new Set(['bgColor', 'iconColor', 'border', 'beforeBg', 'afterBg']);

// Fungsi filter untuk props
const shouldForwardProp = (prop) => !customProps.has(prop);

// Gaya umum tombol
const buttonStyle = css`
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: ${(props) => props.border || 'none'};

  &::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${(props) => props.beforeBg || 'conic-gradient(yellow 0deg 90deg, red 90deg 270deg, yellow 270deg 360deg)'};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: ${(props) => props.afterBg || 'conic-gradient(white 0deg 90deg, white 90deg 270deg, white 270deg 360deg)'};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -2;
  }

  svg {
    font-size: 20px;
    color: ${(props) => props.iconColor || 'red'};
    transition: color 0.3s ease;
  }

  &.active::before,
  &:hover::before {
    background: conic-gradient(white 0deg 90deg, white 90deg 270deg, white 270deg 360deg);
  }

  &.active,
  &:hover {
    border: 2px solid black;
  }

  &.active svg,
  &:hover svg {
    color: black;
  }
`;

// Styled component untuk <Link>
export const StyledLinkButton = styled(Link).withConfig({ shouldForwardProp })`
  ${buttonStyle}
`;

// Styled component untuk <button>
export const StyledPlainButton = styled('button').withConfig({ shouldForwardProp })`
  ${buttonStyle}
`;