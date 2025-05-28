import { Link, useForm } from '@inertiajs/react';
import { EyeIcon, EyeOffIcon, Loader2, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function LoginForm() {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('masuk'), {
            onFinish: () => {
                reset();
            },
        });
    };

    return (
        <div className="w-full p-6 md:p-8 lg:w-1/2">
            <div className="mb-8">
                <div className="mb-2 flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h1 className="text-2xl font-bold">PeduliRasa</h1>
                </div>
                <h2 className="text-xl font-semibold">Masuk ke Akun Anda</h2>
                <p className="text-gray-600">Masukkan email dan password untuk mengakses akun PeduliRasa Anda</p>
            </div>

            {/* General error alert */}
            {/* {errors.general && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
            )} */}

            {/* Too many attempts warning */}
            {/* {loginAttempts >= 3 && (
                <Alert className="mb-4 border-amber-200 bg-amber-50">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <AlertDescription className="text-amber-700">
                        Terlalu banyak percobaan login yang gagal.
                        <Link href="/forgot-password" className="ml-1 font-medium text-amber-700 underline">
                            Lupa password?
                        </Link>
                    </AlertDescription>
                </Alert>
            )} */}

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email" className={errors.email ? 'text-destructive' : ''}>
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="nama@example.com"
                        className={errors.email ? 'border-destructive' : ''}
                        disabled={processing}
                        autoComplete="email"
                    />
                    {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className={errors.password ? 'text-destructive' : ''}>
                            Password
                        </Label>
                        {/* <Link href="/forgot-password" className="text-xs text-emerald-600 hover:underline">
                            Lupa password?
                        </Link> */}
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
                            disabled={processing}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                        Ingat saya
                    </label>
                </div>

                <Button type="submit" className="text-light-base w-full bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Memproses
                        </>
                    ) : (
                        'Masuk'
                    )}
                </Button>

                <div className="relative flex items-center justify-center">
                    <Separator className="w-full" />
                    <span className="absolute bg-white px-2 text-xs text-gray-500">atau lanjutkan dengan</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="text-dark-base bg-light-base w-full"
                        // onClick={handleGoogleLogin}
                        disabled={processing}
                    >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="text-dark-base bg-light-base w-full"
                        // onClick={handleFacebookLogin}
                        disabled={processing}
                    >
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                    </Button>
                </div>

                <p className="text-center text-sm">
                    Belum memiliki akun?{' '}
                    <Link href="/register" className="font-medium text-emerald-600 hover:underline">
                        Daftar sekarang
                    </Link>
                </p>
            </form>
        </div>
    );
}
