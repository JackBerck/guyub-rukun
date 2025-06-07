<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\PhotoProfileUpdateRequest as RequestsPhotoProfileUpdateRequest;
use App\Http\Requests\Settings\PhotoProfileUpdateRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\Donation;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $currentUser = Auth::user()->loadCount([
            'donations',
            'forums',
            'affairs',
            'donations as donations_count' => function ($query) {
                $query->where('type', 'donation');
            },
            'donations as requests_count' => function ($query) {
                $query->where('type', 'request');
            }
        ]);

        return Inertia::render('profile/main', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'currentUser' => $currentUser,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return back()->with('status', 'Profil berhasil diperbarui.');
    }

    /**
     * Update photo profile user
     */
    public function updateImage(RequestsPhotoProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        try {
            // Delete old image if exists
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }

            // Store new image
            $path = $request->file('image')->store('profile-photos', 'public');

            // Update user image path
            $user->image = $path;
            $user->save();

            return back()->with('status', 'Foto profil berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('Profile image upload error: ' . $e->getMessage());

            return back()->withErrors([
                'image' => 'Gagal mengunggah foto profil. Silakan coba lagi.'
            ]);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Show the user's donation posts.
     */
    public function donations(): Response
    {
        $donations = Auth::user()->donations()
            ->with(['donationCategory', 'donationImages', 'user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'title' => $donation->title,
                    'slug' => $donation->slug,
                    'description' => $donation->description,
                    'urgency' => $donation->urgency,
                    'phone_number' => $donation->phone_number,
                    'address' => $donation->address,
                    'status' => $donation->status,
                    'type' => $donation->type,
                    'is_popular' => $donation->is_popular,
                    'created_at' => $donation->created_at->format('d M Y'),
                    'updated_at' => $donation->updated_at,
                    'donation_category' => $donation->donation_category,
                    'donation_images' => $donation->donation_images,
                    'user' => $donation->user,
                    // Additional data for UI
                    'image' => $donation->donationImages->first() 
                        ? '/storage/' . $donation->donationImages->first()->image 
                        : null,
                    'category' => $donation->donationCategory->name,
                    'location' => $donation->address,
                    'createdAt' => $donation->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('profile/donations', [
            'donations' => $donations,
        ]);
    }

    /**
     * Show the user's forum posts.
     */
    public function forums(): Response
    {
        $forums = Auth::user()->forums()
            ->with(['forumCategory', 'user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($forum) {
                return [
                    'id' => $forum->id,
                    'title' => $forum->title,
                    'slug' => $forum->slug,
                    'description' => $forum->description,
                    'thumbnail' => $forum->thumbnail 
                        ? '/storage/' . $forum->thumbnail 
                        : null,
                    'created_at' => $forum->created_at->format('d M Y'),
                    'updated_at' => $forum->updated_at,
                    'forum_category' => $forum->forum_category,
                    'user' => $forum->user,
                    // Additional data for UI
                    'category' => $forum->forum_category->name ?? 'Forum',
                    'createdAt' => $forum->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('profile/forums', [
            'forums' => $forums,
        ]);
    }

    /**
     * Delete a donation
     */
    public function deleteDonation(Donation $donation): RedirectResponse
    {
        // Check if the donation belongs to the authenticated user
        if ($donation->user_id !== Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak memiliki akses untuk menghapus donasi ini.']);
        }

        try {
            // Delete associated images from storage
            foreach ($donation->donation_images as $image) {
                if (Storage::disk('public')->exists($image->image)) {
                    Storage::disk('public')->delete($image->image);
                }
            }

            // Delete the donation (this will also delete related records due to cascade)
            $donation->delete();

            return back()->with('success', 'Donasi berhasil dihapus.');
        } catch (\Exception $e) {
            Log::error('Delete donation error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal menghapus donasi. Silakan coba lagi.']);
        }
    }

    /**
     * Show the user's liked posts settings page.
     */
    public function likedPost(): Response
    {
        $user = Auth::user();

        // Get liked donations and forums separately then combine
        $likedDonations = $user->likedDonations()
            ->get()
            ->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'type' => $donation->type, // 'donation' or 'request'
                    'title' => $donation->title,
                    'slug' => $donation->slug,
                    'description' => $donation->description,
                    'image' => $donation->donation_images->first()?->image 
                        ? '/storage/' . $donation->donation_images->first()->image 
                        : null,
                    'category' => $donation->donation_category->name,
                    'location' => $donation->address,
                    'urgency' => $donation->urgency,
                    'author' => $donation->user->name,
                    'author_avatar' => $donation->user->image 
                        ? '/storage/' . $donation->user->image 
                        : null,
                    'created_at' => $donation->created_at,
                    'liked_at' => $donation->pivot->created_at ?? $donation->created_at,
                    'stats' => [
                        'likes' => 0, // You can implement this later
                        'comments' => $donation->comments->count(),
                        'shares' => 0, // You can implement this later
                    ],
                    'content_type' => 'donation'
                ];
            });

        $likedForums = $user->likedForums()
            ->get()
            ->map(function ($forum) {
                return [
                    'id' => $forum->id,
                    'type' => 'forum',
                    'title' => $forum->title,
                    'slug' => $forum->slug,
                    'description' => $forum->description,
                    'image' => $forum->thumbnail 
                        ? '/storage/' . $forum->thumbnail 
                        : null,
                    'category' => $forum->forum_category->name ?? 'Forum',
                    'location' => null,
                    'urgency' => null,
                    'author' => $forum->user->name,
                    'author_avatar' => $forum->user->image 
                        ? '/storage/' . $forum->user->image 
                        : null,
                    'created_at' => $forum->created_at,
                    'liked_at' => $forum->pivot->created_at ?? $forum->created_at,
                    'stats' => [
                        'likes' => $forum->liked_by_users->count(),
                        'comments' => $forum->comments->count(),
                        'shares' => 0, // You can implement this later
                    ],
                    'content_type' => 'forum'
                ];
            });

        // Combine and sort by liked_at
        $allLikedPosts = $likedDonations->concat($likedForums)
            ->sortByDesc('liked_at')
            ->values();

        return Inertia::render('profile/liked-posts', [
            'likedPosts' => $allLikedPosts,
        ]);
    }
}