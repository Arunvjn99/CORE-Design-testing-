export const maintenance = {
  getHolidayCalendarMaster: "/api/v1/Maintenance/GetHolidays",
  saveHolidayDetails: "/api/v1/Maintenance/AddHolidays",
  deleteHoliday: "/api/v1/Maintenance/DeleteHoliday",
  getPlanGroups: "/api/v1/Maintenance/GetPlanGroups",
  getPlanGroupsWithoutCount: "/api/v1/Maintenance/getPlanGroupsWithoutCount",
  getAdvisors: "/api/v1/Maintenance/GetAdvisors",
  getCustodians: "/api/v1/Maintenance/GetCustodians",
  getInvestments: "/api/v1/Maintenance/GetInvestmentNames",
  getTrustees: "/api/v1/Maintenance/GetTrustees",
  getPlansInPlanGroup: "/api/v1/Maintenance/GetPlansBySearchCriteria",
  deletePlanGroup: "/api/v1/Maintenance/DeletePlanGroup",
  getPlansBySearchCriteria: "/api/v1/Maintenance/GetPlansBySearchCriteria",
  addPlanGroup: "/api/v1/Maintenance/AddPlanGroup",
  getPlanGroupById: "/api/v1/Maintenance/GetPlanGroupById",
  getPayrollScheduleExtension: "/api/v1/Maintenance/PayrollScheduleExtension",
  getPayrollscheduleException:
    "/api/v1/Maintenance/GetPayrollScheduleExceptionReport",
  updateSchedulePayDate: "/api/v1/Maintenance/UpdateSchedulePayDate",
  downloadPayrollScheduleException:
    "/api/v1/Maintenance/DownloadScheduleExceptionReport",
  getPlanListWithAppliedFilter:
    "/api/v1/Maintenance/GetPlanListWithAppliedFilter",
  checkIfTradeHolidayOrNot: "/api/v1/Maintenance/CheckIfTradeHolidayOrNot",
};

export const workflow = {
  GetAdminProcessedFiles: "api/v1/Workflow/GetAdminProcessedFiles",
  GetPayrollFileAgeing: "api/v1/Workflow/GetPayrollFileAgeing",
  GetActiveFilesCount: "/api/v1/Workflow/GetActiveFilesCount",
  GetHeatMapDetails: "api/v1/Workflow/GetHeatMapDetails",
  saveAdminGroup: "/api/v1/Workflow/SaveAdminGroup",
  getAdminGroup: "/api/v1/Workflow/GetAdminGroup",
  reAssignWorkItemById: "/api/v1/Workflow/ReAssignWorkItemById",
  getWorkItemDetailsBySearchCriteria:
    "/api/v1/Workflow/GetWorkItemDetailsBySearchCriteria",
  getAssignedToFiltersOptionsByUserIdCommand:
    "/api/v1/Workflow/GetAssignedToFiltersOptionsByUserIdCommand",
  getUserDetailsAndRole: "api/UserRegistration/GetUserDetailsAndRole",
  startOrStopWorkItem: "/api/v1/Workflow/StartOrStopWorkItem",
  getWorkItemDetailsById: "/api/v1/Workflow/GetWorkItemDetailsById",
  deleteWorkItem: "/api/v1/Workflow/DeleteWorkItem",
  deleteAdminGroup: "/api/v1/Workflow/DeleteAdminGroup",
  getPlanListBasedOnUserId: "/api/v1/Workflow/GetPlansByUserId",
};

export const restriction = {
  getRestrictionsBySearchCriteria:
    "api/v1/restriction/getRestrictionsBySearchCriteria",
  getRestrictionCountByStatus: "api/v1/restriction/GetRestrictionCountByStatus",
  getRestrictionDetailsById: "api/v1/restriction/GetRestrictionDetailsById",
  saveRestriction: "api/v1/Restriction/AddRestriction",
  getActiveTransactionsAvailableForRestrictions:
    "api/v1/Plan/GetActiveTransactionsAvailableForRestrictions",
  submitRestrictionDetails: "api/v1/Restriction/SubmitRestrictionDetails",
  deleteRestrictionDetails: "api/v1/Restriction/DeleteRestrictionDetails",
};
