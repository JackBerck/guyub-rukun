'use client';

import { AlertCircle, ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import { Authentication } from '@/components/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/layout';
import { Head, Link, useForm } from '@inertiajs/react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPasswordPage({ token, email }: ResetPasswordProps) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isValidToken, setIsValidToken] = useState(true);
    const [errorHomemade, setErrorHomemade] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
                setErrorHomemade(null);
                setIsSuccess(true);
            },
            onError: () => {
                setIsSuccess(false);
                setIsValidToken(false);
                setErrorHomemade('Terjadi kesalahan saat mereset password. Silakan coba lagi.');
            },
        });
    };

    if (!isValidToken) {
        return (
            <Layout>
                <Head title="Link Tidak Valid" />
                <Authentication
                    id="invalid-token"
                    sideImage="/img/backgrounds/holding-hands.jpg"
                    direction="left"
                    quote="Link reset password yang Anda gunakan tidak valid atau sudah kedaluwarsa."
                    quoteAuthor="PeduliRasa"
                >
                    <div className="w-full p-6 md:p-8 lg:w-1/2">
                        <div className="mb-8">
                            <div className="mb-4 flex items-center justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                    <AlertCircle className="h-8 w-8 text-red-600" />
                                </div>
                            </div>
                            <h1 className="text-center text-2xl font-bold">Link Tidak Valid</h1>
                            <p className="text-center text-gray-600">Link reset password tidak valid atau sudah kedaluwarsa</p>
                        </div>

                        <div className="space-y-4">
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errorHomemade}</AlertDescription>
                            </Alert>

                            <div className="space-y-3">
                                <Link href="/forgot-password">
                                    <Button className="text-light-base w-full bg-emerald-600 hover:bg-emerald-700">Minta Link Baru</Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" className="w-full">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Kembali ke Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Authentication>
            </Layout>
        );
    }

    if (isSuccess) {
        return (
            <Layout>
                <Head title="Password Berhasil Direset" />
                <Authentication
                    id="reset-success"
                    sideImage="/img/backgrounds/holding-hands.jpg"
                    direction="left"
                    quote="Password Anda telah berhasil direset. Sekarang Anda dapat masuk dengan password baru."
                    quoteAuthor="PeduliRasa"
                >
                    <div className="w-full p-6 md:p-8 lg:w-1/2">
                        <div className="mb-8">
                            <div className="mb-4 flex items-center justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                            <h1 className="text-center text-2xl font-bold">Password Berhasil Direset!</h1>
                            <p className="text-center text-gray-600">Password Anda telah berhasil diperbarui</p>
                        </div>

                        <div className="space-y-4">
                            <Alert>
                                <CheckCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Password Anda telah berhasil direset. Gunakan password baru untuk masuk ke akun Anda.
                                </AlertDescription>
                            </Alert>

                            <Link href="/login">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Masuk Sekarang</Button>
                            </Link>
                        </div>
                    </div>
                </Authentication>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head title="Reset Password" />
            <Authentication
                id="reset-password"
                sideImage="/img/backgrounds/holding-hands.jpg"
                direction="left"
                quote="Buat password baru yang kuat untuk melindungi akun PeduliRasa Anda."
                quoteAuthor="PeduliRasa"
            >
                <div className="w-full p-6 md:p-8 lg:w-1/2">
                    <div className="mb-8">
                        <div className="mb-2 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                <Lock className="h-5 w-5 text-emerald-600" />
                            </div>
                            <h1 className="text-2xl font-bold">PeduliRasa</h1>
                        </div>
                        <h2 className="text-xl font-semibold">Reset Password</h2>
                        <p className="text-gray-600">Masukkan password baru untuk akun Anda</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {errorHomemade && (
                            <Alert variant="destructive">
                                <AlertDescription>{errorHomemade}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">Password Baru</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                disabled={processing}
                                minLength={8}
                            />
                            <p className="text-xs text-gray-500">Minimal 8 karakter</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                disabled={processing}
                                minLength={8}
                            />
                        </div>

                        <Button type="submit" className="text-light-base w-full bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                            {processing ? 'Mereset Password...' : 'Reset Password'}
                        </Button>
                        {errors.token && (
                            <Alert variant="destructive">
                                <AlertDescription>{errors.token}</AlertDescription>
                            </Alert>
                        )}

                        <div className="text-center">
                            <Link href="/login" className="inline-flex items-center text-sm text-emerald-600 hover:underline">
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                Kembali ke Login
                            </Link>
                        </div>
                    </form>
                </div>
            </Authentication>
        </Layout>
    );
}
