import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Ray Garratt’s Tyres | Performance meets the Coast', description: 'Discover Pirelli tyres and local tyre expertise at Ray Garratt’s Tyres, 611 Whangaparaoa Road, Stanmore Bay.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en-NZ"><body>{children}</body></html>; }
