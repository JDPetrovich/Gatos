import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientFonts from "./clientFonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Patinhas Unidas",
  description: "Sistema de adoção e resgate de gatinhos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <ClientFonts geistSans={geistSans} geistMono={geistMono}>
          {children}
        </ClientFonts>
      </body>
    </html>
  );
}
