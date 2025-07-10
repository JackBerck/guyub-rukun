'use client';

import { Calendar, Clock, MapPin, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Affair, Donation, Forum, UserProfile } from '@/types';
import { Link } from '@inertiajs/react';

interface Post {
    id: number;
    type: 'donation' | 'request' | 'forum' | 'affair';
    title: string;
    description: string;
    image?: string;
    category: string;
    location?: string;
    urgency?: 'low' | 'medium' | 'high';
    date?: string;
    time?: string;
    createdAt: string;
    comments?: number;
    isLiked: boolean;
    slug?: string;
}

interface UserPostsGridProps {
    type: 'all' | 'donations' | 'requests' | 'forums' | 'events';
    userData: UserProfile;
}

export function UserPostsGrid({ type, userData }: UserPostsGridProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const transformDataToPosts = () => {
            setIsLoading(true);

            let allPosts: Post[] = [];

            // Transform donations to posts
            if (userData.donations) {
                const donationPosts = userData.donations.map(
                    (donation: Donation): Post => ({
                        id: donation.id,
                        type: donation.type === 'request' ? 'request' : 'donation',
                        title: donation.title,
                        description: donation.description,
                        image:
                            donation.donation_images && donation.donation_images.length > 0
                                ? `/storage/${donation.donation_images[0].image}`
                                : undefined,
                        category: donation.donation_category?.name || 'Kategori',
                        location: donation.address,
                        urgency: donation.urgency as 'low' | 'medium' | 'high' | undefined,
                        createdAt: new Date(donation.created_at).toLocaleDateString('id-ID'),
                        comments: donation.comments_count || 0,
                        isLiked: false,
                        slug: donation.slug,
                    }),
                );
                allPosts = [...allPosts, ...donationPosts];
            }

            // Transform forums to posts
            if (userData.forums) {
                const forumPosts = userData.forums.map(
                    (forum: Forum): Post => ({
                        id: forum.id,
                        type: 'forum',
                        title: forum.title,
                        description: forum.description,
                        image: forum.thumbnail ? `/storage/${forum.thumbnail}` : undefined,
                        category: forum.forum_category?.name || 'Forum',
                        createdAt: new Date(forum.created_at).toLocaleDateString('id-ID'),
                        comments: forum.comments_count || 0,
                        isLiked: false,
                        slug: forum.slug,
                    }),
                );
                allPosts = [...allPosts, ...forumPosts];
            }

            // Transform affairs to posts
            if (userData.affairs) {
                const affairPosts = userData.affairs.map(
                    (affair: Affair): Post => ({
                        id: affair.id,
                        type: 'affair',
                        title: affair.title,
                        description: affair.description,
                        image: affair.thumbnail ? `/storage/${affair.thumbnail}` : undefined,
                        category: affair.affair_category?.name || 'Acara',
                        location: affair.location,
                        date: affair.date,
                        time: affair.time,
                        createdAt: new Date(affair.created_at).toLocaleDateString('id-ID'),
                        // comments: 0, // Not available in current API
                        isLiked: false,
                        slug: affair.slug,
                    }),
                );
                allPosts = [...allPosts, ...affairPosts];
            }

            // Filter posts based on type
            let filteredPosts = allPosts;
            if (type !== 'all') {
                const typeMap = {
                    donations: 'donation',
                    requests: 'request',
                    forums: 'forum',
                    events: 'affair', // affairs are events
                };
                filteredPosts = allPosts.filter((post) => post.type === typeMap[type]);
            }

            // Sort by creation date (newest first)
            filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setPosts(filteredPosts);
            setIsLoading(false);
        };

        transformDataToPosts();
    }, [userData, type]);

    const getTypeColor = (postType: string) => {
        switch (postType) {
            case 'donation':
                return 'bg-emerald-100 text-emerald-800';
            case 'request':
                return 'bg-orange-100 text-orange-800';
            case 'forum':
                return 'bg-blue-100 text-blue-800';
            case 'affair':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getUrgencyColor = (urgency?: string) => {
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

    const getDetailLink = (post: Post) => {
        switch (post.type) {
            case 'donation':
                return `/donation/${post.slug}`;
            case 'request':
                return `/request/${post.slug}`;
            case 'forum':
                return `/forum/${post.slug}`;
            case 'affair':
                return `/affair/${post.slug}`;
            default:
                return '#';
        }
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <div className="h-48 rounded-t-lg bg-gray-200"></div>
                        <CardContent className="space-y-3 p-4">
                            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                            <div className="h-3 w-full rounded bg-gray-200"></div>
                            <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="mb-4 text-gray-500">
                    {type === 'all'
                        ? 'Belum ada postingan yang tersedia'
                        : `Belum ada ${type === 'donations' ? 'donasi' : type === 'requests' ? 'permintaan bantuan' : type === 'forums' ? 'forum' : 'acara'} yang tersedia`}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <Card key={post.id} className="group bg-light-base text-dark-base transition-shadow hover:shadow-lg">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <Badge className={getTypeColor(post.type)}>
                                {post.type === 'donation'
                                    ? 'Donasi'
                                    : post.type === 'request'
                                      ? 'Bantuan'
                                      : post.type === 'forum'
                                        ? 'Forum'
                                        : 'Acara'}
                            </Badge>
                            {post.urgency && (
                                <Badge className={getUrgencyColor(post.urgency)}>
                                    {post.urgency === 'high' ? 'Mendesak' : post.urgency === 'medium' ? 'Sedang' : 'Rendah'}
                                </Badge>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {post.image && (
                            <div className="aspect-video w-full overflow-hidden rounded-lg">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Link href={getDetailLink(post)}>
                                <h3 className="line-clamp-2 cursor-pointer font-semibold hover:text-emerald-600">{post.title}</h3>
                            </Link>
                            <p className="line-clamp-3 text-sm text-gray-600">{post.description}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Badge variant="outline" className="border-green-500 text-green-500">
                                {post.category}
                            </Badge>
                            {post.location && (
                                <div className="flex items-center gap-1 truncate">
                                    <MapPin className="h-3 w-3" />
                                    <span className="">{post.location}</span>
                                </div>
                            )}
                            {post.date && post.time && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{post.date}</span>
                                    <Clock className="h-3 w-3" />
                                    <span>{post.time}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between border-t pt-2">
                            <div className="flex items-center gap-4">
                                {post.type !== 'affair' && (
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{post.comments}</span>
                                    </div>
                                )}
                                {/* <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                                    <Share2 className="h-4 w-4" />
                                </Button> */}
                            </div>
                            <div className="text-xs text-gray-400">{post.createdAt}</div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
