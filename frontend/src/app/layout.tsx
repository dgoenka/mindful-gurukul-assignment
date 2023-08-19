import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mindful Gurukul",
  description: "Assignment by Divyansh Goenka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
