import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});
import { BranchProvider } from "@/context/BranchContext";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OrderHandoffModal from "@/components/OrderHandoffModal";
import ItemDetailModal from "@/components/ItemDetailModal";

export const metadata: Metadata = {
  title: "Burger House | Nugegoda & Moratuwa, Sri Lanka",
  description:
    "Fresh crispy chicken burgers, loaded fries, authentic kottu, and wok-fried rice. Order online via Uber Eats or visit us in Nugegoda & Moratuwa.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Burger House | Nugegoda & Moratuwa",
    description:
      "Crispy burgers, loaded fries, authentic kottu and wok-fried rice from Burger House Sri Lanka. Order online or visit us.",
    type: "website",
    locale: "en_LK",
    siteName: "Burger House",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bebas.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FBF9F5] text-[#1F1D1A]">
        <BranchProvider>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <OrderHandoffModal />
          <ItemDetailModal />
        </BranchProvider>
      </body>
    </html>
  );
}
