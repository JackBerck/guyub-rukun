'use client';

import { Clock, Heart, MapPin, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface LikedPostPageProps extends PageProps {
    likedPosts: Array<{
        id: number;
        title: string;
        slug: string;
        description: string;
        category: string;
        urgency?: string;
        image?: string;
        author: string;
        createdAt: string;
        likedAt: string;
        location?: string;
        stats: {
            likes: number;
            comments: number;
        };
    }>;
}

export default function ProfileLikedPage() {
    const { likedPosts } = usePage<LikedPostPageProps>().props;

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            Tips: 'bg-emerald-100 text-emerald-800',
            'Tips & Trik': 'bg-blue-100 text-blue-800',
            'Berbagi Makanan': 'bg-purple-100 text-purple-800',
            Berita: 'bg-orange-100 text-orange-800',
            Event: 'bg-yellow-100 text-yellow-800',
            Tutorial: 'bg-pink-100 text-pink-800',
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    console.log('Liked Posts:', likedPosts);

    return (
        <Layout>
            <Head title="Forum Disukai" />
            <ProfileLayout>
                <div className="space-y-6">
                    {/* <div>
                        <h1 className="text-2xl font-bold">Forum yang Disukai</h1>
                        <p className="text-gray-600">Daftar semua forum yang telah Anda sukai</p>
                    </div> */}

                    {likedPosts.length === 0 ? (
                        <div className="py-12 text-center">
                            <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-500">Anda belum menyukai forum apapun</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {likedPosts.map((post) => (
                                <Card key={post.id} className="bg-light-base text-dark-base transition-shadow hover:shadow-md">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-3">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(post.category)}`}
                                                    >
                                                        {post.category}
                                                    </span>
                                                </div>
                                                <Link href={route('forum.view', post.slug)} className="text-lg font-semibold hover:underline">
                                                <h3 className="line-clamp-2 mb-2 text-lg font-semibold">{post.title}</h3>
                                                </Link>
                                            </div>
                                            <div className="flex-1 text-right text-xs text-gray-400">Disukai {post.likedAt}</div>
                                        </div>
                                        <div className="extra-small-font-size flex items-center gap-4 text-gray-500">
                                            <span>oleh {post.author}</span>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{post.createdAt}</span>
                                            </div>
                                            {post.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{post.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {post.image && (
                                                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                                                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                                                </div>
                                            )}
                                            <p className="text-sm text-gray-600 line-clamp-3">{post.description}</p>
                                            <div className="flex items-center justify-between border-t pt-2">
                                                <div className="flex items-center gap-4">
                                                    <Button variant="ghost" size="sm" className="gap-1 text-red-500">
                                                        <Heart className="h-4 w-4 fill-current" />
                                                        <span>{post.stats.likes}</span>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500">
                                                        <MessageSquare className="h-4 w-4" />
                                                        <span>{post.stats.comments}</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </Layout>
    );
}
