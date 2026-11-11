import { ROUTES } from "./common";

export const MANAGE_CORPORATE_ACTIONS_ROUTES = {
  MANAGE_FUND_SWITCH: `manage-fund-switch`,
  MANAGE_FUND_SWITCH_LINK: `/corporate-action/manage-fund-switch`,
  ADD_FUND_SWITCH: `add-fund-switch`,
  ADD_FUND_SWITCH_LINK: `/corporate-action/add-fund-switch`,
  STOCK_SPLIT: `manage-stock-split`,
  ADD_STOCK_SPLIT: `add-stock-split`,
  FUND_MERGER: `manage-fund-merger`,
  FUND_MERGER_LINK: `/corporate-action/manage-fund-merger`,
  ADD_FUND_MERGER: `add-fund-merger`,
  FUND_MERGER_SUMMARY: `fund-merger-summary`,
  FUND_SWITCH_SUMMARY: `fund-switch-summary`,
  STOCK_SPLIT_SUMMARY: `stock-split-summary`,
  DIVIDEND: `manage-dividend`,
  DIVIDEND_LINK: `/corporate-action/manage-dividend`,
  BASIC_DETAILS: `basicDetails`,
  DIVIDEND_DETAILS: `dividendDetails`,
  EXCLUSION_DETAILS: `exclusionDetails`,
  SCHEDULE_DIVIDENDS: `scheduleDividends`,
  SUMMARY: `summary`,
  DIVIDEND_SUMMARY: `dividend-summary-details`,
  DIVIDEND_RUN_DETAILS: `dividend-run-details`,
};

export const MANAGE_CORPORATE_ACTIONS_MENU = [
  {
    id: "fundSwitch",
    label: "Fund Switch",
    path: MANAGE_CORPORATE_ACTIONS_ROUTES.MANAGE_FUND_SWITCH,
    contentHeader: "Fund Switch",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "stockSplit",
    label: "Stock Split",
    path: MANAGE_CORPORATE_ACTIONS_ROUTES.STOCK_SPLIT,
    contentHeader: "Transactions",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "fundMerger",
    label: "Fund Merger",
    path: MANAGE_CORPORATE_ACTIONS_ROUTES.FUND_MERGER,
    contentHeader: "Plans",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "dividend",
    label: "Dividend",
    path: MANAGE_CORPORATE_ACTIONS_ROUTES.DIVIDEND,
    contentHeader: "History",
    breadCrumbs: [],
    childRoutes: [],
  },
];

export const manageCorporateActionFormNames = {
  FUND_SWITCH: "fund switch",
  FILTER_FIELDS: "filter_fields",
  FUND_MERGER: "fund merger",
  MERGER_FIELDS: "merger fields",
  DIVIDEND_DETAILS: "dividend details",
  STOCK_SPLIT: "stock split",
  DIVIDEND_FILTER: "dividend-filter",
  DIVIDEND_BASIC_DETAILS: "dividend basic details",
  DIVIDEND_EXCLUSION_DETAILS: "dividend exclusion details",
  SCHEDULE_DIVIDEND: "scheduleDividend",
};

export const corporateActionFormFields = {
  [manageCorporateActionFormNames.FUND_SWITCH]: {
    level: "level",
    effectiveDate: "effectiveDate",
    fundName: "fundName",
    description: "fundChangeDescription",
    periodDate: "periodDate",
    sameFundAllocation: "sameFundAllocation",
    fromCategory: "fromCategory",
    toCategory: "toCategory",
    allocationPercentage: "allocationPercentage",
  },
  [manageCorporateActionFormNames.FUND_MERGER]: {
    EffectiveDate: "effectiveDate",
    Name: "name",
    Description: "description",
    RecordDate: "recordDate",
    RatioNumerator: "ratioNumerator",
    RatioDenominator: "ratioDenominator",
  },
  [manageCorporateActionFormNames.DIVIDEND_BASIC_DETAILS]: {
    investmentId: "investmentId",
    dividendDescription: "dividendDescription",
    recordDate: "recordDate",
    recordDateUnits: "recordDateUnits",
    clearingPartnerId: "clearingPartnerId",
    dividendType: "dividendType",
    clearingPartnerAccountIdentifier: "clearingPartnerAccountIdentifier",
    clearingPartnerName: "clearingPartnerName",
    cusip: "cusip",
    planName: "planName",
    rkPlanNumber: "rkPlanNumber",
    planId: "planId",
  },
  [manageCorporateActionFormNames.DIVIDEND_DETAILS]: {
    reinvestmentDate: "reinvestmentDate",
    reinvestmentNAV: "reinvestmentNAV",
    dividendRate: "dividendRate",
    dividendAmount: "dividendAmount",
    dividendUnits: "dividendUnits",
    // accrualStartDate: "accrualStartDate",
    periodFrom: "periodFrom",
    periodTo: "periodTo",
    paymentDays: "paymentDays",
    accrualEndDate: "accrualEndDate",
    rate: "rate",
  },
  [manageCorporateActionFormNames.SCHEDULE_DIVIDEND]: {
    processDate: "processDate",
    processTime: "processTime",
    processTimeHours: "processTimeHours",
    processTimeMinutes: "processTimeMinutes",
  },
  [manageCorporateActionFormNames.STOCK_SPLIT]: {
    name: "name",
    description: "description",
    effectiveDate: "effectiveDate",
    recordDate: "recordDate",
    ratioNumerator: "ratioNumerator",
    ratioDenominator: "ratioDenominator",
    recordUnits: "recordUnits",
  },
};
export const corporateActionFilterFields = {
  [manageCorporateActionFormNames.FILTER_FIELDS]: {
    searchValue: "searchValue",
    transactionDateRange: "transactionDateRange",
    transactionFromDate: "transactionFromDate",
    transactionToDate: "transactionToDate",
    recordDateRange: "recordDateRange",
    recordFromDate: "recordFromDate",
    recordToDate: "recordToDate",
  },
  [manageCorporateActionFormNames.MERGER_FIELDS]: {
    SearchString: "searchString",
    RecordDateRange: "RecordDateRange",
    StartDate: "StartDate",
    EndDate: "EndDate",
    EffectiveDateRange: "EffectiveDateRange",
  },
  [manageCorporateActionFormNames.DIVIDEND_FILTER]: {
    dividendType: "dividendType",
    dividendStatus: "dividendStatus",
    cusip: "cusip",
    searchInput: "searchInput",
    investmentId: "investmentId",
    fromDate: "fromDate",
    toDate: "toDate",
    dateRange: "dateRange",
    sortOrder: "sortOrder",
    planId: "planId",
    planName: "planName",
    rkPlanNumber: "rkPlanNumber",
  },
  [manageCorporateActionFormNames.DIVIDEND_EXCLUSION_DETAILS]: {
    excludeEmployeesWithZeroInvestmentUnits:
      "excludeEmployeesWithZeroInvestmentUnits",
    excludeTerminatedEmployees: "excludeTerminatedEmployees",
  },
};

export const DIVIDEND_RUN_DETAILS_MENU = [
  {
    id: "dividendSummary",
    label: "Dividend Summary",
    step: 1,
    path: MANAGE_CORPORATE_ACTIONS_ROUTES.DIVIDEND_SUMMARY,
    contentHeader: "Dividend Summary",
    breadCrumbs: [],
  },
  {
    id: "dividendRunDetails",
    label: "Dividend Run Details",
    step: 2,
    path: MANAGE_CORPORATE_ACTIONS_ROUTES.DIVIDEND_RUN_DETAILS,
    contentHeader: "Dividend Run Details",
    breadCrumbs: [],
  },
];

export const CREATE_DIVIDEND_MENU = [
  {
    id: "basicDetails",
    label: "Basic Details",
    step: 1,
    path: `/${ROUTES.CREATE_DIVIDENDS}/${MANAGE_CORPORATE_ACTIONS_ROUTES.BASIC_DETAILS}`,
    contentHeader: "Basic Details",
    breadCrumbs: [],
  },
  {
    id: "dividendDetails",
    label: "Dividend Details",
    step: 2,
    path: `/${ROUTES.CREATE_DIVIDENDS}/${MANAGE_CORPORATE_ACTIONS_ROUTES.DIVIDEND_DETAILS}`,
    contentHeader: "Dividend Details",
    breadCrumbs: [],
  },
  {
    id: "exclusionDetails",
    label: "Exclusion Details",
    step: 3,
    path: `/${ROUTES.CREATE_DIVIDENDS}/${MANAGE_CORPORATE_ACTIONS_ROUTES.EXCLUSION_DETAILS}`,
    contentHeader: "Exclusion Details",
    breadCrumbs: [],
  },
  {
    id: "scheduleDividend",
    label: "Schedule Dividend",
    step: 4,
    path: `/${ROUTES.CREATE_DIVIDENDS}/${MANAGE_CORPORATE_ACTIONS_ROUTES.SCHEDULE_DIVIDENDS}`,
    contentHeader: "Schedule Dividend",
    breadCrumbs: [],
  },
  {
    id: "summary",
    label: "Summary",
    step: 5,
    path: `/${ROUTES.CREATE_DIVIDENDS}/${MANAGE_CORPORATE_ACTIONS_ROUTES.SUMMARY}`,
    contentHeader: "Summary",
    breadCrumbs: [],
  },
];

export const corporateActionStockSplit = {
  [manageCorporateActionFormNames.STOCK_SPLIT]: {},
};

export const getClassNameForStatus = (status) => {
  switch (status) {
    case 1:
      return "status-submit";
    case 2:
      return "status-awaiting";
    case 3:
      return " status-complete";
    case 6:
      return "status-submit";
    default:
      return "";
  }
};

export const ALL_MANAGE_DIVIDEND_ROUTES = [
  ...MANAGE_CORPORATE_ACTIONS_MENU,
  ...CREATE_DIVIDEND_MENU,
  ...DIVIDEND_RUN_DETAILS_MENU,
];
