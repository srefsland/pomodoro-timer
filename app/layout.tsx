import type { Metadata } from "next";
import { Andada_Pro, Azeret_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const andadaPro = Andada_Pro({ subsets: ["latin"] });

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-azeret-mono",
});

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: `A simple online Pomodoro timer that helps you stay focused and productive. 
    If offers customizable timer settings and various backgrounds to create a personalized work environment.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${andadaPro.className} ${azeretMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
