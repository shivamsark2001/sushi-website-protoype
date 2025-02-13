import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sushi Camera",
  description: "Image enhancement made simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap"
        />
      </head>
      <body className="font-urbanist">{children}</body>
    </html>
  );
}
