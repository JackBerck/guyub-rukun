import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function WhatWeDoAbout() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="what-we-do-about" className="section-padding-x text-dark-base pt-6 pb-6" ref={ref}>
            <div className="container max-w-screen-xl">
                <div className="flex flex-col-reverse justify-between gap-4 lg:flex-row">
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="flex flex-col items-center justify-center rounded-md bg-green-400 p-8 font-semibold text-green-700">
                                {inView && <CountUp start={0} end={12567} duration={1} suffix='+' className="big-font-size" />}
                                <p className="text-light-base">Orang Terbantu</p>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-md bg-amber-400 p-8 font-semibold text-amber-700">
                                {inView && <CountUp start={0} end={5834} duration={1} suffix='+' className="big-font-size" />}
                                <p className="text-light-base">Forum Terbuka</p>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-md bg-blue-400 p-8 font-semibold text-blue-700">
                                {inView && <CountUp start={0} end={3245} duration={1} suffix='+' className="big-font-size" />}
                                <p className="text-light-base">Acara Dilaksanakan</p>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-md bg-purple-400 p-8 font-semibold text-purple-700">
                                {inView && <CountUp start={0} end={32345} duration={1} suffix='+' className="big-font-size" />}
                                <p className="text-light-base">Pengguna Terdaftar</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <p className="w-fit rounded-md bg-lime-400 px-2 py-1 font-semibold text-lime-700">Apa yang Kami Lakukan?</p>
                        <h2 className="mb-2 font-bold">Kita Membuat Perbedaan dalam Masyarakat Indonesia</h2>
                        <p className="mb-2">
                            Kami adalah platform digital yang berfokus pada pengurangan kelaparan dan pemborosan makanan. Kami menyediakan berbagai
                            program yang membantu masyarakat untuk mendapatkan akses terhadap makanan dan dukungan yang mereka butuhkan.
                        </p>
                        <p className="mb-2">
                            Kami percaya bahwa berbagi makanan dan membangun komunitas yang peduli adalah hal yang penting dan harus diperhatikan.
                            Oleh karena itu, kami ingin memberikan platform dan dukungan kepada siapa pun yang membutuhkan, terutama bagi masyarakat
                            yang kurang mampu.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
