import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ActionType.UPVOTE_THREAD_DETAIL:
    if (!threadDetail) return threadDetail;
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.concat(action.payload.userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };

  case ActionType.DOWNVOTE_THREAD_DETAIL:
    if (!threadDetail) return threadDetail;
    return {
      ...threadDetail,
      downVotesBy: threadDetail.downVotesBy.concat(action.payload.userId),
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
    };

  case ActionType.NEUTRALIZEVOTE_THREAD_DETAIL:
    if (!threadDetail) return threadDetail;
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };

  case ActionType.ADD_COMMENT:
    if (!threadDetail) return threadDetail;
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };

  case ActionType.UPVOTE_COMMENT:
    if (!threadDetail) return threadDetail;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.concat(action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };

  case ActionType.DOWNVOTE_COMMENT:
    if (!threadDetail) return threadDetail;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.concat(action.payload.userId),
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };

  case ActionType.NEUTRALIZEVOTE_COMMENT:
    if (!threadDetail) return threadDetail;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
