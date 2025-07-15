<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class OauthController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        try {
            $user = Socialite::driver($provider)->user();

            // Check if user already exists in the database
            $existingUser = User::where('gauth_id', $user->getId())
                ->where('gauth_type', $provider)
                ->first();

            if ($existingUser) {
                Auth::login($existingUser);
            } else {
                // Create a new user
                $newUser = User::create([
                    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'gauth_id' => $user->getId(),
                    'gauth_type' => $provider,
                    'password' => bcrypt(Str::random(16)), // Random password for social login
                ]);

                Auth::login($newUser);
            }

            return redirect(route('home')); // Redirect to intended page after login
        } catch (Exception $e) {
            return redirect('/login')->withErrors(['error' => 'Gagal login dengan Google. Pastikan akun Google Anda terhubung.']);
        }
    }
}
