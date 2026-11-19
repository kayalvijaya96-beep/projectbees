import type { Metadata } from 'next';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { NavigationBar } from '@/components/NavigationBar';
import { Footer } from '@/components/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ProjectBee — CBSE & ICSE School Projects, Science Models & Educational Kits',
  description:
    'Ready-to-use science working models, 3D anatomical models, curriculum charts, and DIY assignment kits for classes 1-12. 100% Cash on Delivery available across India.',
  keywords: [
    'school science models',
    'CBSE science projects',
    'ICSE science exhibition models',
    'hydraulic lift model',
    'working windmill model',
    'educational charts',
    'science project kits India',
    'COD science projects',
  ],
  authors: [{ name: 'ProjectBee — YugaYatra Retail' }],
  openGraph: {
    title: 'ProjectBee — School Projects & Science Models',
    description: 'Curriculum-aligned working models and educational kits with 100% Cash on Delivery.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-[#0B111E] text-[#F1F5F9] antialiased selection:bg-[#F6C94B]/30 selection:text-[#F6C94B] relative">
        <CartProvider>
          <WishlistProvider>
            {/* Animated Ambient Background */}
            <AnimatedBackground />

            {/* Redesigned Navigation Bar */}
            <NavigationBar />

            {/* Main Page Content */}
            <main className="flex-1 relative z-10">{children}</main>

            {/* Redesigned Accessible Footer */}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
