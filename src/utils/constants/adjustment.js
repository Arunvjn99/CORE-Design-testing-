import { ROUTES } from "./common";

export const MANAGE_ADJUSTMENT_ROUTES = {
  MANAGE_ADJUSTMENT: `manage-adjustment`,
  BASIC_DETAILS: `basic-details`,
  BASIC_DETAILS_LINK: `/create-adjustment/basic-details`,
  ADJUSTMENT_DETAILS: `adjustment-details`,
  ADJUSTMENT_DETAILS_LINK: `/create-adjustment/adjustment-details`,
  ADJUSTMENT_SUMMARY: `adjustment-summary`,
  ADJUSTMENT_SUMMARY_LINK: `/create-adjustment/adjustment-summary`,
  SUMMARY: `adjustment-summary`,
  FILE_INFORMATION: `file-information`,
  FILE_VALIDATION: `file-validation`,
};

export const MANAGE_ADJUSTMENT_MENU = [
  {
    id: "manageAdjustment",
    label: "Manage Adjustment",
    path: MANAGE_ADJUSTMENT_ROUTES.MANAGE_ADJUSTMENT,
    contentHeader: "Manage Adjustment",
    breadCrumbs: [],
  },
];

export const ADJUSTMENT_DETAILS_MENU = [
  {
    id: "adjustmentSummary",
    label: "Adjustment summary",
    step: 3,
    path: `/${ROUTES.ADJUSTMENT_SUMMARY}/${MANAGE_ADJUSTMENT_ROUTES.ADJUSTMENT_SUMMARY}`,
    contentHeader: "Adjustment Summary",
    breadCrumbs: [],
  },
];

export const CREATE_ADJUSTMENT_MENU = [
  {
    id: "basicDetails",
    label: "Basic details",
    step: 1,
    path: MANAGE_ADJUSTMENT_ROUTES.BASIC_DETAILS,
    contentHeader: "Basic details",
    breadCrumbs: [],
  },
  {
    id: "adjustmentDetails",
    label: "Adjustment details",
    step: 2,
    path: MANAGE_ADJUSTMENT_ROUTES.ADJUSTMENT_DETAILS,
    contentHeader: "Adjustment Details",
    breadCrumbs: [],
  },
  {
    id: "adjustmentSummary",
    label: "Summary",
    step: 3,
    path: MANAGE_ADJUSTMENT_ROUTES.SUMMARY,
    contentHeader: "Adjustment Summary",
    breadCrumbs: [],
  },
];

export const CREATE_BATCH_ADJUSTMENT_MENU = [
  {
    id: "fileInformation",
    label: "File Information",
    step: 1,
    path: MANAGE_ADJUSTMENT_ROUTES.FILE_INFORMATION,
    contentHeader: "File Information",
    breadCrumbs: [],
  },
  {
    id: "fileValidation",
    label: "File Validation",
    step: 2,
    path: MANAGE_ADJUSTMENT_ROUTES.FILE_VALIDATION,
    contentHeader: "File Validation",
    breadCrumbs: [],
  },
];

export const ALL_MANAGE_ADJUSTMENT_ROUTES = [
  ...MANAGE_ADJUSTMENT_MENU,
  ...CREATE_ADJUSTMENT_MENU,
];

export const manageAdjustmentFormNames = {
  ADJUSTMENT_BASIC_DETAILS: "adjustment_basic_details",
  ADJUSTMENT_SLIDER_PANEL: "adjustment_slider_panel",
  ADJUSTMENT_DETAILS: "adjustment_details",
  ADJUSTMENT_FILTER_FORM: "adjustment_filter_form",
  BATCH_ADJUSTMENT_FILTER_FORM: "batch_adjustment_filter_form",
  BATCH_ADJUSTMENT_SAVE_FORM: "batch_adjustment_save_form",
  BATCH_FILE_INFORMATION: "batch_file_information",
  BATCH_FILE_VALIDATION: "batch_file_validation",
};

export const adjustmentFormFields = {
  [manageAdjustmentFormNames.ADJUSTMENT_FILTER_FORM]: {
    planId: "planId",
    search: "search",
    adjustmentType: "adjustmentType",
    status: "status",
    dateRange: "dateRange",
    rkPlanNumber: "rkPlanNumber",
    planName: "planName",
    columnName: "columnName",
    isAscending: "isAscending",
    earnings: "earnings",
  },

  [manageAdjustmentFormNames.ADJUSTMENT_BASIC_DETAILS]: {
    adjustmentType: "adjustmentType",
    transferType: "transferType",
    planNameID: "planNameId",
    employeeNameID: "employeeNameID",
    adjustmentIncidentCode: "adjustmentIncidentCode",
    adjustmentClassification: "adjustmentClassification",
    effectiveDate: "effectiveDate",
    description: "description",
    transactionType: "transactionType",
    attachment: "attachment",
    employeeDisplay: "employeeDisplay",
    planDisplay: "planDisplay",
  },
  [manageAdjustmentFormNames.ADJUSTMENT_SLIDER_PANEL]: {
    transactionType: "transactionType",
  },
  [manageAdjustmentFormNames.ADJUSTMENT_DETAILS]: {
    sources: "sources",
    certainty: "certainty",
    entryType: "entryType",
    useParticipantCurrentHoldings: "useParticipantCurrentHoldings",
    applySameInvestmentToAllSources: "applySameInvestmentToAllSources",
    sendTrade: "sendTrade",
    assetTransfers: "assetTransfers",
    transferType: "transferType",
    accountTransferType: "accountTransferType",
    rothCode: "rothCode",
    nonRothCode: "nonRothCode",
  },
  [manageAdjustmentFormNames.BATCH_ADJUSTMENT_FILTER_FORM]: {
    searchString: "searchString",
    from: "from",
    adjustmentType: "adjustmentType",
    transactionType: "transactionType",
    status: "status",
    planId: "planId",
    planName: "planName",
    rkPlanNumber: "rkPlanNumber",
    startDate: "startDate",
    endDate: "endDate",
  },
  [manageAdjustmentFormNames.BATCH_ADJUSTMENT_SAVE_FORM]: {
    saveAdjustmentType: "saveAdjustmentType",
    saveTransactionType: "saveTransactionType",
    incidentCode: "incidentCode",
    incidentCodeId: "incidentCodeId",
    uploadDocument: "uploadDocument",
    savePlanId: "savePlanId",
    savePlanName: "savePlanName",
    saveRkPlanNumber: "saveRkPlanNumber",
  },
  [manageAdjustmentFormNames.BATCH_FILE_VALIDATION]: {
    uploadDocument: "uploadDocument",
  },
  [manageAdjustmentFormNames.BATCH_FILE_INFORMATION]: {
    adjustmentType: "adjustmentType",
    planNameId: "planNameId",
    employeeNameID: "employeeNameID",
    incidentCode: "incidentCode",
    incidentCodeId: "incidentCodeId",
    transactionType: "transactionType",
    includeEmployee: "includeEmployee",
    payDate: "payDate",
    parentTransactionKey: "parentTransactionKey",
    fileUploadId: "fileUploadId",
    planId: "planId",
    rkPlanNumber: "rkPlanNumber",
    companyId: "companyId",
    companyName: "companyName",
    dateRange: "dateRange",
    fromDate: "fromDate",
    toDate: "toDate",
  },
};

export const translateAdjSplitUp = (sourceWiseBalances) => {
  return {
    ...sourceWiseBalances,
    columnValues: [
      ...(sourceWiseBalances?.modelPortfolioInvestmentBalances?.map((_) => {
        return {
          ..._,
          isExpandable: true,
          regularBalanceUnits:
            _?.investmentwiseBalances?.reduce(
              (acc, sum) => sum?.regularBalanceUnits + acc,
              0
            ) ?? 0,
        };
      }) ?? []),
      ...(sourceWiseBalances?.regularInvestmentBalances ?? []),
    ],
  };
};

export const TRANSFER_TYPE = {
  AccountTransfer: 1,
  SourceTransfer: 2,
  PlanAccount: 3,
  ForfeitureAccount: 4,
};

export const ACCOUNT_TRANSFER_TYPE = {
  ToForfeiture: 1,
  FromForfeiture: 2,
};
