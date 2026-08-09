import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tagged — Lost & Found',
  description: 'Reunite people with what they lost. Post what you found, or report what you lost, and get matched.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
