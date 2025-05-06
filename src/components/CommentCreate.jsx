import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommentCreate = ({ addComment, isLoggedIn }) => {
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setErrorMessage((
        <span>
          Please <Link to="/login" onClick={(e) => e.stopPropagation()}>login</Link> to post comment
        </span>
      ));

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return;
    }

    setErrorMessage('');
    addComment(content);
    setContent('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        name="content"
        placeholder="Post comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="comment-textarea"
      />
      <button type="submit" className="comment-submit">
        <FaPlus />
      </button>

      {errorMessage && (
        <p className="error-message">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

CommentCreate.propTypes = {
  addComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default CommentCreate;