import { MANAGE_COMMUNICATION_ROUTES } from "@/utils/constants/communication";
import { TEMP_BASE_ROUTES } from "@/utils/constants/common";

// ─── Menu Type Constants ───────────────────────────────────────────────────────
export const MENU_TYPES = {
  MENU_ITEMS: "menuItems",
  PLAN: "planSubMenu",
  REPORTS: "reportsSubMenu",
  EMPLOYEES: "employeesSubMenu",
  TRANSACTION: "transactionSubMenu",
  PAYROLL: "payrollSubMenu",
  FEE: "feeSubMenu",
  COMPANY: "companySubMenu",
  MAPPER: "mapperSubMenu",
  COMMUNICATION: "communicationSubMenu",
  CORPORATE: "corporateActionsSubMenu",
  PLAN_CONFIG: "planConfigSubMenu",
  ONBOARDING: "planOnboardingSubMenu",
  ELIGIBILITY: "eligibilitySubMenu",
  TRADE: "tradeSubMenu",
  USER_MGMT: "userManagementSubMenu",
  WORKFLOW: "workFlowManagementSubMenu",
  MAINTENANCE: "maintenanceSubMenu",
  DOCO: "docoSubMenu",
  DOCO_CENTER: "docoCenterSubMenu",
  DOCO_MAPPER: "docoMapperSubMenu",
  TENANT: "tenantSubMenu",
  ADJUSTMENT: "adjustmentSubMenu",
};

/**
 * Adds route-to-menu mappings to the target object.
 *
 * @param {Object} target - Object where generated routes will be stored.
 * @param {string} baseRoute - Base URL path (e.g. "/users").
 * @param {string} menuType - Menu type associated with the routes.
 * @param {Object} keysMap - Map of route paths to menu keys.
 *
 * Example:
 * addRoutes(
 * ROUTE_PERMISSION_LOOKUP,
 * TEMP_BASE_ROUTES.PLAN_CONFIG,
 * MENU_TYPES.MENU_ITEMS,
 * {
 *   plans: "plan",
 *   company-details: "company",
 * });
 
 * Result:
 * {
 *   "/plan-config/plans": {
 *     apiMenuType: "plan-config",
 *     apiMenuKey: "plan"
 *   },
 *   "/plan-config/company-details": {
 *     apiMenuType: "plan-config",
 *     apiMenuKey: "company"
 *   }
 * }
 */

const addRoutes = (target, baseRoute, menuType, keysMap) => {
  const prefix = `${baseRoute}/`;

  for (const path of Object.keys(keysMap)) {
    const route = prefix + path;

    //to detect duplicate routes
    if (process.env.NODE_ENV !== "production" && route in target) {
      console.warn(`Duplicate route detected: ${route}`);
    }

    target[route] = {
      apiMenuType: menuType,
      apiMenuKey: keysMap[path],
    };
  }
};

// Stores route-to-permission mappings used for access control.
export const ROUTE_PERMISSION_LOOKUP = {};

// Adds a top-level route and links it to its corresponding menu permission.
const addTopLevelRoute = (route, key) => {
  ROUTE_PERMISSION_LOOKUP[route] = {
    apiMenuType: MENU_TYPES.MENU_ITEMS,
    apiMenuKey: key,
  };
};

// Top-level route permission mappings.
addTopLevelRoute(TEMP_BASE_ROUTES.HOME, "home");
addTopLevelRoute(TEMP_BASE_ROUTES.DASHBOARD, "dashboard");
addTopLevelRoute(TEMP_BASE_ROUTES.EMPLOYEES, "employees");
addTopLevelRoute(TEMP_BASE_ROUTES.PLAN_CONFIG, "planConfig");
addTopLevelRoute(TEMP_BASE_ROUTES.TRANSACTION, "transaction");
addTopLevelRoute(TEMP_BASE_ROUTES.REPORTS, "reports");
addTopLevelRoute(TEMP_BASE_ROUTES.COMPANY, "company");
addTopLevelRoute(TEMP_BASE_ROUTES.PAYROLL, "payroll");
addTopLevelRoute(TEMP_BASE_ROUTES.MANAGE_TEMPMAP, "manageTempmap");
addTopLevelRoute(TEMP_BASE_ROUTES.FEE, "fee");
addTopLevelRoute(TEMP_BASE_ROUTES.ELIGIBILITY, "eligibility");
addTopLevelRoute(TEMP_BASE_ROUTES.VESTING, "vesting");
addTopLevelRoute(TEMP_BASE_ROUTES.COMMUNICATION, "communication");
addTopLevelRoute(TEMP_BASE_ROUTES.MAPPER_HOME, "mapper");
addTopLevelRoute(TEMP_BASE_ROUTES.OTHERS, "others");
addTopLevelRoute(TEMP_BASE_ROUTES.CORE_GPT, "coreGpt");
addTopLevelRoute(TEMP_BASE_ROUTES.CUSTOM_REPORT, "customReport");
addTopLevelRoute(TEMP_BASE_ROUTES.FILE_MANAGER, "outputFiles");
addTopLevelRoute(TEMP_BASE_ROUTES.PLAN_MIGRATION, "planMigration");
addTopLevelRoute(TEMP_BASE_ROUTES.ONBOARDING_PLAN, "planOnboarding");
addTopLevelRoute(TEMP_BASE_ROUTES.TENANT, "tenant");
addTopLevelRoute(TEMP_BASE_ROUTES.USER_REGISTRATION, "userRegistration");
addTopLevelRoute(TEMP_BASE_ROUTES.DISCLOSURES, "plan");

// ── Plan Configuration Routes ───────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.PLAN_CONFIG,
  MENU_TYPES.MENU_ITEMS,
  {
    plans: "plan",
    company: "company",
  }
);

// ── Employee / Census Routes ───────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  `${TEMP_BASE_ROUTES.MANAGE_CENSUS}/employee-information`,
  MENU_TYPES.EMPLOYEES,
  {
    "employee-information": "employeeInformation",
    "create-or-generate-payroll": "employeeInformation",
    "employee-plans": "employeeManagePlans",
    "employee-transactions": "employeeTransactions",
    "employee-manage-plans": "employeeManagePlans",
    "rollover-request": "employeeTransactions",
    "rollover-summary": "employeeTransactions",
    "benificiary-details": "beneficiaryDetails",
    "manage-pending-inplanroth-approval": "employeeTransactions",
    "add-beneficiary": "beneficiaryDetails",
    "alternate-payee-details": "alternatePayeeDetails",
    "add-alternate-payee": "alternatePayeeDetails",
    "employee-documents": "document",
    "employee-history": "manageCensusHistory",
    "qdro-details": "qdroDetails",
    rebalance: "employeeTransactions",
    "transfer-request": "employeeTransactions",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MANAGE_CENSUS,
  MENU_TYPES.EMPLOYEES,
  {
    "investment-performance": "personalInvestmentPerformance",
    "manual-enrollment": "manualEnrollment",
    "enrollment-Report": "enrollmentReport",
    "account-balance": "accountBalance",
  }
);

// ── Plan Routes (no leading slash) ────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MANAGE_PLAN,
  MENU_TYPES.PLAN,
  {
    advisor: "advisor",
    "add-advisor": "advisor",
    "add-advisor-master": "advisor",
    "plan-details": "basicDetails",
    compliance: "compliance",
    dashboard: "planDashboard",
    "year-end-process": "yearEndProcess",
    sources: "sources",
    "manage-limits": "limits",
    limits: "limits",
    eligibility: "eligibility",
    vesting: "vesting",
    "forfeiture-setting": "forfeiture",
    funding: "manageFundings",
    enrollment: "enrollment",
    entrydate: "entryDate",
    "years-of-service": "yearsOfService",
    rollover: "rollover",
    retirement: "manageRetirement",
    compensation: "compensation",
    distributions: "distributions",
    transfer: "transfer",
    loans: "loans",
    "manage-investment-plan": "manageInvestmentsPlan",
    irslimit: "irslimit",
    review: "review",
    investment: "investment",
    restrictions: "restriction",
    "managed-accounts": "managedAccounts",
    document: "document",
    documents: "document",
    documentdelivery: "documentDelivery",
    "in-plan-roth": "inPlanRoth",
    contacts: "contacts",
    "leave-of-absence": "leaveOfAbsence",
    sponsor: "sponsor",
    trustee: "trustee",
    payee: "payee",
    "clearing-partner": "clearingPartner",
    "add-clearing-partner": "clearingPartner",
    "plancontact/sponsor": "contacts",
    "plancontact/plan-details": "contacts",
    "plancontact/trustee": "contacts",
  }
);

// ── Plan Routes (with leading slash) ──────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  `/${TEMP_BASE_ROUTES.MANAGE_PLAN}`,
  MENU_TYPES.PLAN,
  {
    "create-plan": "createPlan",
    "plan-details": "basicDetails",
    "add-sponsor": "sponsor",
    "add-trustee": "trustee",
    "add-trustee-master": "trustee",
    compliance: "compliance",
    sources: "sources",
    "sources-new": "sources",
    "add-additional-rules": "sources",
    eligibility: "eligibility",
    "add-eligibility": "eligibility",
    "additional-eligibility-rule": "eligibility",
    allocation: "allocation",
    vesting: "vesting",
    "add-vesting": "vesting",
    "add-addtional-vesting-rule": "vesting",
    forfeiture: "forfeiture",
    "manage-funding": "manageFundings",
    "manage-retirement": "manageRetirement",
    "additional-adi-rule": "enrollment",
    "additional-auto-enrollment": "enrollment",
    Entrydate: "entryDate",
    "years-of-service": "yearsOfService",
    rollover: "rollover",
    compensation: "compensation",
    distributions: "distributions",
    "add-distributions": "distributions",
    transfer: "transfer",
    "in-plan-roth": "inPlanRoth",
    loans: "loans",
    "manage-investment-plan": "manageInvestmentsPlan",
    "add-investments": "investment",
    "add-investment-restrictions": "restriction",
    "assiciated-plans": "investment",
    "restrictions-history": "restriction",
    "add-loans": "loans",
    review: "review",
    irslimit: "irslimit",
    entryDateClassification: "entryDateClassification",
    "add-entryDateClassification": "entryDateClassification",
    "additional-entryDateClassification-rule": "entryDateClassification",
    "account-balance": "accountBalance",
    "managed-accounts": "managedAccounts",
    "year-end-process": "yearEndProcess",
    "forfeiture-setting": "forfeiture",
    "add-leave-of-absence": "leaveOfAbsence",
    "manage-limits": "limits",
    "add-limits": "limits",
  }
);

// ── Plan IRA Routes (no leading slash) ────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MANAGE_PLAN_IRA,
  MENU_TYPES.PLAN,
  {
    "advisor-ira": "advisor",
    "advisor-ira/edit": "advisor",
    "sources-ira": "sources",
    "rollover-ira": "rollover",
    "distributions-ira": "distributions",
    "manage-investment-plan": "manageInvestmentsPlan",
    "investments-ira": "investment",
    "clearing-partner-ira": "clearingPartner",
    "clearing-partner-ira/edit": "clearingPartner",
  }
);

// ── Plan IRA Routes (with leading slash) ──────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  `/${TEMP_BASE_ROUTES.MANAGE_PLAN_IRA}`,
  MENU_TYPES.PLAN,
  {
    "sources-ira": "sources",
    "rollover-ira": "rollover",
    "distributions-ira": "distributions",
    "manage-investment-plan": "manageInvestmentsPlan",
    "investments-ira": "investment",
  }
);

// ── Hardcoded Plan Paths ───────────────────────────────────────────────────
addRoutes(ROUTE_PERMISSION_LOOKUP, "/save-plan", MENU_TYPES.PLAN, {
  "create-plan": "createPlan",
});

addRoutes(ROUTE_PERMISSION_LOOKUP, "/manage-plan", MENU_TYPES.PLAN, {
  enrollment: "enrollment",
  "additional-default-election-rule": "enrollment",
  dashboard: "planDashboard",
});

addRoutes(ROUTE_PERMISSION_LOOKUP, "/manage-plan-ira", MENU_TYPES.PLAN, {
  "enrollment-ira": "enrollment",
  "dashboard-ira/edit": "planDashboard",
});

// ── Transaction Routes ─────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.TRANSACTION,
  MENU_TYPES.TRANSACTION,
  {
    "manage-approval": "approval",
    "manage-draft": "draft",
    "manage-pending-withdrawal": "distribution",
    "manage-pending-loan": "loans",
    "manage-pending-rolloverin": "rollover",
    "manage-pending-rolloverin-approval": "rollover",
    "manage-pending-withdrawal-approval": "distribution",
    "manage-pending-loan-approval": "loans",
    "rollover-history-details": "rollover",
    "withdrawal-history-details": "distribution",
    "loan-history-details": "loans",
    "transfer-history-details": "transfer",
    "manage-adjustment": "participantAdjustment",
    "contribution-reversal": "contributionReversal",
    "fee-reversal": "feeReversal",
    "dividend-reversal": "dividendReversal",
    "manage-ssp": "shareholderServicingPayment",
    "fund-switch-merger-split": "fundSwitchMergerSplit",
    "cash-management-listing": "cashManagement",
    "money-move": "moneyMove",
    "cash-remittance": "cashRemittance",
    "allocate-funds": "allocateFunds",
    "manage-fee": "fee",
    "specification-information": "specificationInformation",
    "create-specification-information": "specificationInformation",
    "fee-run": "feeRun",
    "invoice-fee": "invoiceFee",
    "invoice-bulk-upload": "invoiceBulkUpload",
    "default-payee": "defaultPayee",
    "manage-disbursement": "disbursement",
    "manage-disbursement/": "disbursement",
    "disbursement-summary/LoanRequest": "disbursement",
    "disbursement-summary/Distribution": "disbursement",
    "disbursement-summary/Fee": "disbursement",
    "disbursement-summary/TransactionalFee": "disbursement",
    "model-portfolio": "modelPortfolio",
    "daily-cash-reconciliation": "cashReconciliation",
    "manage-batch-adjustment": "batchAdjustment",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.TRANSACTION,
  MENU_TYPES.MENU_ITEMS,
  {
    "manage-pending-inplanroth": "transaction",
    "manage-pending-inplanroth-approval": "transaction",
  }
);

// ── Hardcoded Transaction Paths ────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  "/transaction-maintenance",
  MENU_TYPES.MENU_ITEMS,
  {
    "manage-transaction-maintenance": "transactionMaintenance",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  "/contribution-reversal",
  MENU_TYPES.TRANSACTION,
  {
    "contribution-reversal-summary": "contributionReversal",
    "create-contribution-reversal": "contributionReversal",
  }
);

addRoutes(ROUTE_PERMISSION_LOOKUP, "/fee-reversal", MENU_TYPES.TRANSACTION, {
  "fee-reversal-summary": "feeReversal",
  "create-fee-reversal": "feeReversal",
  "fee-and-plan-details": "feeReversal",
  "fee-reversal-detail": "feeReversal",
});

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  "/dividend-reversal",
  MENU_TYPES.TRANSACTION,
  {
    "dividend-reversal-summary": "dividendReversal",
    "create-dividend-reversal": "dividendReversal",
    "dividend-reversal-details": "dividendReversal",
    "create-dividend-reversal-plan-details": "dividendReversal",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  "/create-batch-adjustment",
  MENU_TYPES.TRANSACTION,
  {
    "file-information": "batchAdjustment",
    "file-validation": "batchAdjustment",
  }
);

// Add standalone route mapping directly (used when only one route needs to be registered)
ROUTE_PERMISSION_LOOKUP["/create-batch-adjustment"] = {
  apiMenuType: MENU_TYPES.TRANSACTION,
  apiMenuKey: "batchAdjustment",
};

// ── Transaction Maintenance Routes ────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.TRANSACTION_MAINTENANCE,
  MENU_TYPES.TRANSACTION,
  {
    "loan-request": "transactionMaintenance",
    "loan-repayment": "transactionMaintenance",
    "withdrawal-request": "transactionMaintenance",
    "shareholder-servicing-payment": "transactionMaintenance",
    "rollover-in": "transactionMaintenance",
    transfer: "transactionMaintenance",
    rebalance: "transactionMaintenance",
    payroll: "transactionMaintenance",
    dividend: "transactionMaintenance",
    "dividend-reversal": "transactionMaintenance",
    "dividend-reversal-transaction": "transactionMaintenance",
    fee: "transactionMaintenance",
    "fund-switch": "transactionMaintenance",
    "stock-split": "transactionMaintenance",
    "fund-merger": "transactionMaintenance",
    adjustments: "transactionMaintenance",
    "model-portfolio-rebalance": "transactionMaintenance",
    "forfeiture-in": "transactionMaintenance",
    "forfeiture-out": "transactionMaintenance",
    "in-plan-roth-conversion": "transactionMaintenance",
    "contribution-reversal": "transactionMaintenance",
    "fee-reversal": "transactionMaintenance",
    "batch-adjustments": "transactionMaintenance",
  }
);

// ── Reports Routes ─────────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.REPORTS,
  MENU_TYPES.REPORTS,
  {
    "eligibility-filter": "eligibilityReports",
    "eligibility-correction": "eligibilityCorrection",
    "gcontribution-limit": "gContributionLimit",
    "contribution-limit": "contributionLimit",
    "eligibility-forecast": "eligibiltyForecast",
    "deleted-participant": "deletedParticipant",
    "contribution-history-source-level":
      "contributionHistorySourceLevelDetailReport",
    "contribution-history-participant-level":
      "contributionHistoryParticipantLevelDetailReport",
    "contribution-rate-query": "contributionRateQuery",
    "contribution-rate-change-query": "contributionRateChangeQuery",
    "sdb-report": "sDBReport",
    "fund-audit-report": "fundAuditReport",
    "rehire-report": "rehireReport",
    "new-participant": "newParticipant",
    "employement-status": "employmentStatus",
    "error-count": "errorCount",
    "participant-contibution-data-report": "contributionDataReport",
    "participant-updates-report": "participantUpdatesReport",
    "compensation-hours-loans": "compensationHoursLoans",
    "loan-payment": "loanPayment",
    "contribution-flags": "contributionFlags",
    "plan-eligibility-data-report": "planEligibilityDataReport",
    "sponsor-details": "sponsorDetails",
    "plan-summary": "planSummary",
    "late-payroll-notifications": "latePayrollNotifications",
    "periodic-census": "periodicCensus",
    "periodic-employer-contribution-report":
      "periodicEmployerContributionReport",
    "aggregated-report": "aggregatedPeriodicReport",
    "accounting-transaction-report": "accountingTransactionReport",
    "summary-of-participant-accounts-report":
      "summaryOfParticipantAccountsReport",
    "executive-summary-report": "executiveSummaryReport",
    "participant-election-and-balances": "participantBalances",
    "RMD-Report": "rMDReport",
    "Missed-RMD-Report": "missedRMDReport",
    "force-out-report": "forceOutReport",
    "forfeiture-report": "forfeitureReport",
    "trade-report": "tradeReport",
    "vesting-reduction-report": "vestingReductionReport",
    "participant-vested-balances-report": "participantVestedBalancesReport",
    "rebalance-report": "rebalance",
    "loan-repayment-detail-report": "loanRepaymentDetailReport",
    "payroll-workload-anticipation-report": "payrollWorkloadAnticipation",
    "plan-list": "planList",
    "payroll-calendar": "payrollCalendarEnddate",
    "custom-reports": "customReports",
    "schedule-extension-report": "scheduleExtensionReport",
    "enrollment-review-report": "enrollmentReviewReport",
    "316-census-report": "316CensusReport",
    "employer-contribution-projection": "employerContributionProjectionReport",
    "non-pay-period-report": "nonPayPeriodReport",
    "contribution-timing-report": "contributionTimingReport",
    "mapper-list": "mapperListReport",
    "22c2-report": "twenty2C2Report",
    "etffee-report": "etfFeeReport",
    "redemption-fee-report": "redemptionFeeReport",
    "participant-investment-balances-report": "participantsInvestmentBalances",
    "year-end-plan-processing-report": "yearEndProcessing",
    Report1099Rcodes: "1099RReport",
    "loans-and-distribution-payout-report": "loansAndDistributionPayoutReport",
    "schedule-reports": "scheduleExtensionReport",
    "rollover-in-summary-report": "rolloverInSummaryReport",
    "ac-holder-detail-report": "acHolderDetailReport",
    "withdrawal-summary-report": "withdrawalSummaryReport",
    "address-history-report": "addressHistoryReport",
    "dividend-summary-report": "dividendSummaryReport",
    "account-maintenance-forecast-report": "accountMaintenanceForecastReport",
    "sponsor-fee-report": "sponsorFeeReport",
    "participant-fee-report": "participantFeeReport",
    "trust-accounting-report": "trustAccountingReport",
  }
);

// ── Company Routes ─────────────────────────────────────────────────────────
addRoutes(ROUTE_PERMISSION_LOOKUP, "/save-company", MENU_TYPES.PLAN_CONFIG, {
  "company-details": "company",
});

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MANAGE_COMPANY,
  MENU_TYPES.COMPANY,
  {
    "company-details": "incorporationDetails",
    settings: "companySettings",
    "payroll-frequency": "managePayrollFrequency",
    "manage-payroll-frequency": "managePayrollFrequency",
    "manage-payroll-calendar": "managePayrollCalendar",
    "payroll-calendar-settings": "managePayrollCalendar",
    "payroll-calendar-paydates": "managePayrollCalendar",
    "payroll-calendar-manage-paydates": "managePayrollCalendar",
    "manage-employee-classifications": "manageCompanyClassification",
    "employee-classifications": "manageCompanyClassification",
    "employee-classification-type": "manageCompanyClassification",
    "employee-attribute-classifications": "manageCompanyClassification",
    "manage-employee-status": "manageEmploymentStatus",
    "employment-status": "manageEmploymentStatus",
    compensation: "companyCompensation",
    "account-balance": "accountBalance",
    integration: "integration",
  }
);

// ── Payroll Routes ─────────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.PAYROLL,
  MENU_TYPES.MENU_ITEMS,
  {
    "file-status": "payroll",
    reports: "payroll",
    "awaiting-trade-cancelled": "payroll",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MANAGE_PAYROLL,
  MENU_TYPES.PAYROLL,
  {
    "upload-file": "uploadFile",
    "create-or-generate": "createOrGenerate",
    "generate-output": "generateOutput",
    "view-output": "viewOutput",
    "census-and-payroll": "censusAndPayroll",
  }
);

// Add standalone route mapping directly (used when only one route needs to be registered)
ROUTE_PERMISSION_LOOKUP["/create-payroll-listing"] = {
  apiMenuType: MENU_TYPES.PAYROLL,
  apiMenuKey: "createPayrollListing",
};

// ── Mapper / TempMap Routes ────────────────────────────────────────────────
addRoutes(ROUTE_PERMISSION_LOOKUP, TEMP_BASE_ROUTES.MAPPER, MENU_TYPES.MAPPER, {
  transformations: "transformations",
  profiles: "profiles",
  "source-configuration": "sourceConfiguration",
  "target-configuration": "targetConfiguration",
  "review-and-confirm": "reviewAndConfirm",
  "load-definition-home": "loadDefinitionHome",
  "load-definition-source": "loadDefinitionSource",
  "fixed-length": "fixedLength",
  "target-containers": "targetContainers",
  "map-and-transform": "mapAndTransform",
  "verify-map": "verifyMap",
  "load-filter": "loadFilter",
  aggregate: "aggregate",
  ruleset: "ruleset",
  scheduler: "scheduler",
});

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MANAGE_MAPPER,
  MENU_TYPES.MAPPER,
  {
    "basic-information": "loadDefinitionHome",
    overview: "overview",
    source: "loadDefinitionSource",
    "fixed-length": "fixedLength",
    target: "targetContainers",
    "output-target": "targetOutput",
    "map-and-transform": "mapAndTransform",
    "verify-map": "verifyMap",
    preview: "preview",
    filter: "loadFilter",
    aggregate: "aggregate",
    ruleset: "ruleset",
    scheduler: "scheduler",
    "map-and-transform-output": "mapAndTransform",
    "output-filter": "loadFilter",
    "associate-plans": "associatePlans",
    validations: "validations",
    "map-and-verify-output": "verifyMap",
    "review-and-confirm": "reviewAndConfirm",
    "passthrough-target": "targetContainers",
    split: "split",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MANAGE_TEMPMAP,
  MENU_TYPES.MAPPER,
  {
    "basic-information": "loadDefinitionHome",
    source: "loadDefinitionSource",
    "fixed-length": "fixedLength",
    target: "targetContainers",
    "map-and-transform": "mapAndTransform",
    "verify-map": "verifyMap",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  `/${TEMP_BASE_ROUTES.MANAGE_TEMPMAP}`,
  MENU_TYPES.MAPPER,
  {
    "fixed-length": "fixedLength",
    "map-and-transform": "mapAndTransform",
    "verify-map": "verifyMap",
  }
);

// ── Fee Routes ─────────────────────────────────────────────────────────────
addRoutes(ROUTE_PERMISSION_LOOKUP, TEMP_BASE_ROUTES.FEE, MENU_TYPES.FEE, {
  "manage-fee": "manageFee",
  "specification-information": "specificationInformation",
  "create-specification-information": "createSpecificationInformation",
  "basic-details": "basicDetails",
  calculation: "calculation",
  "applicable-to": "applicableTo",
  "schedule-or-run": "scheduleOrRun",
  summary: "summary",
  "participant-details": "feeRunParticipantDetails",
  "file-based": "manageFee",
});

addRoutes(ROUTE_PERMISSION_LOOKUP, TEMP_BASE_ROUTES.FEE_RUN, MENU_TYPES.FEE, {
  "fee-run-details": "feeRun",
  "sponsor-fee-run-details": "feeRun",
});

addRoutes(ROUTE_PERMISSION_LOOKUP, "/invoice-fee", MENU_TYPES.TRANSACTION, {
  "invoice-bulk-upload-details": "invoiceFee",
});

// Add standalone route mapping directly (used when only one route needs to be registered)
ROUTE_PERMISSION_LOOKUP["/participant-disclosures"] = {
  apiMenuType: MENU_TYPES.COMMUNICATION,
  apiMenuKey: "disclosuresAndNotices",
};

// ── Eligibility & Vesting Routes ───────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.ELIGIBILITY,
  MENU_TYPES.ELIGIBILITY,
  {
    "manage-eligibility": "eligibility",
    "eligibility-process-reports": "eligibilitySummaryReports",
    "new-employee-eligibility-reports": "eligibilitySummaryReports",
    "add-eligibility-rule": "addEligibilityRule",
    "manage-vesting": "vesting",
    "add-vesting-rule": "addVestingRule",
    "vesting-process-reports": "vestingSummaryReports",
    "new-employee-vesting-reports": "vestingSummaryReports",
    enrollment: "enrollmentReports",
  }
);

addRoutes(ROUTE_PERMISSION_LOOKUP, "/enrollment", MENU_TYPES.ELIGIBILITY, {
  enrollment_detail_report: "enrollmentReports",
});

// ── Communication Routes ───────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.COMMUNICATION,
  MENU_TYPES.COMMUNICATION,
  {
    communication: "communication",
    "email-layout": "emailLayout",
    "Communication-history": "communicationHistory",
    "disclosures-and-notices": "disclosuresAndNotices",
    "plan-level-communication": "planLevelCommunication",
    "Communication-history-info": "communicationHistory",
    "email-layout-info": "emailLayout",
    "communication-info": "communication",
    "adhoc-communication": "adhocCommunication",
    "adhoc-communication-info": "adhocCommunication",
    "postal-mail-log": "postalMailLog",
    [MANAGE_COMMUNICATION_ROUTES.CONFIGURE_COMMUNICATION]:
      "communicationHistory",
  }
);

// ── User Management Routes ─────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.USER_MANAGEMENT,
  MENU_TYPES.USER_MGMT,
  {
    "admin-groups": "adminGroups",
    "add-admin-groups": "adminGroups",
    "manage-users": "manageUsers",
    "create-admin-group": "adminGroups",
    "create-users": "manageUsers",
  }
);

// ── Trade Routes ───────────────────────────────────────────────────────────
addRoutes(ROUTE_PERMISSION_LOOKUP, TEMP_BASE_ROUTES.TRADE, MENU_TYPES.TRADE, {
  "transaction-view": "transactionView",
  "investment-view": "investmentView",
  "trade-reconciliation": "tradeOrderReconciliation",
  "trade-order-file-instruction": "tradeOrderIntstruction",
  "trade-order-instruction": "tradeOrderIntstructionDetails",
  "transaction-view-details": "trasactionViewDetails",
  "trade-order-investment": "tradeOrderInvestment",
  "trade-reconciliation-report": "tradeReconciliationReport",
});

// ── Corporate Actions Routes ───────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.CORPORATE_ACTIONS,
  MENU_TYPES.CORPORATE,
  {
    "fund-switch-summary": "fundSwitch",
    "manage-fund-switch": "fundSwitch",
    "add-fund-switch": "fundSwitch",
    "manage-stock-split": "stockSplit",
    "stock-split-summary": "stockSplit",
    "manage-fund-merger": "fundMerger",
    "fund-merger-summary": "fundMerger",
    "manage-dividend": "dividend",
    "dividend-summary": "dividendSummary",
    "dividend-run-details": "dividendRunDetails",
  }
);

// ── Onboarding Plan Routes ─────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.ONBOARDING_PLAN,
  MENU_TYPES.ONBOARDING,
  {
    "create-plan": "createPlan",
    "basic-details": "basicDetails",
    sponsor: "sponsor",
    trustee: "trustee",
    custodian: "custodian",
    advisor: "advisor",
    compliance: "compliance",
    "manage-sources": "sources",
    eligibility: "eligibility",
    allocation: "allocation",
    vesting: "vesting",
    forfeiture: "forfeiture",
    "manage-funding": "manageFundings",
    "manage-retirement": "manageRetirement",
    enrollment: "enrollment",
    Entrydate: "entryDate",
    "years-of-service": "yearsOfService",
    rollover: "rollover",
    "manage-compensation": "compensation",
    distributions: "distributions",
    transfer: "transfer",
    loans: "loans",
    "manage-investment-plan": "manageInvestmentsPlan",
    review: "review",
    irslimit: "irslimit",
    entryDateClassification: "entryDateClassification",
    "account-balance": "accountBalance",
    "clearing-partner": "clearingPartner",
  }
);

// ── Adjustment Routes ──────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.ADJUSTMENT,
  MENU_TYPES.ADJUSTMENT,
  {
    "manage-adjustment": "manageAdjustment",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.ADJUSTMENT,
  MENU_TYPES.TRANSACTION,
  {
    "basic-details": "adjustment",
    "adjustment-details": "adjustment",
    "adjustment-summary": "adjustment",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  "/adjustment-summary",
  MENU_TYPES.TRANSACTION,
  {
    "adjustment-summary": "adjustment",
  }
);

// ── Distribution Routes ────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.DISTRIBUTION,
  MENU_TYPES.EMPLOYEES,
  {
    "withdrawal-request": "employeeTransactions",
    "withdrawal-summary": "employeeTransactions",
    "loan-request": "employeeTransactions",
    "loan-summary": "employeeTransactions",
    "withdrawal-allocation": "employeeTransactions",
    "loan-repayment-request": "employeeTransactions",
    "loan-repayment-summary": "employeeTransactions",
    "transfer-request": "employeeTransactions",
    "transfer-summary": "employeeTransactions",
    "rebalance-request": "employeeTransactions",
    "rebalance-summary": "employeeTransactions",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.INPLANROTH,
  MENU_TYPES.EMPLOYEES,
  {
    "in-plan-roth-request": "employeeTransactions",
    "in-plan-roth-summary": "employeeTransactions",
  }
);

// ── Doco Routes ────────────────────────────────────────────────────────────
addRoutes(ROUTE_PERMISSION_LOOKUP, TEMP_BASE_ROUTES.DOCO, MENU_TYPES.DOCO, {
  transformations: "transformations",
  "mapper-overview": "mapperOverview",
  profiles: "profiles",
  "source-configuration": "sourceConfiguration",
  "target-configuration": "targetConfiguration",
  "review-and-confirm": "reviewAndConfirm",
});

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.DOCO_CENTER,
  MENU_TYPES.DOCO_CENTER,
  {
    home: "home",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.DOCUMENT_MAPPER,
  MENU_TYPES.DOCO_MAPPER,
  {
    "map-and-transform": "mapAndTransform",
    aggregate: "aggregate",
    source: "source",
    filter: "filter",
    target: "target",
    "associated-plans": "associatedPlans",
    ruleset: "ruleset",
    scheduler: "scheduler",
    "review-and-confirm": "reviewAndConfirm",
  }
);

// ── Maintenance Routes ─────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MAINTAINANCE,
  MENU_TYPES.MAINTENANCE,
  {
    "schedule-exception-report": "scheduleExceptionReport",
    "holiday-calendar": "holidayCalendar",
    "manage-plan-group": "managePlanGroup",
  }
);

// ── Plan Config Routes ─────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.PLAN_CONFIG,
  MENU_TYPES.PLAN_CONFIG,
  {
    masters: "masters",
    "manage-investment": "investment",
    "clearing-partner": "clearingPartner",
    "view-history": "viewHistory",
    advisor: "advisor",
    "holiday-calendar": "holidayCalendar",
    "add-new-holiday": "holidayCalendar",
    "schedule-extension": "scheduleExtension",
    "manage-plan-group": "managePlanGroup",
    "add-plan-group": "managePlanGroup",
    restriction: "restriction",
    "specification-information": "specificationInformation",
    "price-listing": "priceListing",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MANAGE_PLAN_IRA,
  MENU_TYPES.PLAN_CONFIG,
  {
    "clearing-partner": "clearingPartner",
    advisor: "advisor",
    "holiday-calendar": "holidayCalendar",
    "add-new-holiday": "holidayCalendar",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.MASTERS,
  MENU_TYPES.PLAN_CONFIG,
  {
    "advisor-representative-details": "advisor",
    "advisor-representative-plan-detail": "advisor",
    "trade-process": "tradeProcess",
    investments: "investments",
    "clearing-partner-details": "clearingPartner",
    "clearing-partner-account-plan-details": "clearingPartner",
  }
);

// Register standalone route permission mappings
ROUTE_PERMISSION_LOOKUP["/add-investment"] = {
  apiMenuType: MENU_TYPES.PLAN_CONFIG,
  apiMenuKey: "investment",
};

ROUTE_PERMISSION_LOOKUP["/add-investments"] = {
  apiMenuType: MENU_TYPES.PLAN_CONFIG,
  apiMenuKey: "investment",
};

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.ADD_INVESTMENT,
  MENU_TYPES.PLAN_CONFIG,
  {
    rebalance: "investment",
  }
);

// ── Workflow Management Routes ─────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.WORK_FLOW_MANAGEMENT,
  MENU_TYPES.WORKFLOW,
  {
    "work-flow": "workFlow",
    "admin-group": "adminGroup",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.WORK_MANAGEMENT,
  MENU_TYPES.MENU_ITEMS,
  {
    payroll: "workFlowManagement",
    company: "workFlowManagement",
  }
);

// ── Compliance Routes ──────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.COMPLIANCE,
  MENU_TYPES.MENU_ITEMS,
  {
    "manage-year-end-process": "compliance",
    "year-end-process": "compliance",
    "manage-result-document": "compliance",
    "filing-5500": "compliance",
    "compliance/result-5500": "compliance",
  }
);

// ── RKAAS Routes ───────────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.RKAAS,
  MENU_TYPES.MENU_ITEMS,
  {
    custodian: "rkaas",
    "add-custodian": "rkaas",
    "custodian-detail": "rkaas",
    rkas: "rkaas",
    "trial-balance": "rkaas",
    ledgers: "rkaas",
    reports: "rkaas",
    "ledger-entries": "rkaas",
    "rkaas-entries": "rkaas",
    "custom-reports": "rkaas",
    "file-manager": "rkaas",
    "error-detail": "rkaas",
    "plan-wise": "rkaas",
    "daily-cash-activity": "rkaas",
    "chart-of-account-summary": "rkaas",
  }
);

// ── Custom Report Routes ───────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.CREATE_CUSTOM_REPORT,
  MENU_TYPES.MENU_ITEMS,
  {
    "basic-details": "customReport",
    "data-selection": "customReport",
    "filter-and-grouping": "customReport",
    review: "customReport",
    result: "customReport",
    execute: "customReport",
  }
);

// ── Dividend (Create) Routes ───────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.CREATE_DIVIDENDS,
  MENU_TYPES.CORPORATE,
  {
    basicDetails: "dividend",
    dividendDetails: "dividend",
    exclusionDetails: "dividend",
    scheduleDividends: "dividend",
    summary: "dividend",
    "dividend-summary-details": "dividend",
    "dividend-run-details": "dividend",
  }
);

// ── Integrations Routes ────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.INTEGRATIONS,
  MENU_TYPES.MENU_ITEMS,
  {
    "manage-integrations": "integrations",
    "create-integration": "integrations",
    "finch-onboarding/company": "integrations",
    "finch-onboarding/plan": "integrations",
    "finch-onboarding/data-filtering": "integrations",
    "finch-onboarding/employee": "integrations",
  }
);

// ── Tenant Routes ──────────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.CREATE_TENANT,
  MENU_TYPES.TENANT,
  {
    clientDetails: "clientDetails",
    rolesAndPermissions: "clientDetails",
    validationRules: "clientDetails",
    createRole: "clientDetails",
    createValidationRule: "clientDetails",
  }
);

// ── SSP Routes ─────────────────────────────────────────────────────────────
addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.CREATE_SSP,
  MENU_TYPES.TRANSACTION,
  {
    "basic-details": "shareholderServicingPayment",
    "allocation-details": "shareholderServicingPayment",
    summary: "shareholderServicingPayment",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.SSP_SUMMARY,
  MENU_TYPES.TRANSACTION,
  {
    "ssp-summary-details": "shareholderServicingPayment",
    "ssp-trade-details": "shareholderServicingPayment",
  }
);

addRoutes(
  ROUTE_PERMISSION_LOOKUP,
  TEMP_BASE_ROUTES.TRANSACTION,
  MENU_TYPES.EMPLOYEES,
  { rebalance: "employeeTransactions" }
);
