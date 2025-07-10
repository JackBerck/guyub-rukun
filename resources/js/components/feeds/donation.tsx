import { Button } from '@/components/ui/button';
import apiClient from '@/services/api-service';
import { Donation } from '@/types';
import { Link } from '@inertiajs/react';
import { Heart, Loader2, MapPin, MessageSquare, Share2 } from 'lucide-react';
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

const fetchDonations = async (cursor?: string): Promise<CursorApiResponse> => {
    try {
        const url = cursor ? `/donations?cursor=${cursor}` : '/donations';
        const response = await apiClient.get(url);
        console.log('API Response:', response); // Debug log
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default function DonationFeeds() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchDonations();

            console.log('Initial Response:', response); // Debug log

            if (response.data && Array.isArray(response.data)) {
                setDonations(response.data);
                setNextCursor(response.next_cursor);
                setHasMoreData(!!response.next_cursor);

                console.log('Processed data:', {
                    donationsCount: response.data.length,
                    nextCursor: response.next_cursor,
                    hasMore: !!response.next_cursor,
                });
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error('Load initial data error:', err);
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data');
            toast.error('Gagal memuat data donasi');
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = async () => {
        if (loadingMore || !hasMoreData || !nextCursor) return;

        try {
            setLoadingMore(true);
            setError(null);
            const response = await fetchDonations(nextCursor);

            console.log('Load more response:', response); // Debug log

            if (response.data && Array.isArray(response.data)) {
                const newDonations = response.data;

                // Only update if we have new data
                if (newDonations.length > 0) {
                    setDonations((prev) => {
                        // Filter out duplicates based on ID
                        const existingIds = new Set(prev.map((d) => d.id));
                        const uniqueNewDonations = newDonations.filter((d) => !existingIds.has(d.id));
                        return [...prev, ...uniqueNewDonations];
                    });

                    setNextCursor(response.next_cursor);
                    setHasMoreData(!!response.next_cursor);

                    toast.success(`Berhasil memuat ${newDonations.length} donasi lagi`);
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

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getUrgencyText = (urgency: string) => {
        switch (urgency) {
            case 'high':
                return 'Mendesak';
            case 'medium':
                return 'Sedang';
            case 'low':
                return 'Rendah';
            default:
                return 'Normal';
        }
    };

    // Error state
    if (error && donations.length === 0) {
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
    if (!loading && donations.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <Heart className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Belum Ada Donasi</h3>
                <p className="mb-4 text-gray-600">Belum ada donasi yang tersedia saat ini. Jadilah yang pertama!</p>
                <Button asChild>
                    <Link href="/donate">Buat Donasi</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4 divide-y p-4">
            {donations.map((donation) => (
                <div key={`donation-${donation.id}`} className="py-2">
                    <div className="flex gap-3">
                        {/* User Avatar */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                            <Avatar className="text-dark-base font-semibold">
                                <AvatarImage src={donation.user?.image || '/placeholder.svg'} />
                                <AvatarFallback>{donation.user?.name?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Post Content */}
                        <div className="flex-1 space-y-2">
                            {/* Post Header */}
                            <div className="flex items-center gap-2">
                                <Link href={`/user/${donation.user?.id}`} className="small-font-size line-clamp-1 font-medium hover:underline">
                                    {donation.user?.name || 'Unknown User'}
                                </Link>
                                <span className="text-xs text-gray-500"> • {formatDate(donation.created_at)}</span>
                            </div>

                            {/* Post Title & Description */}
                            <div>
                                <Link href={donation.type === 'donation' ? `/donation/${donation.slug}` : `/help/${donation.slug}`}>
                                    <h4 className="line-clamp-2 cursor-pointer text-lg font-bold hover:text-emerald-600">{donation.title}</h4>
                                </Link>
                                <p className="small-font-size mt-1 line-clamp-2 text-gray-600">{donation.description}</p>
                            </div>

                            {/* Post Meta */}
                            <div className="flex flex-wrap gap-2">
                                {donation.urgency && (
                                    <span
                                        className={`extra-small-font-size inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${getUrgencyColor(donation.urgency)}`}
                                    >
                                        {getUrgencyText(donation.urgency)}
                                    </span>
                                )}
                                <span className="extra-small-font-size inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-medium text-emerald-800">
                                    {donation.donation_category?.name || 'Kategori'}
                                </span>
                                {donation.address && (
                                    <span className="extra-small-font-size inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-800">
                                        <MapPin className="h-4 w-4" />
                                        <span className="line-clamp-1">{donation.address}</span>
                                    </span>
                                )}
                                {!!donation.is_popular && (
                                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                                        Populer
                                    </Badge>
                                )}
                            </div>

                            {/* Post Image */}
                            {donation.donation_images && donation.donation_images.length > 0 && (
                                <div className="overflow-hidden rounded-lg">
                                    <img
                                        src={`/storage/${donation.donation_images[0].image}`}
                                        alt={donation.title}
                                        className="h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
                                    />
                                </div>
                            )}

                            {/* Post Actions */}
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:bg-transparent hover:text-blue-500">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{donation.comments?.length || 0}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:bg-transparent hover:text-green-500">
                                    <Share2 className="h-4 w-4" />
                                </Button>
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
            {!hasMoreData && donations.length > 0 && (
                <p className="py-4 text-center text-sm text-gray-500">Tidak ada donasi lagi untuk ditampilkan</p>
            )}

            {/* Error message for load more */}
            {error && donations.length > 0 && (
                <div className="pt-4 text-center">
                    <p className="mb-2 text-sm text-red-600">{error}</p>
                    <Button variant="ghost" size="sm" onClick={loadMoreData}>
                        Coba Lagi
                    </Button>
                </div>
            )}

            {/* Debug info (remove in production) */}
            {/* {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 rounded bg-gray-100 p-4 text-xs">
                    <p>
                        Debug: Next cursor: {nextCursor || 'none'}, Has more: {hasMoreData.toString()}, Total donations: {donations.length}
                    </p>
                </div>
            )} */}
        </div>
    );
}
