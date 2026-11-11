export const enrollment = {
  getPlanSourceInformation: "/api/v1/Enrollment/RetrievePlanSourceInformation",
  getPlanInvestments: "api/v1/Enrollment/GetPlanInvestments",
  postDefaultElectionSetting: "/api/v1/Enrollment/SaveDefaultElectionSetting",
  postPlanInvestment: "/api/v1/Enrollment/AddPlanInvestment",
  postADIApplicableConfiguration:
    "/api/v1/Enrollment/SaveADIApplicableConfiguration",
  getDefaultElectionSetting:
    "/api/v1/Enrollment/GetDefaultElectionSettingIfExists",
  deleteInvestment: "/api/v1/Enrollment/DeleteInvestment",
  getADIApplicableConfiguration: "/api/v1/Enrollment/RetrieveADIDataIfExists",
  saveAutoEnrollment: "/api/v1/Enrollment/SaveAutoEnrollment",
  getAutoEnrollment: "/api/v1/Enrollment/GetAutoEnrollment",
  getEmployeeClassification:
    "/api/Enrollment/GetEmployeeClassificationAndEmploymentStatus",
  saveAdditionalAutoEnrollment:
    "/api/v1/Enrollment/SaveAdditionalAutoEnrollment",
  retrieveAdditionalAutoEnrollmentIfExists:
    "/api/v1/Enrollment/RetrieveAdditionalAutoEnrollmentIfExists",
  AutoEnrollmentGeneration: "/api/v1/Enrollment/AutoEnrollmentGeneration",
  EnrollmentSummaryReport: "/api/v1/Enrollment/EnrollmentSummaryReport",
  ParticipantwiseReport: "/api/v1/Enrollment/ParticipantwiseReport",
  CompanyanddPlanWiseEnrollmentReport:
    "/api/v1/Enrollment/CompanyanddPlanWiseEnrollmentReport",
  GetEnrollment: "/api/v1/Enrollment/GetEnrollment",
  SaveEnrollment: "/api/v1/Enrollment/SaveEnrollment",
  OptOutPlan: "/api/v1/Enrollment/OptOutPlan",
  GetEmployeePlanElectionHistory:
    "/api/v1/Enrollment/GetEmployeePlanElectionHistory",
  exportEnrollmentSummaryReport:
    "/api/v1/Enrollment/ExportEnrollmentSummaryReport",
  exportParticipantwiseReport: "/api/v1/Enrollment/ExportParticipantwiseReport",
};

export const eligibility = {
  runEligibility: "/api/v1/Eligibility/RunManualEligibility",
};
