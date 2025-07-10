'use client';

import { Clock, Heart, MapPin, MessageSquare, Share2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { Head } from '@inertiajs/react';

export default function ProfileCommentedPage() {
    const [commentedPosts] = useState([
        {
            id: 1,
            title: 'Sembako untuk Keluarga Terdampak',
            description:
                'Kami menyediakan paket sembako berisi beras 5kg, minyak goreng 2L, gula 1kg, dan kebutuhan pokok lainnya untuk keluarga yang membutuhkan.',
            image: '/img/posts/rumah-makan.jpg',
            location: 'Bandung',
            category: 'Sembako',
            author: 'Toko Sembako Barokah',
            createdAt: '5 jam yang lalu',
            commentedAt: '3 jam yang lalu',
            myComment: 'Terima kasih sudah berbagi! Apakah masih tersedia untuk hari ini?',
            stats: { likes: 42, comments: 7, shares: 15 },
        },
        {
            id: 2,
            title: 'Tips Menyimpan Makanan Agar Tahan Lama',
            description:
                'Berbagi tips dan trik untuk menyimpan makanan agar tidak mudah basi dan tahan lama. Mari diskusikan cara-cara efektif untuk mengurangi pemborosan makanan.',
            image: '/img/posts/cerita-inspiratif.jpg',
            category: 'Tips & Trik',
            author: 'Ahmad Nutritionist',
            createdAt: '1 hari yang lalu',
            commentedAt: '1 hari yang lalu',
            myComment: 'Tips yang sangat bermanfaat! Saya sudah coba metode penyimpanan sayuran di kulkas dan hasilnya bagus.',
            stats: { likes: 45, comments: 12, shares: 8 },
        },
        {
            id: 3,
            title: 'Diskusi: Cara Efektif Berbagi Makanan di Komunitas',
            description:
                'Mari kita diskusikan cara-cara yang paling efektif untuk berbagi makanan di komunitas kita. Apa saja tantangan yang sering dihadapi?',
            category: 'Diskusi Umum',
            author: 'Komunitas Berbagi',
            createdAt: '2 hari yang lalu',
            commentedAt: '2 hari yang lalu',
            myComment: 'Menurut saya, koordinasi yang baik antar anggota komunitas adalah kunci utama. Perlu ada sistem yang jelas untuk distribusi.',
            stats: { likes: 38, comments: 15, shares: 6 },
        },
    ]);

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            Sembako: 'bg-orange-100 text-orange-800',
            'Tips & Trik': 'bg-blue-100 text-blue-800',
            'Diskusi Umum': 'bg-green-100 text-green-800',
            Makanan: 'bg-emerald-100 text-emerald-800',
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <Layout>
            <Head title="Postingan Dikomentari" />
            <ProfileLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">Postingan yang Dikomentari</h1>
                        <p className="text-gray-600">Daftar semua postingan yang telah Anda komentari</p>
                    </div>

                    {commentedPosts.length === 0 ? (
                        <div className="py-12 text-center">
                            <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-500">Anda belum mengomentari postingan apapun</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {commentedPosts.map((post) => (
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
                                                <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
                                            </div>
                                            <div className="flex-1 text-xs text-gray-400">Dikomentari {post.commentedAt}</div>
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
                                            <p className="text-sm text-gray-600">{post.description}</p>

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
