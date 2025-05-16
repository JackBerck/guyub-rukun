import { Link } from '@inertiajs/react';
import { NavigationItem } from '@/types';

interface FooterLinkProps {
    title: string;
    links: NavigationItem[];
}

export default function FooterLink({ title, links }: FooterLinkProps) {
    return (
        <div>
            <h6 className="mb-2 font-semibold uppercase">{title}</h6>
            <ul className="text-gray-500 font-medium flex flex-col gap-1">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.path} className="hover:underline">
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}