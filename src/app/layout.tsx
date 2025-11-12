import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tube AI420",
  description: "Tube AI420 Created by MrLongruoi",
};

/**
 * Renders the application's root HTML layout and wraps children with global providers and UI.
 *
 * @param children - The page content to render inside the root layout.
 * @returns The root JSX element that wraps `children` with authentication, TRPC, and global toast providers and applies the site font.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body
          className={inter.className}
        >
          <TRPCProvider>
            <Toaster />
            {children}
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}