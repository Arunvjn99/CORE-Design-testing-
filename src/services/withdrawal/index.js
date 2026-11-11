import apiInstance from "../api";
import fileApiInstance from "../fileApi";
import { withdrawal } from "@/services/endpoints/withdrawal";
import { transactions } from "@/services/endpoints/transactions";
import { fee } from "@/services/endpoints/fee";
import { rkaas } from "@/services/endpoints/trade";

export const getEmployeePlanWithdrawals = (id) => {
  return apiInstance().get(`${withdrawal.getEmployeePlanWithdrawals}/${id}`);
};

export const addAddress = (payload) => {
  return apiInstance().post(withdrawal.addAddress, payload);
};

export const addBank = (payload) => {
  return apiInstance().post(withdrawal.addBank, payload);
};

export const saveWithdrawalRequest = (payload) => {
  return apiInstance().post(withdrawal.saveWithdrawalRequest, payload);
};

export const getWithdrawalRequest = (id) => {
  return apiInstance().get(`${withdrawal.getWithdrawalRequest}/${id}`);
};

export const getWithdrawalTransaction = (id) => {
  return apiInstance().get(`${withdrawal.getWithdrawalTransaction}/${id}`);
};

export const getPeriodicPaymentCalculationDetails = (
  planId,
  censusId,
  withdrawalId
) => {
  return apiInstance().get(
    `${withdrawal.getPeriodicPaymentCalculationDetails}/${planId}/${censusId}/${withdrawalId}`
  );
};

export const getLoanDetailsById = (id) => {
  return apiInstance().get(`${transactions.getLoanById}/${id}`);
};

export const getLoanSummaryDetails = (id) => {
  return apiInstance().get(`${transactions.getLoanSummary}/${id}`);
};

export const checkAndUpdateLoanStatus = (loanId) => {
  return apiInstance().get(
    `${transactions.checkAndUpdateLoanStatus}/${loanId}`
  );
};

export const getLoanSummaryById = (id) => {
  return apiInstance().get(`${transactions.getLoanById}/${id}`);
};

export const getLoanByBusinessKey = (businessKey) => {
  return apiInstance().get(
    `${transactions.getLoanByBusinessKey}/${businessKey}`
  );
};

export const getLoanDisbursementSummary = (id) => {
  return apiInstance().get(
    `${transactions.getLoanDisbursementSummaryById}/${id}`
  );
};

export const getFeeDisbursementSummary = (id) => {
  return apiInstance().get(`${fee.getFeeTransactionSummary}/${id}`);
};

export const getDisbursementListingDataBySearchCriteria = (payload) => {
  return apiInstance().post(
    `${transactions.getDisbursementListingDataBySearchCriteria}`,
    payload
  );
};

export const getAmortizationSchedule = (payload) => {
  return apiInstance().post(`${transactions.getAmortizationSchedule}`, payload);
};

export const getRepaymentSchedule = (id) => {
  return apiInstance().get(`${transactions.getRepaymentSchedule}/${id}`);
};

export const getStateTax = (id) => {
  return apiInstance().get(`${withdrawal.getStateTax}/${id}`);
};

export const getWithdrawalByEmployeeId = (employeeid, planId) => {
  return apiInstance().get(
    `${withdrawal.getWithdrawalByEmployeeId}/${employeeid}/${planId}`
  );
};

export const getLoanByEmployeeId = (employeeid, planId) => {
  return apiInstance().get(
    `${transactions.GetLoanByEmployeeId}/${employeeid}/${planId}`
  );
};

export const getEmployeeLoanRepayment = (employeeId, planId) => {
  return apiInstance().get(
    `${transactions.getEmployeeLoanRepayment}/${employeeId}/${planId}`
  );
};

export const submitWithdrawalRequest = (payload) => {
  return apiInstance().post(`${withdrawal.submitWithdrawalRequest}`, payload);
};
export const getWithdrawalDisbursementHistory = (id) => {
  return apiInstance().get(
    `${withdrawal.getDistributionDisbursementHistory}/${id}`
  );
};

export const processWithdrawalDisbursement = (payload) => {
  return apiInstance().post(
    withdrawal.processDistributionDisbursement,
    payload
  );
};
export const getLoanDisbursementHistory = (id) => {
  return apiInstance().get(`${transactions.getLoanDisbursementHistory}/${id}`);
};

export const getFeeDisbursementHistory = (id) => {
  return apiInstance().get(`${fee.getFeeDisbursementHistory}/${id}`);
};

export const getTransactionalFeeDisbursementSummary = (id) => {
  return apiInstance().get(
    `${fee.getTransactionalFeeDisbursementSummary}/${id}`
  );
};

export const getTransactionalFeeDisbursementHistory = (id) => {
  return apiInstance().get(
    `${fee.getTransactionalFeeDisbursementHistory}/${id}`
  );
};

export const processLoanDisbursement = (payload) => {
  return apiInstance().post(transactions.processLoanDisbursement, payload);
};

export const processFeeDisbursement = (payload) => {
  return apiInstance().post(fee.processFeeDisbursement, payload);
};

export const processTransactionalFeeDisbursement = (payload) => {
  return apiInstance().post(fee.processTransactionalFeeDisbursement, payload);
};

export const approvalWithdrawalRequest = (payload) => {
  return apiInstance().post(withdrawal.approvalWithdrawalRequest, payload);
};
export const generateDistributionReport = (payload) => {
  return fileApiInstance().post(
    withdrawal.generateDistributionReport,
    payload,
    { responseType: "blob" }
  );
};

export const saveInProgressLoanRequest = (payload) => {
  return apiInstance().post(transactions.saveInProgressLoan, payload);
};

export const submitLoanRequestById = (id) => {
  return apiInstance().post(transactions.submitLoanRequest, id);
};
export const getEligibleParticipantsForRMD = (isMissed) => {
  return apiInstance().get(
    `${withdrawal.getEligibleParticipantsForRMD}/${isMissed}`
  );
};
export const getEligibleParticipantsForForceOut = () => {
  return apiInstance().get(`${withdrawal.getForcedOutParticipants}`);
};
export const uploadWithdrawalDocumentsRequest = (payload) => {
  return apiInstance().post(withdrawal.uploadWithdrawalDocuments, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const uploadLoanDocumentsRequest = (payload) => {
  return apiInstance().post(transactions.uploadLoanDocuments, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};
export const loanDownloadTemplate = (id) => {
  return fileApiInstance().get(`${transactions.loanDownloadTemplate}/${id}`);
};

export const downloadTemplateByFileName = (fileName, filePath) => {
  return fileApiInstance().post(transactions.downloadTemplateByFileName, {
    fileName: fileName,
    filePath: filePath,
  });
};
export const getBalances = (id) => {
  return apiInstance().get(`${rkaas.getBalances}/${id}`);
};

export const getTradeEmployeeEligiblePlanWithdrawals = (payload) => {
  return apiInstance().get(
    `${withdrawal.tradeEmployeeEligiblePlanWithdrawals}/${payload.employeeId}/${payload.transactionKey}`
  );
};

export const getWithdrawalRequestSummary = (payload) => {
  return apiInstance().post(
    `${withdrawal.getWithdrawalRequestSummary}`,
    payload
  );
};

export const addNotesDistribution = (payload) => {
  return apiInstance().post(`${withdrawal.addNotes}`, payload);
};
export const getPlanAndLoanDetailsForDirectRepayment = (employeeId, planId) => {
  return apiInstance().get(
    `${transactions.getPlanAndLoanDetailsForDirectRepayment}/${employeeId}/${planId}`
  );
};
export const saveLoanRepayments = (payload) => {
  return apiInstance().post(`${transactions.saveLoanRepayments}`, payload);
};
export const uploadLoanDocumentsForRepayment = (payload) => {
  return apiInstance().post(
    transactions.uploadLoanDocumentsForRepayment,
    payload,
    {
      headers: { "content-type": "multipart/form-data" },
    }
  );
};

export const withdrawalCalculation = (payload) => {
  return apiInstance().post(`${withdrawal.withdrawalCalculation}`, payload);
};
