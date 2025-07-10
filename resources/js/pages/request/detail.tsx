'use client';

import { ImageGallery } from '@/components/image-gallery';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { DonationDetailPageProps, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { AlertTriangle, Clock, MapPin, MessageCircle, Phone, Share2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const relatedRequests = [
    {
        id: 2,
        title: 'Bantuan Makanan untuk Panti Asuhan',
        user: { name: 'Panti Asuhan Harapan' },
        category: { name: 'Makanan Anak' },
        urgency: 'medium',
        created_at: '2024-02-09T10:00:00Z',
    },
    {
        id: 3,
        title: 'Makanan untuk Lansia di Panti Jompo',
        user: { name: 'Panti Jompo Sejahtera' },
        category: { name: 'Makanan Khusus' },
        urgency: 'low',
        created_at: '2024-02-09T14:00:00Z',
    },
];

type CreateComment = {
    body: string;
    image?: null;
};

export default function RequestDetail() {
    const { donation, auth } = usePage<DonationDetailPageProps & { auth: { user: User | null } }>().props;
    const { data, setData, post, processing, errors, reset } = useForm<CreateComment>({
        body: '',
        image: null,
    });

    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

    // ✅ Satu handler untuk submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi jika komentar kosong
        if (!data.body.trim()) {
            toast.error('Komentar tidak boleh kosong');
            return;
        }

        post(route('donation.comment.create', donation.slug), {
            onSuccess: () => {
                toast.success('Komentar berhasil dikirim');
                reset();
            },
            onError: (errors) => {
                console.error('Comment errors:', errors);
                toast.error('Gagal mengirim komentar');
            },
        });
    };

    const handleShare = async () => {
        const currentUrl = window.location.href;

        try {
            // Modern browsers
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(currentUrl);
            } else {
                // Fallback for older browsers or non-HTTPS
                const textArea = document.createElement('textarea');
                textArea.value = currentUrl;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            toast.success('Berhasil menyalin link!', {
                description: 'Link bantuan telah disalin ke clipboard',
                duration: 3000,
            });
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error('Gagal menyalin link', {
                description: 'Silakan coba lagi',
                duration: 3000,
            });
        }
    };

    const handleDeleteComment = (commentId: number) => {
        router.delete(route('donation.comment.delete', [commentId]), {
            onSuccess: () => {
                toast.success('Komentar berhasil dihapus');
                setCommentToDelete(null);
            },
            onError: () => {
                toast.error('Gagal menghapus komentar');
                setCommentToDelete(null);
            },
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getUrgencyBadge = (urgency: string) => {
        const urgencyMap = {
            low: { label: 'Rendah', variant: 'secondary' as const },
            medium: { label: 'Sedang', variant: 'default' as const },
            high: { label: 'Tinggi', variant: 'destructive' as const },
        };
        return urgencyMap[urgency as keyof typeof urgencyMap] || urgencyMap.low;
    };

    return (
        <Layout>
            <Head title={`${donation.title} - Detail Bantuan`} />
            <div className="container mx-auto max-w-screen-xl py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Main Card - Header, Images, Description, Actions */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarImage src={donation.user?.image || '/placeholder.svg'} />
                                            <AvatarFallback className="text-light-base">{donation.user?.name?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h6 className="font-semibold">{donation.user?.name || 'Unknown User'}</h6>
                                            <p className="text-sm text-gray-500">{formatDate(donation.created_at)}</p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="default"
                                        className={`text-light-base capitalize ${donation.urgency === 'high' ? 'bg-red-500' : donation.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                                    >
                                        <AlertTriangle className="mr-1 h-3 w-3" />
                                        {donation.urgency === 'high' ? 'Tinggi' : donation.urgency === 'medium' ? 'Sedang' : 'Rendah'}
                                    </Badge>
                                </div>
                                <CardTitle className="text-2xl">{donation.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Images */}
                                <ImageGallery images={donation.donation_images} title={donation.title} />

                                {/* Description */}
                                <div>
                                    <h3 className="mb-3 text-lg font-semibold">Deskripsi Kebutuhan</h3>
                                    <p className="leading-relaxed text-gray-700">{donation.description}</p>
                                </div>

                                {/* Actions */}
                                <div className="border-t pt-4">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Button variant="ghost" className="hover:bg-transparent hover:text-gray-600">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                {donation.comments?.length || 0}
                                            </Button>
                                            <Button onClick={handleShare} variant="ghost" className="hover:bg-transparent hover:text-gray-600">
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Bagikan
                                            </Button>
                                        </div>
                                        <a
                                            href={donation.phone_number ? `https://wa.me/${donation.phone_number}` : '#'}
                                            className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-green-base text-light-base inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-green-600 hover:text-white focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                                            target="_blank"
                                        >
                                            {donation.type === 'donation' ? 'Hubungi Donatur' : 'Bantu Sekarang'}
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Komentar & Penawaran ({donation.comments?.length || 0})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* ✅ Form dengan satu handler saja */}
                                <form onSubmit={handleSubmit} className="mb-4">
                                    <Textarea
                                        placeholder="Tulis komentar atau tawarkan bantuan..."
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        rows={3}
                                        disabled={processing}
                                        className="mb-2"
                                    />
                                    {errors.body && <p className="mb-2 text-sm text-red-500">{errors.body}</p>}
                                    <div className="flex space-x-2">
                                        {/* ✅ Button type="submit" untuk trigger form submit */}
                                        <Button
                                            type="submit"
                                            disabled={!data.body.trim() || processing}
                                            className="text-light-base bg-blue-600 hover:bg-blue-700"
                                        >
                                            {processing ? 'Mengirim...' : 'Kirim Komentar'}
                                        </Button>
                                    </div>
                                </form>

                                <div className="space-y-4">
                                    {donation.comments && donation.comments.length > 0 ? (
                                        donation.comments.map((comment) => (
                                            <div key={comment.id} className="relative flex space-x-3">
                                                <Avatar className="text-light-base h-8 w-8">
                                                    <AvatarImage src={comment.user.image || '/placeholder.svg'} />
                                                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="rounded-lg bg-gray-50">
                                                        <div className="mb-1 flex items-center space-x-2">
                                                            <span className="text-sm font-medium">{comment.user.name}</span>
                                                            <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                                                        </div>
                                                        <p className="text-sm">{comment.body}</p>
                                                    </div>
                                                </div>
                                                {auth.user?.id === comment.user.id && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:bg-red-50 hover:text-red-700"
                                                        onClick={() => setCommentToDelete(comment.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-4 text-center text-gray-500">Belum ada komentar</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Detail Permintaan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Kategori</p>
                                    <p className="text-sm">{donation.donation_category?.name || 'Tidak ada kategori'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Tingkat Urgensi</p>
                                    <Badge
                                        variant="default"
                                        className={`text-light-base capitalize ${donation.urgency === 'high' ? 'bg-red-500' : donation.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                                    >
                                        <AlertTriangle className="mr-1 h-3 w-3" />
                                        {donation.urgency === 'high' ? 'Tinggi' : donation.urgency === 'medium' ? 'Sedang' : 'Rendah'}
                                    </Badge>
                                </div>
                                {donation.address && (
                                    <div className="flex items-start space-x-2">
                                        <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Alamat</p>
                                            <p className="text-sm">{donation.address}</p>
                                        </div>
                                    </div>
                                )}
                                {donation.phone_number && (
                                    <div className="flex items-start space-x-2">
                                        <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Telepon</p>
                                            <p className="text-sm">{donation.phone_number}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start space-x-2">
                                    <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Dibuat</p>
                                        <p className="text-sm">{formatDate(donation.created_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Kontak Peminta</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 text-center">
                                    <Avatar className="text-light-base mx-auto mb-2 h-16 w-16">
                                        <AvatarImage src={donation.user?.image || '/placeholder.svg'} />
                                        <AvatarFallback>{donation.user?.name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <h6 className="font-semibold">{donation.user?.name || 'Unknown User'}</h6>
                                    <p className="text-sm text-gray-500">{donation.user?.email || 'Email tidak tersedia'}</p>
                                </div>
                                <div className="space-y-2">
                                    {donation.phone_number && (
                                        <Button variant="outline" size="sm" className="bg-light-base text-dark-base w-full hover:bg-gray-50">
                                            <Phone className="mr-2 h-4 w-4" />
                                            Telepon
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Requests */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Permintaan Terkait</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {relatedRequests.map((request) => (
                                        <div
                                            key={request.id}
                                            className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-sm"
                                        >
                                            <h4 className="mb-1 line-clamp-2 text-sm font-medium transition-colors hover:text-green-600">
                                                {request.title}
                                            </h4>
                                            <p className="text-xs text-gray-500">{request.user.name}</p>
                                            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                                                <span>{request.category.name}</span>
                                                <Badge variant={getUrgencyBadge(request.urgency).variant} className="text-xs">
                                                    {getUrgencyBadge(request.urgency).label}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <AlertDialog open={commentToDelete !== null} onOpenChange={() => setCommentToDelete(null)}>
                <AlertDialogContent className="bg-light-base text-dark-base">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Komentar</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus komentar ini? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="text-light-base">Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => commentToDelete && handleDeleteComment(commentToDelete)}
                            className="bg-red-500 text-white hover:bg-red-600"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Layout>
    );
}
