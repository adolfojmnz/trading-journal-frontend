import React from "react";

const Footer = () => {
  return (
    <footer className="flex-shrink-0 bg-gray-100">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-black text-xl-3">
          &copy; {new Date().getFullYear()} Adolfo Jimenez. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
