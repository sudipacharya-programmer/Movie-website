import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-6 sm:px-12 py-16 border-t border-gray-800 text-sm tracking-wide">
      
      {/* Top Section: Link Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 items-start">
        
        {/* Brand Column - Frame */}
        <div className="space-y-4">
          {/* Main brand title - Large, bold, and crisp white */}
          <h3 className="text-white font-bold text-xl tracking-tight">Frame</h3>
          <p className="leading-relaxed text-gray-400 text-[13px] font-medium max-w-xs">
            A small, human-curated library of films worth finishing. No infinite scroll.
          </p>
        </div>

        {/* Browse Column */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase">Browse</h4>
          <ul className="space-y-2.5 text-[13px] font-medium">
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">All films</a></li>
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">Collections</a></li>
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">Directors</a></li>
          </ul>
        </div>

        {/* About Column */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase">About</h4>
          <ul className="space-y-2.5 text-[13px] font-medium">
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">The editor's note</a></li>
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">How we choose</a></li>
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">Contact</a></li>
          </ul>
        </div>

        {/* Account Column */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase">Account</h4>
          <ul className="space-y-2.5 text-[13px] font-medium">
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">Sign in</a></li>
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">Membership</a></li>
            <li><a href="#" className="hover:text-emerald-400 text-gray-400 transition-colors duration-200">Gift a subscription</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright and Disclaimer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center text-xs font-medium text-gray-500 space-y-4 sm:space-y-0">
        <div>
          © {new Date().getFullYear()} Frame
        </div>
        <div className="italic tracking-normal text-gray-600 text-[11px]">
          All films are fictional, for design purposes
        </div>
      </div>
    </footer>
  );
};

export default Footer;
