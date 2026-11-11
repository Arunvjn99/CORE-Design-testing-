import apiInstance from "../api";
import { adjustments } from "@/services/endpoints/adjustments";
import fileApiInstance from "../fileApi";

export const saveBasicAdjustmentDetails = (payload) => {
  return apiInstance().post(
    `${adjustments.saveBasicAdjustmentDetails}`,
    payload
  );
};
export const saveAdjustmentDetails = (payload) => {
  return apiInstance().post(`${adjustments.saveAdjustmentDetails}`, payload);
};

export const downloadFeeReversalData = (payload) => {
  return fileApiInstance().post(
    `${adjustments.downloadFeeReversalData}`,
    payload
  );
};
export const downloadFeeReversalEmployeeSummary = (payload) => {
  return fileApiInstance().post(
    `${adjustments.downloadFeeReversalEmployeeSummary}`,
    payload
  );
};
export const getFeeReversalSummaryDetails = (payload) => {
  return apiInstance().post(
    `${adjustments.getFeeReversalSummaryDetails}`,
    payload
  );
};
export const getFeeReversalSummaryEmployeeDetails = (payload) => {
  return apiInstance().post(
    `${adjustments.getFeeReversalSummaryEmployeeDetails}`,
    payload
  );
};
export const getAdjustmentDetailsById = (adjustmentId) => {
  return apiInstance().get(
    `${adjustments.getAdjustmentDetailsById}/${adjustmentId}`
  );
};

export const getIncidentCodes = () => {
  return apiInstance().get(`${adjustments.getIncidentCodes}`);
};

export const addIncidentCode = (payload) => {
  return apiInstance().post(`${adjustments.addIncidentCode}`, payload);
};

export const getAdjustmentListBySearchCriteria = (payload) => {
  return apiInstance().post(
    `${adjustments.getAdjustmentListBySearchCriteria}`,
    payload
  );
};

export const downloadAdjustmentReport = (payload) => {
  return fileApiInstance().post(
    `${adjustments.downloadAdjustmentReport}`,
    payload
  );
};

export const getAdjustmentWarnings = (payload) => {
  return apiInstance().post(`${adjustments.getAdjustmentWarnings}`, payload);
};

export const deleteAdjustmentById = (Id) => {
  return apiInstance().delete(`${adjustments.deleteAdjustment}/${Id}`);
};
export const uploadDocument = (payload) => {
  return apiInstance().post(adjustments.uploadDocument, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};
export const saveBatchAdjustmentFile = (payload) => {
  return apiInstance().post(`${adjustments.saveBatchAdjustmentFile}`, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};
export const saveAdjustmentSummaryDetailsById = (id) => {
  return apiInstance().get(
    `${adjustments.saveAdjustmentSummaryDetailsById}/${id}`
  );
};
export const addNotesAdjustment = (payload) => {
  return apiInstance().post(`${adjustments.addNotes}`, payload);
};

export const saveContributionReversal = (payload) => {
  return apiInstance().post(`${adjustments.saveContributionReversal}`, payload);
};

export const getParticipantDataForContributionReversal = (payload) => {
  return apiInstance().post(
    `${adjustments.getParticipantDataForContributionReversal}`,
    payload
  );
};

export const downloadContributionReversalData = (payload) => {
  return fileApiInstance().post(
    `${adjustments.downloadContributionReversalData}`,
    payload
  );
};

export const getContributionReversalSummaryDetails = (payload) => {
  return apiInstance().post(
    `${adjustments.getContributionReversalSummaryDetails}`,
    payload
  );
};

export const getFileUploadDetailsByFileIndentifier = (transactionKey) => {
  return apiInstance().get(
    `${adjustments.getFileUploadDetailsByFileIndentifier}/${transactionKey}`
  );
};

export const getBatchAdjustmentDetailsBySearchCriteria = (payload) => {
  return apiInstance().post(
    `${adjustments.getBatchAdjustmentDetailsBySearchCriteria}`,
    payload
  );
};

export const getDownloadUploadedFileDetails = (id) => {
  return fileApiInstance().get(
    `${adjustments.getDownloadUploadedFileDetails}/${id}`
  );
};

export const saveBatchAdjustmentDetails = (payload) => {
  return apiInstance().post(
    `${adjustments.saveBatchAdjustmentDetails}`,
    payload
  );
};

export const downloadBatchAdjustmentEmployeeTemplate = (payload) => {
  return fileApiInstance().post(
    adjustments.downloadBatchAdjustmentEmployeeTemplate,
    payload
  );
};

export const getBatchAdjustmentDetailsById = (id) => {
  return apiInstance().get(
    `${adjustments.getBatchAdjustmentDetailsById}/${id}`
  );
};

export const getEmployeeBasedOnPayrollFile = (id) => {
  return fileApiInstance().get(
    `${adjustments.getEmployeeBasedOnPayrollFile}/${id}`,
    { responseType: "json" }
  );
};

export const downloadErrorReportDetails = (id) => {
  return fileApiInstance().post(
    `${adjustments.downloadErrorReportDetails}/${id}`
  );
};

export const deleteBatchAdjustmentDetailsById = (id) => {
  return apiInstance().post(
    `${adjustments.deleteBatchAdjustmentDetailsById}/${id}`
  );
};

export const finalSaveBatchAdjustmentDetails = (id) => {
  return apiInstance().post(
    `${adjustments.finalSaveBatchAdjustmentDetails}/${id}`
  );
};

export const getAdjusmentSummary = (adjustmentId) => {
  return apiInstance().get(
    `${adjustments.getAdjusmentSummary}/${adjustmentId}`
  );
};

export const getEmployeeDividendReversalSourceWiseTransactions = (
  transactionKey
) => {
  return apiInstance().get(
    `/api/v1/Adjustment/GetEmployeeDividendReversalSourceWiseTransactions/${transactionKey}`
  );
};
