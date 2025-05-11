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
import { SellingPlanGroup, SellingPlanSelector } from "./SellingPlanSelector";
import type {
  ProductWithSellingPlans,
  SellingPlanFragment,
} from "~/types/subscription";
import { useState } from "react";

export function ProductForm({
  productOptions,
  selectedVariant,
  sellingPlanGroups,
  selectedSellingPlan,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment["selectedOrFirstAvailableVariant"];
  sellingPlanGroups?: ProductWithSellingPlans["sellingPlanGroups"];
  selectedSellingPlan?: any | null;
}) {
  const navigate = useNavigate();
  const { open } = useAside();
  const [quantity, setQuantity] = useState(1);

  const hasSubscriptions = !!sellingPlanGroups &&
    Array.isArray(sellingPlanGroups.nodes) &&
    sellingPlanGroups.nodes.length > 0;

  // Track whether to show subscription options
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscribe">(
    selectedSellingPlan ? "subscribe" : "one-time",
  );

  // Handle radio selection change
  const handlePurchaseTypeChange = (type: "one-time" | "subscribe") => {
    setPurchaseType(type);

    // If switching to one-time purchase, remove any selling plan selection from URL
    if (type === "one-time" && selectedSellingPlan) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("selling_plan");
      navigate(currentUrl.pathname + currentUrl.search, {
        replace: true,
        preventScrollReset: true,
      });
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

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
      <div className="bg-blue-50 border border-blue-100 rounded mt-4 p-4 flex items-center">
        <div className="text-blue-600 font-medium">
          Free shipping on all orders over $80
        </div>
      </div>

      <span className="text-gray-700 text-2xl inline-block mt-6">
        {selectedVariant?.title}
      </span>

      {/* Price Display */}
      {selectedVariant?.price && (
        <div className="text-2xl font-bold pb-4">
          <Money data={selectedVariant.price} />
        </div>
      )}

      {/* Purchase Type Selection - Only show if subscriptions are available */}
      {hasSubscriptions && (
        <div className="mt-6 mb-4">
          <div className="font-semibold mb-3">Choose a purchase option:</div>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="purchaseType"
                value="one-time"
                checked={purchaseType === "one-time"}
                onChange={() => handlePurchaseTypeChange("one-time")}
                className="mr-2 h-4 w-4 accent-[#FF0000]"
              />
              <span>One-time purchase</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="purchaseType"
                value="subscribe"
                checked={purchaseType === "subscribe"}
                onChange={() => handlePurchaseTypeChange("subscribe")}
                className="mr-2 h-4 w-4 accent-[#FF0000]"
              />
              <span>Subscribe & save</span>
            </label>
          </div>
        </div>
      )}

      {/* Subscription Options - Only show when subscriptions are available and selected */}
      {hasSubscriptions && purchaseType === "subscribe" && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Delivery frequency:</h2>
          <div className="mb-4">
            <SellingPlanSelector
              sellingPlanGroups={sellingPlanGroups as any}
              selectedSellingPlan={selectedSellingPlan}
              paramKey="selling_plan"
            >
              {({ sellingPlanGroup }) => (
                <SellingPlanGroup
                  key={sellingPlanGroup.name}
                  sellingPlanGroup={sellingPlanGroup}
                />
              )}
            </SellingPlanSelector>
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mt-6 mb-4">
        <div className="font-semibold mb-3">Quantity:</div>
        <div className="flex items-center gap-3">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 text-neutral-600 disabled:opacity-50 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="text-xl font-medium w-10 text-center">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 text-neutral-600 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Add to Cart and Subscribe Buttons */}
      <div className="mt-4">
        {/* Single button for both one-time purchase and subscription */}
        <div className="my-4 group w-fit bg-[#FF0000] px-8 pt-4 pb-2 rounded-full font-bevvy text-[24px] relative z-50 transition-all duration-300 text-white hover:bg-[#FF8181] hover:text-[#FF0000] hover:cursor-pointer">
          <AddToCartButton
            disabled={!selectedVariant || !selectedVariant.availableForSale ||
              (purchaseType === "subscribe" && !selectedSellingPlan)}
            onClick={() => {
              open("cart");
            }}
            lines={selectedVariant
              ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity,
                  selectedVariant,
                  ...(purchaseType === "subscribe" && selectedSellingPlan &&
                    { sellingPlanId: selectedSellingPlan.id }),
                },
              ]
              : []}
          >
            {purchaseType === "subscribe" ? "Subscribe Now" : "Add to Cart"}
          </AddToCartButton>
        </div>
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
