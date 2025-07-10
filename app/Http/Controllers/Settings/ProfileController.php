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
            ->where('type', 'donation')
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
                    'forum_category' => $forum->forumCategory,
                    'user' => $forum->user,
                    // Additional data for UI
                    'category' => $forum->forumCategory->name,
                    'createdAt' => $forum->created_at->diffForHumans(),
                    'stats' => [
                        'likes' => $forum->likedByUsers->count(),
                        'comments' => $forum->comments->count(),
                    ],
                ];
            });

        return Inertia::render('profile/forums', [
            'forums' => $forums,
        ]);
    }

    /**
     * Show the user's request posts.
     */
    public function requests(): Response
    {
        $requests = Auth::user()->donations()
            ->where('type', 'request')
            ->with(['donationCategory', 'donationImages', 'user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'title' => $request->title,
                    'slug' => $request->slug,
                    'description' => $request->description,
                    'urgency' => $request->urgency,
                    'phone_number' => $request->phone_number,
                    'address' => $request->address,
                    'status' => $request->status,
                    'type' => $request->type,
                    'is_popular' => $request->is_popular,
                    'created_at' => $request->created_at->format('d M Y'),
                    'updated_at' => $request->updated_at,
                    'donation_category' => $request->donation_category,
                    'donation_images' => $request->donation_images,
                    'user' => $request->user,
                    // Additional data for UI
                    'image' => $request->donationImages->first()
                        ? '/storage/' . $request->donationImages->first()->image
                        : null,
                    'category' => $request->donationCategory->name,
                    'location' => $request->address,
                    'createdAt' => $request->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('profile/requests', [
            'requests' => $requests,
        ]);
    }

    /**
     * Show the user's affairs posts.
     */
    public function affairs(): Response
    {
        $affairs = Auth::user()->affairs()
            ->with(['affairCategory', 'user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($affair) {
                return [
                    'id' => $affair->id,
                    'title' => $affair->title,
                    'slug' => $affair->slug,
                    'description' => $affair->description,
                    'thumbnail' => $affair->thumbnail
                        ? '/storage/' . $affair->thumbnail
                        : null,
                    'created_at' => $affair->created_at->format('d M Y'),
                    'updated_at' => $affair->updated_at,
                    'user' => $affair->user,
                    // Additional data for UI
                    'category' => $affair->affairCategory->name,
                    'createdAt' => $affair->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('profile/affairs', [
            'affairs' => $affairs,
        ]);
    }
}
