export const MANAGE_FEE_REVERSAL_ROUTES = {
  CREATE_FEE_REVERSAL: `/create-fee-reversal`,
  FEE_REVERSAL_SUMMARY: `/fee-reversal-summary`,
  FEE_AND_PLAN_DETAILS: `/fee-and-plan-details`,
  FEE_REVERSAL_DETAIL: "/fee-reversal-detail",
};

export const manageFeeReversalFormNames = {
  FEE_REVERSAL_FILTER_FORM: "feeReversalFilterForm",
  CREATE_FEE_REVERSAL_FORM: "createFeeReversalForm",
  FEE_REVERSAL_SUMMARY: "feeReversalSummary",
};

export const feeReversalFields = {
  [manageFeeReversalFormNames.FEE_REVERSAL_FILTER_FORM]: {
    planId: "planId",
    search: "search",
    reversalLabelId: "reversalLabelId",
    reversalId: "reversalId",
    dateRange: "dateRange",
    fromDate: "fromDate",
    toDate: "toDate",
    planName: "planName",
    rkPlanNumber: "rkPlanNumber",
    status: "status",
    feeType: "feeType",
  },
  [manageFeeReversalFormNames.FEE_REVERSAL_SUMMARY]: {
    checker: "checker",
  },
  [manageFeeReversalFormNames.CREATE_FEE_REVERSAL_FORM]: {
    search: "search",
    dateRange: "dateRange",
    fromDate: "fromDate",
    toDate: "toDate",
    planName: "planName",
    planId: "planId",
    feeType: "feeType",
    feeName: "feeName",
    feeId: "feeId",
    feeTransactionReference: "feeTransactionReference",
    feeRunDate: "feeRunDate",
    feeRunType: "feeRunType",
    totalFeeCollected: "totalFeeCollected",
  },
};

export const FEE_REVERSAL_STATUS = {
  1: "Awaiting trade",
  2: "Awaiting settlement",
  3: "Completed",
  4: "Failed",
  5: "Partially completed",
};

export const FEE_REVERSAL_EMPLOYEE_STATUS = {
  1: "Completed",
  2: "Exempted",
};

export const FeeReversalStatus = [
  { id: 1, label: "Awaiting trade" },
  { id: 2, label: "Awaiting settlement" },
  { id: 3, label: "Completed" },
  { id: 4, label: "Failed" },
  { id: 5, label: "Partially completed" },
];

export const FEE_TYPE_OPTIONS = {
  ALL: "All",
  BALANCE_BASED: "Balance-Based",
  INVESTMENT_BASED: "Investment-Based",
  MAINTENANCE_BASED: "Maintenance-Based",
};

export const FeeTypeList = [
  { id: 0, label: "All", value: 0 },
  { id: 1, label: "Balance-Based", value: 1 },
  { id: 2, label: "Investment-Based", value: 2 },
  { id: 3, label: "Maintenance-Based", value: 3 },
];
