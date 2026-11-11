import apiInstance from "../api";
import { onboardingPlan } from "@/services/endpoints/onboarding";
import { masterData } from "@/services/endpoints/company";
import { enrollment } from "@/services/endpoints/enrollment";
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

export const postOnboardingPlanGridDetails = (payload) => {
  return apiInstance().post(`${onboardingPlan.postPlanGridView}`, payload);
};
export const getMasterOnboardingPlans = (payload) => {
  return apiInstance().get(`${onboardingPlan.getMasterplans}/1`); //tenantId HardCoded
};
export const getOnboardingPlanCount = () => {
  return apiInstance().get(`${onboardingPlan.getPlanCount}`);
};

export const GetOnboardingplanYos = (id) => {
  return apiInstance().get(`${onboardingPlan.getPlanYOS}/${id}`);
};
export const SaveOnboardingPlanYOS = (payload) => {
  return apiInstance().post(`${onboardingPlan.SavePlanYOS}`, payload);
};
export const setOnboardingPlanStatus = (planId, planStatus) => {
  var payload = { planId: planId, planStatus: planStatus };
  return apiInstance().post(`${onboardingPlan.setPlanStatus}`, payload);
};

// export const getWithdrawalSubType = (planId) => {
//   return apiInstance().get(
//     `${onboardingPlan.getWithdrawalSubType}/${planId}`
//   );
// };

export const getOnboardingPlanDetails = (id) => {
  return apiInstance().get(`${onboardingPlan.getPlan}/${id}`);
};

export const getOnboardingPlanAdvisor = (id) => {
  return apiInstance().get(`${onboardingPlan.getAdvisor}/${id}`);
};
export const OnboardingPlanlistAdvisor = (planId) => {
  return apiInstance().get(`${onboardingPlan.listAdvisor}/${planId}`);
};
export const OnboardingPlanDeleteAdvisor = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteAdvisor}/${id}`);
};
export const OnboardingPlansaveAdvisor = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveAdvisor}`, payload);
};
export const saveAdvisorToOnboardingPlan = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveAdvisorToPlan}`, payload);
};

export const getOnboardingPlanAllocation = (id) => {
  return apiInstance().get(`${onboardingPlan.getAllocation}/${id}`);
};
export const OnboardingPlanlistAllocation = (planId) => {
  return apiInstance().get(`${onboardingPlan.listAllocation}/${planId}`);
};
export const deleteAllocation6 = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteAllocation}/${id}`);
};
export const OnboardingPlanSaveAllocation = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveAllocation}`, payload);
};

export const getBasicOnboardingPlanDetails = (id) => {
  return apiInstance().get(`${onboardingPlan.getBasicPlanDetails}/${id}`);
};
export const getReviewAndOnboardingPlanDetails = (id) => {
  return apiInstance().get(`${onboardingPlan.getReviewAndPlanDetails}/${id}`);
};
export const listBasicPlanDetails1 = (planId) => {
  return apiInstance().get(`${onboardingPlan.listBasicPlanDetails}/${planId}`);
};
// export const getPlanAndCompanyDetails = (planId) => {
//   return apiInstance().get(
//     `${onboardingPlan.getPlanAndCompanyDetails}/${planId}`
//   );
// };
export const deletebasicplanDetails1 = (id) => {
  return apiInstance().delete(`${onboardingPlan.deletebasicplanDetails}/${id}`);
};
export const saveBasicOnboardingPlanDetails = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveBasicPlanDetails}`, payload);
};

export const getCompensation1 = (id) => {
  return apiInstance().get(`${onboardingPlan.getCompensation}/${id}`);
};
export const listCompensation = (planId) => {
  return apiInstance().get(`${onboardingPlan.listCompensation}/${planId}`);
};
export const deleteCompensation2 = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteCompensation}/${id}`);
};
export const saveCompensation = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveCompensation}`, payload);
};

export const getCompliance1 = (id) => {
  return apiInstance().get(`${onboardingPlan.getCompliance}/${id}`);
};
export const OnboardingPlanlistCompliance = (planId) => {
  return apiInstance().get(`${onboardingPlan.listCompliance}/${planId}`);
};
export const deleteCompliance3 = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteCompliance}/${id}`);
};
export const saveCompliance1 = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveCompliance}`, payload);
};

export const getOnboardingPlanCustodian = (id) => {
  return apiInstance().get(`${onboardingPlan.getCustodian}/${id}`);
};
export const OnboardingPlanlistCustodian = (planId) => {
  return apiInstance().get(`${onboardingPlan.listCustodian}/${planId}`);
};
export const OnboardingPlanDeleteCustodian = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteCustodian}/${id}`);
};
export const onboardingPlanSaveCustodian = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveCustodian}`, payload);
};

export const getOnboardingPlanEligibleRule = (id) => {
  return apiInstance().get(`${onboardingPlan.getEligibleRule}/${id}`);
};
export const OnboardingPlanlistEligibleRule = (planId) => {
  return apiInstance().get(`${onboardingPlan.listEligibleRule}/${planId}`);
};
export const getOnboardingPlanEligibleMasterLTPTData = () => {
  return apiInstance().get(`${onboardingPlan.getPlanEligibleMasterLTPTData}`);
};

export const deleteEligibleRule1 = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteEligibleRule}/${id}`);
};
export const saveEligibleRule1 = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveEligibleRule}`, payload);
};

export const getOnboardingPlanEnrollment = (id) => {
  return apiInstance().get(`${onboardingPlan.getEnrollment}/${id}`);
};
export const listEnrollment1 = (planId) => {
  return apiInstance().get(`${onboardingPlan.listEnrollment}/${planId}`);
};
export const deleteEnrollment1 = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteEnrollment}/${id}`);
};
export const saveEnrollment2 = (payload) => {
  return apiInstance().post(`${enrollment.SaveEnrollment}`, payload);
};
export const OnboardingPlanSaveEnrollmentSetting = (payload) => {
  return apiInstance().post(`${onboardingPlan.SaveEnrollmentSetting}`, payload);
};

export const getOnboardingPlanEntryDate = (id) => {
  return apiInstance().get(`${onboardingPlan.getEntryDate}/${id}`);
};
export const OnboardingPlanlistEntryDate = (planId) => {
  return apiInstance().get(`${onboardingPlan.listEntryDate}/${planId}`);
};
export const OnboardingPlanDeleteEntryDate = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteEntryDate}/${id}`);
};
export const OnboardingPlanSaveEntryDate = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveEntryDate}`, payload);
};

export const getForfeiture1 = (id) => {
  return apiInstance().get(`${onboardingPlan.getForfeiture}/${id}`);
};
export const OnboardingPlanlistForfeiture = (planId) => {
  return apiInstance().get(`${onboardingPlan.listForfeiture}/${planId}`);
};
export const deleteForfeiture1 = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteForfeiture}/${id}`);
};
export const OnboardingPlanSaveForfeiture = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveForfeiture}`, payload);
};

export const getOnboardingPlanFunding = (id) => {
  return apiInstance().get(`${onboardingPlan.getFunding}/${id}`);
};
export const OnboardingPlanlistFunding = (planId) => {
  return apiInstance().get(`${onboardingPlan.listFunding}/${planId}`);
};
export const OnboardingPlanDeleteFunding = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteFunding}/${id}`);
};
export const OnboardingPlanSaveFunding = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveFunding}`, payload);
};

export const getOnboardingPlanInvestment = (id) => {
  return apiInstance().get(`${onboardingPlan.getInvestment}/${id}`);
};
export const getMasterInvestment1 = (id) => {
  return apiInstance().get(`${trade.getInvestment}/${id}`);
};
export const OnboardingPlanlistInvestment = (planId) => {
  return apiInstance().get(`${onboardingPlan.listInvestment}/${planId}`);
};
export const OnboardingPlanDeleteInvestment = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteInvestment}/${id}`);
};
export const OnboardingPlanSaveInvestment = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveInvestment}`, payload);
};
export const addInvestmentsToOnboardingPlan = (payload) => {
  return apiInstance().post(`${onboardingPlan.addInvestmentsToPlan}`, payload);
};

export const getLoanOnboardingPlan = (id) => {
  return apiInstance().get(`${onboardingPlan.getLoan}/${id}`);
};
export const OnboardingPlanlistLoan = (planId) => {
  return apiInstance().get(`${onboardingPlan.listLoan}/${planId}`);
};
export const OnboardingPlanDeleteLoan = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteLoan}/${id}`);
};
export const OnboardingPlanSaveLoan = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveLoan}`, payload);
};

export const getOnboardingPlanRetirement = (id) => {
  return apiInstance().get(`${onboardingPlan.getRetirement}/${id}`);
};
export const OnboardingPlanlistRetirement = (planId) => {
  return apiInstance().get(`${onboardingPlan.listRetirement}/${planId}`);
};
export const OnboardingPlanDeleteRetirement = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteRetirement}/${id}`);
};
export const OnboardingPlanSaveRetirement = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveRetirement}`, payload);
};

export const getOnboardingPlanRollOver = (id) => {
  return apiInstance().get(`${onboardingPlan.getRollover}/${id}`);
};
export const OnboardingPlanlistRollOver = (planId) => {
  return apiInstance().get(`${onboardingPlan.listRollover}/${planId}`);
};
export const OnboardingPlanDeleteRollOver = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteRollover}/${id}`);
};
export const OnboardingPlanSaveRollOver = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveRollover}`, payload);
};

export const getOnboardingPlanSource = (id) => {
  return apiInstance().get(`${onboardingPlan.getSource}/${id}`);
};
export const OnboardingPlanlistSource = (planId) => {
  return apiInstance().get(`${onboardingPlan.listSource}/${planId}`);
};
export const OnboardingPlanDeleteSource = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteSource}/${id}`);
};
export const OnboardingPlanSaveSource = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveSource}`, payload);
};

export const OnboardingPlanGetSponsor = (id) => {
  return apiInstance().get(`${onboardingPlan.getSponsor}/${id}`);
};
export const OnboardingPlanlistSponsor = (planId) => {
  return apiInstance().get(`${onboardingPlan.listSponsor}/${planId}`);
};
export const OnboardingPlanDeleteSponsor = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteSponsor}/${id}`);
};
export const OnboardingPlanSaveSponsor = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveSponsor}`, payload);
};

export const getTransfer1 = (id) => {
  return apiInstance().get(`${onboardingPlan.getTransfer}/${id}`);
};
export const OnboardingPlanlistTransfer = (planId) => {
  return apiInstance().get(`${onboardingPlan.listTransfer}/${planId}`);
};
export const deleteTransfer1 = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteTransfer}/${id}`);
};
export const OnboardingPlanSaveTransfer = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveTransfer}`, payload);
};

export const getOnboardingPlanTrustee = (id) => {
  return apiInstance().get(`${onboardingPlan.getTrustee}/${id}`);
};
export const OnboardingPlanlistTrustee = (planId) => {
  return apiInstance().get(`${onboardingPlan.listTrustee}/${planId}`);
};
export const OnboardingPlanDeleteTrustee = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteTrustee}/${id}`);
};
export const OnboardingPlansaveTrustee = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveTrustee}`, payload);
};
export const saveTrusteeToOnboardingPlan = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveTrusteeToPlan}`, payload);
};

export const OnboardingPlangetVesting = (id) => {
  return apiInstance().get(`${onboardingPlan.getVesting}/${id}`);
};
export const OnboardingPlanlistVesting = (planId) => {
  return apiInstance().get(`${onboardingPlan.listVesting}/${planId}`);
};
export const OnboardingPlanDeleteVesting = (payload) => {
  return apiInstance().post(`${onboardingPlan.deleteVesting}`, payload);
};
export const deleteOnboardingPlanAdditionalVesting = (payload) => {
  return apiInstance().post(
    `${onboardingPlan.deleteAdditionalVesting}`,
    payload
  );
};
export const OnboardingPlanSaveVesting = (payload) => {
  return apiInstance().post(`${onboardingPlan.saveVesting}`, payload);
};

export const getOnboardingPlanWithdrawal = (id) => {
  return apiInstance().get(`${onboardingPlan.getWithdrawal}/${id}`);
};
export const OnboardingPlanlistWithdrawal = (planId) => {
  return apiInstance().get(`${onboardingPlan.listWithdrawal}/${planId}`);
};
export const OnboardingPlandeleteWithdrawal = (id) => {
  return apiInstance().delete(`${onboardingPlan.deleteWithdrawal}/${id}`);
};
export const OnboardingPlanSaveWithdrawal = (payload) => {
  console.log("payload", payload);
  return apiInstance().post(`${onboardingPlan.saveWithdrawal}`, payload);
};

// Trustee
export const getOnboardingPlanTrusteeCompany = (id = 1) => {
  return apiInstance()
    .get(`${masterData.getTrustees}/${id}`)
    .then((response) => transformMasterDataInfo(response));
};

// Trustee
export const getOnboardingPlanAdvisorCompany = (id = 1) => {
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
export const getOnboardingPlanIRSLimits = (planId) => {
  return apiInstance().get(`${onboardingPlan.getIRSLimits}/${planId}`);
};
export const getOnboardingPlanCustodianCompany = (id = 1) => {
  return apiInstance()
    .get(`${masterData.getCustodians}/${id}`)
    .then((response) => transformMasterDataInfo(response));
};

export const getOnboardingPlanCompanyNameExists = (planName) => {
  return apiInstance().get(`${onboardingPlan.checkPlanNameExists}/${planName}`);
};

export const checkRkOnboardingPlanNumberExists = (rkPlanNumber) => {
  return apiInstance().get(
    `${onboardingPlan.checkRkPlanNumberExists}/${rkPlanNumber}`
  );
};

// Sources
export const getOnboardingPlanSources = () => {
  return delay(1000).then(() => {
    return manageSources;
  });
};

export const getOnboardingPlanSourcesMasterData = (id = 1) => {
  return apiInstance().get(`${masterData.getSources}/${id}`);
};

export const getOnboardingPlanInvestmentsMasterData = (id = 1) => {
  return apiInstance().get(`${masterData.getInvestments}/${id}`);
};

export const getOnboardingPlanEmployeeEmployeeDeferrals = () => {
  return delay(1000).then(() => {
    return employeeDeferralTypes;
  });
};

//Eligibility
export const getOnboardingPlanEligibilityRuleMasterData = () => {
  return delay(1000).then(() => {
    return eligibilityRuleMaster;
  });
};

export const getOnboardingPlanEligibilityMasterData = () => {
  return delay(1000).then(() => {
    return eligibilityMaster;
  });
};

export const getOnboardingPlanEmployeeClassificationForSources = () => {
  return delay(1000).then(() => {
    return employeeClassificationForSources;
  });
};

export const getOnboardingPlanEligibility = () => {
  return delay(1000).then(() => {
    return manageEligibility;
  });
};

//Allocation
export const getAllocationOnboardingPlanInvestmentMasterData = () => {
  return delay(1000).then(() => {
    return addSourceAllocation;
  });
};

//Vesting
export const getOnboardingPlanVesting = () => {
  return delay(1000).then(() => {
    return vestingMaster;
  });
};

export const getOnboardingPlanSourcesHistory = () => {
  return delay(1000).then(() => {
    return sourcesEffectiveDateHistory;
  });
};

//Forfeiture
export const getOnboardingPlanForfeitureMaster = () => {
  return delay(1000).then(() => {
    return ForfeitureMaster;
  });
};

//Enrollment
export const getOnboardingPlanSourceEnrollment = () => {
  return delay(1000).then(() => {
    return manageSourceEnrollment;
  });
};
// export const getPlanSource=(planId)=>{
//   return apiInstance().get(`${enrollment.getPlanSources}/${planId}`);
// }

//Distributions
export const getOnboardingPlanDistributions = () => {
  return delay(1000).then(() => {
    return manageDistributions;
  });
};

export const getOnboardingPlanDistributionSourceData = () => {
  return delay(1000).then(() => {
    return distributionSourceMaster;
  });
};

//Loan
export const getOnboardingPlanLoan = () => {
  return delay(1000).then(() => {
    return loanMaster;
  });
};

export const getOnboardingPlanSponsoringOrganisationList = () => {
  return apiInstance().get(`${onboardingPlan.getSponsoringOrganisationList}`);
};

export const postOnboardingPlanSponsoringOrganisationList = (payload) => {
  return apiInstance()
    .post(`${onboardingPlan.postSponsoringOrganisationList}`, payload)
    .then(() => getOnboardingPlanSponsoringOrganisationList());
};

export const postOnboardingPlanDetails = (payload) => {
  return apiInstance().post(`${onboardingPlan.postPlan}`, payload);
};

export const getOnboardingPlanEmployeeClassifications = (id) => {
  return apiInstance().get(
    `${onboardingPlan.getEmployeeClassifications}/${id}`
  );
};

export const getOnboardingPlanEmploymentStatusList = (companyId) => {
  return apiInstance().get(
    `${onboardingPlan.getEmploymentStatusList}/${companyId}`
  );
};

export const getOnboardingPlanClassificationCodes = (companyId) => {
  return apiInstance().get(
    `${onboardingPlan.getClassificationCodes}/${companyId}`
  );
};

export const getOnboardingPlanCompensationCategories = (companyId) => {
  return apiInstance().get(
    `${onboardingPlan.getCompensationCategories}/${companyId}`
  );
};

export const getOnboardingPlanEmployerSourcesList = (planId) => {
  return apiInstance().get(
    `${onboardingPlan.getEmployerSourcesList}/${planId}`
  );
};

export const getOnboardingPlanVestingRulesList = (planId) => {
  return apiInstance().get(`${onboardingPlan.getVestingRulesList}/${planId}`);
};

export const getAdoptingEmployerOnboardingPlan = (id) => {
  return apiInstance().get(`${onboardingPlan.getAdoptingEmployerPlan}/${id}`);
};

export const getOnboardingPlanInvestmentData = (investmentId) => {
  return apiInstance().get(
    `${onboardingPlan.getPlanInvestmentData}/${investmentId}`
  );
};
export const saveOnboardingPlanEligibilty = (payload) => {
  return apiInstance().post(`${onboardingPlan.savePlanEligibility}`, payload);
};
export const getOnboardingPlanEligibilty = (payload) => {
  return apiInstance().get(
    `${onboardingPlan.getPlanEligibility}/${payload.eligibilityId}/${payload.amendmentId}`
  );
};
export const deleteOnboardingPlanEligibilty = (id, amendmentId) => {
  return apiInstance().delete(
    `${onboardingPlan.deletePlanEligibility}/${id}/${amendmentId}`
  );
};
export const deleteOnboardingPlanAmendment = (id, amendmentId) => {
  return apiInstance().delete(
    `${onboardingPlan.deletePlanAmendment}/${id}/${amendmentId}`
  );
};
export const getOnboardingPlanManageEligibleRule = (id) => {
  return apiInstance().get(`${onboardingPlan.getManageEligibleRule}/${id}`);
};
export const saveOnboardingPlanAmendmentEligibilty = (payload) => {
  return apiInstance().post(`${onboardingPlan.savePlanAmendment}`, payload);
};
// export const getSourcesListForVesting = (id) => {
//   return apiInstance().get(
//     `${onboardingPlan.getSourcesListForVesting}/${id}`
//   );
// };
export const GetGrowthRatefor5YearsOnboardingPlan = () => {
  return apiInstance().get(`${onboardingPlan.GetGrowthRatefor5Years}`);
};
