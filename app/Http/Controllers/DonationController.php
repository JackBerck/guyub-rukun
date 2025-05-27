<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDonationRequest;
use App\Http\Requests\UpdateDonationRequest;
use App\Models\Donation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        return Donation::with(["donationCategory", "donationImages", "user"])
            ->latest()
            ->cursorPaginate(16);
    }

    public function create()
    {
        // return inertia
    }

    /**
     * Store a newly created donation in storage.
     *
     * @param  \App\Http\Requests\CreateDonationRequest  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function store(CreateDonationRequest $request): RedirectResponse
    {
        try {
            $user = Auth::user();
            $data = $request->validated();

            $donation = $user->donations()->create($data);

            // Simpan setiap file gambar ke relasi donationImages
            if (isset($data['images']) && is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $path = $image->store('donation-images', 'public');
                    $donation->donationImages()->create(['path' => $path]);
                }
            }

            // You can return JSON or redirect as needed
            return redirect()->route('donations.index')
                ->with('status', "Postingan $donation->title berhasil dibuat");
        } catch (\Exception $e) {
            // Log the error or handle as needed
            return back()->withErrors(['error' => "Postingan gagal dibuat"])
                ->withInput();
        }
    }

    public function edit(Donation $donation)
    {
        // return Inertia::render()
    }

    public function update(UpdateDonationRequest $request, Donation $donation): RedirectResponse
    {
        try {
            $data = $request->validated();

            // Update donation data
            $donation->update($data);

            // Update images if provided
            if (isset($data['images']) && is_array($data['images'])) {
                // Delete old images
                $donation->donationImages()->delete();

                // Save new images
                foreach ($data['images'] as $image) {
                    $path = $image->store('donation-images', 'public');
                    $donation->donationImages()->create(['path' => $path]);
                }
            }

            return redirect()->route('donations.index')
                ->with('status', "Postingan $donation->title berhasil diperbarui");
        } catch (\Exception $e) {
            return back()->withErrors(['error' => "Postingan gagal diperbarui"])
                ->withInput();
        }
    }

    public function remove(Donation $donation): RedirectResponse
    {
        try {
            // Delete associated images
            $donation->donationImages()->delete();

            // Delete the donation
            $donation->delete();

            return redirect()->route('donations.index')
                ->with('status', "Postingan $donation->title berhasil dihapus");
        } catch (\Exception $e) {
            return back()->withErrors(['error' => "Postingan gagal dihapus"]);
        }
    }
}
