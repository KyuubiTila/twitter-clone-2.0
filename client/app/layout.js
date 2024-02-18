'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </body>
      </html>
    </QueryClientProvider>
  );
}
