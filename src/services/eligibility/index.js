import apiInstance from "../api";
// import endPoints from "../endpoints";
import { delay } from "../helpers";
import getPlans from "../../mocks/getPlans.json";
import eligibilitySummaryReports from "../../mocks/eligibilitySummaryReports.json";
import newEmployeeEligibilityPlanReport from "../../mocks/newEmployeeEligibilityReport.json";
import { eligibility } from "@/services/endpoints/enrollment";
import { plan } from "@/services/endpoints/plan";

export const getEligibilityDetails = () => {
  // return apiInstance().get(plan.get);
  return delay(1000).then(() => {
    return getPlans;
  });
};

//Manage Eligibility
export const getEligibilitySummaryReport = () => {
  return delay(1000).then(() => {
    return eligibilitySummaryReports;
  });
};

export const getnewEmployeeEligibilityPlanReport = () => {
  return delay(1000).then(() => {
    return newEmployeeEligibilityPlanReport;
  });
};

export const runEligibility = (companyId, planId, sources) => {
  return apiInstance().post(
    `${eligibility.runEligibility}/${companyId}/${planId}`,
    sources
  );
};
export const getPlanAndScource = (id) => {
  return apiInstance().post(`${plan.getPlanAndSource}/${id}`);
};
