import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CourierProvider } from "@/lib/data/courier-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Courier Dashboard",
  description: "A modern courier management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <CourierProvider>
              <MainLayout>{children}</MainLayout>
              <Toaster />
            </CourierProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}