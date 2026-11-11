import apiInstance from "../api";
import { documents } from "@/services/endpoints/misc";
import fileApiInstance from "../fileApi";

export const getDocuments = (payload) => {
  return apiInstance().post(`${documents.getDocuments}`, payload);
};
export const downloadDocument = (fileName) => {
  return fileApiInstance().get(`${documents.downloadDocument}/${fileName}`);
};

export const retrieveDocument = (fileName) => {
  return fileApiInstance().get(`${documents.retrieveDocument}/${fileName}`);
};

export const deleteDocumentsById = (documentId) => {
  return apiInstance().delete(`${documents.deleteDocumentsById}/${documentId}`);
};
export const addNotesDocument = (payload) => {
  return apiInstance().post(`${documents.addDocumentNotes}`, payload);
};
export const SaveManualUploadDocument = (payload) => {
  return apiInstance().post(`${documents.SaveManualUploadDocument}`, payload);
};
export const getDocumentTypes = (roleFilter = false, planIds = [0]) => {
  return apiInstance().post(
    `${documents.getDocumentTypes}/${roleFilter}`,
    planIds
  );
};
export const addMasterDocumentTypes = (payload) => {
  return apiInstance().post(`${documents.AddMasterDocumentType}`, payload);
};
export const getDocumentTypeDetails = (documentId) => {
  return apiInstance().get(`${documents.getDocumentTypeDetails}/${documentId}`);
};
export const EditDocumentRole = (payload) => {
  return apiInstance().post(`${documents.editDocumentRole}`, payload);
};

export const getDocumentDeliveryPlanmap = (planId) => {
  return apiInstance().get(`${documents.getDocumentDeliveryPlanmap}/${planId}`);
};

export const saveDocumentDeliveryEmployeeMap = (payload) => {
  return apiInstance().post(
    `${documents.saveDocumentDeliveryEmployeeMap}`,
    payload
  );
};

export const getDocumentDeliveryEmployeeMap = (planId, employeeId) => {
  return apiInstance().get(
    `${documents.getDocumentDeliveryEmployeeMap}/${planId}/${employeeId}`
  );
};
