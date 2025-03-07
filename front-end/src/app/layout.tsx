import type { Metadata } from "next";
import "./globals.css";
import Register from "@/components/Layout/register"
import Navbar from "@/components/Layout/Navbar";
export const metadata: Metadata = {
  title: "Shopping",
  description: "This is site for Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Register/>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
