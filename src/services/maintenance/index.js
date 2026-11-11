import apiInstance from "../api";
import { maintenance } from "@/services/endpoints/maintenance";
import { delay } from "../helpers";
import getPlans from "../../mocks/getPlans.json";
// import holidayCalendar from "../../mocks/holidayCalendar.json";
import ScheduleExceptionReport from "../../mocks/scheduleExceptionReport.json";
import fileApiInstance from "../fileApi";

export const getMaintenanceDetails = () => {
  return delay(1000).then(() => {
    return getPlans;
  });
};

//Manage Maintenance
export const getHolidayCalendarMaster = (payload) => {
  return apiInstance().post(`${maintenance.getHolidayCalendarMaster}`, payload);
};

export const saveHoliday = (payload) => {
  return apiInstance().post(`${maintenance.saveHolidayDetails}`, payload);
};

export const deleteHoliday = (id) => {
  return apiInstance().delete(`${maintenance.deleteHoliday}/${id}`);
};
export const addPlanGroup = (payload) => {
  return apiInstance().post(`${maintenance.addPlanGroup}`, payload);
};
export const getPlanGroupInfo = (id) => {
  return apiInstance().get(`${maintenance.getPlanGroupById}/${id}`);
};
export const getPlanGroups = (payload) => {
  return apiInstance().post(`${maintenance.getPlanGroups}`, payload);
};
export const getPlanGroupsWithoutCount = (payload) => {
  return apiInstance().get(
    `${maintenance.getPlanGroupsWithoutCount}/${payload}`
  );
};
export const getPlansBySearch = (payload) => {
  return apiInstance().post(`${maintenance.getPlansInPlanGroup}`, payload);
};
export const deletePlanGroup = (id) => {
  return apiInstance().get(`${maintenance.deletePlanGroup}/${id}`);
};

export const getAdvisorsList = () => {
  return apiInstance().get(`${maintenance.getAdvisors}`);
};

export const getCustodiansList = () => {
  return apiInstance().get(`${maintenance.getCustodians}`);
};

export const getInvestmentNamesList = () => {
  return apiInstance().get(`${maintenance.getInvestments}`);
};

export const getTrusteesList = () => {
  return apiInstance().get(`${maintenance.getTrustees}`);
};

export const getScheduleExceptionReportMaster = () => {
  return delay(1000).then(() => {
    return ScheduleExceptionReport;
  });
};

export const checkIfTradeHolidayOrNot = () => {
  return apiInstance().get(`${maintenance.checkIfTradeHolidayOrNot}`);
};

export const getPlansBySearchCriteria = (payload) => {
  return apiInstance().post(`${maintenance.getPlansBySearchCriteria}`, payload);
};

export const getPlanListWithAppliedFilter = (payload) => {
  return apiInstance().post(
    `${maintenance.getPlanListWithAppliedFilter}`,
    payload
  );
};
export const getPayrollScheduleExtension = (payload) => {
  return apiInstance().get(
    `${maintenance.getPayrollScheduleExtension}/${payload.tenantId}/${payload.extensionDate}`
  );
};
export const getPayrollScheduleExceptionReport = (payload) => {
  return apiInstance().post(
    `${maintenance.getPayrollscheduleException}`,
    payload
  );
};
export const updateSchedulePayDate = (payload) => {
  return apiInstance().post(`${maintenance.updateSchedulePayDate}`, payload);
};
export const downloadPayrollScheduleExceptionReport = (payload) => {
  return fileApiInstance().post(
    `${maintenance.downloadPayrollScheduleException}`,
    payload
  );
};
