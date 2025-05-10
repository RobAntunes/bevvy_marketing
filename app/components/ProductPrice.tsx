import { Money } from "@shopify/hydrogen";
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types";

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  return (
    <div className="product-price">
      {price
        ? (
          <span className="text-red-600 font-bold">
            <Money data={price} />
          </span>
        )
        : <span>&nbsp;</span>}
    </div>
  );
}
