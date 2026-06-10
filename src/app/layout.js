"use client";

import "./globals.css";


import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FloatingButtons from "@/components/Contact/FloatingButtons";
import ScrollToTop from "@/components/Layout/ScrollToTop";
import LoadingScreen from "@/components/Layout/LoadingScreen";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    AOS.refresh();
  };

  if (loading) {
    return (
      <html lang="en">
        <body>
          <LoadingScreen
            onLoadingComplete={handleLoadingComplete}
          />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <ScrollToTop />

        <Header />

        <main>{children}</main>

        <Footer />

        <FloatingButtons />
      </body>
    </html>
  );
}