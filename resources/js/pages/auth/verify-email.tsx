'use client';

import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import { Authentication } from '@/components/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { toast } from 'sonner';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});
    const [isResent, setIsResent] = useState(false);
    const [autoSent, setAutoSent] = useState(false);

    // Automatically send verification email on component mount
    useEffect(() => {
        if (!status && !autoSent) {
            post(route('verification.send'), {
                onSuccess: () => {
                    setAutoSent(true);
                },
                onError: () => {
                    toast.error('Gagal mengirim email verifikasi. Silakan coba lagi.');
                },
            });
        }
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'), {
            onSuccess: () => {
                setIsResent(true);
            },
        });
    };

    return (
        <Layout>
            <Head title="Verifikasi Email" />
            <Authentication
                id="verify-email"
                sideImage="/img/backgrounds/helping-homeless.jpg"
                direction="left"
                quote="Terima kasih telah bergabung dengan PeduliRasa. Silakan verifikasi email Anda untuk melanjutkan."
                quoteAuthor="PeduliRasa"
            >
                <div className="w-full p-6 md:p-8 lg:w-1/2">
                    <div className="mb-8">
                        <div className="mb-4 flex items-center justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                <Mail className="h-8 w-8 text-emerald-600" />
                            </div>
                        </div>
                        <h2 className="text-center text-xl font-semibold">Verifikasi Email</h2>
                        <p className="text-center text-gray-600">
                            Kami telah mengirimkan link verifikasi ke email Anda. Silakan periksa kotak masuk dan klik link tersebut.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {(status === 'verification-link-sent' || isResent || autoSent) && (
                            <Alert className="border-emerald-200 bg-emerald-50">
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                                <AlertDescription className="text-emerald-700">Link verifikasi telah dikirim ke email Anda.</AlertDescription>
                            </Alert>
                        )}

                        <Alert className="border-emerald-200 bg-transparent">
                            <Mail className="h-4 w-4 text-emerald-600" />
                            <AlertDescription className="text-gray-700">
                                Periksa kotak masuk email Anda dan klik link verifikasi yang kami kirimkan. Jika tidak menemukan email, periksa juga
                                folder spam.
                            </AlertDescription>
                        </Alert>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="text-center text-sm text-gray-600">
                                <p>Tidak menerima email verifikasi?</p>
                            </div>

                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                disabled={processing}
                            >
                                {processing ? 'Mengirim...' : 'Kirim Ulang Email Verifikasi'}
                            </Button>
                        </form>

                        <div className="space-y-3 pt-4">
                            <Link href={route('logout')} method="post">
                                <Button variant="outline" className="w-full">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Keluar
                                </Button>
                            </Link>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            <p>
                                Butuh bantuan?{' '}
                                <Link href="/contact" className="font-medium text-emerald-600 hover:underline">
                                    Hubungi kami
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Authentication>
        </Layout>
    );
}
