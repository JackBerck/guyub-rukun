'use client';

import type React from 'react';

import { ArrowLeft, Calendar, Camera, Clock, MapPin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

type CreateAffairForm = {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    affair_category_id: number;
    thumbnail: File | null;
};

type AffairCategory = {
    id: number;
    name: string;
    slug: string;
};

export default function CreateEventPage({ affairCategories }: { affairCategories: AffairCategory[] }) {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm<CreateAffairForm>({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        affair_category_id: 1,
        thumbnail: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.title.trim()) {
            alert('Judul acara wajib diisi');
            return;
        }
        if (!data.description.trim()) {
            alert('Deskripsi acara wajib diisi');
            return;
        }
        if (!data.date) {
            alert('Tanggal acara wajib diisi');
            return;
        }
        if (!data.time) {
            alert('Waktu acara wajib diisi');
            return;
        }
        if (!data.location.trim()) {
            alert('Lokasi acara wajib diisi');
            return;
        }

        post(route('affair.store'), {
            onSuccess: () => {
                reset();
                localStorage.removeItem('affair_draft');
                setThumbnailPreview(null);
                toast.success('Acara berhasil dibuat! Anda dapat melihatnya di daftar acara.');
            },
            onError: () => {
                toast.error('Gagal membuat acara. Periksa kembali data yang Anda masukkan.');
            },
        });
    };

    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const maxSize = 5 * 1024 * 1024;
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

            if (!allowedTypes.includes(file.type)) {
                alert('Format file tidak didukung. Gunakan JPG, PNG, atau WebP');
                return;
            }

            if (file.size > maxSize) {
                alert('Ukuran file terlalu besar. Maksimal 5MB');
                return;
            }

            if (thumbnailPreview) {
                URL.revokeObjectURL(thumbnailPreview);
            }

            const preview = URL.createObjectURL(file);
            setThumbnailPreview(preview);
            setData('thumbnail', file);
        }
    };

    const handleAddThumbnail = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveThumbnail = () => {
        if (thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview);
        }
        setThumbnailPreview(null);
        setData('thumbnail', null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const saveForDraft = () => {
        localStorage.setItem('affair_draft', JSON.stringify(data));

        alert('Acara berhasil disimpan sebagai draft');
    };

    useEffect(() => {
        const draftKey = 'affair_draft';
        const draft = localStorage.getItem(draftKey);

        if (draft) {
            const parsedDraft = JSON.parse(draft);
            setData({
                title: parsedDraft.title || '',
                description: parsedDraft.description || '',
                date: parsedDraft.date || '',
                time: parsedDraft.time || '',
                location: parsedDraft.location || '',
                affair_category_id: parsedDraft.affair_category_id || 1,
                thumbnail: null,
            });

            if (parsedDraft.thumbnailPreview) {
                setThumbnailPreview(parsedDraft.thumbnailPreview);
            }
        }
    }, [setData]);

    useEffect(() => {
        return () => {
            if (thumbnailPreview) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview]);

    return (
        <Layout>
            <Head title="Buat Acara Baru" />
            <section className="section-padding-x pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    <div className="mb-6 flex items-center">
                        <Link href="/" className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <h1 className="text-2xl font-bold">Buat Acara Baru</h1>
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
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
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

                                {/* Upload Thumbnail */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Thumbnail Acara *</Label>
                                    <input type="file" ref={fileInputRef} onChange={handleThumbnailUpload} accept="image/*" className="hidden" />
                                    <div className="flex gap-4">
                                        {thumbnailPreview ? (
                                            <div className="relative aspect-video w-64 overflow-hidden rounded-md bg-gray-100">
                                                <img src={thumbnailPreview} alt="Thumbnail Acara" className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveThumbnail}
                                                    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleAddThumbnail}
                                                className="flex aspect-video w-64 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center space-y-2">
                                                    <Camera className="h-8 w-8 text-gray-400" />
                                                    <span className="text-sm text-gray-500">Tambah Thumbnail</span>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Tambahkan thumbnail acara untuk menarik minat peserta (format: JPG, PNG, maksimal 5MB)
                                    </p>
                                    {errors.thumbnail && <p className="text-sm text-red-600">{errors.thumbnail}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Button type="submit" disabled={processing} className="text-light-base w-full bg-emerald-600 hover:bg-emerald-700">
                                    {processing ? 'Memproses...' : 'Publikasikan Acara'}
                                </Button>
                                <Button type="button" variant="outline" className="text-dark-base w-full" onClick={saveForDraft}>
                                    Simpan sebagai Draft
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
