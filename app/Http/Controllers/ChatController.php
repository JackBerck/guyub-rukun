<?php

namespace App\Http\Controllers;

use App\Events\NewChatMessage;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Display the chat page.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $userId = Auth::id();

        // Ambil semua user yang pernah dichat (baik sebagai pengirim atau penerima)
        $chatUserIds = ChatMessage::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->orderByDesc('created_at')
            ->get()
            ->flatMap(function ($msg) use ($userId) {
                return [$msg->sender_id, $msg->receiver_id];
            })
            ->unique()
            ->reject(fn($id) => $id == $userId)
            ->values();

        // Ambil data user yang pernah dichat
        $users = User::whereIn('id', $chatUserIds)->get()->map(function ($user) use ($userId) {
            // Ambil pesan terakhir antara user login dan user ini
            $lastMessage = ChatMessage::where(function ($q) use ($userId, $user) {
                $q->where('sender_id', $userId)->where('receiver_id', $user->id);
            })->orWhere(function ($q) use ($userId, $user) {
                $q->where('sender_id', $user->id)->where('receiver_id', $userId);
            })
                ->orderByDesc('created_at')
                ->first();

            // Hitung pesan yang belum dibaca dari user ini ke user login
            $unreadCount = ChatMessage::where('sender_id', $user->id)
                ->where('receiver_id', $userId)
                ->where('is_read', false)
                ->count();

            return [
                'id' => $user->id,
                'name' => $user->name,
                'avatar' => $user->image ? '/storage/' . $user->image : null,
                'isOnline' => false, // Untuk real-time, update dengan presence Reverb
                'lastMessage' => $lastMessage ? [
                    'text' => $lastMessage->message,
                    'timestamp' => $lastMessage->created_at->diffForHumans(),
                    'isRead' => $lastMessage->is_read,
                    'senderId' => $lastMessage->sender_id,
                ] : null,
                'unreadCount' => $unreadCount,
            ];
        });

        return Inertia::render('chat/list', [
            'chatList' => $users,
        ]);
    }

    /**
     * Show the chat with a specific user.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $userId = Auth::id();

        // Ambil semua pesan antara user login dan user yang dipilih
        $messages = ChatMessage::where(function ($q) use ($userId, $id) {
            $q->where('sender_id', $userId)->where('receiver_id', $id);
        })->orWhere(function ($q) use ($userId, $id) {
            $q->where('sender_id', $id)->where('receiver_id', $userId);
        })
            ->orderBy('created_at')
            ->get()
            ->map(function ($msg) use ($userId) {
                return [
                    'id' => $msg->id,
                    'message' => $msg->message,
                    'isRead' => $msg->is_read,
                    'senderId' => $msg->sender_id,
                    'receiverId' => $msg->receiver_id,
                    'timestamp' => $msg->created_at->diffForHumans(),
                ];
            });

        // Tandai pesan sebagai sudah dibaca jika dikirim oleh user yang dipilih
        ChatMessage::where('sender_id', $id)
            ->where('receiver_id', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        // Ambil data user yang dipilih
        $chatUser = User::findOrFail($id);

        $chatUserData = [
            'id' => $chatUser->id,
            'name' => $chatUser->name,
            'avatar' => $chatUser->image ? '/storage/' . $chatUser->image : null,
            'isOnline' => false, // Untuk real-time, update dengan presence Reverb
        ];

        return Inertia::render('chat/detail', [
            'chatUser' => $chatUserData,
            'messages' => $messages,
        ]);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
        ]);

        
        $chatMessage = ChatMessage::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'is_read' => false,
        ]);

        // Broadcast pesan ke receiver
        broadcast(new NewChatMessage($chatMessage))->toOthers();
    }
}
