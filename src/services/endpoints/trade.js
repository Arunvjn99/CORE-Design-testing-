export const trade = {
  getPricefeedsByCusip: "/api/v1/Trade/GetPricefeedsByCusip",
  getAccrualReportExportBySearchCriteria:
    "/api/v1/Trade/GetAccrualReportExportBySearchCriteria",
  getAccrualOrPriceHistory: "api/v1/Accrual/GetAccrualOrPriceHistory",
  addMasterInvestment: "/api/v1/Investment/AddMasterInvestment",
  getCompetingFundBasedOnInvestmentId:
    "api/v1/Investment/GetCompetingFundBasedonInvestmentId",
  getMasterInvestmentBySearchCriteria:
    "/api/v1/Investment/GetMasterInvestmentBySearchCriteria",
  getTotalInvestmentBySearchCriteria:
    "/api/v1/Investment/GetTotalInvestmentBySearchCriteria",
  getCompetingFunds: "/api/v1/Investment/GetCompetingFunds",
  getApplicableInvestments: "/api/v1/Investment/GetApplicableInvestments",
  getInvestment: "/api/v1/Investment/GetInvestment",
  getAdvisorRepresentativesByPlanId:
    "/api/Advisor/GetAdvisorRepresentativesByPlanId",
  deleteMasterInvestmentById: "/api/v1/Investment/DeleteMasterInvestmentById",
  getInvestmentType: "/api/v1/Tenant/GetMasterInvestmentType",
  getInvestmentCategory: "/api/v1/Tenant/GetMasterInvestmentCategory",
  addInvestmentType: "/api/v1/Tenant/AddMasterInvestmentType",
  addInvestmentCategory: "/api/v1/Tenant/AddMasterInvestmentCategory",
  getAllMasterInvestment: "/api/v1/Investment/GetAllMasterInvestment",
  getInvestmentByFilters: "/api/v1/Investment/GetInvestmentByFilters",
  getInvestmentTypeForFund: "/api/v1/Investment/GetInvestmentType",
  getAllMasterInvestment: "/api/v1/Investment/GetAllMasterInvestment",
  getInvestmentByFilters: "/api/v1/Investment/GetInvestmentByFilters",
  getInvestmentTypeForFund: "/api/v1/Investment/GetInvestmentType",
  getFileDetailsBySearchCriteria: "/api/v1/FileManager/GetFileManagerData",
  getFileManageCount: "/api/v1/FileManager/GetFileManagerCount",
  downloadFileManagerReport: "/api/v1/FileManager/DownloadFileManagerDetails",
  downloadTradeFile: "/api/v1/FileManager/DownloadTradeFile",
  getErrorDetailsById: "/api/v1/FileManager/GetErrorDetailsById",
  getInvestmentAssetByPlanTillDate:
    "/api/v1/InvestmentAsset/getInvestmentAssetByPlanTillDate",
  getTradeTransactionView: "/api/v1/Trade/GetTradeTransactionView",
  getTradeTransactionViewDetails: "/api/v1/Trade/GetTransactionDetailsView",
  getPlanListFromInvestment: "/api/v1/Investment/GetPlanListFromInvestment",
  getInvestmentView: "/api/v1/Trade/GetInvestmentView",
  getTradeOrderFileInstruction: "/api/v1/Trade/GetTradeOrderFileInstruction",
  getTradeOrderFileInstructionById:
    "/api/v1/Trade/GetTradeOrderFileInstructionById",
  getTradeOrderInstruction: "/api/v1/Trade/GetTradeOrderInstruction",
  getTradeOrderInvestmentInstruction:
    "/api/v1/Trade/GetTradeOrderInvestmentInstruction",
  getTransactionStatusOnCancel: "/api/v1/Trade/UpdateTradeStatusOnCancel",
  getAllChartOfAccountsByPlan: "/api/v1/Trade/GetAllChartOfAccountsByPlan",
  getLedgerEntryById: "/api/v1/Trade/GetLedgerEntryById",
  getFundMergerEmployeeDetailsTransactionView:
    "/api/v1/Trade/GetFundMergerEmployeeDetailsTransactionView",
  getPriceListingDetailsBySearchCriteria:
    "/api/v1/Trade/GetPriceListingDetailsBySearchCriteria",
  tradeRegenerate: "/api/v1/Trade/TradeRegenerate",
  checkTradeAlreadyRegenerated: "/api/v1/Trade/CheckTradeAlreadyRegenerated",
  savePriceFeed: "/api/v1/Trade/SavePriceFeed",
  getPlanForfeitureBalances: "/api/v1/Transaction/GetPlanForfeitureBalances",
  getAllCompetingFund: "/api/v1/Investment/GetAllCompetingFund",
  calculateRedemptionFee: "/api/v1/Transaction/CalculateRedemptionFee",
  getMasterInvestmentDataList: "/api/v1/Plan/GetMasterInvestmentDataList",
  addNotes: "/api/v1/Transaction/AddNotes",
  getTradeReconcilationBySearchCriteria:
    "api/v1/CashReconcilation/GetTradeReconcilationBySearchCriteria",
  cashReconcilation: "api/v1/CashReconcilation/ExportTradeReconcilation",
  checkIFInvestmentCanBeClosed:
    "/api/v1/Investment/CheckIFInvestmentCanBeClosed",
  addCashReconNotes: "/api/v1/Transaction/AddCashReconNotes",
  downloadTradeOrderFileInstruction:
    "/api/v1/Trade/DownloadTradeOrderFileInstruction",
  manualTradeConfirmation: "/api/v1/Trade/ManualTradeConfirmation",
  getNavPriceByCUSIP: "/api/v1/Trade/GetNavPriceByCUSIP",
  updateTransactionStatusForTradeCancellation:
    "/api/v1/Trade/UpdateTransactionStatusForTradeCancellation",
  updateTransactionStatusForTradeReinitiation:
    "/api/v1/Trade/UpdateTransactionStatusForTradeReinitiation",
  getAccrualRate: "/api/v1/Accrual/GetAccrualRate",
  downloadAccrualRateHistory: "/api/v1/Accrual/DownloadAccrualRateHistory",
  getAccrualRateHistory: "/api/v1/Accrual/GetAccrualRateHistory",
  tradeOutboundFileGeneration:
    "/api/v1/TradeOutboundFileGeneration/GenerateFile",
  downloadInvestmentTemplateReportByTemplateId:
    "/api/v1/Investment/DownloadInvestmentTemplateReportByTemplateId",
  investmentBulkUpload: "/api/v1/Investment/InvestmentBulkUpload",
  downloadInvestmentErrorReport:
    "/api/v1/Investment/DownloadInvestmentErrorReport",
  getSDBAccountDetails: "/api/v1/Transaction/GetSDBAccountDetails",
  insertSdbAccountDetails: "/api/v1/Transaction/InsertSdbAccountDetails",
  downloadTradeViewDetailsReport:
    "/api/v1/Trade/DownloadTradeViewDetailsReport",
  downloadTradeOrderDetailsReport:
    "/api/v1/Trade/DownloadTradeOrderDetailsReport",
  downloadInvestmentView: "/api/v1/Trade/DownloadInvestmentView",
  downloadTransactionView: "/api/v1/Trade/DownloadTradeTransactionViewReport",
};

export const rkaas = {
  getBalances: "/api/RKAAS/GetAccountBalance",
  getBalanceSheet: "/api/RKAAS/BalanceSheet",
  getTrailBalance: "/api/RKAAS/TrailBalance",
  getLedgers: "/api/RKAAS/Ledger",
  getChartOfAccount: "api/v1/Trade/GetChartOfAccount",
  getBusinessEvent: "api/v1/Trade/GetBusinessEvent",
  getLedgerEntries: "api/v1/Trade/GetLedgerEntries",
  getRkaasEntries: "api/v1/Trade/GetRkaasEntries",
  getTradeOrderInvestmentView: "api/v1/Trade/GetTradeOrderInvestmentView",
  getParticipantStatement: "/api/v1/Trade/GetParticipantStatement",
  getContributionStatement: "/api/v1/Trade/GetContributionStatement",
  getParticipantInvestmentStatement:
    "/api/v1/Trade/GetParticpantInvestmentStatement",
  getParticipantLevelSourceReport:
    "/api/v1/Trade/GetParticipantLevelSourceReport",
  getParticipantInvestmentUnitStatement:
    "/api/v1/Trade/GetParticpantInvestmentUnitStatement",
  getJournalEntries: "/api/v1/Trade/GetJournalEntriesByParticipant",
};
