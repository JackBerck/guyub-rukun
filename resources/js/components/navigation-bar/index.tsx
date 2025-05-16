'use client';

import navigations from '@/data/navigations';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import NavigationLink from './navigation-link';

export default function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { props } = usePage();
    const { auth } = props;
    const isAuthenticated = auth.user !== null;

    useEffect(() => {
        if (isAuthenticated) {
            navigations.push({
                title: 'Dashboard',
                path: '/dashboard',
            });
        } else {
            navigations.push({
                title: 'Daftar',
                path: '/daftar',
            });
            navigations.push({
                title: 'Masuk',
                path: '/masuk',
            });
        }
    }, [isAuthenticated]);

    return (
        <nav
            id="navbar"
            className={`section-padding-x text-dark-base normal-font-size bg-light-base fixed top-0 z-[998] w-full shadow-md transition-all duration-300`}
        >
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-4 xl:px-0">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/guyub-rukun.webp" className="w-10" alt="Guyub Rukun Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">
                        <span className="text-green-base">Guyub</span>
                        <span className="text-blue-base">Rukun</span>
                    </span>
                </Link>
                <button
                    type="button"
                    className="text-dark-base relative z-[999] focus:outline-none lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8" viewBox="0 0 448 512">
                        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                </button>
                <div className={`w-full lg:block lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="mt-4 flex flex-col gap-4 rounded-lg border p-4 font-medium lg:mt-0 lg:flex-row lg:items-center lg:gap-2 lg:border-0 lg:p-0 rtl:space-x-reverse">
                        {navigations.map((route: { title: string; path: string }, index: number) => (
                            <NavigationLink
                                key={index}
                                url={route.path}
                                addClass={`py-2 px-3 ${
                                    route.title.toLowerCase() === 'daftar'
                                        ? 'bg-lime-base text-light-base'
                                        : route.title.toLowerCase() === 'masuk'
                                          ? 'bg-blue-base text-light-base'
                                          : undefined
                                }`}
                            >
                                {route.title}
                            </NavigationLink>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
