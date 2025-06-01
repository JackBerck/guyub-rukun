import { Link, useForm } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function RegisterForm() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [terms, setTerms] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!terms) {
            alert('Anda harus menyetujui syarat dan ketentuan sebelum mendaftar.');
            return;
        }
        post(route('register'), {
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
                        <UserPlus className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h1 className="text-2xl font-bold">PeduliRasa</h1>
                </div>
                <h2 className="text-xl font-semibold">Daftar Akun Baru</h2>
                <p className="text-gray-600">Buat akun untuk mulai berbagi dan membantu sesama</p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="name" className={errors.name ? 'text-destructive' : ''}>
                        Nama Lengkap
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Masukkan nama lengkap Anda"
                        className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                </div>

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
                    />
                    {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                </div>

                {/* <div className="space-y-2">
                    <Label htmlFor="phone" className={errors.phone ? 'text-destructive' : ''}>
                        Nomor Telepon
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                </div> */}

                <div className="space-y-2">
                    <Label htmlFor="password" className={errors.password ? 'text-destructive' : ''}>
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                        className={errors.password ? 'border-destructive' : ''}
                    />
                    {errors.password ? (
                        <p className="text-destructive text-xs">{errors.password}</p>
                    ) : (
                        <p className="text-xs text-gray-500">Password minimal 8 karakter dengan kombinasi huruf dan angka</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password_confirmation" className={errors.password_confirmation ? 'text-destructive' : ''}>
                        Konfirmasi Password
                    </Label>
                    <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="••••••••"
                        className={errors.password_confirmation ? 'border-destructive' : ''}
                    />
                    {errors.password_confirmation && <p className="text-destructive text-xs">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                        required
                        className={`h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 ${terms ? 'border-destructive' : ''}`}
                    />
                    <label htmlFor="terms" className={`text-sm ${terms ? 'text-destructive' : 'text-gray-600'}`}>
                        Saya menyetujui{' '}
                        <Link href="/terms" className="font-medium text-emerald-600 hover:underline">
                            Syarat & Ketentuan
                        </Link>{' '}
                        dan{' '}
                        <Link href="/privacy" className="font-medium text-emerald-600 hover:underline">
                            Kebijakan Privasi
                        </Link>
                    </label>
                </div>

                <Button type="submit" className="text-light-base w-full bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                    {processing ? 'Mendaftar...' : 'Daftar Sekarang'}
                </Button>

                <div className="relative flex items-center justify-center">
                    <Separator className="w-full" />
                    <span className="absolute bg-white px-2 text-xs text-gray-500">atau daftar dengan</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="bg-light-base text-dark-base w-full">
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
                    <Button variant="outline" type="button" className="bg-light-base text-dark-base w-full">
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                    </Button>
                </div>

                <p className="text-center text-sm">
                    Sudah memiliki akun?{' '}
                    <Link href="/login" className="font-medium text-emerald-600 hover:underline">
                        Masuk sekarang
                    </Link>
                </p>
            </form>
        </div>
    );
}
