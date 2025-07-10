'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sooner';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Camera, MapPin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type CreateDonationForm = {
    title: string;
    description: string;
    phone_number: string;
    address: string;
    status: boolean;
    type: string;
    is_popular: boolean;
    donation_category_id: number;
    images: File[];
};

type DonationCategory = {
    id: number;
    name: string;
    slug: string;
};

export default function CreateDonationPage({ donationCategories }: { donationCategories: DonationCategory[] }) {
    const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm<CreateDonationForm>({
        title: '',
        description: '',
        phone_number: '',
        address: '',
        status: false,
        type: 'donation',
        is_popular: false,
        donation_category_id: 0,
        images: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('donation.donate.store'), {
            onSuccess: () => {
                reset();
                setImagesPreviews([]);
                localStorage.removeItem('donation_draft');
            },
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const newImages = [...data.images, ...newFiles];

            // Create URL previews for the new images
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setImagesPreviews([...imagesPreviews, ...newPreviews]);

            setData({ ...data, images: newImages });
        }
    };

    const handleAddImage = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = (index: number) => {
        URL.revokeObjectURL(imagesPreviews[index]);

        const newPreviews = [...imagesPreviews];
        newPreviews.splice(index, 1);
        setImagesPreviews(newPreviews);

        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData({ ...data, images: newImages });
    };

    const saveForDraft = () => {
        // Create a draft object without the File objects (since they can't be serialized)
        const draftData = {
            title: data.title,
            description: data.description,
            phone_number: data.phone_number,
            address: data.address,
            status: data.status,
            type: data.type,
            is_popular: data.is_popular,
            donation_category_id: data.donation_category_id,
            // Don't save images as they can't be serialized to localStorage
        };

        localStorage.setItem('donation_draft', JSON.stringify(draftData));
        toast('Donasi berhasil disimpan sebagai draft');
    };

    useEffect(() => {
        const draftKey = 'donation_draft';
        const draft = localStorage.getItem(draftKey);

        if (draft) {
            try {
                const parsedDraft = JSON.parse(draft);
                setData({
                    title: parsedDraft.title || '',
                    description: parsedDraft.description || '',
                    phone_number: parsedDraft.phone_number || '',
                    address: parsedDraft.address || '',
                    status: parsedDraft.status || false,
                    type: parsedDraft.type || 'donation',
                    is_popular: parsedDraft.is_popular || false,
                    donation_category_id: parsedDraft.donation_category_id || 0,
                    images: [], // Reset images since they can't be restored from localStorage
                });

                // Reset image previews as well
                setImagesPreviews([]);

                // Show a message that images need to be re-uploaded
                if (parsedDraft.title || parsedDraft.description) {
                    toast('Draft berhasil dimuat. Silakan upload ulang foto jika diperlukan.');
                }
            } catch (error) {
                console.error('Error parsing draft:', error);
                localStorage.removeItem(draftKey);
            }
        }
    }, [setData]);

    return (
        <Layout>
            <Head title="Tambah Donasi" />
            <Toaster />
            <section className="section-padding-x pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    <div className="mb-6 flex items-center">
                        <Link href="/" className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <h1 className="text-2xl font-bold">Tambah Donasi Baru</h1>
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
                                        disabled={processing}
                                        value={data.donation_category_id > 0 ? String(data.donation_category_id) : undefined}
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

                                {/* Upload Gambar */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Foto Donasi</Label>
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple accept="image/*" className="hidden" />
                                    <div className="grid grid-cols-3 gap-4">
                                        {imagesPreviews.map((imageUrl, index) => (
                                            <div key={index} className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                                                <img src={imageUrl} alt={`Donasi ${index + 1}`} className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={handleAddImage}
                                            className="flex aspect-square items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <Camera className="h-6 w-6 text-gray-400" />
                                                <span className="text-xs text-gray-500">Tambah Foto</span>
                                            </div>
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">Tambahkan foto donasi untuk memudahkan penerima mengenali donasi Anda</p>
                                    {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="text-light-base w-full bg-emerald-600 py-4 hover:bg-emerald-700"
                                >
                                    {processing ? 'Memproses...' : 'Publikasikan Donasi'}
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
