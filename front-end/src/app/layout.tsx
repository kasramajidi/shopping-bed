import type { Metadata } from "next";
import "./globals.css";



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
        {children}
      </body>
    </html>
  );
}
