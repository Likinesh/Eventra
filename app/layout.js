import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Spott",
  description: "Discover and create amazing events with Spott - your ultimate event discovery and creation platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          {/* Header */}
          <Header />
          
          <main className="min-h-screen relative container mx-auto pt-40 md:pt-32">
            {/* Glow for page */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 h-[70vh]">
              {children}
            </div>

            {/* Footer */}
            <footer className=" border-t border-gray-800/50 py-8 px-6 max-w-7xl mx-auto">
              <p className="text-center text-sm text-gray-500">
                &copy; 2023 Spott. All rights reserved.
              </p>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
