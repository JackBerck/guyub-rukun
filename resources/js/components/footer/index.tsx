import navigations from '@/data/navigations';
import { NavigationItem } from '@/types';
import { Link } from '@inertiajs/react';
import FooterLink from './footer-link';
import FooterSocialMediaLink from './footer-social-media-link';

const legal: NavigationItem[] = [
    {
        title: 'Terms of Service',
        path: '/terms-of-service',
    },
    {
        title: 'Privacy Policy',
        path: '/privacy-policy',
    },
];

const socialMedia: NavigationItem[] = [
    {
        title: 'Facebook',
        path: 'https://www.facebook.com',
    },
    {
        title: 'Instagram',
        path: 'https://www.instagram.com',
    },
    {
        title: 'Twitter',
        path: 'https://www.twitter.com',
    },
    {
        title: 'Discord',
        path: 'https://www.discord.com',
    },
    {
        title: 'LinkedIn',
        path: 'https://www.linkedin.com',
    },
];

export default function Footer() {
    return (
        <footer id="footer" className="section-padding-x normal-font-size text-light-base bg-dark-base flex items-center justify-center pt-4 pb-4">
            <div className="container max-w-screen-xl py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <img src="/bagiin.webp" className="me-3 h-8" alt="GuyubRukun Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">
                                {' '}
                                <span className="text-green-base">Guyub</span>
                                <span className="text-blue-base">Rukun</span>
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
                        <FooterLink title="Tautan" links={navigations} />
                        <FooterLink title="Ikuti Kami" links={socialMedia} />
                        <FooterLink title="Legal" links={legal} />
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-gray-500 sm:text-center">
                        &copy; {new Date().getFullYear()}{' '}
                        <Link href="https://instagram.com/zakidzlfkr_" className="hover:underline">
                            GuyubRukun&#8482;
                        </Link>
                        . All Rights Reserved.
                    </span>
                    <FooterSocialMediaLink />
                </div>
            </div>
        </footer>
    );
}
