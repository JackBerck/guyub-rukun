'use client';

import type React from 'react';

import { Link } from '@inertiajs/react';
import { Calendar, Gift, HelpCircle, LogOut, Menu, User, Users } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Auth, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

interface ProfileLayoutProps {
    children: React.ReactNode;
}

interface ProfilePageProps extends PageProps {
    auth: Auth;
    url: string | URL;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
    const { auth, url } = usePage<ProfilePageProps>().props;
    const user = auth.user;
    const pathname = typeof url === 'string' ? url : '';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigationItems = [
        {
            href: '/settings/profile',
            label: 'Kelola Profil',
            icon: <User className="h-5 w-5" />,
            exact: true,
        },
        // {
        //     href: '/settings/liked-posts',
        //     label: 'Postingan Disukai',
        //     icon: <Heart className="h-5 w-5" />,
        // },
        // {
        //     href: '/settings/commenteded-posts',
        //     label: 'Postingan Dikomentari',
        //     icon: <MessageSquare className="h-5 w-5" />,
        // },
        {
            href: '/settings/donations',
            label: 'Kelola Donasi',
            icon: <Gift className="h-5 w-5" />,
        },
        {
            href: '/settings/forums',
            label: 'Kelola Forum',
            icon: <Users className="h-5 w-5" />,
        },
        {
            href: '/settings/helps',
            label: 'Kelola Butuh Bantuan',
            icon: <HelpCircle className="h-5 w-5" />,
        },
        {
            href: '/settings/events',
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
                    <div className="flex flex-row items-center gap-2 text-left lg:flex-col lg:text-center xl:flex-row xl:text-left">
                        <Avatar className="large-font-size text-light-base h-12 w-12 shrink-0">
                            <AvatarImage src={`/storage/${user.image}`} alt={user.name} className="object-cover" />
                            <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="line-clamp-1 font-semibold">{user.name}</h3>
                            <p className="line-clamp-1 text-sm text-gray-500">{user.email}</p>
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
                                <SheetTrigger asChild className="bg-light-base text-dark-base">
                                    <Button variant="outline" size="icon">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="bg-light-base text-dark-base w-80">
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
