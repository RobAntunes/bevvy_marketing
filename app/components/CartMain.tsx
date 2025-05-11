import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={`cart-main ${withDiscount ? 'with-discount' : ''} bg-white rounded-lg p-6 font-sewimple relative z-[50]`}>
      <h2 className="text-3xl font-sewimple text-neutral-900 mb-6 tracking-wide">Your Cart</h2>
      
      <CartEmpty hidden={linesCount} layout={layout} />
      
      <div className="cart-details">
        {cartHasItems && (
          <div aria-labelledby="cart-lines" className="mb-8">
            <ul className="space-y-6 divide-y divide-gray-100">
              {(cart?.lines?.nodes ?? []).map((line) => (
                <CartLineItem key={line.id} line={line} layout={layout} />
              ))}
            </ul>
          </div>
        )}
        
        {cartHasItems && (
          <div className="border-t border-gray-200 pt-6">
            <CartSummary cart={cart} layout={layout} />
          </div>
        )}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
  layout = 'page',
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  return (
    <div hidden={hidden} className="text-center py-12">
      <div className="mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </div>
      
      <p className="text-xl mb-6 text-gray-600">
        Your cart is currently empty
      </p>
      
      <Link 
        to="/collections" 
        onClick={close} 
        prefetch="viewport"
        className="inline-block bg-[#FF0000] text-white px-6 py-3 rounded-full font-bevvy text-lg hover:bg-[#FF8181] hover:text-[#FF0000] transition-all duration-300"
      >
        Continue shopping
      </Link>
    </div>
  );
}
