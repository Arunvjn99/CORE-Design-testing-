export const withdrawal = {
  getEmployeePlanWithdrawals: "/api/Distribution/GetEmployeePlanWithdrawals",
  tradeEmployeeEligiblePlanWithdrawals:
    "/api/Distribution/tradeEmployeeEligiblePlanWithdrawals",
  tradeEmployeeEligiblePlanWithdrawals:
    "/api/Distribution/tradeEmployeeEligiblePlanWithdrawals",
  addAddress: "/api/Distribution/AddAddress",
  addBank: "/api/Distribution/AddBank",
  processDistributionDisbursement:
    "/api/Distribution/ProcessDistributionDisbursement",
  getDistributionDisbursementHistory:
    "/api/Distribution/GetDistributionDisbursementHistory",
  saveWithdrawalRequest: "/api/Distribution/SaveWithdrawalRequest",
  getWithdrawalRequest: "/api/Distribution/GetWithdrawalRequest",
  getWithdrawalTransaction:
    "/api/Distribution/GetWithdrawalTransactionByWithdrawalTransactionId",
  getPeriodicPaymentCalculationDetails:
    "/api/Distribution/GetPeriodicPaymentCalculationDetails",
  getStateTax: "/api/Distribution/GetStateTax",
  getWithdrawalByEmployeeId: "/api/Distribution/GetWithdrawalByEmployeeId",
  approvalWithdrawalRequest: "/api/Distribution/ApprovalWithdrawalRequest",
  generateDistributionReport: "/api/Distribution/GenerateDistributionReport",
  uploadWithdrawalDocuments: "/api/Distribution/UploadWithdrawalDocuments",
  submitWithdrawalRequest: "/api/Distribution/SubmitWithdrawalRequest",
  getEligibleParticipantsForRMD:
    "/api/Distribution/GetEligibleParticipantsForRMD",
  getEligibleParticipantsForForceOut:
    "/api/Distribution/GetEligibleParticipantsForForceOut",
  getForcedOutParticipants: "/api/Distribution/getForcedOutParticipants",
  getWithdrawalRequestSummary: "/api/Distribution/GetWithdrawalRequestSummary",
  addNotes: "/api/Distribution/AddNotes",
  withdrawalCalculation: "/api/Distribution/WithdrawalCalculation",
};

export const rollOver = {
  saveRolloverInRequest: "/api/RolloverIn/SaveRolloverInRequest",
  getRolloverInRequestDetailsByEmployeeId:
    "/api/RolloverIn/GetRolloverInRequestDetailsByEmployeeId",
  deleteRolloverInRequestDetailsById:
    "/api/RolloverIn/DeleteRolloverInRequestDetailsById",
  getRolloverInRequestDetailsById:
    "/api/RolloverIn/GetRolloverInRequestDetailsById",
  saveRollOverDocuments: "/api/RolloverIn/SaveRollOverDocuments",
  approveOrRejectRolloverInRequest:
    "/api/RolloverIn/ApproveOrRejectRolloverInRequest",
  addNotes: "/api/RolloverIn/AddNotes",
};
