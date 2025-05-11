import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    return json({ error: "Product handle is required" }, { status: 400 });
  }

  try {
    const { product } = await storefront.query(PRODUCT_PRICE_QUERY, {
      variables: { handle },
    });

    if (!product) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    return json({ product });
  } catch (error) {
    console.error('Error fetching product in API route:', error);
    return json({ error: "Failed to fetch product data" }, { status: 500 });
  }
}

const PRODUCT_PRICE_QUERY = `#graphql
  query ProductPriceForOverview($handle: String!) {
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