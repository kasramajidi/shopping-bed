"use client";
import { usePathname } from "next/navigation";
import Register from "./../components/Layout/Register";
import Navbar from "./../components/Layout/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeader = pathname === "/Login" || pathname === "/Signup";

  return (
    <AuthProvider>
      <ThemeProvider>
        <html lang="en">
          <body>
            {!hideHeader && <Register />}
            {!hideHeader && <Navbar />}
            <ToastContainer />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </AuthProvider>
  );
}
