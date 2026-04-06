import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Intore - Hire Rwanda\'s Best Talent',
  description: 'Everything Rwandan hiring teams need to hire smarter.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#f5f7f9] text-slate-800`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
