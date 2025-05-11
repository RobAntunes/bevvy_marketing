import { json, LoaderFunctionArgs } from "@shopify/remix-oxygen";

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  // Get user's preferred currency from query param or cookie
  const url = new URL(request.url);
  const currencyParam = url.searchParams.get("currency");

  // Get user locale from browser
  const acceptLanguage = request.headers.get("accept-language") || "en-US";
  const locale = acceptLanguage.split(",")[0].split("-")[0] || "en";

  if (!handle) {
    return json({ error: "Product handle is required" }, { status: 400 });
  }

  // Use the same localization context as the rest of the store
  const { product } = await storefront.query(PRODUCT_PRICE_QUERY, {
    variables: { handle },
  });

  if (!product) {
    return json({ error: "Product not found" }, { status: 404 });
  }

  return json({ product });
}

const PRODUCT_PRICE_QUERY = `#graphql
  query ProductPrice($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      variants(first: 1) {
        nodes {
          id
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
` as const;

const SHOP_CURRENCY_QUERY = `#graphql
  query ShopCurrencies {
    shop {
      name
      paymentSettings {
        currencyCode
        acceptedCardBrands
        supportedDigitalWallets
      }
    }
  }
` as const;
