export default function Authentication({children, id, sideImage, direction, addClass}: {children: React.ReactNode, id: string, sideImage: string, direction: "left" | "right", addClass?: string}) {
    return (
      <section id={id} className={`section-padding-x pt-24 pb-12 ${addClass}`}>
        <div className="container max-w-screen-sm lg:max-w-screen-lg">
          <div
            className={`flex ${
              direction === "right" ? "flex-row-reverse" : "flex-row"
            } rounded-lg mx-auto shadow-purple-base shadow-md overflow-hidden`}
          >
            <div
              className={`hidden lg:block lg:w-1/2 bg-cover bg-center`}
              style={{backgroundImage: `url('${sideImage}')`}}
            ></div>
            {children}
          </div>
        </div>
      </section>
    );
  }