import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Camera, Loader2, MapPin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';

type CreateRequestForm = {
    title: string;
    description: string;
    urgency: string;
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

export default function CreateRequestPage({ donationCategories }: { donationCategories: DonationCategory[] }) {
    const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm<CreateRequestForm>({
        title: '',
        description: '',
        urgency: 'low',
        phone_number: '',
        address: '',
        status: false,
        type: 'request',
        is_popular: false,
        donation_category_id: 0,
        images: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Submitting request with data:', data);

        post(route('donation.help.store'), {
            onSuccess: () => {
                reset();
                setImagesPreviews([]);
                localStorage.removeItem('request_draft');
            },
            onError: () => {
                console.error('Error submitting request:', errors);
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
        // Create a draft object without the File objects (since they can't be serialized)
        const draftData = {
            title: data.title,
            description: data.description,
            urgency: data.urgency,
            phone_number: data.phone_number,
            address: data.address,
            status: data.status,
            type: data.type,
            is_popular: data.is_popular,
            donation_category_id: data.donation_category_id,
            // Don't save images as they can't be serialized to localStorage
        };

        localStorage.setItem('request_draft', JSON.stringify(draftData));
        toast('Permintaan berhasil disimpan sebagai draft');
    };

    useEffect(() => {
        const draftKey = 'request_draft';
        const draft = localStorage.getItem(draftKey);

        if (draft) {
            try {
                const parsedDraft = JSON.parse(draft);
                setData({
                    title: parsedDraft.title || '',
                    description: parsedDraft.description || '',
                    urgency: parsedDraft.urgency || 'low',
                    phone_number: parsedDraft.phone_number || '',
                    address: parsedDraft.address || '',
                    status: parsedDraft.status || false,
                    type: parsedDraft.type || 'request',
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

    const clearDraft = () => {
        localStorage.removeItem('request_draft');
        reset();
        setImagesPreviews([]);
        toast('Draft berhasil dihapus!');
    };

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
            <Toaster />
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
                                    <Label htmlFor="category">Kategori *</Label>
                                    <Select
                                        disabled={processing}
                                        value={data.donation_category_id > 0 ? String(data.donation_category_id) : undefined}
                                        onValueChange={(value) => setData('donation_category_id', parseInt(value))}
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Pilih kategori bantuan" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-gray-900">
                                            {donationCategories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.donation_category_id && <p className="text-sm text-red-600">{errors.donation_category_id}</p>}
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

                                    <div className="flex flex-wrap gap-4">
                                        <div
                                            className={`flex cursor-pointer items-center space-x-2 rounded-lg border-2 p-3 transition-all ${
                                                data.urgency === 'high' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
                                            }`}
                                            onClick={() => !processing && setData('urgency', 'high')}
                                        >
                                            <div
                                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                                                    data.urgency === 'high' ? 'border-red-500 bg-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                {data.urgency === 'high' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                                            </div>
                                            <Label className="cursor-pointer font-medium text-red-600">Mendesak</Label>
                                        </div>

                                        <div
                                            className={`flex cursor-pointer items-center space-x-2 rounded-lg border-2 p-3 transition-all ${
                                                data.urgency === 'medium'
                                                    ? 'border-yellow-500 bg-yellow-50'
                                                    : 'border-gray-200 hover:border-yellow-300'
                                            }`}
                                            onClick={() => !processing && setData('urgency', 'medium')}
                                        >
                                            <div
                                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                                                    data.urgency === 'medium' ? 'border-yellow-500 bg-yellow-500' : 'border-gray-300'
                                                }`}
                                            >
                                                {data.urgency === 'medium' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                                            </div>
                                            <Label className="cursor-pointer font-medium text-yellow-600">Sedang</Label>
                                        </div>

                                        <div
                                            className={`flex cursor-pointer items-center space-x-2 rounded-lg border-2 p-3 transition-all ${
                                                data.urgency === 'low' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                                            }`}
                                            onClick={() => !processing && setData('urgency', 'low')}
                                        >
                                            <div
                                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                                                    data.urgency === 'low' ? 'border-green-500 bg-green-500' : 'border-gray-300'
                                                }`}
                                            >
                                                {data.urgency === 'low' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                                            </div>
                                            <Label className="cursor-pointer font-medium text-green-600">Rendah</Label>
                                        </div>
                                    </div>
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

                                {/* Nomor Telepon */}
                                <div className="space-y-2">
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
                                    className="text-light-base w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
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
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={saveForDraft}
                                    disabled={processing}
                                >
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
