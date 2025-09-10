'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import Header from '@/components/common/Header';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='bg-[#1C1C22]'>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main>{children}</main>
          <div id='modal'></div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
