import type {
  ProductFragment,
} from 'storefrontapi.generated';
import {useMemo} from 'react';
import {useLocation, Link} from '@remix-run/react';
import {
  SellingPlanFragment,
  SellingPlanGroupFragment,
  SellingPlan,
  SellingPlanGroup
} from '~/types/subscription';

/**
 * A component that simplifies selecting sellingPlans subscription options
 * @example Example use
 * ```ts
 *   <SellingPlanSelector
 *     sellingPlanGroups={sellingPlanGroups}
 *     selectedSellingPlanId={selectedSellingPlanId}
 *   >
 *     {({sellingPlanGroup}) => ( ...your sellingPlanGroup component )}
 *  </SellingPlanSelector>
 *  ```
 **/
export function SellingPlanSelector({
  sellingPlanGroups,
  selectedSellingPlan,
  children,
  paramKey = 'selling_plan',
}: {
  sellingPlanGroups: ProductFragment['sellingPlanGroups'];
  selectedSellingPlan: SellingPlanFragment | null;
  paramKey?: string;
  children: (params: {
    sellingPlanGroup: SellingPlanGroup;
    selectedSellingPlan: SellingPlanFragment | null;
  }) => React.ReactNode;
}) {
  const {search, pathname} = useLocation();
  const params = new URLSearchParams(search);

  return useMemo(
    () =>
      (sellingPlanGroups.nodes as SellingPlanGroup[]).map(
        (sellingPlanGroup) => {
          // Augment each sellingPlan node with isSelected and url
          const sellingPlans = sellingPlanGroup.sellingPlans.nodes
            .map((sellingPlan: SellingPlan) => {
              if (!sellingPlan?.id) {
                console.warn(
                  'SellingPlanSelector: sellingPlan.id is missing in the product query',
                );
                return null;
              }
              
              const isSelected = selectedSellingPlan?.id === sellingPlan.id;
              
              // Create two URL states - one for selecting and one for deselecting
              const paramsForSelection = new URLSearchParams(search);
              paramsForSelection.set(paramKey, sellingPlan.id);
              
              const paramsForDeselection = new URLSearchParams(search);
              paramsForDeselection.delete(paramKey);
              
              // If this plan is already selected, use the deselection URL
              // otherwise use the selection URL
              sellingPlan.url = isSelected 
                ? `${pathname}?${paramsForDeselection.toString()}`
                : `${pathname}?${paramsForSelection.toString()}`;
              
              sellingPlan.isSelected = isSelected;
              return sellingPlan;
            })
            .filter(Boolean) as SellingPlan[];
          sellingPlanGroup.sellingPlans.nodes = sellingPlans;
          return children({sellingPlanGroup, selectedSellingPlan});
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sellingPlanGroups, children, selectedSellingPlan, paramKey, pathname, search],
  );
}

/**
 * A component to display a selling plan group with its options
 */
export function SellingPlanGroup({
  sellingPlanGroup,
}: {
  sellingPlanGroup: SellingPlanGroup;
}) {
  return (
    <div className="selling-plan-group mt-4" key={sellingPlanGroup.name}>
      <p className="selling-plan-group-title font-semibold mb-3 text-neutral-800">
        <strong>{sellingPlanGroup.name}:</strong>
      </p>
      <div className="flex flex-wrap gap-4">
        {sellingPlanGroup.sellingPlans.nodes.map((sellingPlan) => {
          return (
            <Link
              key={sellingPlan.id}
              prefetch="intent"
              to={sellingPlan.url}
              className={`relative selling-plan px-6 py-4 shadow-md rounded-lg text-sm transition-all duration-200 min-w-[140px] h-[90px] flex items-center justify-center bg-white ${
                sellingPlan.isSelected
                  ? 'border-2 border-[#FF0000] transform scale-105'
                  : 'border border-gray-200 hover:border-gray-400 hover:shadow-lg'
              }`}
              preventScrollReset
              replace
              aria-label={sellingPlan.isSelected ? `Deselect ${sellingPlan.name || 'subscription option'}` : `Select ${sellingPlan.name || 'subscription option'}`}
            >
              {/* Red indicator in the top right when selected */}
              {sellingPlan.isSelected && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className="text-center">
                <p className="text-neutral-900 font-medium">
                  {sellingPlan.options.map(
                    (option) => `${option.value}`,
                  )}
                </p>
                {sellingPlan.name && (
                  <p className="text-xs text-neutral-500 mt-1">
                    {sellingPlan.name}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 