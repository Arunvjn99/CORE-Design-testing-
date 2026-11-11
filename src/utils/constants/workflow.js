export const manageWorkFlowFormNames = {
  WORK_FLOW: `work-flow`,
  ADMIN_GROUP: `admin-group`,
};

export const workFlowFormFields = {
  [manageWorkFlowFormNames.WORK_FLOW]: {
    status: "status",
    fileRecievedFrom: "fileRecievedFrom",
    fileRecievedTo: "fileRecievedTo",
    planNameorId: "planNameorId",
    module: "module",
    dateRange: "dateRange",
    assignType: "assignType",
    planName: "planName",
    assignedTo: "assignedTo",
    fileStatus: "fileStatus",
    workStatus: "workStatus",
    planId: "planId",
    workItemStatus: "workItemStatus",
  },
  [manageWorkFlowFormNames.ADMIN_GROUP]: {
    adminName: "adminName",
    leadId: "leadId",
  },
};
