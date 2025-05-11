import { Link, type MetaFunction } from "@remix-run/react";
import hero from "~/assets/hero.jpg";
import row from "~/assets/bevvy_row.png";
import ProductOverview from "~/components/ProductOverview";
import FAQ from "~/components/FAQ";
import Ingredients from "~/components/Ingredients";
import ComeInClutch from "~/components/ComeInClutch";

export const meta: MetaFunction = () => {
  return [{ title: "Bevvy | Home" }];
};

export default function Homepage() {
  return (
    <>
      <section className="h-screen w-screen !p-0 !m-0">
        <div className="relative h-full w-full flex items-center justify-center md:justify-start text-center md:text-left px-6 sm:px-12 md:px-16 lg:pl-24">
          <div className="relative mb-12 z-10 p-12 bg-[white]/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none shadow-lg lg:shadow-none rounded-2xl flex flex-col items-center md:items-start">
            <h2 className="drop-shadow-lg font-bevvy text-[#FF0000] !text-6xl sm:!text-7xl md:!text-8xl lg:!text-[100px] xl:!text-[118px]">
              Feel the Rush
            </h2>
            <p className="font-sewimple text-[#FF8181] !text-xl sm:!text-2xl md:!text-3xl lg:!text-[28px] xl:!text-[32px] mt-2 md:mt-0 md:ml-12 lg:ml-24">
              All natural, zero compromise.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black z-0">
            <img
              src={hero}
              alt="Bevvy"
              className="object-cover object-[80%_100%] bg-cover w-full h-full opacity-80 md:opacity-100"
            />
          </div>
        </div>
      </section>
      <section className="h-auto md:h-screen w-screen !p-0 !m-0">
        <div className="bg-[#FF0000] relative h-full w-full flex flex-col lg:flex-row items-center lg:justify-between px-6 py-12 sm:px-12 md:px-16 lg:px-0 lg:py-0">
          <div className="pl-0 lg:pl-12  text-balance relative z-10 flex flex-col gap-6 md:gap-8 items-center lg:items-start text-center lg:text-left lg:w-1/2 xl:w-2/5 mb-10 lg:mb-0">
            <h2 className="font-bevvy text-white !text-6xl sm:!text-7xl md:!text-8xl lg:!text-[100px] xl:!text-[128px]">
              Bevvy?
            </h2>
            <p className="text-left !z-0 relative max-w-xl lg:max-w-none font-sewimple text-white !text-lg sm:!text-xl md:!text-2xl tracking-wide">
              A game-changing functional beverage that occupies the spectrum
              between energy and relaxation, focus and fun, stimulation and
              smoothness.<br />
              <br />
              With Bevvy, you get the best of both worlds—a clear mind and an
              elevated mood, all without the crash, hangover, or habit-forming
              properties of alternatives. It&apos;s a new category of
              experience, and we&apos;re proud to pioneer it.
            </p>
            <Link
              to="/products/bevvy"
              className="group w-fit bg-black hover:bg-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bevvy text-lg sm:text-xl md:text-2xl relative z-10 transition-all duration-300 hover:cursor-pointer mt-4"
            >
              <span className="transition-all duration-300 group-hover:text-black text-white whitespace-nowrap">
                Get Bevvy
              </span>
            </Link>
          </div>
          <div className="relative w-full lg:w-1/2 xl:w-3/5 h-64 sm:h-80 md:h-96 lg:h-full flex items-center justify-center">
            <img
              src={row}
              alt="Bevvy cans in a row"
              className="max-h-full w-auto lg:w-full lg:h-full object-contain lg:object-cover"
            />
          </div>
        </div>
      </section>
      <section className="!p-0 !m-0">
        <div className="bg-neutral-900 relative h-full w-full flex flex-col justify-center items-center text-center px-6 py-12 sm:px-12 md:px-16 lg:px-24">
          <div className="text-left h-full w-full pt-12 md:pt-16 lg:pt-24">
            <h2 className="font-sewimple text-white !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl xl:!text-[90px] relative z-10 mb-4 md:mb-6">
              Engineered by nature.
            </h2>
            <h2 className="font-sewimple text-white !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl xl:!text-[90px] relative z-10 mb-6 md:mb-8">
              Perfected by science.
            </h2>
            <p className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto font-sewimple text-white !text-lg sm:!text-xl md:!text-2xl relative z-10 tracking-wide mb-12 md:mb-16 lg:mb-20">
              Bevvy&apos;s a serious drink for the fun at heart. Our
              meticulously crafted, research-backed formula is designed to help
              you keep your flow, and have fun doing it.
            </p>
            <div className="relative z-0">
              <ProductOverview />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-900 text-white px-6 sm:px-12 md:px-16 lg:px-24 py-12 md:py-16 lg:py-20 w-full font-sewimple tracking-wide flex flex-col items-center">
        <ComeInClutch />
      </section>
      <section className="bg-neutral-900 text-white px-6 sm:px-12 md:px-16 lg:px-24 py-12 md:py-16 lg:py-20 w-full font-sewimple tracking-wide flex flex-col items-center">
        <FAQ />
      </section>
      {
        /* <section className="bg-neutral-900 text-white px-4 font-sewimple tracking-wide">
        <Ingredients />
      </section> */
      }
      <section className="font-bevvy bg-neutral-900 text-neutral-600 px-6 sm:px-12 md:px-16 lg:px-24 py-12 md:py-20 lg:py-24 w-full">
        <h1 className="!text-6xl sm:!text-8xl md:!text-9xl lg:!text-[150px] xl:!text-[200px] text-center">
          Bevvy
        </h1>
      </section>
    </>
  );
}
