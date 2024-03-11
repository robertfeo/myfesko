/* eslint-disable react/jsx-no-undef */
import { ScrollShadow } from "@nextui-org/react";
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
}>,
) {
  return (
    <html lang="de" className="scroll-smooth focus:scroll-auto md:scroll-auto">
      <body className={inter.className}>
        <ScrollShadow size={1} hideScrollBar className="w-screen h-screen">
          <Providers>
            <div className="text-foreground bg-background min-h-screen">
              <AppBar />
              {children}
              <Toaster position="top-right" />
            </div>
          </Providers>
        </ScrollShadow>
      </body>
    </html>
  );
}
