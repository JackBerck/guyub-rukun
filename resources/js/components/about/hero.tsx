import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';

export default function HeroAbout() {
    return (
        <section
            className="section-padding-x relative bg-cover bg-center bg-no-repeat py-12 text-white"
            style={{
                backgroundImage: "url('/img/backgrounds/persawahan.webp')",
            }}
        >
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-emerald-900/80"></div>
            <div className="relative z-20 container max-w-screen-xl">
                <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-8">
                    <div className="w-full lg:w-1/2">
                        <h1 className="mb-2 font-bold">Bersatu Kita Bangun Masa Depan</h1>
                        <p className="mb-4 text-gray-200">
                            Masa depan bangsa ini ada di tangan generasi penerus. Mari kita pastikan setiap warga negara Indonesia mendapatkan haknya
                            untuk mendapatkan makanan yang layak dan bergizi.
                        </p>
                        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                            <Link href="/login">Gabung Sekarang</Link>
                        </Button>
                    </div>
                    <div className="mt-8 w-full lg:mt-0 lg:w-1/2">
                        <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
                            <iframe
                                className="aspect-video w-full rounded-xl"
                                src="https://www.youtube.com/embed/Ic-hJgtNTlQ?si=F3CUdRdeHS3WB7Mn"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
