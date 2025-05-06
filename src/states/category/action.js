const ActionType = {
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  CLEAR_SELECTED_CATEGORY: 'CLEAR_SELECTED_CATEGORY',
};

function setSelectedCategoryActionCreator(category) {
  return {
    type: ActionType.SET_SELECTED_CATEGORY,
    payload: {
      category,
    },
  };
}

function clearSelectedCategoryActionCreator() {
  return {
    type: ActionType.CLEAR_SELECTED_CATEGORY,
  };
}

export {
  ActionType,
  setSelectedCategoryActionCreator,
  clearSelectedCategoryActionCreator,
};