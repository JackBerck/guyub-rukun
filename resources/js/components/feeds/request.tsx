import { Button } from '@/components/ui/button';
import apiClient from '@/services/api-service';
import { Donation } from '@/types';
import { Link } from '@inertiajs/react';
import { AlertTriangle, Loader2, MapPin, MessageSquare, Phone, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface CursorApiResponse {
    data: Donation[];
    path: string;
    per_page: number;
    next_cursor: string | null;
    next_page_url: string | null;
    prev_cursor: string | null;
    prev_page_url: string | null;
}

const fetchRequests = async (cursor?: string): Promise<CursorApiResponse> => {
    try {
        const url = cursor ? `/requests?cursor=${cursor}` : '/requests';
        const response = await apiClient.get(url);
        console.log('API Response:', response); // Debug log
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export function RequestFeeds() {
    const [requests, setRequests] = useState<Donation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchRequests();

            console.log('Initial Response:', response); // Debug log

            if (response.data && Array.isArray(response.data)) {
                setRequests(response.data);
                setNextCursor(response.next_cursor);
                setHasMoreData(!!response.next_cursor);

                console.log('Processed data:', {
                    requestsCount: response.data.length,
                    nextCursor: response.next_cursor,
                    hasMore: !!response.next_cursor,
                });
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error('Load initial data error:', err);
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data');
            toast.error('Gagal memuat data permintaan');
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = async () => {
        if (loadingMore || !hasMoreData || !nextCursor) return;

        try {
            setLoadingMore(true);
            setError(null);
            const response = await fetchRequests(nextCursor);

            console.log('Load more response:', response); // Debug log

            if (response.data && Array.isArray(response.data)) {
                const newRequests = response.data;

                // Only update if we have new data
                if (newRequests.length > 0) {
                    setRequests((prev) => {
                        // Filter out duplicates based on ID
                        const existingIds = new Set(prev.map((r) => r.id));
                        const uniqueNewRequests = newRequests.filter((r) => !existingIds.has(r.id));
                        return [...prev, ...uniqueNewRequests];
                    });

                    setNextCursor(response.next_cursor);
                    setHasMoreData(!!response.next_cursor);

                    toast.success(`Berhasil memuat ${newRequests.length} permintaan lagi`);
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
    const getUrgencyBadge = (urgency: string) => {
        const urgencyMap = {
            low: { label: 'Rendah', className: 'bg-green-100 text-green-800' },
            medium: { label: 'Sedang', className: 'bg-yellow-100 text-yellow-800' },
            high: { label: 'Tinggi', className: 'bg-red-100 text-red-800' },
        };
        return urgencyMap[urgency as keyof typeof urgencyMap] || urgencyMap.low;
    };

    // Error state
    if (error && requests.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Terjadi Kesalahan</h3>
                <p className="mb-4 text-gray-600">{error}</p>
                <Button onClick={loadInitialData} variant="outline">
                    Coba Lagi
                </Button>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            </div>
        );
    }

    // Empty state
    if (!loading && requests.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Belum Ada Permintaan</h3>
                <p className="mb-4 text-gray-600">Belum ada permintaan bantuan yang tersedia saat ini.</p>
                <Button asChild>
                    <Link href="/need-help">Buat Permintaan Pertama</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4 divide-y p-4">
            {requests.map((request) => (
                <div key={request.id} className="py-2 first:pt-0">
                    <div className="flex gap-3">
                        {/* User Avatar */}
                        <Avatar className="text-light-base h-10 w-10 shrink-0">
                            <AvatarImage src={request.user.image || '/placeholder.svg'} alt={request.user.name} />
                            <AvatarFallback>{request.user.name[0]}</AvatarFallback>
                        </Avatar>

                        {/* Post Content */}
                        <div className="flex-1 space-y-2">
                            {/* Post Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Link href={`/user/${request.user?.id}`} className="small-font-size line-clamp-1 font-medium hover:underline">
                                        {request.user?.name || 'Unknown User'}
                                    </Link>
                                    <span className="text-xs text-gray-500">• {formatDate(request.created_at)}</span>
                                </div>
                            </div>

                            {/* Post Title & Description */}
                            <div>
                                <Link href={`/help/${request.slug}`}>
                                    <h3 className="cursor-pointer text-lg font-bold hover:text-emerald-600">{request.title}</h3>
                                </Link>
                                <p className="mt-1 line-clamp-3 text-gray-600">{request.description}</p>
                            </div>

                            {/* Post Meta */}
                            <div className="flex flex-wrap gap-2">
                                {request.urgency && (
                                    <Badge className={`${getUrgencyBadge(request.urgency).className}`}>
                                        <AlertTriangle className="mr-1 h-3 w-3" />
                                        {getUrgencyBadge(request.urgency).label}
                                    </Badge>
                                )}
                                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                                    {request.donation_category?.name || 'Kategori'}
                                </Badge>
                                {request.address && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                        <MapPin className="h-3 w-3" /> {request.address.split(',').slice(-1)[0].trim()}
                                    </span>
                                )}
                                {!!request.is_popular && (
                                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                                        Populer
                                    </Badge>
                                )}
                            </div>

                            {/* Post Image */}
                            {request.donation_images && request.donation_images.length > 0 && (
                                <Link href={`/help/${request.slug}`}>
                                    <div className="cursor-pointer overflow-hidden rounded-lg">
                                        <img
                                            src={`/storage/${request.donation_images[0].image}`}
                                            alt={request.title}
                                            className="h-64 w-full object-cover transition-transform duration-200 hover:scale-105"
                                        />
                                    </div>
                                </Link>
                            )}

                            {/* Post Actions */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center space-x-4">
                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-blue-500">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{request.comments?.length || 0}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-green-500">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                {request.phone_number && (
                                    <a
                                        href={request.phone_number ? `https://wa.me/${request.phone_number}` : '#'}
                                        className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-blue-base text-light-base inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-blue-700 hover:text-white focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                                        target="_blank"
                                    >
                                        <Phone className="mr-1 h-4 w-4" />
                                        Bantu Sekarang
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Load More Button */}
            {hasMoreData && (
                <div className="flex justify-center pt-4">
                    <Button
                        variant="outline"
                        className="bg-light-base text-dark-base hover:text-dark-base w-full border-gray-200 transition duration-100 hover:bg-gray-100"
                        onClick={loadMoreData}
                        disabled={loadingMore}
                    >
                        {loadingMore ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memuat...
                            </>
                        ) : (
                            'Muat Lebih Banyak'
                        )}
                    </Button>
                </div>
            )}

            {/* End of data message */}
            {!hasMoreData && requests.length > 0 && (
                <div className="pt-4 text-center">
                    <p className="text-sm text-gray-500">Tidak ada permintaan lagi untuk ditampilkan</p>
                </div>
            )}

            {/* Error message for load more */}
            {error && requests.length > 0 && (
                <div className="pt-4 text-center">
                    <p className="mb-2 text-sm text-red-600">{error}</p>
                    <Button variant="ghost" size="sm" onClick={loadMoreData}>
                        Coba Lagi
                    </Button>
                </div>
            )}
        </div>
    );
}
