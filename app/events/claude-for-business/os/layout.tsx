// Bare layout ~ suppresses global nav, footer, and cookie banner
// This page is a full-viewport event tool, not a public-facing page

export const metadata = {
  title: 'Event OS ~ Claude for Business',
  robots: { index: false, follow: false },
};

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
