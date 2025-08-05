import type { Metadata } from "next";
import { Squada_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

const squadaOne = Squada_One({
  subsets: ["latin"],
  variable: "--font-squada-one",
  weight: ["400"],
});

const svnGilroy = localFont({
  src: [
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Black.otf", weight: "900", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Black Italic.otf", weight: "900", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Bold Italic.otf", weight: "700", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Heavy.otf", weight: "800", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Heavy Italic.otf", weight: "800", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Light.otf", weight: "300", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Light Italic.otf", weight: "300", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Medium Italic.otf", weight: "500", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy SemiBold Italic.otf", weight: "600", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Thin.otf", weight: "100", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Thin Italic.otf", weight: "100", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy XBold.otf", weight: "800", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy XBold Italic.otf", weight: "800", style: "italic" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Xlight.otf", weight: "200", style: "normal" },
    { path: "../../public/font/SVN-Gilroy/SVN-Gilroy Xlight Italic.otf", weight: "200", style: "italic" },
  ],
  variable: "--font-svn-gilroy",
});

export const metadata: Metadata = {
  title: "Sea Hunter Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${squadaOne.variable} ${svnGilroy.variable} min-h-screen leading-base antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
