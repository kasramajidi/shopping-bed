"use client"
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import RootLayout from "./RootLayout";
import "./globals.css";

const queryClient = new QueryClient();

export const Metadata = {
  title: "Shopping",
  description: "This is a shopping site",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>{children}</RootLayout>
    </QueryClientProvider>
  );
}
