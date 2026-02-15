"use client";

import { Copy, Facebook, Instagram, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const Footer = () => {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard")  || pathname.startsWith("/en/dashboard") || pathname.startsWith("/ar/dashboard")

  if(isDashboardPage) {return}
  return (
    <footer className="bg-white text-text py-8 md:py-10 overflow-hidden relative">
      <div className="container max-w-340 mx-auto px-5 sm:px-6 md:px-12 ">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 text-center md:text-left">
          <div className="text-left">
            <img src={"/images/logo.png"} alt="Ezz-eldeen" className="h-200 w-200 absolute left-0 -top-20 rotate-30 z-10 opacity-10 hidden md:block"/>
            <div className="flex items-center justify-start gap-1 z-20">
              <h2 className="text-2xl md:text-4xl font-semibold">Ezz Eldeen</h2>
            </div>
            <p className="text-sm md:text-base text-text-muted max-w-md z-20">
              Premium toys and school supplies designed to spark creativity and learning in every child.
            </p>
          </div>

          <div className="xl:ml-10 text-left z-20">
            <h3 className="font-medium text-text md-2.5  md:mb-3 text-base md:text-xl">Quick Links</h3>
            <ul>
              <QuickLinks>Home</QuickLinks>
              <QuickLinks>projects</QuickLinks>
              <QuickLinks>About</QuickLinks>
              <QuickLinks>Contract</QuickLinks>
            </ul>
          </div>

          <div className="z-20">
            <h3 className="font-medium text-text md-2.5 md:mb-3 text-base md:text-xl text-left">Follow Us</h3>
            <div className="flex justify-start gap-2 md:gap-4 mt-2">
              <SocailLinksButton><Facebook /></SocailLinksButton>
              <SocailLinksButton><Instagram /></SocailLinksButton>
              <SocailLinksButton><Twitter /></SocailLinksButton>
            </div>
          </div>

            <div className="flex flex-col justify-center md:justify-start gap-2 md:gap-4">

              <div>
                <h3 className="md:font-medium text-basemd:text-xl text-left">Contact Us</h3>
                <div className="flex items-center justify-between bg-white/30 p-1 pl-3 rounded-md mt-2 border border-text-muted/10">
                  <a href="#" className="hover:text-text transition flex gap-2 text-sm"><Phone size={18}/><span>20+ 1001347513</span></a>
                  <button className="hover:bg-text-muted/10 rounded-sm p-2" title="copy"><Copy size={14} className="cursor-pointer"/></button>
                </div>
              </div>
              <JoinCommunityCard />
            </div>
        </div>

        <div className="md:border-t border-text-muted/60 pt-4 md:pt-6 text-sm text-text-muted text-center mt-4">
          © 2025 Ezz-Eldeen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const SocailLinksButton = ({children}: {children: ReactNode}) => {
  return (
    <Link href="#" className="transition bg-text-muted/70 text-white rounded-lg md:rounded-full p-3 cursor-pointer hover:bg-text-muted/70 active:scale-95 duration-75 ease-in">
      {children}
    </Link>
  )
};

const QuickLinks = ({children}: {children: ReactNode}) => {
  return (
    <li className="py-1 hover:text-text md:bg-transparent text-start rounded-md text-base text-text-muted cursor-pointer">
      <Link href={`/${"en"}`}>
        {children}
      </Link>
    </li>
  )
};

const JoinCommunityCard = () => {
  return (
    <div className="p-4 rounded-2xl border border-text/20 mt-4 md:mt-0">
      <p className="mt-8 md:mt-0 text-left">Join our community</p>
      <p className="text-text-muted text-sm mt-1">Get 10% off your first order and stay updated on new drops.</p>
      <div className="flex gap-2 flex-col mt-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="bg-white/30 md:bg-white/10 w-full px-4 py-2 text-base rounded-lg md:rounded-xl border border-[#2B303B]/10 md:shadow-md focus:outline-none focus:ring-1 focus:ring-primary text-text-muted placeholder-gray-300"
        />
        <button className="bg-primary w-full text-white px-3 md:px-6 py-2 text-base md:text-lg rounded-lg md:rounded-xl cursor-pointer md:shadow-md border-[#2B303B]/10 active:scale-[97%] transition-all duration-75">Subscripe</button>
      </div>
    </div>
  )
}