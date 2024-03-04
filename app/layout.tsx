import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <AppBar />
          <div className="min-h-screen bg-gray-50">{children}</div>
          {/* {children} */}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
