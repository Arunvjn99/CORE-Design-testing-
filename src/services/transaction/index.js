import apiInstance from "../api";
import { transactions } from "@/services/endpoints/transactions";
import { dividend } from "@/services/endpoints/corporate";
import { dividendReversal } from "@/services/endpoints/adjustments";
import { feeReversal } from "@/services/endpoints/adjustments";

// approval count data
export const getApprovalWithdrawalCount = (userId, planId) => {
  return apiInstance().get(
    `${transactions.getApprovalWithdrawalCount}/${userId}/${planId}`
  );
};
export const getLoanById = (payload) => {
  return apiInstance().get(`${transactions.getLoanById}/${payload}`);
};
export const getInProgressLoan = (id) => {
  return apiInstance().get(`${transactions.getInProgressLoanDetails}/${id}`);
};
export const getApprovalLoanCount = (planId) => {
  return apiInstance().get(
    `${transactions.getLoanAwaitingForApprovalCount}/${planId}`
  );
};
export const getLoanAwaitingForApprovalCount = (planId, apiRequest) => {
  const url = `${transactions.getLoanAwaitingForApprovalCount}/${planId}`;
  return apiRequest
    ? apiInstance().post(url, apiRequest)
    : apiInstance().post(url);
};
export const addNotesLoan = (payload) => {
  return apiInstance().post(`${transactions.addLoanNotes}`, payload);
};
export const getApprovalRolloverinCount = (planId) => {
  return apiInstance().get(
    `${transactions.getApprovalRolloverinCount}/${planId}`
  );
};
export const getApprovalInPlanRothConversionCount = (planId) => {
  return apiInstance().get(
    `${transactions.getApprovalInPlanRothConversionCount}/${planId}`
  );
};
export const getInPlanRothRequestSummaryDetails = (InPlanRothRequestId) => {
  return apiInstance().get(
    `${transactions.getInPlanRothRequestSummaryDetails}/${InPlanRothRequestId}`
  );
};
export const getInPlanRothApprovalRequestDetails = (payload) => {
  return apiInstance().post(
    `${transactions.getInPlanRothApprovalRequestDetails}`,
    payload
  );
};

export const switchTreatmentOfLoans = (payload) => {
  return apiInstance().post(`${transactions.switchTreatmentOfloans}`, payload);
};

//approval employeeData in card(list)
export const getApprovalWithdrawalEmployee = (payload) => {
  return apiInstance().post(
    transactions.getApprovalWithdrawalEmployee,
    payload
  );
};

export const getApprovalLoanEmployee = (payload) => {
  return apiInstance().post(transactions.getApprovalLoanEmployee, payload);
};

export const getApprovalRolloverinEmployee = (payload) => {
  return apiInstance().post(
    transactions.getApprovalRolloverinEmployee,
    payload
  );
};

//draft employeeData in card
export const getDraftWithdrawalEmployee = (payload) => {
  return apiInstance().post(transactions.getDraftWithdrawalEmployee, payload);
};

export const getDraftRolloverinEmployee = (payload) => {
  return apiInstance().post(transactions.getDraftRolloverinEmployee, payload);
};

export const getWithDrawalApprovalSearchinEmployee = (payload) => {
  return apiInstance().post(
    transactions.getWithDrawalApprovalSearchinEmployee,
    payload
  );
};

//searchFilterApproval(post)
export const getLoanApprovalSearchinEmployee = (payload) => {
  return apiInstance().post(
    transactions.getLoanApprovalSearchinEmployee,
    payload
  );
};

export const getRolloverinApprovalSearchinEmployee = (payload) => {
  return apiInstance().post(
    transactions.getRolloverinApprovalSearchinEmployee,
    payload
  );
};

// export const getWithDrawalApprovalSearchinEmployee = (payload) => {
//   return apiInstance().post(
//     transactions.getWithDrawalApprovalSearchinEmployee,
//     payload
//   );
// };

//searchFilterDraft(post)
export const getRollOverinDraftSearchinEmployee = (payload) => {
  return apiInstance().post(
    transactions.getRollOverinDraftSearchinEmployee,
    payload
  );
};

export const getWithdrawalsDraftSearchinEmployee = (payload) => {
  return apiInstance().post(
    transactions.getWithdrawalsDraftSearchinEmployee,
    payload
  );
};

// draft data count
export const getDraftWithdrawalCount = (payload) => {
  return apiInstance().get(
    `${transactions.getDraftWithdrawalCount}/${payload}`
  );
};
// getLoanSubTypeByPlanId
export const getLoanSubTypeByPlanId = (payload) => {
  return apiInstance().get(`${transactions.getLoanSubTypeByPlanId}/${payload}`);
};

export const getDraftLoanCount = () => {
  return apiInstance().get(`${transactions.getDraftLoanCount}`);
};
export const getDraftRolloverinCount = () => {
  return apiInstance().get(`${transactions.getDraftRolloverinCount}`);
};

//delete draft
export const deleteRollOverInRequest = (id) => {
  return apiInstance().get(`${transactions.deleteRollOverInRequest}/${id}`);
};

export const deleteWithdrawalRequest = (id) => {
  return apiInstance().delete(`${transactions.deleteWithdrawalRequest}/${id}`);
};

export const deleteLoanRequest = (id) => {
  return apiInstance().post(`${transactions.deleteLoanRequest}/${id}`);
};
export const deleteLoanRepaymentRequest = (id) => {
  return apiInstance().post(`${transactions.deleteLoanRepaymentRequest}/${id}`);
};

//transfers
export const getCurrentHoldings = (employeeId, planId) => {
  return apiInstance().get(
    `${transactions.getCurrentHoldings}/${employeeId}/${planId}`
  );
};
export const getCurrentHoldingsForRebalance = (planId, employeeId) => {
  return apiInstance().get(
    `${transactions.getCurrentHoldingsForRebalance}/${planId}/${employeeId}`
  );
};
export const GetSDBagainstInvestment = (employeeId, planId) => {
  return apiInstance().get(
    `${transactions.GetSDBagainstInvestment}/${employeeId}/${planId}`
  );
};
export const GetInvestmentProspectus = (investmentId) => {
  return apiInstance().post(`${transactions.GetInvestmentProspectus}`, {
    investmentId: investmentId,
  });
};

export const getInvestmentsByPlanId = (planId) => {
  return apiInstance().get(`${transactions.getInvestmentsByPlanId}/${planId}`);
};

export const saveTransferDetails = (payload) => {
  return apiInstance().post(transactions.saveTransferDetails, payload);
};

export const saveDraftOfTransferDetails = (payload) => {
  return apiInstance().post(transactions.saveDraftOfTransferDetails, payload);
};

export const getTransferDetails = (employeeId) => {
  return apiInstance().get(`${transactions.getTransferDetails}/${employeeId}`);
};

export const getTransferRequestDetailsByEmpId = (employeeId) => {
  return apiInstance().get(
    `${transactions.getTransferRequestDetailsByEmpId}/${employeeId}`
  );
};

export const deleteTransferRequest = (transferRequestId) => {
  return apiInstance().delete(
    `${transactions.deleteTransferRequest}/${transferRequestId}`
  );
};

export const addNotesTransfer = (payload) => {
  return apiInstance().post(`${transactions.addNotesTransfer}`, payload);
};

export const getCurrentHoldingForTransfer = (employeeId) => {
  return apiInstance().get(
    `${transactions.getCurrentHoldingForTransfer}/${employeeId}`
  );
};

export const transferAllowedValidation = (employeeId, planId) => {
  return apiInstance().get(
    `${transactions.transferAllowedValidation}/${employeeId}/${planId}`
  );
};

export const saveTransferDetailsForAdmin = (payload) => {
  return apiInstance().post(
    `${transactions.saveTransferDetailsForAdmin}`,
    payload
  );
};

//rebalance
export const saveRebalanceDetails = (payload) => {
  return apiInstance().post(transactions.saveRebalanceDetails, payload);
};

export const saveDraftOfRebalanceDetails = (payload) => {
  return apiInstance().post(transactions.saveDraftOfRebalanceDetails, payload);
};

export const getRebalanceDetails = (rebalanceRequestId) => {
  return apiInstance().get(
    `${transactions.getRebalanceDetails}/${rebalanceRequestId}`
  );
};

export const getRebalanceRequestDetailsByEmpId = (employeeId) => {
  return apiInstance().get(
    `${transactions.getRebalanceRequestDetailsByEmpId}/${employeeId}`
  );
};

export const deleteRebalanceRequest = (rebalanceRequestId) => {
  return apiInstance().delete(
    `${transactions.deleteRebalanceRequest}/${rebalanceRequestId}`
  );
};

export const approveLoan = (payload) => {
  return apiInstance().post(`${transactions.approveLoan}/${payload}`);
};

export const rejectLoan = (payload) => {
  return apiInstance().post(transactions.rejectLoan, payload);
};

export const getEmployeeEligiblePlanLoans = (id) => {
  return apiInstance().get(
    `${transactions.getEmployeeEligiblePlanLoans}/${id}`
  );
};

export const getSourceInvestmentSplitup = (businessKey) => {
  return apiInstance().get(
    `${transactions.getSourceInvestmentSplitup}/${businessKey}`
  );
};

export const calculateSourceInvestmentSplitUp = (payload) => {
  return apiInstance().post(
    transactions.calculateSourceInvestmentSplitUp,
    payload
  );
};

export const getLoanRepaymentDates = (loanRequestId) => {
  return apiInstance().get(
    `${transactions.getLoanRepaymentDates}/${loanRequestId}`
  );
};
export const loanRepaymentAmountCalculator = (
  date,
  loanId,
  loanClosureType
) => {
  return apiInstance().get(
    `${transactions.loanRepaymentAmountCalculator}/${date}/${loanId}/${loanClosureType}`
  );
};

export const getLoanDocumentByBusinessKey = (businessKey) => {
  return apiInstance().get(
    `${transactions.getLoanDocumentByBusinessKey}/${businessKey}`
  );
};

export const getPaymentDetailsByBusinessKey = (businessKey, isLoanRequest) => {
  return apiInstance().get(
    `${transactions.getPaymentDetailsByBusinessKey}/${businessKey}`,
    { params: { isLoanRequest } }
  );
};

//Dividend
export const getEmployeeLevelDetailsForDividendTransactions = (payload) => {
  return apiInstance().post(
    dividend.getEmployeeLevelDetailsForDividendTransactions,
    payload
  );
};

export const saveDividendDetails = (payload) => {
  return apiInstance().post(dividend.saveDividendDetails, payload);
};

export const saveScheduleDividendDetails = (payload) => {
  return apiInstance().post(dividend.saveScheduleDividendDetails, payload);
};

export const deleteDividendDetails = (id) => {
  return apiInstance().delete(`${dividend.deleteDividendDetails}/${id}`);
};

export const getDividendTransactionsBySearchCriteria = (payload) => {
  return apiInstance().post(
    dividend.getDividendTransactionsBySearchCriteria,
    payload
  );
};

export const getDividendTransactionDetailsByTransactionKey = (
  planId,
  transactionKey
) => {
  return apiInstance().get(
    `${dividend.getDividendTransactionDetailsByTransactionKey}/${planId}/${transactionKey}`
  );
};

export const getDividendTransactionDetailsById = (
  planId,
  referenceTransactionId
) => {
  return apiInstance().get(
    `${dividend.getDividendTransactionDetailsById}/${planId}/${referenceTransactionId}`
  );
};

export const getSourceLevelTransactionBreakdownByDividendAndEmployeeId = (
  transactionKey
) => {
  return apiInstance().get(
    `${dividend.getSourceLevelTransactionBreakdownByDividendAndEmployeeId}/${transactionKey}`
  );
};

export const getAccrualDetailsOfDividendTransactionByEmployeeId = (
  employeeId,
  referenceTransactionId
) => {
  return apiInstance().get(
    `${dividend.getAccrualDetailsOfDividendTransactionByEmployeeId}/${employeeId}/${referenceTransactionId}`
  );
};

export const getDividendHistoryDetailsById = (Id) => {
  return apiInstance().get(`${dividend.getDividendHistoryDetailsById}/${Id}`);
};

// Dividend Reversal specific functions

export const getSourceLevelTransactionBreakdownByDividendReversalAndEmployeeId =
  (transactionKey) => {
    return apiInstance().get(
      `${dividendReversal.getSourceLevelTransactionBreakdownByDividendReversalAndEmployeeId}/${transactionKey}`
    );
  };

export const getDividendReversalTransactionDetailsById = (
  planId,
  transactionKey
) => {
  return apiInstance().get(
    `${dividendReversal.getDividendReversalTransactionDetailsById}/${planId}/${transactionKey}`
  );
};

export const getTransactionDividendReversalEmployeeDetails = (payload) => {
  return apiInstance().post(
    `${dividendReversal.getTransactionDividendReversalEmployeeDetails}`,
    payload
  );
};

export const getDividendReversalTransactionDetailsByTransactionKey = (
  planId,
  transactionKey
) => {
  return apiInstance().get(
    `${dividendReversal.getDividendReversalTransactionDetailsByTransactionKey}/${planId}/${transactionKey}`
  );
};

export const getEmployeeLevelDetailsForDividendReversalTransactions = (
  payload
) => {
  return apiInstance().post(
    dividendReversal.getEmployeeLevelDetailsForDividendReversalTransactions,
    payload
  );
};

export const getDividendReversalHistoryDetailsById = (Id) => {
  return apiInstance().get(
    `${dividendReversal.getDividendReversalHistoryDetailsById}/${Id}`
  );
};

export const getTransactionsDividendReversal = (payload) => {
  return apiInstance().post(
    dividendReversal.getTransactionsDividendReversal,
    payload
  );
};

export const getTotalOutStandingLoanPrinciple = (employeeId, planId) => {
  return apiInstance().get(
    `${transactions.getTotalOutStandingLoanPrinciple}/${employeeId}/${planId}`
  );
};

// Fee Reversal
export const getParticipantDataForFeeReversal = (payload) => {
  return apiInstance().post(
    `${feeReversal.getParticipantDataForFeeReversal}`,
    payload
  );
};

//****
