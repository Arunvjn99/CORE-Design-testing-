import apiInstance from "../api";
import { vesting } from "@/services/endpoints/vesting";

export const getEmployeeRetirementDetails = (payload) => {
  return apiInstance().get(
    `${vesting.getEmployeeRetirementDetails}/${payload.planId}/${payload.employeeId}`
  );
};
export const getEmployeeVestingDetails = (payload) => {
  return apiInstance().get(
    `${vesting.getEmployeeVestingDetails}/${payload.planId}/${payload.employeeId}`
  );
};
export const getEmployeeYOSDetails = (payload) => {
  return apiInstance().get(
    `${vesting.getEmployeeYOSDetails}/${payload.planId}/${payload.employeeId}`
  );
};
export const GetEmployeeYOSHistoryDetails = (id) => {
  return apiInstance().get(`${vesting.GetEmployeeYOSHistoryDetails}/${id}`);
};
export const postSaveVestingConfigurationForSource = (payload) => {
  return apiInstance().post(
    `${vesting.postSaveVestingConfigurationForSource}`,
    payload
  );
};
export const postEmployeeVestingHistoryDetails = (
  employeeId,
  planId,
  sourceId
) => {
  return apiInstance().get(
    `${vesting.postEmployeeVestingHistoryDetails}/${employeeId}/${planId}/${sourceId}`
  );
};
export const runVesting = (payload) => {
  return apiInstance().post(`${vesting.runVesting}`, payload);
};
export const getVestingSummaryReport = (payload) => {
  return apiInstance().post(
    `${vesting.getVestingSummaryReportDetails}`,
    payload
  );
};
export const getEmployeeVestingReport = (employeeVestingId, planId) => {
  return apiInstance().get(
    `${vesting.getEmployeeVestingReportDetails}/${employeeVestingId}/${planId}`
  );
};
export const GetVestingOverrideRestriction = (payload) => {
  return apiInstance().post(
    `${vesting.getVestingOverrideRestriction}`,
    payload
  );
};
