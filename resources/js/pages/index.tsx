import { AffairFeeds } from '@/components/feeds/affair';
import DonationFeeds from '@/components/feeds/donation';
import { ForumFeeds } from '@/components/feeds/forum';
import { RequestFeeds } from '@/components/feeds/request';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dummyCommunities from '@/data/dummies/communities';
import Layout from '@/layouts/layout';
import { Forum, User } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BadgeCheck, Calendar, Heart, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const { auth, popularForums } = usePage<{ auth: { user: User }; popularForums: Forum[] }>().props;
    const user: User = auth?.user;

    const [activeTab, setActiveTab] = useState('donations');

    return (
        <Layout>
            <Head title="Beranda" />
            <section className="section-padding-x pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    {/* Feed Layout */}
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                            {/* Sidebar Kiri - Profile & Menu (hanya tampil di desktop) */}
                            <aside className="hidden lg:block">
                                <div className="sticky top-20 space-y-4 lg:top-24">
                                    {/* Profile Card */}
                                    <Card className="bg-light-base text-dark-base gap-2 p-2">
                                        <CardHeader className="p-0">
                                            <div className="flex items-start gap-2">
                                                <Avatar className="text-dark-base large-font-size aspect-square h-12 w-12 shrink-0 font-semibold">
                                                    <AvatarImage src={user?.image ? `/storage/${user.image}` : ''} alt={user?.name || 'User'} />
                                                    <AvatarFallback>{user?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle>Selamat datang!</CardTitle>
                                                    <CardDescription>Apa yang ingin Anda lakukan hari ini?</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link href="/donate">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-dark-base bg-light-base hover:text-dark-base flex w-full items-center justify-center gap-2 border-pink-500 transition duration-100 hover:bg-pink-100"
                                                    >
                                                        <Heart className="h-4 w-4 text-pink-500" />
                                                        <span>Donasi</span>
                                                    </Button>
                                                </Link>
                                                <Link href="/open-forum">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-dark-base bg-light-base hover:text-dark-base flex w-full items-center justify-center gap-2 border-blue-500 transition duration-100 hover:bg-blue-100"
                                                    >
                                                        <MessageSquare className="h-4 w-4 text-blue-500" />
                                                        <span>Forum</span>
                                                    </Button>
                                                </Link>
                                                <Link href="/need-help">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-dark-base bg-light-base hover:text-dark-base flex w-full items-center justify-center gap-2 border-emerald-500 transition duration-100 hover:bg-emerald-100"
                                                    >
                                                        <BadgeCheck className="h-4 w-4 text-emerald-500" />
                                                        <span>Butuh Bantuan</span>
                                                    </Button>
                                                </Link>
                                                <Link href="/share-affair">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-dark-base bg-light-base hover:text-dark-base flex w-full items-center justify-center gap-2 border-purple-500 transition duration-100 hover:bg-purple-100"
                                                    >
                                                        <Calendar className="h-4 w-4 text-purple-500" />
                                                        <span>Event</span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-0">
                                            <Link href="/settings" className="w-full">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:text-light-base w-full text-emerald-600 transition duration-100 hover:bg-emerald-600"
                                                >
                                                    Lihat Profil Lengkap
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </aside>

                            {/* Main Content - Feed */}
                            <div className="md:col-span-2">
                                {/* Sidebar Kiri - Profile & Menu (hanya tampil di desktop) */}
                                <aside className="mb-4 block lg:hidden">
                                    <div className="sticky top-20 space-y-4">
                                        {/* Profile Card */}
                                        <Card className="bg-light-base text-dark-base gap-2 p-2">
                                            <CardHeader className="p-0">
                                                <div className="flex items-start gap-2">
                                                    <Avatar className="text-dark-base large-font-size aspect-square h-12 w-12 shrink-0">
                                                        <AvatarImage
                                                            src={user?.image ? `/storage/${user.image}` : '/placeholder.svg'}
                                                            alt={user?.name || 'User'}
                                                        />
                                                        <AvatarFallback>{user?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle>Selamat datang!</CardTitle>
                                                        <CardDescription>Apa yang ingin Anda lakukan hari ini?</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Link href="/donate">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-dark-base bg-light-base hover:text-dark-base flex w-full items-center justify-start gap-2 border-pink-500 transition duration-100 hover:bg-pink-100"
                                                        >
                                                            <Heart className="h-4 w-4 text-pink-500" />
                                                            <span>Donasi</span>
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-dark-base bg-light-base hover:text-dark-base flex items-center justify-start gap-2 border-blue-500 transition duration-100 hover:bg-blue-100"
                                                    >
                                                        <Link href="/open-forum" className="flex items-center justify-start gap-2">
                                                            <MessageSquare className="h-4 w-4 text-blue-500" />
                                                            <span>Forum</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-dark-base bg-light-base hover:text-dark-base flex items-center justify-start gap-2 border-emerald-500 transition duration-100 hover:bg-emerald-100"
                                                    >
                                                        <Link href="/need-help" className="flex items-center justify-start gap-2">
                                                            <BadgeCheck className="h-4 w-4 text-emerald-500" />
                                                            <span>Butuh Bantuan</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-dark-base bg-light-base hover:text-dark-base flex items-center justify-start gap-2 border-purple-500 transition duration-100 hover:bg-purple-100"
                                                    >
                                                        <Link href="/share-affair" className="flex items-center justify-start gap-2">
                                                            <Calendar className="h-4 w-4 text-purple-500" />
                                                            <span>Event</span>
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:text-light-base w-full text-emerald-600 transition duration-100 hover:bg-emerald-600"
                                                >
                                                    Lihat Profil Lengkap
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </aside>
                                {/* Feed Tabs */}
                                <Card className="bg-light-base text-dark-base mb-4 overflow-hidden p-0">
                                    <Tabs defaultValue="donations" value={activeTab} onValueChange={setActiveTab}>
                                        <div className="border-b">
                                            <div className="flex items-center px-4">
                                                <TabsList className="no-scrollbar h-10 w-full justify-start overflow-x-auto rounded-none border-b-0 bg-white p-0">
                                                    {/* <TabsTrigger
                                                        value="all"
                                                        className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none"
                                                    >
                                                        Semua
                                                    </TabsTrigger> */}
                                                    <TabsTrigger
                                                        value="donations"
                                                        className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none"
                                                    >
                                                        Donasi
                                                    </TabsTrigger>
                                                    <TabsTrigger
                                                        value="request"
                                                        className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none"
                                                    >
                                                        Butuh Bantuan
                                                    </TabsTrigger>
                                                    <TabsTrigger
                                                        value="forums"
                                                        className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none"
                                                    >
                                                        Forum
                                                    </TabsTrigger>
                                                    <TabsTrigger
                                                        value="affairs"
                                                        className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-700 data-[state=active]:shadow-none"
                                                    >
                                                        Acara
                                                    </TabsTrigger>
                                                </TabsList>
                                            </div>
                                        </div>

                                        {/* All Tab Content */}
                                        {/* <TabsContent value="all" className="m-0">
                                            <DonationFeeds />
                                        </TabsContent> */}

                                        {/* Other tabs would have similar content */}
                                        <TabsContent value="donations" className="m-0">
                                            <DonationFeeds />
                                        </TabsContent>
                                        <TabsContent value="request" className="m-0">
                                            <RequestFeeds />
                                        </TabsContent>
                                        <TabsContent value="forums" className="m-0">
                                            <ForumFeeds />
                                        </TabsContent>
                                        <TabsContent value="affairs" className="m-0">
                                            <AffairFeeds />
                                        </TabsContent>
                                    </Tabs>
                                </Card>
                            </div>

                            {/* Sidebar Kanan - Trending & Suggestions */}
                            <aside>
                                <div className="sticky top-20 space-y-6 lg:top-24">
                                    {/* Forum Populer */}
                                    <Card className="bg-light-base text-dark-base gap-2 p-2">
                                        <CardHeader className="p-0">
                                            <CardTitle className="text-lg">Forum Populer</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 p-0">
                                            {popularForums.map((forum, index) => (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-500">{forum.forum_category.name}</span>
                                                        <span className="flex items-center text-xs text-gray-500">
                                                            <MessageSquare className="mr-1 h-3 w-3" /> {forum.comments?.length || 0}
                                                        </span>
                                                    </div>
                                                    <Link
                                                        href={`/forum/${forum.slug}`}
                                                        className="block font-medium transition duration-100 hover:text-emerald-600"
                                                    >
                                                        {forum.title}
                                                    </Link>
                                                    <Separator />
                                                </div>
                                            ))}
                                        </CardContent>
                                        <CardFooter className="p-0">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="extra-small-font-size hover:text-light-base w-full text-emerald-600 transition duration-100 hover:bg-emerald-600"
                                                onClick={() => setActiveTab('forums')}
                                            >
                                                Lihat Semua Forum
                                            </Button>
                                        </CardFooter>
                                    </Card>

                                    {/* Who to Follow */}
                                    <Card className="bg-light-base text-dark-base gap-2 p-2">
                                        <CardHeader className="p-0">
                                            <CardTitle className="text-lg">Rekomendasi Untuk Anda</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 p-0">
                                            {dummyCommunities.map((community, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 overflow-hidden rounded-full bg-gray-100">
                                                            <img
                                                                src={community.image}
                                                                alt={`${community.name} Image`}
                                                                className="aspect-square h-full w-full object-cover self-center"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{community.name}</div>
                                                            <div className="text-xs text-gray-500">@{community.instagram}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                        <CardFooter className="p-0">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="extra-small-font-size hover:text-light-base w-full text-emerald-600 transition duration-100 hover:bg-emerald-600"
                                            >
                                                Lihat Lainnya
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
