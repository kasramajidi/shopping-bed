import type { Metadata } from "next";
import RootLayout from "./RootLayout";
import "./globals.css";
export const metadata: Metadata = {
  title: "Shopping",
  description: "This is a shopping site",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
