import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const programs: {
    title: string;
    description: string;
    image?: string;
    link: string;
}[] = [
    {
        title: 'Berbagi Makanan',
        description: 'Program yang membantu menghubungkan pemilik makanan berlebih dengan yang membutuhkan.',
        image: '/img/random/anak-ukur-tinggi.webp',
        link: '/',
    },
    {
        title: 'Forum Diskusi',
        description: 'Program yang memberikan ruang diskusi untuk berbagi tips dan pengalaman.',
        image: '/img/random/edukasi-kesehatan.webp',
        link: '/',
    },
    {
        title: 'Acara Sosial',
        description: 'Program yang membantu ibu untuk mengecek status imunisasi anaknya.',
        image: '/img/random/imunisasi-anak.webp',
        link: '/',
    },
    {
        title: 'Butuh Bantuan',
        description: 'Program yang membantu pengguna untuk mendapatkan bantuan dari komunitas.',
        image: '/img/random/forum-ibu-anak.webp',
        link: '/',
    },
];

export default function ProgramsAbout() {
    return (
        <section className="section-padding-x bg-gray-50 py-16">
            <div className="container max-w-screen-xl">
                <div className="text-center">
                    <span className="mx-auto mb-4 inline-block w-fit rounded-md bg-pink-100 px-2 py-1 font-semibold text-pink-700">Program</span>
                    <h2 className="mb-8 text-3xl font-bold md:text-4xl">Program yang Kami Tawarkan</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {programs.map((program, index) => (
                        <Card key={index} className="bg-light-base-100 text-dark-base gap-2 overflow-hidden p-0 transition-transform hover:scale-105">
                            <div className="aspect-video overflow-hidden">
                                <img src={program.image || '/placeholder.svg'} alt={program.title} className="h-full w-full object-cover" />
                            </div>
                            <CardHeader className="px-2">
                                <CardTitle className="text-lg">{program.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-2">
                                <CardDescription className="mb-4">{program.description}</CardDescription>
                                <Button
                                    size="sm"
                                    asChild
                                    className="border-blue-base text-blue-base hover:bg-blue-base hover:text-light-base mb-2 border text-xs"
                                >
                                    <Link href={program.link}>Pelajari Lebih Lanjut</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
