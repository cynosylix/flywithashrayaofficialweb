"use client";

import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '1234567890'; // Replace with your WhatsApp number
  const message = encodeURIComponent('Hello, I would like to inquire about your services.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        color: '#fff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        zIndex: 1000,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.37 0 0 5.37 0 12a11.88 11.88 0 001.64 6.04L0 24l5.96-1.64A11.88 11.88 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.5a9.5 9.5 0 01-4.84-1.38l-.35-.21-3.54.98.95-3.45-.23-.36A9.5 9.5 0 012.5 12c0-5.25 4.25-9.5 9.5-9.5s9.5 4.25 9.5 9.5-4.25 9.5-9.5 9.5zm5.2-7.3c-.28-.14-1.65-.81-1.9-.9-.25-.1-.43-.14-.62.14s-.71.9-.87 1.08c-.16.18-.32.2-.6.07a7.3 7.3 0 01-2.15-1.32 8.2 8.2 0 01-1.52-1.88c-.16-.28 0-.43.12-.57.12-.12.28-.32.42-.48a1.8 1.8 0 00.3-.5c.1-.18.05-.33-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.54-.44-.47-.62-.48-.16-.01-.35-.01-.54-.01a.75.75 0 00-.54 1.28c.18.18.4.4.65.65.25.25.52.52.8.8z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
