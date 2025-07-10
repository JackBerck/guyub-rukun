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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { ForumDetailPageProps, User } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Album, Clock, MessageCircle, Share2, ThumbsUp, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type CreateComment = {
    body: string;
    image?: null;
};

export default function ForumDetail() {
    const { forum, relatedForums, forumIsLiked, auth } = usePage<ForumDetailPageProps & { auth: { user: User | null } }>().props;
    const [isLiked, setIsLiked] = useState(forumIsLiked);
    const [likes, setLikes] = useState(42);
    const { data, setData, post, processing, errors, reset } = useForm<CreateComment>({
        body: '',
        image: null,
    });
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

    const handleLike = () => {
        router.post(
            route('forum.like', forum.id),
            {
                user_id: auth.user?.id,
                forum_id: forum.id,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLiked(!isLiked);
                    setLikes(isLiked ? likes - 1 : likes + 1);
                },
                onError: () => {
                    toast.error('Gagal melakukan like');
                },
            },
        );
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.body.trim()) {
            toast.error('Komentar tidak boleh kosong');
            return;
        }

        post(route('forum.comment.create', forum.slug), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Komentar berhasil ditambahkan');
                reset();
            },
            onError: () => {
                toast.error('Gagal menambahkan komentar');
            },
            onFinish: () => {
                reset();
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
            <Head title={`${forum.title} - Detail Forum`} />
            <div className="container mx-auto max-w-screen-xl px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Main Card - Header, Thumbnail, Content, Actions */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline" className="bg-lime-base text-light-base">
                                            {forum.forum_category.name}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>{forum.comments?.length || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                <CardTitle className="mb-4 text-2xl">{forum.title}</CardTitle>

                                <div className="flex items-center space-x-3">
                                    <Avatar className="text-dark-base font-semibold">
                                        <AvatarImage src={`/storage/${forum.user?.image}`} alt={`Foto ${forum.user?.name}`} />
                                        <AvatarFallback>{forum.user?.name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Link href={route('user.detail', forum.user?.id)} className="text-dark-base hover:text-green-600">
                                            <h6 className="font-semibold">{forum.user?.name || 'Unknown User'}</h6>
                                        </Link>
                                        <p className="text-sm text-gray-500">{formatDate(forum.created_at)}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Thumbnail */}
                                {forum.thumbnail && (
                                    <div className="overflow-hidden rounded-lg">
                                        <img
                                            src={`/storage/${forum.thumbnail}`}
                                            alt={forum.title}
                                            className="h-64 w-full object-cover transition-transform duration-200 hover:scale-105"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="prose max-w-none">
                                    <div className="leading-relaxed whitespace-pre-line text-gray-700">{forum.description}</div>
                                </div>

                                {/* Actions */}
                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                variant="ghost"
                                                onClick={handleLike}
                                                className={`hover:bg-transparent hover:text-blue-600 ${isLiked ? 'text-blue-500 hover:text-blue-600' : ''}`}
                                            >
                                                <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                                                {forum.liked_by_users_count || 0}
                                            </Button>
                                            <Button variant="ghost" className="hover:bg-transparent hover:text-lime-600">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                {forum.comments?.length || 0}
                                            </Button>
                                            <Button onClick={handleShare} variant="ghost" className="hover:bg-transparent hover:text-gray-600">
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Bagikan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Komentar ({forum.comments?.length || 0})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="mb-4">
                                    <Textarea
                                        placeholder="Tulis komentar..."
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        className="mb-2"
                                        rows={3}
                                        disabled={processing}
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
                                    {forum.comments && forum.comments.length > 0 ? (
                                        forum.comments.map((comment) => (
                                            <div key={comment.id} className="flex space-x-3">
                                                <Avatar className="text-dark-base h-8 w-8">
                                                    <AvatarImage src={`/storage/${comment.user?.image}`} alt={`Foto ${comment.user?.name}`} />
                                                    <AvatarFallback>{comment.user?.name?.[0] || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="rounded-lg bg-gray-50">
                                                        <div className="mb-1 flex items-center space-x-2">
                                                            <Link
                                                                href={route('user.detail', comment.user?.id)}
                                                                className="text-dark-base hover:text-green-600"
                                                            >
                                                                <span className="text-sm font-medium">{comment.user?.name || 'Unknown User'}</span>
                                                            </Link>
                                                            <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                                                        </div>
                                                        <p className="text-sm">{comment.body}</p>
                                                    </div>
                                                </div>
                                                {auth.user?.id === comment.user_id && (
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
                                        <p className="text-center text-sm text-gray-500">Belum ada balasan</p>
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
                                <CardTitle>Detail Forum</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <Album className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Kategori</p>
                                        <p className="text-sm">{forum.forum_category?.name || 'Tidak ada kategori'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Dibuat</p>
                                        <p className="text-sm">{formatDate(forum.created_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Author */}
                        {/* <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Tentang Penulis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 text-center">
                                    <Avatar className="text-dark-base large-font-size mx-auto mb-2 h-16 w-16 font-semibold">
                                        <AvatarImage src={forum.user?.image} />
                                        <AvatarFallback>{forum.user?.name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <h6 className="font-semibold">{forum.user?.name || 'Unknown User'}</h6>
                                    <p className="text-sm text-gray-500">{forum.user?.email || 'Email tidak tersedia'}</p>
                                </div>
                                <Link href={route('user.detail', forum.user?.id)} className="w-full">
                                    <Button variant="outline" size="sm" className="bg-light-base text-dark-base w-full hover:bg-gray-100">
                                        Lihat Profil
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card> */}

                        {/* Related Topics */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Topik Terkait</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {relatedForums && relatedForums.length > 0 ? (
                                        relatedForums.map((forum) => (
                                            <div
                                                key={forum.id}
                                                className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-sm"
                                            >
                                                <Link href={route('forum.view', forum.slug)} className="block">
                                                    <h4 className="mb-1 line-clamp-2 text-sm font-medium transition-colors hover:text-green-600">
                                                        {forum.title}
                                                    </h4>
                                                </Link>
                                                <p className="text-xs text-gray-500">{forum.user.name}</p>
                                                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                                                    <span>{forum.forum_category.name}</span>
                                                    <span>{formatDate(forum.created_at)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-sm text-gray-500">Belum ada topik terkait</p>
                                    )}
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
