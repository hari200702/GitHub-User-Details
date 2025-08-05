import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="text-center py-20">
      <FontAwesomeIcon 
        icon={faSpinner} 
        className="text-5xl text-github-accent animate-spin mb-4"
      />
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default LoadingSpinner;