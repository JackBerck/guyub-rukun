import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import donationFeeds from '@/data/donation-feeds';
import { Link } from '@inertiajs/react';
import { BookmarkPlus, Heart, MapPin, MessageSquare, MoreHorizontal, Share2 } from 'lucide-react';

export default function DonationFeeds() {
    return (
        <div className="space-y-4 divide-y p-4">
            {donationFeeds.map((post) => (
                <div key={post.id} className="pt-0 pb-2">
                    <div className="flex gap-3">
                        {/* User Avatar */}
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                            <img src={post.user.avatar || '/img/profiles/keriliwi.jpg'} alt={post.user.name} className="h-full w-full object-cover" />
                        </div>

                        {/* Post Content */}
                        <div className="flex-1 space-y-2">
                            {/* Post Header */}
                            <div className="flex items-center justify-between">
                                <span>
                                    <Link href="/user/example" className="small-font-size font-medium hover:underline">
                                        {post.user.name}
                                    </Link>
                                    <span className="extra-small-font-size text-gray-500"> • {post.createdAt}</span>
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-light-base text-dark-base shadow-lg">
                                        <DropdownMenuItem>Simpan</DropdownMenuItem>
                                        <DropdownMenuItem>Laporkan</DropdownMenuItem>
                                        <DropdownMenuItem>Sembunyikan</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Post Title & Description */}
                            <div>
                                <Link href="/post/example">
                                    <h4 className="font-bold hover:underline">{post.content.title}</h4>
                                </Link>
                                <p className="small-font-size mt-1 text-gray-600">{post.content.description}</p>
                            </div>

                            {/* Post Meta */}
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className={`extra-small-font-size inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${
                                        post.content.urgency === 'mendesak' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                >
                                    {post.content.urgency === 'mendesak' ? 'Mendesak' : 'Sedang'}
                                </span>
                                <span className="extra-small-font-size inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-medium text-emerald-800">
                                    {post.content.category}
                                </span>
                                <span className="extra-small-font-size inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-800">
                                    <MapPin className="h-3 w-3" /> {post.content.location}
                                </span>
                            </div>

                            {/* Post Image */}
                            {post.content.images && post.content.images.length > 0 && (
                                <div className="overflow-hidden rounded-lg">
                                    <img
                                        src={post.content.images[0] || '/placeholder.svg'}
                                        alt={post.content.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Post Actions */}
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:bg-transparent hover:text-red-500">
                                    <Heart className="h-4 w-4" />
                                    <span>{post.stats.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:bg-transparent hover:text-blue-500">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{post.stats.comments}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:bg-transparent hover:text-green-500">
                                    <Share2 className="h-4 w-4" />
                                    <span>{post.stats.shares}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:bg-transparent hover:text-yellow-500">
                                    <BookmarkPlus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Load More Button */}
            <div className="flex justify-center">
                <Button variant="outline" className="w-full bg-light-base text-dark-base hover:bg-gray-100 border-gray-200 hover:text-dark-base transition duration-100">
                    Muat Lebih Banyak
                </Button>
            </div>
        </div>
    );
}
