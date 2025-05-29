import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Camera, Clock, Loader2, MapPin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CreateRequestForm = {
    title: string;
    description: string;
    urgency: string;
    phone_number: string;
    address: string;
    deadline: string;
    status: boolean;
    type: string;
    is_popular: boolean;
    request_category_id: number;
    images: File[];
};

export default function CreateRequestPage() {
    const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm<CreateRequestForm>({
        title: '',
        description: '',
        urgency: 'sedang',
        phone_number: '',
        address: '',
        deadline: '',
        status: false,
        type: 'request',
        is_popular: false,
        request_category_id: 1,
        images: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi client-side
        if (!data.title.trim()) {
            alert('Judul permintaan wajib diisi');
            return;
        }
        if (!data.description.trim()) {
            alert('Deskripsi permintaan wajib diisi');
            return;
        }
        if (!data.address.trim()) {
            alert('Lokasi wajib diisi');
            return;
        }
        if (data.request_category_id === 0) {
            alert('Kategori bantuan wajib dipilih');
            return;
        }

        post(route('request.store'), {
            onSuccess: () => {
                reset();
                setImagesPreviews([]);
                // Clear localStorage draft
                localStorage.removeItem('request_draft');
            },
            onError: () => {
                // Error akan ditangani oleh state errors dari useForm
            },
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);

            // Validasi file
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

            for (const file of newFiles) {
                if (!allowedTypes.includes(file.type)) {
                    alert('Format file tidak didukung. Gunakan JPG, PNG, atau WebP');
                    return;
                }

                if (file.size > maxSize) {
                    alert('Ukuran file terlalu besar. Maksimal 5MB per file');
                    return;
                }
            }

            // Batasi maksimal 5 gambar
            const totalImages = data.images.length + newFiles.length;
            if (totalImages > 5) {
                alert('Maksimal 5 gambar yang dapat diunggah');
                return;
            }

            const newImages = [...data.images, ...newFiles];

            // Create URL previews for the new images
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setImagesPreviews([...imagesPreviews, ...newPreviews]);

            setData('images', newImages);
        }
    };

    const handleAddImage = () => {
        if (data.images.length >= 5) {
            alert('Maksimal 5 gambar yang dapat diunggah');
            return;
        }
        fileInputRef.current?.click();
    };

    const handleRemoveImage = (index: number) => {
        // Revoke URL to prevent memory leak
        URL.revokeObjectURL(imagesPreviews[index]);

        const newPreviews = [...imagesPreviews];
        newPreviews.splice(index, 1);
        setImagesPreviews(newPreviews);

        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const saveForDraft = () => {
        const draftData = {
            ...data,
            imagesPreviews: imagesPreviews,
        };
        localStorage.setItem('request_draft', JSON.stringify(draftData));
        alert('Draft permintaan berhasil disimpan!');
    };

    const loadDraft = () => {
        const draftKey = 'request_draft';
        const draft = localStorage.getItem(draftKey);

        if (draft) {
            try {
                const parsedDraft = JSON.parse(draft);
                setData({
                    title: parsedDraft.title || '',
                    description: parsedDraft.description || '',
                    urgency: parsedDraft.urgency || 'sedang',
                    phone_number: parsedDraft.phone_number || '',
                    address: parsedDraft.address || '',
                    deadline: parsedDraft.deadline || '',
                    status: parsedDraft.status || false,
                    type: parsedDraft.type || 'request',
                    is_popular: parsedDraft.is_popular || false,
                    request_category_id: parsedDraft.request_category_id || 1,
                    images: parsedDraft.images || [],
                });

                if (parsedDraft.imagesPreviews) {
                    setImagesPreviews(parsedDraft.imagesPreviews);
                }
            } catch (error) {
                console.error('Error loading draft:', error);
            }
        }
    };

    const clearDraft = () => {
        localStorage.removeItem('request_draft');
        reset();
        setImagesPreviews([]);
        alert('Draft berhasil dihapus!');
    };

    // Load draft on component mount
    useEffect(() => {
        loadDraft();
    }, []);

    // Cleanup function untuk mencegah memory leak
    useEffect(() => {
        return () => {
            imagesPreviews.forEach((url) => {
                URL.revokeObjectURL(url);
            });
        };
    }, []);

    return (
        <Layout>
            <Head title="Buat Permintaan Bantuan" />
            <section className="section-padding-x pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <h1 className="text-2xl font-bold">Buat Permintaan Bantuan</h1>
                        </div>
                        {localStorage.getItem('request_draft') && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={clearDraft}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                                Hapus Draft
                            </Button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card className="bg-white text-gray-900">
                            <CardHeader>
                                <CardTitle>Informasi Permintaan</CardTitle>
                                <CardDescription>Berikan informasi lengkap tentang bantuan yang Anda butuhkan</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Judul Permintaan */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className={errors.title ? 'text-red-600' : ''}>
                                        Judul Permintaan *
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        disabled={processing}
                                        placeholder="Contoh: Butuh Bantuan Makanan untuk 5 Keluarga"
                                        className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Kategori */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className={errors.request_category_id ? 'text-red-600' : ''}>
                                        Kategori *
                                    </Label>
                                    <Select
                                        disabled={processing}
                                        value={data.request_category_id.toString()}
                                        onValueChange={(value) => setData('request_category_id', parseInt(value))}
                                    >
                                        <SelectTrigger id="category" className={errors.request_category_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih kategori bantuan" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-gray-900">
                                            <SelectItem value="1">Makanan</SelectItem>
                                            <SelectItem value="2">Sembako</SelectItem>
                                            <SelectItem value="3">Pakaian</SelectItem>
                                            <SelectItem value="4">Obat-obatan</SelectItem>
                                            <SelectItem value="5">Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.request_category_id && <p className="text-sm text-red-600">{errors.request_category_id}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description" className={errors.description ? 'text-red-600' : ''}>
                                        Deskripsi *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        disabled={processing}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Jelaskan secara detail bantuan yang Anda butuhkan, termasuk jumlah, jenis, dan alasan permintaan"
                                        rows={5}
                                        className={errors.description ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Tingkat Urgensi */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label className={errors.urgency ? 'text-red-600' : ''}>Tingkat Urgensi *</Label>
                                    <RadioGroup
                                        value={data.urgency}
                                        className="flex space-x-4"
                                        disabled={processing}
                                        onValueChange={(value) => setData('urgency', value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="mendesak" id="mendesak" />
                                            <Label htmlFor="mendesak" className="text-red-600">
                                                Mendesak
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="sedang" id="sedang" />
                                            <Label htmlFor="sedang" className="text-yellow-600">
                                                Sedang
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="rendah" id="rendah" />
                                            <Label htmlFor="rendah" className="text-green-600">
                                                Rendah
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                    {errors.urgency && <p className="text-sm text-red-600">{errors.urgency}</p>}
                                </div>

                                {/* Lokasi */}
                                <div className="space-y-2">
                                    <Label htmlFor="address" className={errors.address ? 'text-red-600' : ''}>
                                        Lokasi *
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            disabled={processing}
                                            className={`pl-10 ${errors.address ? 'border-red-500 focus:border-red-500' : ''}`}
                                            placeholder="Masukkan lokasi Anda"
                                        />
                                    </div>
                                    {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                                </div>

                                {/* Batas Waktu */}
                                <div className="space-y-2">
                                    <Label htmlFor="deadline" className={errors.deadline ? 'text-red-600' : ''}>
                                        Batas Waktu
                                    </Label>
                                    <div className="relative">
                                        <Clock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="deadline"
                                            value={data.deadline}
                                            onChange={(e) => setData('deadline', e.target.value)}
                                            disabled={processing}
                                            className={`pl-10 ${errors.deadline ? 'border-red-500 focus:border-red-500' : ''}`}
                                            placeholder="Contoh: Dalam 3 hari ke depan"
                                        />
                                    </div>
                                    {errors.deadline && <p className="text-sm text-red-600">{errors.deadline}</p>}
                                </div>

                                {/* Nomor Telepon */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="phone_number" className={errors.phone_number ? 'text-red-600' : ''}>
                                        Nomor Telepon (Opsional)
                                    </Label>
                                    <Input
                                        id="phone_number"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        disabled={processing}
                                        type="tel"
                                        placeholder="Masukkan nomor telepon untuk kontak"
                                        className={errors.phone_number ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    <p className="text-xs text-gray-500">Jika diisi, nomor telepon akan ditampilkan pada halaman permintaan</p>
                                    {errors.phone_number && <p className="text-sm text-red-600">{errors.phone_number}</p>}
                                </div>

                                {/* Upload Gambar */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Foto Pendukung (Opsional)</Label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        multiple
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        className="hidden"
                                    />
                                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                                        {imagesPreviews.map((imageUrl, index) => (
                                            <div key={index} className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100">
                                                <img src={imageUrl} alt={`Foto ${index + 1}`} className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    disabled={processing}
                                                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                        {imagesPreviews.length < 5 && (
                                            <button
                                                type="button"
                                                onClick={handleAddImage}
                                                disabled={processing}
                                                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <div className="flex flex-col items-center space-y-1">
                                                    <Camera className="h-6 w-6 text-gray-400" />
                                                    <span className="text-xs text-gray-500">Tambah</span>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Tambahkan foto untuk memperjelas permintaan bantuan Anda (Maksimal 5 foto, Format: JPG, PNG, WebP | Maksimal:
                                        5MB per file)
                                    </p>
                                    {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Button
                                    type="submit"
                                    disabled={processing || !data.title.trim() || !data.description.trim() || !data.address.trim()}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-light-base"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        'Publikasikan Permintaan'
                                    )}
                                </Button>
                                <Button type="button" variant="outline" className="w-full text-light-base" onClick={saveForDraft} disabled={processing}>
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
