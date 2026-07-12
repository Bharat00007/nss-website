import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "JIT NSS Unit | National Service Scheme | Jhulelal Institute of Technology, Nagpur",
  description: "Official portal of the National Service Scheme (NSS) Unit of Jhulelal Institute of Technology (JIT), Nagpur. Motivating youth to service under 'Not Me But You'.",
  keywords: ["NSS", "National Service Scheme", "JIT", "Jhulelal Institute of Technology", "Nagpur", "Social Service", "Volunteering", "Engineering College NSS", "Community Service"],
  authors: [{ name: "JIT NSS Tech Team" }],
  openGraph: {
    title: "JIT NSS Unit | Jhulelal Institute of Technology, Nagpur",
    description: "Official portal of JIT NSS Unit. Showcase of social activities, blood donations, camp reports, and volunteer enrollment.",
    url: "https://jitnss.edu",
    siteName: "JIT NSS",
    images: [
      {
        url: "/images/gallery/7days nss camp.jpeg",
        width: 1200,
        height: 630,
        alt: "JIT NSS Volunteers Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JIT NSS Unit | Nagpur",
    description: "National Service Scheme Unit of Jhulelal Institute of Technology, Nagpur.",
    images: ["/images/gallery/7days nss camp.jpeg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logos/nss.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} antialiased font-sans`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
