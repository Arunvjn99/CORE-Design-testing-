import apiInstance from "../api";
import { mapper } from "@/services/endpoints/mapper";
import { integration } from "@/services/endpoints/integrations";

export const getMappingProfiles = () => {
  return apiInstance().get(`${mapper.getMappingProfiles}`);
};
export const getAllProfiles = () => {
  return apiInstance().get(`${mapper.getProfiles}`);
};
export const getInputProfiles = () => {
  return apiInstance().get(`${mapper.getInputProfiles}`);
};
export const getInputProfilesIRA = (id) => {
  return apiInstance().get(`${mapper.getInputProfilesByFileType}/${id}`);
};
export const getOutputProfiles = () => {
  return apiInstance().get(`${mapper.getOutputProfiles}`);
};

export const getOutputProfileName = () => {
  return apiInstance().get(`${mapper.getOutputProfileName}`);
};

export const getProfileData = (id) => {
  return apiInstance().get(`${mapper.getProfileData}/${id}`);
};
export const verifyMapService = (id) => {
  return apiInstance().get(`${mapper.verifyMapService}/${id}`);
};

export const onProfileCreate = (payload) => {
  return apiInstance().post(mapper.saveOnProfileCreate, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const tempMappingOnProfileCreate = (payload) => {
  return apiInstance().post(mapper.SaveOnTempMappingProfileCreate, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const deleteOutputProfile = (payload) => {
  return apiInstance().delete(`${mapper.deleteOutputProfile}/${payload}`);
};

export const saveProfileFromYaml = (payload) => {
  return apiInstance().post(mapper.saveProfileFromYaml, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const saveBasicInformation = (payload) => {
  return apiInstance().post(`${mapper.SaveBasicInformation}`, payload);
};

export const fixedWidthOutputMappingSave = (payload) => {
  return apiInstance().post(`${mapper.fixedWidthOutputMappingSave}`, payload);
};

export const onFixedLengthFileCreate = (payload) => {
  return apiInstance().post(`${mapper.onFixedLengthFileCreate}`, payload);
};

export const cloneProfile = (id, name) => {
  return apiInstance().get(`${mapper.cloneProfile}/${id}/${name}`);
};

export const cloneOutputProfile = (id, name) => {
  return apiInstance().get(`${mapper.cloneOutputProfile}/${id}/${name}`);
};

export const downloadSampleFixedWidthFile = (id) => {
  return apiInstance().get(`${mapper.downloadSampleFixedWidthFile}/${id}`);
};

export const validateOutputProfile = (name) => {
  return apiInstance().get(`${mapper.validateOutputProfile}/${name}`);
};

export const getActivePlans = (payload) => {
  return apiInstance().post(`${mapper.getActivePlans}`, payload);
};

export const getPlanListWithAppliedFilterForIntegration = (payload) => {
  return apiInstance().post(
    `${integration.getPlanListWithAppliedFilterForIntegration}`,
    payload
  );
};

export const checkProfileNameExists = (id, profileName) => {
  return apiInstance().get(
    `${mapper.checkProfileNameExists}/${id}/${profileName}`
  );
};

export const searchProfiles = (payload) => {
  return apiInstance().post(`${mapper.searchProfiles}`, payload);
};

export const onUpdateStatus = (payload) => {
  return apiInstance().post(`${mapper.UpdateStatus}`, payload);
};

export const onMappingChange = (payload) => {
  return apiInstance().post(`${mapper.mappingChange}`, payload);
};

export const onProfileNameChange = (payload) => {
  return apiInstance().post(`${mapper.profileNameChange}`, payload);
};

export const onAggregateSave = (payload) => {
  return apiInstance().post(`${mapper.onAggregateSave}`, payload);
};

export const onSchedulerSave = (payload) => {
  return apiInstance().post(`${mapper.onSchedulerSave}`, payload);
};

export const onFilterSave = (payload) => {
  return apiInstance().post(`${mapper.onFilterSave}`, payload);
};

export const onUpdatePlans = (payload) => {
  return apiInstance().post(`${mapper.updatePlans}`, payload);
};

export const onUpdateInputPlanGroups = (payload) => {
  return apiInstance().post(`${mapper.updateInputPlanGroups}`, payload);
};

export const deleteInputPlanGroupOutputById = (planGroupId) => {
  return apiInstance().delete(
    `${mapper.deleteInputPlanGroupOutputById}/${planGroupId}`
  );
};

export const onSaveTarget = (payload) => {
  return apiInstance().post(`${mapper.saveTargetType}`, payload);
};

export const deleteMappingProfile = (id) => {
  return apiInstance().delete(`${mapper.deleteMappingProfile}/${id}`);
};
export const downloadProfileAsYaml = (id, name) => {
  return apiInstance().get(`${mapper.downloadProfileAsYaml}/${id}/${name}`);
};

//output mapper
export const onSaveOutputTarget = (payload) => {
  return apiInstance().post(`${mapper.saveOutputTarget}`, payload);
};

export const onOutputFilterSave = (payload) => {
  return apiInstance().post(`${mapper.onOutputFilterSave}`, payload);
};

export const onSaveMapAndTransformOutput = (payload) => {
  return apiInstance().post(`${mapper.saveMapAndTransformOutput}`, payload);
};

export const deletePlanGroupInOutput = (planGroupId) => {
  return apiInstance().delete(
    `${mapper.DeletePlanGroupOutputById}/${planGroupId}`
  );
};

export const onUpdateOutputPlans = (payload) => {
  return apiInstance().post(`${mapper.updateOutputPlans}`, payload);
};

export const updatePlanGroups = (payload) => {
  return apiInstance().post(`${mapper.updatePlanGroups}`, payload);
};

export const outputSaveBasicInformation = (payload) => {
  return apiInstance().post(`${mapper.outputSaveBasicInformation}`, payload);
};
export const getOutputProfileData = (id) => {
  return apiInstance().get(`${mapper.getOutputProfileData}/${id}`);
};

//passthrough
export const passthroughSaveBasicInformation = (payload) => {
  return apiInstance().post(
    `${mapper.passthroughSaveBasicInformation}`,
    payload
  );
};

export const savePassthroughMapAndTransform = (payload) => {
  return apiInstance().post(
    `${mapper.savePassthroughMapAndTransform}`,
    payload
  );
};

export const getPassthroughProfileData = (id) => {
  return apiInstance().get(`${mapper.getPassthroughProfileData}/${id}`);
};

export const saveOnSourceProfileCreate = (payload) => {
  return apiInstance().post(mapper.saveOnSourceProfileCreate, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const saveOnTargetProfileCreate = (payload) => {
  return apiInstance().post(mapper.saveOnTargetProfileCreate, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const onSavePassthroughTarget = (payload) => {
  return apiInstance().post(`${mapper.savePassthroughTarget}`, payload);
};

export const onSavePreview = (payload) => {
  return apiInstance().post(`${mapper.savePreview}`, payload);
};

export const onSaveSplit = (payload) => {
  return apiInstance().post(`${mapper.saveSplit}`, payload);
};

export const saveValidation = (payload) => {
  return apiInstance().post(`${mapper.saveValidation}`, payload);
};

export const getValidationRules = (id) => {
  return apiInstance().get(`${mapper.getValidationRules}/${id}`);
};

export const onPassthroughFilterSave = (payload) => {
  return apiInstance().post(`${mapper.onPassthroughFilterSave}`, payload);
};

export const onPassthroughAggregateSave = (payload) => {
  return apiInstance().post(`${mapper.saveOnPassthroughAggregate}`, payload);
};

export const getTargetDetails = (payload) => {
  return apiInstance().post(`${mapper.getTargetDetails}`, payload);
};

export const getTargetModelValues = () => {
  return apiInstance().get(`${mapper.getTargetModelValues}`);
};
