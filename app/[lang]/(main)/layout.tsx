import Footer from "@/components/layout/Footer";
import NavbarServer from "@/components/layout/navbar/NavbarServer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarServer />
          {children}
      <Footer />
    </div>
  );
}
