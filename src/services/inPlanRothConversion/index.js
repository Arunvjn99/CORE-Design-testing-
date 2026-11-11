import apiInstance from "../api";
import { inPlanRothConversion } from "@/services/endpoints/misc";

export const getParticipantAccountBalanceByPlanForInPlanRoth = (employeeId) => {
  return apiInstance().get(
    `${inPlanRothConversion.GetParticipantAccountBalanceByPlanForInPlanRoth}/${employeeId}`
  );
};

export const saveInPlanRothConversionRequest = (payload) => {
  return apiInstance().post(
    inPlanRothConversion.SaveInPlanRothConversionRequest,
    payload
  );
};

export const ApproveOrRejectInPlanRothRequest = (payload) => {
  return apiInstance().post(
    inPlanRothConversion.ApproveOrRejectInPlanRothRequest,
    payload
  );
};

export const addNotesInPlanRothConversion = (payload) => {
  return apiInstance().post(`${inPlanRothConversion.AddNotes}`, payload);
};

export const getInPlanRothConversionByEmployeeId = (employeeId) => {
  return apiInstance().get(
    `${inPlanRothConversion.GetInPlanRothConversionByEmployeeId}/${employeeId}`
  );
};

export const getStateTaxForInPlanRoth = (id) => {
  return apiInstance().get(`${inPlanRothConversion.GetStateTax}/${id}`);
};

export const getInPlanRothHistoryDetailsById = (transactionReferenceKey) => {
  return apiInstance().get(
    `${inPlanRothConversion.GetInPlanRothHistoryDetailsById}/${transactionReferenceKey}`
  );
};

export const getInPlanRothDetails = (inPlanRothId, referenceKey) => {
  return apiInstance().get(
    `${inPlanRothConversion.GetInPlanRothDetails}/${inPlanRothId}/${referenceKey}`
  );
};

export const getInPlanRothTransactionsBySearchCriteria = (payload) => {
  return apiInstance().post(
    `${inPlanRothConversion.GetInPlanRothTransactionsBySearchCriteria}`,
    payload
  );
};
