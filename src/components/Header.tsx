'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-[#3C5DAF80] border-b-[1px] border-b-white backdrop-blur-[10px] fixed w-screen top-0 z-50">
            <div className="container mx-auto px-4 py-[18px] max-w-[1200px]">
                <div className="flex items-center justify-between">
                    <div className='flex-1/6'>
                        <Link href='/' className="flex items-center w-fit gap-[6px]">
                            <Image
                                src="/img/logo.svg"
                                alt="Sea Hunter"
                                width={54}
                                height={54}
                                className="h-[32px] lg:h-[54px] block w-auto object-contain"
                            />
                            <div className='font-squada-one text-h4 leading-1'>
                                SEA HUNTERS
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden flex-1/2 justify-center md:flex space-x-[22px] font-squada-one text-title font-normal text-white">
                        <Link href="/#hero" className={`cursor-pointer`}>Home</Link>
                        <Link
                            href="/#game-story"
                        >
                            Game Story
                        </Link>
                        <Link href={"/#features"}>Features</Link>
                        <Link href="/#news">News</Link>
                        <Link href="/#download">Download</Link>
                    </nav>
                    <div className='hidden lg:block flex-1/6'>

                    </div>

                    <div className="flex items-center gap-4 lg:min-w-[100px]">
                        {/* Hamburger Menu Button */}
                        <button
                            className="md:hidden w-6 h-6 flex flex-col justify-center items-center gap-1"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 invisible'} overflow-hidden`}>
                    <nav className="flex flex-col gap-4 py-4 pt-8">
                        <Link onClick={toggleMenu} href="/#hero" className={`text-title font-bold transition-colors`}>Home</Link>
                        <Link onClick={toggleMenu} href="/#game-story" className={`text-title font-bold transition-colors`}>Game Story</Link>
                        <Link onClick={toggleMenu} href="/#features" className={`text-title font-bold transition-colors`}>Features</Link>
                        <Link onClick={toggleMenu} href="/#news" className={`text-title font-bold transition-colors`}>News</Link>
                        <Link onClick={toggleMenu} href="/#download" className={`text-title font-bold transition-colors`}>Download</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
