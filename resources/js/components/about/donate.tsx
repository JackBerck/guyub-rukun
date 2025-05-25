import { Link } from "@inertiajs/react";

export default function DonateAbout() {
  return (
    <section
      id="donate-about"
      className="section-padding-x pt-6 lg:pt-16 pb-6 text-light-base"
    >
      <div className="container max-w-screen-xl bg-gradient-to-r from-green-400 to-blue-500 rounded-md p-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center relative z-20">
            <h2 className="title-font-size font-bold">
              Donasi untuk Edukasi Gizi
            </h2>
            <p className="mb-4">
              Setiap donasi yang Anda berikan akan digunakan untuk mendukung
              program edukasi gizi yang kami adakan. Mari bersama kita cegah
              stunting dan tingkatkan literasi gizi di Indonesia.
            </p>
            <Link
              href="teer.id/zakidzulfikar"
              className="bg-light-base text-dark-base font-semibold py-2 px-4 rounded-md text-center"
            >
              Donasi Sekarang
            </Link>
          </div>
          <div className="justify-center items-center absolute right-0 bottom-0 z-10 hidden md:flex">
            <img
              src="/img/random/donasi.webp"
              alt="Donasi"
              className="w-full md:max-w-sm lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}