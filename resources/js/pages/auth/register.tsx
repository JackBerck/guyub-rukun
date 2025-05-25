import { Authentication } from '@/components/auth';
import RegisterForm from '@/components/auth/register';
import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    return (
        <Layout>
            <Head title="Daftar" />
            <Authentication
                id="register"
                sideImage="/img/backgrounds/slametan.jpg"
                direction="left"
                quote='Bergabunglah dengan komunitas yang peduli kepada sesama.'
                quoteAuthor="PeduliRasa"
            >
                <RegisterForm />
            </Authentication>
        </Layout>
    );
}
