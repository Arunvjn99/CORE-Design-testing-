import apiInstance from "../api";
import { home } from "@/services/endpoints/home";
import { UserRegistration } from "@/services/endpoints/user";

export const getAllCounts = () => {
  return apiInstance().get(home.getTileCount);
};

export const getHomePageDetails = () => {
  return apiInstance().get(home.get);
};

export const getLogo = () => {
  return apiInstance().get(home.getLogo);
};

export const getMenuPermissions = (id) => {
  return apiInstance().get(`${home.getMenuPermissions}/${id}`);
};
export const getHomePage = (userRole, tenantid) => {
  return apiInstance().get(
    `${UserRegistration.getHomePage}?UserRole=${userRole}&TenantId=${tenantid}`
  );
};
export const getPadNumber = () => {
  return apiInstance().get(`${home.getPadNumber}`);
};

export const getTenantCoBrandingLogo = () => {
  return apiInstance().get(`${home.getTenantCoBrandingLogo}`);
};
