'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/layouts/layout';
import { AffairDetailPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Album, Calendar, Clock, MapPin, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AffairDetail() {
    const { affair, relatedAffairs } = usePage<AffairDetailPageProps>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return timeString.slice(0, 5) + ' WIB';
    };

    const formatDateTime = (dateTimeString: string) => {
        return new Date(dateTimeString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
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

    return (
        <Layout>
            <Head title={`${affair.title} - Detail Acara`} />
            <div className="container mx-auto max-w-screen-xl py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Main Card - Header, Thumbnail, Description, Actions */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="text-dark-base font-semibold">
                                            <AvatarImage src={`/storage/${affair.user?.image}`} alt={`Foto ${affair.user?.name}`} />
                                            <AvatarFallback>{affair.user?.name?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <Link href={route('user.detail', affair.user?.id)} className="text-dark-base hover:text-green-600">
                                                <h6 className="font-semibold">{affair.user?.name || 'Unknown User'}</h6>
                                            </Link>
                                            <p className="text-sm text-gray-500">{formatDateTime(affair.created_at)}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="bg-lime-base text-light-base">
                                        {affair.affair_category?.name || 'Tidak ada kategori'}
                                    </Badge>
                                </div>
                                <CardTitle className="text-2xl">{affair.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Thumbnail */}
                                {affair.thumbnail && (
                                    <div className="overflow-hidden rounded-lg">
                                        <img
                                            src={`/storage/${affair.thumbnail}`}
                                            alt={affair.title}
                                            className="h-64 w-full object-cover transition-transform duration-200 hover:scale-105"
                                        />
                                    </div>
                                )}

                                {/* Description */}
                                <div>
                                    <h3 className="mb-3 text-lg font-semibold">Deskripsi Acara</h3>
                                    <div className="prose max-w-none">
                                        <p className="leading-relaxed whitespace-pre-line text-gray-700">{affair.description}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="border-t pt-4">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Button onClick={handleShare} variant="ghost" className="hover:bg-transparent hover:text-gray-600">
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Bagikan
                                            </Button>
                                        </div>
                                        <a
                                            href={
                                                affair.user?.phone_number
                                                    ? `https://wa.me/${affair.user?.phone_number}`
                                                    : affair.user?.email
                                                      ? `mailto:${affair.user?.email}`
                                                      : '#'
                                            }
                                            className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-light-base inline-flex h-9 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-blue-700 hover:text-white focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                                            target="_blank"
                                        >
                                            Daftar Sekarang
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Event Details */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Detail Acara</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <Album className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Kategori</p>
                                        <p className="text-sm">{affair.affair_category?.name || 'Tidak ada kategori'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tanggal</p>
                                        <p className="text-sm">{formatDate(affair.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Waktu</p>
                                        <p className="text-sm">{formatTime(affair.time)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Lokasi</p>
                                        <p className="text-sm">{affair.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Organizer */}
                        {/* <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Penyelenggara</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 text-center">
                                    <Avatar className="text-light-base mx-auto mb-2 h-16 w-16">
                                        <AvatarImage src={affair.user?.image} />
                                        <AvatarFallback>{affair.user?.name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <h6 className="font-semibold">{affair.user?.name || 'Unknown User'}</h6>
                                    <p className="text-sm text-gray-500">{affair.user?.email || 'Email tidak tersedia'}</p>
                                </div>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm" className="bg-light-base text-dark-base w-full hover:bg-gray-50">
                                        Hubungi Penyelenggara
                                    </Button>
                                    <Button variant="outline" size="sm" className="bg-light-base text-dark-base w-full hover:bg-gray-50">
                                        Lihat Profil
                                    </Button>
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* Related Affairs */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Acara Terkait</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {relatedAffairs && relatedAffairs.length > 0 ? (
                                        relatedAffairs.map((relatedAffair) => (
                                            <div
                                                key={relatedAffair.id}
                                                className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-sm"
                                            >
                                                <Link href={route('affair.view', relatedAffair.slug)} className="block">
                                                    <h4 className="mb-1 line-clamp-2 text-sm font-medium transition-colors hover:text-green-600">
                                                        {relatedAffair.title}
                                                    </h4>
                                                </Link>
                                                <p className="text-xs text-gray-500">{relatedAffair.user.name}</p>
                                                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                                                    <span>{relatedAffair.affair_category.name}</span>
                                                    <span>{formatDate(relatedAffair.date)}</span>
                                                </div>
                                                <p className="mt-1 flex items-center text-xs text-gray-500">
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    {relatedAffair.location}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-sm text-gray-500">Tidak ada acara terkait.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
    // ...existing code...
}
