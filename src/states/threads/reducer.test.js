/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the threads when given by RECEIVE_THREADS action
 *   - should add a thread when given by ADD_THREAD action
 *   - should toggle upvote correctly when given by UPVOTE_THREAD action
 *   - should toggle downvote correctly when given by DOWNVOTE_THREAD action
 *   - should neutralize vote correctly when given by NEUTRALIZEVOTE_THREAD action
 */




import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should add a thread when given by ADD_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Lama',
        body: 'Isi thread lama',
        category: 'General',
        createdAt: '2021-06-20T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 2,
      },
    ];

    const newThread = {
      id: 'thread-2',
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'News',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('should toggle upvote correctly when given by UPVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['users-1'],
      },
    ];

    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
      },
    ]);

    // toggle back (un-upvote)
    const toggledBackState = threadsReducer(nextState, action);

    expect(toggledBackState).toEqual([
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });

  it('should toggle downvote correctly when given by DOWNVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
      },
    ];

    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['users-1'],
      },
    ]);

    // toggle back (un-downvote)
    const toggledBackState = threadsReducer(nextState, action);

    expect(toggledBackState).toEqual([
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });

  it('should neutralize vote correctly when given by NEUTRALIZEVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: ['users-1'],
        downVotesBy: ['users-2'],
      },
    ];

    const action = {
      type: ActionType.NEUTRALIZEVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['users-2'],
      },
    ]);
  });
});
