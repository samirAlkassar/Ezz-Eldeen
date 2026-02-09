"use client";

import { Copy, Facebook, Instagram, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard")

  if(isDashboardPage) {return}
  return (
    <footer className="bg-gray-800 md:bg-gradient-to-r md:from-purple-600 md:via-pink-600 md:to-orange-500 text-white py-8 md:py-10">
      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-4 md:gap-8 text-center md:text-left">
          {/* Brand */}
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold md-2.5 md:mb-3">Ezz-Eldeen</h2>
            <p className="text-base md:text-lg text-gray-200 max-w-md hidden md:block">
              Making childhood magical with the best school supplies, gifts, and toys.
              We believe every child deserves to learn, play, and grow with joy!
            </p>
          </div>

          {/* Links */}
          <div className="md:ml-10 text-left">
            <h3 className="font-medium md:font-semibold md-2.5  md:mb-3 text-base md:text-xl">Quick Links</h3>
            <ul className="text-gray-200 grid grid-cols-2 md:grid-cols-1 gap-2">
              <li className="p-3 bg-white/30 md:bg-transparent text-center md:text-left rounded-md z-20"><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li className="p-3 bg-white/30 md:bg-transparent text-center md:text-left rounded-md z-20"><Link href="/products?page=1" className="hover:text-white transition">Projects</Link></li>
              <li className="p-3 bg-white/30 md:bg-transparent text-center md:text-left rounded-md z-20"><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li className="p-3 bg-white/30 md:bg-transparent text-center md:text-left rounded-md z-20"><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-medium md:font-semibold md-2.5 md:mb-3 text-base md:text-xl text-left">Follow Us</h3>
            <div className="flex justify-start gap-2 md:gap-4">
              <Link href="#" className="hover:text-white transition bg-white/30 rounded-lg md:rounded-full p-3 cursor-pointer hover:bg-white/40 active:scale-95 duration-75 ease-in"><Facebook /></Link>
              <Link href="#" className="hover:text-white transition bg-white/30 rounded-lg md:rounded-full p-3 cursor-pointer hover:bg-white/40 active:scale-95 duration-75 ease-in"><Instagram /></Link>
              <Link href="#" className="hover:text-white transition bg-white/30 rounded-lg md:rounded-full p-3 cursor-pointer hover:bg-white/40 active:scale-95 duration-75 ease-in"><Twitter /></Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-medium md:font-semibold md-2.5  md:mb-3 text-basemd:text-xl text-left">Contact Us</h3>
            <div className="flex flex-col justify-center md:justify-start gap-2 md:gap-4">
              <div className="flex items-center justify-between bg-white/30 p-3 rounded-md">
                <a href="#" className="hover:text-white transition flex gap-2 text-sm"><Phone size={18}/><span>20+ 1001347513</span></a>
                <Copy size={14}/>
              </div>

              <p className="mt-8 md:mt-0 text-left">Get Special Offers</p>
              <div className="flex gap-2 flex-row md:flex-col">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/30 md:bg-white/10 w-full px-4 py-2 text-base rounded-lg md:rounded-xl border border-[#2B303B]/10 md:shadow-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-300"
                />
                <button className="bg-[#FF791A] w-fit text-white px-3 md:px-6 py-2 text-base md:text-xl rounded-lg md:rounded-xl cursor-pointer md:shadow-md border-[#2B303B]/10 active:scale-[97%] transition-all duration-75">Subscripe</button>
              </div>
            </div>
          </div>
        </div>


        <div className="md:flex justify-center gap-6 w-full md:-mt-25 hidden">
          <Image src="/images/toys-footer.png" alt="" width={740} height={740} />
        </div>
        {/* Bottom bar */}
        <div className="md:border-t border-white/20 pt-4 md:pt-6 text-sm text-gray-200 text-center mt-4">
          © 2025 Ezz-Eldeen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
