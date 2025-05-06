import React from 'react';
import PropTypes from 'prop-types';


const Avatar = ({ src, alt, size = 35, className = '' }) => {
  return (
    <div
      className={`avatar ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
      />
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Avatar;