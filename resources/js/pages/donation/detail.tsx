'use client';

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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sooner';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Donation, DonationDetailPageProps, User } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Album, Clock, MapPin, MessageCircle, Phone, Share2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type CreateComment = {
    body: string;
    image?: null;
};

export default function DonationDetail() {
    const { donation, relatedDonations, auth } = usePage<
        DonationDetailPageProps & {
            auth: { user: User | null };
            relatedDonations: Donation[];
        }
    >().props;
    const { data, setData, post, processing, errors, reset } = useForm<CreateComment>({
        body: '',
        image: null,
    });

    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.body.trim()) {
            toast.error('Komentar tidak boleh kosong');
            return;
        }

        post(route('donation.comment.create', donation.slug), {
            onSuccess: () => {
                toast.success('Komentar berhasil ditambahkan');
                reset();
            },
            onError: () => {
                toast.error('Gagal menambahkan komentar');
                reset();
            },
            onFinish: () => {
                reset();
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

            toast.success('Berhasil menyalin link!');
        } catch {
            toast.error('Gagal menyalin link');
        }
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

    return (
        <Layout>
            <Head title={`${donation.title} - Detail Donasi`} />
            <div className="container mx-auto max-w-screen-xl px-4 py-8 md:px-0">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-4 lg:col-span-2">
                        {/* Main Card - Header, Images, Description, Actions */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="text-dark-base font-semibold">
                                            <AvatarImage src={donation.user?.image} />
                                            <AvatarFallback>{donation.user?.name?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h6 className="font-semibold">{donation.user?.name || 'Unknown User'}</h6>
                                            <p className="text-sm text-gray-500">{formatDate(donation.created_at)}</p>
                                        </div>
                                    </div>
                                </div>
                                <CardTitle className="text-2xl">{donation.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Images */}
                                {donation.donation_images && donation.donation_images.length > 0 && (
                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                        {donation.donation_images.map((image, index) => (
                                            <img
                                                key={image.id}
                                                src={`/storage/${image.image}`}
                                                alt={`${donation.title} ${index + 1}`}
                                                className="h-64 w-full rounded-lg object-cover"
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Description */}
                                <div>
                                    <h3 className="mb-3 text-lg font-semibold">Deskripsi</h3>
                                    <p className="leading-relaxed text-gray-700">{donation.description}</p>
                                </div>

                                {/* Actions */}
                                <div className="border-t pt-4">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="flex items-center space-x-4">
                                            <Button variant="ghost" className="hover:bg-transparent hover:text-gray-600">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                {donation.comments?.length || 0}
                                            </Button>
                                            <Button
                                                onClick={handleShare}
                                                type="button"
                                                variant="ghost"
                                                className="hover:bg-transparent hover:text-gray-600"
                                            >
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Bagikan
                                            </Button>
                                        </div>
                                        <a
                                            href={
                                                donation.phone_number
                                                    ? `https://wa.me/${donation.phone_number}`
                                                    : auth.user?.phone_number
                                                      ? `https://wa.me/${auth.user.phone_number}`
                                                      : auth.user?.email
                                                        ? `mailto:${auth.user.email}`
                                                        : '#'
                                            }
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
                                <CardTitle>Komentar ({donation.comments?.length || 0})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="mb-4">
                                    <Textarea
                                        placeholder="Tulis komentar..."
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        disabled={processing}
                                        rows={3}
                                        className="mb-2"
                                    />
                                    {errors.body && <p className="mb-2 text-sm text-red-500">{errors.body}</p>}
                                    <Button
                                        type="submit"
                                        disabled={!data.body.trim() || processing}
                                        className="text-light-base bg-blue-600 hover:bg-blue-700"
                                    >
                                        Kirim Komentar
                                    </Button>
                                </form>

                                <div className="space-y-4">
                                    {donation.comments && donation.comments.length > 0 ? (
                                        donation.comments.map((comment) => (
                                            <div key={comment.id} className="flex space-x-3">
                                                <Avatar className="text-dark-base h-8 w-8">
                                                    <AvatarImage src={comment.user?.image} />
                                                    <AvatarFallback>{comment.user?.name?.[0] || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="rounded-lg bg-gray-50">
                                                        <div className="mb-1 flex items-center space-x-2">
                                                            <span className="text-sm font-medium">{comment.user?.name || 'Unknown User'}</span>
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
                    <div className="space-y-4">
                        {/* Details */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Detail {donation.type === 'donation' ? 'Donasi' : 'Permintaan'}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <Album className="mt-0.5 h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Kategori</p>
                                        <p className="text-sm">
                                            {donation.donation_category?.name || donation.donation_category?.name || 'Tidak ada kategori'}
                                        </p>
                                    </div>
                                </div>
                                {donation.address && (
                                    <div className="flex items-start space-x-2">
                                        <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Alamat</p>
                                            <p className="text-sm">{donation.address}</p>
                                        </div>
                                    </div>
                                )}
                                {donation.phone_number && (
                                    <div className="flex items-start space-x-2">
                                        <Phone className="mt-0.5 h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Telepon</p>
                                            <p className="text-sm">{donation.phone_number}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start space-x-2">
                                    <Clock className="mt-0.5 h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Dibuat</p>
                                        <p className="text-sm">{formatDate(donation.created_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Posts */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Postingan Teratas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {relatedDonations.map((donation) => (
                                        <div
                                            key={donation.id}
                                            className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-sm"
                                        >
                                            <Link href={route('donation.donate.view', donation.slug)}>
                                                <h4 className="mb-1 line-clamp-2 text-sm font-medium transition-colors hover:text-green-600">
                                                    {donation.title}
                                                </h4>
                                            </Link>
                                            <p className="text-xs text-gray-500">{donation.user.name}</p>
                                            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                                                <span>{donation.donation_category.name}</span>
                                                <span>{formatDate(donation.created_at)}</span>
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
                        <AlertDialogCancel className="text-dark-base">Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => commentToDelete && handleDeleteComment(commentToDelete)}
                            className="text-light-base bg-red-500 hover:bg-red-600"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Toaster />
        </Layout>
    );
}
