import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { MessageCircle, Search } from 'lucide-react';
import { useState } from 'react';

type ChatUser = {
    id: number;
    name: string;
    avatar?: string | null;
    isOnline?: boolean;
    lastMessage: {
        text: string;
        timestamp: string;
        isRead: boolean;
        senderId: number;
    } | null;
    unreadCount: number;
};

export default function ChatPage() {
    const { chatList = [] } = usePage<{ chatList: ChatUser[] }>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = chatList.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <Layout>
            <Head title="Pesan" />
            <div className="section-padding-x min-h-screen bg-gray-50 pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    {/* Header */}
                    <div className="sticky top-0 z-10 border-b bg-white">
                        <div className="px-4 py-4">
                            <div className="mb-4 flex items-center gap-3">
                                <MessageCircle className="h-6 w-6 text-emerald-600" />
                                <h1 className="text-xl font-semibold text-gray-900">Pesan</h1>
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Cari percakapan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Chat List */}
                    <div className="bg-white">
                        {filteredChats.length === 0 ? (
                            <div className="py-12 text-center">
                                <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                                <p className="text-gray-500">{searchQuery ? 'Tidak ada percakapan yang ditemukan' : 'Belum ada percakapan'}</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {filteredChats.map((chat) => (
                                    <Link key={chat.id} href={`/chat/${chat.id}`} className="block transition-colors hover:bg-gray-50">
                                        <div className="px-4 py-4">
                                            <div className="flex items-start gap-3">
                                                {/* Avatar */}
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={chat.avatar || '/placeholder.svg'} alt={chat.name} />
                                                        <AvatarFallback>
                                                            {chat.name
                                                                .split(' ')
                                                                .map((n) => n[0])
                                                                .join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {chat.isOnline && (
                                                        <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                                                    )}
                                                </div>

                                                {/* Chat Info */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <h3 className="truncate font-medium text-gray-900">{chat.name}</h3>
                                                        <span className="flex-shrink-0 text-xs text-gray-500">{chat.lastMessage?.timestamp}</span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <p
                                                            className={`truncate text-sm ${
                                                                chat.lastMessage?.isRead ? 'text-gray-500' : 'font-medium text-gray-900'
                                                            }`}
                                                        >
                                                            {chat.lastMessage?.text || <span className="text-gray-400">Belum ada pesan</span>}
                                                        </p>

                                                        {chat.unreadCount > 0 && (
                                                            <div className="ml-2 flex-shrink-0">
                                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-medium text-white">
                                                                    {chat.unreadCount}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
