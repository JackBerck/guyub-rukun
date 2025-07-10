'use client';

import { CircleHelp } from 'lucide-react';

import { PostItem } from '@/components/profile/post-item';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface RequestProps {
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
    // Additional UI data
    image: string;
    category: string;
    location: string;
    createdAt: string;
}

interface RequestsPageProps extends SharedData {
    requests: RequestProps[];
}

export default function ProfileRequetsPage() {
    const { requests } = usePage<RequestsPageProps>().props;

    return (
        <Layout>
            <Head title="Kelola Acara" />
            <ProfileLayout>
                <div className="space-y-6">
                    {/* <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Kelola Acara</h1>
                            <p className="text-gray-600">Kelola semua acara yang telah Anda buat</p>
                        </div>
                        <Button asChild className="gap-2 bg-purple-600 hover:bg-purple-700">
                            <Link href={route('affair.create')}>
                                <Plus className="h-4 w-4" />
                                Buat Acara
                            </Link>
                        </Button>
                    </div> */}

                    {requests.length === 0 ? (
                        <div className="py-12 text-center">
                            <CircleHelp className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="mb-4 text-gray-500">Anda belum membuat permintaan apapun</p>
                            <Button asChild>
                                <Link href={route('affair.create')}>Buat Permintaan Pertama</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {requests.map((request) => (
                                <PostItem
                                    key={request.id}
                                    id={request.id}
                                    title={request.title}
                                    slug={request.slug}
                                    description={request.description}
                                    image={request.image}
                                    location={request.location}
                                    category={request.category}
                                    createdAt={request.createdAt}
                                    urgency={request.urgency}
                                    type="request"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </Layout>
    );
}
