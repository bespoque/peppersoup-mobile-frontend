import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "../context/UserContext"; // Import UserProvider
import { MenuProvider } from "../context/MenuContext"; // Import MenuProvider
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
          <MenuProvider> {/* Wrap the app with MenuProvider */}
            {children}
          </MenuProvider>
        </UserProvider>
      </body>
    </html>
  );
}
