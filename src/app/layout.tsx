import "./globals.css";
import { Poppins } from "next/font/google";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "ClinTech Estate",
  description: "Welcome to ClinTech Estate, an Innovative real estate website.",
  icons: {
    icon: "/favicon.ico",
  },
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEX === "true"
      ? undefined
      : {
          index: false,
          follow: false,
          nocache: true,
        },
  openGraph: {
    title: "ClinTech",
    description:
      "Welcome to ClinTech Estate, an Innovative real estate website.",
    // url: SITE_URL,
    siteName: "ClinTech-Estate",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/576ca26a88.js"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
