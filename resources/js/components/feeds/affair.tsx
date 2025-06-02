'use client';

import { Calendar, Clock, Loader2, MapPin, MoreHorizontal, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import apiClient from '@/services/api-service';
import { Affair } from '@/types';
import { Link } from '@inertiajs/react';
import { toast } from 'sonner';

interface CursorApiResponse {
    data: Affair[];
    path: string;
    per_page: number;
    next_cursor: string | null;
    next_page_url: string | null;
    prev_cursor: string | null;
    prev_page_url: string | null;
}

const fetchAffairs = async (cursor?: string): Promise<CursorApiResponse> => {
    try {
        const url = cursor ? `/affairs?cursor=${cursor}` : '/affairs';
        const response = await apiClient.get(url);
        console.log('API Response:', response); // Debug log
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export function AffairFeeds() {
    const [affairs, setAffairs] = useState<Affair[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchAffairs();

            console.log('Initial Response:', response); // Debug log

            if (response.data && Array.isArray(response.data)) {
                setAffairs(response.data);
                setNextCursor(response.next_cursor);
                setHasMoreData(!!response.next_cursor);

                console.log('Processed data:', {
                    affairsCount: response.data.length,
                    nextCursor: response.next_cursor,
                    hasMore: !!response.next_cursor,
                });
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error('Load initial data error:', err);
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data');
            toast.error('Gagal memuat data acara');
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = async () => {
        if (loadingMore || !hasMoreData || !nextCursor) return;

        try {
            setLoadingMore(true);
            setError(null);
            const response = await fetchAffairs(nextCursor);

            console.log('Load more response:', response); // Debug log

            if (response.data && Array.isArray(response.data)) {
                const newAffairs = response.data;

                // Only update if we have new data
                if (newAffairs.length > 0) {
                    setAffairs((prev) => {
                        // Filter out duplicates based on ID
                        const existingIds = new Set(prev.map((a) => a.id));
                        const uniqueNewAffairs = newAffairs.filter((a) => !existingIds.has(a.id));
                        return [...prev, ...uniqueNewAffairs];
                    });

                    setNextCursor(response.next_cursor);
                    setHasMoreData(!!response.next_cursor);

                    toast.success(`Berhasil memuat ${newAffairs.length} acara lagi`);
                } else {
                    setHasMoreData(false);
                    toast.info('Tidak ada data lagi untuk dimuat');
                }
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error('Load more data error:', err);
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data');
            toast.error('Gagal memuat data lebih banyak');
        } finally {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatEventDate = (dateString?: string) => {
        if (!dateString) return 'Tanggal belum ditentukan';
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatEventTime = (timeString?: string) => {
        if (!timeString) return 'Waktu belum ditentukan';
        return timeString.slice(0, 5); // Format HH:MM
    };

    // Error state
    if (error && affairs.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Terjadi Kesalahan</h3>
                <p className="mb-4 text-gray-600">{error}</p>
                <Button onClick={loadInitialData} className="bg-emerald-600 text-white hover:bg-emerald-700">
                    Coba Lagi
                </Button>
            </div>
        );
    }

    // Loading state
    if (loading && affairs.length === 0) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-600" />
                </div>
            </div>
        );
    }

    // Empty state
    if (!loading && affairs.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Belum Ada Acara</h3>
                <p className="text-gray-600">Belum ada acara yang tersedia saat ini.</p>
            </div>
        );
    }
    return (
        <div className="space-y-4 divide-y p-4">
            {affairs.map((affair) => (
                <div key={affair.id} className="py-2 first:pt-0">
                    <div className="flex gap-3">
                        {/* User Avatar */}
                        <Avatar className="text-light-base h-10 w-10 shrink-0">
                            <AvatarImage src={affair.user.image || '/placeholder.svg'} alt={affair.user.name} />
                            <AvatarFallback>{affair.user.name[0]}</AvatarFallback>
                        </Avatar>

                        {/* Post Content */}
                        <div className="flex-1 space-y-2">
                            {/* Post Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Link href={`/user/${affair.user?.id}`} className="small-font-size line-clamp-1 font-medium hover:underline">
                                        {affair.user?.name || 'Unknown User'}
                                    </Link>
                                    {/* <BadgeCheck className="h-4 w-4 text-blue-500" /> */}
                                    <span className="text-xs text-gray-500">• {formatDate(affair.created_at)}</span>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Simpan</DropdownMenuItem>
                                        <DropdownMenuItem>Laporkan</DropdownMenuItem>
                                        <DropdownMenuItem>Sembunyikan</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Post Title & Description */}
                            <div>
                                <Link href={`/affair/${affair.slug}`}>
                                    <h3 className="cursor-pointer text-lg font-bold hover:text-emerald-600">{affair.title}</h3>
                                </Link>
                                {affair.description && <p className="mt-1 line-clamp-3 text-gray-600">{affair.description}</p>}
                            </div>

                            {/* Event Details */}
                            <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatEventDate(affair.date)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatEventTime(affair.time)}</span>
                                </div>
                                {affair.location && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>{affair.location}</span>
                                    </div>
                                )}
                            </div>

                            {/* Post Meta */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                    {affair.affair_category.name}
                                </Badge>
                            </div>

                            {/* Post Thumbnail */}
                            <Link href={`/affairs/${affair.slug}`}>
                                <div className="cursor-pointer overflow-hidden rounded-lg">
                                    <img
                                        src={affair.thumbnail ? `/storage/${affair.thumbnail}` : '/placeholder.svg'}
                                        alt={affair.title}
                                        className="h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
                                    />
                                </div>
                            </Link>

                            {/* Post Actions */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center space-x-4">
                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-green-500">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Link href={affair.user.phone_number ? `https://wa.me/${affair.user.phone_number}` : '#'}>
                                    <Button size="sm" className="text-light-base bg-purple-600 hover:bg-purple-700">
                                        Daftar Acara
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Loading indicator */}
            {loadingMore && (
                <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                </div>
            )}

            {/* Load More Button */}
            {!loadingMore && hasMoreData && (
                <div className="flex justify-center pt-4">
                    <Button variant="outline" onClick={loadMoreData} className="w-full">
                        Muat Lebih Banyak
                    </Button>
                </div>
            )}

            {/* No more affairs */}
            {!loadingMore && !hasMoreData && affairs.length > 0 && (
                <div className="py-4 text-center text-gray-500">Tidak ada acara lagi untuk ditampilkan</div>
            )}
        </div>
    );
}
