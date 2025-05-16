import { Link } from '@inertiajs/react';

interface ProgramCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function ProgramCard({ title, description, image, link }: ProgramCardProps) {
    return (
        <div className="bg-light-base max-w-sm rounded-lg border border-gray-200 shadow-sm">
            <Link href={link}>
                <img className="rounded-t-md" src={image} alt="" />
            </Link>
            <div className="p-2">
                <Link href={link}>
                    <h3 className="card-title-font-size font-bold tracking-tight text-gray-900">{title}</h3>
                </Link>
                <p className="mb-1 font-normal text-gray-700">{description}</p>
                <Link
                    href={link}
                    className="extra-small-font-size text-light-base inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-center font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                >
                    Lihat detail
                    <svg
                        className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
