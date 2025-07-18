'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import navigations from '@/data/navigations';
import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, Search, User, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;

    // const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header className="section-padding-x sticky top-0 z-50 w-full border-b bg-gray-50">
            <div className="container flex h-16 max-w-screen-xl items-center justify-between">
                <div className="flex items-center gap-2 md:gap-6">
                    <Link href="/" className="w-10">
                        <img src="/pedulirasa.webp" alt="PeduliRasa Logo" />
                    </Link>
                    <nav className="hidden md:flex md:items-center md:gap-6">
                        {navigations.map((nav) => (
                            <Link
                                key={nav.path}
                                href={nav.path}
                                className="text-dark-base text-sm font-medium transition-colors hover:text-emerald-600"
                            >
                                {nav.title}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    {/* {isSearchOpen ? (
                        <div className="relative flex items-center md:w-40 lg:w-64">
                            <Input type="search" placeholder="Cari..." className="pr-8" />
                            <Button variant="ghost" size="icon" className="absolute top-0 right-0" onClick={() => setIsSearchOpen(false)}>
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close search</span>
                            </Button>
                        </div>
                    ) : (
                    )} */}
                    <Link href={route('search.index')}>
                        <Button variant="ghost" size="icon">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </Link>
                    {auth.user && (
                        <>
                            {/* <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                                <span className="sr-only">Notifications</span>
                            </Button> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                        <span className="sr-only">User menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-light-base text-dark-base shadow-lg">
                                    <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href="/settings" className="flex w-full">
                                            Profil
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/chat" className="flex w-full">
                                            Pesan
                                        </Link>
                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem>
                                        <Link href="/settings" className="flex w-full">
                                            Pengaturan
                                        </Link>
                                    </DropdownMenuItem> */}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="bg-red-base text-light-base hover:bg-red-700">
                                        <button onClick={handleLogout}>Keluar</button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                    {!auth.user ? (
                        <Link href="/login">
                            <Button className="text-light-base hidden bg-emerald-600 transition duration-100 hover:bg-emerald-700 md:inline-flex">
                                Donasikan Sekarang
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/donate">
                            <Button className="text-light-base hidden bg-emerald-600 transition duration-100 hover:bg-emerald-700 md:inline-flex">
                                Donasikan Sekarang
                            </Button>
                        </Link>
                    )}
                    {/* Hamburger menu with dropdown from top */}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            <div
                className={`section-padding-x absolute top-16 right-0 left-0 z-20 transform bg-white pb-4 shadow-md transition-all duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
                }`}
            >
                <nav className="container max-w-screen-xl">
                    <div className="flex flex-col space-y-2">
                        <Link
                            href="/"
                            className="rounded-md py-2 text-base font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/about"
                            className="rounded-md py-2 text-base font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tentang Kami
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-md py-2 text-base font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Kontak
                        </Link>
                        <Button
                            className="text-light-base w-full bg-emerald-600 transition duration-100 hover:bg-emerald-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Donasikan Sekarang
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
