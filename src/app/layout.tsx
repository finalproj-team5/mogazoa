import './globals.css';
import Header from '@/components/common/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='bg-[#1C1C22]'>
        <Header />
        <main>{children}</main>
        <div id='modal'></div>
      </body>
    </html>
  );
}
