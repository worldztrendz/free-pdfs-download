import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Free Pdfs Download - Free Educational Notes PDF Download",
    template: "%s | Free Pdfs Download"
  },
  keywords: "Free PDF Downloads, Educational Notes, BSc Notes, MSc Notes, Engineering Notes, Computer Science Notes, Chemistry Notes, Mathematics Notes, Physics Notes",
  publisher:"Free Pdfs Download",
  description: "Download free educational notes in PDF format for BSc, MSc, Engineering, Computer Science, Chemistry, Mathematics, and Physics.",
  metadataBase: new URL("https://freepdfsdownload.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Free Pdfs Download - Free Educational Notes PDF Download",
    description: "Download free educational notes in PDF format for BSc, MSc, Engineering, Computer Science, and Mathematics.",
    url: "https://freepdfsdownload.com",
    siteName: "Free Pdfs Download",
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main style={{ flex: "1 0 auto" }}>{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
