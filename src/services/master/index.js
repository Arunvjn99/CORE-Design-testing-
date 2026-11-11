import apiInstance from "../api";
import { onboardingPlan } from "@/services/endpoints/onboarding";
import { plan } from "@/services/endpoints/plan";
import { trade } from "@/services/endpoints/trade";

export const GetTradingPartner = (id) => {
  return apiInstance().get(`${plan.getClearingPartner}/${id}`);
};
export const GetOnboardingPlanTradingPartner = (id) => {
  return apiInstance().get(`${onboardingPlan.getClearingPartner}/${id}`);
};
export const GetTradingPartnerList = () => {
  return apiInstance().get(`${plan.getAllClearingPartners}`);
};
export const OnboardingPlanGetTradingPartnerList = (id) => {
  return apiInstance().get(`${onboardingPlan.getAllClearingPartners}`);
};
export const GetPlanTradingPartnerList = (id) => {
  return apiInstance().get(`${plan.getPlanAssociatedClearingPartners}/${id}`);
};
export const GetOnboardingPlanTradingPartnerList = (id) => {
  return apiInstance().get(
    `${onboardingPlan.getPlanAssociatedClearingPartners}/${id}`
  );
};
export const GetMasterInvestmentAssociatedClearingPartnerAccounts = (id) => {
  return apiInstance().get(
    `${plan.getMasterInvestmentAssociatedClearingPartnerAccounts}/${id}`
  );
};
export const getInvestmentAssociatedClearingPartner = (id) => {
  return apiInstance().get(
    `${plan.getInvestmentAssociatedClearingPartner}/${id}`
  );
};
export const GetOnboardingPlanInvestmentTradingPartnerList = (id) => {
  return apiInstance().get(
    `${onboardingPlan.getInvestmentTradingPartnerList}/${id}`
  );
};
export const DeleteClearingPartner = (id) => {
  return apiInstance().delete(`${plan.deleteClearingPartner}/${id}`);
};
export const DeleteClearanceTime = (id) => {
  return apiInstance().delete(`${plan.deleteClearanceTime}/${id}`);
};
export const UpsertPlanWithClearingPartner = (data) => {
  return apiInstance().post(`${plan.addClearingPartnerToPlan}`, data);
};
export const UpsertOnboardingPlanWithClearingPartner = (data) => {
  return apiInstance().post(`${onboardingPlan.addClearingPartnerToPlan}`, data);
};
export const UpsertClearingPartner = (data) => {
  return apiInstance().post(`${plan.upsertClearingPartner}`, data);
};
export const UpsertInvestmentWithClearingPartner = (data) => {
  return apiInstance().post(
    `${plan.saveInvestmentAssociatedClearingPartner}`,
    data
  );
};
export const OnboardingPlanUpsertInvestmentWithClearingPartner = (data) => {
  return apiInstance().post(
    `${onboardingPlan.saveInvestmentAssociatedClearingPartner}`,
    data
  );
};
export const UpsertClearanceTime = (data) => {
  return apiInstance().post(`${plan.upsertClearanceTime}`, data);
};
export const getClearingPartnerAccountPlans = (data) => {
  return apiInstance().get(`${plan.getClearingPartnerAccountPlans}/${data}`);
};
export const getClearingPartnerPlans = (data) => {
  return apiInstance().get(`${plan.getClearingPartnerPlans}/${data}`);
};
export const getAllAdvisors = () => {
  return apiInstance().get(`${plan.getAllMasterAdvisors}`);
};
export const getOnboardingPlanAllAdvisors = () => {
  return apiInstance().get(`${onboardingPlan.getAllMasterAdvisors}`);
};
export const getAdvisorOrganisation = (id, filters) => {
  return apiInstance().get(`${plan.getAdvisor}/${id}`, { params: filters });
};
export const getOnboardingPlanAdvisorOrganisation = (id) => {
  return apiInstance().get(`${onboardingPlan.getAdvisor}/${id}`);
};
export const getAdvisorOrganisationPlans = (id) => {
  return apiInstance().get(`${plan.getAdvisoPlans}/${id}`);
};
export const getAdvisorRepresentativePlans = (id) => {
  return apiInstance().get(`${plan.getAdvisorRepresentativePlans}/${id}`);
};
export const uploadAdvisorLogo = (payload) => {
  return apiInstance().post(plan.uploadAdvisorLogo, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};
export const getAdvisorLogo = (advisorId) => {
  return apiInstance().get(`${plan.getAdvisorLogo}/${advisorId}`);
};
export const getPlansWithAdvisorRepresentative = (id) => {
  return apiInstance().get(
    `${plan.getPlansAssociatedWithAdvisorRepresentative}/${id}`
  );
};
export const getOnboardingPlansWithAdvisorRepresentative = (id) => {
  return apiInstance().get(
    `${onboardingPlan.getPlansAssociatedWithAdvisorRepresentative}/${id}`
  );
};
export const getInvestmentWithAdvisorRepresentative = (id) => {
  return apiInstance().get(
    `${plan.getInvestmentAssociatedAdvisorRepresentative}/${id}`
  );
};
export const getOnboardingPlanInvestmentWithAdvisorRepresentative = (id) => {
  return apiInstance().get(
    `${onboardingPlan.getInvestmentAssociatedAdvisorRepresentative}/${id}`
  );
};
export const UpsertAdvisor = (data) => {
  return apiInstance().post(`${plan.upsertAdvisor}`, data);
};
export const UpsertAdvisorRepresentative = (data) => {
  return apiInstance().post(`${plan.upsertAdvisorRepresentative}`, data);
};
export const UpsertAdvisorRepresentativeToPlan = (data) => {
  return apiInstance().post(`${plan.upsertAdvisorToPlan}`, data);
};
export const OnboardingPlanUpsertAdvisorRepresentativeToPlan = (data) => {
  return apiInstance().post(`${onboardingPlan.upsertAdvisorToPlan}`, data);
};
export const UpsertAdvisorRepresentativeToInvestment = (data) => {
  return apiInstance().post(
    `${plan.upsertAdvisorRepresentativeToInvestment}`,
    data
  );
};
export const OnboardingPlanUpsertAdvisorRepresentativeToInvestment = (data) => {
  return apiInstance().post(
    `${onboardingPlan.upsertAdvisorRepresentativeToInvestment}`,
    data
  );
};
export const DeleteAdvisorRepresentative = (id) => {
  return apiInstance().delete(`${plan.deleteAdvisorRepresentative}/${id}`);
};
export const DeleteAdvisor = (id) => {
  return apiInstance().delete(`${plan.deleteAdvisor}/${id}`);
};

export const TradeOutboundFileGeneration = (data) => {
  return apiInstance().post(`${trade.tradeOutboundFileGeneration}`, data);
};
