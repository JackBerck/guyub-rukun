import Authentication from '@/components/auth';
import Layout from '@/layouts/layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <Head title="Masuk" />
            <Authentication id="login" sideImage="/img/backgrounds/charity.jpg" direction="right">
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="title-font-size mb-1 font-bold md:text-center">BerbagiRasa</h2>
                    <p className="mb-2 md:text-center">Selamat datang kembali!</p>
                    <form onSubmit={submit} className="small-font-size mb-4 flex flex-col gap-4">
                        <div className="">
                            <label htmlFor="email" className="mb-2 block font-medium">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="email"
                                className="small-font-size block w-full appearance-none rounded border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none"
                                type="email"
                                name="email"
                                placeholder="Masukkan alamat email..."
                                value={data.email}
                                autoComplete="email"
                                autoFocus
                                tabIndex={1}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                required
                            />
                        </div>
                        {errors.email && (
                            <div className="text-red-600">
                                <p>{errors.email}</p>
                            </div>
                        )}
                        <div className="">
                            <div className="mb-2 flex items-center justify-between">
                                <label htmlFor="password" className="block font-medium">
                                    Password <span className="text-red-600">*</span>
                                </label>
                                <Link href="#" className="text-xs">
                                    Lupa password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                className="small-font-size block w-full appearance-none rounded border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none"
                                type="password"
                                name="password"
                                placeholder="Masukkan password..."
                                autoComplete="current-password"
                                autoFocus
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                required
                            />
                        </div>
                        {errors.password && (
                            <div className="text-red-600">
                                <p>{errors.password}</p>
                            </div>
                        )}
                        <div className="flex items-center space-x-3">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={() => setData('remember', !data.remember)}
                                tabIndex={3}
                            />
                            <label htmlFor="remember">Ingat saya</label>
                        </div>
                        <div className="">
                            <button type="submit" className={`bg-blue-base text-light-base w-full rounded px-4 py-2 font-bold ${processing ? 'opacity-50 cursor-not-allowed' : ''}`} tabIndex={4} disabled={processing}>
                                Masuk
                            </button>
                        </div>
                    </form>
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            <p>{status}</p>
                        </div>
                    )}
                    <p className="small-font-size text-center">
                        Atau belum punya akun?
                        <Link href="/daftar" className="bg-green-base text-light-base ml-2 inline-block rounded-md px-2 py-1">
                            Daftar sekarang
                        </Link>
                    </p>
                </div>
            </Authentication>
        </Layout>
    );
}
