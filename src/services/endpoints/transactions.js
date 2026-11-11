export const transactions = {
  //loan
  switchTreatmentOfloans: "/api/v1/Loan/SwitchTreatmentOfLoans",
  getInProgressLoanDetails: "/api/v1/Loan/GetInProgressLoanRequest",
  addLoanNotes: "api/v1/Loan/AddNotes",
  GetLoanByEmployeeId: "/api/v1/Loan/GetEmployeeLoan",
  getLoanById: "/api/v1/Loan/GetLoan",
  getLoanByBusinessKey: "/api/v1/Loan/GetLoanByBusinessKey",
  getLoanDisbursementSummaryById: "/api/v1/Loan/GetLoanDisbursementSummary",
  getDisbursementListingDataBySearchCriteria:
    "/api/v1/Transaction/GetDisbursementListingDataBySearchCriteria",
  getTotalOutStandingLoanPrinciple:
    "/api/v1/Loan/GetTotalOutStandingLoanPrinciple",
  // approval count data
  getLoanAwaitingForApprovalCount:
    "/api/v1/Loan/GetLoanAwaitingForApprovalRequestCount",
  getApprovalWithdrawalCount: "/api/Distribution/GetWithdrawalCount",
  getApprovalRolloverinCount:
    "/api/RolloverIn/GetApprovalInProgressRolloverInRequestCount",
  getApprovalInPlanRothConversionCount:
    "/api/v1/InPlanRothConversion/GetApprovalInPlanRothConversionRequestCount",
  getInPlanRothApprovalRequestDetails:
    "/api/v1/InPlanRothConversion/GetInPlanRothApprovalRequestDetails",
  getInPlanRothRequestSummaryDetails:
    "/api/v1/InPlanRothConversion/GetInPlanRothRequestSummaryDetails",
  getLoanSubTypeByPlanId: "/api/Loan/GetLoanSubType",
  approveLoan: "/api/v1/Loan/ApproveLoan",
  rejectLoan: "/api/v1/Loan/RejectLoan",
  getLoanDocumentByBusinessKey: "/api/v1/Loan/getLoanDocumentByBusinessKey",
  getPaymentDetailsByBusinessKey: "/api/v1/Loan/GetPaymentDetailsByBusinessKey",
  getSourceInvestmentSplitup: "/api/v1/Loan/GetSourceInvestmentSplitup",
  calculateSourceInvestmentSplitUp:
    "/api/v1/Loan/CalculateSourceInvestmentSplitUp",
  getEmployeeLoanRepayment: "/api/v1/Loan/GetEmployeeLoanRepayment",
  getLoanRepaymentDates: "/api/v1/Loan/GetLoanRepaymentDate",
  loanRepaymentAmountCalculator: "/api/v1/Loan/LoanRepaymentAmountCalculator",

  //approval employeeData in card(list)
  getApprovalWithdrawalEmployee:
    "/api/Distribution/GetWithdrawalRequestForApproval",
  getApprovalLoanEmployee:
    "/api/v1/Loan/GetLoanAwaitingForApprovalRequestDetails",
  getApprovalRolloverinEmployee:
    "/api/RolloverIn/GetRolloverInRequestForApproval",

  //draft employeeData in card
  getDraftWithdrawalEmployee:
    "/api/Distribution/GetInProgressWithdrawalRequests",
  getDraftLoanEmployee: "/api/v1/transactions/",
  getDraftRolloverinEmployee:
    "/api/RolloverIn/GetRolloverInRequestInProgressList",

  // draft data count
  getDraftWithdrawalCount: "/api/Distribution/GetInProgressCount",
  getDraftLoanCount: "/api/v1/Loan/GetLoanInProgressRequestCount",
  getDraftRolloverinCount:
    "/api/RolloverIn/GetRolloverInRequestInProgressCount",

  //searchFilter for approval(post)
  getWithDrawalApprovalSearchinEmployee:
    "/api/Distribution/GetWithdrawalRequestForApproval",
  getRolloverinApprovalSearchinEmployee:
    "/api/RolloverIn/GetRolloverInRequestForApproval",
  getLoanApprovalSearchinEmployee:
    "/api/v1/Loan/GetLoanInProgressRequestDetails",

  //searchFilter for draft(post)
  getRollOverinDraftSearchinEmployee:
    "/api/RolloverIn/GetRolloverInRequestInProgressList",
  getWithdrawalsDraftSearchinEmployee:
    "/api/Distribution/GetInProgressWithdrawalRequests",

  //deletDraft
  deleteWithdrawalRequest: "/api/Distribution/DeleteWithdrawalRequest",
  deleteRollOverInRequest: "/api/RolloverIn/DeleteRolloverInRequestDetailsById",
  deleteLoanRequest: "/api/v1/Loan/DeleteLoan",
  deleteLoanRepaymentRequest: "/api/v1/Loan/DeleteLoanRepaymentTransaction",

  getEmployeeEligiblePlanLoans: "/api/v1/Loan/GetEmployeePlanLoans",
  saveLoanRequest: "/api/v1/Loan/SaveLoanRequest",
  checkAndUpdateLoanStatus: "/api/v1/Loan/CheckAndUpdateLoanStatus",
  submitLoanRequest: "/api/v1/Loan/SubmitLoanRequest",
  getLoanDisbursementHistory: "/api/v1/Loan/GetLoanDisbursementHistory",
  processLoanDisbursement: "/api/v1/Loan/ProcessLoanDisbursement",
  saveInProgressLoan: "/api/v1/Loan/SaveInprogressLoanRequest",
  //submitLoanRequest: "/api/v1/Loan/SubmitLoanRequest",
  uploadLoanDocuments: "/api/v1/Loan/UploadLoanDocuments",
  loanDownloadTemplate: "/api/v1/Loan/LoanDownloadTemplate",
  downloadTemplateByFileName: "/api/EsignTemplate/DownloadTemplatesByDetails",
  getLoanSummary: "/api/v1/Loan/GetLoanSummary",
  loanRefinance: "/api/v1/Loan/SaveLoanRefinance",
  getRefinancingPaymentConfig: "/api/v1/Loan/GetRefinancingPaymentConfig",
  loanSuspension: "/api/v1/Loan/LoanSuspension",
  resumeSuspendedLoan: "/api/v1/Loan/ResumeSuspendedLoan",
  downloadloanRepaymentSchedule: "/api/v1/Loan/DownloadLoanRepaymentSchedule",
  downloadloanAmortizationSchedule:
    "/api/v1/Loan/DownloadLoanAmortizationSchedule",
  getAmortizationSchedule: "/api/v1/Loan/GetAmortizationSchedule",
  getRepaymentSchedule: "/api/v1/Loan/GetRepaymentSchedule",

  //loan delete

  //transfers
  getCurrentHoldings: "/api/v1/Transfer/GetCurrentHoldings",
  getCurrentHoldingsForRebalance:
    "/api/v1/Transfer/GetCurrentHoldingsForRebalance",
  GetSDBagainstInvestment: "api/v1/Investment/GetSDBagainstInvestment",
  GetInvestmentProspectus: "/api/v1/Investment/GetInvestmentProspectus",
  getInvestmentsByPlanId: "/api/v1/Plan/GetInvestmentsByPlanId",
  saveDraftOfTransferDetails: "/api/v1/Transfer/SaveDraftOfTransferDetails",
  saveTransferDetails: "/api/v1/Transfer/SaveTransferDetails",
  getTransferDetails: "/api/v1/Transfer/GetTranferDetails",
  getTransferRequestDetailsByEmpId:
    "/api/v1/Transfer/GetTransferRequestDetailsByEmpId",
  deleteTransferRequest: "/api/v1/Transfer/DeleteTransferRequest",
  addNotesTransfer: "api/v1/Transfer/AddNotes",
  getCurrentHoldingForTransfer: "/api/v1/Transfer/GetCurrentHoldingForTransfer",
  transferAllowedValidation: "/api/v1/Transfer/TransferAllowedValidation",
  saveTransferDetailsForAdmin: "/api/v1/Transfer/SaveTransferDetailsForAdmin",

  //rebalance
  saveDraftOfRebalanceDetails: "/api/v1/Transfer/SaveDraftOfRebalanceDetails",
  saveRebalanceDetails: "/api/v1/Transfer/SaveRebalanceDetails",
  getRebalanceDetails: "/api/v1/Transfer/GetRebalanceDetails",
  getRebalanceRequestDetailsByEmpId:
    "/api/v1/Transfer/GetRebalanceRequestDetailsByEmpId",
  deleteRebalanceRequest: "/api/v1/Transfer/DeleteRebalanceRequest",
  getPlanAndLoanDetailsForDirectRepayment:
    "/api/v1/Loan/GetPlanAndLoanDetailsForDirectRepayment",
  saveLoanRepayments: "/api/v1/Loan/SaveLoanRepayments",
  uploadLoanDocumentsForRepayment: "/api/v1/Loan/UploadDocuments",
};

export const transactionMaintenance = {
  getEmployeeTransactionView: "/api/v1/Trade/GetEmployeeTransactionView",
  getMergeSplitParticipantDetails:
    "/api/v1/MergeSplit/GetMergeSplitParticipantBySearchCriteria",
  getTransactionLoanType: "/api/v1/Loan/GetTransactionLoanType",
  getTransactionTransfer: "api/v1/Transfer/GetTransactionTransfer",
  getTransactionRebalance: "/api/v1/Transfer/GetTransactionRebalance",
  getTransactionRolloverIn: "/api/RolloverIn/GetTransactionRollOverIn",
  getTransactionWithdrawalType:
    "/api/Distribution/GetTransactionWithdrawalType",
  getTransactionLoanRepayment: "/api/v1/Loan/GetTransactionLoanRepayment",
  getLoanRepaymentById: "/api/v1/Loan/GetLoanRepaymentById",
  getTransactionByKey: "/api/v1/Transaction/GetTransactionByKey",
  getTransferDetailsByTransactionKey:
    "/api/v1/Transfer/GetTransferDetailsByTransactionKey",
  getTransactionByParentKey: "/api/v1/Transaction/GetTransactionByParentKey",
  getForfeitureTransactionByKey:
    "/api/v1/Transaction/GetForfeitureTransactionByKey",
  getSourceDetailsFundMerger: "/api/v1/Transaction/GetSourceDetailsFundMerger",
  getTransactionPayroll: "/api/v1/Payroll/GetTransactionPayroll",
  getTransactionContributionReversal:
    "/api/v1/Adjustment/GetTransactionContributionReversal",
  getTransactionFeeReversal: "/api/v1/Adjustment/GetTransactionFeeReversal",
  getFeeHistoryDetailsById: "/api/v1/Fee/GetFeeHistoryDetailsById",
  getPayrollHistoryDetailsById: "/api/v1/Payroll/GetPayrollHistoryDetailsById",
  getContributionReversalHistoryDetailsByParentTransactionId:
    "/api/v1/Adjustment/GetContributionReversalHistoryDetailsByParentTransactionId",
  GetForfeitureHistoryAndReasonByKey:
    "api/v1/Forfeiture/GetForfeitureHistoryAndReasonByKey",
  GetEmployeeDetailsInForfeitureTransactionView:
    "api/v1/Transaction/GetEmployeeDetailsInForfeitureTransactionView",
  GetTransactionByTransactionDate:
    "api/v1/Transaction/GetTransactionByTransactionDate",
  getFileInformationByTransactionKey:
    "/api/v1/Payroll/GetFileInformationByTransactionKey",
  getWithdrawalTransactionHistoryById:
    "/api/Distribution/GetWithdrawalTransactionHistoryById",
  getWithdrawalRequestHistoryTimelineById:
    "/api/Distribution/GetWithdrawalRequestHistoryTimeline",
  getLoanHistoryTimelineById: "/api/v1/Loan/GetLoanHistoryTimeline",
  getLoanRepaymentHistoryTimelineById:
    "/api/v1/Loan/GetLoanRepaymentHistoryTimeline",
  getTransferHistoryTimelineById: "/api/v1/Transfer/GetTransferHistoryTimeline",
  getRebalanceHistoryTimelineById:
    "/api/v1/Transfer/GetRebalanceHistoryTimeline",
  getRolloverInHistoryDetailsById:
    "/api/RolloverIn/GetRolloverInHistoryDetailsById",
  getRolloverInHistoryTimelineById:
    "/api/RolloverIn/GetRolloverInHistoryTimeline",
  getInPlanRothConversionHistoryTimelineById:
    "/api/v1/InPlanRothConversion/GetInPlanRothConversionHistoryTimeline",
  getTransferHistoryDetailsById:
    "/api/v1/Transfer/GetTransferHistoryDetailsById",
  getRebalanceHistoryDetailsById:
    "/api/v1/Transfer/GetRebalanceHistoryDetailsById",
  getLoanRequestHistoryDetailsById:
    "/api/v1/Loan/GetLoanRequestHistoryDetailsById",
  getLoanRepaymentHistoryDetailsById:
    "/api/v1/Loan/GetLoanRepaymentHistoryDetailsById",
  getMergeSplitTransactionsBySearchCriteria:
    "api/v1/MergeSplit/GetMergeSplitTransactionsBySearchCriteria",
  getFeeSubTypeByPlanId: "/api/v1/Fee/GetFeeSubTypeByPlanId",
  getTransactionFee: "/api/v1/Fee/GetTransactionFee",
  getTransactionFeeDetailsById: "/api/v1/Fee/getTransactionFeeDetailsById",
  fundSwitchTransactionListingEmployee:
    "/api/v1/FundSwitch/FundSwitchTransactionListingEmployee",
  getEmployeeFundSwitchDetails:
    "/api/v1/FundSwitch/GetEmployeeFundSwitchDetails",
  getFundSwitchHistoryDetails: "/api/v1/FundSwitch/GetFundSwitchHistoryDetails",
  getAdjustmentHistoryDetailsById:
    "/api/v1/Adjustment/GetAdjustmentHistoryDetailsById",
  getCurrentFutureHoldings: "/api/v1/Adjustment/GetCurrentFutureHoldings",
  getAllFileEmployeeForTransaction:
    "/api/v1/Report/GetAllFileEmployeeForTransaction",
  getAllEmployeeForPayrollTransaction:
    "/api/v1/Report/GetAllEmployeeForPayrollTransaction",
  getFundSwitchTransactionsBySearchCriteria:
    "api/v1/FundSwitch/GetFundSwitchTransactionsBySearchCriteria",
  getMergeSplitTransactionBreakdownByEmployee:
    "api/v1/MergeSplit/GetTransactionBreakdownByEmployee",
  getMergeSplitTransactionBreakdownById:
    "api/v1/MergeSplit/GetTransactionBreakdownById",
  downloadEmployeeTransactionsDetailReport:
    "api/v1/Trade/DownloadEmployeeTransactionsDetailReport",
  downloadTransactionDistributionReport:
    "api/Distribution/DownloadTransactionDistributionReport",
  downloadTransactionLoanTypeReport:
    "api/v1/Loan/DownloadTransactionLoanTypeReport",
  downloadTransactionLoanRepaymentReport:
    "api/v1/Loan/DownloadTransactionLoanRepaymentReport",
  downloadTransactionReport: "api/v1/Trade/DownloadTransactionReport",
  downloadTransactionDividendReport:
    "api/v1/Dividend/DownloadTransactionDividendReport",
  downloadTransactionDividendReversalReport:
    "api/v1/Adjustment/DownloadTransactionDividendReversalReport",
  downloadTransactionContributionReversalReport:
    "api/v1/Adjustment/DownloadTransactionContributionReversalReport",
  downloadTransactionFeeReport: "api/v1/Fee/DownloadTransactionFeeReport",
  downloadTransactionForfeitureInReport:
    "api/v1/Forfeiture/DownloadTransactionForfeitureInReport",
  downloadTransactionForfeitureOutReport:
    "api/v1/Forfeiture/DownloadTransactionForfeitureOutReport",
  downloadTransactionPayrollReport:
    "api/v1/Payroll/DownloadTransactionPayrollReport",
  downloadTransactionRollOverInReport:
    "api/RolloverIn/DownloadTransactionRollOverInReport",
  downloadTransactionSSPReport: "api/v1/SSP/DownloadTransactionSSPReport",
  downloadTransactionAdjustmentReport:
    "api/v1/Adjustment/DownloadTransactionAdjustmentReport",
  downloadTransactionModelPortfolioRebalanceReport:
    "api/v1/Trade/DownloadTransactionModelPortfolioRebalanceReport",
  downloadTransactionBatchAdjustmentReport:
    "api/v1/Adjustment/DownloadTransactionBatchAdjustmentReport",
  getTransactionMaintenanceBySearchCriteria:
    "api/v1/Adjustment/GetTransactionMaintenanceBySearchCriteria",
  getEventWiseTransactionDetails:
    "/api/v1/Transaction/GetEventWiseTransactionDetails",
  getRedemptionFeeSummaryDetails:
    "/api/v1/Transaction/GetRedemptionFeeSummaryDetails",
  getETFRedemptionFeeByTransactionsKey:
    "/api/v1/Transaction/GetETFRedemptionFeeByTransactionsKey",
  getETFRedemptionFeeByParentKey:
    "/api/v1/Transaction/GetETFRedemptionFeeByParentKey",
  getTradeReconciliationReportData:
    "/api/v1/Transaction/GetTradeReconciliationreport",
  downloadTradeReconciliationReportData:
    "/api/v1/Transaction/DownloadTradeReconciliationReport",
  getBatchAdjustmentTransactionMaintenanceData:
    "api/v1/Adjustment/GetBatchAdjustmentTransactionMaintenanceData",
  getTrasactionMaintenanceBatchAdjustmentDetails:
    "/api/v1/Adjustment/GetTrasactionMaintenanceBatchAdjustmentDetails",
  getBatchAdjustmentEmployees: "/api/v1/Adjustment/GetBatchAdjustmentEmployees",
  getBatchAdjustmentHistoryDetailsById:
    "/api/v1/Adjustment/GetBatchAdjustmentHistoryDetailsById",
  downloadTradeOrderInvestement:
    "/api/v1/Transaction/DownloadTradeOrderInvestement",
  getTotalPlanAndForfeitureBalance:
    "/api/v1/Transaction/GetTotalPlanAndForfeitureBalance",
  downloadTransactionFundMergerReport:
    "/api/v1/MergeSplit/DownloadTransactionMergeSplitReport",
  getRothAndNonRothCodeForDeemedAndBenefitOffsetLoan:
    "/api/v1/Report/GetRothAndNonRothCodeForDeemedAndBenefitOffsetLoan",
  downloadFeeReversalReport: "/api/v1/Adjustment/DownloadFeeReversalReport",
};
