import { get } from "lodash-es";

export const adjustments = {
  downloadAdjustmentReport:
    "/api/v1/Adjustment/DownloadAdjustmentListingReport",
  getAdjustmentListBySearchCriteria:
    "/api/v1/Adjustment/GetAdjustmentListBySearchCriteria",
  saveBasicAdjustmentDetails: "/api/v1/Adjustment/SaveBasicAdjustmentDetails",
  getIncidentCodes: "/api/v1/Tenant/GetIncidentCodes",
  addIncidentCode: "/api/v1/Tenant/AddIncidentCode",
  getAdjustmentDetailsById: "/api/v1/Adjustment/GetAdjustmentDetailsById",
  getAdjustmentWarnings: "/api/v1/Adjustment/GetAdjustmentWarnings",
  saveAdjustmentDetails: "/api/v1/Adjustment/SaveAdjustmentDetails",
  uploadDocument: "/api/v1/Adjustment/UploadDocument",
  saveBatchAdjustmentFile: "/api/v1/Adjustment/SaveBatchAdjustmentFile",
  deleteAdjustment: "/api/v1/Adjustment/DeleteAdjustmentDetails",
  saveAdjustmentSummaryDetailsById:
    "/api/v1/Adjustment/SaveAdjustmentSummaryById",
  addNotes: "api/v1/Adjustment/AddNotes",
  saveContributionReversal: "/api/v1/Adjustment/SaveContributionReversal",
  getParticipantDataForContributionReversal:
    "/api/v1/Adjustment/GetParticipantDataForContributionReversal",
  downloadContributionReversalData:
    "/api/v1/Adjustment/DownloadContributionReversalData",
  getFeeReversalSummaryDetails:
    "/api/v1/Adjustment/GetFeeReversalSummaryDetails",
  getFeeReversalSummaryEmployeeDetails:
    "/api/v1/Adjustment/GetFeeReversalSummaryEmployeeDetails",
  downloadFeeReversalData: "/api/v1/Adjustment/DownloadFeeReversalData",
  downloadFeeReversalEmployeeSummary:
    "/api/v1/Adjustment/DownloadFeeReversalEmployeeSummary",
  getContributionReversalSummaryDetails:
    "/api/v1/Adjustment/GetContributionReversalSummaryDetails",
  getFeeReversalSummaryDetails:
    "/api/v1/Adjustment/GetFeeReversalSummaryDetails",
  downloadFeeReversalData: "/api/v1/Adjustment/DownloadFeeReversalData",
  getFileUploadDetailsByFileIndentifier:
    "/api/v1/Adjustment/GetFileUploadDetailsByFileIndentifier",
  getBatchAdjustmentDetailsBySearchCriteria:
    "/api/v1/Adjustment/GetBatchAdjustmentDetailsBySearchCriteria",
  getDownloadUploadedFileDetails:
    "/api/v1/Adjustment/DownloadUploadedFileDetails",
  saveBatchAdjustmentDetails: "/api/v1/Adjustment/SaveBatchAdjustmentDetails",
  downloadBatchAdjustmentEmployeeTemplate:
    "/api/v1/Adjustment/DownloadBatchAdjustmentEmployeeTemplate",
  getBatchAdjustmentDetailsById:
    "/api/v1/Adjustment/GetBatchAdjustmentDetailsById",
  getEmployeeBasedOnPayrollFile:
    "/api/v1/Adjustment/GetEmployeeBasedOnPayrollFile",
  downloadErrorReportDetails: "/api/v1/Adjustment/DownloadErrorReportDetails",
  deleteBatchAdjustmentDetailsById:
    "/api/v1/Adjustment/DeleteBatchAdjustmentDetailsById",
  finalSaveBatchAdjustmentDetails:
    "/api/v1/Adjustment/FinalSaveBatchAdjustmentDetails",
  getAdjusmentSummary: "/api/v1/Adjustment/GetAdjusmentSummary",
};

export const dividendReversal = {
  getDividendTransactions: "/api/v1/Adjustment/GetDividendTransactions",
  saveDividendReversal: "/api/v1/Adjustment/SaveDividendReversal",
  deleteDividendReversal: "/api/v1/Adjustment/DeleteDividendReversalById",
  getDividendReversalList: "/api/v1/Adjustment/GetDividendReversalList",
  finalSaveDividendReversal: "/api/v1/Adjustment/FinalSaveDividendReversal",
  downloadDividendReversalReport:
    "/api/v1/Adjustment/DownloadDividendReversalReport",
  getDividendReversalSummaryByDividendId:
    "/api/v1/Adjustment/GetDividendReversalSummaryByDividendId",
  getDividendReversalPlans: "/api/v1/Adjustment/GetDividendReversalPlans",
  getDividendReversalPlanDetails:
    "/api/v1/Adjustment/GetDividendReversalPlanDetails",
  getDividendReversalTransactionDetailsById:
    "/api/v1/Adjustment/GetTransactionDividendReversalDataWithTransactionId",
  getTransactionDividendReversalEmployeeDetails:
    "/api/v1/Adjustment/GetTransactionDividendReversalEmployeeDetails",
  getDividendReversalTransactionDetailsByTransactionKey:
    "/api/v1/DividendReversal/GetTransactionDetailsByTransactionKey",
  getEmployeeLevelDetailsForDividendReversalTransactions:
    "/api/v1/DividendReversal/GetEmployeeLevelDetails",
  getDividendReversalHistoryDetailsById:
    "/api/v1/DividendReversal/GetHistoryDetailsById",
  getSourceLevelTransactionBreakdownByDividendReversalAndEmployeeId:
    "/api/v1/DividendReversal/GetSourceLevelTransactionBreakdown",
  getTransactionsDividendReversal:
    "/api/v1/Adjustment/GetTransactionsDividendReversal",
  getDividendReversalIdList: "/api/v1/Adjustment/GetDividendReversalIdList",
};
export const contributionReversal = {
  getContributionDetailsBySearchCriteria:
    "/api/v1/Adjustment/GetContributionDetailsBySearchCriteria",
  getContributionReversalSummaryDetailsById:
    "/api/v1/Adjustment/GetContributionReversalSummaryDetails",
  getContributionReversalPayrollDetails:
    "/api/v1/Adjustment/GetContributionReversalPayrollDetails",
  downloadContributionReversalListingReport:
    "/api/v1/Adjustment/DownloadContributionReversalListingData",
  getContributionReversalByParentTransactionId:
    "/api/v1/Adjustment/GetContributionReversalByParentTransactionId",
  getContributionReversalFileInformation:
    "/api/v1/Adjustment/GetContributionReversalFileInformation",
  getAllFileEmployeeForContributionReversal:
    "/api/v1/Adjustment/GetAllFileEmployeeForContributionReversal",
};
export const feeReversal = {
  getFeeReversalDetailsBySearchCriteria:
    "/api/v1/Adjustment/GetFeeReversalDetailsBySearchCriteria",
  getFeeReversalSummaryDetailsById:
    "/api/v1/Adjustment/GetFeeReversalSummaryDetails",
  getFeeReversalPayrollDetails:
    "/api/v1/Adjustment/GetFeeReversalPayrollDetails",
  downloadFeeReversalListingReport:
    "/api/v1/Adjustment/DownloadFeeReversalListingReport",
  getFeeReversalHistoryDetailsByParentTransactionId:
    "/api/v1/Adjustment/GetFeeReversalHistoryDetailsByParentTransactionId",
  getFeeReversalFileInformation:
    "/api/v1/Adjustment/GetFeeReversalFileInformation",
  getAllFileEmployeeForFeeReversal:
    "/api/v1/Adjustment/GetAllFileEmployeeForFeeReversal",
  getFeeReversalIdList: "/api/v1/Adjustment/GetFeeReversalIdList",
  getParticipantDataForFeeReversal:
    "/api/v1/Adjustment/GetParticipantDataForFeeReversal",
  saveFeeReversal: "/api/v1/Adjustment/SaveFeeReversal",
  getFeeReversalPlans: "/api/v1/Adjustment/GetFeeReversalPlans",
  getFeeReversalPlanDetails: "/api/v1/Adjustment/GetFeeReversalPlanDetails",
};
