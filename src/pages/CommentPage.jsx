import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentCreate from '../components/CommentCreate';
import CommentList from '../components/CommentList';
import CommentThreadDetail from '../components/CommentThreadDetail';
import { MdInsertComment } from 'react-icons/md';
import { Link } from 'react-router-dom';

import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
} from '../states/threadDetail/action';

import {
  showTemporaryThreadError,
  showTemporaryCommentError,
} from '../states/errorMessage/action';

const CommentPage = () => {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  const onUpVoteThread = () => {
    if (!authUser) {
      dispatch(showTemporaryThreadError(threadId, (
        <span>
          Please <Link to="/login" onClick={(e) => e.stopPropagation()}>login</Link> to vote
        </span>
      )));
      return;
    }
    dispatch(asyncToggleVoteThreadDetail(threadId, 'up'));
  };

  const onDownVoteThread = () => {
    if (!authUser) {
      dispatch(showTemporaryThreadError(threadId, (
        <span>
          Please <Link to="/login" onClick={(e) => e.stopPropagation()}>login</Link> to vote
        </span>
      )));
      return;
    }
    dispatch(asyncToggleVoteThreadDetail(threadId, 'down'));
  };

  const onUpVoteComment = (commentId) => {
    if (!authUser) {
      dispatch(showTemporaryCommentError(commentId, (
        <span>
          Please <Link to="/login" onClick={(e) => e.stopPropagation()}>login</Link> to vote
        </span>
      )));
      return;
    }
    dispatch(asyncToggleVoteComment(threadId, commentId, 'up'));
  };

  const onDownVoteComment = (commentId) => {
    if (!authUser) {
      dispatch(showTemporaryCommentError(commentId, (
        <span>
          Please <Link to="/login" onClick={(e) => e.stopPropagation()}>login</Link> to vote
        </span>
      )));
      return;
    }
    dispatch(asyncToggleVoteComment(threadId, commentId, 'down'));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment(threadId, content));
  };

  if (!threadDetail || !threadDetail.id) {
    return null;
  }

  const authUserId = authUser?.id || null;

  return (
    <section className="comment-container">
      <CommentThreadDetail
        thread={{
          ...threadDetail,
          totalComments: threadDetail.comments.length,
        }}
        authUser={authUserId}
        onUpVote={onUpVoteThread}
        onDownVote={onDownVoteThread}
      />

      <CommentCreate addComment={onAddComment} isLoggedIn={authUser !== null} />

      <div className="comment-wrap">
        <div className="comment-label">
          <div className="comment-total">
            <div className="comment-info-utama">
              <span><MdInsertComment /> ({threadDetail.comments.length})</span>
            </div>
          </div>
        </div>

        <div className="comment-list">
          <CommentList
            comments={threadDetail.comments}
            authUser={authUser?.id}
            onUpVote={onUpVoteComment}
            onDownVote={onDownVoteComment}
          />
        </div>
      </div>
    </section>
  );
};

export default CommentPage;