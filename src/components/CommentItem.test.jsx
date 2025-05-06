/**
 * Skenario testing
 *
 * - CommentItem component
 *   - should change color and count when upvote is clicked
 *   - should revert color and count when upvote is clicked again by the same user
 *   - should switch from upvote to downvote and update counts and colors
 *   - should change color and count when downvote is clicked
 *   - should revert color and count when downvote is clicked again by the same user
 *   - should switch from downvote to upvote and update counts and colors
 *   - should display error message when error exists in commentErrors
 */


import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CommentItem from './CommentItem';

const mockStore = configureStore([]);

describe('CommentItem component', () => {
  afterEach(cleanup);

  const baseComment = {
    id: 'comment-1',
    content: 'This is a comment',
    createdAt: '2025-05-01T12:00:00Z',
    owner: {
      name: 'User A',
      avatar: 'avatar.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
  };

  const setup = (
    { comment = baseComment, authUser = null, errorState = {} } = {},
    onUpVote = vi.fn(),
    onDownVote = vi.fn()
  ) => {
    const store = mockStore({
      errorMessage: {
        commentErrors: errorState,
      },
    });

    return render(
      <Provider store={store}>
        <CommentItem
          comment={comment}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          authUser={authUser}
        />
      </Provider>
    );
  };

  it('should change color and count when upvote is clicked', () => {
    const onUpVote = vi.fn();

    const { rerender } = setup({ authUser: 'user-1' }, onUpVote);

    const upvoteButton = screen.getByTestId('upvote-button');
    fireEvent.click(upvoteButton);
    expect(onUpVote).toHaveBeenCalledWith('comment-1');

    const updatedComment = {
      ...baseComment,
      upVotesBy: ['user-1'],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { commentErrors: {} } })}>
        <CommentItem comment={updatedComment} onUpVote={onUpVote} onDownVote={vi.fn()} authUser="user-1" />
      </Provider>
    );

    expect(screen.getByTestId('upvote-button')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('upvote-count')).toHaveTextContent('1');
  });

  it('should revert color and count when upvote is clicked again by the same user', () => {
    const onUpVote = vi.fn();

    const initialComment = {
      ...baseComment,
      upVotesBy: ['user-1'],
    };

    const { rerender } = setup({ comment: initialComment, authUser: 'user-1' }, onUpVote);

    fireEvent.click(screen.getByTestId('upvote-button'));
    expect(onUpVote).toHaveBeenCalledWith('comment-1');

    const updatedComment = {
      ...baseComment,
      upVotesBy: [],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { commentErrors: {} } })}>
        <CommentItem comment={updatedComment} onUpVote={onUpVote} onDownVote={vi.fn()} authUser="user-1" />
      </Provider>
    );

    expect(screen.getByTestId('upvote-button')).toHaveStyle('color: rgb(128, 128, 128)');
    expect(screen.getByTestId('upvote-count')).toHaveTextContent('0');
  });

  it('should switch from upvote to downvote and update counts and colors', () => {
    const onDownVote = vi.fn();

    const comment = {
      ...baseComment,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    const { rerender } = setup({ comment, authUser: 'user-1' }, vi.fn(), onDownVote);

    fireEvent.click(screen.getByTestId('downvote-button'));
    expect(onDownVote).toHaveBeenCalledWith('comment-1');

    const updatedComment = {
      ...baseComment,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { commentErrors: {} } })}>
        <CommentItem comment={updatedComment} onUpVote={vi.fn()} onDownVote={onDownVote} authUser="user-1" />
      </Provider>
    );

    expect(screen.getByTestId('downvote-button')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('1');
    expect(screen.getByTestId('upvote-button')).toHaveStyle('color: rgb(128, 128, 128)');
    expect(screen.getByTestId('upvote-count')).toHaveTextContent('0');
  });

  it('should change color and count when downvote is clicked', () => {
    const onDownVote = vi.fn();

    const { rerender } = setup({ authUser: 'user-1' }, vi.fn(), onDownVote);

    fireEvent.click(screen.getByTestId('downvote-button'));
    expect(onDownVote).toHaveBeenCalledWith('comment-1');

    const updatedComment = {
      ...baseComment,
      downVotesBy: ['user-1'],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { commentErrors: {} } })}>
        <CommentItem comment={updatedComment} onUpVote={vi.fn()} onDownVote={onDownVote} authUser="user-1" />
      </Provider>
    );

    expect(screen.getByTestId('downvote-button')).toHaveStyle('color:rgb(255, 0, 0)');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('1');
  });

  it('should revert color and count when downvote is clicked again by the same user', () => {
    const onDownVote = vi.fn();

    const initialComment = {
      ...baseComment,
      downVotesBy: ['user-1'],
    };

    const { rerender } = setup({ comment: initialComment, authUser: 'user-1' }, vi.fn(), onDownVote);

    fireEvent.click(screen.getByTestId('downvote-button'));
    expect(onDownVote).toHaveBeenCalledWith('comment-1');

    const updatedComment = {
      ...baseComment,
      downVotesBy: [],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { commentErrors: {} } })}>
        <CommentItem comment={updatedComment} onUpVote={vi.fn()} onDownVote={onDownVote} authUser="user-1" />
      </Provider>
    );

    expect(screen.getByTestId('downvote-button')).toHaveStyle('color: rgb(128, 128, 128)');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('0');
  });

  it('should switch from downvote to upvote and update counts and colors', () => {
    const onUpVote = vi.fn();

    const comment = {
      ...baseComment,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    const { rerender } = setup({ comment, authUser: 'user-1' }, onUpVote, vi.fn());

    fireEvent.click(screen.getByTestId('upvote-button'));
    expect(onUpVote).toHaveBeenCalledWith('comment-1');

    const updatedComment = {
      ...baseComment,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { commentErrors: {} } })}>
        <CommentItem comment={updatedComment} onUpVote={onUpVote} onDownVote={vi.fn()} authUser="user-1" />
      </Provider>
    );

    expect(screen.getByTestId('upvote-button')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('upvote-count')).toHaveTextContent('1');
    expect(screen.getByTestId('downvote-button')).toHaveStyle('color: rgb(128, 128, 128)');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('0');
  });

  it('should display error message when error exists in commentErrors', () => {
    const errorState = {
      'comment-1': 'Vote gagal',
    };

    setup({ authUser: 'user-1', errorState });

    expect(screen.getByText('Vote gagal')).toBeInTheDocument();
  });
});