
/**
 * Skenario testing
 *
 * - ThreadItem component
 *   - should navigate to thread detail when threadItem clicked
 *   - should change color and count when upvote is clicked
 *   - should revert color and count when upvote is clicked again by the same user
 *   - should switch from upvote to downvote and update counts and colors
 *   - should change color and count when downvote is clicked
 *   - should revert color and count when downvote is clicked again by the same user
 *   - should switch from downvote to upvote and update counts and colors
 *   - should navigate to thread detail when comment button is clicked
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ThreadItem from './ThreadItem';



vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockStore = configureStore([]);


describe('ThreadItem component', () => {
  afterEach(cleanup);

  const baseThread = {
    id: 'thread-1',
    title: 'Thread Title',
    category: 'General',
    body: 'This is a body of the thread.',
    createdAt: '2025-05-01T12:00:00Z',
    owner: {
      id: 'user-1',
      name: 'User One',
      avatar: 'avatar.png',
    },
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 5,
  };

  const setup = ({ thread = baseThread, authUser = null, errorState = {} } = {}, onUpVote = vi.fn(), onDownVote = vi.fn()) => {
    const store = mockStore({
      errorMessage: {
        threadErrors: errorState,
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadItem
            thread={thread}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            authUser={authUser}
          />
        </MemoryRouter>
      </Provider>
    );
  };

  it('should navigate to thread detail when threadItem clicked', () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
    setup({ authUser: 'user-1' });

    fireEvent.click(screen.getByRole('button'));

    expect(navigate).toHaveBeenCalledWith('/threads/thread-1');
  });


  it('changes color and count when upvote is clicked', () => {
    const onUpVote = vi.fn();

    const thread = {
      ...baseThread,
      upVotesBy: [],
    };

    const { rerender } = render(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={thread} authUser="user-1" onUpVote={onUpVote} onDownVote={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );

    const upvoteButton = screen.getByTestId('upvote-button');
    fireEvent.click(upvoteButton);
    expect(onUpVote).toHaveBeenCalledWith('thread-1');

    const threadAfter = {
      ...thread,
      upVotesBy: ['user-1'],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={threadAfter} authUser="user-1" onUpVote={onUpVote} onDownVote={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );

    const updatedUpvoteButton = screen.getByTestId('upvote-button');
    const upvoteCount = screen.getByTestId('upvote-count');

    expect(updatedUpvoteButton).toHaveStyle('color: rgb(255, 0, 0)');
    expect(upvoteCount).toHaveTextContent('1');
  });

  it('reverts color and count when upvote is clicked again by the same user', () => {
    const onUpVote = vi.fn();

    const thread = {
      ...baseThread,
      upVotesBy: ['user-1'],
    };

    const { rerender } = render(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={thread} authUser="user-1" onUpVote={onUpVote} onDownVote={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );

    const upvoteButton = screen.getByTestId('upvote-button');
    fireEvent.click(upvoteButton);
    expect(onUpVote).toHaveBeenCalledWith('thread-1');

    const updatedThread = {
      ...thread,
      upVotesBy: [],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={updatedThread} authUser="user-1" onUpVote={onUpVote} onDownVote={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );

    const updatedUpvoteButton = screen.getByTestId('upvote-button');
    const updatedCount = screen.getByTestId('upvote-count');
    expect(updatedUpvoteButton).toHaveStyle('color: rgb(128, 128, 128)');
    expect(updatedCount).toHaveTextContent('0');
  });

  it('switches from upvote to downvote and updates counts and colors', () => {
    const onUpVote = vi.fn();
    const onDownVote = vi.fn();

    const thread = {
      ...baseThread,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    const { rerender } = render(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={thread} authUser="user-1" onUpVote={onUpVote} onDownVote={onDownVote} />
        </MemoryRouter>
      </Provider>
    );

    const downvoteButton = screen.getByTestId('downvote-button');
    fireEvent.click(downvoteButton);
    expect(onDownVote).toHaveBeenCalledWith('thread-1');

    const updatedThread = {
      ...thread,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={updatedThread} authUser="user-1" onUpVote={onUpVote} onDownVote={onDownVote} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('upvote-button')).toHaveStyle('color: rgb(128, 128, 128)');
    expect(screen.getByTestId('upvote-count')).toHaveTextContent('0');
    expect(screen.getByTestId('downvote-button')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('1');
  });

  it('changes color and count when downvote is clicked', () => {
    const onDownVote = vi.fn();

    const thread = {
      ...baseThread,
      downVotesBy: [],
    };

    const { rerender } = render(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={thread} authUser="user-1" onUpVote={vi.fn()} onDownVote={onDownVote} />
        </MemoryRouter>
      </Provider>
    );

    const downvoteButton = screen.getByTestId('downvote-button');
    fireEvent.click(downvoteButton);
    expect(onDownVote).toHaveBeenCalledWith('thread-1');

    const updatedThread = {
      ...thread,
      downVotesBy: ['user-1'],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={updatedThread} authUser="user-1" onUpVote={vi.fn()} onDownVote={onDownVote} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('downvote-button')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('1');
  });

  it('reverts color and count when downvote is clicked again by the same user', () => {
    const onDownVote = vi.fn();

    const thread = {
      ...baseThread,
      downVotesBy: ['user-1'],
    };

    const { rerender } = render(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={thread} authUser="user-1" onUpVote={vi.fn()} onDownVote={onDownVote} />
        </MemoryRouter>
      </Provider>
    );

    const downvoteButton = screen.getByTestId('downvote-button');
    fireEvent.click(downvoteButton);
    expect(onDownVote).toHaveBeenCalledWith('thread-1');

    const updatedThread = {
      ...thread,
      downVotesBy: [],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem thread={updatedThread} authUser="user-1" onUpVote={vi.fn()} onDownVote={onDownVote} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('downvote-button')).toHaveStyle('color: rgb(128, 128, 128)');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('0');
  });


  it('switches from downvote to upvote and updates counts and colors', () => {
    const onUpVote = vi.fn();
    const onDownVote = vi.fn();

    const thread = {
      ...baseThread,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    const { rerender } = render(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem
            thread={thread}
            authUser="user-1"
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </MemoryRouter>
      </Provider>
    );

    const upvoteButton = screen.getByTestId('upvote-button');
    fireEvent.click(upvoteButton);
    expect(onUpVote).toHaveBeenCalledWith('thread-1');

    const updatedThread = {
      ...thread,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    rerender(
      <Provider store={mockStore({ errorMessage: { threadErrors: {} } })}>
        <MemoryRouter>
          <ThreadItem
            thread={updatedThread}
            authUser="user-1"
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('downvote-button')).toHaveStyle('color: rgb(128, 128, 128)');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('0');
    expect(screen.getByTestId('upvote-button')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('upvote-count')).toHaveTextContent('1');
  });


  it('navigates to thread detail when comment button clicked', () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    setup({ authUser: 'user-1' });

    const commentButton = screen.getByTestId('comment-button');
    fireEvent.click(commentButton);
    expect(navigate).toHaveBeenCalledWith('/threads/thread-1');
  });

  it('should display error message when error exists in threadErrors', () => {
    const errorText = 'Something went wrong';
    const errorState = {
      'thread-1': errorText,
    };

    setup({ errorState });

    const errorMessageElement = screen.getByText(errorText);
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveClass('error-message');
  });
});
