'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { PostItem } from '@/components/profile/post-item';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { Head, Link } from '@inertiajs/react';

export default function ProfileRequestsPage() {
    const [requests, setRequests] = useState([
        {
            id: 1,
            title: 'Butuh Bantuan Makanan untuk 5 Keluarga',
            description:
                'Kami membutuhkan bantuan makanan untuk 5 keluarga yang terdampak bencana banjir. Bantuan berupa sembako atau makanan siap saji sangat dibutuhkan.',
            image: '/img/posts/restoran.jpg',
            location: 'Jakarta Timur',
            category: 'Makanan',
            urgency: 'mendesak',
            createdAt: '1 hari yang lalu',
        },
        {
            id: 2,
            title: 'Permintaan Bantuan Sembako untuk Panti Asuhan',
            description:
                'Panti asuhan kami membutuhkan bantuan sembako untuk 30 anak asuh. Jika ada yang ingin menyumbangkan sembako, mohon hubungi kami.',
            image: '/img/posts/komunitas.jpeg',
            location: 'Bogor',
            category: 'Sembako',
            urgency: 'sedang',
            createdAt: '3 hari yang lalu',
        },
        {
            id: 3,
            title: 'Butuh Bantuan Makanan untuk Lansia',
            description:
                'Komunitas kami membutuhkan bantuan makanan untuk para lansia yang tinggal sendiri di daerah kami. Bantuan berupa makanan bergizi sangat dibutuhkan.',
            image: '/img/posts/rumah-makan.jpg',
            location: 'Depok',
            category: 'Makanan',
            urgency: 'sedang',
            createdAt: '1 minggu yang lalu',
        },
    ]);

    const handleEdit = (id: number) => {
        // Navigate to edit page
        window.location.href = `/requests/${id}/edit`;
    };

    const handleDelete = (id: number) => {
        setRequests(requests.filter((request) => request.id !== id));
    };

    return (
        <Layout>
            <Head title="Kelola Butuh Bantuan" />
            <ProfileLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Kelola Butuh Bantuan</h1>
                            <p className="text-gray-600">Kelola semua permintaan bantuan yang telah Anda buat</p>
                        </div>
                        <Button asChild className="gap-2">
                            <Link href="/requests/create">
                                <Plus className="h-4 w-4" />
                                Buat Permintaan
                            </Link>
                        </Button>
                    </div>

                    {requests.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="mb-4 text-gray-500">Anda belum membuat permintaan bantuan apapun</p>
                            <Button asChild>
                                <Link href="/requests/create">Buat Permintaan Pertama</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {requests.map((request) => (
                                <PostItem key={request.id} {...request} type="request" onEdit={handleEdit} onDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </Layout>
    );
}
