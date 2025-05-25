import type React from "react"

interface AuthenticationProps {
  children: React.ReactNode
  id?: string
  sideImage: string
  direction: "left" | "right"
  quote: string
  quoteAuthor?: string
  addClass?: string
}

export function Authentication({
  children,
  id,
  sideImage,
  direction,
  quote,
  quoteAuthor,
  addClass = "",
}: AuthenticationProps) {
  return (
    <section id={id} className={`section-padding-x pt-8 pb-12 ${addClass}`}>
      <div className="container max-w-screen-xl">
        <div
          className={`mx-auto flex h-auto overflow-hidden rounded-xl shadow-lg ${
            direction === "right" ? "flex-col lg:flex-row-reverse" : "flex-col lg:flex-row"
          }`}
        >
          <div
            className="relative h-64 w-full bg-cover bg-center md:h-80 lg:h-auto lg:w-1/2"
            style={{ backgroundImage: `url('${sideImage}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <p className="mb-2 text-xl font-medium text-white md:text-2xl">{quote}</p>
              {quoteAuthor && <p className="text-sm text-white/80">— {quoteAuthor}</p>}
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
