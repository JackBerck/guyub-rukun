import { Button } from '../ui/button';

export default function DonateAbout() {
    return (
        <section className="section-padding-x py-16">
            <div className="container max-w-screen-xl">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 p-8">
                    <div className="relative z-20 flex flex-col justify-center">
                        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Donasi untuk Berbagi Makanan</h2>
                        <p className="mb-6 text-white">
                            Setiap donasi yang Anda berikan akan digunakan untuk mendukung program berbagi makanan yang kami adakan. Mari bersama kita
                            cegah kelaparan dan tingkatkan kepedulian sosial di Indonesia.
                        </p>
                        <Button className="w-fit bg-white text-emerald-600 hover:bg-gray-100">Donasi Sekarang</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
