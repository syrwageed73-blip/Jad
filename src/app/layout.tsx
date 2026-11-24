import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jad Aldassouki — Back-End Developer & Systems Architect',
  description:
    'Engineering scalable server-side systems, secure APIs, distributed database clusters, and high-throughput backend infrastructure.',
  keywords: [
    'Jad Aldassouki',
    'Back-End Developer',
    'Systems Architect',
    'Node.js',
    'Python',
    'PostgreSQL',
    'Microservices',
    'Distributed Systems',
    'API Ingress Gateway',
  ],
  authors: [{ name: 'Jad Aldassouki' }],
  openGraph: {
    title: 'Jad Aldassouki — Back-End Developer & Systems Architect',
    description:
      'I engineer scalable server-side systems, secure APIs, and reliable database architectures.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#08090a] text-[#f2f4f8] antialiased font-mono">
        {children}
      </body>
    </html>
  );
}
