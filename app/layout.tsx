import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chinese Poetry Explorer",
  description: "Explore the beauty of Chinese poetry through the ages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
