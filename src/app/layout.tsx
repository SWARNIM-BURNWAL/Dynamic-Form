import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dynamic Form Builder',
  description: 'A dynamic form builder application with multiple sections and validation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen`} suppressHydrationWarning>
        <div className="container mx-auto py-8 px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">Dynamic Form </h1>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}