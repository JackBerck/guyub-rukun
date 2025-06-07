'use client';

import { Calendar } from 'lucide-react';

import { PostItem } from '@/components/profile/post-item';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface AffairProps {
    id: number;
    title: string;
    slug: string;
    description: string;
    date: string;
    time: string;
    location: string;
    thumbnail?: string;
    created_at: string;
    updated_at: string;
    affair_category: {
        id: number;
        name: string;
        slug: string;
        created_at: string;
        updated_at: string;
    };
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
    image?: string;
    category: string;
    createdAt: string;
}

interface AffairsPageProps extends SharedData {
    affairs: AffairProps[];
}

export default function ProfileAffairsPage() {
    const { affairs } = usePage<AffairsPageProps>().props;

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

                    {affairs.length === 0 ? (
                        <div className="py-12 text-center">
                            <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="mb-4 text-gray-500">Anda belum membuat acara apapun</p>
                            <Button asChild>
                                <Link href={route('affair.create')}>Buat Acara Pertama</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {affairs.map((affair) => (
                                <PostItem
                                    key={affair.id}
                                    id={affair.id}
                                    title={affair.title}
                                    slug={affair.slug}
                                    description={affair.description}
                                    image={affair.thumbnail}
                                    location={affair.location}
                                    category={affair.category}
                                    date={affair.date}
                                    time={affair.time}
                                    createdAt={affair.createdAt}
                                    type="affair"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </Layout>
    );
}
