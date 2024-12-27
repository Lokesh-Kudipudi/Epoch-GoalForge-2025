"use client";
import "./globals.css";
import ContextProvider from "@/contexts/ContextProvider";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Header></Header>
          <main>{children}</main>
        </ContextProvider>
      </body>
    </html>
  );
}
