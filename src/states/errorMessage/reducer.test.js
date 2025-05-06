
/**
 * test scenario for errorMessageReducer
 *
 * - errorMessageReducer function
 *   - should return the initial state when given by unknown action
 *   - should set thread error message when given by SET_THREAD_ERROR_MESSAGE action
 *   - should clear specific thread error message when given by CLEAR_THREAD_ERROR_MESSAGE action
 *   - should set comment error message when given by SET_COMMENT_ERROR_MESSAGE action
 *   - should clear specific comment error message when given by CLEAR_COMMENT_ERROR_MESSAGE action
 */


import { describe, it, expect } from 'vitest';
import errorMessageReducer from './reducer';
import { ActionType } from './action';

describe('errorMessageReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = {
      threadErrors: {},
      commentErrors: {},
    };

    const action = { type: 'UNKNOWN' };
    const nextState = errorMessageReducer(undefined, action);

    expect(nextState).toEqual(initialState);
  });

  it('should set thread error message when given by SET_THREAD_ERROR_MESSAGE action', () => {
    const action = {
      type: ActionType.SET_THREAD_ERROR_MESSAGE,
      payload: {
        threadId: 'thread-1',
        message: 'Thread error occurred',
      },
    };

    const nextState = errorMessageReducer(undefined, action);

    expect(nextState.threadErrors['thread-1']).toBe('Thread error occurred');
  });

  it('should clear specific thread error message when given by CLEAR_THREAD_ERROR_MESSAGE action', () => {
    const initialState = {
      threadErrors: {
        'thread-1': 'Thread error occurred',
        'thread-2': 'Another error',
      },
      commentErrors: {},
    };

    const action = {
      type: ActionType.CLEAR_THREAD_ERROR_MESSAGE,
      payload: {
        threadId: 'thread-1',
      },
    };

    const nextState = errorMessageReducer(initialState, action);

    expect(nextState.threadErrors).toEqual({ 'thread-2': 'Another error' });
  });

  it('should set comment error message when given by SET_COMMENT_ERROR_MESSAGE action', () => {
    const action = {
      type: ActionType.SET_COMMENT_ERROR_MESSAGE,
      payload: {
        commentId: 'comment-1',
        message: 'Comment error occurred',
      },
    };

    const nextState = errorMessageReducer(undefined, action);

    expect(nextState.commentErrors['comment-1']).toBe('Comment error occurred');
  });

  it('should clear specific comment error message when given by CLEAR_COMMENT_ERROR_MESSAGE action', () => {
    const initialState = {
      threadErrors: {},
      commentErrors: {
        'comment-1': 'Comment error occurred',
        'comment-2': 'Another error',
      },
    };

    const action = {
      type: ActionType.CLEAR_COMMENT_ERROR_MESSAGE,
      payload: {
        commentId: 'comment-1',
      },
    };

    const nextState = errorMessageReducer(initialState, action);

    expect(nextState.commentErrors).toEqual({ 'comment-2': 'Another error' });
  });
});
