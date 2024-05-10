import { Providers } from "./providers";
import "./globals.css"

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ImageGround',
  description: 'Powerful image transformations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}