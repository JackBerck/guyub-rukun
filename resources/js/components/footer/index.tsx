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
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
                    {/* Brand & Logo */}
                    <div className="mb-6 md:mb-0 flex flex-col gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/bagiin.webp" className="h-10 w-10" alt="PeduliRasa Logo" />
                            <span className="text-2xl font-bold whitespace-nowrap text-dark-base">
                                <span className="text-green-base">Peduli</span>
                                <span className="text-blue-base">Rasa</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 max-w-xs mt-2">
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()}{' '}
                        <Link href="https://instagram.com/zakidzlfkr_" className="hover:underline font-semibold text-emerald-600">
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