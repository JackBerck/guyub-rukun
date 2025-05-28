import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const socialMedia = [
    {
        name: 'Instagram',
        username: '@pedulirasa.id',
        url: '#',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    {
        name: 'Facebook',
        username: 'PeduliRasa Indonesia',
        url: '#',
        color: 'bg-blue-600',
    },
    {
        name: 'Twitter',
        username: '@pedulirasa_id',
        url: '#',
        color: 'bg-sky-500',
    },
    {
        name: 'LinkedIn',
        username: 'PeduliRasa',
        url: '#',
        color: 'bg-blue-700',
    },
];

export default function ContactSocialMedia() {
    return (
        <section className="section-padding-x py-16">
            <div className="container max-w-screen-xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold">Ikuti Kami</h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Tetap terhubung dengan PeduliRasa melalui media sosial untuk mendapatkan update terbaru
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {socialMedia.map((social, index) => (
                        <Card key={index} className="transition-transform hover:scale-105 p-0 gap-0 bg-light-base text-dark-base">
                            <CardContent className="p-6 text-center">
                                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${social.color} text-white`}>
                                    <span className="text-2xl font-bold">{social.name.charAt(0)}</span>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">{social.name}</h3>
                                <p className="mb-4 text-sm text-gray-600">{social.username}</p>
                                <Button variant="outline" size="sm" className="w-full bg-light-base text-dark-base">
                                    Ikuti
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
