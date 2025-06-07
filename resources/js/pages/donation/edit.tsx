'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Donation } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, MapPin } from 'lucide-react';

type CreateDonationForm = {
    title: string;
    description: string;
    phone_number: string;
    address: string;
    status: boolean;
    type: string;
    is_popular: boolean;
    donation_category_id: number;
};

type DonationCategory = {
    id: number;
    name: string;
    slug: string;
};

export default function EditDonationPage({ donation, donationCategories }: { donation: Donation; donationCategories: DonationCategory[] }) {
    const { data, setData, put, processing, errors, reset } = useForm<CreateDonationForm>({
        title: donation.title || '',
        description: donation.description || '',
        phone_number: donation.phone_number || '',
        address: donation.address || '',
        status: Boolean(donation.status),
        type: 'donation',
        is_popular: donation.is_popular || false,
        donation_category_id: donation.donation_category_id || 0,
    });
    const title = donation.title || 'Edit Donasi';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('donation.donate.update', donation.slug), {
            onSuccess: () => {
                reset();
                localStorage.removeItem('donation_draft');
            },
        });
    };

    const cancelChanges = () => {
        router.get(route('profile.donations'));
    };

    return (
        <Layout>
            <Head title={`Edit ${title}`} />
            <section className="section-padding-x pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    <div className="mb-6 flex items-center">
                        <Link href="/" className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <h1 className="text-2xl font-bold line-clamp-2">Edit {title}</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card className="bg-light-base text-gray-900">
                            <CardHeader>
                                <CardTitle>Informasi Donasi</CardTitle>
                                <CardDescription>Berikan informasi lengkap tentang donasi yang ingin Anda bagikan</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Judul Donasi */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Donasi</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData({ ...data, title: e.target.value })}
                                        disabled={processing}
                                        placeholder="Contoh: Makanan Siap Saji untuk 10 Orang"
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Kategori */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori</Label>
                                    <Select
                                        value={String(data.donation_category_id)}
                                        disabled={processing}
                                        onValueChange={(value) => setData({ ...data, donation_category_id: Number.parseInt(value) })}
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Pilih kategori donasi" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-gray-900">
                                            {donationCategories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.donation_category_id && <p className="text-sm text-red-600">{errors.donation_category_id}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        disabled={processing}
                                        onChange={(e) => setData({ ...data, description: e.target.value })}
                                        placeholder="Berikan deskripsi lengkap tentang donasi Anda, termasuk jenis makanan, jumlah, dan informasi penting lainnya"
                                        rows={5}
                                    />
                                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Lokasi */}
                                <div className="space-y-2">
                                    <Label htmlFor="address">Lokasi</Label>
                                    <div className="relative">
                                        <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData({ ...data, address: e.target.value })}
                                            disabled={processing}
                                            className="pl-10"
                                            placeholder="Masukkan lokasi pengambilan donasi"
                                        />
                                    </div>
                                    {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                                </div>

                                {/* Nomor Telepon */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone_number">Nomor Telepon (Opsional)</Label>
                                    <Input
                                        id="phone_number"
                                        value={data.phone_number}
                                        onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                                        disabled={processing}
                                        type="tel"
                                        placeholder="Masukkan nomor telepon untuk kontak"
                                    />
                                    <p className="text-xs text-gray-500">Jika diisi, nomor telepon akan ditampilkan pada halaman donasi</p>
                                    {errors.phone_number && <p className="text-sm text-red-600">{errors.phone_number}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="text-light-base w-full bg-emerald-600 py-4 hover:bg-emerald-700"
                                >
                                    {processing ? 'Memproses...' : 'Edit Donasi'}
                                </Button>
                                <Button disabled={processing} type="button" variant="destructive" className="text-light-base w-full" onClick={cancelChanges}>
                                    Batalkan Perubahan
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
