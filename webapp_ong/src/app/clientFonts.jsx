"use client";

export default function ClientFonts({ children, geistSans, geistMono }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      {children}
    </div>
  );
}
