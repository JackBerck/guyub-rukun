'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfileHeader } from '@/components/user-profile/header';
import { UserPostsGrid } from '@/components/user-profile/posts';
import Layout from '@/layouts/layout';
import { SharedData, UserProfile } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

interface UserDetailPageProps extends SharedData {
    profileUser: UserProfile;
    totalUserComments: number;
    totalUserLikes: number;
}

export default function UserProfilePage() {
    const { profileUser, totalUserComments, totalUserLikes } = usePage<UserDetailPageProps>().props;

    // Transform API data to match component expectations
    const userProfileData = useMemo(() => {
        if (!profileUser) return null;

        // Calculate total posts from all content types
        const totalPosts = (profileUser.donations?.length || 0) + (profileUser.forums?.length || 0) + (profileUser.affairs?.length || 0);

        // Count requests (donations with type 'request')
        const requests = profileUser.donations?.filter((d) => d.type === 'request')?.length || 0;
        const donations = profileUser.donations?.filter((d) => d.type === 'donation')?.length || 0;

        return {
            id: profileUser.id,
            name: profileUser.name,
            email: profileUser.email,
            avatar: profileUser.image || undefined,
            bio: undefined, // Not provided by API yet
            location: profileUser.address || undefined,
            joinDate: `Bergabung sejak ${new Date(profileUser.created_at).toLocaleDateString('id-ID', {
                month: 'long',
                year: 'numeric',
            })}`,
            isVerified: !!profileUser.email_verified_at,
            stats: {
                totalPosts,
                donations,
                requests,
                forums: profileUser.forums?.length || 0,
                events: profileUser.affairs?.length || 0,
                likes: totalUserLikes,
                comments: totalUserComments,
            },
        };
    }, [profileUser]);

    if (!profileUser || !userProfileData) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8 text-center">
                    <h1 className="mb-4 text-2xl font-bold">User tidak ditemukan</h1>
                    <p className="text-gray-600">User yang Anda cari tidak ditemukan atau telah dihapus.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head title={`Profil ${userProfileData.name}`} />

            <section className="section-padding-x py-8">
                <div className="container max-w-screen-xl">
                    <div className="space-y-8">
                        {/* User Profile Header */}
                        <UserProfileHeader user={userProfileData} />

                        {/* Posts Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Postingan</h2>
                                <div className="text-sm text-gray-500">{userProfileData.stats.totalPosts} postingan</div>
                            </div>

                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="no-scrollbar h-10 w-full justify-between overflow-x-auto rounded-none border-b-0 bg-white p-0">
                                    <TabsTrigger className='rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none' value="all">Semua ({userProfileData.stats.totalPosts})</TabsTrigger>
                                    <TabsTrigger className='rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none' value="donations">Donasi ({userProfileData.stats.donations})</TabsTrigger>
                                    <TabsTrigger className='rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none' value="requests">Bantuan ({userProfileData.stats.requests})</TabsTrigger>
                                    <TabsTrigger className='rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none' value="forums">Forum ({userProfileData.stats.forums})</TabsTrigger>
                                    <TabsTrigger className='rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none' value="events">Acara ({userProfileData.stats.events})</TabsTrigger>
                                </TabsList>{' '}
                                <TabsContent value="all" className="mt-6">
                                    <UserPostsGrid type="all" userData={profileUser} />
                                </TabsContent>
                                <TabsContent value="donations" className="mt-6">
                                    <UserPostsGrid type="donations" userData={profileUser} />
                                </TabsContent>
                                <TabsContent value="requests" className="mt-6">
                                    <UserPostsGrid type="requests" userData={profileUser} />
                                </TabsContent>
                                <TabsContent value="forums" className="mt-6">
                                    <UserPostsGrid type="forums" userData={profileUser} />
                                </TabsContent>
                                <TabsContent value="events" className="mt-6">
                                    <UserPostsGrid type="events" userData={profileUser} />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
