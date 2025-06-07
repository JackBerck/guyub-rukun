'use client';

import { Package } from 'lucide-react';

import { PostItem } from '@/components/profile/post-item';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { Head, Link, usePage } from '@inertiajs/react';

interface DonationProps {
    id: number;
    title: string;
    slug: string;
    description: string;
    urgency: string | undefined;
    phone_number: string;
    address: string;
    status: number;
    type: 'donation' | 'request';
    is_popular: number;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        phone_number: string | null;
        image: string | null;
        address: string | null;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
    };
    image: string;
    category: string;
    location: string;
    createdAt: string;
}

type DonationsProps = {
    donations: DonationProps[];
};

export default function ProfileDonationsPage() {
    const { donations } = usePage<DonationsProps>().props;

    return (
        <Layout>
            <Head title="Kelola Donasi" />
            <ProfileLayout>
                <div className="space-y-6">
                    {donations.length === 0 ? (
                        <div className="py-12 text-center">
                            <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="mb-4 text-gray-500">Anda belum membuat donasi atau permintaan bantuan apapun</p>
                            <div className="flex justify-center gap-2">
                                <Button asChild>
                                    <Link href="/donate">Buat Donasi</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {donations.map((donation) => (
                                <PostItem
                                    key={donation.id}
                                    id={donation.id}
                                    title={donation.title}
                                    slug={donation.slug}
                                    description={donation.description}
                                    image={donation.image}
                                    location={donation.address}
                                    category={donation.category}
                                    urgency={donation.urgency}
                                    createdAt={donation.created_at}
                                    type={donation.type as 'donation' | 'request'}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </Layout>
    );
}
