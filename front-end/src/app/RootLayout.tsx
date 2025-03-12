"use client";
import { usePathname } from "next/navigation";
import Register from "@/components/Layout/register";
import Navbar from "@/components/Layout/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname === "/pages/Login" || pathname === "/pages/Signup";

  return (
    <html lang="en">
      <body>
        {!hideHeader && <Register />}
        {!hideHeader && <Navbar />}
        {children}
      </body>
    </html>
  );
}
