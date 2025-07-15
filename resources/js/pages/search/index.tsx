import {
    AlertTriangle,
    BadgeCheck,
    Calendar,
    Clock,
    Eye,
    Filter,
    Heart,
    Loader2,
    MapPin,
    MessageSquare,
    Phone,
    Search,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Layout from '@/layouts/layout';
import { Head, Link, router } from '@inertiajs/react';

type SearchResult = {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: 'donation' | 'request' | 'forum' | 'affair';
    urgency?: 'low' | 'medium' | 'high';
    phone_number?: string;
    address?: string;
    thumbnail?: string;
    date?: string;
    time?: string;
    location?: string;
    is_popular?: boolean;
    user: {
        id: number;
        name: string;
        email: string;
        image?: string;
        phone_number?: string;
    };
    category: {
        id: number;
        name: string;
    };
    images?: {
        id: number;
        image: string;
    }[];
    comments_count: number;
    likes_count: number;
    views_count?: number;
    participants_count?: number;
    created_at: string;
    updated_at: string;
};

type FilterState = {
    keyword: string;
    type: string;
    category: string;
    urgency: string;
    location: string;
    dateRange: string;
};

export default function SearchPage({
    posts,
    categories,
    filters: initialFilters,
}: {
    posts: SearchResult[];
    categories: {
        donation: { id: number; name: string }[];
        forum: { id: number; name: string }[];
        affair: { id: number; name: string }[];
        request: { id: number; name: string }[];
    };
    filters: FilterState;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    // Log untuk debugging
    console.log('Posts received:', posts);
    console.log('Categories received:', categories);
    console.log('Initial filters:', initialFilters);

    // const filteredResults = useMemo(() => {
    //     let filtered = posts || [];

    //     // Filter by keyword
    //     if (filters.keyword) {
    //         filtered = filtered.filter(
    //             (item) =>
    //                 item.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
    //                 item.description.toLowerCase().includes(filters.keyword.toLowerCase()) ||
    //                 item.user.name.toLowerCase().includes(filters.keyword.toLowerCase()),
    //         );
    //     }

    //     // Filter by type
    //     if (filters.type !== 'all') {
    //         filtered = filtered.filter((item) => item.type === filters.type);
    //     }

    //     // Filter by category
    //     if (filters.category !== 'all') {
    //         filtered = filtered.filter((item) => item.category.name === filters.category);
    //     }

    //     // Filter by urgency
    //     if (filters.urgency !== 'all') {
    //         filtered = filtered.filter((item) => item.urgency === filters.urgency);
    //     }

    //     // Filter by location
    //     if (filters.location) {
    //         filtered = filtered.filter(
    //             (item) =>
    //                 item.address?.toLowerCase().includes(filters.location.toLowerCase()) ||
    //                 item.location?.toLowerCase().includes(filters.location.toLowerCase()),
    //         );
    //     }

    //     return filtered;
    // }, [posts, filters]);

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        // Update URL params
        const searchParams = new URLSearchParams();

        // Only add non-default parameters
        if (newFilters.keyword) searchParams.set('q', newFilters.keyword);
        if (newFilters.type !== 'all') searchParams.set('type', newFilters.type);
        if (newFilters.category !== 'all') searchParams.set('category', newFilters.category);
        if (newFilters.urgency !== 'all') searchParams.set('urgency', newFilters.urgency);
        if (newFilters.location) searchParams.set('location', newFilters.location);
        if (newFilters.dateRange !== 'all') searchParams.set('date', newFilters.dateRange);

        // Use router.visit for navigation with parameters
        router.visit(`/search?${searchParams.toString()}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Trigger search with current filters
        const searchParams = new URLSearchParams();
        if (filters.keyword) searchParams.set('q', filters.keyword);
        if (filters.type !== 'all') searchParams.set('type', filters.type);
        if (filters.category !== 'all') searchParams.set('category', filters.category);
        if (filters.urgency !== 'all') searchParams.set('urgency', filters.urgency);
        if (filters.location) searchParams.set('location', filters.location);
        if (filters.dateRange !== 'all') searchParams.set('date', filters.dateRange);

        router.visit(`/search?${searchParams.toString()}`, {
            preserveState: false,
            preserveScroll: false,
            replace: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const clearFilters = () => {
        setFilters({
            keyword: '',
            type: 'all',
            category: 'all',
            urgency: 'all',
            location: '',
            dateRange: 'all',
        });
        router.visit('/search', {
            preserveState: false,
            preserveScroll: false,
            replace: true,
        });
    };

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter((value) => value !== 'all' && value !== '').length;
    };

    const formatDate = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Baru saja';
        if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
        if (diffInHours < 48) return '1 hari yang lalu';
        return `${Math.floor(diffInHours / 24)} hari yang lalu`;
    };

    const getTypeColor = (type: string) => {
        const typeMap = {
            donation: 'bg-emerald-100 text-emerald-800',
            request: 'bg-blue-100 text-blue-800',
            forum: 'bg-purple-100 text-purple-800',
            affair: 'bg-orange-100 text-orange-800',
        };
        return typeMap[type as keyof typeof typeMap] || 'bg-gray-100 text-gray-800';
    };

    const getTypeLabel = (type: string) => {
        const typeMap = {
            donation: 'Donasi',
            request: 'Permintaan',
            forum: 'Forum',
            affair: 'Acara',
        };
        return typeMap[type as keyof typeof typeMap] || type;
    };

    const getUrgencyBadge = (urgency?: string) => {
        if (!urgency) return null;
        const urgencyMap = {
            low: { label: 'Rendah', className: 'bg-green-100 text-green-800' },
            medium: { label: 'Sedang', className: 'bg-yellow-100 text-yellow-800' },
            high: { label: 'Tinggi', className: 'bg-red-100 text-red-800' },
        };
        return urgencyMap[urgency as keyof typeof urgencyMap] || urgencyMap.low;
    };

    const getPostLink = (post: SearchResult) => {
        switch (post.type) {
            case 'donation':
                return `/donation/${post.slug}`;
            case 'request':
                return `/help/${post.slug}`;
            case 'forum':
                return `/forum/${post.slug}`;
            case 'affair':
                return `/affair/${post.slug}`;
            default:
                return '#';
        }
    };

    const getActionButton = (post: SearchResult) => {
        switch (post.type) {
            case 'donation':
                return post.phone_number ? (
                    <a
                        href={
                            post.phone_number
                                ? `https://wa.me/${post.user.phone_number}`
                                : post.user.phone_number
                                  ? `https://wa.me/${post.user.phone_number}`
                                  : post.user.email
                                    ? `mailto:${post.user.email}`
                                    : '#'
                        }
                        target="_blank"
                    >
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <Phone className="mr-1 h-4 w-4" />
                            Hubungi
                        </Button>
                    </a>
                ) : null;
            case 'request':
                return post.phone_number ? (
                    <a
                        href={
                            post.phone_number
                                ? `https://wa.me/${post.user.phone_number}`
                                : post.user.phone_number
                                  ? `https://wa.me/${post.user.phone_number}`
                                  : post.user.email
                                    ? `mailto:${post.user.email}`
                                    : '#'
                        }
                        target="_blank"
                    >
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Phone className="mr-1 h-4 w-4" />
                            Bantu Sekarang
                        </Button>
                    </a>
                ) : null;
            case 'forum':
                return (
                    <Link href={`/forum/${post.slug}`}>
                        <Button size="sm" variant="outline" className="bg-transparent hover:bg-purple-50">
                            Baca Diskusi
                        </Button>
                    </Link>
                );
            case 'affair':
                return (
                    <a
                        href={
                            post.user.phone_number ? `https://wa.me/${post.user.phone_number}` : post.user.email ? `mailto:${post.user.email}` : '#'
                        }
                        target="_blank"
                    >
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            Daftar Acara
                        </Button>
                    </a>
                );
            default:
                return null;
        }
    };

    const getCurrentCategories = () => {
        if (filters.type === 'all') return [];
        return categories[filters.type as keyof typeof categories] || [];
    };

    const FilterContent = () => (
        <div className="space-y-6 px-4">
            {/* Type Filter */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Jenis Postingan</Label>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis postingan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Jenis</SelectItem>
                        <SelectItem value="donation">Donasi</SelectItem>
                        <SelectItem value="request">Permintaan Bantuan</SelectItem>
                        <SelectItem value="forum">Forum Diskusi</SelectItem>
                        <SelectItem value="affair">Acara</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Category Filter */}
            {filters.type !== 'all' && (
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Kategori</Label>
                    <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kategori</SelectItem>
                            {getCurrentCategories().map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Urgency Filter (only for requests) */}
            {filters.type === 'request' && (
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Tingkat Urgensi</Label>
                    <Select value={filters.urgency} onValueChange={(value) => handleFilterChange('urgency', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih urgensi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Urgensi</SelectItem>
                            <SelectItem value="low">Rendah</SelectItem>
                            <SelectItem value="medium">Sedang</SelectItem>
                            <SelectItem value="high">Tinggi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Location Filter */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Lokasi</Label>
                <Input
                    value={filters.location}
                    onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Cari berdasarkan lokasi..."
                />
            </div>

            {/* Date Range Filter */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Waktu Posting</Label>
                <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih rentang waktu" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Waktu</SelectItem>
                        <SelectItem value="today">Hari Ini</SelectItem>
                        <SelectItem value="week">Minggu Ini</SelectItem>
                        <SelectItem value="month">Bulan Ini</SelectItem>
                        <SelectItem value="year">Tahun Ini</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Clear Filters */}
            {getActiveFiltersCount() > 0 && (
                <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                    <X className="mr-2 h-4 w-4" />
                    Hapus Semua Filter
                </Button>
            )}
        </div>
    );

    return (
        <Layout>
            <Head title="Beranda" />
            <section className="section-padding-x pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Desktop Sidebar Filter */}
                        <div className="hidden lg:block">
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Filter className="h-5 w-5" />
                                        Filter Pencarian
                                        {getActiveFiltersCount() > 0 && (
                                            <Badge variant="secondary" className="ml-auto">
                                                {getActiveFiltersCount()}
                                            </Badge>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FilterContent />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-6 lg:col-span-3">
                            {/* Search Header */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleFilterChange('location', filters.location);
                                            }}
                                            className="relative flex-1"
                                        >
                                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            <Input
                                                placeholder="Cari donasi, forum, acara, atau permintaan bantuan..."
                                                onChange={(e) => (filters.keyword = e.target.value)}
                                                className="pl-10"
                                            />
                                        </form>
                                        <div className="flex gap-2">
                                            {/* Mobile Filter Button */}
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="outline" className="bg-transparent lg:hidden">
                                                        <Filter className="mr-2 h-4 w-4" />
                                                        Filter
                                                        {getActiveFiltersCount() > 0 && (
                                                            <Badge variant="secondary" className="ml-2">
                                                                {getActiveFiltersCount()}
                                                            </Badge>
                                                        )}
                                                    </Button>
                                                </SheetTrigger>
                                                <SheetContent side="left" className="w-80">
                                                    <SheetHeader>
                                                        <SheetTitle>Filter Pencarian</SheetTitle>
                                                    </SheetHeader>
                                                    <div className="mt-6">
                                                        <FilterContent />
                                                    </div>
                                                </SheetContent>
                                            </Sheet>
                                            <Button onClick={handleSearch} disabled={isLoading}>
                                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Active Filters */}
                                    {getActiveFiltersCount() > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {filters.type !== 'all' && (
                                                <Badge variant="secondary" className="gap-1">
                                                    {getTypeLabel(filters.type)}
                                                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange('type', 'all')} />
                                                </Badge>
                                            )}
                                            {filters.category !== 'all' && (
                                                <Badge variant="secondary" className="gap-1">
                                                    {filters.category}
                                                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange('category', 'all')} />
                                                </Badge>
                                            )}
                                            {filters.urgency !== 'all' && (
                                                <Badge variant="secondary" className="gap-1">
                                                    Urgensi: {getUrgencyBadge(filters.urgency)?.label}
                                                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange('urgency', 'all')} />
                                                </Badge>
                                            )}
                                            {filters.location && (
                                                <Badge variant="secondary" className="gap-1">
                                                    Lokasi: {filters.location}
                                                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange('location', '')} />
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Search Results */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Mencari...
                                            </div>
                                        ) : (
                                            `Hasil Pencarian (${posts.length} ditemukan)`
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isLoading ? (
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="animate-pulse">
                                                    <div className="flex gap-4">
                                                        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                                                        <div className="flex-1 space-y-2">
                                                            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                                                            <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                                                            <div className="h-20 rounded bg-gray-200"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : posts.length === 0 ? (
                                        <div className="py-12 text-center">
                                            <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                            <h3 className="mb-2 text-lg font-medium text-gray-900">Tidak ada hasil ditemukan</h3>
                                            <p className="mb-4 text-gray-500">Coba ubah kata kunci pencarian atau filter yang digunakan</p>
                                            <Button variant="outline" onClick={clearFilters}>
                                                Hapus Semua Filter
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {posts.map((post) => (
                                                <div key={`${post.slug}-${post.id}`} className="border-b py-2 last:border-b-0">
                                                    <div className="flex gap-3">
                                                        {/* User Avatar */}
                                                        <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                                                            <AvatarImage src={`/storage/${post.user.image}`} alt={post.user.name} />
                                                            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                                                        </Avatar>

                                                        {/* Post Content */}
                                                        <div className="flex-1 space-y-2">
                                                            {/* Post Header */}
                                                            <div className="flex items-center gap-2">
                                                                <Link
                                                                    href={route('user.detail', { id: post.user.id })}
                                                                    className="small-font-size line-clamp-2 font-medium hover:underline"
                                                                >
                                                                    {post.user.name}
                                                                </Link>
                                                                {post.is_popular ? <BadgeCheck className="h-4 w-4 text-blue-500" /> : ''}
                                                                <span className="text-xs text-gray-500">• {formatDate(post.created_at)}</span>
                                                            </div>

                                                            {/* Post Title & Description */}
                                                            <div>
                                                                <Link href={getPostLink(post)}>
                                                                    <h4 className="line-clamp-2 cursor-pointer text-lg font-bold hover:text-emerald-600">
                                                                        {post.title}
                                                                    </h4>
                                                                </Link>
                                                                <p className="small-font-size mt-1 line-clamp-3 text-gray-600">{post.description}</p>
                                                            </div>

                                                            {/* Affair Details (only for events) */}
                                                            {post.type === 'affair' && (
                                                                <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                        <Calendar className="h-4 w-4" />
                                                                        <span>
                                                                            {post.date
                                                                                ? new Date(post.date).toLocaleDateString('id-ID', {
                                                                                      weekday: 'long',
                                                                                      year: 'numeric',
                                                                                      month: 'long',
                                                                                      day: 'numeric',
                                                                                  })
                                                                                : 'Tanggal belum ditentukan'}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                        <Clock className="h-4 w-4" />
                                                                        <span>{post.time ? post.time.slice(0, 5) : 'Waktu belum ditentukan'}</span>
                                                                    </div>
                                                                    {post.location && (
                                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                            <MapPin className="h-4 w-4" />
                                                                            <span>{post.location}</span>
                                                                        </div>
                                                                    )}
                                                                    {post.participants_count && (
                                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                            <Users className="h-4 w-4" />
                                                                            <span>{post.participants_count} peserta terdaftar</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Post Meta */}
                                                            <div className="flex flex-wrap gap-2">
                                                                {post.type ? (
                                                                    <Badge className={getTypeColor(post.type)}>{getTypeLabel(post.type)}</Badge>
                                                                ) : null}
                                                                {post.urgency ? (
                                                                    <Badge className={`${getUrgencyBadge(post.urgency)?.className}`}>
                                                                        <AlertTriangle className="mr-1 h-3 w-3" />
                                                                        {getUrgencyBadge(post.urgency)?.label}
                                                                    </Badge>
                                                                ) : null}
                                                                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                                                    {post.category.name}
                                                                </Badge>
                                                                {post.address ? (
                                                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                                        <MapPin className="h-3 w-3" /> {post.address.split(',').slice(-1)[0].trim()}
                                                                    </span>
                                                                ) : null}
                                                                {post.is_popular ? (
                                                                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                                                                        Populer
                                                                    </Badge>
                                                                ) : null}
                                                            </div>

                                                            {/* Post Image/Thumbnail */}
                                                            {post.thumbnail && (
                                                                <Link href={getPostLink(post)}>
                                                                    <div className="cursor-pointer overflow-hidden rounded-lg">
                                                                        <img
                                                                            src={
                                                                                post.thumbnail
                                                                                    ? `/storage/${post.thumbnail}`
                                                                                    : '/image/placeholder.svg'
                                                                            }
                                                                            alt={post.title}
                                                                            className="h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
                                                                        />
                                                                    </div>
                                                                </Link>
                                                            )}

                                                            {/* Post Actions */}
                                                            <div className="flex items-center justify-between pt-2">
                                                                <div className="flex items-center space-x-4">
                                                                    {post.likes_count ? (
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="gap-1 text-gray-500 hover:text-red-500"
                                                                        >
                                                                            <Heart className="h-4 w-4" />
                                                                            <span>{post.likes_count}</span>
                                                                        </Button>
                                                                    ) : null}
                                                                    {post.comments_count > 0 ? (
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="gap-1 text-gray-500 hover:text-blue-500"
                                                                        >
                                                                            <MessageSquare className="h-4 w-4" />
                                                                            <span>{post.comments_count}</span>
                                                                        </Button>
                                                                    ) : null}
                                                                    {post.views_count ? (
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="gap-1 text-gray-500 hover:text-gray-700"
                                                                        >
                                                                            <Eye className="h-4 w-4" />
                                                                            <span>{post.views_count}</span>
                                                                        </Button>
                                                                    ) : null}
                                                                    {/* <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="gap-1 text-gray-500 hover:text-green-500"
                                                                    >
                                                                        <Share2 className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="gap-1 text-gray-500 hover:text-yellow-500"
                                                                    >
                                                                        <BookmarkPlus className="h-4 w-4" />
                                                                    </Button> */}
                                                                </div>
                                                                {getActionButton(post)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
