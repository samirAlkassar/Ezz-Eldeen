
import type { Metadata } from "next";
import Sidebar from "./dashboard/components/Sidebar";
import NavbarServer from "@/components/layout/navbar/NavbarServer";

export const metadata: Metadata = {
  title: "Ezz-Eldeen | Login to your account",
  description:
    "Shop high-quality products at Ezz-Eldeen. Premium selection, great prices, and fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background">
      <NavbarServer />
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 px-3 md:px-8 pt-4 md:pt-6 pb-2 md:pb-4 max-h-[calc(100vh-76px)] overflow-y-scroll">
        {children}
      </div>
    </div>
    </div>

  );
}
