<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Kirim email ke admin (ganti dengan email adminmu)
        Mail::to(config('mail.from.address'))->send(new ContactMail($validated));

        // Jika pakai Inertia, bisa redirect back dengan flash
        return redirect()->back()->with('success', 'Pesan berhasil dikirim!');
    }
}
