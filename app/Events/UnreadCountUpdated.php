<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UnreadCountUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userId;
    public $fromUserId;
    public $unreadCount;

    /**
     * Create a new event instance.
     */
    public function __construct($userId, $fromUserId, $unreadCount)
    {
        $this->userId = $userId;
        $this->fromUserId = $fromUserId;
        $this->unreadCount = $unreadCount;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat.' . $this->userId),
        ];
    }

    public function broadcastWith()
    {
        return [
            'fromUserId' => $this->fromUserId,
            'unreadCount' => $this->unreadCount,
        ];
    }
}
