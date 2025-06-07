import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Donation } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2, MapPin } from 'lucide-react';

type EditRequestForm = {
    title: string;
    slug?: string; // Optional for edit, required for create
    description: string;
    urgency: string;
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

export default function EditRequestPage({ help, donationCategories }: { help: Donation; donationCategories: DonationCategory[] }) {
    const { data, setData, put, processing, errors, reset } = useForm<EditRequestForm>({
        title: help.title || '',
        slug: help.slug || '', // Include slug for edit
        description: help.description || '',
        urgency: help.urgency || 'low',
        phone_number: help.phone_number || '',
        address: help.address || '',
        status: Boolean(help.status),
        type: 'request',
        is_popular: help.is_popular || false,
        donation_category_id: help.donation_category_id || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Submitting request with data:', data);

        put(route('donation.help.update', data.slug), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const cancelChanges = () => {
        router.get(route('profile.helps'));
    };

    console.log(data)

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
                                    <Select disabled={processing} value={String(data.donation_category_id)} onValueChange={(value) => setData('donation_category_id', parseInt(value))}>
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
                                        'Perbarui Permintaan'
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="text-light-base w-full"
                                    onClick={cancelChanges}
                                    disabled={processing}
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
