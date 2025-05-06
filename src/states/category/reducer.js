import { ActionType } from './action';

const selectedCategoryReducer = (selectedCategory = null, action = {}) => {
  switch (action.type) {
  case ActionType.SET_SELECTED_CATEGORY:
    return action.payload.category;

  case ActionType.CLEAR_SELECTED_CATEGORY:
    return null;

  default:
    return selectedCategory;
  }
};

export default selectedCategoryReducer;