/**
 * Skenario testing
 *
 * - threadDetailReducer function
 *   - should return initial state when given unknown action
 *   - should return the thread detail from payload when action type is RECEIVE_THREAD_DETAIL
 *   - should clear the thread detail and return null when action type is CLEAR_THREAD_DETAIL
 *   - should add userId to upVotesBy and remove from downVotesBy when action type is UPVOTE_THREAD_DETAIL
 *   - should add userId to downVotesBy and remove from upVotesBy when action type is DOWNVOTE_THREAD_DETAIL
 *   - should remove userId from upVotesBy and downVotesBy when action type is NEUTRALIZEVOTE_THREAD_DETAIL
 *   - should add a new comment to the beginning of comments array when action type is ADD_COMMENT
 *   - should add userId to comment's upVotesBy and remove from downVotesBy when action type is UPVOTE_COMMENT
 *   - should add userId to comment's downVotesBy and remove from upVotesBy when action type is DOWNVOTE_COMMENT
 *   - should remove userId from both comment's upVotesBy and downVotesBy when action type is NEUTRALIZEVOTE_COMMENT
 */


import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

const initialThreadDetail = {
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
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer', () => {
  it('should return initial state when given unknown action', () => {
    const nextState = threadDetailReducer(initialThreadDetail, { type: 'UNKNOWN' });
    expect(nextState).toEqual(initialThreadDetail);
  });

  describe('RECEIVE_THREAD_DETAIL', () => {
    it('should return the thread detail from payload', () => {
      const action = {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: { threadDetail: initialThreadDetail },
      };
      const nextState = threadDetailReducer(null, action);
      expect(nextState).toEqual(initialThreadDetail);
    });
  });

  describe('CLEAR_THREAD_DETAIL', () => {
    it('should clear the thread detail and return null', () => {
      const action = {
        type: ActionType.CLEAR_THREAD_DETAIL,
      };
      const nextState = threadDetailReducer(initialThreadDetail, action);
      expect(nextState).toBeNull();
    });
  });

  describe('UPVOTE_THREAD_DETAIL', () => {
    it('should add userId to upVotesBy and remove from downVotesBy', () => {
      const action = {
        type: ActionType.UPVOTE_THREAD_DETAIL,
        payload: { userId: 'users-1' },
      };
      const state = { ...initialThreadDetail, downVotesBy: ['users-1'] };
      const nextState = threadDetailReducer(state, action);
      expect(nextState.upVotesBy).toContain('users-1');
      expect(nextState.downVotesBy).not.toContain('users-1');
    });
  });

  describe('DOWNVOTE_THREAD_DETAIL', () => {
    it('should add userId to downVotesBy and remove from upVotesBy', () => {
      const action = {
        type: ActionType.DOWNVOTE_THREAD_DETAIL,
        payload: { userId: 'users-1' },
      };
      const state = { ...initialThreadDetail, upVotesBy: ['users-1'] };
      const nextState = threadDetailReducer(state, action);
      expect(nextState.downVotesBy).toContain('users-1');
      expect(nextState.upVotesBy).not.toContain('users-1');
    });
  });

  describe('NEUTRALIZEVOTE_THREAD_DETAIL', () => {
    it('should remove userId from upVotesBy and downVotesBy', () => {
      const action = {
        type: ActionType.NEUTRALIZEVOTE_THREAD_DETAIL,
        payload: { userId: 'users-1' },
      };
      const state = { ...initialThreadDetail, upVotesBy: ['users-1'], downVotesBy: ['users-1'] };
      const nextState = threadDetailReducer(state, action);
      expect(nextState.upVotesBy).not.toContain('users-1');
      expect(nextState.downVotesBy).not.toContain('users-1');
    });
  });

  describe('ADD_COMMENT', () => {
    it('should add a new comment to the beginning of comments array', () => {
      const newComment = {
        id: 'comment-2',
        content: 'Komentar baru',
        createdAt: '2021-06-21T08:00:00.000Z',
        owner: {
          id: 'users-2',
          name: 'Jane Doe',
          avatar: 'https://image2.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      };
      const action = {
        type: ActionType.ADD_COMMENT,
        payload: { comment: newComment },
      };
      const nextState = threadDetailReducer(initialThreadDetail, action);
      expect(nextState.comments[0]).toEqual(newComment);
    });
  });

  describe('UPVOTE_COMMENT', () => {
    it('should add userId to comment\'s upVotesBy and remove from downVotesBy', () => {
      const action = {
        type: ActionType.UPVOTE_COMMENT,
        payload: { commentId: 'comment-1', userId: 'users-2' },
      };
      const state = {
        ...initialThreadDetail,
        comments: [
          {
            ...initialThreadDetail.comments[0],
            downVotesBy: ['users-2'],
          },
        ],
      };
      const nextState = threadDetailReducer(state, action);
      const updatedComment = nextState.comments.find((c) => c.id === 'comment-1');
      expect(updatedComment.upVotesBy).toContain('users-2');
      expect(updatedComment.downVotesBy).not.toContain('users-2');
    });
  });

  describe('DOWNVOTE_COMMENT', () => {
    it('should add userId to comment\'s downVotesBy and remove from upVotesBy', () => {
      const action = {
        type: ActionType.DOWNVOTE_COMMENT,
        payload: { commentId: 'comment-1', userId: 'users-2' },
      };
      const state = {
        ...initialThreadDetail,
        comments: [
          {
            ...initialThreadDetail.comments[0],
            upVotesBy: ['users-2'],
          },
        ],
      };
      const nextState = threadDetailReducer(state, action);
      const updatedComment = nextState.comments.find((c) => c.id === 'comment-1');
      expect(updatedComment.downVotesBy).toContain('users-2');
      expect(updatedComment.upVotesBy).not.toContain('users-2');
    });
  });

  describe('NEUTRALIZEVOTE_COMMENT', () => {
    it('should remove userId from both comment\'s upVotesBy and downVotesBy', () => {
      const action = {
        type: ActionType.NEUTRALIZEVOTE_COMMENT,
        payload: { commentId: 'comment-1', userId: 'users-2' },
      };
      const state = {
        ...initialThreadDetail,
        comments: [
          {
            ...initialThreadDetail.comments[0],
            upVotesBy: ['users-2'],
            downVotesBy: ['users-2'],
          },
        ],
      };
      const nextState = threadDetailReducer(state, action);
      const updatedComment = nextState.comments.find((c) => c.id === 'comment-1');
      expect(updatedComment.upVotesBy).not.toContain('users-2');
      expect(updatedComment.downVotesBy).not.toContain('users-2');
    });
  });
});