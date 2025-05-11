import { type LoaderFunctionArgs, redirect } from "@shopify/remix-oxygen";
import { type MetaFunction, useLoaderData } from "@remix-run/react";
import {
  Analytics,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  getSelectedProductOptions,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from "@shopify/hydrogen";
import { ProductPrice } from "~/components/ProductPrice";
import { ProductImage } from "~/components/ProductImage";
import { ProductForm } from "~/components/ProductForm";
import { redirectIfHandleIsLocalized } from "~/lib/redirect";
import { useState } from "react";
import type { SellingPlanFragment, ProductWithSellingPlans } from "~/types/subscription";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `Bevvy | ${data?.product.title ?? ""}` },
    {
      rel: "canonical",
      href: `/products/${data?.product.handle}`,
    },
  ];
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
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error("Expected product handle to be defined");
  }

  // Get the selling plan ID from URL params if it exists
  const url = new URL(request.url);
  const sellingPlanId = url.searchParams.get('selling_plan');

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  // Find the selected selling plan if ID is provided
  let selectedSellingPlan = null;
  if (sellingPlanId && product.sellingPlanGroups?.nodes) {
    for (const group of product.sellingPlanGroups.nodes) {
      if (!group?.sellingPlans?.nodes) continue;
      
      const foundPlan = group.sellingPlans.nodes.find(
        (plan: SellingPlanFragment) => plan?.id === sellingPlanId
      );
      
      if (foundPlan) {
        selectedSellingPlan = foundPlan;
        break;
      }
    }
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
    selectedSellingPlan,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, params }: LoaderFunctionArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const { product, selectedSellingPlan } = useLoaderData<typeof loader>();
  const productWithSellingPlans = product as unknown as ProductWithSellingPlans;

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml } = product;

  // Image gallery state
  const variantImage = selectedVariant?.image;
  const productImages = product.images?.nodes || [];

  // Make sure the variant image is the first in the array if it exists
  const allImages = variantImage
    ? [
      variantImage,
      ...productImages.filter((img: any) => img.url !== variantImage.url),
    ]
    : productImages;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = allImages[currentImageIndex] || variantImage;

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center mt-12 font-sewimple tracking-wide">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="flex flex-col space-y-4">
            {/* Main Image */}
            <div className="bg-neutral-50 rounded-lg overflow-hidden w-full">
              {currentImage
                ? (
                  <img
                    src={currentImage.url}
                    alt={currentImage.altText || title}
                    width={currentImage.width || 1000}
                    height={currentImage.height || 1000}
                    className="w-full h-auto object-contain aspect-square"
                  />
                )
                : <ProductImage image={variantImage} />}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex overflow-x-auto space-x-2 pb-1">
                {allImages.map((image: any, index: number) => (
                  <button
                    key={`${image.url}-${index}`}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? "border-red-500"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `Product image ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Title and Price */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="!text-[96px] font-bevvy text-neutral-900 ">
                {title}
              </h1>
              <div className="text-2xl text-gray-700 mb-2 font-sewimple">
                Drink to enhance your mood and energy
              </div>
            </div>

            {/* Product Form */}
            <div className="py-6 border-b border-gray-100">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
                sellingPlanGroups={productWithSellingPlans.sellingPlanGroups}
                selectedSellingPlan={selectedSellingPlan}
              />
            </div>

            {/* Description */}
            <div>
              <div
                className="prose overflow-y-auto pr-4 text-neutral-700 font-sewimple"
                style={{ scrollbarWidth: "thin" }}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </div>

            
          </div>
        </div>
      </div>

      {selectedVariant?.id && (
        <Analytics.ProductView
          data={{
            products: [
              {
                id: product.id,
                title: product.title,
                price: selectedVariant.price.amount || "0",
                vendor: product.vendor,
                variantId: selectedVariant.id,
                variantTitle: selectedVariant.title || "",
                quantity: 1,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      priceRange {
        minVariantPrice {
          amount
        }
        maxVariantPrice {
          amount
        }
      }
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    images(first: 10) {
      nodes {
        url
        altText
        width
        height
      }
    }
    seo {
      description
      title
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
                    amount
                    currencyCode
                  }
                }
                ... on SellingPlanPercentagePriceAdjustment {
                  adjustmentPercentage
                }
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
