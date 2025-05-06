/**
 * scenario test
 *
 * - Thread Action Creators
 *   - should create correct action for RECEIVE_THREADS
 *   - should create correct action for ADD_THREAD
 *   - should create correct action for UPVOTE_THREAD
 *   - should create correct action for DOWNVOTE_THREAD
 *   - should create correct action for NEUTRALIZEVOTE_THREAD
 *
 * - asyncAddThread thunk
 *   - should dispatch correctly when API succeeds
 *   - should call alert when API fails
 *
 * - asyncToggleVoteThread thunk
 *   - should dispatch upVote when not yet voted
 *   - should dispatch neutralizeVote when already upvoted
 *   - should switch from upVote to downVote correctly
 *   - should dispatch downVote when not yet voted
 *   - should dispatch neutralizeVote when already downvoted
 *   - should switch from downVote to upVote correctly
 *   - should call alert and rollback if API fails
 */


import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  asyncAddThread,
  asyncToggleVoteThread,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator
} from './action';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


// Mock alert
global.alert = vi.fn();

// Mock api methods
vi.mock('../../utils/api');

// Setup dummy thread
const fakeThread = {
  id: 'thread-1',
  title: 'Test Thread',
  body: 'Test Body',
  category: 'general',
  upVotesBy: [],
  downVotesBy: [],
  ownerId: 'user-1'
};

describe('Thread Action Creators', () => {
  it('should create correct action for RECEIVE_THREADS', () => {
    const threads = [{ id: 'thread-1', title: 'Thread Satu' }];
    const action = receiveThreadsActionCreator(threads);

    expect(action).toEqual({
      type: 'RECEIVE_THREADS',
      payload: { threads },
    });
  });

  it('should create correct action for ADD_THREAD', () => {
    const thread = { id: 'thread-2', title: 'Thread Dua' };
    const action = addThreadActionCreator(thread);

    expect(action).toEqual({
      type: 'ADD_THREAD',
      payload: { thread },
    });
  });

  it('should create correct action for UPVOTE_THREAD', () => {
    const payload = { threadId: 'thread-3', userId: 'user-1' };
    const action = upVoteThreadActionCreator(payload);

    expect(action).toEqual({
      type: 'UPVOTE_THREAD',
      payload,
    });
  });

  it('should create correct action for DOWNVOTE_THREAD', () => {
    const payload = { threadId: 'thread-4', userId: 'user-2' };
    const action = downVoteThreadActionCreator(payload);

    expect(action).toEqual({
      type: 'DOWNVOTE_THREAD',
      payload,
    });
  });

  it('should create correct action for NEUTRALIZEVOTE_THREAD', () => {
    const payload = { threadId: 'thread-5', userId: 'user-3' };
    const action = neutralizeVoteThreadActionCreator(payload);

    expect(action).toEqual({
      type: 'NEUTRALIZEVOTE_THREAD',
      payload,
    });
  });
});

describe('asyncAddThread', () => {
  beforeEach(() => {
    api.createThread.mockClear();
    global.alert.mockClear();
  });

  it('should dispatch correctly when API succeeds', async () => {
    api.createThread.mockResolvedValue(fakeThread);

    const dispatch = vi.fn();

    await asyncAddThread({ title: 'Test Thread', body: 'Test Body', category: 'general' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call alert when API fails', async () => {
    api.createThread.mockRejectedValue(new Error('Failed'));

    const dispatch = vi.fn();

    await asyncAddThread({ title: 'fail', body: '', category: '' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(global.alert).toHaveBeenCalledWith('Failed');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncToggleVoteThread', () => {
  const baseState = {
    authUser: { id: 'user-1' },
    threads: [
      { ...fakeThread }
    ]
  };

  it('should dispatch upVote when not yet voted', async () => {
    api.upVoteThread.mockResolvedValue();

    const dispatch = vi.fn();
    const getState = () => baseState;

    await asyncToggleVoteThread('thread-1', 'up')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch neutralizeVote when already upvoted', async () => {
    api.neutralizeVoteThread.mockResolvedValue();

    const dispatch = vi.fn();
    const getState = () => ({
      ...baseState,
      threads: [{ ...fakeThread, upVotesBy: ['user-1'] }]
    });

    await asyncToggleVoteThread('thread-1', 'up')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
  });

  it('should switch from upVote to downVote correctly', async () => {
    api.downVoteThread.mockResolvedValue();

    const dispatch = vi.fn();
    const getState = () => ({
      ...baseState,
      threads: [{ ...fakeThread, upVotesBy: ['user-1'] }],
    });

    await asyncToggleVoteThread('thread-1', 'down')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
  });

  it('should dispatch downVote when not yet voted', async () => {
    api.downVoteThread.mockResolvedValue();

    const dispatch = vi.fn();
    const getState = () => baseState;

    await asyncToggleVoteThread('thread-1', 'down')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
  });

  it('should dispatch neutralizeVote when already downvoted', async () => {
    api.neutralizeVoteThread.mockResolvedValue();

    const dispatch = vi.fn();
    const getState = () => ({
      ...baseState,
      threads: [{ ...fakeThread, downVotesBy: ['user-1'] }]
    });

    await asyncToggleVoteThread('thread-1', 'down')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
  });

  it('should switch from downVote to upVote correctly', async () => {
    api.upVoteThread.mockResolvedValue();

    const dispatch = vi.fn();
    const getState = () => ({
      ...baseState,
      threads: [{ ...fakeThread, downVotesBy: ['user-1'] }],
    });

    await asyncToggleVoteThread('thread-1', 'up')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
  });

  it('should call alert and rollback if API fails', async () => {
    api.upVoteThread.mockRejectedValue(new Error('Vote failed'));

    const dispatch = vi.fn();
    const getState = () => baseState;

    await asyncToggleVoteThread('thread-1', 'up')(dispatch, getState);

    expect(global.alert).toHaveBeenCalledWith('Failed to update vote: Vote failed');
    expect(dispatch).toHaveBeenCalledWith(neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
  });
});