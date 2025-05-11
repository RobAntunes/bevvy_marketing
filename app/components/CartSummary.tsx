import type { CartApiQueryFragment } from "storefrontapi.generated";
import type { CartLayout } from "~/components/CartMain";
import { CartForm, Money, type OptimisticCart } from "@shopify/hydrogen";
import { useRef } from "react";
import { FetcherWithComponents } from "@remix-run/react";

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({ cart, layout }: CartSummaryProps) {
  return (
    <div aria-labelledby="cart-summary" className="cart-summary">
      <h4 className="text-xl font-sewimple text-neutral-900 mb-4">
        Order Summary
      </h4>

      <div className="space-y-4">
        <dl className="flex justify-between items-center">
          <dt className="text-neutral-600">Subtotal</dt>
          <dd className="font-semibold text-neutral-900">
            {cart.cost?.subtotalAmount?.amount
              ? <Money data={cart.cost?.subtotalAmount} />
              : (
                "-"
              )}
          </dd>
        </dl>

        <CartDiscounts discountCodes={cart.discountCodes} />
        <CartGiftCard giftCardCodes={cart.appliedGiftCards} />

        {cart.cost?.totalAmount && (
          <dl className="flex justify-between items-center pt-4 border-t border-gray-200">
            <dt className="text-lg font-semibold text-neutral-900">Total</dt>
            <dd className="text-lg font-bold text-red-600">
              <Money data={cart.cost.totalAmount} />
            </dd>
          </dl>
        )}

        <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
      </div>
    </div>
  );
}

function CartCheckoutActions({ checkoutUrl }: { checkoutUrl?: string }) {
  if (!checkoutUrl) return null;

  return (
    <div className="mt-6 flex flex-col gap-4 items-center justify-center">
      <a
        href={checkoutUrl}
        target="_self"
        className="flex items-center justify-center !m-0 w-full bg-[#FF0000] !text-white text-center px-6 !py-3 rounded-full font-bevvy !text-2xl hover:bg-[#FF8181] hover:text-[#FF0000] transition-all duration-300"
      >
        <span className="text-2xl font-bevvy relative top-[5px]">Checkout</span>
      </a>

      <p className="text-center text-sm text-neutral-500 mt-4">
        Shipping & taxes calculated at checkout
      </p>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment["discountCodes"];
}) {
  const codes: string[] = discountCodes
    ?.filter((discount) => discount.applicable)
    ?.map(({ code }) => code) || [];

  return (
    <div className="space-y-3">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="flex justify-between items-center">
        <dt className="text-neutral-600">Discount</dt>
        <dd className="flex items-center">
          <UpdateDiscountForm>
            <div className="flex items-center">
              <code className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm">
                {codes?.join(", ")}
              </code>
              <button className="ml-2 text-sm text-red-600 hover:text-red-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </UpdateDiscountForm>
        </dd>
      </dl>

      {/* Show an input to apply a discount */}
      <div hidden={codes.length > 0}>
        <UpdateDiscountForm discountCodes={codes}>
          <div className="mt-2 flex items-baseline">
            <input
              type="text"
              name="iscountCode"
              placeholder="Discount code"
              className="flex-[1] min-w-0 px-4 py-2 h-10 border-r-0 rounded-l-lg !rounded-r-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              type="submit"
              className="h-10 !my-0 !py-0 flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 hover:cursor-pointer px-4 bg-neutral-900 text-white font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </UpdateDiscountForm>
      </div>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment["appliedGiftCards"] | undefined;
}) {
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const codes: string[] =
    giftCardCodes?.map(({ lastCharacters }) => `***${lastCharacters}`) || [];

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, ""); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    giftCardCodeInput.current!.value = "";
  }

  function removeAppliedCode() {
    appliedGiftCardCodes.current = [];
  }

  return (
    <div className="space-y-3">
      {/* Have existing gift card applied, display it with a remove option */}
      <dl hidden={!codes.length} className="flex justify-between items-center">
        <dt className="text-neutral-600">Gift Card</dt>
        <dd className="flex items-center">
          <UpdateGiftCardForm>
            <div className="flex items-center">
              <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                {codes?.join(", ")}
              </code>
              <button
                className="ml-2 text-sm text-red-600 hover:text-red-800"
                onSubmit={() => removeAppliedCode}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </UpdateGiftCardForm>
        </dd>
      </dl>

      {/* Show an input to apply a gift card */}
      <div hidden={codes.length > 0}>
        <UpdateGiftCardForm
          giftCardCodes={appliedGiftCardCodes.current}
          saveAppliedCode={saveAppliedCode}
        >
          <div className="mt-2 flex items-baseline">
            <input
              type="text"
              name="giftCardCode"
              placeholder="Gift card code"
              ref={giftCardCodeInput}
              className="flex-[1] min-w-0 px-4 py-2 h-10 rounded-l-lg border-gray-200 !rounded-r-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              type="submit"
              className="h-10 !my-0 !py-0 flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 hover:cursor-pointer px-4 bg-neutral-900 text-white font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </UpdateGiftCardForm>
      </div>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  removeAppliedCode?: () => void;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get("giftCardCode");
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}
