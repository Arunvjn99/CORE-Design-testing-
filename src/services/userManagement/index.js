import apiInstance from "../api";
import { userManagement } from "@/services/endpoints/user";

export const getUserDetailsAndRole = (payload) => {
  return apiInstance().post(`${userManagement.getUserDetailsAndRole}`, payload);
};
export const getAllUserDetailsAndRole = (payload) => {
  return apiInstance().post(
    `${userManagement.getAllUserDetailsAndRole}`,
    payload
  );
};
export const getUserDetailsById = (userId) => {
  return apiInstance().get(`${userManagement.getUserDetailsById}/${userId}`);
};

export const userProfileImageUpload = (payload) => {
  return apiInstance().post(userManagement.userProfileImageUpload, payload, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const uploadUserProfile = (payload) => {
  return apiInstance().post(userManagement.uploadUserProfile, payload);
};

export const getCompanyClassification = (payload) => {
  return apiInstance().post(userManagement.getCompanyClassification, payload);
};

export const registerUser = (payload) => {
  return apiInstance().post(userManagement.registerUser, payload);
};

export const resendEmail = (payload) => {
  return apiInstance().post(userManagement.resendEmail, payload);
};

export const expireActivationLink = (payload) => {
  return apiInstance().post(userManagement.expireActivationLink, payload);
};

export const updateUserStatus = (payload) => {
  return apiInstance().post(userManagement.updateUserStatus, payload);
};

export const getUserAddedPlans = (payload) => {
  return apiInstance().post(userManagement.getUserAddedPlans, payload);
};

export const getPlansWithAppliedFilter = (payload) => {
  return apiInstance().post(userManagement.getPlansWithAppliedFilter, payload);
};

export const updateUser = (payload) => {
  return apiInstance().post(userManagement.updateUser, payload);
};

export const forgotpassword = (payload) => {
  return apiInstance().post(userManagement.forgotpassword, payload);
};
export const getTenantProducts = (fetchAllProducts = false) => {
  return apiInstance().get(userManagement.getTenantProductList, {
    params: { FetchAllProducts: fetchAllProducts },
  });
};

export const saveUserDefaultProduct = (payload) => {
  return apiInstance().post(
    `${userManagement.saveUserDefaultProduct}/${payload}`
  );
};

export const getActivationLinkHistory = (userId) => {
  return apiInstance().get(
    `${userManagement.getActivationLinkHistory}/${userId}`
  );
};
