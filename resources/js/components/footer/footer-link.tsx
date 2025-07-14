import { NavigationItem } from '@/types';
import { Link } from '@inertiajs/react';

interface FooterLinkProps {
    title: string;
    links: NavigationItem[];
}

export default function FooterLink({ title, links }: FooterLinkProps) {
    return (
        <div>
            <h6 className="text-dark-base mb-3 text-base font-semibold tracking-wide">{title}</h6>
            <ul className="flex flex-col gap-1">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.path}
                            className="text-sm text-gray-500 transition-colors duration-150 hover:text-emerald-600"
                            target={link.path.startsWith('http') ? '_blank' : undefined}
                            rel={link.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
