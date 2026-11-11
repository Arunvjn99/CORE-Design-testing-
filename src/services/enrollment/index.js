import apiInstance from "../api";
import { enrollment } from "@/services/endpoints/enrollment";

import fileApiInstance from "../fileApi";
export const getPlanSourceInformation = (planId, signal) => {
  return apiInstance().get(`${enrollment.getPlanSourceInformation}/${planId}`, {
    cancelToken: signal,
  });
};

export const getPlanInvestments = (planId) => {
  return apiInstance().get(`${enrollment.getPlanInvestments}/${planId}`);
};
export const postDefaultElectionSetting = (payload) => {
  return apiInstance().post(
    `${enrollment.postDefaultElectionSetting}`,
    payload
  );
};
export const postPlanInvestment = (payload) => {
  return apiInstance().post(`${enrollment.postPlanInvestment}`, payload);
};
export const postADIApplicableConfiguration = (payload) => {
  return apiInstance().post(
    `${enrollment.postADIApplicableConfiguration}`,
    payload
  );
};
export const getDefaultElectionSetting = (payload) => {
  return apiInstance().get(
    `${enrollment.getDefaultElectionSetting}/${payload.planId}/${payload.classificationIds}/${payload.employeeId}`
  );
};
export const deleteInvestment = (planId, investmentId) => {
  return apiInstance().delete(
    `${enrollment.deleteInvestment}/${planId}/${investmentId}`
  );
};
export const getADIApplicableConfiguration = (payload) => {
  return apiInstance().get(
    `${enrollment.getADIApplicableConfiguration}/${payload.planId}/${payload.classificationIds}`
  );
};
export const saveAutoEnrollment = (payload) => {
  return apiInstance().post(`${enrollment.saveAutoEnrollment}`, payload);
};
export const getEmployeeEnrollment = (payload, signal) => {
  return apiInstance().get(
    `${enrollment.GetEnrollment}/${payload.employeeId}/${payload.planId}`,
    {
      cancelToken: signal,
    }
  );
};
export const getEmployeePlanElectionHistory = (payload, signal) => {
  return apiInstance().get(
    `${enrollment.GetEmployeePlanElectionHistory}/${payload.employeeId}/${payload.planId}/${payload.from}/${payload.offset}`,
    {
      cancelToken: signal,
    }
  );
};
export const saveEnrollment1 = (payload) => {
  return apiInstance().post(`${enrollment.SaveEnrollment}`, payload);
};

export const optOutPlan = (planId, employeeId) => {
  return apiInstance().post(`${enrollment.OptOutPlan}/${planId}/${employeeId}`);
};

export const getAutoEnrollment = (planId) => {
  return apiInstance().get(`${enrollment.getAutoEnrollment}/${planId}`);
};
export const getEmployeeClassification = (planId) => {
  return apiInstance().get(`${enrollment.getEmployeeClassification}/${planId}`);
};
export const saveAdditionalAutoEnrollment = (payload) => {
  return apiInstance().post(
    `${enrollment.saveAdditionalAutoEnrollment}`,
    payload
  );
};
export const getAdditionalAutoEnrollment = (planId) => {
  return apiInstance().get(
    `${enrollment.retrieveAdditionalAutoEnrollmentIfExists}/${planId}`
  );
};

export const autoEnrollmentGeneration = (payload) => {
  return apiInstance().get(
    `${enrollment.AutoEnrollmentGeneration}/${payload.planId}/${payload.companyId}`
  );
};
export const EnrollmentSummaryReport = (payload) => {
  return apiInstance().get(
    `${enrollment.EnrollmentSummaryReport}/${payload.planId}/${payload.companyId}`
  );
};
export const ParticipantwiseReport = (payload) => {
  return apiInstance().get(
    `${enrollment.ParticipantwiseReport}/${payload.planId}/${payload.companyId}`
  );
};
export const exportEnrollmentSummaryReport = (payload, signal) => {
  return fileApiInstance().get(
    `${enrollment.exportEnrollmentSummaryReport}/${payload.planId}/${payload.companyId}`
  );
};
export const exportParticipantwiseReport = (payload, signal) => {
  const { planId, companyId, status, searchText } = payload;
  return fileApiInstance().get(
    `${enrollment.exportParticipantwiseReport}/${planId}/${companyId}`,
    { params: { status, searchText } }
  );
};
