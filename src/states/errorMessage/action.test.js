/**
 * skenario test
 *
 * - Thread Error Actions
 *   - should create setThreadErrorMessage action
 *   - should create clearThreadErrorMessage action
 *   - should dispatch temporary thread error actions
 *
 * - Comment Error Actions
 *   - should create setCommentErrorMessage action
 *   - should create clearCommentErrorMessage action
 *   - should dispatch temporary comment error actions
 */

import { describe, it, expect, vi } from 'vitest';
import {
  ActionType,
  setThreadErrorMessage,
  clearThreadErrorMessage,
  showTemporaryThreadError,
  setCommentErrorMessage,
  clearCommentErrorMessage,
  showTemporaryCommentError,
} from './action';

describe('Thread Error Actions', () => {
  it('should create setThreadErrorMessage action', () => {
    const action = setThreadErrorMessage('thread-1', 'Error message');
    expect(action).toEqual({
      type: ActionType.SET_THREAD_ERROR_MESSAGE,
      payload: {
        threadId: 'thread-1',
        message: 'Error message',
      },
    });
  });

  it('should create clearThreadErrorMessage action', () => {
    const action = clearThreadErrorMessage('thread-1');
    expect(action).toEqual({
      type: ActionType.CLEAR_THREAD_ERROR_MESSAGE,
      payload: {
        threadId: 'thread-1',
      },
    });
  });

  it('should dispatch temporary thread error actions', () => {
    const dispatch = vi.fn();
    vi.useFakeTimers();

    showTemporaryThreadError('thread-1', 'Temp error')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setThreadErrorMessage('thread-1', 'Temp error'));

    vi.advanceTimersByTime(3000);

    expect(dispatch).toHaveBeenCalledWith(clearThreadErrorMessage('thread-1'));

    vi.useRealTimers();
  });
});

describe('Comment Error Actions', () => {
  it('should create setCommentErrorMessage action', () => {
    const action = setCommentErrorMessage('comment-1', 'Comment error');
    expect(action).toEqual({
      type: ActionType.SET_COMMENT_ERROR_MESSAGE,
      payload: {
        commentId: 'comment-1',
        message: 'Comment error',
      },
    });
  });

  it('should create clearCommentErrorMessage action', () => {
    const action = clearCommentErrorMessage('comment-1');
    expect(action).toEqual({
      type: ActionType.CLEAR_COMMENT_ERROR_MESSAGE,
      payload: {
        commentId: 'comment-1',
      },
    });
  });

  it('should dispatch temporary comment error actions', () => {
    const dispatch = vi.fn();
    vi.useFakeTimers();

    showTemporaryCommentError('comment-1', 'Temp comment error')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setCommentErrorMessage('comment-1', 'Temp comment error'));

    vi.advanceTimersByTime(3000);

    expect(dispatch).toHaveBeenCalledWith(clearCommentErrorMessage('comment-1'));

    vi.useRealTimers();
  });
});