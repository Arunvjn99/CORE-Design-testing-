export const ai = {
  getMappings: "/api/v1/AI/GetMappings",
  getTextToSql: "/api/v1/AI/GetTextToSql",
  lfg: "/ai/lfg",
  fidelity: "/ai/fidelity",
  charlesSchwab: "/ai/charlesSchwab",
  trustStatements: "/ai/trustStatements",
  withdrawal: "/Distribution/Upload",
};

export const documents = {
  getDocumentDeliveryPlanmap:
    "/api/v1/DocumentDelivery/GetDocumentDeliveryPlanMap",
  saveDocumentDeliveryEmployeeMap:
    "/api/v1/DocumentDelivery/SaveDocumentDeliveryEmployeeMap",
  getDocumentDeliveryEmployeeMap:
    "/api/v1/DocumentDelivery/GetDocumentDeliveryEmployeeMap",
  getDocuments: "/api/v1/Document/GetDocuments",
  downloadDocument: "/api/v1/Document/DownloadDocument",
  deleteDocumentsById: "/api/v1/Document/DeleteDocumentsById",
  addDocumentNotes: "/api/v1/Document/AddNotes",
  SaveManualUploadDocument: "/api/v1/Document/SaveManualUploadDocument",
  getDocumentTypes: "/api/v1/Document/GetDocumentTypes",
  AddMasterDocumentType: "/api/v1/Document/AddMasterDocumentType",
  getDocumentTypeDetails: "/api/v1/Document/GetDocumentTypeDetails",
  editDocumentRole: "/api/v1/Document/EditDocumentRole",
  retrieveDocument: "/api/v1/Document/RetrieveDocument",
};

export const modelPortfolioRebalance = {
  getCurrentHoldingsModelPortfolioRebalance:
    "api/v1/ModelPortfolioRebalance/GetCurrentHoldingsModelPortfolioRebalance",
  getAllModelPortfolioInvestments:
    "api/v1/ModelPortfolioRebalance/GetAllModelPortfolioInvestments",
  saveModelPortfolioRebalance:
    "api/v1/ModelPortfolioRebalance/SaveModelPortfolioRebalance",
  getModelPortfolioRebalanceTransactions:
    "api/v1/ModelPortfolioRebalance/GetModelPortfolioRebalanceTransactions",
  getModelPortfolioRebalanceHistoryDetailsById:
    "api/v1/ModelPortfolioRebalance/GetModelPortfolioRebalanceHistoryDetailsById",
  getEmployeeTransactionViewModelPortfolioRebalance:
    "api/v1/Trade/GetEmployeeTransactionViewModelPortfolioRebalance",
  getModelPortfolioRebalanceTransactionParticipantDetails:
    "/api/v1/Transfer/GetTransactionParticipantDetails",
  getModelPortfolioRebalanceSummary:
    "api/v1/ModelPortfolioRebalance/ModelPortfolioRebalanceSummary",
  exportModelPortfolioInvestments:
    "api/v1/ModelPortfolioRebalance/ExportModelPortfolioInvestments",
};

export const complianceTesting = {
  getYearEndProcessesCount:
    "/api/v1/ComplianceTesting/GetYearEndProcessesCount",
  getYearEndProcessList: "/api/v1/ComplianceTesting/GetYearEndProcessList",
  resultDocument: "api/v1/ComplianceTesting/ResultDocumentUpload",
  getResultDocument: "api/v1/ComplianceTesting/GetResultDocument",
  getPlanDetails: "api/v1/ComplianceTesting/GetPlanDetails",
  saveYearEndProcessDetails:
    "api/v1/ComplianceTesting/SaveYearEndProcessDetails",
  deleteResultDocument: "api/v1/ComplianceTesting/DeleteResultDocumentById",
  downloadResultDocument: "api/v1/ComplianceTesting/DownloadResultDocument",
  censusExtract: "/api/v1/ComplianceTesting/CensusExtract",
  form5500XMLGenerator: "/api/v1/ComplianceTesting/Form5500XMLGenerator",
  get5500FormType: "/api/v1/ComplianceTesting/Get5500FormType",
  get5500FormList: "/api/v1/ComplianceTesting/Get5500FormList",
  delete5500Form: "api/v1/ComplianceTesting/Delete5500Forms",
  getYearEndProcessBasedOnPlanId:
    "/api/v1/ComplianceTesting/GetYearEndProcessBasedOnPlanId",
  getLatestYearEndProcess: "/api/v1/ComplianceTesting/GetLatestYearEndProcess",
};

export const multiTenant = {
  getAllFontFamilies: "/api/v1/Tenant/GetAllFontFamilies",
  getTenantModules: "/api/v1/Tenant/GetTenantModules",
  getEnvironmentSetup: "/api/v1/Tenant/GetEnvironmentSetup",
  getTenantById: "/api/v1/Tenant/GetTenantById",
  getTenantListStatus: "/api/v1/Tenant/GetTenantListStatus",
  getTenantList: "/api/v1/Tenant/GetTenantList",
  saveTenantDetails: "/api/v1/Tenant/SaveTenantDetails",
  deleteTenantById: "/api/v1/Tenant/DeleteTenantById",
};

export const shareHolderServicingPayment = {
  getSSPListBySearchCriteria: "/api/v1/SSP/GetSSPListBySearchCriteria",
  saveAllocationDetails: "/api/v1/SSP/SaveAllocationDetails",
  getSSPDetailsById: "/api/v1/SSP/GetSSPDetailsById",
  saveBasicDetails: "/api/v1/SSP/SaveBasicDetails",
  getInvestmentListByPlanId: "/api/Investment/GetInvestmentListByPlanId",
  deleteSSPDetailsById: "/api/v1/SSP/DeleteSSPDetailsById",
  submitSSPRequestById: "/api/v1/SSP/SubmitSSPRequestById",
  getSSPTradeDetailsById: "/api/v1/SSP/GetSSPTradeDetailsById",
  downloadSSPListingReport: "/api/v1/SSP/DownloadSSPListingReport",
  getSSPHistoryDetailsById: "/api/v1/SSP/GetSSPHistoryDetailsById",
  getPlanListBasedOnSSPRestriction:
    "/api/v1/SSP/GetPlanListBasedOnSSPRestriction",
  getSSPTransactionsBySearchCriteria:
    "/api/v1/SSP/GetSSPTransactionsBySearchCriteria",
  getInvestmentListBasedonPlanId: "/api/v1/SSP/GetInvestmentListBasedonPlanId",
  getEmployeeDetailsList: "/api/v1/SSP/GetEmployeeDetailsList",
  getRestrictionPlanAndInvestment:
    "/api/v1/SSP/GetSSPRestrictionPlanAndInvestment",
};

export const inPlanRothConversion = {
  GetParticipantAccountBalanceByPlanForInPlanRoth:
    "/api/v1/InPlanRothConversion/GetParticipantAccountBalanceByPlanForInPlanRoth",
  SaveInPlanRothConversionRequest:
    "/api/v1/InPlanRothConversion/SaveInPlanRothConversionRequest",
  ApproveOrRejectInPlanRothRequest:
    "/api/v1/InPlanRothConversion/ApproveOrRejectInPlanRothRequest",
  GetInPlanRothConversionByEmployeeId:
    "/api/v1/InPlanRothConversion/GetInPlanRothConversionByEmployeeId",
  AddNotes: "/api/v1/InPlanRothConversion/AddNotes",
  GetStateTax: "/api/v1/InPlanRothConversion/GetStateTax",
  GetInPlanRothHistoryDetailsById:
    "/api/v1/InPlanRothConversion/GetInPlanRothHistoryDetailsById",
  GetInPlanRothDetails: "/api/v1/InPlanRothConversion/GetInPlanRothDetails",
  GetInPlanRothTransactionsBySearchCriteria:
    "/api/v1/InPlanRothConversion/getInPlanRothTransactionsBySearchCriteria",
};

export const paymentRequest = {
  UpdatePaymentRequestCancel: "api/PaymentService/CancelPaymentRequest",
};
