import { Link } from '@inertiajs/react';

export default function HeroAbout() {
    return (
        <section
            id="hero-about"
            className="section-padding-x text-light-base relative bg-[url('/img/backgrounds/persawahan.webp')] bg-cover bg-center bg-no-repeat pt-24 pb-8 md:pb-12 lg:pt-24"
        >
            <div className="to-dark-base/80 absolute inset-0 z-10 bg-gradient-to-b from-transparent"></div>
            <div className="relative z-20 container max-w-screen-xl">
                <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-8">
                    <div className="w-full lg:w-1/2">
                        <h1 className="mb-2 font-bold">Bersatu Kita Bangun Masa Depan</h1>
                        <p className="mb-4 text-gray-200">
                            Masa depan bangsa ini ada di tangan generasi penerus. Mari kita pastikan setiap warga negara Indonesia mendapatkan haknya untuk mendapatkan 
                        </p>
                        <Link href="/daftar" className="bg-green-base text-light-base rounded-md px-4 py-2 font-semibold">
                            Gabung Sekarang
                        </Link>
                    </div>
                    <div className="mt-8 w-full lg:mt-0 lg:w-1/2">
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
        </section>
    );
}
