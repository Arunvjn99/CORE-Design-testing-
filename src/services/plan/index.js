import apiInstance from "../api";
import { plan } from "@/services/endpoints/plan";
import { planYos } from "@/services/endpoints/plan";
import { masterData } from "@/services/endpoints/company";
import { enrollment } from "@/services/endpoints/enrollment";
import { payroll } from "@/services/endpoints/payroll";
import { trade } from "@/services/endpoints/trade";
import { delay } from "../helpers";
import manageSources from "../../mocks/manageSources.json";
// import manageSourcesMaster from "../../mocks/manageSourcesMaster.json";
import eligibilityRuleMaster from "../../mocks/eligibilityRule.json";
import eligibilityMaster from "../../mocks/eligibility.json";
import manageEligibility from "../../mocks/manageEligibility.json";
import employeeClassificationForSources from "../../mocks/employeeClassificationForSources.json";
import employeeDeferralTypes from "../../mocks/employeeDeferralTypes.json";
import addSourceAllocation from "../../mocks/addSourceAllocation.json";
import sourcesEffectiveDateHistory from "../../mocks/sourcesEffectiveDateHistory.json";
import vestingMaster from "../../mocks/vestingMaster.json";
import ForfeitureMaster from "../../mocks/forfeitureMaster.json";
// import getPlans from "../../mocks/getPlans.json";
import manageSourceEnrollment from "../../mocks/manageSourceEnrollment.json";
import manageDistributions from "../../mocks/manageDistributionsMaster.json";
import distributionSourceMaster from "../../mocks/distributionSourceMaster.json";
import loanMaster from "../../mocks/loanMaster.json";
import { transformMasterDataInfo } from "@/utils/helpers";
import { ENTITY_TYPES } from "@/utils/constants/common";

export const postPlanGridDetails = (payload) => {
  return apiInstance().post(`${plan.postPlanGridView}`, payload);
};
export const nonPrototypePlanDetails = (payload) => {
  return apiInstance().post(`${plan.nonPrototypePlan}`, payload);
};
export const getMasterPlans = (category) => {
  return apiInstance().get(`${plan.getMasterplans}/${category}`);
};
export const getPlanCount = () => {
  return apiInstance().get(`${plan.getPlanCount}`);
};
export const getPlanWiseSources = (companyId) => {
  return apiInstance().get(`${plan.getPlanWiseSources}/${companyId}`);
};
export const GetplanYos = (id) => {
  return apiInstance().get(`${planYos.getPlanYOS}/${id}`);
};
export const GetplanYosByPlanIds = (planIds) => {
  return apiInstance().post(planYos.getPlanYOSByPlanIds, {
    planIds,
  });
};
export const SavePlanYOS = (payload) => {
  return apiInstance().post(`${planYos.SavePlanYOS}`, payload);
};
export const setPlanStatus = (planId, planStatus) => {
  var payload = { planId: planId, planStatus: planStatus };
  return apiInstance().post(`${plan.setPlanStatus}`, payload);
};

export const getWithdrawalSubType = (planId) => {
  return apiInstance().get(`${plan.getWithdrawalSubType}/${planId}`);
};

export const getPlanDetails = (id) => {
  return apiInstance().get(`${plan.getPlan}/${id}`);
};

export const getAdvisor = (id) => {
  return apiInstance().get(`${plan.getAdvisor}/${id}`);
};
export const listAdvisor = (planId) => {
  return apiInstance().get(`${plan.listAdvisor}/${planId}`);
};
export const deleteAdvisor = (id) => {
  return apiInstance().delete(`${plan.deleteAdvisor}/${id}`);
};
export const saveAdvisor = (payload) => {
  return apiInstance().post(`${plan.saveAdvisor}`, payload);
};
export const saveAdvisorToPlan = (payload) => {
  return apiInstance().post(`${plan.saveAdvisorToPlan}`, payload);
};

export const getAllocation = (id) => {
  return apiInstance().get(`${plan.getAllocation}/${id}`);
};
export const listAllocation = (planId) => {
  return apiInstance().get(`${plan.listAllocation}/${planId}`);
};
export const deleteAllocation = (id) => {
  return apiInstance().delete(`${plan.deleteAllocation}/${id}`);
};
export const saveAllocation = (payload) => {
  return apiInstance().post(`${plan.saveAllocation}`, payload);
};

export const getBasicPlanDetails = (id) => {
  return apiInstance().get(`${plan.getBasicPlanDetails}/${id}`);
};
export const getReviewAndPlanDetails = (id, iraUser) => {
  return apiInstance().get(`${plan.getReviewAndPlanDetails}/${id}/${iraUser}`);
};
export const listBasicPlanDetails = (planId) => {
  return apiInstance().get(`${plan.listBasicPlanDetails}/${planId}`);
};
export const getPlanAndCompanyDetails = (planId) => {
  return apiInstance().get(`${plan.getPlanAndCompanyDetails}/${planId}`);
};

export const getNotesPlan = async (planId) => {
  return apiInstance().get(`${plan.getNotes}/${ENTITY_TYPES.Plan}/${planId}`);
};

export const createNotesPlan = (payload) => {
  return apiInstance().post(plan.createNotes, payload);
};

export const updateNotesPlan = (payload) => {
  return apiInstance().put(plan.updateNotes, payload);
};

export const deleteNotesPlan = (id) => {
  return apiInstance().delete(`${plan.deleteNotes}/${id}`);
};

export const deletebasicplanDetails = (id) => {
  return apiInstance().delete(`${plan.deletebasicplanDetails}/${id}`);
};
export const saveBasicPlanDetails = (payload) => {
  return apiInstance().post(`${plan.saveBasicPlanDetails}`, payload);
};
export const savePlanDoc = (payload) => {
  return apiInstance().post(`${plan.savePlanDoc}/${payload}`, "fun");
};

export const getCompensation = (id) => {
  return apiInstance().get(`${plan.getCompensation}/${id}`);
};
export const listPlanCompensation = (planId) => {
  return apiInstance().get(`${plan.listCompensation}/${planId}`);
};
export const deleteCompensation = (id) => {
  return apiInstance().delete(`${plan.deleteCompensation}/${id}`);
};
export const savePlanCompensation = (payload) => {
  return apiInstance().post(`${plan.saveCompensation}`, payload);
};
export const validateSourceCompensation = (payload) => {
  return apiInstance().post(`${plan.validateSourceCompensation}`, payload);
};

export const getCompliance = (id) => {
  return apiInstance().get(`${plan.getCompliance}/${id}`);
};
export const listCompliance = (planId) => {
  return apiInstance().get(`${plan.listCompliance}/${planId}`);
};
export const deleteCompliance = (id) => {
  return apiInstance().delete(`${plan.deleteCompliance}/${id}`);
};
export const saveCompliance = (payload) => {
  return apiInstance().post(`${plan.saveCompliance}`, payload);
};

export const getCustodian = (id) => {
  return apiInstance().get(`${plan.getCustodian}/${id}`);
};
export const listCustodian = (planId) => {
  return apiInstance().get(`${plan.listCustodian}/${planId}`);
};
export const deleteCustodian = (id) => {
  return apiInstance().delete(`${plan.deleteCustodian}/${id}`);
};
export const saveCustodian = (payload) => {
  return apiInstance().post(`${plan.saveCustodian}`, payload);
};

export const getEligibleRule = (id) => {
  return apiInstance().get(`${plan.getEligibleRule}/${id}`);
};
export const listEligibleRule = (planId) => {
  return apiInstance().get(`${plan.listEligibleRule}/${planId}`);
};
export const getPlanEligibleMasterLTPTData = () => {
  return apiInstance().get(`${plan.getPlanEligibleMasterLTPTData}`);
};

export const deleteEligibleRule = (id) => {
  return apiInstance().delete(`${plan.deleteEligibleRule}/${id}`);
};
export const saveEligibleRule = (payload) => {
  return apiInstance().post(`${plan.saveEligibleRule}`, payload);
};

export const getEnrollment = (id) => {
  return apiInstance().get(`${plan.getEnrollment}/${id}`);
};
export const listEnrollment = (planId) => {
  return apiInstance().get(`${plan.listEnrollment}/${planId}`);
};
export const deleteEnrollment = (id) => {
  return apiInstance().delete(`${plan.deleteEnrollment}/${id}`);
};
export const saveEnrollment = (payload) => {
  return apiInstance().post(`${enrollment.SaveEnrollment}`, payload);
};
export const saveEnrollmentSetting = (payload) => {
  return apiInstance().post(`${plan.SaveEnrollmentSetting}`, payload);
};

export const getEntryDate = (id) => {
  return apiInstance().get(`${plan.getEntryDate}/${id}`);
};
export const listEntryDate = (planId) => {
  return apiInstance().get(`${plan.listEntryDate}/${planId}`);
};
export const deleteEntryDate = (id) => {
  return apiInstance().delete(`${plan.deleteEntryDate}/${id}`);
};
export const saveEntryDate = (payload) => {
  return apiInstance().post(`${plan.saveEntryDate}`, payload);
};

export const getForfeiture = (id) => {
  return apiInstance().get(`${plan.getForfeiture}/${id}`);
};
export const listForfeiture = (planId) => {
  return apiInstance().get(`${plan.listForfeiture}/${planId}`);
};
export const deleteForfeiture = (id) => {
  return apiInstance().delete(`${plan.deleteForfeiture}/${id}`);
};
export const saveForfeiture = (payload) => {
  return apiInstance().post(`${plan.saveForfeiture}`, payload);
};

export const getFunding = (id) => {
  return apiInstance().get(`${plan.getFunding}/${id}`);
};
export const listFunding = (planId) => {
  return apiInstance().get(`${plan.listFunding}/${planId}`);
};
export const deleteFunding = (id) => {
  return apiInstance().delete(`${plan.deleteFunding}/${id}`);
};
export const saveFunding = (payload) => {
  return apiInstance().post(`${plan.saveFunding}`, payload);
};

export const getInvestment5 = (id) => {
  return apiInstance().get(`${plan.getInvestment}/${id}`);
};
export const getMasterInvestment = (id) => {
  return apiInstance().get(`${trade.getInvestment}/${id}`);
};

export const getCompetingFundBasedOnInvestmentId = (id) => {
  return apiInstance().get(
    `${trade.getCompetingFundBasedOnInvestmentId}/${id}`
  );
};

export const getTotalInvestmentCount = (payload) => {
  return apiInstance().post(plan.getTotalInvestmentBySearchCriteria, payload);
};

export const getMasterInvestmentsData = (payload) => {
  return apiInstance().post(plan.getMasterInvestmentBySearchCriteria, payload);
};

export const listInvestment = (planId) => {
  return apiInstance().get(`${plan.listInvestment}/${planId}`);
};

export const listInvestmentsByPlanIds = (payload) => {
  return apiInstance().post(plan.listInvestmentsByPlanIds, payload);
};

export const deleteInvestment1 = (id, planId) => {
  return apiInstance().delete(`${plan.deleteInvestment}/${id}/${planId}`);
};
export const saveInvestment = (payload) => {
  return apiInstance().post(`${plan.saveInvestment}`, payload);
};
export const addInvestmentsToPlan = (payload) => {
  return apiInstance().post(`${plan.addInvestmentsToPlan}`, payload);
};
export const GetPlanInvestmentsByPlanIdAndEmployeeId = (payload) => {
  return apiInstance().post(
    `${payroll.GetPlanInvestmentsByPlanIdAndEmployeeId}`,
    payload
  );
};
export const getInvestmentHistory = (payload) => {
  return apiInstance().post(`${plan.getInvestmentHistory}`, payload);
};
export const getInvestmentListByPlanId = (id) => {
  return apiInstance().get(`${plan.getInvestmentListByPlanId}/${id}`);
};

export const getLoan = (id) => {
  return apiInstance().get(`${plan.getLoan}/${id}`);
};
export const listLoan = (planId) => {
  return apiInstance().get(`${plan.listLoan}/${planId}`);
};
export const deleteLoan = (id) => {
  return apiInstance().delete(`${plan.deleteLoan}/${id}`);
};
export const saveLoan = (payload) => {
  return apiInstance().post(`${plan.saveLoan}`, payload);
};

export const getRetirement = (id) => {
  return apiInstance().get(`${plan.getRetirement}/${id}`);
};
export const listRetirement = (planId) => {
  return apiInstance().get(`${plan.listRetirement}/${planId}`);
};
export const deleteRetirement = (id) => {
  return apiInstance().delete(`${plan.deleteRetirement}/${id}`);
};
export const saveRetirement = (payload) => {
  return apiInstance().post(`${plan.saveRetirement}`, payload);
};

export const getRollOver = (id) => {
  return apiInstance().get(`${plan.getRollover}/${id}`);
};
export const listRollOver = (planId) => {
  return apiInstance().get(`${plan.listRollover}/${planId}`);
};
export const deleteRollOver = (id) => {
  return apiInstance().delete(`${plan.deleteRollover}/${id}`);
};
export const saveRollOver = (payload) => {
  return apiInstance().post(`${plan.saveRollover}`, payload);
};
export const getInPlanRoth = (id) => {
  return apiInstance().get(`${plan.getInPlanRoth}/${id}`);
};
export const saveInPlanRoth = (payload) => {
  return apiInstance().post(`${plan.saveInPlanRoth}`, payload);
};
export const getSource = (id) => {
  return apiInstance().get(`${plan.getSource}/${id}`);
};
export const listSource = (planId) => {
  return apiInstance().get(`${plan.listSource}/${planId}`);
};
export const listSourceRothConversion = (planId) => {
  return apiInstance().get(`${plan.listSourceRothConversion}/${planId}`);
};
export const deleteSource = (id) => {
  return apiInstance().delete(`${plan.deleteSource}/${id}`);
};
export const saveSource = (payload) => {
  return apiInstance().post(`${plan.saveSource}`, payload);
};

export const getSponsor = (id) => {
  return apiInstance().get(`${plan.getSponsor}/${id}`);
};
export const listSponsor = (planId) => {
  return apiInstance().get(`${plan.listSponsor}/${planId}`);
};
export const deleteSponsor = (id) => {
  return apiInstance().delete(`${plan.deleteSponsor}/${id}`);
};
export const saveSponsor = (payload) => {
  return apiInstance().post(`${plan.saveSponsor}`, payload);
};

export const getTransfer = (id) => {
  return apiInstance().get(`${plan.getTransfer}/${id}`);
};
export const listTransfer = (planId) => {
  return apiInstance().get(`${plan.listTransfer}/${planId}`);
};
export const deleteTransfer = (id) => {
  return apiInstance().delete(`${plan.deleteTransfer}/${id}`);
};
export const saveTransfer = (payload) => {
  return apiInstance().post(`${plan.saveTransfer}`, payload);
};

export const getTrustee = (id) => {
  return apiInstance().get(`${plan.getTrustee}/${id}`);
};
export const listTrustee = (planId) => {
  return apiInstance().get(`${plan.listTrustee}/${planId}`);
};
export const deleteTrustee = (id) => {
  return apiInstance().delete(`${plan.deleteTrustee}/${id}`);
};
export const saveTrustee = (payload) => {
  return apiInstance().post(`${plan.saveTrustee}`, payload);
};
export const saveTrusteeToPlan = (payload) => {
  return apiInstance().post(`${plan.saveTrusteeToPlan}`, payload);
};

export const getVesting = (id) => {
  return apiInstance().get(`${plan.getVesting}/${id}`);
};
export const listVesting = (planId) => {
  return apiInstance().get(`${plan.listVesting}/${planId}`);
};
export const deleteVesting = (payload) => {
  return apiInstance().post(`${plan.deleteVesting}`, payload);
};
export const deleteAdditionalVesting = (payload) => {
  return apiInstance().post(`${plan.deleteAdditionalVesting}`, payload);
};
export const saveVesting = (payload) => {
  return apiInstance().post(`${plan.saveVesting}`, payload);
};

export const getWithdrawal = (id) => {
  return apiInstance().get(`${plan.getWithdrawal}/${id}`);
};
export const listWithdrawal = (planId) => {
  return apiInstance().get(`${plan.listWithdrawal}/${planId}`);
};
export const deleteWithdrawal = (id) => {
  return apiInstance().delete(`${plan.deleteWithdrawal}/${id}`);
};
export const saveWithdrawal = (payload) => {
  console.log("payload", payload);
  return apiInstance().post(`${plan.saveWithdrawal}`, payload);
};

// Trustee
export const getTrusteeCompany = (id = 1) => {
  return apiInstance()
    .get(`${masterData.getTrustees}/${id}`)
    .then((response) => transformMasterDataInfo(response));
};

// Trustee
export const getAdvisorCompany = (id = 1) => {
  return apiInstance()
    .get(`${masterData.getAdvisors}/${id}`)
    .then((response) => transformMasterDataInfo(response));
};
// export const getManageTrusteeCompany = (id) => {
//   return apiInstance().get(`${plan.getPlan}`)
//   .then((response) => {
//         return transformMasterDataInfo(response.trustees || []);
//       })
//   // return delay(1000).then(() => {
//   //   return ManageTrustee;
//   // });
// };

// Custodian
export const getIRSLimits = (planId) => {
  return apiInstance().get(`${plan.getIRSLimits}/${planId}`);
};
export const getCustodianCompany = (id = 1) => {
  return apiInstance()
    .get(`${masterData.getCustodians}/${id}`)
    .then((response) => transformMasterDataInfo(response));
};

export const getPlanCompanyNameExists = (planName) => {
  return apiInstance().get(`${plan.checkPlanNameExists}/${planName}`);
};

export const checkRkPlanNumberExists = (rkPlanNumber) => {
  return apiInstance().get(`${plan.checkRkPlanNumberExists}/${rkPlanNumber}`);
};

// Sources
export const getPlanSources = () => {
  return delay(1000).then(() => {
    return manageSources;
  });
};

export const getPlanSourcesMasterData = (id = 1) => {
  return apiInstance().get(`${masterData.getSources}/${id}`);
};

export const getInvestmentsMasterData = (id = 1) => {
  return apiInstance().get(`${masterData.getInvestments}/${id}`);
};

export const getEmployeeEmployeeDeferrals = () => {
  return delay(1000).then(() => {
    return employeeDeferralTypes;
  });
};

//Eligibility
export const getPlanEligibilityRuleMasterData = () => {
  return delay(1000).then(() => {
    return eligibilityRuleMaster;
  });
};

export const getPlanEligibilityMasterData = () => {
  return delay(1000).then(() => {
    return eligibilityMaster;
  });
};

export const getEmployeeClassificationForSources = () => {
  return delay(1000).then(() => {
    return employeeClassificationForSources;
  });
};

export const getPlanEligibility = () => {
  return delay(1000).then(() => {
    return manageEligibility;
  });
};

//Allocation
export const getAllocationPlanInvestmentMasterData = () => {
  return delay(1000).then(() => {
    return addSourceAllocation;
  });
};

//Vesting
export const getPlanVesting = () => {
  return delay(1000).then(() => {
    return vestingMaster;
  });
};

export const getSourcesHistory = () => {
  return delay(1000).then(() => {
    return sourcesEffectiveDateHistory;
  });
};

//Forfeiture
export const getForfeitureMaster = () => {
  return delay(1000).then(() => {
    return ForfeitureMaster;
  });
};

//Enrollment
export const getSourceEnrollment = () => {
  return delay(1000).then(() => {
    return manageSourceEnrollment;
  });
};
// export const getPlanSource=(planId)=>{
//   return apiInstance().get(`${enrollment.getPlanSources}/${planId}`);
// }

//Distributions
export const getPlanDistributions = () => {
  return delay(1000).then(() => {
    return manageDistributions;
  });
};

export const getPlanDistributionSourceData = () => {
  return delay(1000).then(() => {
    return distributionSourceMaster;
  });
};

//Loan
export const getPlanLoan = () => {
  return delay(1000).then(() => {
    return loanMaster;
  });
};

export const getPlanSponsoringOrganisationList = () => {
  return apiInstance().get(`${plan.getSponsoringOrganisationList}`);
};

export const postPlanSponsoringOrganisationList = (payload) => {
  return apiInstance()
    .post(`${plan.postSponsoringOrganisationList}`, payload)
    .then(() => getPlanSponsoringOrganisationList());
};

export const postPlanDetails = (payload) => {
  return apiInstance().post(`${plan.postPlan}`, payload);
};

export const getEmployeeClassifications = (id) => {
  return apiInstance().get(`${plan.getEmployeeClassifications}/${id}`);
};

export const getEmploymentStatusList1 = (companyId) => {
  return apiInstance().get(`${plan.getEmploymentStatusList}/${companyId}`);
};

export const getClassificationCodes = (companyId) => {
  return apiInstance().get(`${plan.getClassificationCodes}/${companyId}`);
};

export const getPlanCompensationCategories = (companyId) => {
  return apiInstance().get(`${plan.getCompensationCategories}/${companyId}`);
};
export const getCompensationCategories = (companyId) => {
  return apiInstance().get(`${plan.getCompensationCategories}/${companyId}`);
};

export const getEmployerSourcesList = (planId) => {
  return apiInstance().get(`${plan.getEmployerSourcesList}/${planId}`);
};

export const getEmployerSourceListForNonPayPeriod = (planId) => {
  return apiInstance().get(
    `${plan.getEmployerSourceListForNonPayPeriod}/${planId}`
  );
};

export const getVestingRulesList = (planId) => {
  return apiInstance().get(`${plan.getVestingRulesList}/${planId}`);
};

export const getAdoptingEmployerPlan = (id) => {
  return apiInstance().get(`${plan.getAdoptingEmployerPlan}/${id}`);
};

export const getPlanInvestmentData = (investmentId) => {
  return apiInstance().get(`${plan.getPlanInvestmentData}/${investmentId}`);
};
export const savePlanEligibilty = (payload) => {
  return apiInstance().post(`${plan.savePlanEligibility}`, payload);
};
export const getPlanEligibilty = (payload) => {
  return apiInstance().get(
    `${plan.getPlanEligibility}/${payload.eligibilityId}/${payload.amendmentId}`
  );
};
export const deletePlanEligibilty = (id, amendmentId) => {
  return apiInstance().delete(
    `${plan.deletePlanEligibility}/${id}/${amendmentId}`
  );
};
export const deletePlanAmendment = (id, amendmentId) => {
  return apiInstance().delete(
    `${plan.deletePlanAmendment}/${id}/${amendmentId}`
  );
};
export const getManageEligibleRule = (id) => {
  return apiInstance().get(`${plan.getManageEligibleRule}/${id}`);
};
export const savePlanAmendmentEligibilty = (payload) => {
  return apiInstance().post(`${plan.savePlanAmendment}`, payload);
};
export const getSourcesListForVesting = (id) => {
  return apiInstance().get(`${plan.getSourcesListForVesting}/${id}`);
};
export const GetGrowthRatefor5Years = () => {
  return apiInstance().get(`${plan.GetGrowthRatefor5Years}`);
};
export const getPlanDashBoardPayrollCounts = (id) => {
  return apiInstance().get(`${plan.getPlanDashboardPayrollCounts}/${id}`);
};
export const getEligibilityRateForPlan = (id) => {
  return apiInstance().get(`${plan.getEligibilityRateForPlan}/${id}`);
};
export const getParticipationRateForPlan = (id) => {
  return apiInstance().get(`${plan.getParticipationRateForPlan}/${id}`);
};
export const getContributionSummaryDetailsBasedOnPlanId = (planId) => {
  return apiInstance().get(
    `${plan.getContributionSummaryDetailsBasedOnPlanId}/${planId}`
  );
};
export const getProcessedLoanCount = (payload) => {
  return apiInstance().post(`${plan.getProcessedLoanCount}`, payload);
};
export const getProcessedPayrollCount = (payload) => {
  return apiInstance().post(`${plan.getProcessedPayrollCount}`, payload);
};
export const getProcessedDistributionCount = (payload) => {
  return apiInstance().post(`${plan.getProcessedDistributionCount}`, payload);
};
export const getProcessedIPRCCount = (payload) => {
  return apiInstance().post(`${plan.getProcessedIPRCCount}`, payload);
};
export const getProcessedRolloverCount = (payload) => {
  return apiInstance().post(`${plan.getProcessedRolloverCount}`, payload);
};
export const getAssociatedPlansTable = (payload) => {
  return apiInstance().post(`${plan.getAssociatedPlansTable}`, payload);
};
export const getActivePlanDetailsByCompanyId = (companyId) => {
  return apiInstance().get(
    `${plan.getActivePlanDetailsByCompanyId}/${companyId}`
  );
};
export const getNonFinchActivePlanDetailsByCompanyId = (companyId) => {
  return apiInstance().get(
    `${plan.getNonFinchActivePlanDetailsByCompanyId}/${companyId}`
  );
};
export const getServiceProviders = (id = 1) => {
  return apiInstance().get(`${masterData.getServiceProviders}/${id}`);
};
export const getFieldSchema = (formName) => {
  return apiInstance().get(`${plan.getFieldSchema}/${formName}`);
};
export const saveDisclosure = (payload) => {
  return apiInstance().post(`${plan.saveDisclosure}`, payload);
};
export const triggerDisclosure = (id) => {
  return apiInstance().post(
    `${plan.triggerDisclosure}/disclosureType?disclosureType=${id}`
  );
};
export const SaveCompensation = (payload) => {
  return apiInstance().post(`${plan.saveCompensation}`, payload);
};
export const getLTPTVestingData = (planId) => {
  return apiInstance().get(`${plan.getLTPTVesting}/${planId}`);
};

export const SaveForfeitureSetting = (payload) => {
  return apiInstance().post(`${plan.SaveForfeitureSetting}`, payload);
};
export const GetForfeitureSetting = (planId) => {
  return apiInstance().get(`${plan.GetForfeitureSetting}/${planId}`);
};
export const GetLOA = (id) => {
  return apiInstance().get(`${plan.GetLOA}/${id}`);
};
export const ListLOA = (planID) => {
  return apiInstance().get(`${plan.ListLOA}/${planID}`);
};
export const SaveLOA = (payload) => {
  return apiInstance().post(`${plan.SaveLOA}`, payload);
};
export const GetLimits = (id) => {
  return apiInstance().get(`${plan.GetSourceLimits}/${id}`);
};
export const ListLimits = (planID) => {
  return apiInstance().get(`${plan.ListSourceLimits}/${planID}`);
};
export const SaveLimits = (payload) => {
  return apiInstance().post(`${plan.SaveSourceLimits}`, payload);
};
export const DeleteLimits = (id) => {
  return apiInstance().delete(`${plan.DeleteSourceLimits}/${id}`);
};
export const SaveFundingSponsorAccountValidation = (payload) => {
  return apiInstance().post(
    `${plan.saveFundingSponsorAccountValidation}`,
    payload
  );
};
export const getSourceCodes = () => {
  return apiInstance().get(`${plan.getSourceCodes}`);
};

export const getActivePlanDetailsBasedOnClearingPartner = (
  clearingPartnerId,
  payload = {}
) => {
  const requestPayload = payload ?? {};

  return apiInstance().post(
    `${plan.getActivePlanDetailsBasedOnClearingPartner}`,
    {
      id: clearingPartnerId,
      pageSize: requestPayload.pageSize ?? 0,
      pageNumber: requestPayload.pageNumber ?? 0,
      searchText: requestPayload.searchText ?? "",
    }
  );
};

export const getPlansAndSourcesBasedOnCompanyId = (companyId) => {
  return apiInstance().get(
    `${plan.getPlansAndSourcesBasedOnCompanyId}/${companyId}`
  );
};

export const deleteDisclosure = (disclosureId, isDeleteAll = false) => {
  return apiInstance().delete(plan.deleteDisclosure, {
    params: {
      disclosureId: Number(disclosureId),
      isDeleteAll: isDeleteAll,
    },
  });
};
export const listDisclosures = () => {
  return apiInstance().get("/api/v1/Disclosure/ListDisclosures");
};

export const getAdvisorRepresentativesByPlanId = (request) => {
  return apiInstance().post(
    `${trade.getAdvisorRepresentativesByPlanId}`,
    request
  );
};
