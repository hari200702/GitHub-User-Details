import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faUsers, 
  faBook, 
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';

const UserCard = ({ userData, isDarkMode }) => {
  if (!userData) return null;

  return (
    <div className={`w-full rounded-2xl border-2 p-6 lg:p-8 shadow-2xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-github-gray border-github-border' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img 
            src={userData.avatar_url} 
            alt={`${userData.login}'s avatar`}
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-github-border shadow-lg"
          />
        </div>
        
        {/* User Info */}
        <div className="flex-1 text-center lg:text-left w-full">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">
            {userData.name || userData.login}
          </h2>
          
          <p className={`text-xl mb-4 ${isDarkMode ? 'text-github-muted' : 'text-gray-600'}`}>
            @{userData.login}
          </p>
          
          {userData.bio && (
            <p className={`text-lg mb-6 leading-relaxed ${
              isDarkMode ? 'text-github-text' : 'text-gray-700'
            }`}>
              {userData.bio}
            </p>
          )}
          
          {userData.location && (
            <div className={`flex items-center justify-center lg:justify-start gap-2 mb-6 text-lg ${
              isDarkMode ? 'text-github-muted' : 'text-gray-600'
            }`}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500" />
              <span>{userData.location}</span>
            </div>
          )}
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 mb-8 justify-center lg:justify-start">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-github-accent mb-1">
                <FontAwesomeIcon icon={faUsers} className="text-lg" />
                {userData.followers.toLocaleString()}
              </div>
              <div className={`text-sm uppercase tracking-wide font-medium ${
                isDarkMode ? 'text-github-muted' : 'text-gray-600'
              }`}>
                Followers
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-github-accent mb-1">
                <FontAwesomeIcon icon={faBook} className="text-lg" />
                {userData.public_repos.toLocaleString()}
              </div>
              <div className={`text-sm uppercase tracking-wide font-medium ${
                isDarkMode ? 'text-github-muted' : 'text-gray-600'
              }`}>
                Public Repos
              </div>
            </div>
          </div>
          
          {/* Additional Stats Row */}
          {(userData.following || userData.created_at) && (
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 mb-8 justify-center lg:justify-start">
              {userData.following !== undefined && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-xl font-bold text-purple-500 mb-1">
                    <FontAwesomeIcon icon={faUsers} className="text-sm" />
                    {userData.following.toLocaleString()}
                  </div>
                  <div className={`text-sm uppercase tracking-wide font-medium ${
                    isDarkMode ? 'text-github-muted' : 'text-gray-600'
                  }`}>
                    Following
                  </div>
                </div>
              )}
              
              {userData.created_at && (
                <div className="text-center">
                  <div className="text-xl font-bold text-green-500 mb-1">
                    {new Date(userData.created_at).getFullYear()}
                  </div>
                  <div className={`text-sm uppercase tracking-wide font-medium ${
                    isDarkMode ? 'text-github-muted' : 'text-gray-600'
                  }`}>
                    Joined
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Profile Link */}
          {userData.html_url && (
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-github-accent to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-github-accent/30"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;