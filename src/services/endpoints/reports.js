export const reports = {
  getSponsorOrganizationList: "/api/v1/Report/GetSponsorOrganizationList",
  getMasterPlanList: "/api/v1/Report/GetMasterPlanListBySponsorOrganizationId",
  getFileInformationWithErrorDetailsById: "/api/v1/Report/GetFileInformation",
  getAllEmployeeRecords: "/api/v1/Report/GetAllFileEmployeeReport",
  getDeletedEmployeeRecords: "/api/v1/Report/GetDeletedEmployeeReport",
  getDeletedEmployeeLevelData: "/api/v1/Report/GetDeletedEmployeeLevelData",

  getEmployeeTransactionDetails:
    "/api/v1/Report/GetEmployeePayDateLevelTransactionDetails",
  getSourceLevelPayrollDetailsById:
    "/api/v1/Report/GetSourceLevelPayrollinformation",
  getDataChangeInformation: "/api/v1/Report/GetDataChangeReportInformation",
  getDataOverrideInformation: "/api/v1/Report/GetDataOverrideReportInformation",
  getErrorValidationInformation: "/api/v1/Report/GetErrorValidationInformation",
  getPayrollFundingInformation: "/api/v1/Report/GetPayrollFundingInformation",
  getDownloadDataChangeReport: "/api/v1/Report/DownloadDataChangeReport",
  getDownloadDataOverrideReport: "/api/v1/Report/DownloadDataOverrideReport",
  getDownloadErrorValidationReport: "/api/v1/Report/DownloadErrorReport",
  getDownloadFundingReport: "/api/v1/Report/DownloadPayrollFundingInformation",
  getDownloadUploadedFileReport: "/api/v1/Report/DownloadInputFile",
  getDownloadSubmittedFileReport: "/api/v1/Report/DownloadSubmittedFile",
  getDownloadPlanEligibilityDataReport:
    "/api/v1/Report/DownloadPlanEligibilityReport",
  getDownloadPayrollWorkloadAnticipationReport:
    "/api/v1/Report/DownloadPayrollWorkloadAnticipationReport",
  getDownloadPlanListReport: "/api/v1/Report/DownloadPlanListReport",
  getDownloadAllFileEmployeeDetails:
    "/api/v1/Report/DownloadAllFileEmployeeDetails",
  // Manage Report
  getCompaniesList: "/api/v1/Report/GetCompaniesList",
  getCompanyList: "/api/v1/Report/GetCompanyList",
  getNonPayPeriodReportData: "/api/v1/Report/GetNonPayPeriodReportdata",
  downloadReportNonPayPeriod: "/api/v1/Report/DownloadReportNonPayPeriod",
  getMasterLoanTypes: "/api/v1/Report/GetMasterLoanTypes",
  getPlansList: "/api/v1/Report/GetPlansList",
  getPlanList: "/api/v1/Report/GetPlanList",
  getDownloadEligibilityStatusReport:
    "/api/v1/Report/DownloadEligibilityStatusReport",
  DownloadCorrectionEligibilityStatusReport:
    "/api/v1/Report/DownloadCorrectionEligibilityStatusReport",
  GetCorrectionEligibilityStatusReport:
    "api/v1/Report/GetCorrectionEligibilityStatusReport",
  GetParticipantElectionsAndBalances:
    "api/v1/Report/GetParticipantElectionsAndBalances",
  DownloadGetParticipantElectionsAndBalances:
    "api/v1/Report/DownloadGetParticipantElectionsAndBalances",
  getEligibilityStatusReportInformation:
    "/api/v1/Report/GetEligibilityStatusReportInformation",
  getReportStatusForNonPayPeriod:
    "api/v1/Report/GetReportStatusForNonPayPeriod",
  getDownloadEligibilityForecastReport:
    "/api/v1/Report/DownloadEligibilityForcastReport",
  getEligibilityForecastReportInformation:
    "/api/v1/Report/GetEligibilityForecastReportInformation",
  downloadPayrollFundingTotals: "/api/v1/Report/DownloadPayrollFundingTotals",
  getDownload402gReport: "/api/v1/Report/Download402GReport",
  get402gReportInformation: "/api/v1/Report/Get402gContribitionReport",
  getForfeitureSummaryReport: "/api/v1/Report/GetForfeitureSummaryReport",
  downloadForfeitureSummaryReport: "/api/v1/Report/DownloadForfeitureReport",
  Getforfeituretransaction: "/api/v1/Forfeiture/GetForfeitureTransaction",
  GetForfeitureOutTransaction: "/api/v1/Forfeiture/GetForfeitureOutTransaction",
  getDownloadContributionDataReport:
    "/api/v1/Report/DownloadContributionDataReport",
  getContributionDataReportInfo:
    "/api/v1/Report/GetParticipantContributionDataReport",
  getDownloadParticipantUpdatesReport:
    "/api/v1/Report/DownloadParticipantUpdateReport",
  getParticipantUpdatesReportInfo: "/api/v1/Report/GetParticipantUpdateReport",
  getContributionFlagsReportInfo: "/api/v1/Report/GetContributionFlagsReport",
  getDownloadContributionFlagsReport:
    "/api/v1/Report/DownloadContributionFlagsReport",
  getDownload415Report: "/api/v1/Report/Download415Report",
  getDownloadLoanRepaymentReport: "api/v1/report/DownloadLoanRepaymentReport",
  get415ReportInformation: "/api/v1/Report/Get415ContribitionReport",
  getLoanRepaymentReport: "/api/v1/Report/GetLoanRepaymentReport",
  getDownloadDeletedParticipantReport:
    "/api/v1/Report/DownloadDeletedParticipantReport",
  getDeletedParticipantReportInformation:
    "/api/v1/Report/GetDeletedParticipantReport",
  getRehireParticipantsReportInformation:
    "/api/v1/Report/GetRehireParticipantsReport",
  getCompensationHoursLoansReportInformation:
    "/api/v1/Report/GetCompensationHoursLoans",
  downloadCompensationHoursLoansReportInformation:
    "/api/v1/Report/DownloadCompensationHoursLoans",
  getNewParticipantEligibilityReportInformation:
    "/api/v1/Report/GetNewParticipantEligibilityReport",
  getDownloadEmploymentStatusReport:
    "/api/v1/Report/DownloadEmploymentStatusReport",
  getVestingReductionReport: "/api/v1/Report/VestingReductionReport",
  getEmploymentStatusReportInformation:
    "/api/v1/Report/GetEmployementStatusReport",
  getDownloadNewParticipantReport:
    "/api/v1/Report/DownloadNewParticipantsReport",
  getDownloadRehireReport: "/api/v1/Report/DownloadRehireParticipantsReport",
  getDownloadErrorCountReport: "/api/v1/Report/DownloadErrorCountReport",
  getErrorCountReportInformation:
    "/api/v1/Report/GetErrorCountReportInformation",
  getSponsorDetailsReportInformation: "/api/v1/Report/GetSponsorDetailsReport",
  getDownloadSponsorDetailsReport:
    "/api/v1/Report/DownloadSponsorDetailsReport",
  getPlanSummaryReportInformation: "/api/v1/Report/GetPlanSummaryReport",
  getDownloadPlanSummaryReport: "/api/v1/Report/DownloadPlanSummaryReport",
  getDownloadLatePayrollNotificationsReport:
    "/api/v1/Report/DownloadLatePayrollNotificationReport",
  getLatePayrollNotificationsReportInformation:
    "/api/v1/Report/GetLatePayrollNotificationReport",
  getPayrollCancellation: "/api/v1/Payroll/PayrollCancellation",
  getDownloadPeriodicCensusReport:
    "/api/v1/Report/DownloadPeriodicCensusReport",
  getPeriodicCensusReport: "/api/v1/Report/GetPeriodicCensusReport",
  getDownloadPeriodicEmployerContributionReport:
    "/api/v1/Report/DownloadPeriodicEmployerContributionReport",
  getPeriodicEmployerContributionReport:
    "/api/v1/Report/GetPeriodicEmployerContributionReport",
  generatePeriodicEmployerContributionPayrollFile:
    "/api/v1/Report/DownloadPeriodicEmployerContributionPayrollFile",
  getRMDReport: "/api/v1/Report/GetRMDReport",
  getMissedRMDReport: "/api/v1/Report/DownloadMissedRMDReport",
  getDownloadRMDReport: "/api/v1/Report/GetDownloadRMDReport",
  getForceOutReportInformation: "/api/v1/Report/GetForceOutReport",
  getDownloadForceOutReport: "/api/v1/Report/GetDownloadForceOutReport",
  getDownloadAggregatedReport:
    "/api/v1/Report/DownloadAggregatedPeriodicReport",
  downloadForceOutReport: "/api/v1/Report/DownloadForceOutReport",
  getLoanRepaymentDetailReport: "/api/v1/Report/GetLoanRepaymentDetailReport",
  getDownloadLoanRepaymentDetailReport:
    "/api/v1/Report/DownloadLoanRepaymentDetailReport",
  getFileUploadedReport: "/api/v1/Report/GetFileUploadedReport",
  getTopErrorCodes: "/api/v1/Report/GetTopErrorCodes",
  getEmployeeTransactionReport: "/api/v1/Report/GetEmployeeTransactionReport",
  getPlanTransactionReport: "/api/v1/Report/GetPlanTransactionReport",
  getMapperTransactionReport: "/api/v1/Report/GetMapperTransactionReport",
  getTransactionReport: "/api/v1/Report/GetTransactionTypeReport",
  getEnrollmentReviewReport: "/api/v1/Report/GetEnrollmentReviewReport",
  downloadEnrollmentReviewReport:
    "/api/v1/Report/DownloadEnrollmentReviewReport",
  get316ReportInfo: "/api/v1/Report/Get316CensusReport",
  download316ReportInfo: "/api/v1/Report/Download316CensusReport",
  getEmployerContributionProjectionReport:
    "/api/v1/Report/GetEmployerContributionProjectionReport",
  downloadEmployerContributionProjectionReport:
    "/api/v1/Report/DownloadEmployerContributionProjectionReport",
  downloadPayrollCalendarEndDateReport:
    "/api/v1/Report/DownloadPayrollCalendarEndDateReport",
  getDownloadMapperListReport: "/api/v1/Report/DownloadMapperListReport",
  downloadNonPayPeriodReport: "/api/v1/Report/DownloadNonPayPeriodReport",
  get22c2ReportData: "/api/v1/Report/Get22C2ReportData",
  getEtfFeeReportData: "/api/v1/Report/ETFFeeReportBySearchCriteria",
  downloadEtfFeeReportData: "/api/v1/Report/DownloadETFFeeReport",
  getRedemptionFeeReport: "/api/v1/Report/RedemptionFeeReportBySearchCriteria",
  download22c2ReportData: "/api/v1/Report/Download22C2Report",
  downloadRedemptionFeeReport: "/api/v1/Report/DownloadRedemptionFeeReport",
  getYearEndPlanProcessData: "/api/v1/Report/GetYearEndPlanProcessData",
  downloadYearEndProcessDataReport:
    "/api/v1/Report/DownloadYearEndProcessDataReport",
  getYearEndFilterData: "/api/v1/Report/GetYearEndFilterData",
  saveAccountingTransactionReportRequest:
    "/api/v1/Report/SaveAccountingTransactionReport",
  saveSummaryOfParticipantAccountsReportRequest:
    "/api/v1/Report/SaveSummaryOfParticipantAccountsReportRequest",
  saveExecutiveSummaryReportRequest:
    "/api/v1/Report/SaveExecutiveSummaryReportRequest",
  Get1099RReport: "/api/v1/Report/Get1099RReport",
  Download1099RReport: "/api/v1/Report/Download1099RReport",
  DownloadFTWExportReport: "/api/v1/Report/DownloadFTWExportReport",
  GetParticipantDisbursment: "/api/v1/Report/GetParticipantDisbursment",
  DownloadParticipantDisbursement:
    "/api/v1/Report/DownloadParticipantDisbursement",
  getAdjustmentContributionDetails:
    "api/v1/Report/GetAdjustmentContributionDetails",
  downloadAdjustmentDetails: "api/v1/Report/DownloadAdjustmentDetails",
  saveContributionHistorySourceLevelDetails:
    "/api/v1/Report/SaveContributionHistorySourceLevel",
  saveContributionHistoryParticipantLevelDetails:
    "/api/v1/Report/SaveContributionHistoryParticipantLevel",
  getScheduleReport: "/api/v1/Report/GetScheduleReport",
  getSponsorFeeReportInformation:
    "/api/v1/Report/GetSponsorFeeReportInformation",
  getParticipantFeeReportInformation:
    "/api/v1/Report/GetParticipantFeeReportInformation",
  downloadParticipantFeeReport: "/api/v1/Report/DownloadParticipantFeeReport",
  downloadSponsorFeeReport: "/api/v1/Report/DownloadSponsorFeeReport",
  getFundAuditReport: "/api/v1/Report/GetFundAuditReportData",
  downloadFundAuditReportData: "/api/v1/Report/DownloadFundAuditReportData",
  getContributionRateQueryReportInfo: "/api/v1/Report/GetContributionRateQuery",
  getDownloadContributionRateQueryReport:
    "/api/v1/Report/DownloadContributionRateQueryReport",
  getParticipantVestedBalanceReport:
    "/api/v1/Report/GetParticipantVestedBalances",
  DownloadParticipantVestedBalanceReport:
    "/api/v1/Report/DownloadParticipantVestedBalancesReport",
  getParticipantsInvestmentBalancesReportInfo:
    "/api/v1/Report/GetParticipantsInvestmentBalancesReport",
  downloadParticpantsInvestmentBalancesReport:
    "/api/v1/Report/DownloadParticipantsInvestmentBalancesReport",
  downloadVestingReductionReport:
    "/api/v1/Report/DownloadVestingReductionReport",
  getReportTypeList: "/api/v1/Report/GetReportTypeList",
  saveParticipantFeeReportRequest: "/api/v1/Report/SaveParticipantFeeReport",
  getContributionRateChangeQueryReport:
    "/api/v1/Report/GetContributionRateChangeQuery",
  downloadContributionRateChangeQueryReport:
    "/api/v1/Report/DownloadContributionRateChangeReport",
  getRebalanceReport: "/api/v1/Report/GetRebalanceReport",
  downloadRebalanceReport: "/api/v1/Report/DownloadRebalanceReport",
  getSDBReport: "/api/v1/Report/GetSDBReport",
  downloadSDBReport: "/api/v1/Report/DownloadSDBReport",
  saveRebalanceReportRequest: "/api/v1/Report/SaveRebalanceReport",
  getContributionTimingReport: "/api/v1/Report/GetContributionTimingReport",
  getTradeStatusReport: "/api/v1/Report/GetTradeStatusReport",
  downloadContributionTimingReport:
    "/api/v1/Report/DownloadContributionTimingReport",
  downloadTradeStatusReport: "/api/v1/Report/DownloadTradeStatusReport",
  saveSDBReportRequest: "/api/v1/Report/SaveSDBReport",
  saveRMDReportRequest: "/api/v1/Report/SaveRMDReport",
  saveSponsorFeeReportRequest: "/api/v1/Report/SaveSponsorFeeReport",
  getTradeIdentifierReport: "/api/v1/Report/GetTradeIdentifierReport",
  downloadTradeIdentifierReport: "/api/v1/Report/DownloadTradeIdentifierReport",

  saveTrustAccountingReport: "/api/v1/Report/SaveTrustAccountingReport",
};

export const customReport = {
  getCustomReport: "/api/v1/CustomReport/GetCustomReportsList",
  getCustomReportById: "/api/v1/CustomReport/Get/",
  postCustomReport: "/api/v1/CustomReport/Post",
  postCustomReportColumns: "/api/v1/CustomReport/Post/Columns",
  getMasterModels: "/api/v1/CustomReport/GetMasterDataModels/MasterDataModels",
  executeCustomReport: "/api/v1/CustomReport/Execute",
  saveBasicReportDetail: "/api/v1/CustomReport/SaveBasicReportDetail",
  saveReportDataSelection: "/api/v1/CustomReport/SaveReportDataSelection",
  getBasicReportDetail: "/api/v1/CustomReport/GetBasicReportDetail",
  getReportDataSelection: "/api/v1/CustomReport/GetReportDataSelection",
  saveFilterAndGrouping: "/api/v1/CustomReport/SaveFilterAndGrouping",
  getFilterAndGrouping: "/api/v1/CustomReport/GetFilterAndGrouping",
  getReviewDetails: "/api/v1/CustomReport/GetReviewDetails",
  submitCustomReport: "/api/v1/CustomReport/SubmitCustomReport",
};
