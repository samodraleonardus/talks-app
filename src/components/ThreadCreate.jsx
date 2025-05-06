import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ThreadCreate = ({ onSubmit, isLoggedIn }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
    onSubmit({ title, category, body });
    setTitle('');
    setCategory('');
    setBody('');
    navigate('/');
  };

  return (
    <form className="thread-form" onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="thread-input"
        required
      />
      <input
        name="category"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="thread-input"
      />
      <textarea
        name="body"
        placeholder="Talk"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="thread-textarea"
        required
      />
      <button type="submit" className="thread-submit">
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

ThreadCreate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ThreadCreate;
