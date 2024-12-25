"use client";
import "./globals.css";
import ContextProvider from "@/contexts/ContextProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <main> {children}</main>
        </ContextProvider>
      </body>
    </html>
  );
}
