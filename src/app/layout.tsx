import { Toaster } from 'sonner';
import { Navigation } from '@/components/Navigation';
import './globals.css';
import { Inter } from 'next/font/google';
export const metadata = {
  title: 'Tick Tock',
  description: 'A simple timer app.',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground transition-colors duration-300`}
      >
        <div className='container mx-auto px-4 py-8 max-w-[400px]'>
          <Navigation />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}

