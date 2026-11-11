import apiInstance from "../api";
import { company } from "@/services/endpoints/company";
import { plan } from "@/services/endpoints/plan";
import { ENTITY_TYPES } from "@/utils/constants/common";

// import manageCompanyDetails from "../../mocks/manageCompanyDetails.json";

export const getCompanyNotes = async (companyId) => {
  return apiInstance().get(
    `${company.getNotesByEntity}/${ENTITY_TYPES.Company}/${companyId}`
  );
};

export const createCompanyNote = (payload) => {
  return apiInstance().post(company.updateNote, payload);
};

export const updateCompanyNote = (payload) => {
  return apiInstance().put(company.updateNote, payload);
};

export const deleteCompanyNote = (id) => {
  return apiInstance().delete(`${company.updateNote}/${id}`);
};

export const postCompanyGridView7 = (payload) => {
  return apiInstance().post(`${company.postCompanyGridView}`, payload);
};

export const getCompanyDetails = (id) => {
  return apiInstance().get(`${company.getCompany}/${id}`);
};
export const getCompanyIncorporationDetails = (id) => {
  return apiInstance().get(`${company.getCompanyIncorporationDetails}/${id}`);
};
export const getCompanySettings = (id) => {
  return apiInstance().get(`${company.getCompanySettings}/${id}`);
};
export const addCompanySettings = (payload) => {
  return apiInstance().post(`${company.addCompanySettings}`, payload);
};
export const listCompanyPayrollFrequency = (companyId) => {
  return apiInstance().get(
    `${company.listCompanyPayrollFrequency}/${companyId}`
  );
};
export const getCompanyPayrollFrequency = (payrollFrequencyId) => {
  return apiInstance().get(
    `${company.getCompanyPayrollFrequency}/${payrollFrequencyId}`
  );
};

export const saveCompanyPayrollFrequency = (payload) => {
  return apiInstance().post(`${company.saveCompanyPayrollFrequency}`, payload);
};

export const deleteCompanyPayrollFrequency = (payrollFrequencyId) => {
  return apiInstance().delete(
    `${company.deleteCompanyPayrollFrequency}/${payrollFrequencyId}`
  );
};

export const listCompanyPayrollCalendar = (companyId) => {
  return apiInstance().get(
    `${company.listCompanyPayrollCalendar}/${companyId}`
  );
};
export const getCompanyPayrollCalendar = (payrollCalendarId) => {
  return apiInstance().get(
    `${company.getCompanyPayrollCalendar}/${payrollCalendarId}`
  );
};

export const saveCompanyPayrollCalendar = (payload) => {
  return apiInstance().post(`${company.saveCompanyPayrollCalendar}`, payload);
};

export const deleteCompanyPayrollCalendar = (payrollCalendarId) => {
  return apiInstance().delete(
    `${company.deleteCompanyPayrollCalendar}/${payrollCalendarId}`
  );
};

export const getNotificationSwitchHistoryForPayDate = (id) => {
  return apiInstance().get(
    `${company.getNotificationSwitchHistoryForPayDate}/${id}`
  );
};

export const getCalculationSuspensionHistory = (sourceId, sourceCategory) => {
  return apiInstance().get(
    `${plan.getCalculationSuspensionHistory}/${sourceId}/${sourceCategory}`
  );
};

export const getMasterClassificationTypes = (companyId) => {
  return apiInstance().get(`${company.getMasterClassifications}/${companyId}`);
};
export const addMasterClassificationTypes = (payload) => {
  return apiInstance().post(`${company.addMasterClassifications}`, payload);
};
export const checkMasterClassificationExists = (payload) => {
  return apiInstance().get(
    `${company.checkMasterClassificationExists}/${payload}`
  );
};
export const getMasterEmploymentStatuses = (companyId) => {
  return apiInstance().get(
    `${company.getMasterEmploymentStatuses}/${companyId}`
  );
};
export const addMasterEmploymentStatus = (payload) => {
  return apiInstance().post(`${company.addMasterEmploymentStatus}`, payload);
};
export const checkMasterEmploymentStatusExists = (payload) => {
  return apiInstance().get(
    `${company.checkMasterEmploymentStatusExists}/${payload}`
  );
};
export const getGeneratePayrollSchedule = (payload) => {
  return apiInstance().post(`${company.getGeneratePayrollSchedule}`, payload);
};

export const postCompanyDetails = (payload) => {
  return apiInstance().post(company.postCompany, payload);
};

export const saveCompanyIncorporationDetails = (payload) => {
  return apiInstance().post(company.saveCompanyIncorporationDetails, payload);
};

export const getCheckCompanyNameExists = (payload) => {
  return apiInstance().get(`${company.getCompanyNameCheck}/${payload}`);
};

export const getCheckIfSponsoringOrganisationNameExists = (payload) => {
  return apiInstance().get(
    `${company.getSponsoringOrganisationNameCheck}/${payload}`
  );
};

export const getSponsoringOrganisationList = () => {
  return apiInstance().get(`${company.getSponsoringOrganisationList}`);
};

export const postSponsoringOrganisationList = (payload) => {
  return apiInstance()
    .post(`${company.postSponsoringOrganisationList}`, payload)
    .then(() => getSponsoringOrganisationList());
};

export const getCompanyCount = () => {
  return apiInstance().get(`${company.getCompanyCount}`);
};

export const postSponsoringOrganisations = (payload) => {
  return apiInstance().post(`${company.postSponsoringOrganisations}`, payload);
};

export const postCompaniesGridViewBySponsoringOrganisation = (payload) => {
  return apiInstance().post(
    `${company.postCompaniesGridViewBySponsoringOrganisation}`,
    payload
  );
};

export const getCheckEinNumberExists = (payload) => {
  return apiInstance().get(`${company.getCheckEinNumberExists}/${payload}`);
};

export const getLoanTypes = (companyId = 0) => {
  return apiInstance().get(`${company.getLoanTypes}/${companyId}`);
};

export const addLoanType = (payload) => {
  return apiInstance().post(`${company.addMasterLoanType}`, payload);
};

export const getMasterPlanTypes = () => {
  return apiInstance().get(company.getMasterPlanTypes);
};

export const uploadCompanyLogo = (payload) => {
  return apiInstance().post(company.uploadCompanyLogo, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const getCompanyLogo = (companyId) => {
  return apiInstance().get(`${company.getCompanyLogo}/${companyId}`);
};

export const getValidation = (payload) => {
  return apiInstance().get(
    `${company.validateClassification}/${payload.id}/${payload.typeId}`
  );
};
// export const checkLoanTypeExists = (payload) => {
//   return apiInstance().get(`${company.checkMasterLoanTypeExists}/${payload.name}/${payload.companyId}`);
// };
export const getClassificationCodesByCompanyId = (id) => {
  return apiInstance().get(
    `${company.getClassificationCodesByCompanyId}/${id}`
  );
};
export const GetRecordKeepers = () => {
  return apiInstance().get(`${company.getRecordKeepers}`);
};

export const SaveRecordKeepers = (name) => {
  return apiInstance().post(company.saveRecordKeepers, name);
};

export const GetMasterSourceNames = (payload) => {
  return apiInstance().post(plan.GetMasterSourceNames, payload);
};

export const SaveMasterSourceName = (payload) => {
  return apiInstance().post(plan.SaveMasterSourceName, payload);
};

export const getCompensationCodeByCompanyId = (id) => {
  return apiInstance().get(`${company.getCompensationCodesByCompanyId}/${id}`);
};
