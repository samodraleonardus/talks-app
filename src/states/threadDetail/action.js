import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UPVOTE_THREAD_DETAIL: 'UPVOTE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZEVOTE_THREAD_DETAIL: 'NEUTRALIZEVOTE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRALIZEVOTE_COMMENT: 'NEUTRALIZEVOTE_COMMENT',
};

// Action Creators
function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: { userId },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: { userId },
  };
}

function neutralizeVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZEVOTE_THREAD_DETAIL,
    payload: { userId },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZEVOTE_COMMENT,
    payload: { commentId, userId },
  };
}



function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}


function asyncToggleVoteThreadDetail(threadId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    const isUpvoted = threadDetail.upVotesBy.includes(userId);
    const isDownvoted = threadDetail.downVotesBy.includes(userId);


    if (voteType === 'up') {
      if (isUpvoted) {
        dispatch(neutralizeVoteThreadDetailActionCreator(userId));
      } else {
        if (isDownvoted) {
          dispatch(neutralizeVoteThreadDetailActionCreator(userId));
        }
        dispatch(upVoteThreadDetailActionCreator(userId));
      }
    } else if (voteType === 'down') {
      if (isDownvoted) {
        dispatch(neutralizeVoteThreadDetailActionCreator(userId));
      } else {
        if (isUpvoted) {
          dispatch(neutralizeVoteThreadDetailActionCreator(userId));
        }
        dispatch(downVoteThreadDetailActionCreator(userId));
      }
    }

    try {
      if (voteType === 'up') {
        if (isUpvoted) {
          await api.neutralizeVoteThread(threadId);
        } else {
          if (isDownvoted) {
            await api.neutralizeVoteThread(threadId);
          }
          await api.upVoteThread(threadId);
        }
      } else if (voteType === 'down') {
        if (isDownvoted) {
          await api.neutralizeVoteThread(threadId);
        } else {
          if (isUpvoted) {
            await api.neutralizeVoteThread(threadId);
          }
          await api.downVoteThread(threadId);
        }
      }
    } catch (error) {
      alert(`Failed to update vote: ${error.message}`);
      dispatch(neutralizeVoteThreadDetailActionCreator(userId));
    } finally {
      dispatch(hideLoading());
    }
  };
}


function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}



function asyncToggleVoteComment(threadId, commentId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    const targetComment = threadDetail.comments.find((comment) => comment.id === commentId);
    if (!targetComment) {
      dispatch(hideLoading());
      return;
    }

    const isUpvoted = targetComment.upVotesBy.includes(userId);
    const isDownvoted = targetComment.downVotesBy.includes(userId);

    if (voteType === 'up') {
      if (isUpvoted) {
        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
      } else {
        if (isDownvoted) {
          dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
        }
        dispatch(upVoteCommentActionCreator({ commentId, userId }));
      }
    } else if (voteType === 'down') {
      if (isDownvoted) {
        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
      } else {
        if (isUpvoted) {
          dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
        }
        dispatch(downVoteCommentActionCreator({ commentId, userId }));
      }
    }

    try {
      if (voteType === 'up') {
        if (isUpvoted) {
          await api.neutralizeVoteComment(threadId, commentId);
        } else {
          if (isDownvoted) {
            await api.neutralizeVoteComment(threadId, commentId);
          }
          await api.upvoteComment(threadId, commentId);
        }
      } else if (voteType === 'down') {
        if (isDownvoted) {
          await api.neutralizeVoteComment(threadId, commentId);
        } else {
          if (isUpvoted) {
            await api.neutralizeVoteComment(threadId, commentId);
          }
          await api.downvoteComment(threadId, commentId);
        }
      }

      dispatch(asyncReceiveThreadDetail(threadId));
    } catch (error) {
      alert(`Failed to update vote: ${error.message}`);
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
    } finally {
      dispatch(hideLoading());
    }
  };
}


export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  addCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleVoteThreadDetail,
  asyncAddComment,
  asyncToggleVoteComment,
};