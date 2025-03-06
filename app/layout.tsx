import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatGZQ",
  description:
    "ChatGZQ (ChatGiziQu) adalah sebuah aplikasi chatbot yang dirancang untuk membantu orang tua, tenaga kesehatan, dan masyarakat umum dalam mencegah dan menangani masalah stunting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={montserrat.variable}>
      <body className="font-montserrat">{children}</body>
    </html>
  );
}
