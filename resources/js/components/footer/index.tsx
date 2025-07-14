import navigations from '@/data/navigations';
import { NavigationItem } from '@/types';
import { Link } from '@inertiajs/react';
import FooterLink from './footer-link';
import FooterSocialMediaLink from './footer-social-media-link';

const legal: NavigationItem[] = [
    { title: 'Terms of Service', path: '/terms-of-service' },
    { title: 'Privacy Policy', path: '/privacy-policy' },
];

const socialMedia: NavigationItem[] = [
    { title: 'Facebook', path: 'https://www.facebook.com' },
    { title: 'Instagram', path: 'https://www.instagram.com' },
    { title: 'Twitter', path: 'https://www.twitter.com' },
    { title: 'Discord', path: 'https://www.discord.com' },
    { title: 'LinkedIn', path: 'https://www.linkedin.com' },
];

export default function Footer() {
    return (
        <footer id="footer" className="section-padding-x bg-light-base border-t border-gray-200">
            <div className="container max-w-screen-xl py-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    {/* Brand & Logo */}
                    <div className="mb-6 flex flex-col gap-2 md:mb-0">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/pedulirasa.webp" className="h-10 w-10" alt="PeduliRasa Logo" />
                            <span className="text-dark-base text-2xl font-bold whitespace-nowrap">
                                <span className="text-green-base">Peduli</span>
                                <span className="text-blue-base">Rasa</span>
                            </span>
                        </Link>
                        <p className="mt-2 max-w-xs text-sm text-gray-500">
                            Platform kolaborasi sosial, donasi, forum, dan acara untuk komunitas Indonesia.
                        </p>
                    </div>
                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
                        <FooterLink title="Tautan" links={navigations} />
                        <FooterLink title="Ikuti Kami" links={socialMedia} />
                        <FooterLink title="Legal" links={legal} />
                    </div>
                </div>
                <hr className="my-8 border-gray-200" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()}{' '}
                        <Link href="https://instagram.com/zakidzlfkr_" className="font-semibold text-emerald-600 hover:underline">
                            PeduliRasa&#8482;
                        </Link>
                        . All Rights Reserved.
                    </span>
                    <FooterSocialMediaLink />
                </div>
            </div>
        </footer>
    );
}
