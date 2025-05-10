import { Link } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import type { ProductItemFragment } from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";

export function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: "eager" | "lazy";
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <div
      className="flex flex-col gap-2 w-fit shadow-2xl rounded-lg font-semibold tracking-tighter hover:scale-105 transition-all duration-300"
      key={product.id}
    >
      <Link
        className="hover:cursor-pointer transition-all duration-300 !decoration-0 !decoration-white"
        prefetch="intent"
        to={variantUrl}
      >
        <div className="p-6">
          {image && (
            <Image
              className="!w-[200px] !h-[200px]"
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
            />
          )}
        </div>
        <div className="flex flex-col gap-2 bg-[#FF0000] !text-white px-6 py-4 rounded-b-lg">
          <h4 className=" !text-white font-bevvy text-3xl tracking-normal">
            {product.handle[0].toUpperCase() + product.handle.slice(1)}
          </h4>
          <small className="!text-white font-semibold">
            <Money data={product.priceRange.minVariantPrice} />
          </small>
        </div>
      </Link>
    </div>
  );
}
