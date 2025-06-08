'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { ForumDetailPageProps, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Clock, MessageCircle, Share2, ThumbsUp, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const relatedTopics = [
    {
        id: 2,
        title: 'Cara Membuat Kompos dari Sisa Makanan',
        user: { name: 'Green Warrior' },
        category: { name: 'DIY' },
        created_at: '2024-02-08T10:00:00Z',
    },
    {
        id: 3,
        title: 'Aplikasi Terbaik untuk Food Management',
        user: { name: 'Tech Foodie' },
        category: { name: 'Teknologi' },
        created_at: '2024-02-07T14:00:00Z',
    },
];

type CreateComment = {
    body: string;
    image?: null;
};

export default function ForumDetail() {
    const { forum, auth } = usePage<ForumDetailPageProps & { auth: { user: User | null } }>().props;
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(42);
    const { data, setData, post, processing, errors, reset } = useForm<CreateComment>({
        body: '',
        image: null,
    });
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
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

        if( !data.body.trim()) {
            toast.error('Komentar tidak boleh kosong');
            return;
        }

        post(route('forum.comment.create', forum.slug), {
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

    console.log('Forum Detail Page Loaded', forum);
    // ...existing code...
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
                                        <Badge variant="outline" className="bg-lime-base">
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
                                    <Avatar className="text-light-base">
                                        <AvatarImage src={forum.user?.image || '/placeholder.svg'} />
                                        <AvatarFallback>{forum.user?.name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{forum.user?.name || 'Unknown User'}</h3>
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
                                            <Button variant="ghost" className="hover:bg-transparent hover:text-gray-600">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                {forum.comments?.length || 0}
                                            </Button>
                                            <Button variant="ghost" className="hover:bg-transparent hover:text-gray-600">
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
                                <CardTitle>Balasan ({forum.comments?.length || 0})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="mb-4">
                                    <Textarea
                                        placeholder="Tulis balasan..."
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
                                        Kirim Balasan
                                    </Button>
                                </form>

                                <div className="space-y-4">
                                    {forum.comments && forum.comments.length > 0 ? (
                                        forum.comments.map((comment) => (
                                            <div key={comment.id} className="flex space-x-3">
                                                <Avatar className="text-light-base h-8 w-8">
                                                    <AvatarImage src={comment.user?.image || '/placeholder.svg'} />
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
                                        <p className="py-4 text-center text-gray-500">Belum ada balasan</p>
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
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Kategori</p>
                                    <p className="text-sm">{forum.forum_category?.name || 'Tidak ada kategori'}</p>
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
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Tentang Penulis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 text-center">
                                    <Avatar className="text-light-base mx-auto mb-2 h-16 w-16">
                                        <AvatarImage src={forum.user?.image || '/placeholder.svg'} />
                                        <AvatarFallback>{forum.user?.name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-semibold">{forum.user?.name || 'Unknown User'}</h3>
                                    <p className="text-sm text-gray-500">{forum.user?.email || 'Email tidak tersedia'}</p>
                                </div>
                                <Button variant="outline" size="sm" className="bg-light-base text-dark-base w-full hover:bg-gray-50">
                                    Lihat Profil
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Related Topics */}
                        <Card className="bg-light-base text-dark-base">
                            <CardHeader>
                                <CardTitle>Topik Terkait</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {relatedTopics.map((topic) => (
                                        <div
                                            key={topic.id}
                                            className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-sm"
                                        >
                                            <h4 className="mb-1 line-clamp-2 text-sm font-medium transition-colors hover:text-green-600">
                                                {topic.title}
                                            </h4>
                                            <p className="text-xs text-gray-500">{topic.user.name}</p>
                                            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                                                <span>{topic.category.name}</span>
                                                <span>{formatDate(topic.created_at)}</span>
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
    // ...existing code...
}
