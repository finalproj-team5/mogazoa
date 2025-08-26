import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='max-w-md mx-auto bg-gray-800'>{children}</body>
    </html>
  );
}
