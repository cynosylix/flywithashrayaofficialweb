import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Add this import
import "./globals.css";

// Configure your font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optional: improves loading performance
  variable: '--font-inter' // Optional: for CSS variable usage
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}