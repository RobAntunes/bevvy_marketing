import { Link, useNavigate } from "@remix-run/react";
import { type MappedProductOptions } from "@shopify/hydrogen";
import type {
  Maybe,
  ProductOptionValueSwatch,
} from "@shopify/hydrogen/storefront-api-types";
import { useAside } from "./Aside";
import type { ProductFragment } from "storefrontapi.generated";
import { Money } from "@shopify/hydrogen";
import { AddToCartButton } from "./AddToCartButton";

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment["selectedOrFirstAvailableVariant"];
}) {
  const navigate = useNavigate();
  const { open } = useAside();

  return (
    <div className="product-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="product-options" key={option.name}>
            <h5>{option.name}</h5>
            <div className="product-options-grid">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className="product-options-item"
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={{
                        border: selected
                          ? "1px solid black"
                          : "1px solid transparent",
                        opacity: available ? 1 : 0.3,
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={`product-options-item${
                        exists && !selected ? " link" : ""
                      }`}
                      key={option.name + name}
                      style={{
                        border: selected
                          ? "1px solid black"
                          : "1px solid transparent",
                        opacity: available ? 1 : 0.3,
                      }}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
            <br />
          </div>
        );
      })}

      {/* Shipping Note */}
      <div className="bg-blue-50 border border-blue-100 rounded p-4 flex items-center">
        <div className="text-blue-600 font-medium">
          Free shipping on all orders over $90
        </div>
      </div>

      {/* Price Display */}
      {selectedVariant?.price && (
        <div className="mt-4 text-2xl font-bold pb-4">
          <Money data={selectedVariant.price} />
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="mt-2 flex justify-center group w-fit bg-[#FF0000] px-10 pt-4 pb-2 rounded-full font-bevvy text-[24px] relative z-50 transition-all duration-300 text-white hover:bg-[#FF8181] hover:text-[#FF0000] hover:cursor-pointer">
        <AddToCartButton
          disabled={!selectedVariant}
          onClick={() => {
            open("cart");
          }}
          lines={selectedVariant
            ? [
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                selectedVariant,
              },
            ]
            : []}
        >
          Add to cart
        </AddToCartButton>
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch"
      style={{
        backgroundColor: color || "transparent",
      }}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}
