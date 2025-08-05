import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faSun, 
  faMoon
} from '@fortawesome/free-solid-svg-icons';

// Import custom components
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

// Fetcher function for SWR
const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
};

const GitHubSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Theme effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // SWR hook for data fetching
  const { data: userData, error, isLoading } = useSWR(
    debouncedSearchTerm ? `https://api.github.com/users/${debouncedSearchTerm}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDebouncedSearchTerm(searchTerm);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`w-full min-h-screen transition-all duration-300 dark-scrollbar ${
      isDarkMode 
        ? 'bg-github-dark text-github-text' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      
      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isDarkMode 
              ? 'bg-github-gray border border-github-border text-yellow-400 hover:bg-github-border' 
              : 'bg-white border border-gray-300 text-blue-600 hover:bg-gray-100'
          }`}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon 
            icon={isDarkMode ? faSun : faMoon} 
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="w-full px-4 py-8 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            GitHub User Search
          </h1>
          <p className={`text-lg md:text-xl ${isDarkMode ? 'text-github-muted' : 'text-gray-600'}`}>
            Discover GitHub users and their profiles
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="relative flex-1">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? 'text-github-muted' : 'text-gray-400'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Enter GitHub username..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className={`w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDarkMode 
                      ? 'bg-github-gray border-github-border text-github-text placeholder-github-muted focus:border-github-accent focus:ring-github-accent/30' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/30 whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Loading State */}
          {isLoading && (
            <LoadingSpinner message="Searching for user..." />
          )}

          {/* Error State */}
          {error && (
            <ErrorMessage 
              searchTerm={debouncedSearchTerm} 
              isDarkMode={isDarkMode} 
            />
          )}

          {/* User Card */}
          {userData && !error && !isLoading && (
            <UserCard 
              userData={userData} 
              isDarkMode={isDarkMode} 
            />
          )}

          {/* Empty State */}
          {!debouncedSearchTerm && !isLoading && (
            <EmptyState isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubSearchPage;