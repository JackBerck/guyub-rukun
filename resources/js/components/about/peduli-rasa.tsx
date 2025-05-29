import { Heart, MessageSquare, User } from 'lucide-react';

export default function PeduliRasaAbout() {
    return (
        <section className="section-padding-x py-8">
            <div className="container max-w-screen-xl">
                <div className="flex flex-col justify-between gap-2 lg:flex-row">
                    <div className="w-full lg:w-1/2">
                        <span className="mb-2 inline-block rounded-md bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
                            Apa itu PeduliRasa?
                        </span>
                        <h2 className="mb-2 font-bold">Jembatan Emas Menuju Masa Depan yang Gemilang</h2>
                        <p className="mb-2">
                            PeduliRasa hadir sebagai solusi, bersama kita bangun masa depan generasi yang sehat dan peduli. Aplikasi ini adalah
                            langkah awal kita untuk mewujudkan Indonesia yang bebas kelaparan dan mengurangi pemborosan makanan.
                        </p>
                        <p className="mb-2">
                            Melalui PeduliRasa, kita satukan kekuatan untuk memberikan yang terbaik bagi masyarakat Indonesia. Bersama aplikasi ini,
                            kita bangun masa depan yang lebih sehat, kuat, dan berprestasi.
                        </p>
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 p-2 text-emerald-700">
                                    <User className="h-6 w-6" />
                                </div>
                                <span className="font-semibold">Siap membantu masyarakat Indonesia</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 p-2 text-blue-700">
                                    <Heart className="h-6 w-6" />
                                </div>
                                <span className="font-semibold">Mudahnya akses berbagi makanan</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 p-2 text-teal-700">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <span className="font-semibold">Forum diskusi dan komunitas yang informatif</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-2 gap-2">
                            <img
                                src="/img/random/anak-anak-sd.webp"
                                alt="Berbagi makanan 1"
                                className="h-24 w-full rounded-lg object-cover md:h-36"
                            />
                            <img
                                src="/img/random/anak-stunting.webp"
                                alt="Berbagi makanan 2"
                                className="h-24 w-full rounded-lg object-cover md:h-36"
                            />
                            <img
                                src="/img/random/ibu-dan-anak.webp"
                                alt="Komunitas PeduliRasa"
                                className="col-span-2 h-64 w-full rounded-lg object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
