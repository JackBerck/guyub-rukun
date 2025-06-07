'use client';

import { Clock, Heart, MapPin, MessageSquare, Share2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { Head } from '@inertiajs/react';

export default function ProfileLikedPage() {
    const [likedPosts] = useState([
        {
            id: 1,
            title: 'Makanan Siap Saji untuk 10 Orang',
            description:
                'Kami memiliki makanan catering yang tersisa dari acara kantor. Masih layak konsumsi dan bisa diambil hari ini sebelum jam 8 malam.',
            image: '/img/posts/restoran.jpg',
            location: 'Jakarta Selatan',
            category: 'Makanan',
            urgency: 'mendesak',
            author: 'Rumah Makan Sejahtera',
            createdAt: '2 jam yang lalu',
            likedAt: '1 jam yang lalu',
            stats: { likes: 24, comments: 5, shares: 12 },
        },
        {
            id: 2,
            title: 'Tips Menyimpan Makanan Agar Tahan Lama',
            description:
                'Berbagi tips dan trik untuk menyimpan makanan agar tidak mudah basi dan tahan lama. Mari diskusikan cara-cara efektif untuk mengurangi pemborosan makanan.',
            image: '/img/posts/komunitas.jpeg',
            category: 'Tips & Trik',
            author: 'Ahmad Nutritionist',
            createdAt: '1 hari yang lalu',
            likedAt: '1 hari yang lalu',
            stats: { likes: 45, comments: 12, shares: 8 },
        },
        {
            id: 3,
            title: 'Jumat Berkah: Berbagi Makanan di Pasar Minggu',
            description:
                'Acara berbagi makanan gratis untuk masyarakat kurang mampu di sekitar Pasar Minggu. Mari bergabung untuk berbagi kebahagiaan.',
            image: '/img/posts/rumah-makan.jpg',
            location: 'Pasar Minggu, Jakarta Selatan',
            category: 'Berbagi Makanan',
            author: 'Komunitas Peduli',
            createdAt: '2 hari yang lalu',
            likedAt: '2 hari yang lalu',
            stats: { likes: 67, comments: 23, shares: 15 },
        },
    ]);

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            Makanan: 'bg-emerald-100 text-emerald-800',
            'Tips & Trik': 'bg-blue-100 text-blue-800',
            'Berbagi Makanan': 'bg-purple-100 text-purple-800',
            Sembako: 'bg-orange-100 text-orange-800',
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const getUrgencyColor = (urgency?: string) => {
        switch (urgency) {
            case 'mendesak':
                return 'bg-red-100 text-red-800';
            case 'sedang':
                return 'bg-yellow-100 text-yellow-800';
            case 'rendah':
                return 'bg-green-100 text-green-800';
            default:
                return '';
        }
    };

    return (
        <Layout>
            <Head title="Postingan Disukai" />
            <ProfileLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">Postingan yang Disukai</h1>
                        <p className="text-gray-600">Daftar semua postingan yang telah Anda sukai</p>
                    </div>

                    {likedPosts.length === 0 ? (
                        <div className="py-12 text-center">
                            <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-500">Anda belum menyukai postingan apapun</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
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
                                                    {post.urgency && (
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getUrgencyColor(post.urgency)}`}
                                                        >
                                                            {post.urgency}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
                                            </div>
                                            <div className="text-xs text-gray-400 flex-1">Disukai {post.likedAt}</div>
                                        </div>
                                        <div className="flex items-center gap-4 extra-small-font-size text-gray-500">
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
                                                    <img
                                                        src={post.image || '/placeholder.svg'}
                                                        alt={post.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <p className="text-sm text-gray-600">{post.description}</p>
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
                                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500">
                                                        <Share2 className="h-4 w-4" />
                                                        <span>{post.stats.shares}</span>
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
