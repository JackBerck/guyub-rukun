'use client';

import type React from 'react';

import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { Authentication } from '@/components/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function ForgotPasswordPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setIsSuccess(false); // Reset success state before submitting
        post(route('password.email'), {
            onSuccess: () => {
                setIsSuccess(true); // Set success state on successful submission
            },
            onError: () => {
                setIsSuccess(false); // Reset success state on error
            },
        });
    };

    if (isSuccess) {
        return (
            <Layout>
                <Head title="Email Terkirim" />
                <Authentication
                    id="forgot-password-success"
                    sideImage="/img/backgrounds/helping-homeless.jpg"
                    direction="left"
                    quote="Kami telah mengirimkan link reset password ke email Anda. Periksa kotak masuk dan folder spam."
                    quoteAuthor="PeduliRasa"
                >
                    <div className="w-full p-6 md:p-8 lg:w-1/2">
                        <div className="mb-8">
                            <div className="mb-4 flex items-center justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                            <h1 className="text-center text-2xl font-bold">Email Terkirim!</h1>
                            <p className="text-center text-gray-600">
                                Kami telah mengirimkan link reset password ke <strong>{data.email}</strong>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Alert className='bg-transparent border-emerald-200 text-emerald-600'>
                                <Mail className="h-4 w-4" />
                                <AlertDescription className=' text-gray-700'>
                                    Periksa kotak masuk email Anda dan klik link yang kami kirimkan untuk mereset password. Link akan kedaluwarsa
                                    dalam 24 jam.
                                </AlertDescription>
                            </Alert>

                            <div className="text-center text-sm text-gray-600">
                                <p>Tidak menerima email?</p>
                                <button onClick={() => setIsSuccess(false)} className="text-emerald-600 hover:underline">
                                    Kirim ulang
                                </button>
                            </div>

                            <div className="pt-4">
                                <Link href="/login">
                                    <Button variant="outline" className="w-full text-dark-base bg-gray-50 hover:bg-gray-100">
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

    return (
        <Layout>
            <Head title="Lupa Password" />
            <Authentication
                id="forgot-password"
                sideImage="/img/backgrounds/helping-homeless.jpg"
                direction="left"
                quote="Jangan khawatir, kami akan membantu Anda mendapatkan kembali akses ke akun PeduliRasa."
                quoteAuthor="PeduliRasa"
            >
                <div className="w-full p-6 md:p-8 lg:w-1/2">
                    <div className="mb-8">
                        <div className="mb-2 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                <Mail className="h-5 w-5 text-emerald-600" />
                            </div>
                            <h1 className="text-2xl font-bold">PeduliRasa</h1>
                        </div>
                        <h2 className="text-xl font-semibold">Lupa Password?</h2>
                        <p className="text-gray-600">Masukkan email Anda dan kami akan mengirimkan link untuk mereset password</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {errors?.email && (
                            <Alert variant="destructive">
                                <AlertDescription>{errors.email}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nama@example.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                disabled={processing}
                            />
                        </div>

                        <Button type="submit" className="text-light-base w-full bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                            {processing ? 'Mengirim...' : 'Kirim Link Reset'}
                        </Button>

                        <div className="text-center">
                            <Link href="/login" className="inline-flex items-center text-sm text-emerald-600 hover:underline">
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                Kembali ke Login
                            </Link>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            <p>
                                Belum memiliki akun?{' '}
                                <Link href="/register" className="font-medium text-emerald-600 hover:underline">
                                    Daftar sekarang
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </Authentication>
        </Layout>
    );
}
