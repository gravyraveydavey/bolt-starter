import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import config from "@/site-config";
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
})


export const metadata: Metadata = {
  title: config.title,
  description: config.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ colorScheme: "light" }}
        className={`${inter.variable} antialiased light min-h-screen flex flex-col justify-between`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <TooltipProvider delayDuration={0}>
                <NavBar />
                <div className="container mx-auto py-8 flex flex-col gap-8">
                    {children}
                </div>
                <Footer />
            </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
