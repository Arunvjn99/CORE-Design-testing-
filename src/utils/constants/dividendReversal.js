export const MANAGE_DIVIDEND_REVERSAL_ROUTES = {
  CREATE_DIVIDEND_REVERSAL: `/create-dividend-reversal`,
  DIVIDEND_REVERSAL_SUMMARY: `/dividend-reversal-summary`,
  DIVIDEND_REVERSAL_DETAILS: `/dividend-reversal-details`,
  CREATE_DIVIDEND_REVERSAL_PLAN_DETAILS: `/create-dividend-reversal-plan-details`,
};

export const manageDividendReversalFormNames = {
  DIVIDEND_REVERSAL_FILTER_FORM: "dividendReversalFilterForm",
  CREATE_DIVIDEND_REVERSAL_FORM: "createDividendReversalForm",
  DIVIDEND_REVERSAL_SUMMARY: "dividendReversalSummary",
  DIVIDEND_REVERSAL_DETAILS: "dividendReversalDetails",
};

export const dividendReversalFields = {
  [manageDividendReversalFormNames.DIVIDEND_REVERSAL_FILTER_FORM]: {
    search: "search",
    planName: "planName",
    planId: "planId",
    reversalId: "reversalId",
    dateRange: "dateRange",
    fromDate: "fromDate",
    toDate: "toDate",
  },
  [manageDividendReversalFormNames.DIVIDEND_REVERSAL_SUMMARY]: {
    checker: "checker",
  },
  [manageDividendReversalFormNames.CREATE_DIVIDEND_REVERSAL_FORM]: {
    search: "search",
    dateRange: "dateRange",
    fromDate: "fromDate",
    toDate: "toDate",
    investmentName: "investmentName",
    investmentId: "investmentId",
    cusip: "cusip",
    dividendTransactionId: "dividendTransactionId",
    transactionKey: "transactionKey",
    clearingPartner: "clearingPartner",
  },
};

export const DIVIDENDREVERSAL_EMPLOYEE_RECORDS_TO_FETCH = 20;
