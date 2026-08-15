import './globals.css';
import type { Metadata } from 'next';
import { Inter, Press_Start_2P, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import RouteProgress from '@/components/layout/RouteProgress';
import { Toaster } from 'sonner';
import { Providers } from "@/components/layout/Providers";
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { siteConfig } from '@/config/env';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// Use siteConfig or fallback for safety
const siteUrl = typeof siteConfig !== 'undefined' && siteConfig?.url ? siteConfig.url : 'https://meermc.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MeerMc - Premium Minecraft Server Experience',
    template: '%s | MeerMc',
  },
  description: 'Join MeerMc, the ultimate Minecraft survival server with custom plugins, ranked PvP, active community, and weekly events. Start your adventure today!',
  keywords: ['Minecraft', 'Minecraft Server', 'SMP', 'Survival', 'PvP', 'Gaming', 'MeerMc'],
  authors: [{ name: 'MeerMc Team' }],
  creator: 'MeerMc',
  icons: {
    icon: '/branding/icons/server-icon.png',
    shortcut: '/branding/icons/server-icon.png',
    apple: '/branding/icons/server-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'MeerMc',
    title: 'MeerMc - Premium Minecraft Server Experience',
    description: 'Join MeerMc, the ultimate Minecraft survival server with custom plugins, ranked PvP, active community, and weekly events.',
    images: [
      {
        url: '/branding/logo/MeerMc_Logo.png',
        width: 1200,
        height: 630,
        alt: 'MeerMc - Minecraft Server',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MeerMc - Premium Minecraft Server',
    description: 'Join MeerMc, the ultimate Minecraft survival server with custom plugins and active community.',
    images: ['/branding/logo/MeerMc_Logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${pressStart2P.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AnimatedBackground />
        <Providers>
          <RouteProgress />
          <div className="relative min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 pt-16 lg:pt-20">{children}</main>
            <Footer />
          </div>
          <Toaster theme="dark" position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
