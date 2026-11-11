export const company = {
  getNotesByEntity: "/api/v1/Note/ByEntity",
  updateNote: "/api/v1/Note",
  postCompanyGridView: "/api/v1/Company/CompaniesGridView",
  getCompany: "/api/v1/Company/Get",
  postCompany: "/api/v1/Company",
  getCompanyIncorporationDetails: "/api/v1/Company/GetIncorporationDetails",
  saveCompanyIncorporationDetails: "/api/v1/Company/AddIncorporationDetails",
  getCompanySettings: "/api/v1/Company/GetSettings",
  addCompanySettings: "/api/v1/Company/AddSettings",
  listCompanyPayrollFrequency: "/api/v1/Company/ListPayrollFrequency",
  getCompanyPayrollFrequency: "/api/v1/Company/GetPayrollFrequency",
  saveCompanyPayrollFrequency: "/api/v1/Company/SavePayrollFrequency",
  deleteCompanyPayrollFrequency: "/api/v1/Company/DeletePayrollFrequency",
  listCompanyPayrollCalendar: "/api/v1/Company/ListPayrollSchedule",
  getCompanyPayrollCalendar: "/api/v1/Company/GetPayrollSchedule",
  saveCompanyPayrollCalendar: "/api/v1/Company/SavePayrollSchedule",
  deleteCompanyPayrollCalendar: "/api/v1/Company/DeletePayrollSchedule",
  getGeneratePayrollSchedule: "/api/v1/Company/GeneratePayrollSchedule",
  getNotificationSwitchHistoryForPayDate:
    "/api/v1/Company/GetNotificationSwitchHistoryForPayDate",
  getCompanyNameCheck: "/api/v1/Company/CheckCompanyNameExists",
  getSponsoringOrganisationNameCheck:
    "/api/v1/Plan/checkSponsoringOrganisationExists",
  getSponsoringOrganisationList: "/api/v1/Company/SponsoringOrganisationList",
  postSponsoringOrganisationList: "/api/v1/Company/SaveSponsoringOrganisation",
  getCompanyCount: "/api/v1/Company/CompanyCount",
  postSponsoringOrganisations: "/api/v1/Company/SponsoringOrganisations",
  postCompaniesGridViewBySponsoringOrganisation:
    "/api/v1/Company/CompaniesGridViewBySponsoringOrganisation",
  getCheckEinNumberExists: "/api/v1/Company/CheckEinNumberExists",
  getCompanyList: "/api/v1/Company/CompanyName",
  getCompanyPaginatedList: "/api/v1/Company/GetCompanyList",
  getMasterClassifications: "/api/v1/Company/GetMasterClassificationType",
  addMasterClassifications: "/api/v1/Company/AddMasterClassificationType",
  checkMasterClassificationExists:
    "/api/v1/Company/CheckMasterClassificationExists",
  getMasterEmploymentStatuses: "/api/v1/Company/GetMasterEmploymentStatuses",
  addMasterEmploymentStatus: "/api/v1/Company/AddMasterEmploymentStatus",
  checkMasterEmploymentStatusExists:
    "/api/v1/Company/CheckMasterEmploymentStatusExists",
  getLoanTypes: "/api/v1/Company/GetMasterLoanTypes",
  getMasterPlanTypes: "/api/v1/Company/GetMasterPlanTypes",
  addMasterLoanType: "/api/v1/Company/AddMasterLoanType",
  uploadCompanyLogo: "/api/v1/Company/AddCompanyLogo",
  getCompanyLogo: "/api/v1/Company/GetCompanyLogo",
  validateClassification: "/api/v1/company/ValidateClassification",
  getClassificationCodesByCompanyId:
    "/api/v1/Company/GetClassificationCodesByCompanyId",
  getRecordKeepers: "api/v1/Company/GetRecordKeepers",
  saveRecordKeepers: "api/v1/Company/SaveRecordKeepers",
  getCompensationCodesByCompanyId: "api/v1/Company/GetCompensationByCompanyId",
};

export const masterData = {
  getCustodians: "/api/v1/MasterData/Custodians",
  getAdvisors: "/api/v1/MasterData/Advisors",
  getTrustees: "/api/v1/MasterData/Trustees",
  getSources: "/api/v1/MasterData/Sources",
  getInvestments: "/api/v1/MasterData/Investments",
  getServiceProviders: "/api/v1/MasterData/ServiceProviders",
};

export const refData = {
  getStates: "/api/v1/State",
};

export const master = {
  getTradingPartner: "/api/v1/Report/GetTradingPartner",
  getTradingPartnerList: "/api/v1/Report/GetTradingPartnerList",
  deleteClearingPartner: "/api/v1/Report/DeleteClearingPartner",
  addClearingPartnerAccountsToPlan:
    "/api/v1/Report/AddClearingPartnerAccountsToPlan",
};
