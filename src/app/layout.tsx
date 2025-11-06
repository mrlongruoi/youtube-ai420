import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tube AI420",
  description: "Tube AI420 Created by MrLongruoi",
};

/**
 * Root layout component that provides authentication, TRPC context, and global font styling for the app.
 *
 * @param children - React nodes to render inside the document body; these are wrapped by the TRPC provider.
 * @returns A JSX element representing the HTML document structure with Clerk and TRPC providers wrapping `children`.
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
            {children}
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}