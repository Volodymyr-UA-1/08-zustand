import type { Metadata } from "next";
import Header from "@/components/Header/Header"; // Повертаємо імпорт
import Footer from "@/components/Footer/Footer"; // Повертаємо імпорт
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import "./globals.css";
import { Roboto } from 'next/font/google';


export const metadata: Metadata = {
  metadataBase: new URL("https://notehub.com"),
  title: "NoteHub",
  description: "Manage your notes efficiently",
  openGraph: {
    title:"NoteHub",
      description:"Manage your notes efficiently",
      url:`https://notehub.com`,
      images: [
        {
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
          height: 630,
          alt: "NoteHub",
      
    },
    ],
    type: 'website',
  }
};
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          {/* Header має бути тут, щоб бути видимим на всіх сторінках */}
          <Header /> 
          
          <main>
            {children}
          </main>
          
          {/* Слот для модалок, які тепер працюють коректно */}
          {modal} 

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}