"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-6 py-16 text-white">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <p className="text-gray-400 max-w-3xl">
          I’m a frontend developer passionate about building beautiful, responsive, and performant web applications. 
          I enjoy turning ideas into interactive experiences while keeping the user experience simple and intuitive.
        </p>
      </motion.div>

      {/* Two Column Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4">My Journey</h2>
          <p className="text-gray-400 mb-4">
            I started my journey as a web developer learning HTML, CSS, and JavaScript, and quickly moved on to 
            mastering React and Next.js. I love experimenting with UI/UX designs and bringing concepts to life with code.
          </p>
          <p className="text-gray-400">
            I’m always exploring new technologies, improving my skills, and taking on challenging projects that help me grow as a developer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/profile.jpg" // replace with your image
            alt="About Me"
            fill
            className="object-cover rounded-2xl"
          />
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-6">Skills & Expertise</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript", "TailwindCSS", "Redux", "Framer Motion", "Figma"].map(skill => (
            <div
              key={skill}
              className="bg-gray-900 rounded-lg py-3 px-4 text-center font-medium text-white hover:bg-orange-400 hover:text-black transition-all cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
