// import styled, { css } from 'styled-components';

// export const ThreadCategoryContainer = styled.div`
//   padding: 10px;
//   height: 150px;
//   margin-bottom: 10px;
// `;

// export const ThreadCategoryWrapper = styled.div`
//   border-radius: 50px;
//   position: relative;
//   margin-top: 30px;
// `;

// export const ThreadCategoryTitle = styled.div`
//   border-radius: 50%;
//   position: absolute;
//   width: 80px;
//   height: 80px;
//   background-color: red;
//   border: 5px solid white;
//   box-shadow: 0 0 0 5px red;
// `;

// export const CategoryTitleText = styled.h4`
//   position: absolute;
//   color: white;
//   left: 10px;
//   z-index: 1;
//   top: 12px;
// `;

// export const ThreadCategoryTags = styled.div`
//   display: inline-block;
//   background-color: red;
//   color: white;
//   padding: 10px;
//   border-radius: 8px;
//   font-size: 13px;
//   font-weight: 500;
//   margin-bottom: 0px;
//   bottom: -65px;
//   left: 35px;
//   position: relative;
// `;

// export const TagsWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
// `;

// export const Tag = styled.span`
//   color: white;
//   border: 2px solid white;
//   padding: 6px 12px;
//   border-radius: 20px;
//   font-weight: 500;
//   font-size: 15px;
//   cursor: pointer;
//   transition: 0.3s;

//   ${({ isActive }) =>
//     isActive &&
//     css`
//       background-color: white;
//       color: red;
//     `}

//   &:hover {
//     background-color: white;
//     color: red;
//   }
// `;


import styled, { css } from 'styled-components';

export const ThreadCategoryContainer = styled.div`
  padding: 10px;
  height: 150px;
  margin-bottom: 10px;
`;

export const ThreadCategoryWrapper = styled.div`
  border-radius: 50px;
  position: relative;
  margin-top: 30px;
`;

export const ThreadCategoryTitle = styled.div`
  border-radius: 50%;
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: ${({ $primaryColor }) => $primaryColor || 'red'};
  border: 5px solid white;
  box-shadow: 0 0 0 5px ${({ $primaryColor }) => $primaryColor || 'red'};
`;

export const CategoryTitleText = styled.h4`
  position: absolute;
  color: ${({ $textColor }) => $textColor || 'white'};
  left: 10px;
  z-index: 1;
  top: 12px;
`;

export const ThreadCategoryTags = styled.div`
  display: inline-block;
  background-color: ${({ $primaryColor }) => $primaryColor || 'red'};
  color: ${({ $textColor }) => $textColor || 'white'};
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 0px;
  bottom: -65px;
  left: 35px;
  position: relative;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  color: ${({ $textColor }) => $textColor || 'white'};
  border: 2px solid ${({ $textColor }) => $textColor || 'white'};
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;

  ${({ $isActive, $activeBgColor, $activeTextColor }) =>
    $isActive &&
    css`
      background-color: ${$activeBgColor || 'white'};
      color: ${$activeTextColor || 'red'};
    `}

  &:hover {
    background-color: ${({ $hoverBgColor }) => $hoverBgColor || 'white'};
    color: ${({ $hoverTextColor }) => $hoverTextColor || 'red'};
  }
`;
