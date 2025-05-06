// import React from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedCategoryActionCreator, clearSelectedCategoryActionCreator } from '../states/category/action';

// const ThreadCategory = ({ categories }) => {
//   const dispatch = useDispatch();
//   const selectedCategory = useSelector((state) => state.category);

//   const handleCategoryClick = (category) => {
//     if (selectedCategory === category) {
//       dispatch(clearSelectedCategoryActionCreator());
//     } else {
//       dispatch(setSelectedCategoryActionCreator(category));
//     }
//   };

//   return (
//     <div className="thread-category-container">
//       <div className="thread-category">
//         <div className="thread-category-title">
//           <h4 className="category-title">Category</h4>
//         </div>
//       </div>
//       <div className="thread-category-tags">
//         <div className="tags">
//           {categories.map((cat, index) => (
//             <span
//               className={`tag ${selectedCategory === cat ? 'active' : ''}`}
//               key={index}
//               onClick={() => handleCategoryClick(cat)}
//               style={{ cursor: 'pointer' }}
//             >
//                 #{cat}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// ThreadCategory.propTypes = {
//   categories: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default ThreadCategory;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setSelectedCategoryActionCreator,
//   clearSelectedCategoryActionCreator,
// } from '../states/category/action';

// import {
//   ThreadCategoryContainer,
//   ThreadCategoryWrapper,
//   ThreadCategoryTitle,
//   CategoryTitleText,
//   ThreadCategoryTags,
//   TagsWrapper,
//   Tag,
// } from './style_components/categoryStyle';

// const ThreadCategory = ({ categories }) => {
//   const dispatch = useDispatch();
//   const selectedCategory = useSelector((state) => state.category);

//   const handleCategoryClick = (category) => {
//     if (selectedCategory === category) {
//       dispatch(clearSelectedCategoryActionCreator());
//     } else {
//       dispatch(setSelectedCategoryActionCreator(category));
//     }
//   };

//   return (
//     <ThreadCategoryContainer>
//       <ThreadCategoryWrapper>
//         <ThreadCategoryTitle>
//           <CategoryTitleText>Category</CategoryTitleText>
//         </ThreadCategoryTitle>
//       </ThreadCategoryWrapper>
//       <ThreadCategoryTags>
//         <TagsWrapper>
//           {categories.map((cat, index) => (
//             <Tag
//               key={index}
//               className={selectedCategory === cat ? 'active' : ''}
//               onClick={() => handleCategoryClick(cat)}
//             >
//               #{cat}
//             </Tag>
//           ))}
//         </TagsWrapper>
//       </ThreadCategoryTags>
//     </ThreadCategoryContainer>
//   );
// };

// ThreadCategory.propTypes = {
//   categories: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default ThreadCategory;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setSelectedCategoryActionCreator,
//   clearSelectedCategoryActionCreator,
// } from '../states/category/action';

// import {
//   ThreadCategoryContainer,
//   ThreadCategoryWrapper,
//   ThreadCategoryTitle,
//   CategoryTitleText,
//   ThreadCategoryTags,
//   TagsWrapper,
//   Tag,
// } from './style_components/categoryStyle';


// const ThreadCategory = ({
//   categories,
//   primaryColor = 'red',
//   textColor = 'white',
//   activeBgColor = 'white',
//   activeTextColor = 'red',
//   hoverBgColor = 'white',
//   hoverTextColor = 'red',
// }) => {
//   const dispatch = useDispatch();
//   const selectedCategory = useSelector((state) => state.category);

//   const handleCategoryClick = (category) => {
//     if (selectedCategory === category) {
//       dispatch(clearSelectedCategoryActionCreator());
//     } else {
//       dispatch(setSelectedCategoryActionCreator(category));
//     }
//   };

//   return (
//     <ThreadCategoryContainer>
//       <ThreadCategoryWrapper>
//         <ThreadCategoryTitle primaryColor={primaryColor}>
//           <CategoryTitleText textColor={textColor}>Category</CategoryTitleText>
//         </ThreadCategoryTitle>
//       </ThreadCategoryWrapper>
//       <ThreadCategoryTags primaryColor={primaryColor} textColor={textColor}>
//         <TagsWrapper>
//           {categories.map((cat, index) => (
//             <Tag
//               key={index}
//               isActive={selectedCategory === cat}
//               activeBgColor={activeBgColor}
//               activeTextColor={activeTextColor}
//               hoverBgColor={hoverBgColor}
//               hoverTextColor={hoverTextColor}
//               textColor={textColor}
//               onClick={() => handleCategoryClick(cat)}
//             >
//               #{cat}
//             </Tag>
//           ))}
//         </TagsWrapper>
//       </ThreadCategoryTags>
//     </ThreadCategoryContainer>
//   );
// };

// ThreadCategory.propTypes = {
//   categories: PropTypes.arrayOf(PropTypes.string).isRequired,
//   primaryColor: PropTypes.string,
//   textColor: PropTypes.string,
//   activeBgColor: PropTypes.string,
//   activeTextColor: PropTypes.string,
//   hoverBgColor: PropTypes.string,
//   hoverTextColor: PropTypes.string,
// };

// export default ThreadCategory;


import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedCategoryActionCreator,
  clearSelectedCategoryActionCreator,
} from '../states/category/action';

import {
  ThreadCategoryContainer,
  ThreadCategoryWrapper,
  ThreadCategoryTitle,
  CategoryTitleText,
  ThreadCategoryTags,
  TagsWrapper,
  Tag,
} from './style_components/categoryStyle';

const ThreadCategory = ({
  categories,
  primaryColor = 'red',
  textColor = 'white',
  activeBgColor = 'white',
  activeTextColor = 'red',
  hoverBgColor = 'white',
  hoverTextColor = 'red',
}) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      dispatch(clearSelectedCategoryActionCreator());
    } else {
      dispatch(setSelectedCategoryActionCreator(category));
    }
  };

  return (
    <ThreadCategoryContainer>
      <ThreadCategoryWrapper>
        <ThreadCategoryTitle $primaryColor={primaryColor}>
          <CategoryTitleText $textColor={textColor}>Category</CategoryTitleText>
        </ThreadCategoryTitle>
      </ThreadCategoryWrapper>
      <ThreadCategoryTags $primaryColor={primaryColor} $textColor={textColor}>
        <TagsWrapper>
          {categories.map((cat, index) => (
            <Tag
              key={index}
              $isActive={selectedCategory === cat}
              $activeBgColor={activeBgColor}
              $activeTextColor={activeTextColor}
              $hoverBgColor={hoverBgColor}
              $hoverTextColor={hoverTextColor}
              $textColor={textColor}
              onClick={() => handleCategoryClick(cat)}
            >
              #{cat}
            </Tag>
          ))}
        </TagsWrapper>
      </ThreadCategoryTags>
    </ThreadCategoryContainer>
  );
};

ThreadCategory.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  primaryColor: PropTypes.string,
  textColor: PropTypes.string,
  activeBgColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
};

export default ThreadCategory;

