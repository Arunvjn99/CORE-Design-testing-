export const planYos = {
  getPlanYOS: "/api/PlanYOS/GetPlanYOS",
  SavePlanYOS: "/api/PlanYOS/SavePlanYOS",
  getPlanYOSByPlanIds: "/api/PlanYOS/GetPlanYOSByPlanIds",
};
export const plan = {
  getActivePlanDetailsBasedOnClearingPartner:
    "/api/BasicPlanDetails/GetActivePlanDetailsBasedOnClearingPartner",
  getFieldSchema: "/api/v1/Plan/GetFieldSchema",
  getPlanCount: "/api/v1/Plan/PlanCount",
  getCalculationSuspensionHistory:
    "/api/v1/Plan/GetCalculationSuspensionHistory",
  getPlansAndSourcesBasedOnCompanyId:
    "/api/v1/Plan/GetPlansAndSourcesBasedOnCompanyId",

  //SummaryDashboard
  GetGrowthRatefor5Years: "/api/v1/Plan/GetGrowthRatefor5Years",
  // getPlanCount: "/api/v1/Plan/PlanCount",
  getPlanWiseSources: "/api/v1/Plan/GetPlanWiseSources",
  postPlanGridView: "/api/v1/Plan/PlanGridViewModel",
  postPlanGridViewCount: "api/v1/Plan/PlanGridViewCount",
  nonPrototypePlan: "/api/v1/Plan/NonProtoTypePlans",
  getSponsoringOrganisationList: "/api/v1/Plan/SponsorOrganizations",
  postSponsoringOrganisationList: "/api/v1/Plan/SaveSponsorOrganization",
  getPlan: "/api/v1/Plan/Plan",
  postPlan: "/api/v1/Plan/SavePlan",
  checkPlanNameExists: "/api/v1/Plan/CheckPlanNameExists",
  checkRkPlanNumberExists: "/api/v1/Plan/checkRkPlanNumberExists",
  getEmployeeClassifications: "/api/v1/Plan/EmployeeClassifications",
  getPlanList: "/api/v1/Plan/PlanList",
  getPaginatedPlan: "/api/v1/Plan/GetPlanList",
  getValidPlanList: "/api/v1/Plan/GetValidPlansForPayroll",
  getSourceList: "/api/v1/Plan/SourceList",
  setPlanStatus: "/api/v1/Plan/UpdatePlanStatus",
  getEmploymentStatusList: "/api/v1/Company/GetEmploymentStatusList",
  getClassificationCodes: "/api/v1/Company/ClassificationCode",
  getCompensationCategories: "/api/v1/Plan/CompensationCategory",
  getIRSLimits: "/api/v1/Plan/IRSLimits",
  getMasterplans: "/api/v1/Plan/MasterPlans",
  getEmployerSourcesList: "/api/v1/Plan/EmployerSourcesList",
  getEmployerSourceListForNonPayPeriod:
    "/api/v1/Plan/EmployerSourcesListForNonPayPeriod",
  getVestingRulesList: "/api/v1/Plan/VestingRulesList",
  getAdoptingEmployerPlan: "/api/v1/Plan/GetAdoptingEmployerPlan",
  getPlanInvestmentData: "/api/v1/Plan/GetPlanInvestmentData",
  getPlanAndCompanyDetails: "/api/v1/Plan/GetPlanAndCompanyDetails",
  createNotes: "/api/v1/Note",
  getNotes: "/api/v1/Note/ByEntity",
  updateNotes: "/api/v1/Note",
  deleteNotes: "/api/v1/Note",
  getAssociatedPlansTable: "/api/v1/Plan/GetAssociatedPlansTable",

  GetMasterSourceNames: "/api/v1/Plan/GetMasterSourceNames",
  SaveMasterSourceName: "/api/v1/Plan/SaveMasterSourceName",
  SaveForfeitureSetting: "/api/v1/Plan/SaveForfeitureSetting",
  GetForfeitureSetting: "/api/v1/Plan/GetForfeitureSetting",
  SaveLOA: "/api/v1/Plan/SaveLeaveOfAbsence",
  GetLOA: "/api/v1/Plan/GetLeaveOfAbsence",
  ListLOA: "/api/v1/Plan/ListLeaveOfAbsence",
  SaveSourceLimits: "/api/v1/Plan/SaveSourceLimits",
  GetSourceLimits: "/api/v1/Plan/GetSourceLimits",
  ListSourceLimits: "/api/v1/Plan/ListSourceLimits",
  DeleteSourceLimits: "/api/v1/Plan/DeleteSourceLimits",
  getPlanAndSource: "/api/v1/Plan/GetPlansAndSourcesForRunEligibilityProcess",
  // listAdvisor: "/api/Advisor/ListAdvisor",
  // getAdvisor: "/api/Advisor/GetAdvisor",
  // deleteAdvisor: "/api/Advisor/DeleteAdvisor",
  // saveAdvisor: "/api/Advisor/SaveAdvisor",
  // saveAdvisorToPlan: "/api/Advisor/SaveAdvisorToPlan",

  listAllocation: "/api/Allocation/ListAllocation",
  getAllocation: "/api/Allocation/GetAllocation",
  saveAllocation: "/api/Allocation/SaveAllocation",
  deleteAllocation: "/api/Allocation/DeleteAllocation",

  listBasicPlanDetails: "/api/BasicPlanDetails/ListBasicPlanDetails",
  getBasicPlanDetails: "/api/BasicPlanDetails/GetBasicPlanDetails",
  getReviewAndPlanDetails: "/api/Review/GetReviewAndPlanDetails",
  saveBasicPlanDetails: "/api/BasicPlanDetails/SaveBasicPlanDetails",
  deleteBasicPlanDetails: "/api/BasicPlanDetails/DeleteBasicPlanDetails",

  listCompensation: "/api/Compensation/ListCompensation",
  getCompensation: "/api/Compensation/GetCompensation",
  saveCompensation: "/api/Compensation/SaveCompensation",
  deleteCompensation: "/api/Compensation/DeleteCompensation",
  validateSourceCompensation: "/api/Compensation/ValidateSourceCompensation",
  deleteSourceLevelCompensation:
    "/api/Compensation/DeleteSourceLevelCompensation",

  listCompliance: "/api/Compliance/ListCompliance",
  getCompliance: "/api/Compliance/GetCompliance",
  saveCompliance: "/api/Compliance/SaveCompliance",
  deleteCompliance: "/api/Compliance/DeleteCompliance",

  listCustodian: "/api/Custodian/ListCustodian",
  getCustodian: "/api/Custodian/GetCustodian",
  saveCustodian: "/api/Custodian/SaveCustodian",
  deleteCustodian: "/api/Custodian/DeleteCustodian",

  listEnrollment: "/api/Enrollment/ListEnrollment",
  getEnrollment: "/api/Enrollment/GetEnrollment",
  SaveEnrollmentSetting: "/api/Enrollment/SaveEnrollmentSetting",
  deleteEnrollment: "/api/Enrollment/DeleteEnrollment",

  listEntryDate: "/api/EntryDate/ListEntryDate",
  getEntryDate: "/api/EntryDate/GetEntryDate",
  saveEntryDate: "/api/EntryDate/SaveEntryDate",
  deleteEntryDate: "/api/EntryDate/DeleteEntryDate",

  listForfeiture: "/api/Forfeiture/ListForfeiture",
  getForfeiture: "/api/Forfeiture/GetForfeiture",
  saveForfeiture: "/api/Forfeiture/SaveForfeiture",
  deleteForfeiture: "/api/Forfeiture/DeleteForfeiture",

  listFunding: "/api/Funding/ListFunding",
  getFunding: "/api/Funding/GetFunding",
  saveFunding: "/api/Funding/SaveFunding",
  deleteFunding: "/api/Funding/DeleteFunding",
  saveFundingSponsorAccountValidation: "api/Funding/SponsorAccountValidation",

  listContact: "/api/PlanContact/ListPlanContact",
  getContact: "/api/PlanContact/GetPlanContact",
  addContact: "/api/PlanContact/SavePlanContact",
  deleteContact: "/api/PlanContact/DeletePlanContact",
  addContactType: "/api/PlanContact/SavePlanContactType",
  listContactType: "/api/PlanContact/ListPlanContactType",
  listContactRole: "/api/PlanContact/ListContactRoles",
  getPlanContactTypes: "/api/PlanContact/GetPlanContactTypes",
  checkSsnExists: "/api/v1/Payroll/CheckSsnExists",
  listInvestment: "/api/Investment/ListInvestment",
  listInvestmentsByPlanIds: "/api/Investment/ListInvestmentsByPlanIds",
  getInvestment: "/api/Investment/GetInvestment",
  saveInvestment: "/api/Investment/SaveInvestment",
  deleteInvestment: "/api/Investment/DeleteInvestment",
  addInvestmentsToPlan: "/api/Investment/AddInvestmentsToPlan",
  getInvestmentHistory: "/api/Investment/GetInvestmentHistory",
  getInvestmentListByPlanId: "/api/Investment/GetInvestmentListByPlanId",
  getMasterInvestmentBySearchCriteria:
    "/api/v1/Investment/GetMasterInvestmentBySearchCriteria",
  getTotalInvestmentBySearchCriteria:
    "/api/v1/Investment/GetTotalInvestmentBySearchCriteria",

  listLoan: "/api/Loan/ListLoan",
  getLoan: "/api/Loan/GetLoan",
  saveLoan: "/api/Loan/SaveLoan",
  deleteLoan: "/api/Loan/DeleteLoan",

  listRetirement: "/api/Retirement/ListRetirement",
  getRetirement: "/api/Retirement/GetRetirement",
  saveRetirement: "/api/Retirement/SaveRetirement",
  deleteRetirement: "/api/Retirement/DeleteRetirement",

  listRollover: "/api/Rollover/ListRollover",
  getRollover: "/api/Rollover/GetRollover",
  saveRollover: "/api/Rollover/SaveRollover",
  deleteRollover: "/api/Rollover/DeleteRollover",

  getInPlanRoth: "/api/InPlanRoth/GetInPlanRoth",
  saveInPlanRoth: "/api/InPlanRoth/SaveInPlanRoth",

  listSource: "/api/Source/ListSource",
  listSourceRothConversion: "/api/Source/ListSourceExpectRothConversion",
  getSource: "/api/Source/GetSource",
  saveSource: "/api/Source/SaveSource",
  deleteSource: "/api/Source/DeleteSource",
  getSourceCodes: "/api/Source/GetSourceCodes",

  listSponsor: "/api/Sponsor/ListSponsor",
  getSponsor: "/api/Sponsor/GetSponsor",
  saveSponsor: "/api/Sponsor/SaveSponsor",
  deleteSponsor: "/api/Sponsor/DeleteSponsor",

  listTransfer: "/api/Transfer/ListTransfer",
  getTransfer: "/api/Transfer/GetTransfer",
  saveTransfer: "/api/Transfer/SaveTransfer",
  deleteTransfer: "/api/Transfer/DeleteTransfer",

  listTrustee: "/api/Trustee/ListTrustee",
  getTrustee: "/api/Trustee/GetTrustee",
  saveTrustee: "/api/Trustee/SaveTrustee",
  deleteTrustee: "/api/Trustee/DeleteTrustee",
  saveTrusteeToPlan: "/api/Trustee/SaveTrusteeToPlan",

  listVesting: "/api/Vesting/ListVesting",
  getVesting: "/api/Vesting/GetVesting",
  saveVesting: "/api/Vesting/SaveVesting",
  deleteVesting: "/api/Vesting/DeleteVesting",
  deleteAdditionalVesting: "/api/Vesting/DeleteAdditionalVesting",
  getLTPTVesting: "api/Vesting/GetLTPTVesting",

  listWithdrawal: "/api/Withdrawal/ListWithdrawal",
  getWithdrawal: "/api/Withdrawal/GetWithdrawal",
  saveWithdrawal: "/api/Withdrawal/SaveWithdrawal",
  deleteWithdrawal: "/api/Withdrawal/DeleteWithdrawal",
  getWithdrawalSubType: "/api/Withdrawal/GetWithdrawalSubType",

  savePlanEligibility: "/api/v1/EligibleRule/SaveEligibleRule",
  savePlanAmendment: "/api/v1/EligibleRule/SavePlanAmendmentEligibleRule",
  getPlanEligibility: "/api/v1/EligibleRule/GetEligibleRule",
  deletePlanEligibility: "/api/v1/EligibleRule/DeleteEligibleRule",
  deletePlanAmendment: "/api/v1/EligibleRule/DeletePlanAmendment",
  getManageEligibleRule: "/api/v1/EligibleRule/GetManageEligibleRule",
  listEligibleRule: "/api/v1/EligibleRule/ListEligibleRule",
  getPlanEligibleMasterLTPTData:
    "/api/v1/EligibleRule/GetPlanEligibleMasterLTPTData",
  getSourcesListForVesting: "/api/v1/Plan/GetSourcesListForVesting",

  getAllClearingPartners: "/api/ClearingPartner/GetClearingPartners",
  getClearingPartner: "/api/ClearingPartner/GetClearingPartner",
  addClearingPartnerToPlan:
    "/api/ClearingPartner/UpsertPlanWithClearingPartnerAccount",
  getPlanAssociatedClearingPartners:
    "api/ClearingPartner/GetPlanAssociatedClearingPartnerAccounts",
  getInvestmentAssociatedClearingPartner:
    "/api/ClearingPartner/GetInvestmentAssociatedClearingPartnerAccounts",
  getMasterInvestmentAssociatedClearingPartnerAccounts:
    "/api/ClearingPartner/GetMasterInvestmentAssociatedClearingPartnerAccounts",
  saveInvestmentAssociatedClearingPartner:
    "/api/ClearingPartner/UpsertInvestmentWithClearingPartnerAccount",
  upsertClearingPartner: "/api/ClearingPartner/UpsertClearingPartnerAccount",
  deleteClearingPartner: "/api/ClearingPartner/DeleteClearingPartnerAccount",
  getClearingPartnerPlans:
    "/api/ClearingPartner/GetClearingPartnerAssociatedPlan",
  getClearingPartnerAccountPlans:
    "/api/ClearingPartner/GetClearingPartnerAccountAssociatedPlan",
  upsertClearanceTime: "/api/ClearingPartner/UpsertClearanceTime",
  deleteClearanceTime: "/api/ClearingPartner/DeleteClearanceTime",

  getAllMasterAdvisors: "/api/Advisor/ListAdvisor",
  getAdvisor: "/api/Advisor/GetAdvisor",
  uploadAdvisorLogo: "/api/Advisor/AddAdvisorLogo",
  getAdvisorLogo: "/api/Advisor/GetAdvisorLogo",
  upsertAdvisor: "/api/Advisor/UpsertAdvisor",
  upsertAdvisorRepresentative: "/api/Advisor/UpsertAdvisorRepresentative",
  upsertAdvisorToPlan: "/api/Advisor/UpsertAdvisorRepresentativeToPlan",
  getAdvisorRepresentativePlans:
    "/api/Advisor/GetAdvisorRepresentativeAssociatedPlans",
  getAdvisoPlans: "/api/Advisor/GetAdvisorAssociatedPlans",
  getPlansAssociatedWithAdvisorRepresentative:
    "/api/Advisor/GetPlansAssociatedWithAdvisorRepresentative",
  getInvestmentAssociatedAdvisorRepresentative:
    "/api/Advisor/GetInvestmentAssociatedAdvisorRepresentative",
  upsertAdvisorRepresentativeToInvestment:
    "/api/Advisor/UpsertAdvisorRepresentativePlanMappingToInvestment",
  deleteAdvisorRepresentative: "/api/Advisor/DeleteAdvisorRepresentative",
  deleteAdvisor: "/api/Advisor/DeleteAdvisor",
  getPlanDashboardPayrollCounts:
    "/api/v1/Payroll/GetPlanDashBoardPayrollCounts",
  getEligibilityRateForPlan: "/api/v1/Payroll/GetEligibilityRateForPlan",
  getParticipationRateForPlan: "/api/v1/Enrollment/GetParticipationRateForPlan",
  getContributionSummaryDetailsBasedOnPlanId:
    "/api/v1/Payroll/GetContributionSummaryDetailsBasedOnPlanId",
  getProcessedLoanCount: "/api/v1/Loan/GetProcessedLoanCount",
  getProcessedDistributionCount: "/api/Distribution/GetWithdrawalCountByPlanId",
  getProcessedIPRCCount: "/api/v1/InPlanRothConversion/GetProcessedIPRCCount",
  getProcessedRolloverCount: "/api/RolloverIn/GetProcessedRolloverCount",
  getProcessedPayrollCount: "/api/v1/Payroll/GetProcessedPayrollFilesCount",
  getActivePlanDetailsByCompanyId:
    "/api/v1/Plan/GetActivePlanDetailsByCompanyId",
  getNonFinchActivePlanDetailsByCompanyId:
    "/api/v1/Plan/GetNonFinchActivePlanDetailsByCompanyId",
  saveDisclosure: "/api/v1/Disclosure/SaveDisclosure",
  triggerDisclosure: "/api/v1/Disclosure/TriggerDisclosure",
  getClearingPartnerAccount:
    "/api/ClearingPartner/GetClearingPartnerAccountDetailsByClearingPartnerId",
  savePlanDoc: "/api/v1/Plan/PlanExtractFormFields",
  regenerateTradeIdentifier: "api/v1/Investment/RegenerateTradeIdentifier",
  deleteDisclosure: "/api/v1/Disclosure/DeleteDisclosure",
  listDisclosures: "/api/v1/Disclosure/ListDisclosures",
};
