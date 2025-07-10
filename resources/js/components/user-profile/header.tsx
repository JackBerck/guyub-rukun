'use client';

import { Calendar, Flag, MapPin, Share2, UserCheck } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    const [isReporting, setIsReporting] = useState(false);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Profil ${user.name} - PeduliRasa`,
                text: `Lihat profil dan aktivitas ${user.name} di PeduliRasa`,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link profil telah disalin!');
        }
    };

    const handleReport = () => {
        if (confirm('Apakah Anda yakin ingin melaporkan pengguna ini?')) {
            setIsReporting(true);
            // Implement report logic
            setTimeout(() => {
                setIsReporting(false);
                alert('Laporan telah dikirim. Terima kasih atas laporan Anda.');
            }, 1000);
        }
    };

    return (
        <Card className="bg-light-base text-dark-base">
            <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                    {/* Avatar and Basic Info */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="relative">
                            <div className="very-large-font-size h-32 w-32 overflow-hidden rounded-full bg-emerald-100">
                                <Avatar className="text-light-base h-full w-full object-cover">
                                    <AvatarImage src={user?.avatar} />
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
                                    <Badge variant="secondary" className="bg-blue-base w-fit">
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
                                onClick={handleReport}
                                className="bg-light-base hover:text-light-base gap-2 text-red-600"
                                disabled={isReporting}
                            >
                                <Flag className="h-4 w-4" />
                                {isReporting ? 'Melaporkan...' : 'Laporkan'}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
