'use client';

import dynamic from 'next/dynamic';

// Dynamically import components with SSR disabled to avoid context issues during static generation
const GoToTopButton = dynamic(() => import('./GoToTopButton'), {
  ssr: false,
});

const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), {
  ssr: false,
});

// Client-only wrapper to prevent SSR issues - render nothing during SSR
export default function ClientOnlyComponents() {
  // These components will only render on the client side
  return (
    <>
      <GoToTopButton />
      <WhatsAppButton />
    </>
  );
}


