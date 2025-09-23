import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "All your kadi jokes in one place",
  description: "Developed with love and smile from the FOSSUnited Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Coolvetica from CDN */}
        <link href="https://fonts.cdnfonts.com/css/coolvetica" rel="stylesheet" />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c28faf8e-357e-47e6-91d3-5c32eaec9807"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
