import { Link, type MetaFunction } from "@remix-run/react";
import hero from "~/assets/hero.jpg";
import row from "~/assets/bevvy_row.png";
import ProductOverview from "~/components/ProductOverview";
import FAQ from "~/components/FAQ";

export const meta: MetaFunction = () => {
  return [{ title: "Bevvy | Home" }];
};

export default function Homepage() {
  return (
    <>
      <section className="h-screen w-screen !p-0 !m-0">
        <div className="relative h-full w-full flex items-center justify-start pl-24">
          <div className="relative">
            <h2 className="font-bevvy text-[#FF0000] !text-[128px] relative z-50">
              Feel the Rush
            </h2>
            <p className="font-sewimple text-[#FF8181] !text-[32px] relative z-50 left-24 bottom-20">
              All natural, zero compromise.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black">
            <img
              src={hero}
              alt="Bevvy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="h-screen w-screen !p-0 !m-0">
        <div className="bg-[#FF0000] relative h-full w-full flex items-center justify-start pl-24">
          <div>
            <div className="relative flex flex-col gap-10">
              <h2 className="font-bevvy text-white !text-[128px] relative z-50">
                Bevvy?
              </h2>
              <p className="max-w-2xl font-sewimple text-white !text-[24px] relative z-50 tracking-wide">
                A game-changing functional beverage that occupies the spectrum
                between energy and relaxation, focus and fun, stimulation and
                smoothness.<br />
                <br />{" "}
                With Bevvy, you get the best of both worlds—a clear mind and an
                elevated mood, all without the crash, hangover, or habit-forming
                properties of alternatives. It&apos;s a new category of
                experience, and we&apos;re proud to pioneer it.
              </p>
              <Link
                to="/products"
                className="group w-fit bg-black hover:bg-white  px-10 py-4 rounded-full font-bevvy text-[24px] relative z-50 transition-all duration-300 hover:cursor-pointer"
              >
                <span className="transition-all duration-300 group-hover:text-black text-white">
                  Get Bevvy
                </span>
              </Link>
            </div>
            <div className="bg-white rounded-full">
              <img
                src={row}
                alt="Bevvy"
                className="absolute top-0 right-0 w-1/2 h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="!p-0 !m-0">
        <div className="bg-neutral-900 relative h-full w-full flex flex-col justify-center items-center gap-24 px-24">
          <div className="h-full w-full pt-24">
            <h2 className="font-sewimple text-white !text-[100px] relative z-50">
              Engineered by nature.
            </h2>
            <h2 className="font-sewimple text-white !text-[100px] relative z-50">
              Perfected by science.
            </h2>
            <p className="max-w-3xl font-sewimple text-white !text-[24px] relative z-50 tracking-wide">
              Bevvy&apos;s a serious drink for the fun at heart. Our
              meticulously crafted, research-backed formula is designed to help
              you keep your flow, and have fun doing it.
            </p>
            <ProductOverview />
          </div>
        </div>
      </section>
      <section className="bg-neutral-900 text-white px-4 h-full w-full font-sewimple tracking-wide">
        <FAQ />
      </section>
      {
        /* <section className="h-screen w-screen !p-0 !m-0">
        <div>
          <div className="flex flex-col justify-end items-end">
            <h2 className="font-sewimple text-white !text-[100px] relative z-50">
              It&apos;s a new feeling.
            </h2>
            <p className="max-w-3xl font-sewimple text-white !text-[24px] relative z-50 tracking-wide">
              What does Bevvy feel like? It&apos;s the heightened awareness of
              caffeine without the jitters. The social ease of a cocktail
              without the impairment. The focus of a productivity hack with a
              smile to boot.
            </p>
            <br />
          </div>
          <div>
            <p>
              Bevvy is perfect for a productive work session, social gathering,
              or creative endeavor. Unlike other drinks, Bevvy leaves you
              feeling refreshed rather than depleted. No crash. No hangover. No
              regrets. Just a premium functional experience that enhances your
              natural capabilities without compromise.
            </p>
          </div>
        </div> */
      }
      {/* </section> */}
    </>
  );
}
