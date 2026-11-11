import apiInstance from "../api";
import { managedAccount } from "@/services/endpoints/integrations";

export const saveServiceProviderPlanMapping = (payload) => {
  return apiInstance().post(
    `${managedAccount.saveServiceProviderPlanMapping}`,
    payload
  );
};
export const getServiceProviderPlanMapping = (id) => {
  return apiInstance().get(
    `${managedAccount.getServiceProviderPlanMapping}/${id}`
  );
};
