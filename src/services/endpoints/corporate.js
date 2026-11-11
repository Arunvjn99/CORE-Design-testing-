export const corporateActions = {
  saveFundSwitchDetails: "/api/v1/FundSwitch/SaveFundSwitchDetails",
  getFundSwitchDetails: "/api/v1/FundSwitch/GetFundSwitchDetails",
  getFundSwitchListing: "/api/v1/FundSwitch/GetFundSwitchListing",
  saveDividendBasicDetails: "/api/v1/Dividend/SaveDividendBasicDetails",
  getMasterInvestmentClearingPartnerAccounts:
    "/api/v1/GetMasterInvestmentClearingPartnerAccounts",
  downloadFundSwitchReport:
    "/api/v1/FundSwitch/DownloadFundSwitchListingReport",
  getDividendListBySearchCriteria:
    "/api/v1/Dividend/GetDividendListBySearchCriteria",
  getDividendDetailsById: "/api/v1/Dividend/GetDividendDetailsById",
  saveDividendExclusionDetails: "/api/v1/Dividend/SaveDividendExclusionDetails",
  getMergeSplitListing: "/api/v1/MergeSplit/GetMergeSplitListing",
  saveMergeSplitDetails: "/api/v1/MergeSplit/SaveMergeSplitDetails",
  downloadMergeSplitReport:
    "/api/v1/MergeSplit/DownloadMergeSplitListingReport",
  getMergeSplitDetailsById: "api/v1/MergeSplit/GetMergeSplitDetails",
  getMergeSplitSummaryDetailsbyTransactionKey:
    "api/v1/MergeSplit/GetMergeSplitDetailsByTransactionKey",
  saveSummaryDetailsById: "/api/v1/Dividend/SaveDividendSummaryById",
  validateFundSwitch: "/api/v1/Investment/ValidateFundSwitch",

  getAccrualRateDetails: "/api/v1/Accrual",
  saveAccrualRateDetails: "/api/v1/Accrual",
  getFundSwitchTransactionBreakdown:
    "/api/v1/FundSwitch/GetFundSwitchTransactionBreakdown",
  downloadDividendReport: "/api/v1/Dividend/DownloadDividendListingReport",
  deleteFundSwitch: "/api/v1/FundSwitch/DeleteFundSwitch",
  downloadStockSplitReport: "/api/v1/MergeSplit/DownloadStockSplitReport",
  downloadFundSwitchReportTransaction:
    "/api/v1/FundSwitch/DownloadFundSwitchReport",
};

export const dividend = {
  getDividendTransactionsBySearchCriteria:
    "/api/v1/Dividend/GetDividendTransactionsBySearchCriteria",
  deleteDividendDetails: "/api/v1/Dividend/DeleteDividendDetails",
  saveScheduleDividendDetails: "api/v1/Dividend/SaveScheduleDividendDetails",
  getDividendTransactionDetailsByTransactionKey:
    "/api/v1/Dividend/getDividendTransactionDetailsByTransactionKey",
  getDividendTransactionDetailsById:
    "/api/v1/Dividend/getDividendTransactionDetailsById",
  getEmployeeLevelDetailsForDividendTransactions:
    "/api/v1/Dividend/GetEmployeeLevelDetailsForDividendTransactions",
  getSourceLevelTransactionBreakdownByDividendAndEmployeeId:
    "/api/v1/Dividend/GetSourceLevelTransactionBreakdownByDividendAndEmployeeId",
  getAccrualDetailsOfDividendTransactionByEmployeeId:
    "/api/v1/Dividend/GetAccrualDetailsOfDividendTransactionByEmployeeId",
  getDividendHistoryDetailsById:
    "/api/v1/Dividend/GetDividendHistoryDetailsById",
  saveDividendDetails: "/api/v1/Dividend/SaveDividendDetails",
};
