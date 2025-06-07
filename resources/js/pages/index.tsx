import { AffairFeeds } from '@/components/feeds/affair';
import DonationFeeds from '@/components/feeds/donation';
import { ForumFeeds } from '@/components/feeds/forum';
import { RequestFeeds } from '@/components/feeds/request';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/layout';
import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Calendar, Clock, Heart, MessageSquare, UserPlus } from 'lucide-react';

export default function Home() {
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
                                                <img
                                                    src="/img/avatars/default.jpg"
                                                    alt="Profile"
                                                    className="aspect-square w-12 overflow-hidden rounded-full object-cover"
                                                />
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

                                    {/* Main Menu */}
                                    {/* <Card className="bg-light-base text-dark-base gap-2 p-2">
                                        <CardContent className="p-0">
                                            <nav className="space-y-2">
                                                <Link
                                                    href="/"
                                                    className="flex items-center gap-3 rounded-md bg-emerald-50 p-2 text-sm font-medium text-emerald-600"
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100">
                                                        <Trending className="h-4 w-4 text-emerald-600" />
                                                    </div>
                                                    <span>Beranda</span>
                                                </Link>
                                                <Link
                                                    href="/donations"
                                                    className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-gray-600 transition duration-100 hover:bg-gray-100 md:gap-4"
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                                        <Heart className="h-4 w-4 text-gray-600" />
                                                    </div>
                                                    <span>Donasi</span>
                                                </Link>
                                                <Link
                                                    href="/stories"
                                                    className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-gray-600 transition duration-100 hover:bg-gray-100 md:gap-4"
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                                        <BadgeCheck className="h-4 w-4 text-gray-600" />
                                                    </div>
                                                    <span>Cerita</span>
                                                </Link>
                                                <Link
                                                    href="/forums"
                                                    className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-gray-600 transition duration-100 hover:bg-gray-100 md:gap-4"
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                                        <MessageSquare className="h-4 w-4 text-gray-600" />
                                                    </div>
                                                    <span>Forum</span>
                                                </Link>
                                                <Link
                                                    href="/events"
                                                    className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-gray-600 transition duration-100 hover:bg-gray-100 md:gap-4"
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                                        <Calendar className="h-4 w-4 text-gray-600" />
                                                    </div>
                                                    <span>Event</span>
                                                </Link>
                                            </nav>
                                        </CardContent>
                                    </Card> */}
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
                                                    <img
                                                        src="/img/avatars/default.jpg"
                                                        alt="Profile"
                                                        className="aspect-square w-12 overflow-hidden rounded-full object-cover"
                                                    />
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
                                                            className="text-dark-base w-full bg-light-base hover:text-dark-base flex items-center justify-start gap-2 border-pink-500 transition duration-100 hover:bg-pink-100"
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
                                    <Tabs defaultValue="donations">
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
                                            {[1, 2, 3, 4].map((item) => (
                                                <div key={item} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-500">Forum Diskusi</span>
                                                        <span className="flex items-center text-xs text-gray-500">
                                                            <MessageSquare className="mr-1 h-3 w-3" /> 24
                                                        </span>
                                                    </div>
                                                    <Link href="#" className="block font-medium transition duration-100 hover:text-emerald-600">
                                                        Tips Menyimpan Makanan Agar Tahan Lama dan Tidak Mudah Basi
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
                                            >
                                                Lihat Semua Forum
                                            </Button>
                                        </CardFooter>
                                    </Card>

                                    {/* Cerita Inspiratif */}
                                    <Card className="bg-light-base text-dark-base gap-2 p-2">
                                        <CardHeader className="p-0">
                                            <CardTitle className="text-lg">Cerita Inspiratif</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 p-0">
                                            {[1, 2, 3, 4].map((item) => (
                                                <div key={item} className="space-y-2">
                                                    <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                                                        <img
                                                            src={`/img/posts/cerita-inspiratif.jpg`}
                                                            alt={`Cerita ${item}`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <Link href="#" className="block font-medium hover:text-emerald-600">
                                                        Berbagi di Tengah Keterbatasan: Kisah Perjuangan Melawan Kelaparan
                                                    </Link>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-500">Ahmad Rizki</span>
                                                        <span className="flex items-center text-xs text-gray-500">
                                                            <Clock className="mr-1 h-3 w-3" /> 3 hari lalu
                                                        </span>
                                                    </div>
                                                    <Separator />
                                                </div>
                                            ))}
                                        </CardContent>
                                        <CardFooter className="p-0">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="extra-small-font-size hover:text-light-base w-full text-emerald-600 transition duration-100 hover:bg-emerald-600"
                                            >
                                                Lihat Semua Cerita
                                            </Button>
                                        </CardFooter>
                                    </Card>

                                    {/* Who to Follow */}
                                    <Card className="bg-light-base text-dark-base gap-2 p-2">
                                        <CardHeader className="p-0">
                                            <CardTitle className="text-lg">Rekomendasi Untuk Anda</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 p-0">
                                            {[1, 2, 3].map((item) => (
                                                <div key={item} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 overflow-hidden rounded-full bg-gray-100">
                                                            <img
                                                                src={`/img/posts/kumpul.jpg`}
                                                                alt={`User ${item}`}
                                                                className="aspect-square h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Komunitas Berbagi {item}</div>
                                                            <div className="text-xs text-gray-500">@komunitas{item}</div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="text-light-base h-8 rounded-full bg-emerald-600 transition duration-100 hover:bg-emerald-700"
                                                    >
                                                        <UserPlus className="h-4 w-4" />
                                                    </Button>
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
