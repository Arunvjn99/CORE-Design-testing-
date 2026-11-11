export const MANAGE_TRADE_ROUTES = {
  TRANSACTION_VIEW: `transaction-view`,
  INVESTMENT_VIEW: `investment-view`,
  TRADE_ORDER_INSTRUCTION: `trade-order-instruction`,
  TRADE_ORDER_INSTRUCTION_LINK: `/trade/trade-order-instruction`,
  TRADE_ORDER_FILE_INSTRUCTION: `trade-order-file-instruction`,
  TRADE_ORDER_RECONCILATION: `trade-order-reconcilation`,
  TRANSACTION_VIEW_DETAILS: `transaction-view-details`,
  TRADE_ORDER_INVESTMENT: `trade-order-investment`,
  TRADE_RECONCILIATION_REPORT: `trade-reconciliation`,
};

export const REVIEW_SCREEN_DATA_MAPPING2 = {
  TRANSACTION_VIEW: `transactionView`,
  INVESTMENT_VIEW: `investmentView`,
  TRADE_ORDER_INSTRUCTION: `tradeOrderInstruction`,
  TRADE_ORDER_RECONCILATION: `tradeOrderReconcilation`,
  TRANSACTION_VIEW_DETAILS: `transactionViewDetails`,
  TRADE_ORDER_INVESTMENT: `tradeOrderInvestment`,
  TRADE_RECONCILIATION_REPORT: `tradeReconciliationReport`,
};

export const TRADE_MENU_ROUTES = [
  "/trade/transaction-view",
  "/trade/investment-view",
  "/trade/trade-order-instruction",
  "/trade/trade-order-reconcilation",
  "/trade/trade-order-file-instruction",
  "/trade/trade-reconciliation",
];

export const MANAGE_TRADE_MENU = [
  // {
  //   label: "Trade Process",
  //   subNav: [
  //     {
  //       id: REVIEW_SCREEN_DATA_MAPPING2.TRANSACTION_VIEW,
  //       label: "Transaction View",
  //       path: MANAGE_TRADE_ROUTES.TRANSACTION_VIEW,
  //       contentHeader: "Trade",
  //       breadCrumbs: [],
  //       childRoutes: [],
  //     },
  //     {
  //       id: REVIEW_SCREEN_DATA_MAPPING2.INVESTMENT_VIEW,
  //       label: "Investment View",
  //       path: MANAGE_TRADE_ROUTES.INVESTMENT_VIEW,
  //       contentHeader: "Trade",
  //       breadCrumbs: [],
  //       childRoutes: [],
  //     },

  //   ],
  //   breadCrumbs: [],
  //   childRoutes: [],
  //   childMenus: [
  //     {
  //       id: "investment",
  //       label: "Investment",
  //       path: MANAGE_PLAN_CONFIG_ROUTES.INVESTMENT,
  //       contentHeader: "Investment",
  //       breadCrumbs: [],
  //     },
  //     {
  //       id: "restriction",
  //       label: "Restriction",
  //       path: "",
  //       contentHeader: "Restriction",
  //       path: MANAGE_PLAN_CONFIG_ROUTES.RESTRICTION,
  //       breadCrumbs: [],
  //     },
  //   ],
  // },
  // // {
  // //   id: REVIEW_SCREEN_DATA_MAPPING2.TRANSACTION_VIEW,
  // //   label: "Transaction View",
  // //   path: MANAGE_TRADE_ROUTES.TRANSACTION_VIEW,
  // //   contentHeader: "Transaction View",
  // //   breadCrumbs: [],
  // //   childRoutes: [],

  // // },

  // // {
  // //   id: REVIEW_SCREEN_DATA_MAPPING2.INVESTMENT_VIEW,
  // //   label: "Investment View",
  // //   path: MANAGE_TRADE_ROUTES.INVESTMENT_VIEW,
  // //   contentHeader: "Investment View",
  // //   breadCrumbs: [],
  // //   childRoutes: [],
  // // },
  // {
  //   id: REVIEW_SCREEN_DATA_MAPPING2.TRADE_ORDER_INSTRUCTION,
  //   label: "Trade Order Instruction",
  //   path: MANAGE_TRADE_ROUTES.TRADE_ORDER_INSTRUCTION,
  //   contentHeader: "Trade Order Instruction",
  //   breadCrumbs: [],
  //   childRoutes: [
  //     {
  //       id: REVIEW_SCREEN_DATA_MAPPING2.TRADE_ORDER_INVESTMENT,
  //       label: "Trade Order Investment",
  //       path: MANAGE_TRADE_ROUTES.TRADE_ORDER_INVESTMENT,
  //       contentHeader: "Trade Order Investment",
  //       breadCrumbs: [],
  //       childRoutes: [],
  //     },
  //   ],
  // },
  // {
  //   id: REVIEW_SCREEN_DATA_MAPPING2.TRADE_ORDER_RECONCILATION,
  //   label: "Trade Order Reconciliation",
  //   path: MANAGE_TRADE_ROUTES.TRADE_ORDER_RECONCILATION,
  //   contentHeader: "Trade Order Reconciliation",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  {
    id: "tradeProcess",
    label: "Trade Process",
    path: MANAGE_TRADE_ROUTES.TRANSACTION_VIEW,
    contentHeader: "Trade Process",
    breadCrumbs: [],
    childMenus: [
      {
        id: "transactionView",
        label: "Transaction View",
        path: MANAGE_TRADE_ROUTES.TRANSACTION_VIEW,
        contentHeader: "Transaction View ",
        breadCrumbs: [],
      },

      {
        id: "transactionView",
        label: "Investment View",
        path: MANAGE_TRADE_ROUTES.INVESTMENT_VIEW,
        contentHeader: "Investment View ",
        breadCrumbs: [],
      },
    ],
  },
  {
    id: "tradeOrderInstruction",
    label: "Trade Order Instruction",
    path: MANAGE_TRADE_ROUTES.TRADE_ORDER_FILE_INSTRUCTION,
    contentHeader: "Trade Order Instruction",
    breadCrumbs: [],
  },
  // {
  //   id: "tradeOrderReconcilation ",
  //   label: "Trade Order Reconcilation ",
  //   path: MANAGE_TRADE_ROUTES.TRADE_ORDER_RECONCILATION,
  //   contentHeader: "Trade Order Reconcilation ",
  //   breadCrumbs: [],
  // },
  {
    id: "tradeReconcilationReport",
    label: "Trade Reconciliation",
    path: MANAGE_TRADE_ROUTES.TRADE_RECONCILIATION_REPORT,
    contentHeader: "Trade Reconciliation ",
    breadCrumbs: [],
  },
];

export const ALL_MANAGE_TRADE_ROUTES = [
  ...MANAGE_TRADE_MENU,
  // {
  //   id: REVIEW_SCREEN_DATA_MAPPING2.INVESTMENT,
  //   contentHeader: "Investment",
  //   path: MANAGE_TRADE_ROUTES.ADD_INVESTMENT,
  //   breadCrumbs: [
  //     {
  //       label: "Manage Investments",
  //       link: MANAGE_TRADE_ROUTES.INVESTMENT,
  //     },
  //   ],
  // },
  // {
  //   id: REVIEW_SCREEN_DATA_MAPPING2.CUSTODIAN,
  //   contentHeader: "Custodian",
  //   path: MANAGE_TRADE_ROUTES.ADD_CUSTODIAN,
  //   breadCrumbs: [
  //     {
  //       label: "Manage Custodians",
  //       link: MANAGE_TRADE_ROUTES.CUSTODIAN,
  //     },
  //   ],
  // },
  // {
  //   id: REVIEW_SCREEN_DATA_MAPPING2.CUSTODIAN,
  //   contentHeader: "Custodian",
  //   path: MANAGE_TRADE_ROUTES.CUSTODIAN_DETAIL,
  //   breadCrumbs: [
  //     {
  //       label: "Manage Custodians",
  //       link: MANAGE_TRADE_ROUTES.CUSTODIAN,
  //     },
  //   ],
  // },
];

export const manageTradeFormNames = {
  TRANSACTION_VIEW: `transaction-view`,
  INVESTMENT_VIEW: `investment-view`,
  TRADE_ORDER_INSTRUCTION: `trade-order-instruction`,
  TRADE_ORDER_RECONCILATION: `trade-order-reconcilation`,
  FILE_MANAGER_FILTER: `file-manager-filter`,
  TRADE_RECONCILIATION: `trade-reconciliation`,
  MANUAL_TRADE_CONFIRMATION: `manual-trade-confirmation`,
  TRADE_REPORT: `trade-report`,
};

export const tradeFormFields = {
  [manageTradeFormNames.TRANSACTION_VIEW]: {
    search: "search",
    transactionType: "transactionType",
    tradeStatus: "tradeStatus",
    dateRange: "dateRange",
    fromDate: "fromDate",
    toDate: "toDate",
    aggregationLevel: "aggregationLevel",
    tradeType: "tradeType",
  },
  [manageTradeFormNames.TRADE_REPORT]: {
    search: "search",
    fileId: "fileId",
    fileName: "fileName",
    tradeOrderNumber: "tradeOrderNumber",
    planId: "planId",
    cusip: "cusip",
    quantityFrom: "quantityFrom",
    quantityTo: "quantityTo",
    amountFrom: "amountFrom",
    amountTo: "amountTo",
    navFrom: "navFrom",
    navTo: "navTo",
    buySell: "buySell",
    settlementStatus: "settlementStatus",
    status: "status",
    dateRange: "dateRange",
    tradeDateFrom: "tradeDateFrom",
    tradeDateTo: "tradeDateTo",
    processedDateFrom: "processedDateFrom",
    processedDateTo: "processedDateTo",
    processDateFrom: "fromDate",
    processDateTo: "toDate",
    clearingPartnerId: "clearingPartnerId",
    clearingPartnerName: "clearingPartnerName",
  },
  [manageTradeFormNames.INVESTMENT_VIEW]: {
    search: "search",
    investmentType: "investmentType",
    investmentStatus: "investmentStatus",
  },
  [manageTradeFormNames.TRADE_ORDER_INSTRUCTION]: {
    fromDate: "fromDate",
    toDate: "toDate",
  },
  [manageTradeFormNames.TRADE_ORDER_RECONCILATION]: {},
  [manageTradeFormNames.FILE_MANAGER_FILTER]: {
    searchString: "searchString",
    dateRange: "dateRange",
    category: "category",
    fromDate: "fromDate",
    toDate: "toDate",
    subCategory: "subCategory",
    fileType: "fileType",
  },
  [manageTradeFormNames.TRADE_RECONCILIATION]: {
    search: "search",
    clearingPartnerId: "clearingPartnerId",
    clearingPartnerName: "clearingPartnerName",
    effectiveDateRange: "effectiveDateRange",
    clearingPartnerAccountId: "clearingPartnerAccountId",
    planNameId: "planNameId",
    planName: "planName",
    rkPlanNumber: "rkPlanNumber",
    investmentName: "investmentName",
    cusip: "cusip",
    unitsOnCore: "unitsOnCore",
    unitsOnCoreTo: "unitsOnCoreTo",
    unitsInFile: "unitsInFile",
    unitsInFileTo: "unitsInFileTo",
    unitsDifference: "unitsDifference",
    unitsDifferenceTo: "unitsDifferenceTo",
    effectiveDate: "effectiveDate",
    effectiveEndDate: "effectiveEndDate",
    clearingPartnerName: "clearingPartnerName",
  },
  [manageTradeFormNames.MANUAL_TRADE_CONFIRMATION]: {
    netAssetValue: "netAssetValue",
    settlementDate: "settlementDate",
  },
};

export const INVESTMENT_RECORDS_TO_FETCH = 20;
