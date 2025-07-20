"use client";

import React from 'react';

const GoToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Go to top"
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V6m0 0l-7 7m7-7l7 7" />
      </svg>
    </button>
  );
};

export default GoToTopButton;
