"use client";
import { usePathname } from "next/navigation";
import Register from "@/components/Layout/register";
import Navbar from "@/components/Layout/Navbar";
import { AuthProvider } from "../context/AuthContext";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeader =
    pathname === "/pages/Login" || pathname === "/pages/Signup";

  return (
    <AuthProvider>
      <html lang="en">
        <body>
          {!hideHeader && <Register />}
          {!hideHeader && <Navbar />}
          <ToastContainer/>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
