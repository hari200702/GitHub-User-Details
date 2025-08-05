import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = ({ searchTerm, isDarkMode }) => {
  return (
    <div className={`text-center py-16 mx-auto max-w-2xl rounded-2xl border-2 ${
      isDarkMode 
        ? 'bg-github-gray border-github-danger/30' 
        : 'bg-red-50 border-red-200'
    }`}>
      <FontAwesomeIcon 
        icon={faTimes} 
        className="text-5xl text-github-danger mb-4"
      />
      <h3 className="text-2xl font-bold text-github-danger mb-2">
        User Not Found
      </h3>
      <p className={`text-lg mb-2 ${isDarkMode ? 'text-github-muted' : 'text-gray-600'}`}>
        No GitHub user found with username "{searchTerm}"
      </p>
      <p className={`${isDarkMode ? 'text-github-muted' : 'text-gray-600'}`}>
        Please check the username and try again.
      </p>
    </div>
  );
};

export default ErrorMessage;