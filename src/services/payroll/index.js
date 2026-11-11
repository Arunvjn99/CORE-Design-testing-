import apiInstance from "../api";
import fileApiInstance from "../fileApi";
import { payroll } from "@/services/endpoints/payroll";
import { census } from "@/services/endpoints/payroll";
import { ParticipantAnalyticsEndPoints } from "@/services/endpoints/home";
import { plan } from "@/services/endpoints/plan";
import { reports } from "@/services/endpoints/reports";
import { delay } from "../helpers";

//import createAPIInstance from "../api";
export const getRecordUnlock = (id) => {
  return apiInstance().get(`${payroll.recordUnlock}/${1}`);
  // return delay(1000).then(() => {
  //   return {IsSuccessfull:false};
  // });
};

export const getEligibilityInformation = (payload) => {
  // return delay(1000).then(() => {
  //   return eligibilityOverrideData;
  // });
  return apiInstance().get(
    `${census.getEligibilityInformation}/${payload.planId}/${payload.employeeId}`
  );
};

export const getEligibilityHistory = (payload) => {
  // return delay(1000).then(() => {
  //   return eligibilityOverrideData[0].history;
  // });
  return apiInstance().get(
    `${census.getEligibilityHistory}/${payload.planId}/${payload.sourceId}/${payload.employeeId}`
  );
};

export const getErrorAndWarningMetadata = (id) => {
  return apiInstance().get(`${payroll.errorAndWarningMetadata}/${id}`);
};
export const getDeletedEmployeeDetails = (id) => {
  return apiInstance().get(`${payroll.getDeletedEmployeeDetails}/${id}`);
};

export const downloadpreviewfile = (fileUploadId) => {
  return fileApiInstance().get(
    `${payroll.downloadpreviewfile}/${fileUploadId}`
  );
};

export const getParticipantAccountBalanceByPlan = (
  planId,
  participantId,
  date
) => {
  // planId=1&participantId=2
  return apiInstance().get(
    `${payroll.getParticipantAccountBalanceByPlan}?planId=${planId}&participantId=${participantId}&date=${date}`
  );
};
export const getCountsForErrorReportTabs = (payload) => {
  return apiInstance().get(`${payroll.getCountsForErrorReportTabs}/${payload}`);
};

export const getSummaryReport = (payload) => {
  return apiInstance().post(`${census.getEligibilitySummaryReport}`, payload);
};
export const DownloadEligibilitySummaryReport = (payload) => {
  return fileApiInstance().post(
    `${census.downloadEligibilitySummaryReport}`,
    payload
  );
};
export const ParticipantAnalytics = (payload) => {
  return apiInstance().get(
    `${ParticipantAnalyticsEndPoints.participantAnalytics}?selectedPeriod=${payload.SelectedPeriod}&startDate=${payload.startDate}&endDate=${payload.endDate}&informationOn=${payload.informationOn}&employeeId=${payload.employeeId}&groupBy=${payload.groupBy}`
  );
};
export const getDetailReport = (payload) => {
  return apiInstance().post(`${census.getEligibilityDetailReport}`, payload);
};
export const DownloadEligibilityDetailReport = (payload) => {
  return fileApiInstance().post(
    `${census.downloadEligibilityDetailReport}`,
    payload
  );
};
export const getWarningsInECR = (payload) => {
  return apiInstance().post(`${payroll.GetWarningsList}`, payload);
};
export const getErrorsInECR = (payload) => {
  return apiInstance().post(`${payroll.GetErrorList}`, payload);
};
export const getAllRecords = (payload) => {
  return apiInstance().post(`${payroll.getAllRecordsList}`, payload);
};
export const getPayrollDetails = () => {
  return apiInstance().get(plan.getPlanCount);
};

export const postCreatePayroll = (payload) => {
  return apiInstance().post(payroll.createPayroll, payload);
};

export const createPayrollFromUI = (payload) => {
  return apiInstance().post(payroll.createPayrollFromUI, payload);
};

//Manage Payroll
export const getPayrollTileCard = () => {
  return delay(1000).then(() => {
    //  return payrollAndCensusData;
  });
};
export const saveFundingDetails = (payload) => {
  return apiInstance().post(`${payroll.saveFundingDetails}`, payload);
};

export const confirmFunds = (payload) => {
  return apiInstance().post(`${payroll.confirmFunds}`, payload);
};

export const confirmFundsMasterLevel = (payload) => {
  return apiInstance().post(`${payroll.confirmFundsMasterLevel}`, payload);
};

export const ExportHoursSummaryReport = (payload) => {
  return fileApiInstance().post(`${payroll.exportHoursSummaryReport}`, payload);
};

export const saveFundingDetailsByPlan = (payload) => {
  return apiInstance().post(`${payroll.saveFundingDetailsByPlan}`, payload);
};

export const saveFundingDetailsByMultiplePlans = (payload) => {
  return apiInstance().post(
    `${payroll.saveFundingDetailsByMultiplePlans}`,
    payload
  );
};

export const saveFundingByClassificationDetails = (payload) => {
  return apiInstance().post(
    `${payroll.saveFundingByClassificationDetails}`,
    payload
  );
};

export const saveFundingDetailsByFile = (payload) => {
  return apiInstance().post(`${payroll.saveFundingDetailsByFile}`, payload);
};

export const getClassificationDetailsByFileId = (payload) => {
  return apiInstance().get(
    `${payroll.getClassificationDetailsByFileId}/${payload}`
  );
};

export const saveEligibilityInformation = (payload) => {
  return apiInstance().post(`${payroll.saveEligibilityInformation}`, payload);
};

export const getFilesBasedOnSearch = (payload) => {
  return apiInstance().post(`${payroll.getFilesBasedOnSearch}`, payload);
};
export const getIraFilesBasedOnSearch = (payload) => {
  return apiInstance().post(`${payroll.getIraFilesBasedOnSearch}`, payload);
};

export const getPayrollStatus = () => {
  return apiInstance().get(`${payroll.getPayrollStatus}`);
};

export const exportContributionInDepositHistory = (payload) => {
  return fileApiInstance().post(
    `${payroll.exportContributionInDepositHistory}`,
    payload
  );
};
export const exportLoanInDepositHistory = (payload) => {
  return fileApiInstance().post(
    `${payroll.exportLoanInDepositHistory}`,
    payload
  );
};
export const getFilesCountBasedOnSearch = (payload) => {
  return apiInstance().post(`${payroll.getFileUploadCount}`, payload);
};

export const getFilesCountBasedOnSearchIRA = (payload) => {
  return apiInstance().post(`${payroll.getIRAFileUploadCount}`, payload);
};

export const getCorrectAcceptDuplicateEmployee = (payload) => {
  return apiInstance().post(
    `${payroll.getCorrectAcceptDuplicateEmployee}`,
    payload
  );
};

export const getRevalidateFile = (payload) => {
  return apiInstance().post(`${payroll.getRevalidateFile}`, payload);
};

export const getFileInformationByFileId = (fileId) => {
  return apiInstance().get(`${payroll.getFileInformationById}/${fileId}`);
};

export const getDuplicateEmployeeByFileId = (fileId) => {
  return apiInstance().get(`${payroll.getDuplicateEmployeeByFileId}/${fileId}`);
};

export const getDuplicateRecord = (payload) => {
  return apiInstance().post(`${payroll.getDuplicateRecord}`, payload);
};

export const getFileGraphInformationById = (fileId) => {
  return apiInstance().get(`${payroll.getFileGraphInformation}/${fileId}`);
};

export const getPayrollMetaDataDetails = (fileId) => {
  return apiInstance().get(`${payroll.getPayrollMetaDataInfo}/${fileId}`);
};

export const getPayrollEmployeesSSNAndNameByFileId = (fileId) => {
  return apiInstance().get(
    `${payroll.getPayrollEmployeesSSNAndNameByFileId}/${fileId}`
  );
};

export const getTempCreatePayroll = (fileId) => {
  return apiInstance().get(`${payroll.GetTempCreatePayroll}/${fileId}`);
};

export const getPayrollEmployeeDetails = (fileId) => {
  return apiInstance().get(`${payroll.getPayrollEmployeeDetails}/${fileId}`);
};

export const getCreatePayrollInformationByFileId = (
  fileId
  // companyId,
  // payrollFrequencyId
) => {
  return apiInstance().get(
    `${payroll.getCreatePayrollInformationByFileId}/${fileId}`
  );
};
export const downloadCreatePayrolldetail = (employeeData) => {
  return apiInstance().post(payroll.downloadCreatePayrolldetail, employeeData);
};
export const UpdatePayrollEmployee = (employeeData) => {
  return apiInstance().post(
    payroll.UpdatePayrollEmployee,
    JSON.stringify(employeeData)
  );
};

export const addEmployeesForCreatePayroll = (payload) => {
  return apiInstance().post(`${payroll.addEmployeesForCreatePayroll}`, payload);
};

export const submitCreatePayroll = (employeeData) => {
  return apiInstance().post(payroll.submitCreatePayroll, employeeData);
};

// export const postCompanyDetails = (payload) => {
//   return apiInstance().post(payroll.ErrorList, payload);
// };

export const getRecordLock = (id) => {
  return apiInstance().get(`${payroll.recordLock}/${id}`);
  // return delay(1000).then(() => {
  //   return {
  //     IsSuccessfull:true
  //   };
  // });
};

export const clearDataForCreateOrGenerateUpload = (fileUploadId) => {
  return apiInstance().post(
    `${payroll.clearDataForCreateOrGenerateUpload}/${fileUploadId}`
  );
};

export const finalSubmit = (id, fileType) => {
  return apiInstance().get(`${payroll.finalSubmit}/${id}/${fileType}`);
};
export const finalSubmitAndFunding = (id, fileType) => {
  return apiInstance().get(
    `${payroll.finalSubmitAndFunding}/${id}/${fileType}`
  );
};
export const updatePayrollFileStatusByFileId = (id, status) => {
  return apiInstance().post(
    `${payroll.updatePayrollFileStatusByFileId}?FileUploadId=${id}&FileStatus=${status}`
  );
};
export const getEmployerSources = (planId) => {
  return apiInstance().get(`${payroll.getEmployerSources}/${planId}`);
};

export const getComputationalPeriods = (payload) => {
  return apiInstance().get(
    `${payroll.getComputationalPeriods}/${payload.planId}/${payload.sourceId}/${payload.employeeId}`
  );
};
export const submitAndUpdateECR = (payload, fileType) => {
  return apiInstance().post(
    `${payroll.submitAndUpdateTempEmployeeInECR}/${fileType}`,
    payload
  );
};

export const getCompanyPlanPayrollFrequencies = () => {
  return apiInstance().get(payroll.getCompanyPlanPayrollFrequencies);
};

//ECR
//-------------------
export const getRecordDetailsInGetWarningScreen = (payload) => {
  return apiInstance().post(
    `${payroll.getRecordDetailsInGetWarningScreen}`,
    payload
  );
};

export const acceptAllWarningsInaFile = (id) => {
  return apiInstance().post(`${payroll.acceptAllWarningsInaFile}/${id}`);
};

export const acceptAllDataChangeValidationInaFile = (payload) => {
  return apiInstance().post(
    `${payroll.acceptAllDataChangeValidationInaFile}`,
    payload
  );
};

export const acceptEmployeeWarnings = (payload) => {
  return apiInstance().post(`${payroll.acceptEmployeeWarnings}`, payload);
};

export const acceptWarningByMessageCode = (id, messageCode, lookUpIds) => {
  var payload = {
    fileId: parseInt(id),
    messageCode: messageCode,
    lookUpIds: lookUpIds,
  };
  return apiInstance().post(`${payroll.acceptWarningsByMessage}`, payload);
};
export const getSourceDeferral = (id) => {
  return apiInstance().get(`${payroll.getSourceDeferral}/${id}`);
};

export const getAllEmployeeLoans = (planId, employeeId) => {
  return apiInstance().get(
    `${payroll.getAllEmployeeLoans}/${planId}/${employeeId}`
  );
};

//Payroll Funding
//------------------
export const getFundingDetailsByFile = (FileId) => {
  return apiInstance().get(`${payroll.getFundingDetailsByFile}/${FileId}`);
};

export const getFundingDetailsByClassification = (
  FileId,
  ClassificationTypeName,
  IsPayDateWise = false
) => {
  //classificationId
  return apiInstance().get(
    `${payroll.getFundingDetailsByClassification}/${FileId}/${ClassificationTypeName}/${IsPayDateWise}`
  );
};
export const getAwaitingFundingDetailsByPlan = (
  fileId,
  planId,
  payDate,
  showPayDates = false
) => {
  const baseUrl = `${
    payroll.getAwaitingFundingDetailsByPlan
  }/${fileId}/${planId}/${showPayDates ? payDate : 0}`;

  return apiInstance().get(baseUrl);
};

export const getAwaitingFundingDetailsByClassification = (
  fileId,
  planId,
  classificationCodeId,
  payDate,
  showPayDates = false
) => {
  const url = `${
    payroll.getAwaitingFundingDetailsByClassification
  }/${fileId}/${planId}/${classificationCodeId}/${showPayDates ? payDate : 0}`;

  return apiInstance().get(url);
};

export const getFundingDetailByPlan = (FileId, showPayDateLevel = false) => {
  return apiInstance().get(
    `${payroll.getFundingDetailByPlan}/${FileId}/${showPayDateLevel}`
  );
};

export const getMepPepFundingDetailByPlan = (fileId, payload) => {
  return apiInstance().get(
    `${payroll.getMepPepFundingDetailByPlan}/${fileId}`,
    { params: payload }
  );
};

export const getMepPepMasterFundingDetailByFileId = (fileId) => {
  return apiInstance().get(
    `${payroll.getMepPepMasterFundingDetailByFileId}/${fileId}`
  );
};

export const getForfeitureDetailsByFileId = (fileId) =>
  apiInstance().get(`${payroll.getForfeitureDetailsByFileId}/${fileId}`);

export const getCustodianBankDetails = (payload) => {
  return apiInstance().get(
    `${payroll.getCustodianBankDetails}/${payload.planId}/${payload.fileId}`
  );
};

export const getForfeitureDetails = (payload) => {
  const { planId, fileId, classificationCodeId } = payload;
  return apiInstance().get(
    `${payroll.getForfeitureDetails}/${planId}/${fileId}/${classificationCodeId}`
  );
};

export const checkClassificationCanBeDeleted = (typeId) => {
  return apiInstance().get(
    `${payroll.checkClassificationTypePresent}/${typeId}`
  );
};

export const getFundingDetailByDivision = (FileId) => {
  return apiInstance().get(`${payroll.getFundingDetailByDivision}/${FileId}`);
};

export const getFundingTransactionDetailsByClassification = (payload) => {
  const { classificationCodeId, planId, fileId } = payload;
  return apiInstance().get(
    `${payroll.getFundingTransactionDetailsByClassification}/${classificationCodeId}/${planId}/${fileId}`
  );
};

export const getFundingTransactionDetailsByPlan = ({ planId, fileId }) => {
  return apiInstance().get(
    `${payroll.getFundingTransactionDetailsByPlan}/${planId}/${fileId}`
  );
};

export const getFundingTransactionDetailsOfEmployeeInPayrollSubmissionPage = ({
  fileId,
  employeeId,
}) => {
  return apiInstance().get(
    `${payroll.getFundingTransactionDetailsOfEmployeeInPayrollSubmissionPage}/${fileId}/${employeeId}`
  );
};

export const retrievePayrollDetailsByFileId = (FileId) => {
  return apiInstance().get(
    `${payroll.retrievePayrollDetailsByFileId}/${FileId}`
  );
};

export const retrieveBankDetails = (payload) => {
  return apiInstance().get(
    `${payroll.retrieveBankDetails}/${payload?.planId}/${payload?.codeId}`
  );
};

//--------

export const getExistingEmployeeDetails = (companyId) => {
  return apiInstance().get(
    `${payroll.getEmployeeDetailsbycompanyandplan}/${companyId}`
  );
};

export const addEmployeeToPayrollData = (payload) => {
  return apiInstance().get(`${payroll.addEmployeeToPayroll}/${payload}`);
};

export const removeEmployeeFromPayrollData = (id) => {
  return apiInstance().delete(`${payroll.removeEmployeeFromPayroll}/${id}`);
};
export const deleteTempEmployeeById = (id) => {
  return apiInstance().delete(`${payroll.deleteTempEmployeeId}/${id}`);
};
export const getTempEmployeeDetailsforPayroll = (id) => {
  return apiInstance().get(`${payroll.getTempEmployeeDetails}/${id}`);
};

export const saveEmployeeInformationInPayroll = (payload) => {
  return apiInstance().get(`${payroll.updateEmployeeToPayroll}/${payload}`);
};
export const employeeCensusInformation = (id) => {
  return apiInstance().get(`${payroll.getEmpCensusInformation}/${id}`);
};
export const getDataTyeMisMatchErrors = (fileId) => {
  return apiInstance().get(`${payroll.getDataTypeMisMatches}/${fileId}`);
};
export const editContributionDetails = (id) => {
  return apiInstance().get(`${payroll.getTempEmployeeDetailsByssn}/${id}`);
};
export const payrollAndCensusFileUpload = (payload) => {
  return apiInstance().post(payroll.payrollAndCensusFileUpload, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};
export const iraFileUpload = (payload) => {
  return apiInstance().post(payroll.iraFileUpload, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};
export const AddBeneficary = (payload) => {
  return apiInstance().post(`${payroll.AddBeneficary}`, payload);
};
export const tempMappingFileUpload = (payload) => {
  return apiInstance().post(payroll.TempMappingFileUpload, payload);
};

export const deleteUploadedFileById = (id) => {
  return apiInstance().delete(`${payroll.deleteFileById}/${id}`);
};
export const deleteCensusFileById = (id) => {
  return apiInstance().delete(`${payroll.deleteCensusFileById}/${id}`);
};

export const getTempEmployeeDetailsById = (payload) => {
  return apiInstance().get(`${payroll.getTempEmployeeDetailsById}/${payload}`);
};

export const getToleranceValidationMessage = (fileUploadId) => {
  return apiInstance().get(
    `${payroll.getToleranceValidationMessage}/${fileUploadId}`
  );
};
// Payroll Report

export const getFileInformationWithErrorDetailsById = (fileid) => {
  return fileApiInstance().get(
    `${reports.getFileInformationWithErrorDetailsById}/${fileid}`
  );
};

export const getSourceLevelPayrollDetailsById = (fileid) => {
  return fileApiInstance().get(
    `${reports.getSourceLevelPayrollDetailsById}/${fileid}`
  );
};

export const getDataChangeInformation = (fileid, from, count) => {
  return fileApiInstance().get(
    `${reports.getDataChangeInformation}/${fileid}/${from}/${count}`
  );
};

export const getDataOverrideInformation = (fileid, from, count) => {
  return fileApiInstance().get(
    `${reports.getDataOverrideInformation}/${fileid}/${from}/${count}`
  );
};

export const getErrorValidationInformation = (fileid, from, count) => {
  return fileApiInstance().get(
    `${reports.getErrorValidationInformation}/${fileid}/${from}/${count}`
  );
};

export const getPayrollFundingInformation = (fileid) => {
  return fileApiInstance().get(
    `${reports.getPayrollFundingInformation}/${fileid}`
  );
};

export const getDownloadDataChangeReport = (fileid) => {
  return fileApiInstance().get(
    `${reports.getDownloadDataChangeReport}/${fileid}`
  );
};

export const getDownloadDataOverrideReport = (fileid) => {
  return fileApiInstance().get(
    `${reports.getDownloadDataOverrideReport}/${fileid}`
  );
};
export const downloadDeletedEmployeeReport = (payload) => {
  return fileApiInstance(true).get(
    `${payroll.downloadDeletedEmployeeReport}/${payload.fileId}/${payload.fileType}`
  );
};

export const getDownloadErrorValidationReport = (
  fileid,
  timeZoneOffset,
  profileId
) => {
  return fileApiInstance().get(
    `${reports.getDownloadErrorValidationReport}/${fileid}/${timeZoneOffset}/${profileId}`
  );
};

export const getDownloadFundingReport = (fileid) => {
  return fileApiInstance().get(`${reports.getDownloadFundingReport}/${fileid}`);
};

export const getDownloadInputFileReport = (fileid) => {
  return fileApiInstance().get(
    `${payroll.getDownloadUploadedFileReport}/${fileid}`
  );
};

export const getDownloadSubmittedFileReport = (fileid) => {
  return fileApiInstance().get(
    `${payroll.getDownloadSubmittedFileReport}/${fileid}`
  );
};

export const getForfeitureSummaryDetails = () => {
  return apiInstance().get(payroll.getForfeitureSummaryDetails);
};

export const getForfeitureSourceHistoryTransactions = (payload) => {
  return apiInstance().get(
    `${payroll.getForfeitureSourceHistoryTransactions}/${payload.sourceId}/${payload.planId}`
  );
};

export const getDownloadPayrollReport = (payload) => {
  return fileApiInstance().post(payroll.getDownloadPayrollReport, payload);
};

export const getEmployeeCount = () => {
  return apiInstance().get(payroll.getEmployeeCount);
};

export const downloadCompensationReport = (payload) => {
  return fileApiInstance().post(
    `${payroll.downloadCompensationReport}`,
    payload
  );
};

export const getEmployeeContributionAndCompensation = (payload) => {
  return apiInstance().post(
    `${payroll.getEmployeeContributionAndCompensation}`,
    payload
  );
};
export const getEmployeeListByFilter = (payload) => {
  return apiInstance().post(`${payroll.getEmployeeListByFilter}`, payload);
};

export const getPayrollFrequencyBasedOnFileUploadId = (payload) => {
  return apiInstance().post(
    `${payroll.getPayrollFrequencyBasedOnFileUploadId}`,
    payload
  );
};

export const getEmployeeIdBasedOnFileUploadId = (payload) => {
  return apiInstance().post(
    `${payroll.getEmployeeIdBasedOnFileUploadId}`,
    payload
  );
};

export const regenerateOutputFile = (payload) => {
  return apiInstance().post(`${payroll.OutputFileRegenerate}`, payload);
};
export const addNotesPayroll = (payload) => {
  return apiInstance().post(`${payroll.addNotes}`, payload);
};
export const getNotesPayroll = ({ id, entityType }) => {
  return apiInstance().get(`${payroll.getNotes}/${id}/${entityType}`);
};
export const getEmployeeMissingRecords = (fileId) => {
  return apiInstance().get(`${payroll.getEmployeeMissingRecords}/${fileId}`);
};
export const downloadMapperTemplateFile = (mapperTemplateId) => {
  return fileApiInstance(true).get(
    `${payroll.getMapperTemplateFile}/${mapperTemplateId}`
  );
};

export const getFileStatusByEmployeeId = (id) => {
  return apiInstance().get(`${payroll.getFileStatusByEmployeeId}/${id}`);
};

//Payroll File Lock
export const getFileLockInfo = (fileId) => {
  return apiInstance().get(`${payroll.getFileLockInfo}/${fileId}`);
};

export const updateFileLockInformation = (payload) => {
  return apiInstance().post(`${payroll.updateFileLockInformation}`, payload);
};

//get employee disabled error log id for classification based user.

export const getDisabledErrorLogIdForUser = (id) => {
  return apiInstance().get(`${payroll.getDisabledErrorLogIdForUser}/${id}`);
};

export const getAllErrorAndWarningRecords = (payload) => {
  return apiInstance().post(`${payroll.getAllErrorAndWarningRecordsList}`, {
    fileId: payload,
  });
};

export const getEmployeesTempLoanDetailsForPayroll = (payload) => {
  return apiInstance().post(
    `${payroll.getEmployeesTempLoanDetailsForPayroll}`,
    payload
  );
};

export const SaveTempPayrollLoans = (payload) => {
  return apiInstance().post(`${payroll.SaveTempPayrollLoans}`, payload);
};
