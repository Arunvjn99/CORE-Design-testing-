export const includeExcludeIgnoreOptions = [
  {
    label: "Include",
    value: 1,
  },
  {
    label: "Exclude",
    value: 2,
  },
  {
    label: "Ignore",
    value: 3,
  },
];

export const optionsinFilter = [
  {
    label: "Oldest first",
    value: "true",
  },
  {
    label: "Latest first",
    value: "false",
  },
];

export const fileMetaOption = [
  {
    label: "Plan Name",
    value: "ABC",
  },
  {
    label: "Plan Id",
    value: "345",
  },
  {
    label: "File Create DataTime",
    value: "2022-11-30T08:33:55",
  },
  {
    label: "Indicator",
    value: "true",
  },
  {
    label: "Payroll Date",
    value: "12/09/2000",
  },
  {
    label: "Sub Id",
    value: "1567",
  },
  {
    label: "TotalPayroll Amount",
    value: "10000",
  },
  {
    label: "ACH Number",
    value: "100",
  },
  {
    label: "Total Contribution",
    value: "1000",
  },
  {
    label: "Total Compensation",
    value: "2000",
  },
];

export const yesNoOptions = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];
export const mapperVariables = [
  {
    label: "File Name",
    value: "@filename",
  },
  {
    label: "Date Time",
    value: "@filecreatedt",
  },
];
export const integrationLevelType = [
  {
    label: "$",
    value: 1,
  },
  {
    label: "%",
    value: 2,
  },
];
export const permittedDisparityMethod = [
  {
    label: "2 Step",
    value: 1,
  },
  {
    label: "4 Step",
    value: 2,
  },
];
export const limitHandlingOption = [
  {
    label: "Regular",
    value: 1,
  },
  {
    label: "Pro-rata",
    value: 2,
  },
];
export const manualConfirmFor = [
  {
    label: "Completed",
    value: 1,
  },
  {
    label: "Failed",
    value: 2,
  },
];
export const coreHandleOptions = [
  {
    label: "CORE",
    value: 1,
  },
  {
    label: "Outside CORE",
    value: 2,
  },
];

export const investmentElectionOptions = [
  {
    label: "Plan default",
    value: true,
  },
  {
    label: "Own election",
    value: false,
  },
];

export const dollarOrPercentage = [
  {
    label: "%",
    value: 1,
  },
  {
    label: "$",
    value: 2,
  },
];

export const percentageDollarOptions = [
  {
    label: "%",
    value: 1,
  },
  {
    label: "$",
    value: 2,
  },
];

export const planStatus = [
  {
    label: "Active",
    value: 3,
  },
  {
    label: "Inactive",
    value: 4,
  },
  {
    label: "Partially terminated",
    value: 6,
  },
];

export const operateAs = [
  {
    label: "Sponsor",
    value: 1,
  },
  {
    label: "TPA",
    value: 2,
  },
];

export const feeRunTypeOptions = [
  {
    label: "One Time",
    value: 1,
  },
  {
    label: "Recurring",
    value: 2,
  },
];

export const feeRunTypeOptionsEnumIndex = {
  1: "One Time",
  2: "Recurring",
};
export const statusOptions = [
  {
    label: "Active",
    value: 2,
  },
  {
    label: "Inactive",
    value: 3,
  },
];

export const deductFeeOption = [
  {
    label: "Account balance",
    value: 1,
  },
  {
    label: "Vested balance",
    value: 2,
  },
];

export const ChargeRedemptionFeeFromOption = [
  {
    label: "Participant",
    value: 1,
  },
  {
    label: "Plan",
    value: 2,
  },
];

export const FeesApplicableOptions = [
  {
    label: "All plans",
    value: 1,
  },
  {
    label: "Specific plan(s)",
    value: 2,
  },
  {
    label: "Plan group(s)",
    value: 3,
  },
];

export const fileNameOptions = [
  {
    label: "Enter",
    value: 1,
  },
  {
    label: "Select",
    value: 2,
  },
  {
    label: "Custom",
    value: 3,
  },
];
export const splitFileNameOptions = [
  {
    label: "Custom",
    value: 3,
  },
];

export const calendarFrequencyOptions = [
  {
    label: "Years",
    value: 1,
  },
  {
    label: "Months",
    value: 2,
  },
];

export const inverseYesNoOptions = [
  {
    label: "Yes",
    value: false,
  },
  {
    label: "No",
    value: true,
  },
];

export const Enrollment_applyADITo = [
  {
    label: "None",
    value: 0,
  },
  {
    label: "Suspension",
    value: 1,
  },
  {
    label: "Termination",
    value: 2,
  },
  {
    label: "Both",
    value: 3,
  },
];
export const Enrollment_autoDeferralIncreaseApplicableTo = [
  {
    label: "Auto",
    value: 1,
  },
  {
    label: "Manual",
    value: 2,
  },
  {
    label: "Both",
    value: 3,
  },
];

export const Enrollment_periodOfIncrease = [
  {
    label: "Calendar year",
    value: 1,
  },
  {
    label: "Plan year",
    value: 2,
  },
  {
    label: "Date of participation",
    value: 3,
  },
];

export const Enrollment_allocationPercentageForReHire = [
  {
    label: "Original allocation",
    value: 1,
  },
  {
    label: "Other",
    value: 2,
  },
];
export const PLAN_STATUSES = {
  UnderConstruction: 0,
  PENDING_APPROVAL: 1,
  PENDING_ACTIVATE: 2,
  ACTIVATED: 3,
  INACTIVE: 4,
  TERMINATED: 5,
};

export const MAPPER_PLAN_STATUS = {
  0: "UnderConstruction",
  1: "ReadyFor",
  2: "Approved",
  3: "Active",
  4: "In Active",
  5: "Terminated",
  6: "PartiallyTerminated",
};

export const FLOW_TYPES = {
  ADD: "add",
  EDIT: "edit",
  SAVE: "save",
  VIEW: "view",
};
export const FEE_TYPE_MAPPING = {
  BalanceBased: 1,

  InvestmentBased: 2,
  MaintenanceBased: 3,
};
export const OPTIONS_DATA_MAPPER = {
  REPORT_TRANSACTION_TYPE: {
    6: "Loans",
    1: "Distributions",
  },

  REPORT_RECORD_STATUS: {
    1: "Not exported",
    2: "Exported",
  },

  RELATIONSHIP_SUBTYPES: {
    1: "Spouse",
    2: "Children",
    3: "Family",
    4: "Friend",
    5: "Estate",
    6: "Trust",
    7: "NGO",
    8: "State",
  },

  BALANCE_VIEW: {
    1: "Show All Balances",
    2: "Show Negative Balances Only",
    3: "Show All For Participants With Negatives",
  },

  SSP_ALLOCATION_TYPE: {
    1: "Average daily balance",
    2: "Record date",
  },

  PERIODIC_STATEMENT_VALUES: {
    1: "Last 3 months",
    2: "Last 6 months",
    3: "Custom date range",
  },

  TENANT_MODULE_TYPES: {
    1: "Company",
    2: "Plan",
    3: "Employee",
    4: "Payroll",
    5: "Fee",
    6: "Mapper",
    7: "Reports",
    8: "Workflow Management",
    9: "Trade",
    10: "Transaction Maintenance",
    11: "Cash Management",
  },
  PLAN_CONVERSION_DOCUMENT: {
    1: "EdwardJones",
    2: "Matrix",
    3: "LPL",
    4: "ETrade",
    5: "Rockefeller",
    6: "MorganStanley",
    7: "WellFargo",
    8: "Ameritrade",
    9: "RaymondJamesh",
    10: "Vanguard",
    11: "Merrill",
    12: "Mariner",
    13: "BankofAmerica",
    14: "ComericaBank",
    15: "Ameriprise",
    16: "Assetmark",
    17: "Goldman",
    18: "Interactive Brokers",
    19: "MML INVESTORS",
    20: "Modernize",
    21: "NoahDavid",
    22: "SoleraBank",
    23: "StoneCrest",
    24: "UnionBank",
    25: "UsBank",
    26: "Vantage",
    27: "Watermark",
    28: "WealthManagement",
    29: "CharlesSchwab",
    30: "AmericanFunds",
    31: "SecuritiesAmerica",
    32: "FIDELITY",
    34: "lfg",
    34: "Cetera",
    35: "FidelityPooled",
    36: "RBC",
    37: "NFS",
    38: "UBS",
    39: "BNY",
    40: "Amertias",
  },
  Filing_5500_FORM_TYPES: {
    1: "5500 Long form",
    2: "5500 Short form",
    4: "5500 EZ",
    8: "Schedule A",
    16: "Schedule C",
    32: "Schedule D",
    64: "Schedule G",
    128: "Schedule H",
    256: "Schedule I",
    1024: "Form 5558",
  },
  FONT_FAMILY: {
    1: "Arial",
    2: "Calibri",
    3: "Sans Serif",
    4: "Times New Roman",
    5: "Utopia",
  },

  VAR_VALUES: {
    1: "Plan compensation",
    2: "Gross compensation",
  },

  VAR_OPTIONS: {
    1: "Field",
    2: "Variable",
    3: "Constant",
  },

  COMPLIANCE_TESTING_STATUS_LIST: {
    0: "Not compliant",
    1: "Compliance Tested for",
  },
  INTEGRATION_CT: {
    1: "FT Williams",
  },

  PERIOD_OF_CALCULATION: {
    0: "Per Payroll Period",
  },
  FORFEITURE_FUNDIN: {
    1: " Same plan year",
    2: "Succeeding plan year",
  },
  FORFEITURE_FORFEITURE_PERIODTYPE: {
    1: "Years",
    2: "Months",
  },
  FORFEITURE_AT_TERM: {
    0: "All",
    1: "Defer",
    2: "Partial",
  },
  TRANSFER_TYPE: {
    1: "Percentage",
    2: "Dollars",
    4: "Units",
    // 4: "All",
  },
  CALCULATIONFEE_TYPE: {
    1: "Balance based",
    2: "Investment based",
    3: "Maintenance based",
  },

  FEE_RUN: {
    1: "One-Time",
    2: "Recurring",
  },

  FEE_PROCESS: {
    1: "Immediate",
    2: "Future",
  },
  CUSTOM_REPORT_CATEGORY: {
    1: "ALL",
    2: "Private",
    3: "Public",
  },
  BASIS_OF_DATE: {
    1: "Process Date",
    2: "Other",
  },

  FEE_FREQUENCY: {
    1: "Annually",
    2: "Semi-Annually",
    3: "Monthly",
    4: "Semi-Monthly",
    5: "Quarterly",
    6: "Weekly",
    7: "Daily",
  },

  BASIS_FREQUENCY: {
    1: "Month(s) back",
    2: "Week(s) back",
    3: "Day(s) back",
  },

  RUNFEE_FOR: {
    1: "All Employees",

    2: "Active Employees",
  },
  TRANSFER_COUNT_STARTS_FROM: {
    1: "Beginning of the plan year",
    2: "Transfer effective date",
  },
  TRANSFER_FREQUENCY: {
    1: "Monthly",
    2: "Quarterly",
    3: "Semi-Annually",
    4: "Annually",
  },
  REALLOCATION_COUNT_STARTS_FROM: {
    1: "Beginning of the plan year",
    2: "First Reallocation Date",
  },
  BUSINESS_TYPE: {
    1: "LLC",
    2: "PLC",
    3: "C-Corp",
    4: "S-Corp",
    5: "Partnership",
    6: "Sole Prop.",
    7: "Others",
  },
  COMPANY_TYPE: {
    0: "Regular",
    1: "MEP",
    2: "PEP",
  },
  TAXED_AS: {
    1: "Corp",
    2: "S-Corp",
    3: "Partner or Sole ",
  },
  MODE_OF_HRS_COMP: {
    1: "PayPeriod",
    2: "Year To Date",
  },
  MODE_OF_FUNDING: {
    1: "ACH Credit",
    2: "ACH Debit",
  },
  WITHDRAWAL_TYPE: {
    1: "Inservice",
    2: "Hardship",
    3: "RequiredMinimumDistribution",
    4: "SeparationFromService",
    5: "Permissible",
    6: "ForceOut",
  },
  PAYROLLFREQUENCY_TYPE: {
    1: "Daily",
    2: "Weekly",
    3: "Semi-Monthly",
    4: "Monthly",
    5: "Quarterly",
    6: "Semi-Annually",
    7: "Annually",
    8: "Bi-Weekly",
  },
  EMPLOYMENT_STATUS: {
    1: "Active",
    2: "Retired",
    3: "Terminated ",
    4: "Leave",
    5: "Military Leave",
    6: "Deceased",
    7: "Disabled",
    8: "Others",
  },
  EMPLOYEE_CLASSIFICATION_TYPE: {
    1: "Location",
    2: "Division",
    3: "Department",
    4: "Employee Type",
    5: "Excluded Class",
    6: "Union Indicator",
    7: "Client Eligibility",
    8: "Others",
  },
  PAY_DATE_BEHAVIOUR: {
    0: "No Change",
    1: "Move to Prior Business Date",
    2: "Move to Next Business Date",
  },
  SOURCES_STATUS_TYPE: {
    0: "Incomplete",
    1: "Complete",
  },
  SOURCES_ADDED_TOPLAN: {
    0: "",
    1: "Added To Plan",
  },
  SOURCE_CATEGORY_TYPES: {
    2: "Employee Deferral Sources",
    4: "Employee Other Sources",
    6: "Employer Match Sources",
    5: "Employer Discretionary Sources",
    7: "Employer Match Roth Sources",
    8: "Employer Non-elective Roth Sources",
    9: "Employer Other Sources",
    10: "Prevailing Wages",
    11: "Employer QNEC",
    12: "Employer QMAC",
  },
  SOURCES_FORM_TYPES: {
    1: "Employee",
    2: "Employer",
  },
  SOURCES_FORM_EMPLOYEE_CATEGORIES: {
    2: "Deferral",
    4: "Other",
  },
  SOURCES_EMPLOYER_CATERGORIES: {
    5: "Discretionary",
    6: "Match",
    7: "Match Roth",
    8: "Non-elective Roth",
    10: "Prevailing Wages",
    9: "Other",
    11: "QMAC",
    12: "QNEC",
  },
  SOURCES_FORM_DEFERRAL_SUB_CATEGORIES: {
    4: "Pre Tax",
    5: "Roth",
    6: "After Tax",
    12: "Other",
    11: "Student Loan Payment Matched",
  },
  SOURCES_FORM_DEFERRAL_SUB_SUB_CATEGORIES: {
    1: "Regular",
    2: "Catch-Up",
    3: "Conversion",
  },
  SOURCES_FORM_OTHER_SUB_CATEGORIES: {
    7: "Pre Tax Rollover",
    8: "Roth Rollover",
    9: "After Tax Rollover",
  },
  SOURCES_FORM_EMPLOYER_OTHER_SUB_CATEGORIES: {
    1: "QMAC",
    2: "QNEC",
  },
  ALLOCATION_RULES_CONTRIBUTION_TYPE: {
    1: "Percentage",
    2: "Dollar",
    3: "Both",
  },
  ALLOCATION_RULES_PRCNT_REHIRES: {
    1: "Original Allocation Percentage",
    2: "Other",
  },
  SOURCES_CONTRIBUTION_METHOD: {
    1: "Check",
    2: "Wire",
    3: "Both",
  },
  SOURCES_EMPLOYER_RESPONSIBLE_FOR_CALC: {
    1: "Client",
    2: "CORE",
    3: "Validate",
  },
  SOURCES_ELIGIBLE_PAY_DETERMINATION: {
    1: "Pay Date",
    2: "Pay Period End Date",
  },
  SOURCE_SAFE_HARBOUR_TYPES: {
    1: "BASIC",
    2: "QACA",
    3: "Enhanced",
  },
  ADVISOR_SERVICE_TYPE: {
    1: "12b-1 Broker",
    2: "RIA",
    3: "Level Comp 25",
    4: "Level Comp 50",
    5: "Level Comp 75",
    6: "Level Comp 100",
    7: "Level Comp Wtd Avg",
  },
  SOURCE_EMPLOYER_MATCH_CONTR_TYPE: {
    2: "Percentage Match on Deferral",
    3: "Tiered Match",
    4: "Age Based Tier",
    5: "Service Based Tier",
    6: "Hire Date Based Tier",
    7: "Salary Based Tier",
  },
  SOURCE_EMPLOYER_DISCRETIONARY_CONTR_TYPE: {
    1: "Percentage Of Compensation",
    4: "Age Based Tier",
    5: "Service Based Tier",
    6: "Hire Date Based Tier",
    7: "Salary Based Tier",
    8: "Flat Dollar",
  },
  SOURCE_QMAC_QNEC_TYPE: {
    1: "Percentage",
    2: "Dollar",
  },
  ELIGIBILITY_TYPE: {
    1: "Plan",
    2: "Source",
  },
  ELIGIBILITY_STATUS: {
    0: "Eligible",
    1: "Ineligible",
  },
  REPORT_TYPE_OPTIONS: {
    1: "Contribution History – Participant Level Detail Report",
    2: "Contribution History – Source Level Detail Report",
    3: "Accounting Transaction Report",
    4: "Summary Of Participant Accounts",
    5: "Executive Summary Report",
    6: "Participant Fee Report",
    7: "Rebalance Report",
    8: "SDB Report",
    9: "RMD Report",
    10: "Sponsor Fee Report",
    11: "Trust Accounting Report",
  },

  ENTRYDATECLASSIFICATION_TYPE: {
    1: "Plan",
    2: "Source",
  },
  ENTRYDATECLASSIFICATION_CRITERIA: {
    1: "First day of the month",
    2: "First day of the payroll period",
    3: "First day of the quarter",
    4: "First day of the plan year or first day of seventh month plan year",
    5: "First day of the plan year",
    6: "Immediate",
    7: "Others",
  },
  ENTRYDATECLASSIFICATION_ADDITIONALRULE: {
    1: "Yes",
    2: "No",
  },
  ENTRYDATECLASSIFICATION_PROSPECTIVEORRETROSPECTIVE: {
    1: "Following",
    2: "Preceding",
    3: "Nearest",
  },
  EXCUSION_TYPE: {
    1: "Date of hire",
    2: "Employee classification",
    3: "Both",
    0: "None",
  },
  DATE_OFHIRE: {
    1: "Hired on or before",
    2: "Hired between",
  },
  VESTING_METHOD: {
    1: "Hours Of Service",
    //2: "Equivalency",
    2: "Elapsed Time",
    3: "Equivalency",
  },
  ACCOUNT_TYPE: {
    1: "Savings",
    2: "Current",
  },
  ACCOUNT_STATUS: {
    1: "Active",
    2: "Inactive",
  },
  RETIREMENT_TYPE: {
    1: "Age",
    2: "Years of Service",
    4: "Years of Participation",
  },

  RETIREMENT_COMPARISON_CRITERIA: {
    1: "Earlier of",
    2: "Later of",
  },

  RETIREMENT_DATE_OPTIONS: {
    1: "Date the participant reaches early retirement",
    2: "First day of month of ERA attainment",
  },
  YEARS_OF_SERVICE_OPTIONS: {
    1: "Eligibility YOS",
    2: "Vesting YOS",
  },
  NORMAL_RETIREMENT_DATE_OPTIONS: {
    1: "Date the participant reaches normal retirement",
    2: "First day of month of NRA attainment",
  },
  ENROLLMENT_PLAN_ENTRYDATE: {
    1: "First day of the month",
    2: "First day of the payroll period",
    3: "First day of the quarter",
    4: "First day of the plan year or first day of seventh month plan year",
    5: "First day of the plan year",
    8: "First Monday of the next week",
    6: "Immediate",
    7: "Others",
  },
  ENTRYDATE_REHIRE_OPTIONS: {
    0: "None",
    1: "Immediate",
    2: "Next Entry",
  },
  ENROLLMENT_PROSPECTIVEORRETROSPECTIVE: {
    1: "Following",
    2: "Preceding",
    3: "Nearest",
  },
  PAYROLL_FILE_STATUS_DATA: {
    0: "All",
    1: "Creation in progress",
    2: "Upload in progress",
    3: "Error Correction Required",
    4: "Pending Submission",
    5: "Awaiting Funding",
    6: "Awaiting Trade",
    7: "Completed",
    8: "Cancelled",
    9: "Deleted",
    12: "Error in File Processor",
    13: "SystemFailure",
    14: "Awaiting Fund Confirmation",
    15: "Payroll Funded",
    16: "Funding Failed",
  },
  LOAN_REPAYMENT_DETAIL_LOAN_STATUS: {
    0: "All",
    1: "Draft",
    2: "Awaiting Approval",
    3: "Rejected",
    4: "Awaiting Trade",
    5: "Awaiting Trade Confirmation",
    6: "Trade Rejected",
    7: "Active",
    8: "Delinquent",
    9: "Default - Deemed Distribution",
    10: "Default - Benefit Offset",
    11: "Suspended",
    12: "Closed",
    13: "Deleted",
    14: "Outstanding",
  },
  LOAN_REPAYMENT_DETAIL_SUBMMITED_DATE: {
    0: "All",
    1: "Submitted date",
    2: "Activated date",
    3: "Closed date",
  },
  // ENROLLMENT_PLAN_ENTRYDATE: {
  //   1: "Immediate",
  //   2: "First day of the month coinciding with or next following the date an employee meets the eligibility requirements",
  //   3: "First day of the month following the date an employee meets the eligibility requirements",
  //   4: "First day of the payroll coinciding with or next following the date an employee meets the eligibility requirements",
  //   5: "First day of the payroll period following the date an employee meets the eligibility requirements",
  //   6: "First day of the quarter coinciding with or next following the date an employee meets the eligibility requirements",
  //   7: "First day of the quarter following the date an employee meets the eligibility requirements",
  //   8: "First day of the plan year coinciding with or next following the date an employee meets the eligibility requirements",
  //   9: "First day of the plan year following the date an employee meets the eligibility requirements",
  //   10: "First day of the plan year or first day of the seventh month of the plan year coinciding with or next following the date an employee meets the eligibility requirements",
  //   11: "First day of the plan year or first day of the seventh month of the plan year following the date an employee meets the eligibility requirements",
  // },
  COMPENSATION_DEFINITIONS: {
    1: "IRC Section 3401(a)-Compensation subject to withholding",
    2: "IRC Section 3401(a)-Compensation subject to withholding + pre-tax amounts",
    3: "IRC Section 6041/6051 W2",
    4: "IRC Section 6041/6051 W2 + pre-tax amounts",
    5: "IRC Section 415(C)-All income",
    6: "IRC Section 415(C)-All income + pre-tax amounts",
  },
  COMPENSATION_CALCULATIONS: {
    1: "Paid after becoming a participant",
    2: "Paid during Plan Year",
    3: "Paid during Calendar Year",
  },
  COMPENSATION_CATEGORY_CALCULATIONS: {
    1: "Add",
    2: "Deduct",
  },
  COMPENSATION_EXCLUDE_TYPES: {
    1: "Overtime",
    2: "Bonus",
    3: "Commissions",
    4: "Vacation Pay",
    5: "Other",
  },
  COMPENSATION_EMPLOYEE_TYPES: {
    1: "HCE",
    2: "ALL",
  },
  PERIODIC_PAYMENT_OPTIONS: {
    1: "Specific Tenure",
    2: "Specific Dollar",
    4: "Amortization Method",
    8: "Annuitization Method",
  },
  PERIODIC_PAYMENT_OPTIONS_ENUM: {
    SpecificTenure: 1,
    SpecificDollar: 2,
    AmortizationMethod: 4,
    AnnuitizationMethod: 8,
  },
  DISTRIBUTIONS_TYPE: {
    1: "In-Service",
    2: "Hardship",
    3: "Required Minimum Distribution",
    4: "Separation from Service",
    5: "Permissible Withdrawal",
    6: "Force out",
    7: "Qualified Birth and Adoption Distribution",
    8: "Qualified Domestic Relations Order (QDRO)",
    9: "Death Distribution",
  },
  USER_ROLES: {
    1: "Admin",
    2: "Sponsor",
    5: "PRI",
    6: "PRPR",
    7: "PRQC",
    8: "VOU",
    9: "SPU",
    10: "PLSH",
    11: "PLSM",
    12: "PLSL",
    13: "PARTICIPANT",
    19: "ADMINISTRATOR",
  },
  DISTRIBUTIONS_SOURCE_CATEGORY: {
    0: "All",
    2: "Employee Deferral Sources",
    4: "Employee Other Sources",
    5: "Employer Discretionary Sources",
    6: "Employer Match Sources",
    7: "Employer Match Roth Sources",
    8: "Employer NonElective Roth Sources",
    9: "Employer Other Sources",
  },
  DISTRIBUTIONS_HARDSHIP_REASONS: {
    1: "Certain medical expenses",
    2: "Costs related to purchasing a principal residence",
    3: "College tuition and education fees for the next 12 months",
    4: "Expenses required to avoid a foreclosure or eviction",
    5: "Burial or funeral costs",
    6: "Home repair after a natural disaster",
    7: "Covid '19",
    8: "Safe harbor",
    9: "Other",
  },
  DISTRIBUTION_WITHDRAWAL_TYPE: {
    1: "Dollar",
    2: "Percentage",
  },
  DISTRIBUTION_DETECT_FEES_FROM: {
    1: "Account Balance",
    2: "Request Amount",
  },
  DISTRIBUTION_DETECT_FEES_FROM_RMD: {
    2: "Request Amount",
  },
  INVESTMENT_TYPES: {
    1: "Model Portfolio",
    2: "Annuity",
    3: "Bond",
    4: "Brokerage",
    5: "CCT Fund",
    6: "Index Fund",
    7: "Lifestyle",
    8: "Mutual Fund",
    9: "Stock Fund",
    10: "Self-Directed",
    11: "Cryptocurrency",
  },
  INVESTMENT_CATEGORY: {
    1: "Aggressive Allocation",
    2: "Annuity",
    3: "Bank Loan",
    4: "Bear Market",
    5: "Communications",
    6: "Equity Energy",
    7: "Financials",
    8: "Health",
    9: "India Equity",
    10: "Multicurrency",
  },
  TYPE_OF_EARNINGS: {
    1: "Record date based",
    2: "Interest based",
  },
  DIVIDEND_TYPE_MASTER: {
    1: "Periodic",
    2: "Equity accural",
    3: "Compounded equity accural",
  },
  DIVIDEND_PROCESSING_FREQUENCY_MASTER: {
    1: "Monthly",
    2: "Quarterly",
    3: "Semi - Annually",
    4: "Annually",
  },
  DIVIDEND_PROCESSING_OPTION: {
    1: "Pass Through",
    2: "Reinvest",
  },
  EXCLUDE_INVESTMENT_FROM: {
    1: "Master timings restrictions",
    2: "Redemption fee processing",
  },
  DIVIDEND_TYPE: {
    1: "Equity",
    2: "Accrual",
  },
  DIVIDEND_DISTRIBUTION_TYPE: {
    1: "Accrual",
    2: "Equity",
  },
  DIVIDEND_PROCESSING_DATE: {
    1: "Annually",
    2: "Quarterly",
    3: "Monthly",
    4: "Semi Monthly",
  },

  TEMP_INVESTMENTS: {
    1: "investment 01",
    2: "investment 02",
    3: "investment 03",
    4: "investment 04",
    5: "investment 05",
    6: "investment 06",
    7: "investment 07",
    8: "investment 08",
    9: "investment 09",
    10: "investment 10",
    11: "investment 11",
    12: "investment 12",
    13: "investment 13",
    14: "investment 14",
    15: "investment 15",
  },
  PROSPECTUS_DELIVERY_METHOD: {
    1: "Online",
    2: "Mail",
  },
  FREQUENCY_OF_PROSPECTUS_DISCLAIMER: {
    1: "Do Not Show",
    2: "Every Transfer",
    3: "Transfers into New Investments only",
  },
  POSTING_RULES: {
    1: "Trade Date",
    2: "Settlement Date",
  },
  CLEAING_PARTNER_ACCOUNT_ID: {
    1: 30239900122,
    2: 23244244213,
    3: 23244232341,
  },
  CLEARANCE_TIME: {
    1: "Hours",
    2: "Minutes",
  },
  INVESTMENT_VOLATILITY: {
    1: "Low",
    2: "Low to Moderate",
    3: "Moderate",
    4: "Moderate to High",
    5: "High",
  },
  MODEL_RISK_OPTIONS: {
    1: "Low",
    2: "Below Average",
    3: "Average",
    4: "Above Average",
    5: "High",
  },
  INVESTMENT_SHARE_CLASS: {
    1: "None",
    2: "Class R1",
    3: "Class R2",
    4: "Class R3",
    5: "Class R4",
    6: "Class R5",
    7: "Class R6",
  },
  INVESTMENT_OBJECTIVE: {
    1: "Interest income without risk of loss of principal",
    2: "Long term growth of capital",
    3: "Match the performance of russell 2000 index",
    4: "Maximum total return",
    5: "Match the performance of standard & poor's 500 (S& P 500) index",
  },
  RESTRICTED_PERIOD: {
    1: "Days",
    2: "Weeks",
    3: "Months",
    4: "Years",
  },
  LOAN_TYPE: {
    1: "General purpose",
    2: "Residential",
    3: "Other",
  },
  MANAGE_LOAN_TYPE: {
    1: "General purpose",
    2: "COVID-19",
    3: "Hurricane",
    4: "Residential 00",
  },
  MAXIMUM_AMOUNT: {
    1: "Allowed by Loan Regulators",
    2: "Percentage of Balance",
    3: "Others",
  },
  CURE_PERIOD: {
    1: "End of calendar quarter following delinquent quarter",
    2: "Fixed number of days",
  },
  CURE_PERIOD_EMPLOYEE_TERMINATION: {
    1: "End of calendar quarter following delinquent quarter",
    2: "Fixed number of days",
  },
  SERVICE_REQUIREMENT_FOR_LOAN: {
    1: "Month(s)",
    2: "Year(s)",
  },
  LOAN_INTEREST_RATE: {
    1: "Prime",
    2: "Prime + a%",
    3: "Other",
  },
  REASON_FOR_LOAN_SUSPENSION: {
    1: "Leave of Absence (LOA)",
    2: "Military Leave of Absence (MLOA)",
    3: "Others",
  },
  STATUS_FOR_PLAN: {
    1: "93",
  },
  STATUS_FOR_SOURCE: {
    1: "2058",
  },
  TEMP_APPLICABLE_TYPES: {
    1: "Allocation",
    2: "Reallocation",
    4: "Manual Rebalance",
    8: "Transfer in",
    16: "Transfer out",
    64: "Rollover in",
    128: "Loans",
    256: "In service withdrawal",
    512: "Hardship withdrawal",
    1024: "SFS withdrawal",
    2048: "RMD",
    4096: "Force out",
    8192: "Permissible withdrawal",
    16384: "Fee",
    32768: "Shareholder Servicing Payment",
    131072: "Auto-Rebalance",
    // 6: "Transfer Out Hardship",
    // 7: "Withdrawal In-Service",
    // 8: "Withdrawal",
  },
  MODEL_INV_RISK_TYPE: {
    1: "Aggressive",
    2: "Moderate",
    3: "Average",
  },
  SOURCE_NAME_STATUS: {
    1: "EMP-PT",
    2: "ER-DISC",
    3: "EMP-ROTH",
    4: "ER-MATCH",
    5: "EMP-PT",
  },
  // LOAN_STATUS: {
  //   1: "Active",
  //   2: "Default",
  //   3: "Deferred",
  //   4: "Closed",
  // },
  PLAN_CATERGORY: {
    0: "Regular",
    1: "MEP",
    2: "PEP",
    3: "Prototype",
    //4: "Common Remitter",
  },
  PLAN_LEVEL: {
    1: "Master",
    2: "Adopting Employer",
  },
  ELIBILITY_STATUS: {
    0: "Not Eligible",
    1: "Eligible",
  },
  ANNUITY_PAYMENTS: {
    1: "Fixed Date",
    2: "Participant Selected",
  },
  PAYMENT_FREQUENCY_RMD: {
    1: "Fixed Date",
    2: "Participant Selected",
  },
  DISTRIBUTION_ALLOCATION: {
    1: "Prorata of Choice",
    2: "Allow me to choose",
  },
  PAYMENT_METHOD: {
    1: "One time payment",
    2: "Periodic Payment",
  },
  PAYMENT_METHOD_APPLICABLE: {
    1: "Check",
    2: "EFT",
  },
  RESTRICTIONS_APPLICABLE: {
    1: "Age",
    2: "Plan YOS",
  },
  PLAN_TYPES: {
    1: "401(k)",
    2: "403(b)",
    //3: "457",
    4: "SEP",
    5: "Money Purchase Plan",
    //6: "Profit sharing",
    7: "SIMPLE IRA",
    //8: "IRA",
    9: "SIMPLE 401(k)",
    10: "Regular DB",
    11: "401(a)",
    12: "Starter 401(k)",
    //13: "Safe Harbor 403(b)",
    14: "ESOP",
    15: "Governmental 457(b)",
    16: "Force-out Traditional IRA",
    17: "Force-out Roth IRA",
    18: "Cash Balance",
    19: "Solo 401(k)",
    20: "SARSEP",
    21: "Taft Hartley",
    22: "457(f)",
    23: "409(a)",
    24: "Non-Governmental 457(b)",
  },
  PLAN_TYPE_ENUM_LABELS: {
    "401(k)": "401(k)",
    "403(b)": "403(b)",
    "Governmental 457(b)": "Governmental 457(b)",
    "Non-Governmental 457(b)": "Non-Governmental 457(b)",
    SEP: "SEP",
    "Money Purchase Plan": "Money Purchase Plan",
    "Profit Sharing": "Profit sharing",
    "SIMPLE IRA": "SIMPLE IRA",
    IRA: "IRA",
    "SIMPLE 401(k)": "SIMPLE 401(k)",
    "Regular DB": "Regular DB",
    "401(a)": "401(a)",
    "Starter 401(k)": "Starter 401(k)",
    "Safe Harbor 403(b)": "Safe Harbor 403(b)",
    ESOP: "ESOP",
    "Governmental 457(b)": "Governmental 457(b)",
    "Non-Governmental 457(b)": "Non-Governmental 457(b)",
    "Force-Out Traditional IRA": "Force-out Traditional IRA",
    "Force-Out Roth IRA": "Force-out Roth IRA",
    "Cash Balance": "Cash Balance",
    "Solo 401(k)": "Solo 401(k)",
    SARSEP: "SARSEP",
    "Taft Hartley": "Taft Hartley",
    "457(f)": "457(f)",
    "409(a)": "409(a)",
  },

  PLAN_STATUS_LIST: {
    0: "Under Construction",
    1: "Ready for Approval",
    2: "Approved",
    3: "Active",
    4: "Inactive",
    //5: "Terminated",
    6: "Partially Terminated",
  },
  PLAN_STATUS_LIST_0: {
    0: "UnderConstruction",
    1: "ReadyForApproval",
    2: "Approved",
    3: "Active",
    4: "Inactive",
    5: "Terminated",
    6: "PartiallyTerminated",
  },
  PLAN_STATUS_LIST_1: {
    0: "Under Construction",
    1: "Ready for Approval",
    2: "Approved",
    3: "Active",
    4: "Inactive",
    5: "Terminated",
    6: "Partially Terminated",
  },
  PLAN_LEVEL: {
    1: "Master",
    2: "Adopting Employer",
  },
  ALLOCATION_FORMULA_APPLIES_TO: {
    1: "Employee classification",
  },
  ELIGIBILITY_RULES: {
    1: "Date of hire",
    2: "Employee classification(s)",
    3: "Date of hire and Employee classification(s)",
    4: "Date of hire or Employee classification(s)",
    0: "None",
  },
  ELIGIBILITY_RULES_WITHOUT_NONE: {
    1: "Date of hire",
    2: "Employee classification(s)",
    3: "Date of hire and Employee classification(s)",
  },

  PROSPECTUS_NOTICE: {
    1: "Every Request",
    2: "First Request",
    3: "Never",
  },

  ADJUSTMENT_STATUS: {
    4: "Completed",
    3: "Awaiting settlement",
    2: "Awaiting trade",
    1: "Draft",
    5: "Trade cancelled",
  },
  ADDITIONAL_ELIGIBILITY_RULES: {
    //1: "Date of Hire",
    2: "Employee Classification",
    //3: "Both Date of Hire and Employee Classification",
  },
  ADDITIONAL_ENTRYDATE_RULES: {
    //1: "Date of Hire",
    1: "Employee Classification",
    //3: "Both Date of Hire and Employee Classification",
  },
  ADDITIOANAL_DEFAULT_ELECTION_RULES: {
    1: "Employee Classification",
  },
  SERVICE_DEFINITIONS: {
    1: "Hour(s) of service",
    2: "Elapsed Time",
    3: "Equivalency",
  },
  ELIGIBILITY_REQUIREMENT: {
    1: "Age",
    2: "Service",
    3: "Both age and service",
  },
  ELIGIBILITY_CALCULATION: {
    1: "Anniversary of hire",
    2: "Plan year after anniversary of hire",
    3: "Other computational period",
  },
  COMPUTATION_PERIOD: {
    2: "Plan Year",
  },
  SERVICE_REQUIREMENT: {
    1: "One year of service",
    2: "Two years of service",
  },
  ONE_YEAR_SERVICE_REQUIREMENT: {
    1: "One year of service",
  },
  CREDIT_PERIOD: {
    1: "At the end of eligibility calculation period",
    2: "Immediately after the hours condition is satisfied",
  },
  Service_Credit_Day: {
    1: "Same day",
    2: "Subsequent day",
  },
  BREAK_SERVICE_RULE: {
    1: "One Year Hold Out",
    2: "Rule of parity",
  },
  LENGTH_OF_SERVICE: {
    1: "Days",
    2: "Months",
    3: "Years",
  },
  DATE_OF_HIRE: {
    1: "Hired on or after",
    2: "Hired on or before",
    3: "Hired between (inclusive)",
  },
  // ADDITIONAL_DATE_OF_HIRE: {
  //   1: "Hired on or after",
  //   // 2: "Hired on or before",
  //   // 3: "Hired between (inclusive)",
  // },
  WITHDRAWAL_LIMIT_PERIOD: {
    1: "Annually",
    // 2: "Monthly",
    2: "Quarterly",
    3: "Semi-annually",
    4: "Not applicable",
  },
  MINIMUM_WITHDRAWAL_LIMIT: {
    1: "EACA",
    2: "QACA",
    3: "None",
  },
  VESTED_AT: {
    1: "Death",
    2: "Disability",
    4: "NRA",
    8: "ERA",
    16: "Partial plan termination",
  },
  VESTING_METHODS: {
    1: "Hours of Service",
    2: "Elapsed Time",
    3: "Equivalency",
  },
  VESTING_COMPUTATION_PERIODS: {
    // 1: "Anniversary of Hire",
    2: "Plan Year",
  },
  VESTING_START_DATE_INDICATOR: {
    1: "Plan entry",
    2: "Employment date",
  },
  VESTING_PAST_PERIOD_COMPUTATION: {
    1: "Compute full years",
    2: "Compute half years",
    3: "Do not compute",
  },
  VESTING_SERVICE_CREDIT_PERIODS: {
    1: "At the end of Computation Period",
    2: "Immediately after the Hours condition is satisfied",
    3: "On the Next Pay Date",
  },
  VESTING_BREAK_IN_SERVICE_RULE: {
    1: "One Year Hold Out",
    2: "Rule of Parity",
    3: "Five Years BIS",
  },
  FORFEITURE_TREATMENTS: {
    1: "Allocate to Participants",
    2: "Plan Expenses",
    4: "Reduce ER Contributions",
    8: "Reduce Match Contributions",
  },
  FORFEITURE_ENABLED_FORFEITURE_TREATMENT: {
    1: "Allocate to Participants",
    2: "Plan Expenses",
  },
  BASIC_SERVER_RULES: {
    1: "One Year Holdout",
    2: "Rule Of Parity",
    3: "5 Years Break In Service Rule",
  },
  GENDER: {
    M: "Male",
    F: "Female",
    U: "Unknown",
  },
  MARITAL_STATUS: {
    S: "Single",
    M: "Married",
    D: "Divorced",
    W: "Widower",
  },
  RECORD_TYPES_OPTIONS: {
    0: "All records",
    1: "Error records",
  },
  OPTOUT_RESET_FREQUENCY: {
    1: "Plan year start Date",
    2: "Anniversary of Opt-out",
  },

  ENROLLMENT_APPY_ADI: {
    1: "Suspension",
    2: "Termination",
    3: "Both",
  },
  ADDITIONAL_AUTO_ENROLLMENT_OPTIONS: {
    1: "Date Of Hire",
    2: "Employee Classification",
    3: "Both",
    0: "None",
  },
  SCHEDULER_FREQUENCY: {
    1: "Minutes",
    2: "Hours",
    3: "Day",
  },
  ROAD_TRIP_OCCURANCE_DEFINITION: {
    1: "Transfer in followed by a transfer out",
    2: "Transfer out followed by a transfer in",
  },
  MARKET_TIMING_RULES: {
    1: "Follow Investment level MTRs",
    2: "Always exclude from MTRs",
  },
  FAILED_RULE_RESULT: {
    1: "Warn",
    2: "Block",
    3: "Block future",
  },
  INCLUDE_INVESTMENT_IN: {
    1: "Global level",
    2: "Company level",
  },
  SDB_PROVIDER: {
    1: "Pershing",
    2: "Schwab (PCRA)",
  },
  SDB_TYPE: {
    0: "Traditional",
    1: "Roth",
  },
  ACCOUNT_TYPE_MASTER: {
    1: "Unit",
    2: "Share",
  },
  INVESTMENT_STATUS_MASTER: {
    1: "Open",
    2: "Closed",
  },
  REDEMPTION_SELL_TRANSACTIONS: {
    1: "Loan Disbursement",
    2: "Distribution",
    4: "Transfer",
    8: "Manual Rebalancing",
    16: "Auto-Rebalancing",
  },
  REDEMPTION_BUY_TRANSACTIONS: {
    1: "Contribution",
    2: "Loan repayment",
    8: "Dividend",
    16: "Transfer",
    32: "Rollover In",
    64: "Manual Rebalancing",
    128: "Auto-Rebalancing",
  },
  REDEMPTION_HOLDING_PERIOD: {
    1: "Calendar Days",
    2: "Business Days",
  },
  REALLOCATION_PERIOD: {
    1: "Annually",
    2: "Monthly",
    3: "Quarterly",
    4: "Semi-Annually",
    5: "Daily",
    6: "Weekly",
    7: "Bi-Weekly",
    8: "Semi-Monthly",
  },
  ENROLLMENT_INVITE: {
    1: "Immediately after employee record is created",
    2: "Fixed number of days before Entry Date",
    3: "Once employee meets his eligibility requirements",
    4: "Fixed number of days before Forecasted eligibility date",
  },
  FREQUENCY_ENROLLMENT: {
    1: "Weekly",
    2: "Biweekly",
    3: "Monthly",
  },
  CODE_OPTIONS_ROLLOVER: {
    1: "Code B: Designated Roth account distribution",
    2: "Code G: Direct rollover of a distribution to a qualified plan, a section 403(b) plan, a governmental section 457(b) plan, or an IRA",
    3: "Code H: Direct rollover of a designated Roth account distribution to a Roth IRA",
    4: "Code J: Early distribution from a Roth IRA, no known exception",
    5: "Code K: Distribution of traditional IRA assets not having a readily available FMV",
    6: "Code N: Recharacterized IRA contribution made for 2022 and recharacterized in 2022",
    7: "Code Q: Qualified distribution from a Roth IRA",
    8: "Code R: Recharacterized IRA contribution made for 2021 and recharacterized in 2022",
    9: "Code S: Early distribution from a SIMPLE IRA in first 2 years, no known exception (under age 59½)",
    10: "Code T: Roth IRA distribution, exception applies",
  },
  CODE_OPTIONS_CASH: {
    1: "Code 1: Early distribution, no known exception",
    2: "Code 2: Early distribution, exception applies",
    3: "Code 3: Disability",
    4: "Code 4: Death",
    5: "Code 6: Section 1035 exchange",
    6: "Code 7: Normal distribution",
    7: "Code 8: Excess contributions plus earnings taxable in 2022",
    8: "Code 9: Cost of current life insurance protection",
    9: "Code C: Reportable death benefits under section 6050Y",
    10: "Code D: Annuity payments from nonqualified annuities that may be subject to tax under section 1411",
    11: "Code E: Distributions under Employee Plans Compliance Resolution System (EPCRS)",
    12: "Code F: Charitable gift annuity",
    13: "Code L: Loans treated as distributions under section 72(p)",
    14: "Code M: Qualified plan loan offset",
    15: "Code P: Excess contributions plus earnings taxable in 2021",
    16: "Code U: Dividend distribution from ESOP under section 404(k)",
    17: "Code W: Charges or payment for purchasing qualified long-term care insurance contracts under combined arrangements",
    18: "Code A: May be eligible for 10-year tax option",
  },
  CODE_OPTIONS_CASH_ROLLOVER: {
    0: "Code NA: Not Applicable",
    1: "Code 1: Early distribution, no known exception",
    2: "Code 2: Early distribution, exception applies",
    3: "Code 3: Disability",
    4: "Code 4: Death",
    5: "Code 6: Section 1035 exchange",
    6: "Code 7: Normal distribution",
    7: "Code 8: Excess contributions plus earnings taxable in 2022",
    8: "Code 9: Cost of current life insurance protection",
    9: "Code C: Reportable death benefits under section 6050Y",
    10: "Code D: Annuity payments from nonqualified annuities that may be subject to tax under section 1411",
    11: "Code E: Distributions under Employee Plans Compliance Resolution System (EPCRS)",
    12: "Code F: Charitable gift annuity",
    13: "Code L: Loans treated as distributions under section 72(p)",
    14: "Code M: Qualified plan loan offset",
    15: "Code P: Excess contributions plus earnings taxable in 2021",
    16: "Code U: Dividend distribution from ESOP under section 404(k)",
    17: "Code W: Charges or payment for purchasing qualified long-term care insurance contracts under combined arrangements",
    18: "Code A: May be eligible for 10-year tax option",
    19: "Code B: Designated Roth account distribution",
    20: "Code G: Direct rollover of a distribution to a qualified plan, a section 403(b) plan, a governmental section 457(b) plan, or an IRA",
    21: "Code H: Direct rollover of a designated Roth account distribution to a Roth IRA",
    22: "Code J: Early distribution from a Roth IRA, no known exception",
    23: "Code K: Distribution of traditional IRA assets not having a readily available FMV",
    24: "Code N: Recharacterized IRA contribution made for 2022 and recharacterized in 2022",
    25: "Code Q: Qualified distribution from a Roth IRA",
    26: "Code R: Recharacterized IRA contribution made for 2021 and recharacterized in 2022",
    27: "Code S: Early distribution from a SIMPLE IRA in first 2 years, no known exception (under age 59½)",
    28: "Code T: Roth IRA distribution, exception applies",
    29: "Code 1B: Early distribution, no known exception & Designated Roth account distribution",
    30: "Code 7B: Normal distribution & Designated Roth account distribution",
    31: "Code 1L: Early distribution, no known exception & Loans treated as distributions under section 72(p)",
    32: "Code 7L: Normal distribution & Loans treated as distributions under section 72(p)",
    33: "Code 1M: Early distribution, no known exception & Qualified plan loan offset",
    34: "Code 7M: Normal distribution & Qualified plan loan offset",
    35: "Code 2B: Early Distribution, Exception Applies & Designated Roth Account Distribution",
    36: "Code 4B: Death & Designated Roth Account Distribution",
  },

  CODE_OPTIONS_CASH_INPLANROTHCONVERSION: {
    1: "Code 1: Early distribution, no known exception",
    2: "Code 2: Early distribution, exception applies",
    3: "Code 3: Disability",
    4: "Code 4: Death",
    5: "Code 6: Section 1035 exchange",
    6: "Code 7: Normal distribution",
    7: "Code 8: Excess contributions plus earnings/excess deferrals (and/or earnings) taxable in 2022.",
    8: "Code 9: Cost of current life insurance protection",
    9: "Code C: Reportable death benefits under section 6050Y",
    10: "Code D: Annuity payments from nonqualified annuities that may be subject to tax under section 1411",
    11: "Code E: Distributions under Employee Plans Compliance Resolution System (EPCRS)",
    12: "Code F: Charitable gift annuity",
    13: "Code L: Loans treated as distributions under section 72(p)",
    14: "Code M: Qualified plan loan offset",
    15: "Code P: Excess contributions plus earnings/excess deferrals (and/or earnings) taxable in 2021",
    16: "Code U: Dividend distribution from ESOP under section 404(k)",
    17: "Code W: Charges or payment for purchasing qualified long-term care insurance contracts under combined arrangements",
    18: "Code A: May be eligible for 10-year tax option",
    19: "Code B: Designated Roth account distribution",
    20: "Code G: Direct rollover of a distribution to a qualified plan, a section 403(b) plan, a governmental section 457(b) plan, or an IRA",
    21: "Code H: Direct rollover of a designated Roth account distribution to a Roth IRA",
    22: "Code J: Early distribution from a Roth IRA, no known exception",
    23: "Code K: Distribution of traditional IRA assets not having a readily available FMV",
    24: "Code N: Recharacterized IRA contribution made for 2022 and recharacterized in 2022",
    25: "Code Q: Qualified distribution from a Roth IRA",
    26: "Code R: Recharacterized IRA contribution made for 2021 and recharacterized in 2022",
    27: "Code S: Early distribution from a SIMPLE IRA in first 2 years, no known exception (under age 59½)",
    28: "Code T: Roth IRA distribution, exception applies",
  },

  PAYEE_OPTIONS: {
    1: "Self",
    2: "Beneficiary",
  },
  WAIVEOFF_REASON_OPTIONS: {
    1: "To a beneficiary on or after the death of the participant,",
    2: "Participant is disabled",
    3: "After separation from service if separation occurred during or after the calendar year in which the participant reached age 55",
    4: "To an alternate payee under a qualified domestic relations order (QDRO)",
    5: "To a participant for medical care up to the amount allowable as a medical expense deduction",
    6: "To reduce excess contributions",
    7: "To reduce excess employee or matching employer contributions",
    8: "To reduce excess elective deferrals",
    9: "IRS levy on the plan.",
    10: "On account of disasters for which IRS relief has been granted",
  },
  DISTRIBUTION_MODES: {
    1: "Distribution to self",
    2: "Rollover to traditional IRA",
    3: "Rollover to roth IRA",
    4: "Rollover to another plan",
    5: "Distribution to beneficiary",
    6: "Distribution to alternate payee",
  },
  DISTRIBUTION_MODES_INSERVICE: {
    1: "Cash Distribution",
  },
  DISTRIBUTION_MODES_QDRO: {
    6: "Distribution to alternate payee",
  },
  DISTRIBUTION_MODES_Death: {
    5: "Distribution to Beneficiary",
  },
  PAYMENT_OPTIONS: {
    2: "EFT",
    1: "Mail Check to Address",
  },
  FORFEITURE_EVENTS: {
    2: "Permissible Withdrawal",
    4: "5 Year BIS",
    3: "Full Distribution",
    1: "Force out",
    5: "Payroll Funding",
    6: "Sponsor Fee",
    7: "Participant Fee",
    8: "Dividend",
    9: "Dividend Reversal",
  },
  FORFEITURE_STATUS: {
    0: "Active",
    1: "InActive",
    2: "InProgress",
  },
  FEES_TYPE: {
    1: "Balance based",
    2: "Investment based",
    3: "Maintenance based",
  },
  FEE_FOR: {
    0: "All",
    1: "Participant",
    2: "Sponsor",
  },
  ALLOCATION_TYPE: {
    1: "Fixed amount",
    2: "Percentage/Basis Points",
    3: "Tiered",
  },
  DIVIDEND_STATUS: {
    1: "Completed",
    2: "Draft",
    3: "Pending",
    4: "Data Mismatch",
    5: "Dividend Reversed",
  },
  RESTRICTED_TRASACTION_TYPE: {
    1: "Manual Enrollment",
    2: "Auto Enrollment",
    4: "Reallocation",
    8: "Rebalance",
    16: "Auto Rebalance",
    32: "Transfers",
    64: "Loans",
    128: "In-service Withdrawal",
    256: "Hardship Withdrawal",
    512: "RMD",
    1024: "Auto RMD",
    2048: "SFS",
    4096: "Permissible Withdrawal",
    8192: "Force out",
    16384: "Auto Force out",
    32768: "Qualified birth and adoption",
    65536: "Fees",
    131072: "Payroll Contributions",
    262144: "Rollover",
    524288: "Shareholder Servicing Payment",
    1048576: "In Plan Roth Conversion",
  },

  WORKITEM_STATUS_OPTIONS: {
    0: "New",
    1: "In Progress",
    2: "Completed",
  },
  PLAN_QUALIFICATION_OPTIONS: {
    1: "ERISA",
    2: "Non-ERISA",
  },
  NATURE_OF_PLAN: {
    1: "Defined Contribution Plan",
    2: "Defined Benefit Plan",
    3: "Deferred Compensation Plan",
  },
  INVESTMENT_TYPE_OPTIONS: {
    8: "Mutual Fund",
    13: "Money Market Fund",
    14: "Stable Value Fund",
  },
  CUSIP_FILTER_BASED_ON_NAV: {
    1: "NAV",
    2: "Manually Edited",
    3: "No NAV",
  },
  ADJUSTMENT_TYPE: {
    1: "Adjust balance",
    2: "Process lost earnings",
    3: "Transfer Assets",
  },
  ADJUSTMENT_TYPE_BATCH: {
    1: "Adjust balance",
    2: "Process lost earnings",
  },
  BATCH_ADJUSTMENT_TYPE: {
    1: "Adjust balance",
    2: "Process lost earnings",
  },
  BULK_UPLOAD_TYPE: {
    1: "Bulk Investments Upload",
    2: "Performance data",
  },

  Filing_5500_FORM_TYPES_1: {
    "5500 Long form": 1,
    "5500 Short form": 2,
    "5500 EZ": 4,
    "Schedule A": 8,
    "Schedule C": 16,
    "Schedule D": 32,
    "Schedule G": 64,
    "Schedule H": 128,
    "Schedule I": 256,
    "Form 5558": 1024,
  },

  ADJUSTMENT_TRANSFER_TYPE: {
    1: "Account transfer",
    2: "Source to source",
    3: "Plan account to forfeiture account",
    4: "Forfeiture account to plan account",
  },
  TRANSACTION_RESTRICTED_DURING_BLOCK_PERIOD: {
    1: "All transfers",
    2: "Only Roundtrips",
  },
  EMPLOYER_SOURCE_EXCLUSIONS: {
    1: "Employee Classification",
    2: "Employment Status",
  },
  CONTRIBUTION_CONDITION_TYPE: {
    1: "On or Before",
    2: "Between",
    3: "On or After",
  },
  CONTRIBUTION_CONDITION_SALARY_TYPE: {
    1: "Plan Compensation",
    2: "Annual Compensation",
    3: "Social Security Wage (SSW)",
  },
  CONTRIBUTION_CONDITION_SALARY_TYPE_CLASSIFICATION: {
    4: "Upto",
    5: "Above",
  },
  AMOUNT_BASED_CONTRIBUTION_TYPE: {
    1: "Pro-rata based on plan compensation",
    2: "Equal split",
  },
  ADDRESS_TYPE_IRA_OPTIONS: {
    "001": "Lexis Nexis Verification",
    "002": "NCOA",
  },
  FILE_TYPE_IRA: {
    13: "Account Setup/Modify",
    12: "Rollover-In Breakdown",
    14: "Address Import",
  },
  FEE_TYPE: {
    0: "All",
    1: "Balance based",
    2: "Investment based",
    3: "Maintenance based",
  },
};

export const CashAssetOptions = [
  {
    label: "Asset Transfer",
    value: 0,
  },
  {
    label: "Cash Withdrawal",
    value: 1,
  },
];
