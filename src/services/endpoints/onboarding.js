export const onboarding = {
  getPipelineById: "/api/v1/PlanConversion/Get",
  getPipelineList: "/api/v1/PlanConversion/ListPipeline",
  deletePipelineById: "/api/v1/PlanConversion/Delete",
  postPipeline: "/api/v1/PlanConversion/AddPipeline",
  getProfileById: "/api/Mapping/GetProfileNamesByDataModel",
  addPipelineRun: "/api/v1/PlanConversion/AddPipelineRun",
  getPipelineGridView: "/api/v1/PlanConversion/GetPipelineGridView",
  getPipelineRun: "/api/v1/PlanConversion/GetPipelineRun",
  PlanConversionFinalSubmit: "/api/v1/PlanConversion/PlanConversionFinalSubmit",
  postCompanyGridView: "/api/v1/Company/CompaniesGridView",
  getCompany: "api/v1/PlanConversionCompany/Get",
  postCompany: "/api/v1/PlanConversionCompany",
  getGeneratePayrollSchedule:
    "/api/v1/PlanConversionCompany/GeneratePayrollSchedule",
  getNotificationSwitchHistoryForPayDate:
    "/api/v1/PlanConversionCompany/GetNotificationSwitchHistoryForPayDate",
  // getCompany: "/api/v1/Company/fetch",
  // postCompany: "/api/v1/Company/save",
  getCompanyNameCheck: "/api/v1/PlanConversionCompany/CheckCompanyNameExists",
  getSponsoringOrganisationNameCheck:
    "/api/v1/Plan/checkSponsoringOrganisationExists",
  getSponsoringOrganisationList:
    "/api/v1/Onboarding/SponsoringOrganisationList",
  postSponsoringOrganisationList:
    "/api/v1/Onboarding/SaveSponsoringOrganisation",
  getCompanyCount: "/api/v1/PlanConversionCompany/CompanyCount",
  postSponsoringOrganisations: "/api/v1/Plan/SponsoringOrganisations",
  postCompaniesGridViewBySponsoringOrganisation:
    "/api/v1/Onboarding/CompaniesGridViewBySponsoringOrganisation",
  getCheckEinNumberExists: "/api/v1/PlanConversionCompany/CheckEinNumberExists",
  getCompanyList: "/api/v1/PlanConversionCompany/CompanyName",
  getMasterClassifications:
    "/api/v1/PlanConversionCompany/GetMasterClassificationType",
  addMasterClassifications:
    "/api/v1/PlanConversionCompany/AddMasterClassificationType",
  checkMasterClassificationExists:
    "/api/v1/PlanConversionCompany/CheckMasterClassificationExists",
  getMasterEmploymentStatuses:
    "/api/v1/PlanConversionCompany/GetMasterEmploymentStatuses",
  addMasterEmploymentStatus:
    "/api/v1/PlanConversionCompany/AddMasterEmploymentStatus",
  checkMasterEmploymentStatusExists:
    "/api/v1/PlanConversionCompany/CheckMasterEmploymentStatusExists",
  getLoanTypes: "/api/v1/PlanConversionCompany/GetMasterLoanTypes",
  addMasterLoanType: "/api/v1/PlanConversionCompany/AddMasterLoanType",
  uploadCompanyLogo: "/api/v1/PlanConversionCompany/AddCompanyLogo",
  getCompanyLogo: "/api/v1/PlanConversionCompany/GetCompanyLogo",
  validateClassification: "/api/v1/Onboarding/ValidateClassification",
  pipelineFileUpload: "/api/v1/PlanConversion/PipelineFileUpload",
  getCompanyCardDetails: "/api/v1/PlanConversion/GetCompanyCardDetails",
  getPlanCardDetails: "/api/v1/PlanConversion/GetPlanCardDetails",
  pipelineFinalSubmit: "/api/v1/PlanConversion/PlanConversionFinalSubmit",
  postPlanConversionDocument: "api/v1/Plan/PlanConversionFileUpload",
  participantOptOutCommunication: "api/v1/Plan/ParticipantOptOutCommunication",
  getInvestmentDataList: "/api/v1/Investment/GetInvestmentDataList",
  getRestrictionEditHistory: "/api/Investment/GetEditRestrictionHistory",
};

export const onboardingPlan = {
  getPlanCount: "/api/v1/PlanConversionPlan/PlanCount",

  //SummaryDashboard
  GetGrowthRatefor5Years: "/api/v1/PlanConversionPlan/GetGrowthRatefor5Years",
  // getPlanCount: "/api/v1/Plan/PlanCount",

  postPlanGridView: "/api/v1/PlanConversionPlan/PlanGridViewModel",
  getSponsoringOrganisationList:
    "/api/v1/PlanConversionPlan/SponsorOrganizations",
  postSponsoringOrganisationList:
    "/api/v1/PlanConversionPlan/SaveSponsorOrganization",
  getPlan: "/api/v1/PlanConversionPlan/Plan",
  postPlan: "/api/v1/PlanConversionPlan/SavePlan",
  checkPlanNameExists: "/api/v1/PlanConversionPlan/CheckPlanNameExists",
  checkRkPlanNumberExists: "/api/v1/PlanConversionPlan/checkRkPlanNumberExists",
  getEmployeeClassifications:
    "/api/v1/PlanConversionPlan/EmployeeClassifications",
  getPlanList: "/api/v1/PlanConversionPlan/PlanList",
  getSourceList: "/api/v1/PlanConversionPlan/SourceList",
  setPlanStatus: "/api/v1/PlanConversionPlan/UpdatePlanStatus",
  getEmploymentStatusList:
    "/api/v1/PlanConversionCompany/GetEmploymentStatusList",
  getClassificationCodes: "/api/v1/PlanConversionCompany/ClassificationCode",
  getCompensationCategories: "/api/v1/PlanConversionPlan/CompensationCategory",
  getIRSLimits: "/api/v1/PlanConversionPlan/IRSLimits",
  getMasterplans: "/api/v1/PlanConversionPlan/MasterPlans",
  getEmployerSourcesList: "/api/v1/PlanConversionPlan/EmployerSourcesList",
  getVestingRulesList: "/api/v1/PlanConversionPlan/VestingRulesList",
  getAdoptingEmployerPlan: "/api/v1/PlanConversionPlan/GetAdoptingEmployerPlan",
  getPlanInvestmentData: "/api/v1/PlanConversionPlan/GetPlanInvestmentData",
  // getPlanAndCompanyDetails:
  //   "/api/v1/PlanConversionPlan/GetPlanAndCompanyDetails",

  // listAdvisor: "/api/Advisor/ListAdvisor",
  // getAdvisor: "/api/Advisor/GetAdvisor",
  // deleteAdvisor: "/api/Advisor/DeleteAdvisor",
  // saveAdvisor: "/api/Advisor/SaveAdvisor",
  // saveAdvisorToPlan: "/api/Advisor/SaveAdvisorToPlan",

  listAllocation: "/api/PlanConversionAllocation/ListAllocation",
  getAllocation: "/api/PlanConversionAllocation/GetAllocation",
  saveAllocation: "/api/PlanConversionAllocation/SaveAllocation",
  deleteAllocation: "/api/PlanConversionAllocation/DeleteAllocation",

  listBasicPlanDetails:
    "/api/PlanConversionBasicPlanDetails/ListBasicPlanDetails",
  getBasicPlanDetails:
    "/api/PlanConversionBasicPlanDetails/GetBasicPlanDetails",
  getReviewAndPlanDetails: "/api/PlanConversionReview/GetReviewAndPlanDetails",
  saveBasicPlanDetails:
    "/api/PlanConversionBasicPlanDetails/SaveBasicPlanDetails",
  deleteBasicPlanDetails:
    "/api/PlanConversionBasicPlanDetails/DeleteBasicPlanDetails",

  listCompensation: "/api/PlanConversionCompensation/ListCompensation",
  getCompensation: "/api/PlanConversionCompensation/GetCompensation",
  saveCompensation: "/api/PlanConversionCompensation/SaveCompensation",
  deleteCompensation: "/api/PlanConversionCompensation/DeleteCompensation",

  listCompliance: "/api/PlanConversionCompliance/ListCompliance",
  getCompliance: "/api/PlanConversionCompliance/GetCompliance",
  saveCompliance: "/api/PlanConversionCompliance/SaveCompliance",
  deleteCompliance: "/api/PlanConversionCompliance/DeleteCompliance",

  listCustodian: "/api/PlanConversionCustodian/ListCustodian",
  getCustodian: "/api/PlanConversionCustodian/GetCustodian",
  saveCustodian: "/api/PlanConversionCustodian/SaveCustodian",
  deleteCustodian: "/api/PlanConversionCustodian/DeleteCustodian",

  listEnrollment: "/api/PlanConversionEnrollment/ListEnrollment",
  getEnrollment: "/api/PlanConversionEnrollment/GetEnrollment",
  SaveEnrollmentSetting: "/api/PlanConversionEnrollment/SaveEnrollmentSetting",
  deleteEnrollment: "/api/PlanConversionEnrollment/DeleteEnrollment",

  listEntryDate: "/api/PlanConversionEntryDate/ListEntryDate",
  getEntryDate: "/api/PlanConversionEntryDate/GetEntryDate",
  saveEntryDate: "/api/PlanConversionEntryDate/SaveEntryDate",
  deleteEntryDate: "/api/PlanConversionEntryDate/DeleteEntryDate",

  listForfeiture: "/api/PlanConversionForfeiture/ListForfeiture",
  getForfeiture: "/api/PlanConversionForfeiture/GetForfeiture",
  saveForfeiture: "/api/PlanConversionForfeiture/SaveForfeiture",
  deleteForfeiture: "/api/PlanConversionForfeiture/DeleteForfeiture",

  listFunding: "/api/PlanConversionFunding/ListFunding",
  getFunding: "/api/PlanConversionFunding/GetFunding",
  saveFunding: "/api/PlanConversionFunding/SaveFunding",
  deleteFunding: "/api/PlanConversionFunding/DeleteFunding",

  listInvestment: "/api/PlanConversionInvestment/ListInvestment",
  getInvestment: "/api/PlanConversionInvestment/GetInvestment",
  saveInvestment: "/api/PlanConversionInvestment/SaveInvestment",
  deleteInvestment: "/api/PlanConversionInvestment/DeleteInvestment",
  addInvestmentsToPlan: "/api/PlanConversionInvestment/AddInvestmentsToPlan",

  listLoan: "/api/PlanConversionLoan/ListLoan",
  getLoan: "/api/PlanConversionLoan/GetLoan",
  saveLoan: "/api/PlanConversionLoan/SaveLoan",
  deleteLoan: "/api/PlanConversionLoan/DeleteLoan",

  listRetirement: "/api/PlanConversionRetirement/ListRetirement",
  getRetirement: "/api/PlanConversionRetirement/GetRetirement",
  saveRetirement: "/api/PlanConversionRetirement/SaveRetirement",
  deleteRetirement: "/api/PlanConversionRetirement/DeleteRetirement",

  listRollover: "/api/PlanConversionRollover/ListRollover",
  getRollover: "/api/PlanConversionRollover/GetRollover",
  saveRollover: "/api/PlanConversionRollover/SaveRollover",
  deleteRollover: "/api/PlanConversionRollover/DeleteRollover",

  getPlanYOS: "/api/PlanConversionPlanYOS/GetPlanYOS",
  SavePlanYOS: "/api/PlanConversionPlanYOS/SavePlanYOS",

  listSource: "/api/PlanConversionSource/ListSource",
  getSource: "/api/PlanConversionSource/GetSource",
  saveSource: "/api/PlanConversionSource/SaveSource",
  deleteSource: "/api/PlanConversionSource/DeleteSource",

  listSponsor: "/api/PlanConversionSponsor/ListSponsor",
  getSponsor: "/api/PlanConversionSponsor/GetSponsor",
  saveSponsor: "/api/PlanConversionSponsor/SaveSponsor",
  deleteSponsor: "/api/PlanConversionSponsor/DeleteSponsor",

  listTransfer: "/api/PlanConversionTransfer/ListTransfer",
  getTransfer: "/api/PlanConversionTransfer/GetTransfer",
  saveTransfer: "/api/PlanConversionTransfer/SaveTransfer",
  deleteTransfer: "/api/PlanConversionTransfer/DeleteTransfer",

  listTrustee: "/api/PlanConversionTrustee/ListTrustee",
  getTrustee: "/api/PlanConversionTrustee/GetTrustee",
  saveTrustee: "/api/PlanConversionTrustee/SaveTrustee",
  deleteTrustee: "/api/PlanConversionTrustee/DeleteTrustee",
  saveTrusteeToPlan: "/api/PlanConversionTrustee/SaveTrusteeToPlan",

  listVesting: "/api/PlanConversionVesting/ListVesting",
  getVesting: "/api/PlanConversionVesting/GetVesting",
  saveVesting: "/api/PlanConversionVesting/SaveVesting",
  deleteVesting: "/api/PlanConversionVesting/DeleteVesting",
  deleteAdditionalVesting: "/api/PlanConversionVesting/DeleteAdditionalVesting",

  listWithdrawal: "/api/PlanConversionWithdrawal/ListWithdrawal",
  getWithdrawal: "/api/PlanConversionWithdrawal/GetWithdrawal",
  saveWithdrawal: "/api/PlanConversionWithdrawal/SaveWithdrawal",
  deleteWithdrawal: "/api/PlanConversionWithdrawal/DeleteWithdrawal",
  // getWithdrawalSubType: "/api/PlanConversionWithdrawal/GetWithdrawalSubType",

  savePlanEligibility: "/api/v1/PlanConversionEligibleRule/SaveEligibleRule",
  savePlanAmendment:
    "/api/v1/PlanConversionEligibleRule/SavePlanAmendmentEligibleRule",
  getPlanEligibility: "/api/v1/PlanConversionEligibleRule/GetEligibleRule",
  deletePlanEligibility:
    "/api/v1/PlanConversionEligibleRule/DeleteEligibleRule",
  deletePlanAmendment: "/api/v1/PlanConversionEligibleRule/DeletePlanAmendment",
  getManageEligibleRule:
    "/api/v1/PlanConversionEligibleRule/GetManageEligibleRule",
  listEligibleRule: "/api/v1/PlanConversionEligibleRule/ListEligibleRule",
  getPlanEligibleMasterLTPTData:
    "/api/v1/PlanConversionEligibleRule/GetPlanEligibleMasterLTPTData",
  getSourcesListForVesting:
    "/api/v1/PlanConversionPlan/GetSourcesListForVesting",

  getAllClearingPartners:
    "/api/PlanConversionClearingPartner/GetClearingPartners",
  getClearingPartner: "/api/PlanConversionClearingPartner/GetClearingPartner",
  addClearingPartnerToPlan:
    "/api/PlanConversionClearingPartner/UpsertPlanWithClearingPartnerAccount",
  getPlanAssociatedClearingPartners:
    "api/PlanConversionClearingPartner/GetPlanAssociatedClearingPartnerAccounts",
  getInvestmentAssociatedClearingPartner:
    "/api/PlanConversionClearingPartner/GetInvestmentAssociatedClearingPartnerAccounts",
  saveInvestmentAssociatedClearingPartner:
    "/api/PlanConversionClearingPartner/UpsertInvestmentWithClearingPartnerAccount",
  upsertClearingPartner:
    "/api/PlanConversionClearingPartner/UpsertClearingPartnerAccount",
  deleteClearingPartner:
    "/api/PlanConversionClearingPartner/DeleteClearingPartnerAccount",
  getClearingPartnerPlans:
    "/api/PlanConversionClearingPartner/GetClearingPartnerAssociatedPlan",
  getClearingPartnerAccountPlans:
    "/api/PlanConversionClearingPartner/GetClearingPartnerAccountAssociatedPlan",
  upsertClearanceTime: "/api/PlanConversionClearingPartner/UpsertClearanceTime",
  deleteClearanceTime: "/api/PlanConversionClearingPartner/DeleteClearanceTime",

  getAllMasterAdvisors: "/api/PlanConversionAdvisor/ListAdvisor",
  getAdvisor: "/api/PlanConversionAdvisor/GetAdvisor",
  upsertAdvisorRepresentative:
    "/api/PlanConversionAdvisor/UpsertAdvisorRepresentative",
  upsertAdvisorToPlan:
    "/api/PlanConversionAdvisor/UpsertAdvisorRepresentativeToPlan",
  getAdvisorRepresentativePlans:
    "/api/PlanConversionAdvisor/GetAdvisorRepresentativeAssociatedPlans",
  getAdvisoPlans: "/api/PlanConversionAdvisor/GetAdvisorAssociatedPlans",
  getPlansAssociatedWithAdvisorRepresentative:
    "/api/PlanConversionAdvisor/GetPlansAssociatedWithAdvisorRepresentative",
  getInvestmentAssociatedAdvisorRepresentative:
    "/api/PlanConversionAdvisor/GetInvestmentAssociatedAdvisorRepresentative",
  upsertAdvisorRepresentativeToInvestment:
    "/api/PlanConversionAdvisor/UpsertAdvisorRepresentativePlanMappingToInvestment",
  deleteAdvisorRepresentative:
    "/api/PlanConversionAdvisor/DeleteAdvisorRepresentative",
};
