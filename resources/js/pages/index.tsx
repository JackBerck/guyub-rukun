import Layout from "@/layouts/layout";
import { Head } from "@inertiajs/react";

export default function Home() {
    return (
        <Layout>
            <Head title="Beranda" />
            <div className="container mx-auto px-4 py-36">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
                <p className="text-lg">This is a simple home page using React and Tailwind CSS.</p>
            </div>
        </Layout>
    );
}