import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Calendar, Flag, MapPin, Share2, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserProfileHeaderProps {
    user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
        bio?: string;
        location?: string;
        joinDate: string;
        isVerified: boolean;
        stats: {
            totalPosts: number;
            donations: number;
            requests: number;
            forums: number;
            events: number;
            likes: number;
            comments: number;
        };
    };
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        userId: user.id,
        reason: '',
    });

    const handleShare = async () => {
        const currentUrl = window.location.href;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(currentUrl);
            } else {
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

    const handleReport = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.reason.trim()) {
            toast.error('Alasan laporan wajib diisi.');
            return;
        }
        setIsReporting(true);
        post('/report-user', {
            onSuccess: () => {
                toast.success('Laporan telah dikirim. Admin akan meninjau pengguna ini.');
                setIsDialogOpen(false);
                reset();
            },
            onError: () => {
                toast.error('Gagal mengirim laporan.');
            },
            onFinish: () => {
                setIsReporting(false);
            },
        });
    };

    return (
        <Card className="bg-light-base text-dark-base">
            <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                    {/* Avatar and Basic Info */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="relative">
                            <div className="very-large-font-size h-32 w-32 overflow-hidden rounded-full bg-emerald-100">
                                <Avatar className="text-dark-base h-full w-full object-cover font-semibold">
                                    <AvatarImage src={`/storage/${user?.avatar}`} alt={`Foto ${user.name}`} />
                                    <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                {user.isVerified && (
                                    <Badge variant="secondary" className="bg-blue-base text-light-base w-fit">
                                        <UserCheck className="mr-1 h-3 w-3" />
                                        Terverifikasi
                                    </Badge>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                {user.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{user.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{user.joinDate}</span>
                                </div>
                            </div>
                        </div>

                        {user.bio && <p className="leading-relaxed text-gray-700">{user.bio}</p>}

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-600">{user.stats.totalPosts}</div>
                                <div className="text-sm text-gray-500">Postingan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{user.stats.donations}</div>
                                <div className="text-sm text-gray-500">Donasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">{user.stats.likes}</div>
                                <div className="text-sm text-gray-500">Disukai</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">{user.stats.comments}</div>
                                <div className="text-sm text-gray-500">Komentar</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" onClick={handleShare} className="bg-light-base text-dark-base gap-2">
                                <Share2 className="h-4 w-4" />
                                Bagikan
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-light-base hover:text-light-base text-red-600 hover:bg-red-600"
                            >
                                <Flag className="h-4 w-4" />
                                Laporkan
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>

            {/* Dialog untuk pelaporan */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Laporkan Pengguna</DialogTitle>
                        <DialogDescription>
                            Mohon jelaskan alasan Anda melaporkan pengguna ini. Laporan akan dikirim ke admin untuk ditinjau.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleReport} className="space-y-4">
                        <Textarea
                            placeholder="Tulis alasan pelaporan..."
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            rows={4}
                            disabled={processing || isReporting}
                            required
                        />
                        {errors.reason && <div className="text-sm text-red-600">{errors.reason}</div>}
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost" disabled={processing || isReporting}>
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="destructive" disabled={processing || isReporting}>
                                {isReporting ? 'Mengirim...' : 'Kirim Laporan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
