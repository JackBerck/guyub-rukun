import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import apiClient from '@/services/api-service';
import { Forum } from '@/types';
import { Link } from '@inertiajs/react';
import { Heart, Loader2, MessageSquare, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CursorApiResponse {
    data: Forum[];
    path: string;
    per_page: number;
    next_cursor: string | null;
    next_page_url: string | null;
    prev_cursor: string | null;
    prev_page_url: string | null;
}

const fetchForums = async (cursor?: string): Promise<CursorApiResponse> => {
    try {
        const url = cursor ? `/forums?cursor=${cursor}` : '/forums';
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error('Forum API Error:', error);
        throw error;
    }
};

export function ForumFeeds() {
    const [forums, setForums] = useState<Forum[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchForums();

            if (response.data && Array.isArray(response.data)) {
                setForums(response.data);
                setNextCursor(response.next_cursor);
                setHasMoreData(!!response.next_cursor);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error('Load initial forum data error:', err);
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data');
            toast.error('Gagal memuat data forum');
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = async () => {
        if (loadingMore || !hasMoreData || !nextCursor) return;

        try {
            setLoadingMore(true);
            setError(null);
            const response = await fetchForums(nextCursor);

            if (response.data && Array.isArray(response.data)) {
                const newForums = response.data;

                // Only update if we have new data
                if (newForums.length > 0) {
                    setForums((prev) => {
                        // Filter out duplicates based on ID
                        const existingIds = new Set(prev.map((f) => f.id));
                        const uniqueNewForums = newForums.filter((f) => !existingIds.has(f.id));
                        return [...prev, ...uniqueNewForums];
                    });

                    setNextCursor(response.next_cursor);
                    setHasMoreData(!!response.next_cursor);

                    toast.success(`Berhasil memuat ${newForums.length} forum lagi`);
                } else {
                    setHasMoreData(false);
                    toast.info('Tidak ada data lagi untuk dimuat');
                }
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error('Load more forum data error:', err);
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
        const now = new Date();
        const date = new Date(dateString);
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Baru saja';
        if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
        if (diffInHours < 48) return '1 hari yang lalu';
        return `${Math.floor(diffInHours / 24)} hari yang lalu`;
    };
    return (
        <div className="space-y-4 divide-y p-4">
            {/* Error State */}
            {error && (
                <div className="py-4 text-center">
                    <p className="text-red-500">{error}</p>
                    <Button onClick={loadInitialData} variant="outline" size="sm" className="mt-2">
                        Coba Lagi
                    </Button>
                </div>
            )}

            {/* Forums List */}
            {forums.map((forum) => (
                <div key={forum.id} className="py-2 first:pt-0">
                    <div className="flex gap-3">
                        {/* User Avatar */}
                        <Avatar className="h-10 w-10 shrink-0 font-semibold uppercase">
                            <AvatarImage src={forum.user.image || '/placeholder.svg'} alt={forum.user.name} />
                            <AvatarFallback>{forum.user.name[0]}</AvatarFallback>
                        </Avatar>

                        {/* Forum Content */}
                        <div className="flex-1 space-y-2">
                            {/* Forum Header */}
                            <div className="flex items-center justify-between">
                                {' '}
                                <div className="flex items-center gap-2">
                                    <Link href={`/user/${forum.user?.id}`} className="small-font-size line-clamp-1 font-medium hover:underline">
                                        {forum.user?.name || 'Unknown User'}
                                    </Link>
                                    <span className="text-xs text-gray-500">• {formatDate(forum.created_at)}</span>
                                </div>
                            </div>
                            {/* Forum Title & Description */}
                            <div>
                                <Link href={`/forum/${forum.slug}`}>
                                    <h3 className="cursor-pointer text-lg font-bold hover:text-emerald-600">{forum.title}</h3>
                                </Link>
                                <p className="mt-1 line-clamp-3 text-gray-600">{forum.description}</p>
                            </div>{' '}
                            {/* Forum Meta */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                    {forum.forum_category.name}
                                </Badge>
                            </div>
                            {/* Forum Thumbnail */}
                            {forum.thumbnail && (
                                <Link href={`/forums/${forum.slug}`}>
                                    <div className="cursor-pointer overflow-hidden rounded-lg">
                                        <img
                                            src={`/storage/${forum.thumbnail}`}
                                            alt={forum.title}
                                            className="h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
                                        />
                                    </div>
                                </Link>
                            )}
                            {/* Forum Actions */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center space-x-4">
                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-red-500">
                                        <Heart className="h-4 w-4" />
                                        <span>{forum.liked_by_users_count ? forum.liked_by_users_count : 0}</span>
                                    </Button>{' '}
                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-blue-500">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{forum.comments_count ? forum.comments_count : 0}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-green-500">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                {/* <Link href={`/forums/${forum.slug}`}>
                                    <Button size="sm" className="text-light-base bg-indigo-600 hover:bg-indigo-700">
                                        Baca Diskusi
                                    </Button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Loading indicator */}
            {loading && (
                <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                </div>
            )}

            {/* Load More Button */}
            {!loading && hasMoreData && (
                <div className="flex justify-center pt-4">
                    <Button variant="outline" onClick={loadMoreData} className="w-full" disabled={loadingMore}>
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

            {/* No more forums */}
            {!loading && !hasMoreData && forums.length > 0 && (
                <div className="py-4 text-center text-gray-500">Tidak ada diskusi lagi untuk ditampilkan</div>
            )}

            {/* No forums at all */}
            {!loading && forums.length === 0 && !error && (
                <div className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <MessageSquare className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Belum Ada Forum</h3>
                    <p className="mb-4 text-gray-600">Belum ada forum yang tersedia saat ini. Jadilah yang pertama!</p>
                    <Button asChild>
                        <Link href="/open-forum">Buat Forum</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
