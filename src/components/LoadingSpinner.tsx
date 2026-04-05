import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loader">
      <div className="loader-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;