'use client';

import type React from 'react';

import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Affair } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';

type CreateAffairForm = {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    affair_category_id: number;
};

type AffairCategory = {
    id: number;
    name: string;
    slug: string;
};

export default function EditAffairPage({ affair, affairCategories }: { affair: Affair; affairCategories: AffairCategory[] }) {
    const { data, setData, put, processing, errors, reset } = useForm<CreateAffairForm>({
        title: affair.title || '',
        description: affair.description || '',
        date: affair.date || '',
        time: affair.time ? affair.time.slice(0, 5) : '',
        location: affair.location || '',
        affair_category_id: affair.affair_category_id || 1,
    });
    const title = affair.title || 'Edit Acara';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('affair.update', affair.slug), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const cancelChanges = () => {
        router.get(route('profile.affairs'));
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
                        <h1 className="text-2xl font-bold">Edit {title}</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card className="bg-white text-gray-900">
                            <CardHeader>
                                <CardTitle>Informasi Acara</CardTitle>
                                <CardDescription>Berikan informasi lengkap tentang acara yang ingin Anda adakan</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Judul Acara */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Acara *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData({ ...data, title: e.target.value })}
                                        disabled={processing}
                                        placeholder="Contoh: Jumat Berkah: Berbagi Makanan di Pasar Minggu"
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Kategori Acara */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori Acara *</Label>
                                    <Select
                                        value={String(data.affair_category_id)}
                                        disabled={processing}
                                        onValueChange={(value) => setData({ ...data, affair_category_id: Number.parseInt(value) })}
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Pilih kategori acara" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-gray-900">
                                            {affairCategories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.affair_category_id && <p className="text-sm text-red-600">{errors.affair_category_id}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Deskripsi Acara *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        disabled={processing}
                                        onChange={(e) => setData({ ...data, description: e.target.value })}
                                        placeholder="Jelaskan secara detail tentang acara yang akan diadakan, termasuk tujuan, kegiatan, dan manfaat yang akan didapatkan peserta"
                                        rows={5}
                                    />
                                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Tanggal Acara */}
                                <div className="space-y-2">
                                    <Label htmlFor="date" className={errors.date ? 'text-red-600' : ''}>
                                        Tanggal Acara *
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="date"
                                            type="date"
                                            value={data.date ? new Date(data.date).toISOString().split('T')[0] : ''}
                                            onChange={(e) => {
                                                const selectedDate = e.target.value;
                                                // Convert to Y-m-d format for Laravel
                                                setData('date', selectedDate);
                                            }}
                                            disabled={processing}
                                            className={`pl-10 ${errors.date ? 'border-red-500 focus:border-red-500' : ''}`}
                                            min={new Date().toISOString().split('T')[0]} // Tidak bisa pilih tanggal lampau
                                        />
                                    </div>
                                    {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
                                </div>

                                {/* Waktu Acara */}
                                <div className="space-y-2">
                                    <Label htmlFor="time" className={errors.time ? 'text-red-600' : ''}>
                                        Waktu Acara *
                                    </Label>
                                    <div className="relative">
                                        <Clock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="time"
                                            type="time"
                                            value={data.time}
                                            onChange={(e) => setData('time', e.target.value)}
                                            disabled={processing}
                                            className={`pl-10 ${errors.time ? 'border-red-500 focus:border-red-500' : ''}`}
                                        />
                                    </div>
                                    {errors.time && <p className="text-sm text-red-600">{errors.time}</p>}
                                </div>

                                {/* Lokasi */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="location">Lokasi Acara *</Label>
                                    <div className="relative">
                                        <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData({ ...data, location: e.target.value })}
                                            disabled={processing}
                                            className="pl-10"
                                            placeholder="Masukkan lokasi acara"
                                        />
                                    </div>
                                    {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Button type="submit" disabled={processing} className="text-light-base w-full bg-emerald-600 hover:bg-emerald-700">
                                    {processing ? 'Memproses...' : 'Perbarui Acara'}
                                </Button>
                                <Button
                                    disabled={processing}
                                    type="button"
                                    variant="destructive"
                                    className="text-light-base w-full"
                                    onClick={cancelChanges}
                                >
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
