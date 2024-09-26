import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "../context/UserContext"; 
import { MenuProvider } from "../context/MenuContext"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peppersoup Kitchen",
  description: "Peppersoup Kitchen",
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          
            {children}
          
        </UserProvider>
      </body>
    </html>
  );
}
