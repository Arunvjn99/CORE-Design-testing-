export const payroll = {
  getFileStatusByEmployeeId: "/api/v1/Payroll/GetFileStatusByEmployeeId",
  downloadDeletedEmployeeReport:
    "/api/v1/Payroll/DownloadSubmittedFileForDeletedEmployee",

  exportOutputFiles: "/api/v1/Payroll/ExportOutputFiles",
  downloadpreviewfile: "/api/v1/Payroll/DownloadPreviewFile",
  getEmployeeCount: "/api/v1/Payroll/GetEmployeeCount",
  getPlanCount: "/api/v1/Payroll/GetPlanCount",
  finalSubmit: "/api/v1/Payroll/FinalSubmit",
  updatePayrollFileStatusByFileId:
    "/api/v1/Payroll/UpdatePayrollFileStatusByFileId",
  finalSubmitAndFunding: "/api/v1/Payroll/FinalSubmitAndFunding",
  saveFundingDetails: "/api/v1/Payroll/SaveFundingDetails",
  saveFundingDetailsByFile: "/api/v1/Payroll/SaveFundingDetailsByFile",
  saveFundingDetailsByPlan: "/api/v1/Payroll/SaveFundingDetailsByPlan",
  saveFundingDetailsByMultiplePlans:
    "/api/v1/Payroll/SaveFundingDetailsByMultiplePlans",
  GetPlanInvestmentsByPlanIdAndEmployeeId:
    "/api/v1/Payroll/GetPlanInvestmentsByPlanIdAndEmployeeId",
  saveFundingByClassificationDetails:
    "/api/v1/Payroll/SaveFundingByClassificationDetails",
  getAwaitingFundingDetailsByPlan:
    "/api/v1/Payroll/GetAwaitingFundingDetailsByPlan",
  getAwaitingFundingDetailsByClassification:
    "/api/v1/Payroll/GetAwaitingFundingDetailsByClassification",
  confirmFunds: "/api/v1/Payroll/ConfirmFunds",
  confirmFundsMasterLevel: "/api/v1/Payroll/ConfirFundsMasterLevel",
  exportHoursSummaryReport: "/api/v1/Payroll/ExportHoursSummaryReport",
  getClassificationDetailsByFileId:
    "/api/v1/Payroll/GetClassificationDetailsByFileId",
  submitAndUpdateTempEmployeeInECR: "/api/v1/Payroll/ECRSubmitAndUpdate",
  addEmployeeToPayroll: "​/api​/v1​/Payroll​/AddEmployeeForPayroll​",
  deleteTempEmployeeId: "/api/v1/Payroll/DeleteTempEmployeeById",
  getFilesBasedOnSearch:
    "/api/v1/Payroll/GetUploadedFilesBasedOnSearchCriteria",
  getIraFilesBasedOnSearch:
    "/api/v1/Payroll/GetIRAUploadedFilesBasedOnSearchCriteria",
  getPayrollStatus: "/api/v1/Payroll/GetPayrollStatus",
  exportContributionInDepositHistory:
    "/api/v1/Payroll/ExportContributionInDepositHistory",
  exportLoanInDepositHistory:
    "/api/v1/Payroll/GetLoanRepaymentInformationExport",
  geFileInformationById: "/api/v1/Payroll/GetFileInformation",
  getEmployeeMissingRecords: "/api/v1/Payroll/GetEmployeeMissingRecords",
  getFileGraphInformation: "/api/v1/Payroll/FileProgressGraphInformation",
  getPayrollMetaDataInfo: "/api/v1/Payroll/GetPayrollMetaDataInformation",
  getPayrollEmployeeDetails: "/api/v1/Payroll/GetPayrollDetails",
  retrievePayrollDetailsByFileId:
    "/api/v1/Payroll/RetrievePayrollDetailsByFileId",
  getFundingDetailsByFile: "/api/v1/Payroll/GetFundingDetailsByFile",
  getFundingDetailsByClassification:
    "/api/v1/Payroll/GetFundingDetailsByClassification",
  getFundingDetailByPlan: "/api/v1/Payroll/GetFundingDetailByPlan",
  getMepPepFundingDetailByPlan: "/api/v1/Payroll/GetMepPepFundingDetailByPlan",
  getMepPepMasterFundingDetailByFileId:
    "/api/v1/Payroll/GetMepPepMasterFundingDetailByFileId",
  getForfeitureDetailsByFileId: "/api/v1/Payroll/GetForfeitureDetailsByFileId",
  getFundingDetailByDivision: "/api/v1/Payroll/GetFundingDetailByDivision",
  getFundingTransactionDetailsByClassification:
    "/api/v1/Payroll/GetFundingTransactionDetailsByClassification",
  getCustodianBankDetails: "/api/v1/Payroll/GetCustodianBankDetails",
  getFundingTransactionDetailsOfEmployeeInPayrollSubmissionPage:
    "/api/v1/Payroll/GetFundingTransactionDetailsOfEmployeeInPayrollSubmissionPage",
  getForfeitureDetails: "/api/v1/Payroll/GetForfeitureDetails",
  recordLock: "/api/v1/Payroll/RecordLock",
  getSourceDeferral: "/api/v1/Payroll/GetSourceDeferral",
  getAllEmployeeLoans: "/api/v1/Payroll/GetAllEmployeeLoans",
  acceptAllWarningsInaFile: "/api/v1/Payroll/AcceptAllWarningsInaFile",
  acceptWarningsByMessage: "/api/v1/Payroll/AcceptWarningsById",
  createPayroll: "/api/v1/Payroll/CreatePayroll",
  GetErrorList: "/api/v1/payroll/ErrorList",
  GetWarningsList: "/api/v1/payroll/WarningsList",
  getAllRecordsList: "/api/v1/payroll/GetAllRecordsList",
  getTempEmployeeDetailsByssn:
    "​/api​/v1​/Payroll​/GetPayrollInformationBySSN​",
  getTempEmployeeDetailsById: "/api/v1/payroll/TempEmployeeDetailsById​",
  getFileInformationById: "/api/v1/Payroll/GetFileInformation",
  getDataTypeMisMatches: "/api/v1/Payroll/GetDataTypeMisMatchErrors",
  getDuplicateEmployeeByFileId: "/api/v1/Payroll/GetDuplicateEmployeeSSN",
  getDuplicateRecord: "/api/v1/Payroll/GetDuplicateRecordDetails",
  getCorrectAcceptDuplicateEmployee:
    "/api/v1/Payroll/CorrectAcceptDuplicateEmployee",
  getFilesBySearchCriteria: "/api/v1/Payroll/GetFilesBySearchCriteria",
  getFundingTransactionDetailsByPlan:
    "/api/v1/Payroll/GetFundingTransactionDetailsByPlan",
  retrieveBankDetails: "/api/v1/Payroll/RetreiveBankDetails",
  getEmployeeDetailsbycompanyandplan:
    "/api/v1/Payroll/GetEmployeeByCompanyName",
  removeEmployeeFromPayroll:
    "/api/v1/Payroll/DeleteTempEmployeeDuringCreatePayroll",
  getTempEmployeeDetails: "/api/v1/Payroll/GetTempEmployeeDetailsById",
  getEmpCensusInformation: "/api/v1/Payroll/GetEmployeeCensusInformation",
  recordUnlock: "/api/v1/Payroll/RecordUnlock",
  errorAndWarningMetadata: "/api/v1/Payroll/GetErrorAndWarningMetadata",
  getDeletedEmployeeDetails: "/api/v1/Payroll/GetDeletedEmployeeDetailsById",
  payrollAndCensusFileUpload: "/api/v1/Payroll/PayrollAndCensusFileUpload",
  iraFileUpload: "/api/v1/Payroll/IRAFileUpload",
  TempMappingFileUpload: "/api/v1/Payroll/TempMappingFileUpload",
  deleteFileById: "/api/v1/Payroll/DeleteFileById",
  deleteCensusFileById: "/api/v1/Payroll/DeleteCensusFileById",
  getWarningsForECR: "/api/v1/Payroll/WarningsList",
  getRevalidateFile: "/api/v1/Payroll/RevalidateFile",
  checkClassificationTypePresent: "/api/v1/Payroll/ClassificationTypeExists",
  GetTempCreatePayroll: "/api/v1/Payroll/GetTempCreatePayroll",
  getCompanyPlanPayrollFrequencies:
    "/api/v1/Payroll/GetCompanyPlanPayrollFrequencies",
  createPayrollFromUI: "/api/v1/Payroll/CreatePayrollFromUI",
  getPayrollEmployeesSSNAndNameByFileId:
    "/api/v1/Payroll/GetPayrollEmployeesSSNAndNameByFileId",
  getCreatePayrollInformationByFileId:
    "/api/v1/Payroll/GetCreatePayrollInformationByFileId",
  getEmployerSources: "/api/v1/Payroll/GetEmployerSources",
  getComputationalPeriods: "/api/v1/Payroll/GetComputationalPeriods",
  downloadCreatePayrolldetail: "/api/v1/Payroll/downloadCreatePayrolldetail",
  submitCreatePayroll: "/api/v1/Payroll/submitCreatePayroll",
  addEmployeesForCreatePayroll: "/api/v1/Payroll/AddEmployeesForCreatePayroll",
  UpdatePayrollEmployee: "/api/v1/Payroll/UpdatePayrollEmployee",
  acceptAllDataChangeValidationInaFile:
    "/api/v1/Payroll/AcceptDataChangeValidationInaFile",
  acceptEmployeeWarnings: "/api/v1/Payroll/AcceptEmployeeWarnings",
  saveEligibilityInformation: "/api/v1/Payroll/SaveEligibilityInformation",
  getDownloadUploadedFileReport: "/api/v1/Payroll/DownloadUploadedFile",
  getDownloadSubmittedFileReport: "/api/v1/Payroll/DownloadSubmittedFile",
  getRecordDetailsInGetWarningScreen:
    "/api/v1/Payroll/GetRecordDetailsInGetWarningScreen",
  getFileUploadCount: "/api/v1/Payroll/GetFileUploadCount",
  getIRAFileUploadCount: "/api/v1/Payroll/GetIRAFileUploadCount",
  getForfeitureSummaryDetails: "/api/v1/Payroll/GetForfeitureSummaryDetails",
  getForfeitureSourceHistoryTransactions:
    "/api/v1/Payroll/GetSourceHistoryDetails",
  getCountsForErrorReportTabs: "/api/v1/Payroll/GetCountsForErrorReportTab",
  AddBeneficary: "/api/v1/Payroll/AddBeneficary",
  getDownloadPayrollReport: "/api/v1/Payroll/ExportPayrollSummaryReport",
  getEmployeeCount: "/api/v1/Payroll/GetEmployeeCount",
  getParticipantAccountBalanceByPlan:
    "/api/v1/Trade/GetParticipantAccountBalanceByPlan",
  downloadCompensationReport: "/api/v1/Payroll/GetEmployeeCompensationExport",
  getEmployeeContributionAndCompensation:
    "api/v1/Payroll/GetEmployeeContributionAndCompensation",
  getEmployeeListByFilter: "api/v1/Payroll/GetEmployeeListByFilter",
  getPayrollFrequencyBasedOnFileUploadId:
    "api/v1/Payroll/GetPayrollFrequencyBasedOnFileUploadId",
  getEmployeeIdBasedOnFileUploadId:
    "api/v1/Payroll/GetEmployeeIdBasedOnFileUploadId",
  OutputFileRegenerate: "api/v1/Payroll/OutputFileRegenerate",
  addNotes: "api/v1/Payroll/AddNotes",
  getNotes: "api/v1/Payroll/GetNotes",
  getMapperTemplateFile: "/api/v1/Payroll/GetMapperTemplateFile",
  clearDataForCreateOrGenerateUpload:
    "/api/v1/Payroll/ClearDataForCreateOrGenerateUpload",
  getFileErrorLogDetails: "/api/v1/Payroll/GetFileErrorLogDetails",
  getIRAAccountByIRANumber: "/api/v1/Payroll/GetIRAAccountByIRANumber",
  getFileLockInfo: "/api/v1/Payroll/GetFileLockInfo",
  updateFileLockInformation: "/api/v1/Payroll/UpdateFileLockInformation",
  getDisabledErrorLogIdForUser: "/api/v1/Payroll/GetDisabledErrorLogIdForUser",
  getAllErrorAndWarningRecordsList:
    "/api/v1/payroll/GetAllErrorAndWarningContribution",
  getToleranceValidationMessage:
    "/api/v1/payroll/GetToleranceValidationMessage",
  getPayrollFrequencyConfiguration:
    "/api/v1/Payroll/GetPayrollFrequencyConfiguration",
  getFrequencyByPlanId: "/api/v1/Payroll/GetPayrollFrequencyById",
  getPayrollConfigurations: "/api/v1/Payroll/GetPayrollConfigurations",
  getEmployeesTempLoanDetailsForPayroll: "/api/v1/Payroll/GetTempPayrollLoans",
  SaveTempPayrollLoans: "/api/v1/Payroll/SaveTempPayrollLoans",
};
export const census = {
  getEmployeeClassificationHistory:
    "/api/v1/Payroll/GetEmployeeclassificatonHistory",
  getEmployeeCompensation: "/api/v1/Payroll/GetEmployeeCompensation",
  getSourceLevelContribution: "/api/v1/Payroll/GetSourceLevelContribution",
  getSourceDeferral: "/api/v1/Payroll/GetSourceDeferral",
  getAllEmployeeLoans: "/api/v1/Payroll/GetAllEmployeeLoans",
  getEnrolledPlans: "/api/v1/Payroll/GetEnrolledPlans",
  getIRAEnrolledPlans: "/api/v1/Payroll/GetIRAEnrolledPlans",
  getEligibilityInformation: "/api/v1/Payroll/GetEligibilityInformation",
  getEligibilitySummaryReport: "/api/v1/Eligibility/EligibilitySummaryReport",
  downloadEligibilitySummaryReport:
    "/api/v1/Payroll/DownloadEligibilitySummaryReport",
  getEligibilityDetailReport: "/api/v1/Eligibility/EligibilityDetailReport",
  downloadEligibilityDetailReport:
    "/api/v1/Payroll/DownloadEligibilityDetailReport",
  getMaritalStatuses: "/api/v1/Payroll/GetMaritalStatuses",
  getEligibilityHistory: "/api/v1/Payroll/GetEligibilityHistory",
  getAdditionAddressByIRANumber:
    "/api/v1/Payroll/GetAdditionalAddressByIRANumber",
  getEmployeesBySearchCriteria: "/api/v1/Payroll/GetEmployeesBySearchCriteria",
  getIraEmployeesBySearchCriteria:
    "/api/v1/Payroll/GetIRAEmployeesBySearchCriteria",
  addEmployeeContribution: "/api/v1/Payroll/AddEmployeeContribution",
  addEmployeeCompensation: "/api/v1/Payroll/AddEmployeeCompensation",
  addHoursDetail: "/api/v1/Payroll/AddHoursDetail",
  getEmployeeContribution: "/api/v1/Payroll/GetEmployeeContribution2",
  getCensusHistory: "/api/v1/Payroll/GetEmployeeHistoryDetails",
  deleteExistingEmployee: "/api/v1/Payroll/DeleteExistingEmployeeById",
  getEmployeeLoanRepayments: "/api/v1/Payroll/GetLoanRepaymentInformation",
  getPlanMetaData: "/api/v1/Payroll/GetPlanMetaData",
  getHoursDetails: "/api/v1/Payroll/GetHoursDetail",
  saveEmployeeToPayroll: "/api/v1/Payroll/SaveEmployee",
  updateEmployeeToPayroll: "/api/v1/Payroll/UpdateExistingEmployee",
  updateEmployeeHPIDetails: "/api/v1/Payroll/UpdateEmployeeHPIDetails",
  getEmployee: "/api/v1/Payroll/GetEmployee",
  getIraEmployee: "/api/v1/Payroll/GetIRAEmployee",
  getClassificationDetailsByFileId:
    "/api/v1/Payroll/GetClassificationDetailsByFileId",
  getEmployeeClassificationType: "/api/v1/company/classificationType",
  getEmployeeClassificationName: "/api/v1/company/getClassifications",
  getEmployeeRehireDetails: "/api/v1/Payroll/GetEmployeeRehireDetails",
  getEmployeePlanSources: "/api/v1/Plan/SourceList",
  getEmploymentStatusList: "/api/v1/Company/GetEmploymentStatusList",
  getPayrollFrequencies: "/api/v1/Payroll/GetPayrollFrequencies",
  getCountiesList: "/api/v1/Country",
  getStatesList: "/api/v1/State",
  uploadEmployeeLogo: "/api/v1/Payroll/UploadEmployeeLogo",
  getEmployeeImage: "/api/v1/Payroll/GetEmployeeLogo",
  getBeneficiaryDetailsByEmployeeId:
    "/api/v1/Payroll/GetBeneficiaryDetailsByEmployeeId",
  getBeneficiaryDetailsById: "/api/v1/Payroll/GetBeneficiaryDetailsById",
  convertAlternatePayeeToNPE: "/api/v1/Payroll/ConvertAlternatePayeeToNPE",
  getAlternatePayeesByEmployeeId:
    "/api/v1/AlternatePayee/GetAlternatePayeesByEmployeeId",
  saveAlternatePayee: "/api/v1/AlternatePayee/SaveAlternatePayee",
  getPlanDetailsByEmployeeId: "/api/v1/Payroll/GetPlanDetailsByEmployeeId",
  getPlansForRebalanceRequestForEmployeeId:
    "/api/v1/Payroll/GetPlansForRebalanceRequestForEmployeeId",
  getSourceAndInvestmentDetailsAgainstSourceByPlanId:
    "/api/RolloverIn/GetSourceAndInvestmentDetailsAgaintSourceByPlanId",
  editBeneficiaryPercentage: "/api/v1/Payroll/editBeneficiaryPercentage",
  getEligibleEmployerContribution:
    "/api/v1/Payroll/GetEligibleEmployerContribution",
  getEmployeeInvestmentsRor: "/api/v1/Trade/GetEmployeeInvestmentsRor",
  getEmployeePayPeriodCompensation:
    "/api/v1/Payroll/GetEmployeePayPeriodCompensation",
  GetCompanyAddress: "/api/v1/Company/GetCompanyAddress",
  generateDisclosure: "/api/v1/Disclosure/GenerateDisclouser",
  checkOptionalFields: "/api/v1/Payroll/CheckOptionalFields",
  sourceListForManualRun: "/api/v1/Plan/SourceListForManualRun",
  showQDROMenu: "/api/v1/Qdro/ShowQDROMenu",
};

export const qdro = {
  captureQdro: "/api/v1/Qdro/CaptureQDRO",
  updateQdro: "/api/v1/Qdro/UpdateQDRO",
  getQdroRecordId: "/api/v1/Qdro/GetQDRORecordId",
  showQdroMenu: "/api/v1/Qdro/ShowQDROMenu",
  getQdroDetailsByEmployeeId: "/api/v1/Qdro/GetQDRODetailsByEmployeeId",
  applyQdroTransactionFreezeForAdmin:
    "/api/v1/Qdro/ApplyQDROTransactionFreezeForAdmin",
  getQDROHistoryDetailsByRecordId:
    "/api/v1/Qdro/GetQDROHistoryDetailsByRecordId",
};
