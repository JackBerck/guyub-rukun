export default function PeduliRasaAbout() {
  return (
    <section
      id="about-hero"
      className="section-padding-x pt-6 pb-6 text-dark-base"
    >
      <div className="container max-w-screen-xl">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="w-full lg:w-1/2">
            <p className="px-2 py-1 rounded-md bg-lime-400 text-lime-700 font-semibold w-fit">
              Apa itu Sehati?
            </p>
            <h2 className="title-font-size font-bold mb-2">
              Jembatan Emas Menuju Masa Depan yang Gemilang
            </h2>
            <p className="mb-1">
              Sehati hadir sebagai solusi, bersama kita bangun masa depan
              generasi yang sehat dan cerdas. Aplikasi ini adalah langkah awal
              kita untuk mewujudkan Indonesia yang bebas stunting dan
              berliterasi gizi.
            </p>
            <p className="mb-1">
              Melalui Sehati, kita satukan kekuatan untuk memberikan yang
              terbaik bagi ibu dan anak Indonesia. Bersama aplikasi ini, kita
              bangun masa depan yang lebih sehat, kuat, dan berprestasi.
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-4">
                <svg
                  className="w-10 h-10 text-amber-700 bg-amber-400 p-2 rounded-full"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                <span className="font-semibold">
                  Siap membantu ibu dan anak Indonesia
                </span>
              </li>
              <li className="flex items-center gap-4">
                <svg
                  className="w-10 h-10 text-blue-700 bg-blue-400 p-2 rounded-full"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z" />
                </svg>
                <span className="font-semibold">
                  Mudahnya akses informasi kesehatan
                </span>
              </li>
              <li className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  className="w-10 h-10 text-green-700 bg-green-400 p-2 rounded-full"
                >
                  <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
                </svg>
                <span className="font-semibold">
                  Forum diskusi dan konsultasi yang informatif
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-2">
            <img
              src="/img/random/anak-anak-sd.webp"
              alt="Foto anak-anak SD"
              className="object-cover w-full max-h-[96px] md:max-h-[144px] rounded-lg"
            />
            <img
              src="/img/random/anak-stunting.webp"
              alt="Foto anak stunting"
              className="object-cover w-full max-h-[96px] md:max-h-[144px] rounded-lg"
            />
            <img
              src="/img/random/ibu-dan-anak.webp"
              alt="Foto ibu dan anak"
              className="object-cover w-full max-h-[256px] rounded-lg col-span-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}