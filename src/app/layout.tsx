import type { Metadata } from "next";
import "./globals.css";
import "./login-design.css";

export const metadata: Metadata = {
  title: "Nora — Mirë se u ktheve",
  description: "Hapësira jote për idetë, planet dhe ditën tënde. Provo aplikacionin demo Nora.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sq" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
