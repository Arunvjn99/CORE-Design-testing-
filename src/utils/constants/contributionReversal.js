export const MANAGE_CONTRIBUTION_REVERSAL_ROUTES = {
  CREATE_CONTRIBUTION_REVERSAL: `/create-contribution-reversal`,
  CONTRIBUTION_REVERSAL_SUMMARY: `/contribution-reversal-summary`,
};

export const manageContributionReversalFormNames = {
  CONTRIBUTION_REVERSAL_FILTER_FORM: "contributionReversalFilterForm",
  CREATE_CONTRIBUTION_REVERSAL_FORM: "createContributionReversalForm",
  CONTRIBUTION_REVERSAL_SUMMARY: "contributionReversalSummary",
};

export const contributionReversalFields = {
  [manageContributionReversalFormNames.CONTRIBUTION_REVERSAL_FILTER_FORM]: {
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
  },
  [manageContributionReversalFormNames.CONTRIBUTION_REVERSAL_SUMMARY]: {
    checker: "checker",
  },
  [manageContributionReversalFormNames.CREATE_CONTRIBUTION_REVERSAL_FORM]: {
    planId: "planId",
    planName: "planName",
    rkPlanNumber: "rkPlanNumber",
    companyName: "companyName",
    companyId: "companyId",
    search: "search",
    dateRange: "dateRange",
    fromDate: "fromDate",
    toDate: "toDate",
    payDate: "payDate",
    uploadedOn: "uploadedOn",
    fileName: "fileName",
    totalAmount: "totalAmount",
    fileUploadId: "fileUploadId",
    transactionId: "transactionId",
  },
};

export const CONTRIBUTIONREVERSAL_EMPLOYEE_RECORDS_TO_FETCH = 10;
