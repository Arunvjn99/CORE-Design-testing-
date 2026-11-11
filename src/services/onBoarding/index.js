import apiInstance from "../api";
import { onboarding } from "@/services/endpoints/onboarding";
import { plan } from "@/services/endpoints/plan";

export const postPipeline = (payload) => {
  return apiInstance().post(`${onboarding.postPipeline}`, payload);
};

export const getPipelineById = (id) => {
  return apiInstance().get(`${onboarding.getPipelineById}/${id}`);
};

export const getPipelineList = () => {
  return apiInstance().get(`${onboarding.getPipelineList}`);
};

export const deletePipelineById = (id) => {
  return apiInstance().get(`${onboarding.deletePipelineById}/${id}`);
};

export const getProfilesById = (id) => {
  return apiInstance().get(`${onboarding.getProfileById}/${id}`);
};
export const addPipelineRun = (id) => {
  return apiInstance().post(`${onboarding.addPipelineRun}/${id}`);
};
export const getPipelineRun = (id) => {
  return apiInstance().get(`${onboarding.getPipelineRun}/${id}`);
};
export const getPipelineGridView = (payload) => {
  return apiInstance().post(`${onboarding.getPipelineGridView}`, payload);
};
export const PlanConversionFinalSubmit = (id) => {
  return apiInstance().post(`${onboarding.PlanConversionFinalSubmit}/${id}`);
};
export const postCompanyGridView = (payload) => {
  return apiInstance().post(`${onboarding.postCompanyGridView}`, payload);
};

export const getOnboardingDetails = (id) => {
  return apiInstance().get(`${onboarding.getCompany}/${id}`);
};
export const OnboardinggetNotificationSwitchHistoryForPayDate = (id) => {
  return apiInstance().get(
    `${onboarding.getNotificationSwitchHistoryForPayDate}/${id}`
  );
};

export const OnboardinggetMasterClassificationTypes = (companyId) => {
  return apiInstance().get(
    `${onboarding.getMasterClassifications}/${companyId}`
  );
};
export const OnboardingaddMasterClassificationTypes = (payload) => {
  return apiInstance().post(`${onboarding.addMasterClassifications}`, payload);
};
export const OnboardingcheckMasterClassificationExists = (payload) => {
  return apiInstance().get(
    `${onboarding.checkMasterClassificationExists}/${payload}`
  );
};
export const OnboardingGetMasterEmploymentStatuses = (companyId) => {
  return apiInstance().get(
    `${onboarding.getMasterEmploymentStatuses}/${companyId}`
  );
};
export const OnboardingAddMasterEmploymentStatus = (payload) => {
  return apiInstance().post(`${onboarding.addMasterEmploymentStatus}`, payload);
};
export const OnboardingCheckMasterEmploymentStatusExists = (payload) => {
  return apiInstance().get(
    `${onboarding.checkMasterEmploymentStatusExists}/${payload}`
  );
};
export const OnboardinggetGeneratePayrollSchedule = (payload) => {
  return apiInstance().post(
    `${onboarding.getGeneratePayrollSchedule}`,
    payload
  );
};

export const postOnboardingDetails = (payload) => {
  return apiInstance().post(onboarding.postCompany, payload);
};

export const getCheckOnboardingNameExists = (payload) => {
  return apiInstance().get(`${onboarding.getCompanyNameCheck}/${payload}`);
};

export const uploadOnboardingCompanyLogo = (payload) => {
  return apiInstance().post(onboarding.uploadCompanyLogo, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const getOnboardingCompanyLogo = (companyId) => {
  return apiInstance().get(`${onboarding.getCompanyLogo}/${companyId}`);
};

export const getOnboardingValidation = (payload) => {
  return apiInstance().get(
    `${onboarding.validateClassification}/${payload.id}/${payload.typeId}`
  );
};
export const pipelineFileUpload = (payload) => {
  return apiInstance().post(onboarding.pipelineFileUpload, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const getCompanyCardDetails = (id) => {
  return apiInstance().get(`${onboarding.getCompanyCardDetails}/${id}`);
};
export const getPlanCardDetails = (id) => {
  return apiInstance().get(`${onboarding.getPlanCardDetails}/${id}`);
};

export const PostPlanConversionDocument = (payload) => {
  return apiInstance().post(
    `${onboarding.postPlanConversionDocument}`,
    payload,
    { headers: { "content-type": "multipart/form-data" } }
  );
};

export const ParticipantOptOutCommunication = (payload) => {
  return apiInstance().get(
    `${onboarding.participantOptOutCommunication}/${payload.employeeId}/${payload.planId}`
  );
};

export const getPlanCount1 = () => {
  return apiInstance().get(plan.getPlanCount);
};

export const getInvestmentDataList = (payload) => {
  return apiInstance().post(onboarding.getInvestmentDataList, payload);
};

export const getRestrictionEditHistory = (payload) => {
  return apiInstance().post(onboarding.getRestrictionEditHistory, payload);
};
