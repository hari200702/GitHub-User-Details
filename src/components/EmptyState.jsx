import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const EmptyState = ({ isDarkMode }) => {
  return (
    <div className="text-center py-20">
      <FontAwesomeIcon 
        icon={faSearch} 
        className={`text-6xl mb-6 ${isDarkMode ? 'text-github-muted' : 'text-gray-400'}`}
      />
      <h3 className="text-2xl font-bold mb-4">
        Search for a GitHub User
      </h3>
      <p className={`text-lg ${isDarkMode ? 'text-github-muted' : 'text-gray-600'}`}>
        Enter a username above to get started
      </p>
    </div>
  );
};

export default EmptyState;