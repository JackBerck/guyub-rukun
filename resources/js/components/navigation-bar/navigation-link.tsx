import { Link } from "@inertiajs/react";

interface NavigationLinkProps {
    children: React.ReactNode;
    url: string;
    addClass?: string;
}

export default function NavigationLink({ children, url, addClass }: NavigationLinkProps) {
    return (
        <li>
            <Link href={url} className={`block rounded ${addClass}`}>
                {children}
            </Link>
        </li>
    );
}