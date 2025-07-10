import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sooner';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Camera, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type CreateForumForm = {
    title: string;
    description: string;
    forum_category_id: number;
    thumbnail: File | null;
};

type ForumCategory = {
    id: number;
    name: string;
    slug: string;
};

export default function CreateForumPage({ forumCategories }: { forumCategories: ForumCategory[] }) {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm<CreateForumForm>({
        title: '',
        description: '',
        forum_category_id: 0,
        thumbnail: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi client-side
        if (!data.title.trim()) {
            return;
        }
        if (!data.description.trim()) {
            return;
        }

        post(route('forum.store'), {
            onSuccess: () => {
                reset();
                localStorage.removeItem('forum_draft');
                setThumbnailPreview(null);
                toast.success('Forum berhasil dibuat!');
            },
            onError: () => {
                console.error('Error creating forum:', errors);
                toast.error('Gagal membuat forum. Silakan coba lagi.');
            },
        });
    };

    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            // Validasi file
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

            if (!allowedTypes.includes(file.type)) {
                alert('Format file tidak didukung. Gunakan JPG, PNG, atau WebP');
                return;
            }

            if (file.size > maxSize) {
                alert('Ukuran file terlalu besar. Maksimal 5MB');
                return;
            }

            // Bersihkan preview sebelumnya jika ada
            if (thumbnailPreview) {
                URL.revokeObjectURL(thumbnailPreview);
            }

            // Buat preview dan update state
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

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const saveForDraft = () => {
        localStorage.setItem('forum_draft', JSON.stringify(data));

        toast('Draft forum berhasil disimpan!');
    };

    useEffect(() => {
        const draftKey = 'forum_draft';
        const draft = localStorage.getItem(draftKey);

        if (draft) {
            const parsedDraft = JSON.parse(draft);
            setData({
                title: parsedDraft.title || '',
                description: parsedDraft.description || '',
                forum_category_id: parsedDraft.forum_category_id || 1,
                thumbnail: parsedDraft.thumbnail || null, // We won't restore the file directly
            });

            if (parsedDraft.thumbnailPreview) {
                setThumbnailPreview(parsedDraft.thumbnailPreview);
            }
        }
    }, [setData]);

    // Cleanup function untuk mencegah memory leak
    useEffect(() => {
        return () => {
            if (thumbnailPreview) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview]);

    return (
        <Layout>
            <Head title="Buat Forum Diskusi" />
            <section className="section-padding-x pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    <div className="mb-6 flex items-center">
                        <Link
                            href="/"
                            className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <h1 className="text-2xl font-bold">Buat Forum Diskusi</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card className="bg-white text-gray-900">
                            <CardHeader>
                                <CardTitle>Informasi Forum</CardTitle>
                                <CardDescription>
                                    Buat forum diskusi untuk berbagi ide, pengalaman, atau pertanyaan dengan komunitas PeduliRasa
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Judul Forum */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className={errors.title ? 'text-red-600' : ''}>
                                        Judul Forum *
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        disabled={processing}
                                        placeholder="Contoh: Tips Menyimpan Makanan Agar Tahan Lama"
                                        className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Kategori Forum */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className={errors.forum_category_id ? 'text-red-600' : ''}>
                                        Kategori Forum *
                                    </Label>
                                    <Select disabled={processing} onValueChange={(value) => setData('forum_category_id', Number.parseInt(value))}>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Pilih kategori forum" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-gray-900">
                                            {forumCategories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.forum_category_id && <p className="text-sm text-red-600">{errors.forum_category_id}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description" className={errors.description ? 'text-red-600' : ''}>
                                        Konten Forum *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        disabled={processing}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Tulis konten forum Anda di sini. Berikan informasi yang jelas dan lengkap untuk memulai diskusi yang bermanfaat."
                                        rows={8}
                                        className={errors.description ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Upload Thumbnail */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Thumbnail Forum *</Label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleThumbnailUpload}
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        className="hidden"
                                    />
                                    <div className="flex gap-4">
                                        {thumbnailPreview ? (
                                            <div className="relative aspect-video w-64 overflow-hidden rounded-lg border bg-gray-100">
                                                <img src={thumbnailPreview} alt="Thumbnail Forum" className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveThumbnail}
                                                    disabled={processing}
                                                    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleAddThumbnail}
                                                disabled={processing}
                                                className="flex aspect-video w-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <div className="flex flex-col items-center space-y-2">
                                                    <Camera className="h-8 w-8 text-gray-400" />
                                                    <span className="text-sm text-gray-500">Tambah Thumbnail</span>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Tambahkan thumbnail untuk memperjelas konten forum Anda (Format: JPG, PNG, WebP | Maksimal: 5MB)
                                    </p>
                                    {errors.thumbnail && <p className="text-sm text-red-600">{errors.thumbnail}</p>}
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
                                <Button type="button" variant="outline" className="w-full" onClick={saveForDraft}>
                                    Simpan sebagai Draft
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </section>
            <Toaster />
        </Layout>
    );
}
