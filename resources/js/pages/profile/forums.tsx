'use client';

import { Link, Plus } from 'lucide-react';
import { useState } from 'react';

import { PostItem } from '@/components/profile/post-item';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { Head } from '@inertiajs/react';

export default function ProfileForumsPage() {
    const [forums, setForums] = useState([
        {
            id: 1,
            title: 'Tips Menyimpan Makanan Agar Tahan Lama',
            description:
                'Berbagi tips dan trik untuk menyimpan makanan agar tidak mudah basi dan tahan lama. Mari diskusikan cara-cara efektif untuk mengurangi pemborosan makanan.',
            image: '/img/posts/restoran.jpg',
            category: 'Tips & Trik',
            createdAt: '1 hari yang lalu',
        },
        {
            id: 2,
            title: 'Diskusi: Cara Efektif Berbagi Makanan di Komunitas',
            description:
                'Mari kita diskusikan cara-cara yang paling efektif untuk berbagi makanan di komunitas kita. Apa saja tantangan yang sering dihadapi?',
            image: '/img/posts/rumah-makan.jpg',
            category: 'Diskusi Umum',
            createdAt: '3 hari yang lalu',
        },
        {
            id: 3,
            title: 'Resep Makanan Bergizi dengan Bahan Sederhana',
            description:
                'Sharing resep makanan bergizi yang bisa dibuat dengan bahan-bahan sederhana dan mudah didapat. Cocok untuk keluarga dengan budget terbatas.',
            image: '/img/posts/komunitas.jpeg',
            category: 'Resep Makanan',
            createdAt: '1 minggu yang lalu',
        },
    ]);

    const handleEdit = (id: number) => {
        // Navigate to edit page
        window.location.href = `/forums/${id}/edit`;
    };

    const handleDelete = (id: number) => {
        setForums(forums.filter((forum) => forum.id !== id));
    };

    return (
        <Layout>
            <Head title="Kelola Forum" />
            <ProfileLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Kelola Forum</h1>
                            <p className="text-gray-600">Kelola semua forum diskusi yang telah Anda buat</p>
                        </div>
                        <Button asChild className="gap-2">
                            <Link href="/forums/create">
                                <Plus className="h-4 w-4" />
                                Buat Forum
                            </Link>
                        </Button>
                    </div>

                    {forums.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="mb-4 text-gray-500">Anda belum membuat forum diskusi apapun</p>
                            <Button asChild>
                                <Link href="/forums/create">Buat Forum Pertama</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {forums.map((forum) => (
                                <PostItem key={forum.id} {...forum} type="forum" onEdit={handleEdit} onDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </Layout>
    );
}
