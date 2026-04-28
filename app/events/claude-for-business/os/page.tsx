import dynamic from 'next/dynamic';

// No SSR ~ uses localStorage, sessionStorage, and full-viewport layout
const EventOS = dynamic(() => import('./EventOS'), { ssr: false });

export default function EventOSPage() {
  return <EventOS />;
}
