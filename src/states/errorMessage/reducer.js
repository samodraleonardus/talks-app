/* eslint-disable no-unused-vars */
import { ActionType } from './action';

const initialState = {
  threadErrors: {},
  commentErrors: {},
};

const errorMessageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case ActionType.SET_THREAD_ERROR_MESSAGE:
    return {
      ...state,
      threadErrors: {
        ...state.threadErrors,
        [action.payload.threadId]: action.payload.message,
      },
    };
  case ActionType.CLEAR_THREAD_ERROR_MESSAGE: {
    const { [action.payload.threadId]: _, ...rest } = state.threadErrors;
    return {
      ...state,
      threadErrors: rest,
    };
  }

  case ActionType.SET_COMMENT_ERROR_MESSAGE:
    return {
      ...state,
      commentErrors: {
        ...state.commentErrors,
        [action.payload.commentId]: action.payload.message,
      },
    };
  case ActionType.CLEAR_COMMENT_ERROR_MESSAGE: {
    const { [action.payload.commentId]: _, ...rest } = state.commentErrors;
    return {
      ...state,
      commentErrors: rest,
    };
  }

  default:
    return state;
  }
};

export default errorMessageReducer;