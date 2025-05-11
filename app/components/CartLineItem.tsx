import type { CartLineUpdateInput } from "@shopify/hydrogen/storefront-api-types";
import type { CartLayout } from "~/components/CartMain";
import { CartForm, Image, type OptimisticCartLine } from "@shopify/hydrogen";
import { useVariantUrl } from "~/lib/variants";
import { Link } from "@remix-run/react";
import { ProductPrice } from "./ProductPrice";
import { useAside } from "./Aside";
import type { CartApiQueryFragment } from "storefrontapi.generated";

// Modified CartLine type to accept the actual API structure
type CartLine = OptimisticCartLine<CartApiQueryFragment> & {
  sellingPlanAllocation?: {
    sellingPlan: {
      id: string;
      name: string;
      description?: string | null;
    };
  } | null;
};

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();
  const sellingPlanAllocation = line.sellingPlanAllocation || null;

  return (
    <li key={id} className="cart-line pt-4 pb-3 sm:pt-6 sm:pb-2 border-t border-gray-100 first:border-t-0">
      {/* Responsive main layout: stack on mobile, row on sm+ */}
      <div className="flex flex-col items-stretch text-center sm:flex-row sm:text-left sm:items-start gap-3 sm:gap-4">
        {/* Product Image: centered on mobile stack, normal on row */}
        <div className="relative flex-shrink-0 w-full flex justify-center sm:w-auto sm:justify-start mb-2 sm:mb-0">
          {image && (
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === "aside") {
                  close();
                }
              }}
            >
              {/* Responsive image size */}
              <div className="bg-neutral-50 rounded-lg overflow-hidden h-20 w-20 sm:h-24 sm:w-24">
                <Image
                  alt={title}
                  aspectRatio="1/1"
                  data={image}
                  loading="lazy"
                  className="h-full w-full object-contain"
                  width={layout === 'aside' ? 80 : 96} // Slightly smaller for aside potentially
                  height={layout === 'aside' ? 80 : 96}
                />
              </div>
            </Link>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          {/* Inner layout: stack details and quantity on mobile */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
            {/* Left part: details */}
            <div className="flex flex-col items-center sm:items-start">
              <Link
                prefetch="intent"
                to={lineItemUrl}
                onClick={() => {
                  if (layout === "aside") {
                    close();
                  }
                }}
                className="text-neutral-900 hover:text-red-600 transition-colors"
              >
                {/* Responsive title */}
                <p className="font-bevvy text-base sm:text-lg leading-tight line-clamp-2">
                  {product.title}
                </p>
              </Link>

              {/* Price */}
              <div className="mt-1 font-semibold text-neutral-900 text-sm sm:text-base">
                <ProductPrice price={line?.cost?.totalAmount} />
              </div>

              {/* Options */}
              {selectedOptions.length > 0 && (
                <ul className="mt-1 space-y-0.5 text-xs sm:text-sm text-neutral-500">
                  {selectedOptions.map((option) => (
                    <li key={option.name}>
                      <span>
                        {option.name}: {option.value} 
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Subscription details */}
              {sellingPlanAllocation && sellingPlanAllocation.sellingPlan && (
                <div className="mt-1 sm:mt-2">
                  <span className="inline-block px-2 py-0.5 sm:py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                    {sellingPlanAllocation.sellingPlan.name}
                  </span>
                </div>
              )}
            </div>

            {/* Right part: Quantity Controls - ensure it doesn't shrink too much */}
            <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0 flex-shrink-0 sm:ml-4">
              <CartLineQuantity line={line} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({ line }: { line: CartLine }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-quantity flex flex-col items-center sm:items-end space-y-1 sm:space-y-2">
      <div className="text-xs sm:text-sm text-neutral-500 mb-0.5 sm:mb-1">Qty: {quantity}</div> {/* Shortened label */}
      <div className="flex items-center space-x-1">
        <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
          {/* Slightly smaller buttons for mobile if needed */}
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
            className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full border border-gray-200 text-neutral-600 disabled:opacity-50 hover:bg-gray-100 transition-colors"
          >
            <span>&#8722;</span>
          </button>
        </CartLineUpdateButton>
        <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
            className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full border border-gray-200 text-neutral-600 disabled:opacity-50 hover:bg-gray-100 transition-colors"
          >
            <span>&#43;</span>
          </button>
        </CartLineUpdateButton>
      </div>
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <button
        disabled={disabled}
        type="submit"
        className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors"
      >
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join("-");
}
