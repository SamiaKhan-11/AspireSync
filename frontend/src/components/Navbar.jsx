import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white p-5 shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center ">
                {/* Logo */}
                <Link href="/" className="text-black text-3xl font-bold mx-28">
                    OffCampus
                </Link>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                {/* Menu Items for desktop */}
                <div className="hidden md:flex space-x-10 mx-10">
                    <Link href="/" className="text-black hover:text-blue-500 px-3  py-2 rounded-lg transition duration-300 font-semibold 
                    hover:bg-blue-200">
                        Home
                    </Link>
                    <Link href="/about" className="text-black hover:text-blue-500 px-3  py-2 rounded-lg transition duration-300 font-semibold 
                    hover:bg-blue-200">
                        About
                    </Link>
                    <Link href="/interviews" className="text-black hover:text-blue-500 px-3  py-2 rounded-lg transition duration-300 font-semibold 
                    hover:bg-blue-200">
                        Interviews
                    </Link>
                    <Link href="/contact" className="text-black hover:text-blue-500 px-3  py-2 rounded-lg transition duration-300 font-semibold 
                    hover:bg-blue-200">
                        Contact
                    </Link>
                    <Link href="/login" className="text-blue-700 hover:text-white px-4 bg-blue-100 hover:bg-blue-800 py-2 rounded-full transition duration-300 font-semibold 
                    hover:bg-blue-200">
                        Login
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-500 ease-in-out`}
            >
                <div className="bg-gray-800 text-white p-5 space-y-4 text-center">
                    <Link href="/" onClick={() => setIsOpen(false)} className="block text-lg">

                        Home

                    </Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="block text-lg">

                        About

                    </Link>
                    <Link href="/interviews" onClick={() => setIsOpen(false)} className="block text-lg">

                        Interviews

                    </Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-lg">

                        Contact

                    </Link>
                </div>
            </div>
        </nav>
    );
}
