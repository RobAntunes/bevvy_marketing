// Shared subscription-related types
import type { ProductFragment } from "storefrontapi.generated";

export interface SellingPlanFragment {
  id: string;
  name?: string;
  description?: string | null;
  options?: Array<{
    name: string;
    value: string;
  }>;
  priceAdjustments?: Array<{
    orderCount: number;
    adjustmentValue: {
      adjustmentPercentage?: number;
      adjustmentAmount?: {
        amount: string;
        currencyCode: string;
      };
    };
  }>;
}

export interface SellingPlanGroupFragment {
  name: string;
  options?: Array<{
    name: string;
    values: Array<string>;
  }>;
  sellingPlans: {
    nodes: SellingPlanFragment[];
  };
}

/* Enriched sellingPlan type including isSelected and url */
export type SellingPlan = SellingPlanFragment & {
  isSelected: boolean;
  url: string;
};

/* Enriched sellingPlanGroup type including enriched SellingPlan nodes */
export type SellingPlanGroup = Omit<
  SellingPlanGroupFragment,
  'sellingPlans'
> & {
  sellingPlans: {
    nodes: SellingPlan[];
  };
};

// Extend ProductFragment to include sellingPlanGroups
export interface ProductWithSellingPlans extends ProductFragment {
  sellingPlanGroups: {
    nodes: SellingPlanGroupFragment[];
  };
}