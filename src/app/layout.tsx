import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/animePosterGenerator/layout/header";
import Footer from "@/components/animePosterGenerator/layout/footer";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import StoreProvider from "./storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Poster Generator",
  description: "Anime Poster Generator - <🐤/>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <>
              <main className="flex flex-col h-screen">
                <div className="flex flex-1 overflow-hidden">
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center h-16 p-4">
                      <div className="w-full">
                        <Header />
                      </div>
                    </div>
                    <div className="flex flex-1 overflow-y-auto paragraph p-4">
                      <div className="w-full mx-auto px-4 sm:px-6">
                        {children}
                      </div>
                    </div>
                    <div className="my-2"></div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full">
                    <Footer />
                  </div>
                </div>
              </main>
            </>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
