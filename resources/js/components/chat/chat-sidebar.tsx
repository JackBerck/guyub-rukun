import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, MoreVertical, Search } from 'lucide-react';
import { useState } from 'react';

interface Chat {
    id: number;
    user: {
        id: number;
        name: string;
        avatar: string;
        isOnline: boolean;
    };
    lastMessage: {
        text: string;
        timestamp: string;
        isRead: boolean;
        senderId: number;
    };
    unreadCount: number;
}

interface ChatSidebarProps {
    chats: Chat[];
    selectedChatId: number | null;
    onSelectChat: (chatId: number) => void;
}

export default function ChatSidebar({ chats, selectedChatId, onSelectChat }: ChatSidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = chats.filter((chat) => chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex h-full flex-col bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="h-6 w-6 text-emerald-600" />
                        <h1 className="text-xl font-semibold text-gray-900">Pesan</h1>
                    </div>
                    <Button variant="ghost" size="sm" className="p-2">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        placeholder="Cari percakapan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0 bg-gray-50 pl-10"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {filteredChats.length === 0 ? (
                    <div className="py-12 text-center">
                        <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                        <p className="text-gray-500">{searchQuery ? 'Tidak ada percakapan yang ditemukan' : 'Belum ada percakapan'}</p>
                    </div>
                ) : (
                    <div>
                        {filteredChats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => onSelectChat(chat.id)}
                                className={`cursor-pointer border-l-4 px-4 py-3 transition-colors ${
                                    selectedChatId === chat.id ? 'border-emerald-600 bg-emerald-50' : 'border-transparent hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={chat.user.avatar || '/placeholder.svg'} alt={chat.user.name} />
                                            <AvatarFallback>
                                                {chat.user.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        {chat.user.isOnline && (
                                            <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                                        )}
                                    </div>

                                    {/* Chat Info */}
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center justify-between">
                                            <h3
                                                className={`truncate font-medium ${
                                                    selectedChatId === chat.id ? 'text-emerald-700' : 'text-gray-900'
                                                }`}
                                            >
                                                {chat.user.name}
                                            </h3>
                                            <span className="flex-shrink-0 text-xs text-gray-500">{chat.lastMessage.timestamp}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p
                                                className={`truncate text-sm ${
                                                    chat.lastMessage.isRead ? 'text-gray-500' : 'font-medium text-gray-900'
                                                }`}
                                            >
                                                {chat.lastMessage.text}
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
