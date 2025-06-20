import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-black py-4 px-4 flex flex-col md:flex-row items-center justify-between text-sm md:text-base">
      <p className="text-center">
        © {new Date().getFullYear()} Get Me A Book. All rights reserved.
      </p>
      <p className="text-center mt-1 md:mt-0">
        <span className="font-semibold">Fajil Chauhan</span>
      </p>
    </footer>
  );
};

export default Footer;
