'use client';

import { Calendar, Camera, Edit, Mail, MapPin, Phone } from 'lucide-react';
import { useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/layout';
import { ProfileLayout } from '@/layouts/profile-layout';
import { SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

interface ProfilePageProps extends SharedData {
    mustVerifyEmail: boolean;
    status?: string;
    currentUser: {
        donations_count?: number;
        forums_count?: number;
        affairs_count?: number;
        requests_count?: number;
    };
}

export default function ProfilePage() {
    const { auth, mustVerifyEmail, status, currentUser } = usePage<ProfilePageProps>().props;
    const user = auth.user;

    const [isEditing, setIsEditing] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Inertia form for handling profile updates
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        address: user?.address || '',
    });

    // Handle profile form submission
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        patch(route('profile.update'), {
            onSuccess: () => {
                setIsEditing(false);
                toast.success('Profil berhasil diperbarui');
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
                toast.error('Gagal memperbarui profil');
            },
        });
    };

    // Handle photo upload
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Ukuran file maksimal 2MB');
            return;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Format file harus jpeg, png, jpg, atau gif');
            return;
        }

        setIsUploadingImage(true);

        // Create form data for file upload
        const formData = new FormData();
        formData.append('image', file);

        // Use router.post for file upload
        router.post(route('profile.update.image'), formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Foto profil berhasil diperbarui');
                setIsUploadingImage(false);
            },
            onError: (errors) => {
                console.error('Photo upload errors:', errors);
                toast.error('Gagal mengunggah foto profil');
                setIsUploadingImage(false);
            },
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

    const formatJoinDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            month: 'long',
            year: 'numeric',
        });
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (!user) {
        return (
            <Layout>
                <Head title="Profil Saya" />
                <div className="flex min-h-screen items-center justify-center">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head title="Profil Saya" />
            <ProfileLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Kelola Profil</h1>
                            <p className="text-gray-600">Kelola informasi profil dan pengaturan akun Anda</p>
                        </div>
                        {!isEditing && (
                            <Button onClick={() => setIsEditing(true)} className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Profil
                            </Button>
                        )}
                    </div>

                    {/* Success Message */}
                    {status && <div className="rounded border border-green-400 bg-green-100 p-4 text-green-700">{status}</div>}

                    <Card className="bg-light-base text-dark-base shadow-none">
                        <CardHeader>
                            <CardTitle>Informasi Profil</CardTitle>
                            <CardDescription>Informasi dasar tentang akun Anda</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Profile Picture */}
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="h-20 w-20 overflow-hidden rounded-full bg-emerald-100">
                                        <Avatar className="text-light-base large-font-size h-full w-full shrink-0">
                                            <AvatarImage src={user.image ? `/storage/${user.image}` : '/placeholder.svg'} alt={user.name} />
                                            <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    {/* Camera overlay button */}
                                    <Button
                                        size="sm"
                                        className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full bg-emerald-600 p-0 hover:bg-emerald-700"
                                        onClick={triggerFileInput}
                                        disabled={isUploadingImage}
                                    >
                                        <Camera className="h-3 w-3 text-white" />
                                    </Button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Button
                                        size="sm"
                                        className="text-light-base bg-purple-600 hover:bg-purple-700"
                                        onClick={triggerFileInput}
                                        disabled={isUploadingImage}
                                    >
                                        {isUploadingImage ? 'Mengunggah...' : 'Ganti Foto'}
                                    </Button>
                                    <p className="text-xs text-gray-500">JPG, PNG, GIF hingga 2MB</p>
                                </div>

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Form Fields */}
                            <form onSubmit={handleSave}>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Lengkap</Label>
                                        {isEditing ? (
                                            <div>
                                                <Input
                                                    placeholder="Masukkan nama lengkap Anda"
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className={errors.name ? 'border-red-500' : ''}
                                                />
                                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-900">{user.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        {isEditing ? (
                                            <div>
                                                <Input
                                                    placeholder="Masukkan email Anda"
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className={errors.email ? 'border-red-500' : ''}
                                                />
                                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                                {mustVerifyEmail && !user.email_verified_at && (
                                                    <p className="mt-1 text-sm text-yellow-600">Email belum diverifikasi</p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <p className="text-sm text-gray-900">{user.email}</p>
                                                {user.email_verified_at && (
                                                    <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">Terverifikasi</span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone_number">Nomor Telepon</Label>
                                        {isEditing ? (
                                            <div>
                                                <Input
                                                    placeholder="Masukkan nomor telepon Anda"
                                                    id="phone_number"
                                                    value={data.phone_number}
                                                    onChange={(e) => setData('phone_number', e.target.value)}
                                                    className={errors.phone_number ? 'border-red-500' : ''}
                                                />
                                                {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <p className="text-sm text-gray-900">{user.phone_number || 'Belum diisi'}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Alamat</Label>
                                        {isEditing ? (
                                            <div>
                                                <Input
                                                    placeholder="Masukkan alamat Anda"
                                                    id="address"
                                                    value={data.address}
                                                    onChange={(e) => setData('address', e.target.value)}
                                                    className={errors.address ? 'border-red-500' : ''}
                                                />
                                                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <p className="text-sm text-gray-900">{user.address || 'Belum diisi'}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <Label>Bergabung Sejak</Label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <p className="text-sm text-gray-900">{formatJoinDate(user.created_at)}</p>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex gap-2 pt-4">
                                        <Button type="submit" disabled={processing} className="text-light-base bg-emerald-600 hover:bg-emerald-700">
                                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={processing}
                                            className="text-light-base bg-red-600 hover:bg-red-700"
                                        >
                                            Batal
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Card>

                    {/* Statistics - You can fetch this from API later */}
                    <Card className="bg-light-base text-dark-base shadow-none">
                        <CardHeader>
                            <CardTitle>Statistik Aktivitas</CardTitle>
                            <CardDescription>Ringkasan aktivitas Anda di PeduliRasa</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="text-center">
                                    {currentUser?.donations_count || 0 > 0 ? (
                                        <div className="text-2xl font-bold text-gray-900">{currentUser?.donations_count}</div>
                                    ) : (
                                        <div className="text-2xl font-bold text-emerald-600">-</div>
                                    )}
                                    <div className="text-sm text-gray-500">Donasi</div>
                                </div>
                                <div className="text-center">
                                    {currentUser?.forums_count || 0 > 0 ? (
                                        <div className="text-2xl font-bold text-gray-900">{currentUser?.forums_count}</div>
                                    ) : (
                                        <div className="text-2xl font-bold text-blue-600">-</div>
                                    )}
                                    <div className="text-sm text-gray-500">Forum</div>
                                </div>
                                <div className="text-center">
                                    {currentUser?.affairs_count || 0 > 0 ? (
                                        <div className="text-2xl font-bold text-gray-900">{currentUser?.affairs_count}</div>
                                    ) : (
                                        <div className="text-2xl font-bold text-purple-600">-</div>
                                    )}
                                    <div className="text-sm text-gray-500">Acara</div>
                                </div>
                                <div className="text-center">
                                    {
                                        currentUser?.requests_count || 0 > 0 ? (
                                            <div className="text-2xl font-bold text-gray-900">{currentUser?.requests_count}</div>
                                        ) : (
                                            <div className="text-2xl font-bold text-orange-600">-</div>
                                        )
                                    }
                                    <div className="text-sm text-gray-500">Bantuan</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ProfileLayout>
        </Layout>
    );
}
