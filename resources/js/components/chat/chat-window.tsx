import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MoreVertical, Phone, Send, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Mock data untuk messages berdasarkan chat ID
const messagesData: Record<number, any[]> = {
    1: [
        {
            id: 1,
            senderId: 2,
            text: 'Halo! Saya lihat postingan donasi makanan Anda',
            timestamp: '10:30',
            date: '2024-01-15',
        },
        {
            id: 2,
            senderId: 1,
            text: 'Halo juga! Iya, masih tersedia kok. Anda berminat?',
            timestamp: '10:32',
            date: '2024-01-15',
        },
        {
            id: 3,
            senderId: 2,
            text: 'Iya, saya sangat berminat. Kebetulan sedang mengadakan acara sosial di kampung',
            timestamp: '10:33',
            date: '2024-01-15',
        },
        {
            id: 4,
            senderId: 1,
            text: 'Wah bagus sekali! Lokasinya dimana ya?',
            timestamp: '10:35',
            date: '2024-01-15',
        },
        {
            id: 5,
            senderId: 2,
            text: 'Di Kelurahan Sukamaju, Kecamatan Bandung Timur. Kira-kira 15 menit dari pusat kota',
            timestamp: '10:36',
            date: '2024-01-15',
        },
        {
            id: 6,
            senderId: 1,
            text: 'Oke, tidak terlalu jauh. Kapan bisa diambil?',
            timestamp: '10:38',
            date: '2024-01-15',
        },
        {
            id: 7,
            senderId: 2,
            text: 'Terima kasih sudah mau membantu dengan donasi makanannya!',
            timestamp: '10:40',
            date: '2024-01-15',
        },
    ],
    2: [
        {
            id: 1,
            senderId: 3,
            text: 'Permisi, saya tertarik dengan acara bakti sosial yang Anda posting',
            timestamp: '14:20',
            date: '2024-01-15',
        },
        {
            id: 2,
            senderId: 1,
            text: 'Halo! Terima kasih sudah tertarik. Acaranya besok jam 9 pagi',
            timestamp: '14:25',
            date: '2024-01-15',
        },
        {
            id: 3,
            senderId: 3,
            text: 'Baik, saya akan datang ke lokasi jam 3 sore',
            timestamp: '14:30',
            date: '2024-01-15',
        },
    ],
    3: [
        {
            id: 1,
            senderId: 4,
            text: 'Halo, saya lihat postingan Anda tentang donasi makanan',
            timestamp: '09:15',
            date: '2024-01-15',
        },
        {
            id: 2,
            senderId: 1,
            text: 'Halo! Iya, masih ada beberapa porsi tersisa',
            timestamp: '09:20',
            date: '2024-01-15',
        },
        {
            id: 3,
            senderId: 4,
            text: 'Apakah masih ada makanan yang tersedia?',
            timestamp: '09:25',
            date: '2024-01-15',
        },
    ],
    4: [
        {
            id: 1,
            senderId: 5,
            text: 'Terima kasih sudah mengundang saya ke acara bakti sosial',
            timestamp: '16:00',
            date: '2024-01-14',
        },
        {
            id: 2,
            senderId: 1,
            text: 'Sama-sama! Senang bisa bekerja sama',
            timestamp: '16:05',
            date: '2024-01-14',
        },
        {
            id: 3,
            senderId: 5,
            text: 'Oke, sampai jumpa besok di acara bakti sosial',
            timestamp: '16:10',
            date: '2024-01-14',
        },
    ],
    5: [
        {
            id: 1,
            senderId: 1,
            text: 'Bagaimana pendapat Anda tentang forum diskusi kemarin?',
            timestamp: '11:30',
            date: '2024-01-13',
        },
        {
            id: 2,
            senderId: 6,
            text: 'Wah, ide yang bagus untuk forum diskusi ini',
            timestamp: '11:35',
            date: '2024-01-13',
        },
        {
            id: 3,
            senderId: 1,
            text: 'Terima kasih! Semoga bisa membantu komunitas',
            timestamp: '11:40',
            date: '2024-01-13',
        },
    ],
};

const currentUserId = 1; // ID user yang sedang login

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

interface ChatWindowProps {
    chat?: Chat;
    onBack?: () => void;
    isMobile?: boolean;
}

export default function ChatWindow({ chat, onBack, isMobile = false }: ChatWindowProps) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(chat ? messagesData[chat.id] || [] : []);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (chat) {
            setMessages(messagesData[chat.id] || []);
        }
    }, [chat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!chat) {
        return (
            <div className="flex h-full items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                        <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">Pilih percakapan</h3>
                    <p className="text-gray-500">Pilih percakapan dari daftar di sebelah kiri untuk mulai chatting</p>
                </div>
            </div>
        );
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                senderId: currentUserId,
                text: message.trim(),
                timestamp: new Date().toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                date: new Date().toISOString().split('T')[0],
            };

            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex h-full flex-col bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
                {isMobile && onBack && (
                    <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                )}

                <div className="flex flex-1 items-center gap-3">
                    <div className="relative">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.user.avatar || '/placeholder.svg'} alt={chat.user.name} />
                            <AvatarFallback>
                                {chat.user.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        {chat.user.isOnline && (
                            <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h2 className="font-medium text-gray-900">{chat.user.name}</h2>
                        <p className="text-xs text-gray-500">{chat.user.isOnline ? 'Online' : 'Terakhir dilihat baru-baru ini'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="p-2">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                        <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-xs rounded-2xl px-4 py-2 lg:max-w-md ${
                                msg.senderId === currentUserId
                                    ? 'rounded-br-md bg-emerald-600 text-white'
                                    : 'rounded-bl-md border bg-white text-gray-900 shadow-sm'
                            }`}
                        >
                            <p className="text-sm">{msg.text}</p>
                            <p className={`mt-1 text-xs ${msg.senderId === currentUserId ? 'text-emerald-100' : 'text-gray-500'}`}>{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-end gap-3">
                    <div className="flex-1">
                        <Input
                            placeholder="Ketik pesan..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="rounded-full border-0 bg-gray-50 px-4"
                        />
                    </div>
                    <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        size="sm"
                        className="rounded-full bg-emerald-600 px-4 hover:bg-emerald-700"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
