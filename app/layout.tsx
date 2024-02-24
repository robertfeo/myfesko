import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <AppBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
