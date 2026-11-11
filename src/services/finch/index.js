import apiInstance from "../api";
import { employer } from "@/services/endpoints/integrations";
import { finch } from "@/services/endpoints/integrations";
import { integration } from "@/services/endpoints/integrations";

import fileApiInstance from "../fileApi";

export const userAuthentication = (payload) => {
  return apiInstance().post(`${finch.userAuthentication}`, payload);
};
export const AuthorizeSponsorForFinch = (payload) => {
  return apiInstance().post(`${finch.AuthorizeSponsorForFinch}`, payload);
};
export const getTenantDetails = (companyId) => {
  return apiInstance().get(`${finch.getTenantDetails}/${companyId}`);
};
export const generateDummyData = () => {
  return apiInstance().get(employer.generateDummyData);
};
export const companyDataPull = (id) => {
  return apiInstance().get(`${finch.companyDataPull}/${id}`);
};
export const employeeDataPull = (payload) => {
  return apiInstance().post(`${finch.employeeDataPull}`, payload);
};

export const exportEmployeeVariance = (payload) => {
  return fileApiInstance().post(`${finch.exportEmployeeVariance}`, payload);
};

export const saveFinchCompanyMap = (payload) => {
  return apiInstance().post(`${finch.saveFinchCompanyMap}`, payload);
};

export const submitFinchOnboarding = (payload) => {
  return apiInstance().post(`${finch.submitFinchOnboarding}`, payload);
};

export const getFinchOnboardingDetailsById = (id) => {
  return apiInstance().get(`${finch.getFinchOnboardingDetailsById}/${id}`);
};
export const getIntegrationsListingBySearchCriteria = (payload) => {
  return apiInstance().post(
    `${finch.getIntegrationsListingBySearchCriteria}`,
    payload
  );
};

export const planDataPull = (id) => {
  return apiInstance().get(`${finch.planDataPull}/${id}`);
};

export const saveFinchPlanMap = (payload) => {
  return apiInstance().post(`${finch.saveFinchPlanMap}`, payload);
};
export const getCompanyIntegration = (id) => {
  return apiInstance().get(`${finch.getCompanyIntegration}/${id}`);
};

export const finchFileUploadService = (payload) => {
  return apiInstance().post("/api/v1/FinchMock/employer/UploadFile", payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};
export const getNonFinchCompanyList = (payload) => {
  return apiInstance().post(`${finch.getNonFinchCompanyList}`, payload);
};
export const finchDisconnect = (id) => {
  return apiInstance().get(`${finch.finchDisconnect}/${id}`);
};
export const getEmployeeVariance = (payload) => {
  return apiInstance().post(`${finch.getEmployeeVariance}`, payload);
};
export const checkClassifactionsMapped = (payload) => {
  return apiInstance().post(`${finch.checkClassifactionsMapped}`, payload);
};
export const getDeductionFrequencyType = () => {
  return apiInstance().get(
    `${finch.getDeductionFrequencyType}?deductionTypes=DeductionType&deductionTypes=DeductionFrequency&deductionTypes=Status&deductionTypes=SubType`
  );
};

export const saveDeduction = (payload) => {
  return apiInstance().post(finch.saveDeduction, payload);
};

export const saveEmployeeExclusion = (payload) => {
  return apiInstance().post(`${finch.saveEmployeeExclusion}`, payload);
};

export const getEmployeeExclusionDetails = (FinchCompanyMappingId) => {
  return apiInstance().get(
    `${finch.getEmployeeExclusionDetails}/${FinchCompanyMappingId}`
  );
};

export const savePayrollIntegration = (payload) => {
  return apiInstance().post(`${integration.savePayrollIntegration}`, payload);
};

export const getPayrollIntegration = (companyId) => {
  return apiInstance().get(`${integration.getPayrollIntegration}/${companyId}`);
};
