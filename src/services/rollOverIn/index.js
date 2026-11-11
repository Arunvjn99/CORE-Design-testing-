import apiInstance from "../api";
import { rollOver } from "@/services/endpoints/withdrawal";

export const saveRolloverInRequest = (payload) => {
  return apiInstance().post(`${rollOver.saveRolloverInRequest}`, payload);
};

export const getRolloverInRequestDetailsByEmployeeId = (employeeId, planId) => {
  return apiInstance().get(
    `${rollOver.getRolloverInRequestDetailsByEmployeeId}/${employeeId}/${planId}`
  );
};

export const deleteRolloverInRequestDetailsById = (employeeId) => {
  return apiInstance().get(
    `${rollOver.deleteRolloverInRequestDetailsById}/${employeeId}`
  );
};

export const getRolloverInRequestDetailsById = (id) => {
  return apiInstance().get(`${rollOver.getRolloverInRequestDetailsById}/${id}`);
};

export const saveRollOverDocuments = (payload) => {
  return apiInstance().post(rollOver.saveRollOverDocuments, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const approveOrRejectRolloverInRequest = (payload) => {
  return apiInstance().post(
    `${rollOver.approveOrRejectRolloverInRequest}`,
    payload
  );
};

export const addNotesRollOverIn = (payload) => {
  return apiInstance().post(`${rollOver.addNotes}`, payload);
};
