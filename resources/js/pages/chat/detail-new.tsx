import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { MoreVertical, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ChatUser = {
    id: number;
    name: string;
    avatar: string | null;
    isOnline: boolean;
};

type Message = {
    id: number;
    senderId: number;
    receiverId: number;
    message: string;
    timestamp: string;
    date: string;
};

type ChatDetailPageProps = {
    chatUser: ChatUser | null;
    messages: Message[];
};

export default function ChatDetailPage() {
    const { chatUser, messages: initialMessages } = usePage<ChatDetailPageProps>().props;

    const [messages, setMessages] = useState<Message[]>(initialMessages || []);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { data, setData, post, processing, errors } = useForm({
        receiver_id: chatUser?.id,
        message: '',
    });

    console.log('ChatDetailPage rendered with:', {
        chatUser,
        messages: initialMessages,
    });

    useEffect(() => {
        setMessages(initialMessages || []);
    }, [initialMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!chatUser) {
        return (
            <Layout>
                <Head title="Chat Detail" />
                <div className="section-padding-x bg-gray-50 pt-4 pb-8 md:pb-12 lg:pt-4">
                    <div className="container max-w-screen-xl">
                        <div className="flex min-h-screen items-center justify-center bg-gray-50">
                            <div className="text-center">
                                <h2 className="mb-2 text-xl font-semibold text-gray-900">Chat tidak ditemukan</h2>
                                <Button onClick={() => router.visit('/chat')} variant="outline">
                                    Kembali
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    const handleSendMessage = () => {
        if (data.message.trim()) {
            post(route('chat.send'), {
                onSuccess: () => {
                    setData('message', '');
                },
                onError: (errors) => {
                    console.error('Error sending message:', errors);
                },
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Layout>
            <Head title={`Chat dengan ${chatUser.name}`} />
            <div className="section-padding-x bg-gray-50 pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    <div className="flex h-screen flex-col bg-gray-50">
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b bg-white px-4 py-3">
                            {/* <Button variant="ghost" size="sm" onClick={() => router.visit('/chat')} className="p-2">
                                <ArrowLeft className="h-5 w-5" />
                            </Button> */}
                            <div className="flex flex-1 items-center gap-3">
                                <div className="relative">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={`/storage/${chatUser.avatar}`} alt={`Foto ${chatUser.name}`} />
                                        <AvatarFallback>
                                            {chatUser.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    {chatUser.isOnline && (
                                        <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                                    )}
                                </div>

                                <div>
                                    <h2 className="font-medium text-gray-900">{chatUser.name}</h2>
                                    <p className="text-xs text-gray-500">{chatUser.isOnline ? 'Online' : 'Terakhir dilihat baru-baru ini'}</p>
                                </div>
                            </div>

                            <Button variant="ghost" size="sm" className="p-2">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 space-y-4 overflow-y-auto p-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.receiverId === chatUser.id ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-xs rounded-2xl px-4 py-2 lg:max-w-md ${
                                            msg.receiverId === chatUser.id ? 'bg-emerald-600 text-white' : 'border bg-white text-gray-900'
                                        }`}
                                    >
                                        <p className="text-sm">{msg.message}</p>
                                        <p className={`mt-1 text-xs ${msg.receiverId === chatUser.id ? 'text-emerald-100' : 'text-gray-500'}`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="border-t bg-white p-4">
                            <div className="flex items-end gap-2">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Ketik pesan..."
                                        value={data.message}
                                        disabled={processing}
                                        onChange={(e) => setData('message', e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="resize-none"
                                    />
                                </div>
                                <Button onClick={handleSendMessage} disabled={!data.message.trim() || processing} size="sm" className="px-3">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
