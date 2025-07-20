import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head'; // Import Head for favicon

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

import GoToTopButton from './components/GoToTopButton';
import WhatsAppButton from './components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'FlyWithAshraya',
  description: 'Your website description',
  icons: {
    icon: 'logo.png',
    shortcut: '/favicon-16x16.png', // Optional different sizes
    apple: '/apple-touch-icon.png', // For Apple devices
  },
  // Alternative if you want to use an SVG:
  // icons: {
  //   icon: '/logo.svg',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* You can add additional meta tags here if needed */}
      </head>
      <body>
        {children}
        <GoToTopButton />
        <WhatsAppButton />
      </body>
    </html>
  );
}