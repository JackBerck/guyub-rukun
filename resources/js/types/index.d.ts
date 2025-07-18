import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

declare global {
    interface Window {
        Echo: Echo;
        // Pusher: any; // Assuming Pusher is globally available
    }
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone_number?: string;
    image?: string;
    address?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

// User with nested relations for profile page
export interface UserProfile extends User {
    donations: Donation[];
    forums: Forum[];
    affairs: Affair[];
}

export interface NavigationItem {
    title: string;
    path: string;
}

// Perbaikan struktur Donation sesuai dengan database
export interface Donation {
    id: number;
    title: string;
    slug: string;
    description: string;
    urgency?: string; // untuk request
    phone_number?: string;
    address: string;
    deadline?: string; // untuk request
    status: number;
    type: string; // 'donation' atau 'request'
    is_popular: boolean;
    user_id: number;
    donation_category_id: number;
    created_at: string;
    updated_at: string;
    // Relations
    user: User;
    donation_category: DonationCategory;
    donation_images: DonationImage[];
    comments: Comment[];
    comments_count?: number; // Tambahkan jumlah komentar
}

export interface DonationCategory {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface DonationImage {
    id: number;
    image: string; // Ganti dari 'image' ke 'path' sesuai dengan database
    donation_id: number;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    body: string; // Ganti dari 'body' ke 'content'
    image?: string;
    user_id: number;
    donation_id: number;
    created_at: string;
    updated_at: string;
    user: User; // Tambahkan relasi user
}

// PageProps untuk halaman detail donation
export interface DonationDetailPageProps {
    donation: Donation;
    comments: Comment[];
    donation_category: DonationCategory;
    donation_images: DonationImage[];
    user: User;
    relatedDonations?: Donation[];
    [key: string]: unknown;
}

// Forum interface
export interface Forum {
    id: number;
    title: string;
    slug: string;
    description: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    comments: Comment[];
    thumbnail?: string; // Ganti dari 'image' ke 'thumbnail' sesuai dengan database
    forum_category: ForumCategory;
    liked_by_users_count?: number;
    comments_count?: number;
    user: User; // Relasi dengan User
}

// PageProps untuk halaman detail forum
export interface ForumDetailPageProps {
    forum: Forum;
    relatedForums?: Forum[];
    forumIsLiked?: boolean;
    [key: string]: unknown;
}

export interface AffairCategory {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface Affair {
    id: number;
    title: string;
    slug: string;
    description: string;
    date: string; // Tanggal kejadian
    time: string; // Waktu kejadian
    location: string; // Lokasi kejadian
    user_id: number;
    created_at: string;
    updated_at: string;
    thumbnail?: string; // Ganti dari 'image' ke 'thumbnail' sesuai dengan database
    affair_category: AffairCategory;
    affair_category_id?: number;
    user: User; // Relasi dengan User
}

export interface AffairDetailPageProps {
    affair: Affair;
    relatedAffairs?: Affair[];
    [key: string]: unknown;
}

// PageProps umum
export interface PageProps {
    user: User;
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface ForumCategory {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}
