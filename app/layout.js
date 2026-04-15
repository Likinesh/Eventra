import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/Header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Eventra",
  description:
    "Discover and create amazing events with Eventra - your ultimate event discovery and creation platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-linear-to-br from-black via-[#0B0B0F] to-[#111827]bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            <ConvexClientProvider>
              {/* Header */}
              <Header />

              <main className="relative min-h-screen container mx-auto pt-40 md:pt-32">
                {/* Background glow effects (behind everything) */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className="perspective-distant">
                    <div className="transform-gpu">{children}</div>
                  </div>
                </div>

                {/* Footer */}
                <Footer />
                <Toaster position="top-center" richColors />
              </main>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
