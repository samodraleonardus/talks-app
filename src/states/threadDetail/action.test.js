
/**
 * scenario test
 *
 * - Thread Detail Action Creators
 *   - should create correct action for RECEIVE_THREAD_DETAIL
 *   - should create correct action for CLEAR_THREAD_DETAIL
 *   - should create correct action for UPVOTE_THREAD_DETAIL
 *   - should create correct action for DOWNVOTE_THREAD_DETAIL
 *   - should create correct action for NEUTRALIZEVOTE_THREAD_DETAIL
 *   - should create correct action for ADD_COMMENT
 *   - should create correct action for UPVOTE_COMMENT
 *   - should create correct action for DOWNVOTE_COMMENT
 *   - should create correct action for NEUTRALIZEVOTE_COMMENT
 *
 * - asyncReceiveThreadDetail thunk
 *   - should dispatch actions correctly on success
 *   - should call alert when API fails
 *
 * * - asyncToggleVoteThreadDetail thunk
 *   - should dispatch upVoteThreadDetail when not yet voted
 *   - should dispatch neutralizeVoteThreadDetail when already upvoted
 *   - should dispatch downVoteThreadDetail when not yet voted
 *   - should dispatch neutralizeVoteThreadDetail when already downvoted
 *   - should switch from upVote to downVote correctly
 *   - should switch from downVote to upVote correctly
 *   - should call alert and rollback if API fails
 *
 * - asyncAddComment thunk
 *   - should dispatch actions correctly on success
 *   - should call alert when API fails
 *
 * - asyncToggleVoteComment thunk
 *   - should dispatch upVoteComment when not yet voted
 *   - should dispatch neutralizeVoteComment when already upvoted
 *   - should dispatch downVoteComment when not yet voted
 *   - should dispatch neutralizeVoteComment when already downvoted
 *   - should switch from upVote to downVote correctly
 *   - should switch from downVote to upVote correctly
 *   - should call alert and rollback if API fails
 */


import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
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
  ActionType,
} from './action';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

vi.mock('../../utils/api');


describe('threadDetailActionCreator', () => {
  it('should create action for RECEIVE_THREAD_DETAIL correctly', () => {
    const fakeThreadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = receiveThreadDetailActionCreator(fakeThreadDetail);

    expect(action).toStrictEqual({
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: fakeThreadDetail },
    });
  });

  it('should create action for CLEAR_THREAD_DETAIL correctly', () => {
    const action = clearThreadDetailActionCreator();
    expect(action).toStrictEqual({ type: ActionType.CLEAR_THREAD_DETAIL });
  });

  it('should create action for UPVOTE_THREAD_DETAIL correctly', () => {
    const action = upVoteThreadDetailActionCreator('user-1');
    expect(action).toStrictEqual({
      type: ActionType.UPVOTE_THREAD_DETAIL,
      payload: { userId: 'user-1' },
    });
  });

  it('should create action for DOWNVOTE_THREAD_DETAIL correctly', () => {
    const action = downVoteThreadDetailActionCreator('user-2');
    expect(action).toStrictEqual({
      type: ActionType.DOWNVOTE_THREAD_DETAIL,
      payload: { userId: 'user-2' },
    });
  });

  it('should create action for NEUTRALIZEVOTE_THREAD_DETAIL correctly', () => {
    const action = neutralizeVoteThreadDetailActionCreator('user-3');
    expect(action).toStrictEqual({
      type: ActionType.NEUTRALIZEVOTE_THREAD_DETAIL,
      payload: { userId: 'user-3' },
    });
  });

  it('should create action for ADD_COMMENT correctly', () => {
    const fakeComment = {
      id: 'comment-1',
      content: 'Komentar pertama',
      createdAt: '2021-06-21T08:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'Jane Doe',
        avatar: 'https://avatar-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = addCommentActionCreator(fakeComment);

    expect(action).toStrictEqual({
      type: ActionType.ADD_COMMENT,
      payload: { comment: fakeComment },
    });
  });

  it('should create action for UPVOTE_COMMENT correctly', () => {
    const action = upVoteCommentActionCreator({ commentId: 'comment-1', userId: 'user-1' });
    expect(action).toStrictEqual({
      type: ActionType.UPVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    });
  });

  it('should create action for DOWNVOTE_COMMENT correctly', () => {
    const action = downVoteCommentActionCreator({ commentId: 'comment-2', userId: 'user-2' });
    expect(action).toStrictEqual({
      type: ActionType.DOWNVOTE_COMMENT,
      payload: { commentId: 'comment-2', userId: 'user-2' },
    });
  });

  it('should create action for NEUTRALIZEVOTE_COMMENT correctly', () => {
    const action = neutralizeVoteCommentActionCreator({ commentId: 'comment-3', userId: 'user-3' });
    expect(action).toStrictEqual({
      type: ActionType.NEUTRALIZEVOTE_COMMENT,
      payload: { commentId: 'comment-3', userId: 'user-3' },
    });
  });
});

describe('asyncReceiveThreadDetail', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should dispatch actions correctly on success', async () => {
    const fakeThreadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    api.getThreadDetail.mockResolvedValue(fakeThreadDetail);

    const dispatch = vi.fn();
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetail));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should alert error message on failure', async () => {
    api.getThreadDetail.mockRejectedValue(new Error('Network error'));
    window.alert = vi.fn();
    const dispatch = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith('Network error');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncToggleVoteThreadDetail', () => {
  const fakeThreadDetail = {
    id: 'thread-1',
    upVotesBy: [],
    downVotesBy: [],
  };
  const fakeAuthUser = { id: 'user-1' };
  const getState = () => ({ authUser: fakeAuthUser, threadDetail: fakeThreadDetail });

  it('should dispatch upVoteThreadDetail when not yet voted', async () => {
    api.upVoteThread.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteThreadDetail('thread-1', 'up')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadDetailActionCreator('user-1'));
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch neutralizeVoteThreadDetail when already upvoted', async () => {
    const getStateVoted = () => ({
      authUser: fakeAuthUser,
      threadDetail: { ...fakeThreadDetail, upVotesBy: ['user-1'] },
    });

    api.neutralizeVoteThread.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteThreadDetail('thread-1', 'up')(dispatch, getStateVoted);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadDetailActionCreator('user-1'));
    expect(api.neutralizeVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });


  it('should dispatch downVoteThreadDetail when not yet voted', async () => {
    api.downVoteThread.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteThreadDetail('thread-1', 'down')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadDetailActionCreator('user-1'));
    expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch neutralizeVoteThreadDetail when already downvoted', async () => {
    const getStateVoted = () => ({
      authUser: fakeAuthUser,
      threadDetail: { ...fakeThreadDetail, downVotesBy: ['user-1'] },
    });

    api.neutralizeVoteThread.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteThreadDetail('thread-1', 'down')(dispatch, getStateVoted);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadDetailActionCreator('user-1'));
    expect(api.neutralizeVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should switch from upVote to downVote correctly', async () => {
    const getStateVoted = () => ({
      authUser: fakeAuthUser,
      threadDetail: { ...fakeThreadDetail, upVotesBy: ['user-1'] },
    });

    api.downVoteThread.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteThreadDetail('thread-1', 'down')(dispatch, getStateVoted);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadDetailActionCreator('user-1'));
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadDetailActionCreator('user-1'));
    expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should switch from downVote to upVote correctly', async () => {
    const getStateVoted = () => ({
      authUser: fakeAuthUser,
      threadDetail: { ...fakeThreadDetail, downVotesBy: ['user-1'] },
    });

    api.upVoteThread.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteThreadDetail('thread-1', 'up')(dispatch, getStateVoted);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadDetailActionCreator('user-1'));
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadDetailActionCreator('user-1'));
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call alert and rollback if API fails', async () => {
    api.upVoteThread.mockRejectedValue(new Error('Error vote'));
    window.alert = vi.fn();
    const dispatch = vi.fn();

    await asyncToggleVoteThreadDetail('thread-1', 'up')(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith('Failed to update vote: Error vote');
    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadDetailActionCreator('user-1'));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});



describe('asyncAddComment', () => {
  const fakeCommentResponse = {
    id: 'comment-1',
    content: 'Komentar async',
    createdAt: '2021-06-21T08:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'Jane Doe',
      avatar: 'https://avatar-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
  };

  it('should dispatch actions correctly on success', async () => {
    api.createComment.mockResolvedValue(fakeCommentResponse);
    const dispatch = vi.fn();

    await asyncAddComment({ threadId: 'thread-1', content: 'Komentar async' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeCommentResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should alert error message on failure', async () => {
    api.createComment.mockRejectedValue(new Error('Failed to comment'));
    window.alert = vi.fn();
    const dispatch = vi.fn();

    await asyncAddComment({ threadId: 'thread-1', content: 'Error' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith('Failed to comment');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});





describe('asyncToggleVoteComment', () => {
  const fakeThreadId = 'thread-1';
  const fakeCommentId = 'comment-1';
  const fakeAuthUser = { id: 'user-1' };

  const baseState = {
    authUser: fakeAuthUser,
    threadDetail: {
      id: fakeThreadId,
      comments: [
        {
          id: fakeCommentId,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    },
  };

  it('should dispatch upVoteComment when not yet voted', async () => {
    api.upvoteComment.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteComment(fakeThreadId, fakeCommentId, 'up')(dispatch, () => baseState);

    expect(dispatch).toHaveBeenCalledWith(upVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
    expect(api.upvoteComment).toHaveBeenCalledWith(fakeThreadId, fakeCommentId);
  });

  it('should dispatch neutralizeVoteComment when already upvoted', async () => {
    const getState = () => ({
      ...baseState,
      threadDetail: {
        ...baseState.threadDetail,
        comments: [
          {
            id: fakeCommentId,
            upVotesBy: ['user-1'],
            downVotesBy: [],
          },
        ],
      },
    });

    api.neutralizeVoteComment.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteComment(fakeThreadId, fakeCommentId, 'up')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
    expect(api.neutralizeVoteComment).toHaveBeenCalledWith(fakeThreadId, fakeCommentId);
  });

  it('should dispatch downVoteComment when not yet voted', async () => {
    api.downvoteComment.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteComment(fakeThreadId, fakeCommentId, 'down')(dispatch, () => baseState);

    expect(dispatch).toHaveBeenCalledWith(downVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
    expect(api.downvoteComment).toHaveBeenCalledWith(fakeThreadId, fakeCommentId);
  });

  it('should dispatch neutralizeVoteComment when already downvoted', async () => {
    const getState = () => ({
      ...baseState,
      threadDetail: {
        ...baseState.threadDetail,
        comments: [
          {
            id: fakeCommentId,
            upVotesBy: [],
            downVotesBy: ['user-1'],
          },
        ],
      },
    });

    api.neutralizeVoteComment.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteComment(fakeThreadId, fakeCommentId, 'down')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
    expect(api.neutralizeVoteComment).toHaveBeenCalledWith(fakeThreadId, fakeCommentId);
  });

  it('should switch from upVote to downVote correctly', async () => {
    const getState = () => ({
      ...baseState,
      threadDetail: {
        ...baseState.threadDetail,
        comments: [
          {
            id: fakeCommentId,
            upVotesBy: ['user-1'],
            downVotesBy: [],
          },
        ],
      },
    });

    api.downvoteComment.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteComment(fakeThreadId, fakeCommentId, 'down')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(downVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
    expect(api.downvoteComment).toHaveBeenCalledWith(fakeThreadId, fakeCommentId);
  });

  it('should switch from downVote to upVote correctly', async () => {
    const getState = () => ({
      ...baseState,
      threadDetail: {
        ...baseState.threadDetail,
        comments: [
          {
            id: fakeCommentId,
            upVotesBy: [],
            downVotesBy: ['user-1'],
          },
        ],
      },
    });

    api.upvoteComment.mockResolvedValue();
    const dispatch = vi.fn();

    await asyncToggleVoteComment(fakeThreadId, fakeCommentId, 'up')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(upVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
    expect(api.upvoteComment).toHaveBeenCalledWith(fakeThreadId, fakeCommentId);
  });

  it('should call alert and rollback if API fails', async () => {
    api.upvoteComment.mockRejectedValue(new Error('Server error'));
    window.alert = vi.fn();
    const dispatch = vi.fn();

    await asyncToggleVoteComment(fakeThreadId, fakeCommentId, 'up')(dispatch, () => baseState);

    expect(window.alert).toHaveBeenCalledWith('Failed to update vote: Server error');
    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteCommentActionCreator({ commentId: fakeCommentId, userId: 'user-1' }));
  });
});
