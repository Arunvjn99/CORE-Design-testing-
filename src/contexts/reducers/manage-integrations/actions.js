export const MANAGE_INTEGRATIONS_FORM_VALUES = "manageintegrations/FORM_VALUES";
export const MANAGE_INTEGRATIONS_LISTING_DATA =
  "manageintegrations/LISTING_DATA";
export const MANAGE_INTEGRATION_SET_TOAST_INFO =
  "manageintegrations/MANAGE_INTEGRATION_SET_TOAST_INFO";

export const setManageIntegrationsFormValues = (payload) => ({
  type: MANAGE_INTEGRATIONS_FORM_VALUES,
  payload,
});

export const setManageIntegrationsListingData = (payload) => ({
  type: MANAGE_INTEGRATIONS_LISTING_DATA,
  payload,
});
export const setManageCreateIntegrationsToastinfo = (payload) => ({
  type: MANAGE_INTEGRATION_SET_TOAST_INFO,
  payload,
});
