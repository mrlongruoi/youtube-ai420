import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tube AI420",
  description: "Tube AI420 Created by MrLongruoi",
};

/**
 * Root layout component that provides Clerk authentication context and applies the Inter font.
 *
 * @param children - Page content to render inside the document body.
 * @returns The root HTML document wrapped in a ClerkProvider, with the Inter font applied to the body.
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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}