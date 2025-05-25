import ProgramCard from "../cards/program-card";

export default function ProgramsAbout() {
  return (
    <section
      id="programs-about"
      className="section-padding-x pt-6 pb-6 text-dark-base"
    >
      <div className="container max-w-screen-xl">
        <div className="text-center">
          <p className="px-2 py-1 rounded-md bg-rose-400 text-rose-700 font-semibold w-fit mx-auto">
            Program
          </p>
          <h2 className="title-font-size font-bold mb-2">
            Program yang Kami Tawarkan
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProgramCard
            title="Cek Stunting"
            description="Program yang membantu ibu untuk mengecek status stunting anaknya."
            image="/img/random/anak-ukur-tinggi.webp"
            link="/cek-stunting"
          />
          <ProgramCard
            title="Edukasi"
            description="Program yang memberikan edukasi kepada ibu tentang pentingnya gizi."
            image="/img/random/edukasi-kesehatan.webp"
            link="/edukasi"
          />
          <ProgramCard
            title="Imunisasi"
            description="Program yang membantu ibu untuk mengecek status imunisasi anaknya."
            image="/img/random/imunisasi-anak.webp"
            link="/imunisasi"
          />
          <ProgramCard
            title="Forum"
            description="Program yang memungkinkan ibu untuk berdiskusi tentang gizi dengan ibu yang lain."
            image="/img/random/forum-ibu-anak.webp"
            link="/forum"
          />
        </div>
      </div>
    </section>
  );
}