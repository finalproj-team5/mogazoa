import './globals.css';
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        {children}
        <Script
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
          integrity='sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'
          crossOrigin='anonymous'
          strategy='beforeInteractive'
        />
        <Script id='kakao-init' strategy='beforeInteractive'>
          {`
            if (typeof window !== 'undefined' && window.Kakao) {
              window.Kakao.init('40f777057acdd67294fd721b8b55dedf');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
