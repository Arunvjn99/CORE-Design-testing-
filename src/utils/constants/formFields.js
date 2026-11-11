import { MANAGE_USER_MANAGEMENT_ROUTES as USER_MANAGEMENT_ROUTES } from "./usermanagement";
import { MANAGE_INTEGRATIONS_ROUTES as INTEGRATIONS_ROUTES } from "./integrations";
import { MANAGE_ADJUSTMENT_ROUTES as ADJUSTMENT_ROUTES } from "./adjustment";

import { companyFormFields } from "./company";
import { planFormFields } from "./plan";
import { eligibilityFormFields } from "./eligibility";
import { payrollFormFields } from "./payroll";
import { censusFormFields } from "./employee";
import { maintenanceFormFields } from "./maintenance";
import { reportsFormFields } from "./reports";
import { communicationFormFields } from "./communication";
import { tradeFormFields } from "./trade";
import { transactionFormFields } from "./transaction";
import { rkaasFormFields } from "./rkaas";
import { feeFormFields } from "./fee";
import { mapperFormFields } from "./mapper";
import { vestingFormFields } from "./eligibility";
import { transactionMaintenanceFormFields } from "./transactionMaintenance";
import {
  corporateActionFormFields,
  corporateActionFilterFields,
} from "./corporateAction";
import { workFlowFormFields } from "./workflow";
import { userManagementFormFields } from "./usermanagement";
import { integrationsFormFields } from "./integrations";
import { adjustmentFormFields } from "./adjustment";
import { distributionFormFields } from "./distribution";
import { contributionReversalFields } from "./contributionReversal";
import { dividendReversalFields } from "./dividendReversal";
import { feeReversalFields } from "./feeReversal";

export const formFields = {
  ...companyFormFields,
  ...planFormFields,
  ...eligibilityFormFields,
  ...censusFormFields,
  ...payrollFormFields,
  ...maintenanceFormFields,
  ...reportsFormFields,
  ...rkaasFormFields,
  ...mapperFormFields,
  ...communicationFormFields,
  ...tradeFormFields,
  ...transactionFormFields,
  ...feeFormFields,
  ...vestingFormFields,
  ...transactionMaintenanceFormFields,
  ...corporateActionFormFields,
  ...corporateActionFilterFields,
  ...workFlowFormFields,
  ...userManagementFormFields,
  ...adjustmentFormFields,
  ...integrationsFormFields,
  ...distributionFormFields,
  ...contributionReversalFields,
  ...dividendReversalFields,
  ...feeReversalFields,
};

export { USER_MANAGEMENT_ROUTES, INTEGRATIONS_ROUTES, ADJUSTMENT_ROUTES };
