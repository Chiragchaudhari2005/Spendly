import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation and Link

export const Navbar = ({ menuOpen, setMenuOpen }) => {
    // Get the current location object from React Router
    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    // Helper function to get conditional class for links
    const getLinkClasses = (path) => {
        // Check if the current path matches the link's path
        // For the home page '/', we need a special check as other paths also start with '/'
        const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

        return `font-medium hover:text-white transition-colors ${
            isActive ? 'text-spendly-yellow' : 'text-black'
        }`;
    };

    return (
        <nav className="fixed top-0 w-full z-40 bg-spendly-gray backdrop-blur-lg border-b border-[#a6a6a6] shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Use Link component for navigation */}
                    <Link to="/" className="font-mono text-xl font-bold w-28 h-12 text-secondary2">
                        <p className="text-2xl pt-2 text-spendly-yellow font-black">Spendly</p>
                    </Link>

                    {/* Hamburger icon for mobile */}
                    <button
                        className="w-7 h-5 relative cursor-pointer z-40 md:hidden flex items-center justify-center text-black text-2xl"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                    >
                        &#9776;
                    </button>

                    {/* Desktop navigation links */}
                    <div className="hidden md:flex items-center space-x-8 text-xl">
                        {/* Use Link components and conditional classes */}
                        <Link to="/" className={getLinkClasses('/')}>Home</Link>
                        <Link to="/dashboard" className={getLinkClasses('/dashboard')}>Dashboard</Link>
                        <Link to="/history" className={getLinkClasses('/history')}>History</Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 bg-spendly-gray flex flex-col items-center justify-center space-y-6 text-2xl transition-transform duration-300 ease-in-out">
                    <Link
                        to="/"
                        className={getLinkClasses('/')}
                        onClick={() => setMenuOpen(false)} // Close menu on click
                    >
                        Home
                    </Link>
                    <Link
                        to="/dashboard"
                        className={getLinkClasses('/dashboard')}
                        onClick={() => setMenuOpen(false)} // Close menu on click
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/history"
                        className={getLinkClasses('/history')}
                        onClick={() => setMenuOpen(false)} // Close menu on click
                    >
                        History
                    </Link>
                    {/* Close button for mobile menu */}
                    <button
                        className="absolute top-4 right-4 text-black text-4xl"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close navigation menu"
                    >
                        &times;
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;