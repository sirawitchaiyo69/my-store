import type { Metadata } from "next";
import { Anuphan, Geist_Mono } from "next/font/google";
import "./globals.css";

// Anuphan มี glyph ภาษาไทย ฟอนต์ latin ล้วนจะ fallback เงียบ ๆ เมื่อเจอข้อความไทย
const anuphan = Anuphan({
  variable: "--font-sans",
  subsets: ["thai", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MY STORE",
  description: "ร้านตัวอย่างของคอร์ส Zero to Checkout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${anuphan.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
