import { ChevronLeft, ChevronRight as LucideChevronRight } from "lucide-react";
import cansolo from "../assets/can_solo.png";
import duo from "../assets/duo.png";
import squad from "../assets/squad.png";
import nutri from "../assets/nutri.svg";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Money } from "@shopify/hydrogen";
import type { CurrencyCode } from "@shopify/hydrogen/storefront-api-types";
import { AddToCartButton } from "./AddToCartButton";
import { useAside } from "~/components/Aside";

// Define a type for our product data
type ProductVariant = {
    id: string;
    price: {
        amount: string;
        currencyCode: CurrencyCode;
    };
    compareAtPrice?: {
        amount: string;
        currencyCode: CurrencyCode;
    } | null;
};

type ProductData = {
    id: string;
    title: string;
    handle: string;
    variants: {
        nodes: ProductVariant[];
    };
};

type ApiResponse = {
    product: ProductData;
};

export default function ProductOverview() {
    // Gallery images array
    const photos = [
        { src: cansolo, alt: "Bevvy Can Solo" },
        { src: duo, alt: "Bevvy Duo Cans" },
        { src: squad, alt: "Squad of Bevvy Cans" },
        { src: nutri, alt: "Bevvy Ingredients" },
    ];
    const [current, setCurrent] = useState(0);
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const { open } = useAside();

    // Fetch product data
    useEffect(() => {
        async function fetchProduct() {
            try {
                // Make sure we're using the same URL format and params as the main store
                const response = await fetch("/api/products/bevvy");
                if (response.ok) {
                    const data = await response.json() as ApiResponse;
                    setProduct(data.product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, []);

    const prevPhoto = () =>
        setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    const nextPhoto = () =>
        setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

    // Get the price data from the first variant to match main product page
    const price = product?.variants?.nodes?.[0]?.price;
    console.log(price);

    return (
        <div className="bg-neutral-800 mt-12 sm:mt-16 mx-4 sm:mx-8 md:mx-12 shadow-2xl rounded-3xl text-white min-h-screen py-8 sm:py-12 font-sewimple tracking-wide">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main grid: 1 col on mobile, 2 cols on lg */}
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12 items-start">
                    {/* Gallery Section - Left Column */}
                    {/* Responsive padding and sticky behavior for larger screens */}
                    <div className="flex flex-col items-center p-2 sm:p-4 lg:sticky lg:top-16 rounded-3xl mb-8 lg:mb-0">
                        <div className="relative w-full flex justify-center items-center">
                            <button
                                aria-label="Previous photo"
                                onClick={prevPhoto}
                                className="absolute left-0 z-10 p-1 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
                                style={{
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </button>
                            <img
                                src={photos[current].src}
                                alt={photos[current].alt}
                                className="max-w-sm sm:max-w-md w-full h-auto object-contain transition-all duration-300 rounded-lg"
                            />
                            <button
                                aria-label="Next photo"
                                onClick={nextPhoto}
                                className="absolute right-0 z-10 p-1 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
                                style={{
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <LucideChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </button>
                        </div>
                        {/* Thumbnails */}
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
                            {photos.map((photo, idx) => (
                                <button
                                    key={photo.src}
                                    onClick={() => setCurrent(idx)}
                                    className={`border-2 rounded-lg overflow-hidden transition-all duration-200 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${
                                        idx === current
                                            ? "border-[#FF0000] scale-105"
                                            : "border-transparent opacity-60 hover:opacity-100"
                                    }`}
                                    aria-label={`Show photo ${idx + 1}`}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className="w-full h-full object-contain bg-black"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details Section - Right Column */}
                    <div className="mt-6 lg:mt-0 px-2 sm:px-0">
                        {/* Responsive Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                            Bevvy (6 x 300ml)
                        </h1>
                        {/* Responsive Price Display */}
                        <p className="mt-2 text-2xl sm:text-3xl tracking-tight text-white/90">
                            {loading || !price
                                ? (
                                    <span className="opacity-50 text-xl sm:text-2xl">Loading price...</span>
                                )
                                : (
                                    <Money
                                        data={price}
                                        withoutTrailingZeros={true}
                                        withoutCurrency={false}
                                        className="text-white"
                                    />
                                )}
                        </p>

                        {/* Product details - responsive text */}
                        <div className="mt-6 md:mt-8">
                            <h2 className="text-lg sm:text-xl font-medium text-white">Description</h2>
                            <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-left text-sm sm:text-base text-white/70">
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

                        <div className="text-left mt-6 md:mt-8 border-t border-gray-700 pt-6 md:pt-8 mb-8 sm:mb-12">
                            <h2 className="text-lg sm:text-xl font-medium text-white text-center">Features & Benefits</h2>
                            <div className="mt-3 sm:mt-4">
                                <ul className="!list-disc space-y-2 pl-5 text-sm sm:text-base text-white/70 marker:text-gray-500">
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
                        {/* Button Container: flex-col on small, sm:flex-row on larger, with flex-wrap */}
                        <div className="flex flex-col !w-full sm:flex-row flex-wrap items-center sm:items-stretch gap-3 sm:gap-4 text-white relative z-0 mb-8">
                            <AddToCartButton
                                lines={[{
                                    quantity: 1,
                                    merchandiseId: product?.variants?.nodes?.[0]?.id as string,
                                }]}
                                onClick={() => {
                                    if (product?.variants?.nodes?.[0]?.id) {
                                        open("cart");
                                    }
                                }}
                            >
                                {/* Responsive button styling AND width control */}
                                <div className="flex-grow-1 group !w-full sm:w-auto bg-[#FF0000] px-6 py-3 sm:px-8 sm:py-3 lg:px-10 lg:pt-4 lg:pb-2 rounded-full font-bevvy text-lg sm:text-xl lg:text-[22px] relative z-50 transition-all duration-300 hover:cursor-pointer text-center">
                                    <span className="font-bevvy transition-all duration-300 text-white whitespace-nowrap">
                                        Add to Cart
                                    </span>
                                </div>
                            </AddToCartButton>
                            <Link to="products/bevvy" className="w-full sm:w-auto flex">
                                {/* Responsive button styling AND width control (w-full to fill Link, sm:w-fit for content size) */}
                                <div className="group w-full sm:w-fit bg-[#000] px-6 py-3 sm:px-8 sm:py-3 lg:px-10 lg:pt-4 lg:pb-2 rounded-full font-bevvy text-lg sm:text-xl lg:text-[22px] relative z-50 transition-all duration-300 hover:cursor-pointer text-center">
                                    <span className="font-bevvy transition-all duration-300 !text-white whitespace-nowrap">
                                        Subscribe
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
