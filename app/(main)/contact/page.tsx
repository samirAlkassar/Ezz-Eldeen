"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import FormField from "@/components/ui/FormFeild";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Message sent:", formData);
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-[85rem] mx-auto px-6 pb-16 pt-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-orange-400"
      >
        Get in Touch
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-700 mb-12 max-w-2xl text-2xl font-medium"
      >
        Have a question or want to work together? Fill out the form below and I’ll get back to you as soon as possible.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <MessageCircle className="text-orange-400" />
            <span className="text-gray-700 text-xl">samir.alkcar@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-orange-400" />
            <span className="text-gray-700 text-xl">+20 123 456 7890</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-orange-400" />
            <span className="text-gray-700 text-xl">Cairo, Egypt</span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >

          <FormField name="name" type="text" placeholder="Your Name" onChange={handleChange} required={true} value={formData.name}>Name</FormField>
          <FormField name="email" type="email" placeholder="Your Email" onChange={handleChange} required={true} value={formData.email}>Email</FormField>
          <FormField rows={5} inputType="textarea" name="message" type="text" placeholder="Your Email" onChange={handleChange} required={true} value={formData.message}>Message</FormField>

          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 active:scale-95 transition-all duration-150 rounded-full px-6 py-2 text-lg text-white font-medium cursor-pointer w-fit"
          >
            Send Message
          </button>
          {sent && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-green-400 mt-2"
            >
              Message sent successfully!
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;
