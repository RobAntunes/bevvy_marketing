import { ChevronLeft, ChevronRight as LucideChevronRight } from "lucide-react";
import cansolo from "../assets/can_solo.png";
import duo from "../assets/duo.png";
import squad from "../assets/squad.png";
import nutri from "../assets/nutri.svg";
import { Link } from "@remix-run/react";
import { useState } from "react";

export default function ProductOverview() {
    // Gallery images array
    const photos = [
        { src: cansolo, alt: "Bevvy Can Solo" },
        { src: duo, alt: "Bevvy Duo Cans" },
        { src: squad, alt: "Squad of Bevvy Cans" },
        { src: nutri, alt: "Bevvy Ingredients" },
    ];
    const [current, setCurrent] = useState(0);

    const prevPhoto = () =>
        setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    const nextPhoto = () =>
        setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

    return (
        <div className="bg-neutral-800 mt-16 m-12 shadow-2xl rounded-3xl text-white min-h-screen pt-12 sm:pt-16 font-sewimple tracking-wide">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                    {/* Gallery Section - Left Column */}
                    <div className="flex flex-col items-center p-4 lg:p-8 sticky top-16 rounded-3xl">
                        <div className="relative w-full flex justify-center items-center">
                            <button
                                aria-label="Previous photo"
                                onClick={prevPhoto}
                                className="absolute left-0 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
                                style={{
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <ChevronLeft className="w-7 h-7 text-white" />
                            </button>
                            {/* !rounded-2xl shadow-xl bg-white */}
                            <img
                                src={photos[current].src}
                                alt={photos[current].alt}
                                className="max-w-md w-full h-auto object-contain  transition-all duration-300"
                            />
                            <button
                                aria-label="Next photo"
                                onClick={nextPhoto}
                                className="absolute right-0 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
                                style={{
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <LucideChevronRight className="w-7 h-7 text-white" />
                            </button>
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-4 mt-6 justify-center">
                            {photos.map((photo, idx) => (
                                <button
                                    key={photo.src}
                                    onClick={() => setCurrent(idx)}
                                    className={`border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                                        idx === current
                                            ? "border-[#FF0000] scale-105"
                                            : "border-transparent opacity-60 hover:opacity-100"
                                    }`}
                                    aria-label={`Show photo ${idx + 1}`}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className="w-16 h-16 object-contain bg-black"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details Section - Right Column */}
                    <div className="mt-10 lg:mt-0 px-4 sm:px-0">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Bevvy (6 x 300ml)
                        </h1>
                        <p className="mt-2 text-3xl tracking-tight text-white/90">
                            $30
                        </p>

                        {/* Product details */}
                        <div className="mt-10">
                            <h2 className="text-xl font-medium text-white">
                                Description
                            </h2>
                            <div className="mt-4 space-y-4 text-base text-white/70">
                                <p>
                                    Elevate your state naturally. Bevvy delivers
                                    a premium cognitive lift and mood
                                    enhancement through our proprietary blend of
                                    botanical ingredients. Experience the
                                    perfect balance between energy and calm,
                                    focus and fun.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-700 pt-10 mb-12">
                            <h2 className="text-xl font-medium text-white">
                                Features & Benefits
                            </h2>
                            <div className="mt-4">
                                <ul className="list-disc space-y-2 pl-5 text-base text-white/70 marker:text-gray-500">
                                    <li className="pl-2">
                                        Premium botanical formula for mind &
                                        mood enhancement
                                    </li>
                                    <li className="pl-2">
                                        Clean, sustained energy without the
                                        jitters or crash
                                    </li>
                                    <li className="pl-2">
                                        Refreshing taste profile
                                    </li>
                                    <li className="pl-2">
                                        Vegan, gluten-free, and low-calorie
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="h-full w-full flex items-end gap-6 text-white">
                            <Link
                                to="/products/bevvy"
                                className="group w-fit bg-[#FF0000] px-10 pt-4 pb-2 rounded-full font-bevvy text-[24px] relative z-50 transition-all duration-300 hover:cursor-pointer"
                            >
                                <span className="font-bevvy transition-all duration-300 text-white">
                                    Add to Cart
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
