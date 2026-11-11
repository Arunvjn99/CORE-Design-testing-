import apiInstance from "../api";
import { trade } from "@/services/endpoints/trade";
import fileApiInstance from "../fileApi";

export const addMasterInvestment = (payload) => {
  return apiInstance().post(trade.addMasterInvestment, payload);
};

export const getAccrualReportExportBySearchCriteria = (payload) => {
  return apiInstance().post(
    trade.getAccrualReportExportBySearchCriteria,
    payload
  );
};

export const getAccrualOrPriceHistory = (payload) => {
  return apiInstance().post(trade.getAccrualOrPriceHistory, payload);
};

export const getMasterInvestmentBySearchCriteria = (payload) => {
  return apiInstance().post(trade.getMasterInvestmentBySearchCriteria, payload);
};

export const downloadInvestmentTemplateReportByTemplateId = (payload) => {
  return fileApiInstance().post(
    trade.downloadInvestmentTemplateReportByTemplateId,
    payload,
    {
      responseType: "blob",
    }
  );
};

export const investmentBulkUpload = (payload) => {
  return apiInstance().post(trade.investmentBulkUpload, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const downloadInvestmentErrorReport = (
  fileUploadId,
  templateType,
  offsetMinutes
) => {
  return fileApiInstance().get(
    `${trade.downloadInvestmentErrorReport}/${templateType}/${fileUploadId}`,
    {
      responseType: "blob",
      params: {
        timeZoneOffset: offsetMinutes,
      },
    }
  );
};

export const getTotalInvestmentBySearchCriteria = (payload) => {
  return apiInstance().post(trade.getTotalInvestmentBySearchCriteria, payload);
};

export const getAllMasterInvestment = () => {
  return apiInstance().get(`${trade.getAllMasterInvestment}`);
};

export const getInvestmentByFilters = (payload) => {
  return apiInstance().post(trade.getInvestmentByFilters, payload);
};

export const getFileDetailsBySearchCriteria = (payload) => {
  return apiInstance().post(trade.getFileDetailsBySearchCriteria, payload);
};

export const getFileManageCount = (payload) => {
  return apiInstance().post(trade.getFileManageCount, payload);
};

export const getErrorDetailsById = (id) => {
  return apiInstance().get(`${trade.getErrorDetailsById}/${id}`);
};

export const getInvestmentTypeForFund = () => {
  return apiInstance().get(`${trade.getInvestmentTypeForFund}`);
};

export const getCompetingFunds = (payload) => {
  return apiInstance().get(`${trade.getCompetingFunds}/${payload}`);
};

export const getApplicableInvestments = () => {
  return apiInstance().get(`${trade.getApplicableInvestments}`);
};

export const getInvestment = (id) => {
  return apiInstance().get(`${trade.getInvestment}/${id}`);
};

export const deleteMasterInvestmentById = (investmentId) => {
  return apiInstance().delete(
    `${trade.deleteMasterInvestmentById}/${investmentId}`
  );
};

export const getInvestmentType = () => {
  return apiInstance().get(`${trade.getInvestmentType}`);
};

export const getInvestmentCategory = () => {
  return apiInstance().get(`${trade.getInvestmentCategory}`);
};

export const addInvestmentType = (payload) => {
  return apiInstance().post(trade.addInvestmentType, payload);
};

export const addInvestmentCategory = (payload) => {
  return apiInstance().post(trade.addInvestmentCategory, payload);
};
export const downloadFileManagerReport = (payload) => {
  return fileApiInstance().post(`${trade.downloadFileManagerReport}`, payload);
};
export const downloadTradeFile = (fileName, isInvestmentPerformance) => {
  return fileApiInstance().get(`${trade.downloadTradeFile}/${fileName}`, {
    responseType: "blob",
    params: { isInvestmentPerformance },
  });
};
export const getInvestmentAssetByPlanTillDate = (payload) => {
  return apiInstance().get(
    `${trade.getInvestmentAssetByPlanTillDate}/${payload.planId}/${payload.cusip}/${payload.toDate}`
  );
};
export const GetTradeTransactionView = (payload) => {
  return apiInstance().post(trade.getTradeTransactionView, payload);
};
export const GetTradeTransactionViewDetails = (payload) => {
  return apiInstance().post(trade.getTradeTransactionViewDetails, payload);
};
export const getPlanListFromInvestment = (investmentId) => {
  return apiInstance().get(
    `${trade.getPlanListFromInvestment}/${investmentId}`
  );
};
export const GetInvestmentView = (payload) => {
  return apiInstance().post(trade.getInvestmentView, payload);
};
export const GetTradeOrderFileInstruction = (payload) => {
  return apiInstance().post(trade.getTradeOrderFileInstruction, payload);
};
export const GetTradeOrderFileInstructionById = (payload) => {
  return apiInstance().post(
    `${trade.getTradeOrderFileInstructionById}/${payload}`
  );
};
export const GetTradeOrderInstruction = (payload) => {
  return apiInstance().post(trade.getTradeOrderInstruction, payload);
};
export const GetTradeOrderInvestmentInstruction = (payload) => {
  return apiInstance().post(trade.getTradeOrderInvestmentInstruction, payload);
};
export const getTransactionStatusOnCancel = (id) => {
  return apiInstance().get(
    `${trade.getTransactionStatusOnCancel}?transactionId=${id}`
  );
};
export const getPricefeedsByCusip = (payload) => {
  return apiInstance().post(trade.getPricefeedsByCusip, payload);
};

export const getAllChartOfAccountsByPlan = (payload) => {
  return apiInstance().post(trade.getAllChartOfAccountsByPlan, payload);
};

export const getLedgerEntryById = (payload) => {
  return apiInstance().post(trade.getLedgerEntryById, payload);
};

export const getFundMergerEmployeeDetailsTransactionView = (payload) => {
  return apiInstance().post(
    trade.getFundMergerEmployeeDetailsTransactionView,
    payload
  );
};

export const getPriceListingDetailsBySearchCriteria = (payload) => {
  return apiInstance().post(
    trade.getPriceListingDetailsBySearchCriteria,
    payload
  );
};

export const saveTradeRegenerate = (payload) => {
  return apiInstance().post(trade.tradeRegenerate, payload);
};

export const checkTradeAlreadyRegenerated = (orderNumber) => {
  return apiInstance().get(
    `${trade.checkTradeAlreadyRegenerated}/${orderNumber}`
  );
};

export const savePriceFeed = (payload) => {
  return apiInstance().post(trade.savePriceFeed, payload);
};

export const getPlanForfeitureBalances = (payload) => {
  return apiInstance().get(
    `${trade.getPlanForfeitureBalances}/${payload.planId}/${payload.custodianId}`
  );
};

export const getAllCompetingFund = (payload) => {
  return apiInstance().post(trade.getAllCompetingFund, payload);
};

export const calculateRedemptionFee = (payload) => {
  return apiInstance().post(trade.calculateRedemptionFee, payload);
};

export const getMasterInvestmentDataList = (payload) => {
  return apiInstance().post(trade.getMasterInvestmentDataList, payload);
};
export const addNotesTrade = (payload) => {
  return apiInstance().post(trade.addNotes, payload);
};

export const addCashReconNotes = (payload) => {
  return apiInstance().post(trade.addCashReconNotes, payload);
};

export const cashReconcilationReport = () => {
  return fileApiInstance().get(`${trade.cashReconcilation}`);
};
export const getTradeReconcilationBySearchCriteria = (payload) => {
  return apiInstance().post(
    trade.getTradeReconcilationBySearchCriteria,
    payload
  );
};
export const checkIFInvestmentCanBeClosed = (payload) => {
  return apiInstance().get(
    `${trade.checkIFInvestmentCanBeClosed}/${payload?.investmentId}?planId=${payload?.planId}&investmentStatus=${payload?.investmentStatus}`
  );
};
export const getAccrualRate = ({ CUSIP, fromDate, toDate, from, offset }) => {
  return apiInstance().get(
    `${trade.getAccrualRate}/${CUSIP}/${fromDate}/${toDate}/${from}/${offset}`
  );
};

export const downloadAccrualRateHistory = (payload) => {
  return fileApiInstance().post(trade.downloadAccrualRateHistory, payload);
};

export const getAccrualRateHistory = ({ CUSIP, fromDate, toDate, date }) => {
  return apiInstance().get(
    `${trade.getAccrualRateHistory}/${CUSIP}/${fromDate}/${toDate}/${date}`
  );
};
export const downloadTradeOrderFileInstruction = (payload) => {
  return fileApiInstance().post(
    trade.downloadTradeOrderFileInstruction,
    payload
  );
};
export const manualTradeConfirmation = (payload) => {
  return apiInstance().post(trade.manualTradeConfirmation, payload);
};
export const updateTransactionStatusForTradeCancellation = (transaction) => {
  return apiInstance().post(
    `${trade.updateTransactionStatusForTradeCancellation}?transactionType=${transaction.transactionType}&transactionKey=${transaction.transactionId}`
  );
};
export const updateTransactionStatusForTradeReinitiation = (transaction) => {
  return apiInstance().post(
    `${trade.updateTransactionStatusForTradeReinitiation}?transactionType=${transaction.transactionType}&transactionKey=${transaction.transactionId}`
  );
};
export const getNavPriceByCUSIP = (cusip) => {
  return apiInstance().get(`${trade.getNavPriceByCUSIP}/${cusip}`);
};
export const getSDBAccountDetails = (employeeId, planId) => {
  return apiInstance().get(
    `${trade.getSDBAccountDetails}/${employeeId}/${planId}`
  );
};
export const insertSdbAccountDetails = (payload) => {
  return apiInstance().post(trade.insertSdbAccountDetails, payload);
};
export const downloadTradeViewDetailsReport = (payload) => {
  return fileApiInstance().post(trade.downloadTradeViewDetailsReport, payload);
};

export const downloadTradeOrderDetailsReport = (payload) => {
  return fileApiInstance().post(trade.downloadTradeOrderDetailsReport, payload);
};
export const downloadInvestmentView = (payload) => {
  return fileApiInstance().post(trade.downloadInvestmentView, payload);
};

export const downloadTransactionView = (payload) => {
  return fileApiInstance().post(trade.downloadTransactionView, payload);
};
