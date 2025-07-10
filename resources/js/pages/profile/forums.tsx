'use client';

import { MessageSquare } from 'lucide-react';

import { PostItem } from '@/components/profile/post-item';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface ForumProps {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail?: string;
    created_at: string;
    updated_at: string;
    forum_category: {
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
    stats: {
        likes: number;
        comments: number;
    };
}

interface ForumsPageProps extends SharedData {
    forums: ForumProps[];
}

export default function ProfileForumsPage() {
    const { forums } = usePage<ForumsPageProps>().props;

    return (
        <Layout>
            <Head title="Kelola Forum" />
            <ProfileLayout>
                <div className="space-y-6">
                    {forums.length === 0 ? (
                        <div className="py-12 text-center">
                            <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="mb-4 text-gray-500">Anda belum membuat forum diskusi apapun</p>
                            <Button asChild>
                                <Link href={route('forum.create')}>Buat Forum Pertama</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {forums.map((forum) => (
                                <PostItem
                                    key={forum.id}
                                    id={forum.id}
                                    title={forum.title}
                                    slug={forum.slug}
                                    description={forum.description}
                                    image={forum.thumbnail}
                                    category={forum.category}
                                    createdAt={forum.createdAt}
                                    type="forum"
                                    stats={{
                                        likes: forum.stats.likes,
                                        comments: forum.stats.comments,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </Layout>
    );
}
