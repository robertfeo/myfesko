/* eslint-disable react/jsx-no-undef */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AppBar from "./components/AppBar";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyFesko",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <AppBar />
            {children}
            <Toaster position="top-right" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
