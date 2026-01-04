"use client";

import { Contact, Facebook, Instagram, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard")

  if(isDashboardPage) {return}
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h2 className="text-4xl font-bold mb-3">Ezz-Eldeen</h2>
            <p className="text-lg text-gray-200 max-w-md">
              Making childhood magical with the best school supplies, gifts, and toys.
              We believe every child deserves to learn, play, and grow with joy!
            </p>
          </div>

          {/* Links */}
          <div className="ml-10">
            <h3 className="font-semibold mb-3 text-xl ">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Projects</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold mb-3 text-xl">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-white transition bg-white/30 rounded-full p-3 cursor-pointer hover:bg-white/40 active:scale-95 duration-75 ease-in"><Facebook /></a>
              <a href="#" className="hover:text-white transition bg-white/30 rounded-full p-3 cursor-pointer hover:bg-white/40 active:scale-95 duration-75 ease-in"><Instagram /></a>
              <a href="#" className="hover:text-white transition bg-white/30 rounded-full p-3 cursor-pointer hover:bg-white/40 active:scale-95 duration-75 ease-in"><Twitter /></a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold mb-3 text-xl">Contact Us</h3>
            <div className="flex flex-col justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-white transition flex gap-2"><Phone /><span>20+ 01001347513</span></a>
              <p>Get Special Offers</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 w-72 px-4 py-2 text-lg rounded-xl border border-[#2B303B]/10 shadow-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-300"
              />
              <button className="bg-[#FF791A] w-fit text-white px-6 py-2 text-xl rounded-xl cursor-pointer shadow-md border-[#2B303B]/10 active:scale-[97%] transition-all duration-75">Subscripe</button>
            </div>
          </div>
        </div>


        <div className="flex justify-center gap-6 w-full -mt-25">
          <Image src="/images/toys-footer.png" alt="" width={740} height={740} />
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-6 text-sm text-gray-200 text-center">
          © 2025 Ezz-Eldeen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
