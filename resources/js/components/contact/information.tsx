import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import ContactForm from './contact-form';

export default function ContactInformation() {
    return (
        <section id="contact-about" className="section-padding-x pt-6 pb-6">
            <div className="container max-w-screen-xl">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <Card className="w-full lg:w-1/2 p-0 border-none shadow-none">
                        <CardContent className="p-0">
                            <h1 className="title-font-size mb-2 font-semibold">Hubungi Kami</h1>
                            <p className="mb-4">
                                Jika Anda memiliki pertanyaan, saran, atau ingin berpartisipasi dalam program kami, jangan ragu untuk menghubungi
                                kami.
                            </p>
                            <ul className="flex flex-col gap-4">
                                <li className="flex items-center gap-4">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                                        <Mail className="h-6 w-6" />
                                    </span>
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold">Email</h3>
                                        <p>admin@sehati.com</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                                        <Phone className="h-6 w-6" />
                                    </span>
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold">Nomor Telepon</h3>
                                        <p>+62 850 1234 5678</p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <div className="w-full lg:w-1/2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
