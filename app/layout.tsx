import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/Header"; // Повертаємо імпорт
import Footer from "@/components/Footer/Footer"; // Повертаємо імпорт
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes efficiently",
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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