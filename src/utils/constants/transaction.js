import { ROUTES } from "./common";

export const MANAGE_FEE_ROUTES1 = {
  MANAGE_FEE: `manage-fee`,
  SPECIFICATION_INFORMATION: `specification-information`,
  CREATE_SPECIFICATION_INFORMATION: `create-specification-information`,
  FEE_RUN: `fee-run`,
  BASIC_DETAILS: `basic-details`,
  CALCULATION: `calculation`,
  APPLICABLE_TO: `applicable-to`,
  SCHEDULE_OR_RUN: `schedule-or-run`,
  SUMMARY: `summary`,
  FEE_RUN_DETAILS: `fee-run-details`,
  FEE_RUN_PARTICIPANT_DETAILS: `participant-details`,
  FEE_FILE_BASED: `file-based`,
};

export const MANAGE_ADJUSTMENT_ROUTES1 = {
  MANAGE_ADJUSTMENT: `${ROUTES.ADJUSTMENT}/manage-adjustment`,
  BASIC_DETAILS: `${ROUTES.CREATE_ADJUSTMENT}/basic-details`,
  ADJUSTMENT_DETAILS: `${ROUTES.CREATE_ADJUSTMENT}/adjustment-details`,
  ADJUSTMENT_SUMMARY: `/${ROUTES.ADJUSTMENT_SUMMARY}/adjustment-summary`,
  SUMMARY: `${ROUTES.CREATE_ADJUSTMENT}/adjustment-summary`,
};

export const MANAGE_TRANSACTION_ROUTES = {
  APPROVAL: `manage-approval`,
  APPROVAL_LINK: `/transaction/manage-approval`,
  DRAFT: `manage-draft`,
  DRAFT_LINK: `/transaction/manage-draft`,
  HISTORY: `history`,
  PENDINGWITHDRAWAL: `manage-pending-withdrawal`,
  PENDINGWITHDRAWAL_LINK: `/transaction/manage-pending-withdrawal`,
  PENDINGLOAN: `manage-pending-loan`,
  PENDINGLOAN_LINK: `/transaction/manage-pending-loan`,
  PENDINGROLLOVERIN: `manage-pending-rolloverin`,
  PENDINGROLLOVERIN_LINK: `/transaction/manage-pending-rolloverin`,
  PENDINGROLLOVERINAPPROVAL: `manage-pending-rolloverin-approval`,
  PENDINGROLLOVERINAPPROVAL_LINK: `/transaction/manage-pending-rolloverin-approval`,
  PENDINGWITHDRAWALAPPROVAL: `manage-pending-withdrawal-approval`,
  PENDINGWITHDRAWALAPPROVAL_LINK: `/transaction/manage-pending-withdrawal-approval`,
  PENDINGLOANAPPROVAL: `manage-pending-loan-approval`,
  PENDINGLOANAPPROVAL_LINK: `/transaction/manage-pending-loan-approval`,
  ROLLOVER_HISTORY_DETAILS: `rollover-history-details`,
  DISTRIBUTION_HISTORY_DETAILS: `withdrawal-history-details`,
  LOAN_HISTORY_DETAILS: `loan-history-details`,
  TRANSFER_HISTORY_DETAILS: `transfer-history-details`,
  MANAGE_ADJUSTMENT: `manage-adjustment`,
  CONTRIBUTION_REVERSAL: `contribution-reversal`,
  DIVIDEND_REVERSAL: `dividend-reversal`,
  FEE_REVERSAL: `fee-reversal`,
  MANAGE_DISBURSEMENT: `manage-disbursement`,
  MANAGE_DISBURSEMENT_LINK: `/transaction/manage-disbursement`,
  DISBURSEMENT_SUMMARY: `disbursement-summary`,
  DISBURSEMENT_SUMMARY_LINK: `/transaction/disbursement-summary`,
  MANAGE_SSP: `manage-ssp`,
  MANAGE_SSP_LINK: `/transaction/manage-ssp`,
  FUND_SWITCH_MERGER_SPLIT: `fund-switch-merger-split`,
  CASH_MANAGEMENT_LISTING: `cash-management-listing`,
  MONEY_MOVE: `money-move`,
  CASH_REMITTANCE: `cash-remittance`,
  ALLOCATE_FUNDS: `allocate-funds`,
  MANAGE_FEE: `manage-fee`,
  MANAGE_FEE_LINK: `/transaction/manage-fee`,
  FEE_RUN: `fee-run`,
  SPECIFICATION_INFORMATION: `specification-information`,
  SPECIFICATION_INFORMATION_LINK: `/transaction/specification-information`,
  CREATE_SPECIFICATION_INFORMATION: `create-specification-information`,
  CREATE_SPECIFICATION_INFORMATION_LINK: `/transaction/create-specification-information`,
  TRANSACTION_MAINTENANCE: `transaction-maintenance`,
  MODEL_PORTFOLIO: `model-portfolio`,
  MODEL_PORTFOLIO_LINK: `/model-portfolio`,
  PENDINGINPLANROTH: `manage-pending-inplanroth`,
  PENDINGINPLANROTH_LINK: `/transaction/manage-pending-inplanroth`,
  PENDINGINPLANROTHAPPROVAL: `manage-pending-inplanroth-approval`,
  FEE_RUN_LINK: `/transaction/fee-run`,
  DAILY_CASH_RECONCILIATION: `daily-cash-reconciliation`,
  MANAGE_BATCH_ADJUSTMENT: `manage-batch-adjustment`,
  INVOICE_FEE: `invoice-fee`,
  INVOICE_FEE_LINK: `/transaction/invoice-fee`,
  INVOICE_BULK_UPLOAD: `invoice-bulk-upload`,
  INVOICE_BULK_UPLOAD_LINK: `/transaction/invoice-bulk-upload`,
  INVOICE_BULK_UPLOAD_DETAILS: `invoice-bulk-upload-details`,
  INVOICE_BULK_UPLOAD_DETAILS_LINK: `/transaction/invoice-bulk-upload-details`,
  DEFAULT_PAYEE: `default-payee`,
};

export const TRANSACTION_MENU_ID = {
  TRANSACTIONAPPROVAL: "transactionApproval",
  FEE: "fee",
  TRANSACTION_MAINTENANCE: "transactionMaintenance",
  CASHMANAGEMENT: "cashManagement",
  MODEL_PORTFOLIO: "modelPortfolio",
  // PROCESSTRANSACTION: "processTransaction",
};
export const REVIEW_SCREEN_DATA_MAPPING3 = {
  APPROVAL: "approval",
  DRAFT: "draft",
  TRANSFER: "transfer",
  LOANS: "loans",
  DISTRIBUTION: "distribution",
  ROLLOVER: "rollover",
  FEE: "fee",
  FUND_SWITCH_MERGER_SPLIT: "fundSwitchMergerSplit",
  ADJUSTMENT: "adjustment",
  CASH_MANAGEMENT: "cashManagement",
  SHARE_HOLDER_SERVICING_PAYMENT: "shareholderServicingPayment",
  TRANSACTION_MAINTENANCE: "transactionMaintenance",
  DISBURSEMENT: "disbursement",
};
export const manageTransactionFormNames = {
  MANAGE_WITHDRWAL: "manage withdrawal",
  MANAGE_LOAN: "manage loan",
  MANAGE_ROLLOVERIN: "manage rolloverin",
  MANAGE_INPLANROTH: "manage inplanroth",
  MANAGE_DRAFT: "manage draft",
  DISBURSEMENT_SUMMARY: "disbursement summary",
  DISBURSEMENT_HISTORY: "disbursement history",
};
export const transactionFormFields = {
  [manageTransactionFormNames.MANAGE_WITHDRWAL]: {
    // sort: "sort",
    isAscending: "isAscending",
    companyName: "companyName",
    companyId: "companyId",
    employeeId: "employeeId",
    planId: "planId",
    planName: "planName",
    uniquePersonalIdentification: "uniquePersonalIdentification",
    employeeName: "searchString",
    from: "from",
    userId: "userId",
    offset: "offset",
    requestedFrom: "requestedFrom",
    requestedTo: "requestedTo",
  },
  [manageTransactionFormNames.DISBURSEMENT_SUMMARY]: {
    recipient: "recipient",
    paymentMode: "paymentMode",
    checkPayableTo: "checkPayableTo",
    address: "address",
    reason: "reason",
    routingNumberEFT: "routingNumberEFT",
    accountNumber: "accountNumber",
    accountType: "accountType",
    accountHolderName: "accountHolderName",
    bankName: "bankName",
    address1: "address1",
    address2: "address2",
    address3: "address3",
    addressType: "addressType",
    city: "city",
    state: "state",
    country: "country",
    countryId: "countryId",
    stateId: "stateId",
    zipCode: "zipCode",
    foreignCountry: "foreignCountry",
    foreignState: "foreignState",
    foreignZipCode: "foreignZipCode",
    reason: "reason",
    reference: "reference",
  },
  [manageTransactionFormNames.DISBURSEMENT_HISTORY]: {
    recipient: "recipient",
    paymentMode: "paymentMode",
    checkPayableTo: "checkPayableTo",
    address1: "address1",
    reason: "reason",
    routingNumberEFT: "routingNumberEFT",
    accountNumber: "accountNumber",
    accountType: "accountType",
    accountHolderName: "accountHolderName",
    bankName: "bankName",
    reason: "reason",
    reference: "reference",
  },
  [manageTransactionFormNames.MANAGE_DRAFT]: {
    sort: "sort",
    pill: "pill",
    companyName: "companyName",
    planId: "planId",
    employeeName: "employeeName",
    requestedFrom: "requestedFrom",
    requestedTo: "requestedTo",
    transactionType: "transactionType",
    employeeId: "employeeId",
    userId: "userId",
    uniquePersonalIdentification: "uniquePersonalIdentification",

    // optionsinFilter: "optionsinFilter",
    employeeName: "search",
    isAscending: "isAscending",
    //  filterOut: "filterOut",
  },
  [manageTransactionFormNames.MANAGE_ROLLOVERIN]: {
    sort: "sort",
    pill: "pill",
    companyName: "companyName",
    planId: "planId",
    employeeName: "employeeNameOrSSNSearch",
    requestedFrom: "requestedDateFrom",
    requestedTo: "requestedrequestedDateTo",
    filterOut: "filterOut",
    OrderBy: "isAscendingByRequestedDate",
    from: "from",
  },
  [manageTransactionFormNames.MANAGE_INPLANROTH]: {
    pill: "pill",
    companyName: "companyName",
    planId: "planId",
    employeeNameOrSSNSearch: "employeeNameOrSSNSearch",
    requestedFrom: "requestedDateFrom",
    requestedTo: "requestedDateTo",
    from: "from",
    dateRange: "dateRange",
    companyId: "companyId",
    planName: "planName",
  },
  [manageTransactionFormNames.MANAGE_LOAN]: {
    sort: "sort",
    pill: "pill",
    companyId: "companyId",
    companyName: "companyName",
    planId: "planId",
    employeeName: "employeeNameOrSSNSearch",
    requestedFrom: "requestedDateFrom",
    requestedTo: "requestedrequestedDateTo",
    filterOut: "filterOut",
    isAscending: "isAscending",

    // optionsinFilter: "optionsinFilter",
  },
};

export const TRANSACTION_MAIN_MENU = [
  {
    id: TRANSACTION_MENU_ID.TRANSACTIONAPPROVAL,
    label: "Transaction Approval",
    path: MANAGE_TRANSACTION_ROUTES.APPROVAL,
    contentHeader: "",
    breadCrumbs: [],
    menuChildren: [
      {
        id: REVIEW_SCREEN_DATA_MAPPING3.APPROVAL,

        label: "Approval",

        path: MANAGE_TRANSACTION_ROUTES.APPROVAL,

        contentHeader: "",

        breadCrumbs: [],
      },

      {
        id: REVIEW_SCREEN_DATA_MAPPING3.DRAFT,

        label: "Draft",

        path: MANAGE_TRANSACTION_ROUTES.DRAFT,

        contentHeader: "",

        breadCrumbs: [],
      },
    ],
  },

  {
    id: REVIEW_SCREEN_DATA_MAPPING3.FUND_SWITCH_MERGER_SPLIT,

    label: "Fund Switch/Merger/Split",

    path: MANAGE_TRANSACTION_ROUTES.FUND_SWITCH_MERGER_SPLIT,

    contentHeader: "Transaction History",

    breadCrumbs: [],
  },
];

export const PROCESS_TRANSACTIONS_MAIN_MENU = [
  {
    id: TRANSACTION_MENU_ID.MODEL_PORTFOLIO,

    label: "Model Portfolio",

    path: MANAGE_TRANSACTION_ROUTES.MODEL_PORTFOLIO,

    contentHeader: "Model Portfolio",

    breadCrumbs: [],
  },
  {
    id: TRANSACTION_MENU_ID.FEE,

    label: "Fee",

    path: MANAGE_TRANSACTION_ROUTES.MANAGE_FEE,

    contentHeader: "",

    breadCrumbs: [],

    menuChildren: [
      {
        id: "manageFee",

        label: "Manage Fee",

        path: MANAGE_TRANSACTION_ROUTES.MANAGE_FEE,

        contentHeader: "Manage Fee",

        breadCrumbs: [],

        childRoutes: [],
      },

      {
        id: "specificationInformation",

        label: "Specification Information",

        path: MANAGE_TRANSACTION_ROUTES.SPECIFICATION_INFORMATION,

        contentHeader: "Manage Specification Information",

        breadCrumbs: [],

        childRoutes: [],
      },

      {
        id: "feeRun",

        label: "Fee Run",

        path: MANAGE_TRANSACTION_ROUTES.FEE_RUN,

        contentHeader: "Fee Run Listing",

        breadCrumbs: [],

        childRoutes: [],
      },
      {
        id: "invoiceFee",
        label: "Invoicing",
        path: MANAGE_TRANSACTION_ROUTES.INVOICE_FEE,
        contentHeader: "Invoice Fee Listing",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "invoiceBulkUpload",
        label: "Bulk Upload",
        path: MANAGE_TRANSACTION_ROUTES.INVOICE_BULK_UPLOAD,
        contentHeader: "Bulk Upload",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "defaultPayee",
        label: "Default Payee",
        path: MANAGE_TRANSACTION_ROUTES.DEFAULT_PAYEE,
        contentHeader: "Create Default Payee",
        breadCrumbs: [],
        childRoutes: [],
      },
    ],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.ADJUSTMENT,

    label: "Adjustment",

    path: MANAGE_TRANSACTION_ROUTES.MANAGE_ADJUSTMENT,

    contentHeader: "",

    breadCrumbs: [],

    menuChildren: [
      {
        id: "participantAdjustment",

        label: "Asset Adjustment",

        path: MANAGE_TRANSACTION_ROUTES.MANAGE_ADJUSTMENT,

        contentHeader: "Asset Adjustment",

        breadCrumbs: [],

        childRoutes: [],
      },
      {
        id: "batchAdjustment",

        label: "Batch Adjustment",

        path: MANAGE_TRANSACTION_ROUTES.MANAGE_BATCH_ADJUSTMENT,

        contentHeader: "Batch Adjustment",

        breadCrumbs: [],

        childRoutes: [],
      },
      {
        id: "contributionReversal",

        label: "Contribution Reversal",

        path: MANAGE_TRANSACTION_ROUTES.CONTRIBUTION_REVERSAL,

        contentHeader: "Contribution Reversal",

        breadCrumbs: [],

        childRoutes: [],
      },
      {
        id: "dividendReversal",

        label: "Dividend Reversal",

        path: MANAGE_TRANSACTION_ROUTES.DIVIDEND_REVERSAL,

        contentHeader: "Dividend Reversal",

        breadCrumbs: [],

        childRoutes: [],
      },
      {
        id: "feeReversal",

        label: "Fee Reversal",

        path: MANAGE_TRANSACTION_ROUTES.FEE_REVERSAL,

        contentHeader: "Fee Reversal",

        breadCrumbs: [],

        childRoutes: [],
      },
    ],
  },

  {
    id: TRANSACTION_MENU_ID.CASHMANAGEMENT,

    label: "Cash Management",

    path: MANAGE_TRANSACTION_ROUTES.DAILY_CASH_RECONCILIATION,
    contentHeader: "Transaction History",

    breadCrumbs: [],

    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],

    menuChildren: [
      {
        id: "cashReconciliation",

        label: "Daily Cash Reconciliation",

        path: MANAGE_TRANSACTION_ROUTES.DAILY_CASH_RECONCILIATION,

        contentHeader: "Reports",

        breadCrumbs: [],

        childRoutes: [],
      },

      {
        id: "manageListing",

        label: "Manage Listing",

        path: MANAGE_TRANSACTION_ROUTES.CASH_MANAGEMENT_LISTING,

        contentHeader: "Reports",

        breadCrumbs: [],

        childRoutes: [],
      },

      {
        id: "moneyMove",

        label: "Money Move",

        path: MANAGE_TRANSACTION_ROUTES.MONEY_MOVE,

        contentHeader: "Reports",

        breadCrumbs: [],

        childRoutes: [],
      },

      {
        id: "cashRemittance",

        label: "Cash Remittance",

        path: MANAGE_TRANSACTION_ROUTES.CASH_REMITTANCE,

        contentHeader: "Reports",

        breadCrumbs: [],

        childRoutes: [],
      },

      {
        id: "allocateFunds",

        label: "Allocate Funds",

        path: MANAGE_TRANSACTION_ROUTES.ALLOCATE_FUNDS,

        contentHeader: "Reports",

        breadCrumbs: [],

        childRoutes: [],
      },
    ],
  },

  {
    id: REVIEW_SCREEN_DATA_MAPPING3.SHARE_HOLDER_SERVICING_PAYMENT,

    label: "Shareholder Servicing Payment",

    path: MANAGE_TRANSACTION_ROUTES.MANAGE_SSP,

    contentHeader: "",

    breadCrumbs: [],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.DISBURSEMENT,

    label: "Disbursements",

    path: MANAGE_TRANSACTION_ROUTES.MANAGE_DISBURSEMENT,

    contentHeader: "",

    breadCrumbs: [],
  },
];
// {
//   id: TRANSACTION_MENU_ID.PROCESSTRANSACTION,

//   label: "Process Transaction",

//   path: MANAGE_TRANSACTION_ROUTES.MANAGE_FEE,

//   contentHeader: "",

//   breadCrumbs: [],

// menuChildren: [

//   {
//     id: REVIEW_SCREEN_DATA_MAPPING3.FUND_SWITCH_MERGER_SPLIT,

//     label: "Fund Switch/Merger/Split",

//     path: MANAGE_TRANSACTION_ROUTES.FUND_SWITCH_MERGER_SPLIT,

//     contentHeader: "Transaction History",

//     breadCrumbs: [],
//   },

//   {
//     id: REVIEW_SCREEN_DATA_MAPPING3.ADJUSTMENT,

//     label: "Adjustment",

//     path: MANAGE_TRANSACTION_ROUTES.MANAGE_ADJUSTMENT,

//     contentHeader: "",

//     breadCrumbs: [],
//   },

//   {
//     id: REVIEW_SCREEN_DATA_MAPPING3.CASH_MANAGEMENT,

//     label: "Cash Management",

//     path: MANAGE_TRANSACTION_ROUTES.CASH_MANAGEMENT_LISTING,

//     contentHeader: "Transaction History",

//     breadCrumbs: [],

//     childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],

//     subNav: [
//       {
//         id: "manageListing",

//         label: "Manage Listing",

//         path: MANAGE_TRANSACTION_ROUTES.CASH_MANAGEMENT_LISTING,

//         contentHeader: "Reports",

//         breadCrumbs: [],

//         childRoutes: [],
//       },

//       {
//         id: "moneyMove",

//         label: "Money Move",

//         path: MANAGE_TRANSACTION_ROUTES.MONEY_MOVE,

//         contentHeader: "Reports",

//         breadCrumbs: [],

//         childRoutes: [],
//       },

//       {
//         id: "cashRemittance",

//         label: "Cash Remittance",

//         path: MANAGE_TRANSACTION_ROUTES.CASH_REMITTANCE,

//         contentHeader: "Reports",

//         breadCrumbs: [],

//         childRoutes: [],
//       },

//       {
//         id: "allocateFunds",

//         label: "Allocate Funds",

//         path: MANAGE_TRANSACTION_ROUTES.ALLOCATE_FUNDS,

//         contentHeader: "Reports",

//         breadCrumbs: [],

//         childRoutes: [],
//       },
//     ],
//   },
// ],

// {
//   id: TRANSACTION_MENU_ID.TRANSACTION_MAINTENANCE,

//   label: "Transaction Maintenance",

//   path: MANAGE_TRANSACTION_ROUTES.HISTORY,

//   contentHeader: "",

//   breadCrumbs: [],
// },
// ];

export const MANAGE_TRANSACTION_MENU = [
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.TRANSFER,
    label: "Transfer",
    path: MANAGE_TRANSACTION_ROUTES.APPROVAL,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.DISTRIBUTION,
    label: "Distribution",
    path: MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.LOANS,
    label: "Loans",
    path: MANAGE_TRANSACTION_ROUTES.PENDINGLOAN,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },

  {
    id: REVIEW_SCREEN_DATA_MAPPING3.ROLLOVER,
    label: "Rollover",
    path: MANAGE_TRANSACTION_ROUTES.PENDINGROLLOVERIN,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.APPROVAL,
    label: "Fee",
    path: "",
    contentHeader: "",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    subNav: [
      {
        id: "approval",
        label: "Manage Fee",
        path: MANAGE_TRANSACTION_ROUTES.MANAGE_FEE,
        contentHeader: "Manage Fee",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "specificationInformation",
        label: "Specification Information",
        path: MANAGE_TRANSACTION_ROUTES.SPECIFICATION_INFORMATION,
        contentHeader: "Manage Specification Information",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "feeRun",
        label: "Fee Run",
        path: MANAGE_TRANSACTION_ROUTES.FEE_RUN,
        contentHeader: "Fee Run Listing",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "invoiceFee",
        label: "Invoicing",
        path: MANAGE_TRANSACTION_ROUTES.INVOICE_FEE,
        contentHeader: "Invoice Fee Listing",
        breadCrumbs: [],
        childRoutes: [],
      },
    ],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.FUND_SWITCH_MERGER_SPLIT,
    label: "Fund Switch/Merger/Split",
    path: MANAGE_TRANSACTION_ROUTES.FUND_SWITCH_MERGER_SPLIT,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.ADJUSTMENT,
    label: "Adjustment",
    path: MANAGE_TRANSACTION_ROUTES.MANAGE_ADJUSTMENT,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.CASH_MANAGEMENT,
    label: "Cash Management",
    path: MANAGE_TRANSACTION_ROUTES.DAILY_CASH_RECONCILIATION,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    subNav: [
      {
        id: "cashManagement",
        label: "",
        path: MANAGE_TRANSACTION_ROUTES.DAILY_CASH_RECONCILIATION,
        contentHeader: "Reports",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "cashManagement",
        label: "Manage Listing",
        path: MANAGE_TRANSACTION_ROUTES.CASH_MANAGEMENT_LISTING,
        contentHeader: "Reports",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "cashManagement",
        label: "Money Move",
        path: MANAGE_TRANSACTION_ROUTES.MONEY_MOVE,
        contentHeader: "Reports",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "cashManagement",
        label: "Cash Remittance",
        path: MANAGE_TRANSACTION_ROUTES.CASH_REMITTANCE,
        contentHeader: "Reports",
        breadCrumbs: [],
        childRoutes: [],
      },
      {
        id: "cashManagement",
        label: "Allocate Funds",
        path: MANAGE_TRANSACTION_ROUTES.ALLOCATE_FUNDS,
        contentHeader: "Reports",
        breadCrumbs: [],
        childRoutes: [],
      },
    ],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.SHARE_HOLDER_SERVICING_PAYMENT,
    label: "Shareholder Servicing Payment",
    path: MANAGE_TRANSACTION_ROUTES.MANAGE_SSP,
    contentHeader: "",
    breadCrumbs: [],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.DISBURSEMENT,
    label: "Disbursements",
    path: MANAGE_TRANSACTION_ROUTES.MANAGE_DISBURSEMENT,
    contentHeader: "",
    breadCrumbs: [],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.TRANSACTION_MAINTENANCE,
    label: "Transaction Maintenance",
    path: MANAGE_TRANSACTION_ROUTES.TRANSACTION_MAINTENANCE,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },
];

export const ALL_MANAGE_TRANSACTION_ROUTES = [
  ...MANAGE_TRANSACTION_MENU,
  // {
  //   id: REVIEW_SCREEN_DATA_MAPPING3.APPROVAL,
  //   contentHeader: "Approval",
  //   path: MANAGE_TRANSACTION_ROUTES.APPROVAL,
  //   breadCrumbs: [
  //     {
  //       label: "Approval",
  //       link: MANAGE_TRANSACTION_ROUTES.APPROVAL,
  //     },
  //   ],
  // },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.APPROVAL,
    contentHeader: "Approval",
    path: MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL,
    breadCrumbs: [
      {
        label: "Withdrawal Approval",
        link: MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL,
      },
    ],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.APPROVAL,
    contentHeader: "Approval",
    path: MANAGE_TRANSACTION_ROUTES.PENDINGLOAN,
    breadCrumbs: [
      {
        label: "Loan Approval",
        link: MANAGE_TRANSACTION_ROUTES.PENDINGLOAN,
      },
    ],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.APPROVAL,
    contentHeader: "Approval",
    path: MANAGE_TRANSACTION_ROUTES.PENDINGLOAN,
    breadCrumbs: [
      {
        label: "Loan Approval",
        link: MANAGE_TRANSACTION_ROUTES.PENDINGLOAN,
      },
    ],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.HISTORY,
    path: MANAGE_TRANSACTION_ROUTES.HISTORY,
    contentHeader: "Transaction History",
    breadCrumbs: [],
    childRoutes: [MANAGE_TRANSACTION_ROUTES.HISTORY_DETAILS],
    // childRoutes: [MANAGE_TRANSACTION_ROUTES.PENDINGWITHDRAWAL],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.HISTORY,
    contentHeader: "Transaction History Details",
    path: MANAGE_TRANSACTION_ROUTES.ROLLOVER_HISTORY_DETAILS,
    breadCrumbs: [
      {
        label: "Transaction History Details",
        link: MANAGE_TRANSACTION_ROUTES.ROLLOVER_HISTORY_DETAILS,
      },
    ],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.HISTORY,
    contentHeader: "Transaction History Details",
    path: MANAGE_TRANSACTION_ROUTES.DISTRIBUTION_HISTORY_DETAILS,
    breadCrumbs: [
      {
        label: "Transaction History Details",
        link: MANAGE_TRANSACTION_ROUTES.DISTRIBUTION_HISTORY_DETAILS,
      },
    ],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.HISTORY,
    contentHeader: "Transaction History Details",
    path: MANAGE_TRANSACTION_ROUTES.LOAN_HISTORY_DETAILS,
    breadCrumbs: [
      {
        label: "Transaction History Details",
        link: MANAGE_TRANSACTION_ROUTES.LOAN_HISTORY_DETAILS,
      },
    ],
  },
  {
    id: REVIEW_SCREEN_DATA_MAPPING3.HISTORY,
    contentHeader: "Transaction History Details",
    path: MANAGE_TRANSACTION_ROUTES.TRANSFER_HISTORY_DETAILS,
    breadCrumbs: [
      {
        label: "Transaction History Details",
        link: MANAGE_TRANSACTION_ROUTES.TRANSFER_HISTORY_DETAILS,
      },
    ],
  },
  // {
  //   id: REVIEW_SCREEN_DATA_MAPPING3.DRAFT,
  //   contentHeader: "Draft",
  //   path: MANAGE_TRANSACTION_ROUTES.DRAFT,
  //   breadCrumbs: [
  //     {
  //       label: "Draft",
  //       link: MANAGE_TRANSACTION_ROUTES.DRAFT,
  //     },
  //   ],
  // },
];

export const RECORDS_TO_FETCH = 20;
