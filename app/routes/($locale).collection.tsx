import { type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { type MetaFunction, useLoaderData } from "@remix-run/react";
import { getPaginationVariables } from "@shopify/hydrogen";
import { PaginatedResourceSection } from "~/components/PaginatedResourceSection";
import { ProductItem } from "~/components/ProductItem";
import { Product } from "@shopify/hydrogen/storefront-api-types";

export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: `Bevvy | Shop` }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context, request }: LoaderFunctionArgs) {
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const [{ products }] = await Promise.all([
    storefront.query(FIRST_PRODUCT_ITEM_FRAGMENT, {
      variables: paginationVariables as any,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
  return { products };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {};
}

export default function Collection() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="p-12 w-full">
      <h1 className="text-4xl font-sewimple text-neutral-900">
        Products
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:w-2/3">
          <PaginatedResourceSection
            connection={products as any}
            resourcesClassName="products-grid"
          >
            {({ node: product, index }: { node: Product; index: number }) => (
              <ProductItem
                key={product.id}
                product={product}
                loading={index < 8 ? "eager" : undefined}
              />
            )}
          </PaginatedResourceSection>
        </div>
      </div>
    </div>
  );
}

const FIRST_PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment SellingPlanFragment on SellingPlan {
    id
    name
    description
    options {
      name
      value
    }
    priceAdjustments {
      orderCount
      adjustmentValue {
        ... on SellingPlanFixedAmountPriceAdjustment {
          adjustmentAmount {
            ...MoneyCollectionItem
          }
        }
        ... on SellingPlanPercentagePriceAdjustment {
          adjustmentPercentage
        }
      }
    }
  }
  query Products($first: Int, $last: Int, $startCursor: String, $endCursor: String) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        id
        title
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            ...MoneyCollectionItem
          }
          maxVariantPrice {
            ...MoneyCollectionItem
          }
        }
        handle
        description
        images(first:4) {
          nodes {
            url
            width
            height
          }
        }
        metafield(namespace: "custom", key: "info") {
          value
        }
        sellingPlanGroups(first: 5) {
          nodes {
            name
            options {
              name
              values
            }
            sellingPlans(first: 5) {
              nodes {
                ...SellingPlanFragment
              }
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
` as const;
