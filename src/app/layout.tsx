import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WaitlistProvider } from "@/components/ui/waitlist-modal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rout — Smart Public Transit",
  description:
    "Real-time transit intelligence for your daily commute. Track buses live, get smart ETAs, and never miss your ride.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WaitlistProvider>{children}</WaitlistProvider>
      </body>
    </html>
  );
}
