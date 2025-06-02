'use client';

import type React from 'react';

import { Link } from '@inertiajs/react';
import { Calendar, Gift, Heart, HelpCircle, LogOut, Menu, MessageSquare, User, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePage } from '@inertiajs/react';

interface ProfileLayoutProps {
    children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
    const { url } = usePage().props;
    const pathname = typeof url === 'string' ? url : '';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigationItems = [
        {
            href: '/profil',
            label: 'Kelola Profil',
            icon: <User className="h-5 w-5" />,
            exact: true,
        },
        {
            href: '/profil/disukai',
            label: 'Postingan Disukai',
            icon: <Heart className="h-5 w-5" />,
        },
        {
            href: '/profil/dikomentari',
            label: 'Postingan Dikomentari',
            icon: <MessageSquare className="h-5 w-5" />,
        },
        {
            href: '/profil/donasi',
            label: 'Kelola Donasi',
            icon: <Gift className="h-5 w-5" />,
        },
        {
            href: '/profil/forum',
            label: 'Kelola Forum',
            icon: <Users className="h-5 w-5" />,
        },
        {
            href: '/profil/permintaan',
            label: 'Kelola Butuh Bantuan',
            icon: <HelpCircle className="h-5 w-5" />,
        },
        {
            href: '/profil/acara',
            label: 'Kelola Acara',
            icon: <Calendar className="h-5 w-5" />,
        },
    ];

    const isActive = (href: string, exact = false) => {
        if (exact) {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const handleLogout = () => {
        // Implement logout logic here
        if (confirm('Apakah Anda yakin ingin keluar?')) {
            // Redirect to login or home page
            window.location.href = '/login';
        }
    };

    const NavigationContent = () => (
        <div className="space-y-6">
            {/* Profile Info */}
            <Card className="bg-light-base text-dark-base shadow-none">
                <CardContent className="p-4">
                    <div className="flex gap-2 flex-row lg:flex-col xl:flex-row items-center text-left lg:text-center xl:text-left">
                        <img
                            src="/img/avatars/default.jpg"
                            alt="Profile"
                            className="aspect-square h-12 w-12 rounded-full bg-emerald-100 object-cover"
                        />
                        <div>
                            <h3 className="font-semibold">Ahmad Rizki</h3>
                            <p className="text-sm text-gray-500">ahmad.rizki@email.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation Menu */}
            <nav className="space-y-1">
                {navigationItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive(item.href, item.exact)
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="border-t pt-4">
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    Keluar
                </Button>
            </div>
        </div>
    );

    return (
        <aside className="section-padding-x py-8">
            <div className="container max-w-screen-xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-20">
                            <NavigationContent />
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Profil Saya</h1>
                            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <SheetTrigger asChild className='bg-light-base text-dark-base'>
                                    <Button variant="outline" size="icon">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-80 bg-light-base text-dark-base">
                                    <div className="mt-6">
                                        <NavigationContent />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">{children}</div>
                </div>
            </div>
        </aside>
    );
}
