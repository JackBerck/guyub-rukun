'use client';

import { Clock, Heart, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface CommentedPostPageProps extends PageProps {
    id: number;
    type: 'forum' | 'donation' | 'request' | 'affair';
    title: string;
    slug: string;
    description: string;
    image?: string | null;
    category: string;
    location?: string | null;
    urgency?: string | null;
    author: string;
    createdAt: string; // contoh: "2 jam yang lalu"
    commentedAt: string; // contoh: "1 menit yang lalu"
    myComment: string;
    stats: {
        likes: number;
        comments: number;
        shares: number;
    };
}

export default function ProfileCommentedPage() {
    const { commentedPosts = [] } = usePage<{ commentedPosts: CommentedPostPageProps[] }>().props;

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            Sembako: 'bg-orange-100 text-orange-800',
            'Tips & Trik': 'bg-blue-100 text-blue-800',
            'Diskusi Umum': 'bg-green-100 text-green-800',
            Makanan: 'bg-emerald-100 text-emerald-800',
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const getTypeColor = (postType: string) => {
        switch (postType) {
            case 'donation':
                return 'bg-emerald-100 text-emerald-800';
            case 'request':
                return 'bg-orange-100 text-orange-800';
            case 'forum':
                return 'bg-blue-100 text-blue-800';
            case 'affair':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getDetailLink = (post: CommentedPostPageProps) => {
        switch (post.type) {
            case 'donation':
                return `/donation/${post.slug}`;
            case 'request':
                return `/help/${post.slug}`;
            case 'forum':
                return `/forum/${post.slug}`;
            case 'affair':
                return `/affair/${post.slug}`;
            default:
                return '#';
        }
    };

    return (
        <Layout>
            <Head title="Postingan Dikomentari" />
            <ProfileLayout>
                <div className="space-y-6">
                    {/* <div>
                        <h1 className="text-2xl font-bold">Postingan yang Dikomentari</h1>
                        <p className="text-gray-600">Daftar semua postingan yang telah Anda komentari</p>
                    </div> */}

                    {commentedPosts.length === 0 ? (
                        <div className="py-12 text-center">
                            <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-500">Anda belum mengomentari postingan apapun</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {commentedPosts.map((post) => (
                                <Card key={post.id} className="bg-light-base text-dark-base transition-shadow hover:shadow-md">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-3">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeColor(post.type)}`}
                                                    >
                                                        {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(post.category)}`}
                                                    >
                                                        {post.category}
                                                    </span>
                                                </div>
                                                <Link href={getDetailLink(post)} className="text-lg font-semibold hover:underline">
                                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{post.title}</h3>
                                                </Link>
                                            </div>
                                            <div className="flex-1 text-right text-xs text-gray-400">Dikomentari {post.commentedAt}</div>
                                        </div>
                                        <div className="extra-small-font-size flex items-center gap-4 text-gray-500">
                                            <span>oleh {post.author}</span>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{post.createdAt}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {post.image && (
                                                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                                                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                                                </div>
                                            )}
                                            <p className="line-clamp-3 text-sm text-gray-600">{post.description}</p>

                                            {/* My Comment */}
                                            <div className="rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 p-3">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                                                    <span className="text-sm font-medium text-emerald-700">Komentar Anda:</span>
                                                </div>
                                                <p className="text-sm text-gray-700">{post.myComment}</p>
                                            </div>

                                            <div className="flex items-center justify-between border-t pt-2">
                                                <div className="flex items-center gap-4">
                                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500">
                                                        <Heart className="h-4 w-4" />
                                                        <span>{post.stats.likes}</span>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="gap-1 text-blue-500">
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
