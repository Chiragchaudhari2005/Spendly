import React from "react";
import {useEffect} from 'react';

export const Navbar = ({menuOpen,setMenuOpen}) => {
    useEffect(() => {
        document.body.style.overflow = menuOpen? "hidden" : ""; //preventing the user from scrolling the page behind the menu.
    },[menuOpen]);

    return(
        <nav className="fixed top-0 w-full z-40 bg-[#248594] backdrop-blur-lg border-b border-white/10 shadow">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#home" className="font-mono text-xl font-bold w-28 h-12 text-secondary2">
                        <h1 className="text-2xl pt-2 text-[#fcca3e]">Spendly</h1>
                    </a>

                    <div className="w-7 h-5 relative cursor-pointer z-40 md:hidden" onClick={() => setMenuOpen((prev) => !prev)}>
                        &#9776;
                    </div>

                    <div className="hidden md:flex items-center space-x-8 text-xl">
                        <a href="#home" className="text-white hover:text-white transition-colors">{" "}Home{" "}</a>
                        <a href="#dashboard" className="text-white hover:text-white transition-colors">{" "}Dashboard{" "}</a>
                        <a href="#about" className="text-white hover:text-white transition-colors">{" "}About{" "}</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;