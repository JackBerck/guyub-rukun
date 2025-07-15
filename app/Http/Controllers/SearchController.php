<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Forum;
use App\Models\Affair;
use App\Models\DonationCategory;
use App\Models\ForumCategory;
use App\Models\AffairCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->input('q', '');
        $type = $request->input('type', 'all');
        $category = $request->input('category', 'all');
        $urgency = $request->input('urgency', 'all');
        $location = $request->input('location', '');
        $dateRange = $request->input('date', 'all');

        $results = collect();

        // Handle Donations
        if ($type === 'all' || $type === 'donation') {
            $donations = $this->getDonations($keyword, $category, $urgency, $location, $dateRange, 'donation');
            $results = $results->concat($donations);
        }

        // Handle Requests
        if ($type === 'all' || $type === 'request') {
            $requests = $this->getDonations($keyword, $category, $urgency, $location, $dateRange, 'request');
            $results = $results->concat($requests);
        }

        // Handle Forums
        if ($type === 'all' || $type === 'forum') {
            $forums = $this->getForums($keyword, $category, $dateRange);
            $results = $results->concat($forums);
        }

        // Handle Events
        if ($type === 'all' || $type === 'affair') {
            $events = $this->getEvents($keyword, $category, $location, $dateRange);
            $results = $results->concat($events);
        }

        // Sort results by created_at descending
        $results = $results->sortByDesc('created_at')->values();

        $categories = [
            'donation' => DonationCategory::select('id', 'name')->get(),
            'forum' => ForumCategory::select('id', 'name')->get(),
            'affair' => AffairCategory::select('id', 'name')->get(),
            'request' => DonationCategory::select('id', 'name')->get(),
        ];

        return Inertia::render('search/index', [
            'posts' => $results,
            'categories' => $categories,
            'filters' => [
                'keyword' => $keyword,
                'type' => $type,
                'category' => $category,
                'urgency' => $urgency,
                'location' => $location,
                'dateRange' => $dateRange,
            ],
        ]);
    }

    private function getDonations($keyword, $category, $urgency, $location, $dateRange, $type)
    {
        $query = Donation::with(['user', 'donationCategory', 'donationImages']);

        // Jika table donations memiliki kolom 'type' untuk membedakan donation dan request
        // Uncomment line berikut jika kolom 'type' ada di table donations
        $query->where('type', $type);
        
        $donations = $query
            ->when($keyword, function ($q) use ($keyword) {
                return $q->where(function ($subQuery) use ($keyword) {
                    $subQuery->where('title', 'like', "%$keyword%")
                        ->orWhere('description', 'like', "%$keyword%");
                });
            })
            ->when($category !== 'all', function ($q) use ($category) {
                return $q->whereHas('donationCategory', function ($q2) use ($category) {
                    $q2->where('name', $category);
                });
            })
            ->when($urgency !== 'all', function ($q) use ($urgency) {
                return $q->where('urgency', $urgency);
            })
            ->when($location, function ($q) use ($location) {
                return $q->where('address', 'like', "%$location%");
            })
            ->when($dateRange !== 'all', function ($q) use ($dateRange) {
                $this->applyDateFilter($q, $dateRange);
            })
            ->get();

        return $donations->map(function ($item) use ($type) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'description' => $item->description,
                'type' => $type,
                'urgency' => $item->urgency ?? null,
                'phone_number' => $item->phone_number ?? null,
                'address' => $item->address ?? null,
                'status' => $item->status ?? false,
                'thumbnail' => $item->donationImages->first()?->image ?? null,
                'is_popular' => $item->is_popular ?? false,
                'user' => [
                    'id' => $item->user->id,
                    'name' => $item->user->name,
                    'email' => $item->user->email,
                    'image' => $item->user->image ?? null,
                    'phone_number' => $item->user->phone_number ?? null,
                ],
                'category' => [
                    'id' => $item->donationCategory->id ?? null,
                    'name' => $item->donationCategory->name ?? 'Uncategorized',
                ],
                'comments_count' => $item->comments()->count(),
                'created_at' => $item->created_at->toISOString(),
                'updated_at' => $item->updated_at->toISOString(),
            ];
        });
    }

    private function getForums($keyword, $category, $dateRange)
    {
        $forums = Forum::with(['user', 'forumCategory'])
            ->when($keyword, function ($q) use ($keyword) {
                return $q->where(function ($subQuery) use ($keyword) {
                    $subQuery->where('title', 'like', "%$keyword%")
                        ->orWhere('description', 'like', "%$keyword%");
                });
            })
            ->when($category !== 'all', function ($q) use ($category) {
                return $q->whereHas('forumCategory', function ($q2) use ($category) {
                    $q2->where('name', $category);
                });
            })
            ->when($dateRange !== 'all', function ($q) use ($dateRange) {
                $this->applyDateFilter($q, $dateRange);
            })
            ->get();

        return $forums->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'description' => $item->description,
                'thumbnail' => $item->thumbnail ?? null,
                'type' => 'forum',
                'user' => [
                    'id' => $item->user->id,
                    'name' => $item->user->name,
                    'email' => $item->user->email,
                    'image' => $item->user->image ?? null,
                    'phone_number' => $item->user->phone_number ?? null,
                ],
                'category' => [
                    'id' => $item->forumCategory->id ?? null,
                    'name' => $item->forumCategory->name ?? 'Uncategorized',
                ],
                'comments_count' => $item->comments()->count(),
                'likes_count' => $item->likedByUsers()->count() ?? 0,
                // 'views_count' => $item->views_count ?? null,
                'created_at' => $item->created_at->toISOString(),
                'updated_at' => $item->updated_at->toISOString(),
            ];
        });
    }

    private function getEvents($keyword, $category, $location, $dateRange)
    {
        $events = Affair::with(['user', 'affairCategory'])
            ->when($keyword, function ($q) use ($keyword) {
                return $q->where(function ($subQuery) use ($keyword) {
                    $subQuery->where('title', 'like', "%$keyword%")
                        ->orWhere('description', 'like', "%$keyword%");
                });
            })
            ->when($category !== 'all', function ($q) use ($category) {
                return $q->whereHas('affairCategory', function ($q2) use ($category) {
                    $q2->where('name', $category);
                });
            })
            ->when($location, function ($q) use ($location) {
                return $q->where('location', 'like', "%$location%");
            })
            ->when($dateRange !== 'all', function ($q) use ($dateRange) {
                $this->applyDateFilter($q, $dateRange);
            })
            ->get();

        return $events->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'description' => $item->description,
                'date' => $item->date ?? null,
                'time' => $item->time ?? null,
                'location' => $item->location ?? null,
                'thumbnail' => $item->thumbnail ?? null,
                'type' => 'affair',
                'user' => [
                    'id' => $item->user->id,
                    'name' => $item->user->name,
                    'email' => $item->user->email,
                    'image' => $item->user->image ?? null,
                    'phone_number' => $item->user->phone_number ?? null,
                ],
                'category' => [
                    'id' => $item->affairCategory->id ?? null,
                    'name' => $item->affairCategory->name ?? 'Uncategorized',
                ],
                // 'comments_count' => $item->comments()->count() ?? 0,
                // 'likes_count' => $item->likedByUsers()->count() ?? 0,
                // 'participants_count' => $item->participants()->count() ?? 0,
                'created_at' => $item->created_at->toISOString(),
                'updated_at' => $item->updated_at->toISOString(),
            ];
        });
    }

    private function applyDateFilter($query, $dateRange)
    {
        switch ($dateRange) {
            case 'today':
                $query->whereDate('created_at', now());
                break;
            case 'week':
                $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                break;
            case 'month':
                $query->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year);
                break;
            case 'year':
                $query->whereYear('created_at', now()->year);
                break;
        }
    }
}
