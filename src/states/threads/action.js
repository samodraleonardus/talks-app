import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALIZEVOTE_THREAD: 'NEUTRALIZEVOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: { threadId, userId },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: { threadId, userId },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZEVOTE_THREAD,
    payload: { threadId, userId },
  };
}


function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}


function asyncToggleVoteThread(threadId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();
    const thread = threads.find((t) => t.id === threadId);
    const userId = authUser.id;

    const isUpvoted = thread.upVotesBy.includes(userId);
    const isDownvoted = thread.downVotesBy.includes(userId);


    if (voteType === 'up') {
      if (isUpvoted) {
        dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      } else {
        if (isDownvoted) {
          dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
        }
        dispatch(upVoteThreadActionCreator({ threadId, userId }));
      }
    } else if (voteType === 'down') {
      if (isDownvoted) {
        dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      } else {
        if (isUpvoted) {
          dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
        }
        dispatch(downVoteThreadActionCreator({ threadId, userId }));
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

      dispatch(hideLoading());
    } catch (error) {
      // Jika gagal, rollback UI
      dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      alert(`Failed to update vote: ${error.message}`);
      dispatch(hideLoading());
    }
  };
}


export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread
};
