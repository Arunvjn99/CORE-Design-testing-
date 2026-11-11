export const integration = {
  getPlanListWithAppliedFilterForIntegration:
    "/api/v1/AlfrescoIntegration/GetPlanListWithAppliedFilterForIntegration",
  ReAuthorizeForFinch: "/api/v1/Finch/ReAuthorizeForFinch",
  getIntegrationConnection:
    "/api/v1/AlfrescoIntegration/GetIntegrationConnection",
  checkFTWConnection: "/api/v1/AlfrescoIntegration/CheckFTWConnection",
  savePlanGroup: "/api/v1/AlfrescoIntegration/SavePlanGroup",
  getPlanGroupDetails: "/api/v1/AlfrescoIntegration/GetPlanGroupDetails",
  getFTWPlansList: "/api/v1/AlfrescoIntegration/GetFTWPlansList",
  deletePlanGroupId: "/api/v1/AlfrescoIntegration/DeletePlanGroup",
  getIntegrationDetailsById:
    "/api/v1/AlfrescoIntegration/GetIntegrationDetailsById",
  getIntegrationWithPlanAndCompany:
    "/api/v1/AlfrescoIntegration/GetIntegrationWithPlanAndCompany",
  getPlanDetailsBasedOnPlanGroup:
    "/api/v1/AlfrescoIntegration/GetPlanDetailsBasedOnPlanGroup",
  saveFTWPlanList: "/api/v1/AlfrescoIntegration/SaveFTWPlanList",
  resaveFTWPlan: "/api/v1/AlfrescoIntegration/ResaveFTWPlan",
  getPlansCount: "/api/v1/AlfrescoIntegration/GetPlansCount",
  savePayrollIntegration: "/api/v1/AlfrescoIntegration/SavePayrollIntegration",
  getPayrollIntegration: "/api/v1/AlfrescoIntegration/GetPayrollIntegration",
};

export const finch = {
  userAuthentication: "/api/v1/Finch/UserAuthentication",
  AuthorizeSponsorForFinch: "/api/v1/Finch/AuthorizeSponsorForFinch",
  getTenantDetails: "/api/v1/Finch/getTenantDetails",
  companyDataPull: "/api/v1/Finch/CompanyDataPull",
  employeeDataPull: "/api/v1/Finch/EmployeeDataPull",
  getIntegrationsListingBySearchCriteria:
    "/api/v1/Finch/GetIntegrationsListingBySearchCriteria",
  saveFinchCompanyMap: "/api/v1/Finch/SaveFinchCompanyMap",
  submitFinchOnboarding: "/api/v1/Finch/SubmitFinchOnboarding",
  getFinchOnboardingDetailsById: "/api/v1/Finch/GetFinchOnboardingDetailsById",
  getCompanyIntegration: "/api/v1/Finch/GetCompanyIntegration",
  planDataPull: "/api/v1/Finch/PlanDataPull",
  saveFinchPlanMap: "/api/v1/Finch/SaveFinchPlanMap",
  getNonFinchCompanyList: "/api/v1/Finch/GetNonFinchCompanyList",
  finchDisconnect: "/api/v1/Finch/FinchDisconnect",
  getEmployeeVariance: "/api/v1/Finch/GetEmployeeVariance",
  checkClassifactionsMapped: "/api/v1/Finch/CheckClassifactionsMapped",
  exportEmployeeVariance: "/api/v1/Finch/ExportEmployeeVariance",
  getDeductionFrequencyType: "/api/v1/Finch/GetDeductionFrequencyType",
  saveDeduction: "/api/v1/Finch/SaveDeduction",
  saveEmployeeExclusion: "/api/v1/Finch/SaveEmployeeExclusion",
  getEmployeeExclusionDetails: "/api/v1/Finch/GetEmployeeExclusionDetails",
};

export const enrich = {
  saveEnrichForCompany: "/api/v1/EnrichIntegration/SaveEnrichForCompany",
  getEnrichForCompany: "/api/v1/EnrichIntegration/GetEnrichCompanyIntegration",
  getEnrichTenantIntegration:
    "/api/v1/EnrichIntegration/GetEnrichTenantIntegration",
};

export const employer = {
  generateDummyData: "/api/v1/FinchMock/employer/generateDummyData",
};
export const managedAccount = {
  getServiceProviderPlanMapping:
    "/api/ManagedAccount/GetServiceProviderPlanMapping",
  saveServiceProviderPlanMapping:
    "/api/ManagedAccount/SaveServiceProviderPlanMapping",
};
