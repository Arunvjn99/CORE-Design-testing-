export const fee = {
  cancelTradeByFeeId: "/api/v1/Fee/CancelTradeByFeeId",
  downloadFeeTransactionListingReport:
    "/api/v1/Fee/DownloadFeeTransactionListingReport",
  downloadFeeTransactionSummaryReport:
    "/api/v1/Fee/DownloadFeeTransactionSummaryReport",
  getFeeRunListingDetailsBySearchCriteria:
    "/api/v1/Fee/GetFeeRunListingDetailsBySearchCriteria",
  getParticipantFeeRunDetailsList:
    "/api/v1/Fee/GetParticipantFeeRunDetailsList",
  getSourceInvestmentLevelDetails: "/api/v1/Fee/GetSourceInvestmentFeeBreakUp",
  getPlanLevelFeeRunDetails: "/api/v1/Fee/GetPlanLevelFeeRunDetails",
  getFeeSpecificationBasedOnSearchCriteria:
    "/api/v1/Fee/GetFeeSpecificationBasedOnSearchCriteria",
  saveFeeCalculationDetails: "/api/v1/Fee/SaveFeeCalculationDetails",
  saveBasicFeeDetails: "/api/v1/Fee/SaveFeeDetails",
  getBasicFeeDetails: "api/v1/Fees/GetFeeDetails",
  getFeeDetailsById: "api/v1/Fee/GetFeeDetailsById",
  getFeeTransactionById: "/api/v1/Fee/GetFeeTransactionById",
  processFeeDisbursement: "/api/v1/Fee/processFeeDisbursement",
  getFeeTransactionSummary: "/api/v1/Fee/GetFeeTransactionSummary",
  getFeeDisbursementHistory: "/api/v1/Fee/GetFeeDisbursementHistory",
  getTransactionalFeeDisbursementSummary:
    "/api/v1/Fee/GetTransactionalFeeDisbursementSummary",
  getTransactionalFeeDisbursementHistory:
    "/api/v1/Fee/GetTransactionalFeeDisbursementHistory",
  processTransactionalFeeDisbursement:
    "/api/v1/Fee/ProcessTransactionalFeeDisbursement",
  getFeeClassifications: "api/v1/Fee/GetFeeClassifications",
  addFeeClassification: "api/v1/Fee/AddFeeClassifications",
  validateCreateSpecificationSlider:
    "/api/v1/Fee/ValidateCreateSpecificationSlider",
  addSpecificationDetails: "/api/v1/Fee/AddSpecificationDetails",
  getFeeApplicableTo: "/api/v1/Fee/GetFeeApplicableTo",
  addFeeApplicableTo: "/api/v1/Fee/AddFeeApplicableTo",
  getFeeDetailsBySearchCriteria: "/api/v1/Fee/GetFeeDetailsBySearchCriteria",
  getFeeDetailsById: "/api/v1/Fee/GetFeeDetailsById",
  getSourceAndInvestmentList: "/api/v1/Fee/GetSourceAndInvestmentTypeList",
  getPlanListBasedOnFilter: "/api/v1/Fee/getPlanListBasedOnFilter",
  getFeeCalculationDetailsById: "/api/v1/Fee/getFeeCalculationDetailsById",
  getFeeSpecificationDetailsById: "/api/v1/Fee/GetFeeSpecificationDetailsById",
  getPlanLevelFeeCollectedDetailsAfterTrade:
    "/api/v1/Fee/getPlanLevelFeeCollectedDetailsAfterTrade",
  getFeeSchedule: "/api/v1/Fee/GetFeeSchedule",
  saveSummaryDetails: "/api/v1/Fee/SaveSummaryDetails",
  getFeeSummaryDetailsById: "/api/v1/Fee/GetFeeSummaryDetailsById",
  addFeeSchedule: "/api/v1/Fee/AddFeeSchedule",
  getPlanGroupsForFee: "/api/v1/Fee/GetPlanGroupsForFee",
  getInvestmentForFee: "/api/v1/Fee/GetInvestmentForFee",
  getFeeRunDetailsByTransactionId: "api/v1/Fee/GetFeeRunDetailsByTransactionId",
  deleteFeeById: "api/v1/Fee/DeleteFeeById",
  downloadSponsorFeeListingReport:
    "/api/v1/Fee/DownloadSponsorFeeListingReport",
  getSponsorFeeRunDetailsById: "/api/v1/Fee/GetSponsorFeeRunDetailsById",
  addFeeWaiveOff: "/api/v1/Fee/AddFeeWaiveOff",
  addFeePaymentStatus: "/api/v1/Fee/AddFeePaymentStatus",
  getTransactionKeyForForfeiture: "/api/v1/Fee/GetForfeitureDetailsWithKey",
  getFeeTransactionList: "/api/v1/Fee/GetFeeTransactionList",
  getDefaultPayee: "/api/v1/Fee/GetDefaultPayees",
  upsertDefaultPayee: "/api/Payee/UpsertPayee",
  getApplicableFeesForDefaultPayee:
    "/api/v1/Fee/GetApplicableFeesForDefaultPayee",
};
export const invoice = {
  getFeeInvoiceListingDetailsBySearchCriteria:
    "/api/Invoice/GetFeeInvoiceListingDetailsBySearchCriteria",
  downloadFeeInvoiceListingReport:
    "/api/Invoice/downloadFeeInvoiceListingReport",
  addNotesInvoice: "/api/Invoice/AddNotes",
  getFeeInvoiceUrlWithId: "/api/Invoice/GetFeeInvoiceUrlWithId",
  addInvoiceFeePayment: "/api/Invoice/AddInvoiceFeePayment",
  saveBulkUploadDocument: "/api/Invoice/SaveBulkUploadDocument",
  getInvoiceBulkUploadListingDetailsBySearchCriteria:
    "/api/Invoice/GetInvoiceBulkUploadListingDetailsBySearchCriteria",
  getInvoiceBulkUploadFileDetails:
    "/api/Invoice/GetInvoiceBulkUploadFileDetails",
  downloadInvoiceBulkUploadListingReport:
    "/api/Invoice/DownloadInvoiceBulkUploadListingReport",
  GetPaymentLink: "/api/Invoice/GeneratePaymentLink",
};
