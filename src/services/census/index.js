// import apiInstance from "../api";
// import endPoints from "../endpoints";
import { delay } from "../helpers";
import getCensus from "../../mocks/CensusEmployeeInformation.json";
//import company from "../../mocks/company.json";
import masterAssociatedPlan from "../../mocks/masterAssociatedPlan.json";
import apiInstance from "../api";
import { census, qdro } from "@/services/endpoints/payroll";
import { company } from "@/services/endpoints/company";
import { payroll } from "@/services/endpoints/payroll";
import { plan } from "@/services/endpoints/plan";
import { transactions } from "@/services/endpoints/transactions";

import fileApiInstance from "../fileApi";

export const getCensusDetails = () => {
  // return apiInstance().get(plan.get);
  return delay(1000).then(() => {
    return getCensus;
  });
};

export const getManageEmployeeMaster = (payload) => {
  // return delay(1000).then(() => {
  //   return manageEmployee;
  // });
  return apiInstance().post(census.getEmployeesBySearchCriteria, payload);
};
export const getIraManageEmployeeMaster = (payload) => {
  return apiInstance().post(census.getIraEmployeesBySearchCriteria, payload);
};
export const getFileErrorLogDetails = (requestId) => {
  return apiInstance().get(`${payroll.getFileErrorLogDetails}/${requestId}`);
  // return [
  //   {
  //     rowNumber: "0",
  //     columnName: "MISSING EMPLOYEE",
  //     errorMessage: "John B Smith : 123225555",
  //     fileUploadedBy: "admin1@cspl.com",
  //     userRole: "Admin",
  //   },
  //   {
  //     rowNumber: "0",
  //     columnName: "MISSING EMPLOYEE",
  //     errorMessage: "suma  C : 234567889",
  //     fileUploadedBy: "admin1@cspl.com",
  //     userRole: "Admin",
  //   },
  //   {
  //     rowNumber: "0",
  //     columnName: "MISSING EMPLOYEE",
  //     errorMessage: "Terney L Yosuf : 544220001",
  //     fileUploadedBy: "admin1@cspl.com",
  //     userRole: "Admin",
  //   },
  //   {
  //     rowNumber: "0",
  //     columnName: "MISSING EMPLOYEE",
  //     errorMessage: "Idarts  User : 983825318",
  //     fileUploadedBy: "admin1@cspl.com",
  //     userRole: "Admin",
  //   },
  // ];
};

export const getEmployeeManagePlans = (empId) => {
  // return delay(1000).then(() => {
  //   return employeeManagePlans;
  // });
  return apiInstance().get(`${census.getEnrolledPlans}/${empId}`);
};
export const getIraEmployeeManagePlans = (empId) => {
  // return delay(1000).then(() => {
  //   return employeeManagePlans;
  // });
  return apiInstance().get(`${census.getIRAEnrolledPlans}/${empId}`);
};

export const getMaritalStatuses = () => {
  return apiInstance().get(`${census.getMaritalStatuses}`);
};
export const getAdditionAddressByIRANumber = (empId) => {
  return apiInstance().get(`${census.getAdditionAddressByIRANumber}/${empId}`);
};

export const getPlansCompensation = (payload) => {
  return apiInstance().post(census.getEmployeeCompensation, payload);
  // return delay(1000).then(() => {
  //   return compensationMaster;
  // });
};

export const getPlansHours = (payload) => {
  // return delay(1000).then(() => {
  //   return hoursMaster;
  // });
  return apiInstance().post(census.getHoursDetails, payload);
};

export const getPlansLoanRepayments = (payload) => {
  return apiInstance().post(census.getEmployeeLoanRepayments, payload);
};

export const getPlansEmployeeClassificationHistory = (payload) => {
  // return delay(1000).then(() => {
  //   return employeeClassificationHistory;
  // });
  return apiInstance().get(
    `${census.getEmployeeClassificationHistory}/${payload.employeeId}/${payload.classificationTypeId}`
  );
};

export const deleteExistingEmployee = (id) => {
  // return delay(1000).then(() => {
  //   return true;
  // });
  return apiInstance().delete(`${census.deleteExistingEmployee}/${id}`);
};

export const getPlansContributions = (payload) => {
  //   return delay(1000).then(() => {
  //   return censusContributionsMaster;
  // });
  return apiInstance().post(census.getEmployeeContribution, payload);
};

export const getEmployeePlanSources = (payload) => {
  return apiInstance().get(
    `${census.getEmployeePlanSources}/${payload.companyId}/${payload.planId}`
  );
};

export const getCensusHistory = (payload) => {
  return apiInstance().post(census.getCensusHistory, payload);
};

export const getMasterAssociatedMEPs = () => {
  return delay(1000).then(() => {
    return masterAssociatedPlan;
  });
};

export const getSourceLevelContribution = (payload) => {
  return apiInstance().post(census.getSourceLevelContribution, payload);
  // return apiInstance().get(
  //   `${census.getSourceLevelContribution}/${payload.planId}/${payload.employeeId}/${payload.payDate}`
  // );
};

export const getSourceDeferral1 = (payload) => {
  return apiInstance().get(
    `${census.getSourceDeferral}/${payload.planId}/${payload.employeeId}`
    // `${census.getSourceDeferral}/${payload.planId}/${payload.employeeId}`
  );
};

export const getAllEmployeeLoans1 = (payload) => {
  return apiInstance().get(
    `${census.getAllEmployeeLoans}/${payload.planId}/${payload.employeeId}`
  );
};

export const getPlanMetaData = (id) => {
  return apiInstance().get(`${census.getPlanMetaData}/${id}`);
};
export const getIRAAccountByIRANumber = (id) => {
  return apiInstance().get(`${payroll.getIRAAccountByIRANumber}/${id}`);
};

export const getEmploymentStatusList = (id) => {
  // return delay(1000).then(() => {
  //   return employeeStatus;
  // });
  return apiInstance().get(`${census.getEmploymentStatusList}/${id}`);
};

export const getCompaniesList = (payload) => {
  const {
    companyId = 0,
    pageNumber = 0,
    pageSize = 0,
    searchText = "",
    isCensusAndPayrollGenerationRequired = false,
  } = payload || {};

  return apiInstance().post(company.getCompanyPaginatedList, {
    id: companyId,
    pageNumber,
    pageSize,
    searchText,
    isCensusAndPayrollGenerationRequired,
  });
};

export const getPlanList = (payload = {}) => {
  const {
    companyId,
    pageNumber = 0,
    pageSize = 0,
    searchText,
    canExcludeDefaultPlanStatus = false,
    planStatuses,
  } = payload;

  return apiInstance().post(plan.getPaginatedPlan, {
    id: companyId ?? 0,
    pageNumber,
    pageSize,
    searchText: searchText ?? "",
    canExcludeDefaultPlanStatus,
    planStatuses,
  });
};

export const getValidPlanList = (id) => {
  return apiInstance().get(`${plan.getValidPlanList}/${id}`);
};

export const getPayrollFrequencyConfiguration = () => {
  return apiInstance().get(`${payroll.getPayrollFrequencyConfiguration}`);
};

export const getPayrollFrequencyByPlan = (id) => {
  return apiInstance().get(`${payroll.getFrequencyByPlanId}/${id}`);
};

export const addEmployeeContribution = (payload) => {
  return apiInstance().post(census.addEmployeeContribution, payload);
};
export const loanRefinance = (payload) => {
  return apiInstance().post(transactions.loanRefinance, payload);
};
export const getRefinancingPaymentConfig = (participantId, loanId) => {
  return apiInstance().get(
    `${transactions.getRefinancingPaymentConfig}/${participantId}/${loanId}`
  );
};
export const loanSuspension = (payload) => {
  return apiInstance().post(transactions.loanSuspension, payload);
};

export const ResumeSuspendedLoan = (payload) => {
  return apiInstance().post(transactions.resumeSuspendedLoan, payload);
};

export const DownloadloanRepaymentSchedule = (payload) => {
  return fileApiInstance().post(
    transactions.downloadloanRepaymentSchedule,
    payload
  );
};

export const DownloadloanAmortizationSchedule = (payload) => {
  return fileApiInstance().post(
    transactions.downloadloanAmortizationSchedule,
    payload
  );
};

export const addEmployeeCompensation = (payload) => {
  return apiInstance().post(census.addEmployeeCompensation, payload);
};

export const addHoursDetail = (payload) => {
  return apiInstance().post(census.addHoursDetail, payload);
};

export const saveEmployeeToPayroll = (payload) => {
  return apiInstance().post(census.saveEmployeeToPayroll, payload);
};

export const updateEmployeePayroll = (payload) => {
  return apiInstance().post(census.updateEmployeeToPayroll, payload);
};

export const captureQdro = (payload) => {
  return apiInstance().post(qdro.captureQdro, payload);
};

export const updateQdro = (payload) => {
  return apiInstance().post(qdro.updateQdro, payload);
};

export const getQdroRecordId = (employeeId) => {
  return apiInstance().get(`${qdro.getQdroRecordId}?employeeId=${employeeId}`);
};

export const showQdroMenu = (employeeId) => {
  return apiInstance().get(`${qdro.showQdroMenu}?employeeId=${employeeId}`);
};

export const getQdroDetailsByEmployeeId = (employeeId) => {
  return apiInstance().get(
    `${qdro.getQdroDetailsByEmployeeId}?employeeId=${employeeId}`
  );
};

export const applyQdroTransactionFreezeForAdmin = (employeeId) => {
  return apiInstance().get(
    `${qdro.applyQdroTransactionFreezeForAdmin}?employeeId=${employeeId}`
  );
};

export const getQdroHistoryDetailsByRecordId = (recordId) => {
  return apiInstance().get(
    `${qdro.getQDROHistoryDetailsByRecordId}?recordId=${recordId}`
  );
};

export const getEmployeeCensusInformation = (id) => {
  // return delay(1000).then(() => {
  //   return censusMasterData[0];
  // });
  return apiInstance().get(`${census.getEmployee}/${id}`);
};
export const getIraEmployeeCensusInformation = (id) => {
  // return delay(1000).then(() => {
  //   return censusMasterData[0];
  // });
  return apiInstance().get(`${census.getIraEmployee}/${id}`);
};
export const GetCompanyAddress = (companyid) => {
  return apiInstance().get(`${census.GetCompanyAddress}/${companyid}`);
};
export const getEmployeeClassificationName = (id) => {
  // return delay (1000).then(() => {
  //   return company;
  // });
  return apiInstance().get(`${census.getEmployeeClassificationName}/${id}`);
};

export const getEmployeeClassificationType = (id) => {
  return apiInstance().get(`${census.getEmployeeClassificationType}/${id}`);
};
export const getClassificationDetailsByFileId1 = (id) => {
  return apiInstance().get(`${census.getClassificationDetailsByFileId}/${id}`);
};
export const getEmployeeRehireDetails = (id) => {
  return apiInstance().get(`${census.getEmployeeRehireDetails}/${id}`);
};

export const getPayrollFrequencies = (id) => {
  return apiInstance().get(`${census.getPayrollFrequencies}/${id}`);
};

export const getCountriesList = () => {
  return apiInstance().get(`${census.getCountiesList}`);
};

export const getStatesList = (id) => {
  return apiInstance().get(`${census.getStatesList}/${id}`);
};

export const uploadEmployeeLogo = (payload) => {
  return apiInstance().post(census.uploadEmployeeLogo, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const getEmployeeImage = (employeeId) => {
  return apiInstance().get(`${census.getEmployeeImage}/${employeeId}`);
};

export const getBeneficiaryDetailsByEmployeeId = (employeeId) => {
  return apiInstance().get(
    `${census.getBeneficiaryDetailsByEmployeeId}/${employeeId}`
  );
};

export const getBeneficiaryDetailsById = (id) => {
  return apiInstance().get(`${census.getBeneficiaryDetailsById}/${id}`);
};

export const getAlternatePayeesByEmployeeId = (employeeId) => {
  return apiInstance().get(
    `${census.getAlternatePayeesByEmployeeId}/${employeeId}`
  );
};

export const saveAlternatePayee = (payload) => {
  return apiInstance().post(census.saveAlternatePayee, payload);
};

export const convertAlternatePayeeToNPE = (payload) => {
  return apiInstance().post(census.convertAlternatePayeeToNPE, payload);
};

export const getPlanDetailsByEmployeeId = (id) => {
  return apiInstance().get(`${census.getPlanDetailsByEmployeeId}/${id}`);
};

export const getPlansForRebalanceRequestForEmployeeId = (id) => {
  return apiInstance().get(
    `${census.getPlansForRebalanceRequestForEmployeeId}/${id}`
  );
};

export const getSourceAndInvestmentAgainstSourceByPlanId = (id, employeeId) => {
  return apiInstance().get(
    `${census.getSourceAndInvestmentDetailsAgainstSourceByPlanId}/${id}/${employeeId}`
  );
};
export const editBeneficiaryPercentage = (beneficiaryInformation) => {
  return apiInstance().post(
    census.editBeneficiaryPercentage,
    beneficiaryInformation
  );
};

export const getEligibleEmployerContribution = (payload) => {
  return apiInstance().post(census.getEligibleEmployerContribution, payload);
};

export const getEmployeePayPeriodCompensation = (planId, employeeId) => {
  return apiInstance().get(
    `${census.getEmployeePayPeriodCompensation}/${planId}/${employeeId}`
  );
};

export const getEmployeeInvestmentsRor = (
  participantId,
  planId,
  investmentId,
  startDate,
  endDate
) => {
  let url = `${census.getEmployeeInvestmentsRor}?participantId=${participantId}&planId=${planId}&endDate=${endDate}`;

  if (investmentId !== null) {
    url += `&investmentId=${investmentId}`;
  }
  if (startDate !== null) {
    url += `&startDate=${startDate}`;
  }

  return apiInstance().get(url);
};

export const generateDisclosure = (payload) => {
  return apiInstance().post(census.generateDisclosure, payload);
};

export const checkOptionalFields = () => {
  return apiInstance().get(`${census.checkOptionalFields}`);
};

export const getPayrollConfigurations = (payload) => {
  return apiInstance().get(payroll.getPayrollConfigurations);
};

export const UpdateEmployeeHPIDetails = (payload) => {
  return apiInstance().post(census.updateEmployeeHPIDetails, payload);
};

export const sourceListForManualRun = (payload) => {
  return apiInstance().get(
    `${census.sourceListForManualRun}/${payload.planId}`
  );
};

export const getShowQDROMenu = (employeeId) => {
  return apiInstance().get(`${census.showQDROMenu}?employeeId=${employeeId}`);
};
