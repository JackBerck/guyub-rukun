import { Authentication } from '@/components/auth';
import LoginForm from '@/components/auth/login';
import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

export default function Login() {
    return (
        <Layout>
            <Head title="Masuk" />
            <Authentication
                id="login"
                sideImage="/img/backgrounds/berbagi-makanan.jpg"
                direction="right"
                quote="Berbagi adalah cara untuk membangun komunitas yang lebih peduli."
                quoteAuthor="PeduliRasa"
            >
                <LoginForm />
            </Authentication>
        </Layout>
    );
}
