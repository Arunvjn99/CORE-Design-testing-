import apiInstance from "../api";
import { fee } from "@/services/endpoints/fee";
import { invoice } from "@/services/endpoints/fee";
import fileApiInstance from "../fileApi";

export const SaveFeeCalculationDetails = (payload) => {
  return apiInstance().post(`${fee.saveFeeCalculationDetails}`, payload);
};

export const getFeeDetailsBySearchCriteria = (payload) => {
  return apiInstance().post(`${fee.getFeeDetailsBySearchCriteria}`, payload);
};

export const saveBasicFeeDetails = (payload) => {
  return apiInstance().post(`${fee.saveBasicFeeDetails}`, payload);
};

export const addFeeClassification = (payload) => {
  return apiInstance().post(`${fee.addFeeClassification}`, payload);
};

export const getFeeDetailsById = (feeId) => {
  return apiInstance().get(`${fee.getFeeDetailsById}/${feeId}`);
};

export const getFeeCalculationDetailsById = (feeId) => {
  return apiInstance().get(`${fee.getFeeCalculationDetailsById}/${feeId}`);
};

export const getFeeTransactionById = (feeTransactionId) => {
  return apiInstance().get(`${fee.getFeeTransactionById}/${feeTransactionId}`);
};

export const cancelTradeByFeeId = (feeId) => {
  return apiInstance().get(`${fee.cancelTradeByFeeId}/${feeId}`);
};

export const getFeeClassifications = () => {
  return apiInstance().get(`${fee.getFeeClassifications}`);
};

export const ValidateCreateSpecificationSlider = (payload) => {
  return apiInstance().post(
    `${fee.validateCreateSpecificationSlider}`,
    payload
  );
};

export const addSpecificationDetails = (payload) => {
  return apiInstance().post(`${fee.addSpecificationDetails}`, payload);
};

export const getFeeRunListingDetailsBySearchCriteria = (payload) => {
  return apiInstance().post(
    `${fee.getFeeRunListingDetailsBySearchCriteria}`,
    payload
  );
};
export const getParticipantFeeRunDetailsList = (planId, transactionId) => {
  return apiInstance().get(
    `${fee.getParticipantFeeRunDetailsList}/${planId}/${transactionId}`
  );
};

export const getSourceInvestmentFeeBreakUp = (
  planId,
  transactionId,
  participantId
) => {
  return apiInstance().get(
    `${fee.getSourceInvestmentLevelDetails}/${planId}/${transactionId}/${participantId}`
  );
};

export const getPlanLevelFeeRunDetails = (transactionId) => {
  return apiInstance().get(`${fee.getPlanLevelFeeRunDetails}/${transactionId}`);
};

export const getFeeRunDetailsByTransactionId = (transactionId) => {
  return apiInstance().get(
    `${fee.getFeeRunDetailsByTransactionId}/${transactionId}`
  );
};

export const downloadFeeTransactionListingReport = (payload) => {
  return fileApiInstance().post(
    fee.downloadFeeTransactionListingReport,
    payload
  );
};

export const downloadFeeTransactionSummaryReport = (payload) => {
  return fileApiInstance().post(
    fee.downloadFeeTransactionSummaryReport,
    payload
  );
};

export const getFeeSpecificationBasedOnSearchCriteria = (payload) => {
  return apiInstance().post(
    `${fee.getFeeSpecificationBasedOnSearchCriteria}`,
    payload
  );
};
export const getFeeSpecificationDetailsById = (payload) => {
  return apiInstance().get(`${fee.getFeeSpecificationDetailsById}/${payload}`);
};
export const GetFeeApplicableTo = (Id) => {
  return apiInstance().get(`${fee.getFeeApplicableTo}/${Id}`);
};
export const AddFeeApplicableTo = (payload) => {
  return apiInstance().post(`${fee.addFeeApplicableTo}`, payload);
};

export const GetFeeSchedule = (Id) => {
  return apiInstance().get(`${fee.getFeeSchedule}/${Id}`);
};
export const AddFeeSchedule = (payload) => {
  return apiInstance().post(`${fee.addFeeSchedule}`, payload);
};

export const getSourceAndInvestmentList = (payload) => {
  return apiInstance().get(`${fee.getSourceAndInvestmentList}/${payload}`);
};
export const getPlanListBasedOnFilter = (payload) => {
  return apiInstance().post(`${fee.getPlanListBasedOnFilter}`, payload);
};

export const getPlanGroupsForFee = (investmentId) => {
  return apiInstance().get(`${fee.getPlanGroupsForFee}/${investmentId}`);
};

export const getInvestmentForFee = (investmentId) => {
  return apiInstance().get(`${fee.getInvestmentForFee}/${investmentId}`);
};
export const getPlanLevelFeeCollectedDetailsAfterTrade = (payload) => {
  return apiInstance().post(
    `${fee.getPlanLevelFeeCollectedDetailsAfterTrade}`,
    payload
  );
};
// export const saveSummaryDetails = (payload) => {
//   return apiInstance().post(
//     `${fee.saveSummaryDetails}`,
//     payload
//   );
// };

export const saveSummaryDetails = (id) => {
  return apiInstance().get(`${fee.saveSummaryDetails}/${id}`);
};

export const getFeeSummaryDetailsById = (payload) => {
  return apiInstance().get(`${fee.getFeeSummaryDetailsById}/${payload}`);
};

export const deleteFeeById = (id) => {
  return apiInstance().delete(`${fee.deleteFeeById}/${id}`);
};

export const downloadSponsorFeeListingReport = (payload) => {
  return fileApiInstance().post(fee.downloadSponsorFeeListingReport, payload);
};

export const getSponsorFeeRunDetailsById = (payload) => {
  return apiInstance().get(`${fee.getSponsorFeeRunDetailsById}/${payload}`);
};

export const addFeeWaiveOff = (payload) => {
  return apiInstance().post(`${fee.addFeeWaiveOff}`, payload);
};

export const addFeePaymentStatus = (payload) => {
  return apiInstance().post(`${fee.addFeePaymentStatus}`, payload);
};

export const getTransactionKeyForForfeiture = (
  parentTransactionId,
  planId,
  transactionId
) => {
  return apiInstance().get(
    `${fee.getTransactionKeyForForfeiture}/${parentTransactionId}/${planId}/${transactionId}`
  );
};

export const getFeeInvoiceListingDetailsBySearchCriteria = (payload) => {
  return apiInstance().post(
    `${invoice.getFeeInvoiceListingDetailsBySearchCriteria}`,
    payload
  );
};

export const downloadFeeInvoiceListingReport = (payload) => {
  return fileApiInstance().post(
    invoice.downloadFeeInvoiceListingReport,
    payload
  );
};

export const addNotesInvoice = (payload) => {
  return apiInstance().post(`${invoice.addNotesInvoice}`, payload);
};

export const getFeeInvoiceUrlWithId = (payload) => {
  return apiInstance().get(`${invoice.getFeeInvoiceUrlWithId}/${payload}`);
};

export const addInvoiceFeePayment = (payload) => {
  return apiInstance().post(`${invoice.addInvoiceFeePayment}`, payload);
};

export const getFeeTransactionList = (payload) => {
  return apiInstance().post(`${fee.getFeeTransactionList}`, payload);
};

export const saveBulkUploadDocument = (payload) => {
  return apiInstance().post(`${invoice.saveBulkUploadDocument}`, payload);
};

export const getInvoiceBulkUploadListingDetailsBySearchCriteria = (payload) => {
  return apiInstance().post(
    `${invoice.getInvoiceBulkUploadListingDetailsBySearchCriteria}`,
    payload
  );
};

export const getInvoiceBulkUploadFileDetails = (payload) => {
  return apiInstance().post(
    `${invoice.getInvoiceBulkUploadFileDetails}`,
    payload
  );
};

export const downloadInvoiceBulkUploadListingReport = (payload) => {
  return fileApiInstance().post(
    invoice.downloadInvoiceBulkUploadListingReport,
    payload
  );
};

export const getDefaultPayees = () => {
  return apiInstance().get(`${fee.getDefaultPayee}`);
};

export const GetApplicableFeesForDefaultPayees = (payeeId) => {
  return apiInstance().get(
    `${fee.getApplicableFeesForDefaultPayee}?payeeId=${payeeId}`
  );
};

export const upsertDefaultPayee = (payload) => {
  return apiInstance().post(`${fee.upsertDefaultPayee}`, payload);
};
