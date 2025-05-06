const ActionType = {
  SET_THREAD_ERROR_MESSAGE: 'SET_THREAD_ERROR_MESSAGE',
  CLEAR_THREAD_ERROR_MESSAGE: 'CLEAR_THREAD_ERROR_MESSAGE',
  SET_COMMENT_ERROR_MESSAGE: 'SET_COMMENT_ERROR_MESSAGE',
  CLEAR_COMMENT_ERROR_MESSAGE: 'CLEAR_COMMENT_ERROR_MESSAGE',
};

function setThreadErrorMessage(threadId, message) {
  return {
    type: ActionType.SET_THREAD_ERROR_MESSAGE,
    payload: { threadId, message },
  };
}

function clearThreadErrorMessage(threadId) {
  return {
    type: ActionType.CLEAR_THREAD_ERROR_MESSAGE,
    payload: { threadId },
  };
}

function showTemporaryThreadError(threadId, message) {
  return (dispatch) => {
    dispatch(setThreadErrorMessage(threadId, message));
    setTimeout(() => dispatch(clearThreadErrorMessage(threadId)), 3000);
  };
}

function setCommentErrorMessage(commentId, message) {
  return {
    type: ActionType.SET_COMMENT_ERROR_MESSAGE,
    payload: { commentId, message },
  };
}

function clearCommentErrorMessage(commentId) {
  return {
    type: ActionType.CLEAR_COMMENT_ERROR_MESSAGE,
    payload: { commentId },
  };
}

function showTemporaryCommentError(commentId, message) {
  return (dispatch) => {
    dispatch(setCommentErrorMessage(commentId, message));
    setTimeout(() => dispatch(clearCommentErrorMessage(commentId)), 3000);
  };
}

export {
  ActionType,
  setThreadErrorMessage,
  clearThreadErrorMessage,
  showTemporaryThreadError,
  setCommentErrorMessage,
  clearCommentErrorMessage,
  showTemporaryCommentError,
};

