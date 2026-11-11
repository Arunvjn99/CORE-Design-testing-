export const MANAGE_INTEGRATIONS_ROUTES = {
  INTEGRATIONS: `manage-integrations`,
  FINCH_ONBOARDING_COMPANY: `finch-onboarding/company`,
  FINCH_ONBOARDING_COMPANY_LINK: `/integrations/finch-onboarding/company`,
  FINCH_ONBOARDING_PLAN: `finch-onboarding/plan`,
  FINCH_ONBOARDING_PLAN_LINK: `/integrations/finch-onboarding/plan`,
  FINCH_ONBOARDING_DATA_FILTERING: `finch-onboarding/data-filtering`,
  FINCH_ONBOARDING_DATA_FILTERING_LINK: `/integrations/finch-onboarding/data-filtering`,
  FINCH_ONBOARDING_EMPLOYEE: `finch-onboarding/employee`,
  FINCH_ONBOARDING_EMPLOYEE_LINK: `/integrations/finch-onboarding/employee`,
  CREATE_INTEGRATION: `create-integration`,
};
export const manageIntegrationsFormNames = {
  INTEGRATIONS_FILTER: "integrations-filter",
};

export const integrationsFormFields = {
  [manageIntegrationsFormNames.INTEGRATIONS_FILTER]: {
    integrations: "integrations",
    compaines: "companies",
    plan: "plan",
  },
};

export const integrationFieldTypes = [{ label: "Finch Integration", value: 0 }];

const DEDUCTION_TYPES = Object.freeze(["DeductionType", "DeductionFrequency"]);

export const deductionTypeOptions = (options = []) => {
  return options.reduce((grouped, option) => {
    const type = option?.type;

    if (DEDUCTION_TYPES.includes(type)) {
      if (!grouped[type]) {
        grouped[type] = [];
      }

      grouped[type].push({ description: option?.title, index: option?.id });
    }

    return grouped;
  }, {});
};
export const deductionStatusMap = {
  Pending: 1,
  Success: 2,
  Failure: 3,
  Error: 4,
};
