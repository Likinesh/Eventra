import { Instagram, Mail, Twitter, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 py-8 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-center text-sm text-gray-500">
                    &copy; 2026 Spott. All rights reserved.
                  </p>
    </footer>
  );
};

export default Footer;