import { Link } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import type {
  ProductItemFragment,
} from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";

export function ProductItem({
  product,
  loading,
}: {
  product:
    | ProductItemFragment;
  loading?: "eager" | "lazy";
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <div className="flex flex-col gap-2 shadow-lg" key={product.id}>
      <Link
        className="product-item w-full h-full"
        prefetch="intent"
        to={variantUrl}
      >
        {image && (
          <Image
            className="!w-[200px] !h-[200px]"
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
          />
        )}
        <h4 className="text-sm text-neutral-600">
          {product.handle[0].toUpperCase() + product.handle.slice(1)}
        </h4>
        <small>
          <Money data={product.priceRange.minVariantPrice} />
        </small>
      </Link>
    </div>
  );
}
