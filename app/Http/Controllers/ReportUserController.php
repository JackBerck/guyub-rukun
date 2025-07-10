<?php

namespace App\Http\Controllers;

use App\Mail\ReportUserMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ReportUserController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'userId' => 'required|exists:users,id',
            'reason' => 'required|string|max:1000',
        ]);

        // Kirim email ke admin
        Mail::to(config('mail.from.address'))->send(
            new ReportUserMail($validated, $validated['userId'], auth()->id())
        );

        return back()->with('success', 'Laporan berhasil dikirim!');
    }
}
