'use client';

import { Clock, Edit, MapPin, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { toast } from 'sonner';

interface PostItemProps {
    id: number;
    title: string;
    slug: string;
    description: string;
    image?: string;
    location?: string;
    category: string;
    urgency?: string;
    date?: string;
    time?: string;
    createdAt: string;
    type: 'donation' | 'forum' | 'request' | 'affair';
    stats?: {
        likes?: number;
        comments?: number;
    };
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export function PostItem({ id, title, slug, description, image, location, category, urgency, date, time, createdAt, type, stats }: PostItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = () => {
        if (type === 'donation') {
            router.get(route('donation.donate.edit', slug));
        } else if (type === 'request') {
            router.get(route('donation.help.edit', slug));
        } else if (type === 'forum') {
            router.get(route('forum.edit', slug));
        } else if (type === 'affair') {
            router.get(route('affair.edit', slug));
        }
    };

    const handleDelete = async () => {
        if (!confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
            return;
        }

        setIsDeleting(true);

        try {
            if (type === 'donation' || type === 'request') {
                router.delete(route('donation.remove', slug), {
                    onSuccess: () => {
                        toast.success('Donasi berhasil dihapus');
                    },
                    onError: (errors) => {
                        console.error('Delete error:', errors);
                        toast.error('Gagal menghapus donasi');
                    },
                    onFinish: () => {
                        setIsDeleting(false);
                    },
                });
            } else if (type === 'forum') {
                router.delete(route('forum.delete', slug), {
                    onSuccess: () => {
                        toast.success('Forum berhasil dihapus');
                    },
                    onError: (errors) => {
                        console.error('Delete error:', errors);
                        toast.error('Gagal menghapus forum');
                    },
                    onFinish: () => {
                        setIsDeleting(false);
                    },
                });
            } else if (type === 'affair') {
                router.delete(route('affair.remove', slug), {
                    onSuccess: () => {
                        toast.success('Acara berhasil dihapus');
                    },
                    onError: (errors) => {
                        console.error('Delete error:', errors);
                        toast.error('Gagal menghapus acara');
                    },
                    onFinish: () => {
                        setIsDeleting(false);
                    },
                });
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Terjadi kesalahan saat menghapus');
            setIsDeleting(false);
        }
    };

    const getTypeColor = () => {
        switch (type) {
            case 'donation':
                return 'bg-emerald-100 text-emerald-800';
            case 'forum':
                return 'bg-blue-100 text-blue-800';
            case 'request':
                return 'bg-orange-100 text-orange-800';
            case 'affair':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getUrgencyColor = () => {
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

    const getUrgencyText = () => {
        switch (urgency) {
            case 'high':
                return 'Mendesak';
            case 'medium':
                return 'Sedang';
            case 'low':
                return 'Rendah';
            default:
                return urgency;
        }
    };

    const getDetailUrl = () => {
        if (type === 'donation') {
            return route('donation.donate.view', slug);
        } else if (type === 'request') {
            return route('donation.help.view', slug);
        } else if (type === 'forum') {
            return route('forum.view', slug);
        } else if (type === 'affair') {
            return route('affair.view', slug);
        }
        return '#';
    };

    // const getTypeText = () => {
    //     switch (type) {
    //         case 'donation':
    //             return 'Donasi';
    //         case 'request':
    //             return 'Bantuan';
    //         case 'forum':
    //             return 'Forum';
    //         case 'affair':
    //             return 'Acara';
    //         default:
    //             return type;
    //     }
    // };

    return (
        <Card className="bg-light-base text-dark-base transition-shadow hover:shadow-md gap-0">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeColor()}`}>
                                {category}
                            </span>
                            {urgency && (
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getUrgencyColor()}`}>
                                    {getUrgencyText()}
                                </span>
                            )}
                            {/* <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                {getTypeText()}
                            </span> */}
                        </div>
                        <Link href={getDetailUrl()}>
                            <h3 className="line-clamp-2 cursor-pointer text-lg font-semibold transition-colors hover:text-emerald-600">{title}</h3>
                        </Link>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{createdAt}</span>
                            </div>
                            {location && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span className="max-w-32 truncate">{location}</span>
                                </div>
                            )}
                        </div>
                        {/* Forum Stats */}
                        {type === 'forum' && stats && (
                            <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                <span>{stats.likes || 0} suka</span>
                                <span>{stats.comments || 0} komentar</span>
                            </div>
                        )}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-light-base text-dark-base">
                            {/* <DropdownMenuItem asChild>
                                <Link href={getDetailUrl()}>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Lihat Detail
                                </Link>
                            </DropdownMenuItem> */}
                            <DropdownMenuItem onClick={handleEdit}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete} className="text-red-600" disabled={isDeleting}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                {isDeleting ? 'Menghapus...' : 'Hapus'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {image && (
                        <Link href={getDetailUrl()}>
                            <div className="aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-opacity hover:opacity-90 mb-2">
                                <img src={image} alt={title} className="h-full w-full object-cover" />
                            </div>
                        </Link>
                    )}
                    <p className="line-clamp-3 text-sm text-gray-600">{description}</p>
                    {(date || time) && (
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            {date && <span>📅 {date}</span>}
                            {time && <span>🕐 {time}</span>}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
