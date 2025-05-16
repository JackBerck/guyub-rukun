import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function WhatWeDoAbout() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="what-we-do-about"
      className="section-padding-x pt-6 pb-6 text-dark-base"
      ref={ref}
    >
      <div className="container max-w-screen-xl">
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-4">
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-green-400 text-green-700 flex items-center justify-center flex-col rounded-md p-8 font-semibold">
                {inView && (
                  <CountUp
                    start={0}
                    end={12567}
                    duration={1}
                    className="sub-title-font-size"
                  />
                )}
                <p className="text-light-base">Ibu Terbantu</p>
              </div>
              <div className="bg-amber-400 text-amber-700 flex items-center justify-center flex-col rounded-md p-8 font-semibold">
                {inView && (
                  <CountUp
                    start={0}
                    end={5834}
                    duration={1}
                    className="sub-title-font-size"
                  />
                )}
                <p className="text-light-base">Forum Terbuka</p>
              </div>
              <div className="bg-blue-400 text-blue-700 flex items-center justify-center flex-col rounded-md p-8 font-semibold">
                {inView && (
                  <CountUp
                    start={0}
                    end={3245}
                    duration={1}
                    className="sub-title-font-size"
                  />
                )}
                <p className="text-light-base">Imunisasi Dilaksanakan</p>
              </div>
              <div className="bg-purple-400 text-purple-700 flex items-center justify-center flex-col rounded-md p-8 font-semibold">
                {inView && (
                  <CountUp
                    start={0}
                    end={32345}
                    duration={1}
                    className="sub-title-font-size"
                  />
                )}
                <p className="text-light-base">Ibu Terdaftar</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="px-2 py-1 rounded-md bg-lime-400 text-lime-700 font-semibold w-fit">
              Apa yang Kami Lakukan?
            </p>
            <h2 className="title-font-size font-bold mb-2">
              Kita Membuat Perbedaan dalam Masyarakat Indonesia
            </h2>
            <p className="mb-2">
              Kami adalah organisasi nirlaba yang berfokus pada kesehatan ibu
              dan anak. Kami menyediakan berbagai program yang membantu ibu muda
              dan anak-anak untuk mendapatkan akses terhadap informasi dan
              dukungan yang mereka butuhkan.
            </p>
            <p className="mb-2">
              Kami percaya bahwa edukasi tentang stunting dan gizi adalah hal
              yang penting dan harus diperhatikan. Oleh karena itu, kami ingin
              memberikan informasi dan dukungan kepada siapa pun yang
              membutuhkan, terutama bagi ibu muda dan anak-anak.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}