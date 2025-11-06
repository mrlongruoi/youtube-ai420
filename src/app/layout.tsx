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
 * Application root layout that renders an <html> element and a <body> with the Inter font applied.
 *
 * @param children - The React nodes to render inside the document body (page content).
 * @returns The root HTML structure containing the rendered children.
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