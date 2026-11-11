import { faCircle, faEdit } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { safeGetCssVar } from "../../cssHelper";

export const RESTRICTION_COMPLEX_ROUTES = [
  64, 128, 256, 512, 2048, 4096, 8192, 32768,
];

export const PRODUCT_CLIENT = {
  CPCEEP: 3,
};

export const IRSCategoryReport = [
  { label: "415 C Limit", value: 1 },
  { label: "IRC 414v Catch-Up Limit", value: 2 },
  { label: "Compensation Limit", value: 3 },
  { label: "HCE Definition", value: 4 },
  { label: "Compensation For Key Employee", value: 5 },
  { label: "Taxable Wage base", value: 6 },
  { label: "402 (g) Limit", value: 7 },
  { label: "Section 408 (p) Limit", value: 8 },
  { label: "Limit 219p", value: 9 },
  { label: "Limit 457b2", value: 10 },
  { label: "Minimum Compensation Amount 408k2", value: 11 },
  { label: "Three-Year Special Catch-Up", value: 12 },
  { label: "W2 Limit", value: 13 },
];
//need to be moved to database
export const PERMITTED_DISPARITY_TABLE = [
  {
    planYear: 2025,
    percentageFrom: 0,
    includeFrom: true,
    percentageTo: 20,
    includeTo: true,
    maxDisparityPercentage: 5.7,
  },
  {
    planYear: 2025,
    percentageFrom: 20,
    includeFrom: false,
    percentageTo: 80,
    includeTo: true,
    maxDisparityPercentage: 4.3,
  },
  {
    planYear: 2025,
    percentageFrom: 80,
    includeFrom: false,
    percentageTo: 100,
    includeTo: false,
    maxDisparityPercentage: 5.4,
  },
  {
    planYear: 2025,
    percentageFrom: 100,
    includeFrom: true,
    percentageTo: 100,
    includeTo: true,
    maxDisparityPercentage: 5.7,
  },
];

export const RESTRICTION_WITHDRAWAL_TYPE_ENUM = {
  128: "Inservice",
  256: "Hardship",
  512: "RequiredMinimumDistribution",
  2048: "SeparationFromService",
  4096: "Permissible",
  8192: "ForceOut",
  32768: "QBAD",
};

export const TRANSFER_STATUS = {
  1: "In Progress",
  2: "Awaiting Trade",
};

export const ADJUSTMENT_TYPE = {
  1: "Adjust balance",
  2: "Process lost earnings",
  3: "Transfer Assets",
};

export const DEFAULT_PROMPT_MESSAGE =
  "Your changes may be lost; Do you want to Continue?";

export const screenContext = {
  plan: "plan",
  company: "company",
};

export const ENTITY_TYPES = Object.freeze({
  Company: "Company",
  Plan: "Plan",
});

export const contextIds = {
  planDetails: "planDetails",
  companyDetails: "companyDetails",
};

export const SOURCE_CATEGORY_NAME_MAPPING = {
  Deferral: 2,
  EmployeeOther: 4,
  Discretionary: 5,
  Match: 6,
  MatchRoth: 7,
  NonElectiveRoth: 8,
  EmployerOther: 9,
  PrevailingWages: 10,
};

export const SOURCE_SUB_CATEGORY_NAME_MAPPING = {
  Pre_Tax: 5,
  Catch_Up: 10,
  After_Tax: 4,
  Roth: 6,
  After_Tax_Rollover: 7,
  Pre_Tax_Rollover: 8,
  Roth_Rollover: 9,
  QMAC: 1,
  QNEC: 2,
};

export const ELIGIBILITY_RULE_MAPPING = {
  Plan: 1,
  Source: 2,
};

export const SOURCE_TYPE = { Employee: 1, Employer: 2 };

export const SERVICE_REQUIREMENT_TYPE = {
  HoursOfService: 1,
  MonthsOfService: 2,
  ElapsedTime: 3,
};

export const TIER_CONDITION_TYPE = { OnOrBefore: 1, Between: 2, OnOrAfter: 3 };

export const ENTRYDATECLASSIFICATION_RULE_MAPPING = {
  Plan: 1,
  Source: 2,
};
export const DISTRIBUTION_WITHDRAWAL_TYPE = {
  In_Service: 1,
  Hardship: 2,
  Required_Minimum_Distribution: 3,
  Separation_from_Service: 4,
  Permissible_Withdrawal: 5,
  Force_Out: 6,
  QBAD: 7,
  QDRO: 8,
  Death_Distribution: 9,
};

export const FORM_PLACEHOLDERS = {
  ssn: "XXX-XX-XXXX",
  phone: "___-___-____",
  zip: "_____-____",
  ein: "__-_______",
  postal: "_____-_____",
};

export const ENROLLMENT_DROPDOWN_OPTIONS = {
  EXCLUDED_EMPLOYEE_CLASSIFICATION: {
    1: "Classification 1",
    2: "Classification 2",
    3: "Classification 3",
    4: "Classification 4",
    5: "Classification 5",
  },
  EXCLUDED_EMPLOYEMENT_STATUS: {
    1: "Employment status 1",
    2: "Employment status 2",
    3: "Employment status 3",
    4: "Employment status 4",
    5: "Employment status 5",
  },
  WINDOW_PERIOD: {
    1: "After eligibility requirement date",
    2: "Before entry date",
    3: "After date of hire",
    4: "After eligibility run date",
  },
  WINDOW_PERIOD_FOR_OPT_OUT: {
    1: "From the date of auto-enrollment",
    2: "From the date of the first contribution",
  },
  WINDOW_PERIOD_FOR_REENROLLMENT: {
    1: "After optout reset",
  },
  paymentOptions: {
    1: "Cheque",
    2: "EFT",
  },
};

// export const INVESTMENTS_BASED_ON = {
//     Age : 1,
//     Birthdate : 2,
//     RetirementDate : 3,
// };

export const applicablePaymentMethodsLoan = [
  {
    label: "Direct payment",
    value: 1,
  },
  {
    label: "Payroll deductions",
    value: 2,
  },
];

export const repaymentMethods = [
  {
    label: "Payroll deductions",
    value: 2,
  },
  {
    label: "Direct Payment",
    value: 1,
  },
  {
    label: "Both",
    value: 3,
  },
];
export const calculateLoanOptions = [
  {
    label: "To Close the Loan",
    value: 1,
  },
  {
    label: "To Catch Up Missed Payments",
    value: 2,
  },
];
export const modifyLoanOptions = [
  { label: "Loan Refinancing", value: 1 },
  { label: "Loan Reamortization", value: 2 },
  { label: "Suspend", value: 3 },
];

export const LTPTVestingComputationPeriod = [
  { label: "Anniversary of hire", value: 1 },
  { label: "Plan year after anniversary of hire", value: 2 },
];

export const LTPTServiceCreditPeriod = [
  { label: "At the end of eligibility calculation period", value: 1 },
  { label: "Immediately after the hours condition is satisfied", value: 2 },
];

export const INVESTMENTS_BASED_ON = [
  {
    label: "Age",
    value: 1,
  },
  {
    label: "BirthDate",
    value: 2,
  },
  {
    label: "RetirementDate",
    value: 3,
  },
];
export const INVESTMENTS_BASED_ON_DE = [
  {
    label: "Age",
    value: 1,
  },
  {
    label: "Birth Date",
    value: 2,
  },
  {
    label: "RetirementDate",
    value: 3,
  },
];
export const rolloverCategoryOptions = [
  {
    label: "Related",
    value: 1,
  },
  {
    label: "Unrelated",
    value: 2,
  },
];
export const INVESTMENT_STATUS = {
  1: "Open",
  2: "Closed",
  3: "Close to new investment",
  4: "Suspended",
};

export const INVESTMENT_HEADERS = {
  1: "Basic details",
  2: "Redemption fees",
  3: "Market timing rules",
  4: "Performance data",
  5: "Market Price Information",
  6: "History",
  7: "Transactions",
  8: "Accrual Rate",
};
export const INVESTMENT_PLAN_HEADERS = {
  1: "Basic details",
  2: "Clearing partner details",
  3: "Advisor representative details",
  4: "Redemption fee",
};
export const IRSCategory = {
  1: "415 C Limit",
  2: "IRC 414v Catch-Up Limit",
  3: "Compensation Limit",
  4: "HCE Definition",
  5: "Compensation For Key Employee",
  6: "Taxable Wage base",
  7: "402 (g) Limit",
  8: "Section 408 (p) Limit",
  9: "Limit 219p",
  10: "Limit 457b2",
  11: "Minimum Compensation Amount 408k2",
  12: "Three-Year Special Catch-Up",
  13: "W2 Limit",
};

export const getUserRole = (x) => {
  let name;

  switch (x) {
    case 1:
      name = "Admin";
      break;
    case 2:
      name = "ADMINLND";
      break;
    case 3:
      name = "ADMINPAYROLL";
      break;
    case 4:
      name = "SPONSOR";
      break;
    case 5:
      name = "PRI";
      break;
    case 6:
      name = "PRPR";
      break;
    case 7:
      name = "PRQC";
      break;
    case 8:
      name = "VOU";
      break;
    case 9:
      name = "SPU";
      break;
    case 10:
      name = "PLSH";
      break;
    case 11:
      name = "PLSM";
      break;
    case 12:
      name = "PLSL";
      break;
    case 13:
      name = "Participant";
      break;
    case 14:
      name = "EMPLOYER ADMIN";
      break;
    case 15:
      name = "PROCESSOR";
      break;
    case 16:
      name = "CONSULTANT";
      break;
    case 17:
      name = "EDITOR";
      break;
    case 18:
      name = "RELATIONSHIP MANAGER";
      break;
    case 19:
      name = "IRA SPECIALIST";
      break;
    case 20:
      name = "TESTROLE";
      break;
    case 21:
      name = "ADVISOR";
      break;
    case 22:
      name = "TPA";
      break;
    default:
      name = "";
  }

  return name;
};

export const TRANSACTION_TYPES = {
  1: "Distributions",
  2: "Rollover In",
  3: "Transfers",
  4: "Dividend",
  5: "Payroll",
  6: "Loan Request",
  7: "Loan Repayment",
  8: "Fee",
  9: "Rebalance",
  10: "Stock Split",
  11: "Fund Merger",
  12: "Fund Switch",
  13: "Adjustments",
  14: "Model Portfolio Rebalance",
  15: "Forfeiture-in",
  16: "Forfeiture-out",
  17: "Shareholder servicing payment",
  18: "In-Plan Roth Conversion",
  19: "Contribution Reversal",
  20: "Dividend Reversal",
  21: "Fee Reversal",
  22: "Batch Adjustment",
};

export const ADJUSTMENT_TRANSACTION_TYPES = {
  1: "Distributions",
  6: "Loan Request",
  7: "Loan Repayment",
  4: "Dividend",
  5: "Payroll",
};
export const TRADE_TYPE = {
  1: "Buy",
  2: "Sell",
};

export const TRANSACTION_VIEW = [
  {
    label: "Participant",
    value: 1,
  },
  {
    label: "Transaction",
    value: 2,
  },
];

export const USER_MANAGEMENT_OPTIONS = [
  {
    label: "Unassigned",
    value: 2,
  },
  {
    label: "Assigned",
    value: 1,
  },
];

export const TRANSACTION_STATUS = {
  1: "Submitted",
  2: "Awaiting Trade",
  3: "Completed",
  6: "Awaiting Settlement",
};

export const APPLICABLE_LEVEL = {
  1: "Global",
  2: "Plans",
  3: "Plan groups",
};

export const SERVICE_PROVIDER_CONNECTION_STATUS = {
  1: "InProgress",
  2: "Active",
  3: "Disconnected",
};

export const PieChartColors = [
  safeGetCssVar("--chart-color-lightred-300", "#fd7f6f"),
  safeGetCssVar("--chart-color-lightblue-300", "#7eb0d5"),
  safeGetCssVar("--chart-color-limegreen-300", "#b2e061"),
  safeGetCssVar("--chart-color-purple-300", "#c684c3"),
  safeGetCssVar("--chart-color-yellow-300", "#f4c179"),
  safeGetCssVar("--chart-color-lightyellow-300", "#fff08f"),
  safeGetCssVar("--chart-color-lavender-300", "#cec9e9"),
  safeGetCssVar("--chart-color-pink-300", "#fdd7ea"),
  safeGetCssVar("--chart-color-mint-300", "#a3ded4"),
  //TODO remove later below colour codes
  "#066A9C",
  "#B042A0",
  "#FF5733",
  "#2ECC71",
  "#FFC300",
  "#3498DB",
  "#E74C3C",
  "#8E44AD",
  "#27AE60",
  "#F1C40F",
  "#2980B9",
];

export const LOAN_STATUS = {
  1: "InProgress",
  2: "Deleted",
  3: "AwaitingApproval",
  4: "Rejected",
  5: "Suspended",
  6: "Approved",
  7: "AwaitingTrade",
  8: "Active",
  9: "Delinquent",
  10: "DefaultDeemedDistribution",
  11: "DefaultBenefitOffset",
  12: "Closed",
  13: "RefinancingRequestAwaitingApproval",
  14: "ReAmortizationRequestAwaitingApproval",
  15: "RefinancingRequestAwaitingTrade",
  16: "ReAmortizationRequestAwaitingTrade",
  17: "ClosedByRefinancing",
  18: "ClosedByReAmortization",
  19: "ClosedBySuspension",
  20: "EsignatureInProgress",
  21: "EsignatureRejected",
  22: "EsignatureVoided",
  23: "TradeRejected",
  24: "TradeCompleted",
  25: "AwaitingSettlement",
  26: "ReAmortizeEsignatureInProgress",
  27: "ReAmortizeEsignatureRejected",
  28: "ReAmortizeEsignatureVoided",
  29: "ReFinanceEsignatureInProgress",
  30: "ReFinanceEsignatureRejected",
  31: "ReFinanceEsignatureVoided",
  32: "ApprovalInprogress",
  33: "AwaitingDisbursement",
  34: "DisbursementFailed",
  35: "TradeCancelled",
  36: "AwaitingDisbursementConfirmation",
  38: "EsignatureFailed",
  39: "ReFinanceAwaitingSettlement",
  40: "ReFinanceAwaitingDisbursement",
  41: "ReFinanceAwaitingDisbursementConfirmation",
  42: "ReFinanceDisbursementFailed",
  43: "ReFinanceTradeCancelled",
};

export const refinanceLoanStatusMap = {
  15: 7,
  39: 25,
  40: 33,
  41: 36,
  42: 34,
  43: 35,
};

export const translateReFinanceLoanStatuses = (loanStatus) =>
  refinanceLoanStatusMap[loanStatus] ?? loanStatus;

export const LOAN_STATUS_GROUPS = {
  ACTIVE_LOANS: [
    "Active",
    "RefinancingRequestAwaitingApproval",
    "RefinancingRequestAwaitingTrade",
    "ReFinanceEsignatureInProgress",
    "ReAmortizationRequestAwaitingApproval",
    "ReAmortizationRequestAwaitingTrade",
    "ReAmortizeEsignatureInProgress",
    "RefinancingRequestAwaitingTrade",
    "ReFinanceAwaitingSettlement",
    "ReFinanceAwaitingDisbursement",
    "ReFinanceAwaitingDisbursementConfirmation",
    "ReFinanceDisbursementFailed",
    "ReFinanceTradeCancelled",
  ],

  INACTIVE_LOANS: [
    "Delinquent",
    "Suspended",
    "Closed",
    "DefaultDeemedDistribution",
    "DefaultBenefitOffset",
  ],

  CLOSED_BY_MODIFICATION_LOANS: [
    "ClosedByRefinancing",
    "ClosedByReAmortization",
    "ClosedBySuspension",
  ],
};

export const isLoanStatusInGroup = (status, group) =>
  group.includes(LOAN_STATUS[status]);

export const WITHDRAWAL_TRANSACTION_STATUS = {
  1: "AwaitingDisbursement",
  2: "AwaitingDisbursementConfirmation",
  3: "DisbursementFailed",
  4: "Completed",
};

export const FEE_TRANSACTION_STATUS = {
  17: "AwaitingDisbursement",
  18: "AwaitingDisbursementConfirmation",
  19: "DisbursementFailed",
  6: "Completed",
  1: "AwaitingTrade",
  7: "AwaitingSettlement",
  10: "Paid",
  11: "PartiallyPaid",
};
export const REPAYMENT_MODE = {
  1: "DirectPayment",
  2: "PayrollDeduction",
  3: "Adjustment",
};

export const getValidDate = (date) => {
  return date !== "" || date !== false || date !== undefined
    ? date
    : new Date();
};

export const LOAN_STATUS_REPORT = {
  1: "In Progress",
  2: "Deleted",
  3: "Awaiting Approval",
  4: "Rejected",
  5: "Suspended",
  6: "Approved",
  7: "Awaiting Trade",
  8: "Active",
  9: "Delinquent",
  10: "Default Deemed Distribution",
  11: "Default Benefit Offset",
  12: "Closed",
  13: "Refinancing Request Awaiting Approval",
  14: "ReAmortization Request Awaiting Approval",
  15: "Refinancing Request Awaiting Trade",
  16: "ReAmortization Request Awaiting Trade",
  17: "Closed By Refinancing",
  18: "Closed By ReAmortization",
  19: "Closed By Suspension",
  20: "E-signature In Progress",
  21: "E-signature Rejected",
  22: "E-signature Voided",
  26: "ReAmortize E-signature In Progress",
  27: "ReAmortize E-signature Rejected",
  28: "ReAmortize E-signature Voided",
  29: "ReFinance E-signature In Progress",
  30: "ReFinance E-signature Rejected",
  31: "ReFinance E-signature Voided",
  38: "E-signature Failed",
};

export const LOAN_MODIFICATION_TYPE = {
  1: "ReAmortize",
  2: "ReFinance",
};

export const LOAN_STATUS_ENUM = {
  InProgress: 1,
  Deleted: 2,
  AwaitingApproval: 3,
  Rejected: 4,
  Suspended: 5,
  Approved: 6,
  AwaitingTrade: 7,
  Active: 8,
  Delinquent: 9,
  DefaultDeemedDistribution: 10,
  DefaultBenefitOffset: 11,
  Closed: 12,
  RefinancingRequestAwaitingApproval: 13,
  ReAmortizationRequestAwaitingApproval: 14,
  RefinancingRequestAwaitingTrade: 15,
  ReAmortizationRequestAwaitingTrade: 16,
  ClosedByRefinancing: 17,
  ClosedByReAmortization: 18,
  ClosedBySuspension: 19,
  EsignatureInProgress: 20,
  EsignatureRejected: 21,
  EsignatureVoided: 22,
  TradeRejected: 23,
  TradeCompleted: 24,
  AwaitingSettlement: 25,
  ReAmortizeEsignatureInProgress: 26,
  ReAmortizeEsignatureRejected: 27,
  ReAmortizeEsignatureVoided: 28,
  ReFinanceEsignatureInProgress: 29,
  ReFinanceEsignatureRejected: 30,
  ReFinanceEsignatureVoided: 31,
  ApprovalInprogress: 32,
  AwaitingDisbursement: 33,
  DisbursementFailed: 34,
  TradeCancelled: 35,
  AwaitingDisbursementConfirmation: 36,
  EsignatureFailed: 38,
  ReFinanceAwaitingSettlement: 39,
  ReFinanceAwaitingDisbursement: 40,
  ReFinanceAwaitingDisbursementConfirmation: 41,
  ReFinanceDisbursementFailed: 42,
  ReFinanceTradeCancelled: 43,
};

export const LOAN_MODIFICATION_TYPE_ENUM = { ReAmortize: 1, ReFinance: 2 };

export const REPAYMENT_MODE_ENUM = {
  DirectPayment: 1,
  PayrollDeduction: 2,
  Adjustment: 3,
};

export const TRADE_TYPE_ENUM = { Buy: 1, Sell: 2 };

export const TRANSACTION_TYPE_ENUM = {
  Distributions: 1,
  RolloverIn: 2,
  Transfers: 3,
  Dividend: 4,
  Payroll: 5,
  LoanRequest: 6,
  LoanRepayment: 7,
  Fee: 8,
  Rebalance: 9,
  StockSplit: 10,
  FundMerger: 11,
  FundSwitch: 12,
  Adjustments: 13,
  ModelPortfolioRebalance: 14,
  ForfeitureIn: 15,
  ForfeitureOut: 16,
  ShareholderServicingPayment: 17,
  InPlanRothConversion: 18,
  ContributionReversal: 19,
  DividendReversal: 20,
  FeeReversal: 21,
  BatchAdjustment: 22,
};

export const TRANSACTION_STATUS_ENUM = {
  Submitted: 1,
  AwaitingTrade: 2,
  Completed: 3,
  AwaitingSettlement: 6,
};

export const ADJUSTMENT_TYPE_ENUM = {
  AdjustBalance: 1,
  ProcessLostEarnings: 2,
  TransferAssets: 3,
};

export const getWithdrawalStatus = (x) => {
  let name;
  switch (x) {
    case 1:
      name = "Request In Progress";
      break;
    case 2:
      name = "Approval In Progress";
      break;
    case 3:
      name = "Awaiting Trade";
      break;
    case 4:
      name = "Rejected";
      break;
    case 5:
      name = "TradeInitiated";
      break;
    case 6:
      name = "TradeCompleted";
      break;
    case 7:
      name = "TradeRejected";
      break;
    case 8:
      name = "Disbursed";
      break;
    case 9:
      name = "E-signature In Progress";
      break;
    case 10:
      name = "Cancelled - E-sign Rejected";
      break;
    case 11:
      name = "Cancelled - E-sign No Action";
      break;
    case 12:
      name = "Awaiting Settlement";
      break;
    case 13:
      name = "Awaiting Disbursement";
      break;
    case 14:
      name = "Disbursement Failed";
      break;
    case 15:
      name = "Trade Cancelled";
      break;
    case 16:
      name = "Awaiting Disbursement Confirmation";
      break;
    case 17:
      name = "Completed";
      break;
    case 18:
      name = "E-signature Failed";
      break;
  }
  return name;
};

export const isLoanModificationAwaitingApproval = (loanStatus) =>
  loanStatus === "RefinancingRequestAwaitingApproval" ||
  loanStatus === "ReAmortizationRequestAwaitingApproval";

export const getRebalanceStatus = (x) => {
  let name;
  switch (x) {
    case 1:
      name = "Draft";
      break;
    case 2:
      name = "Awaiting Trade";
      break;
    case 3:
      name = "Completed";
      break;
    case 4:
      name = "Awaiting Settlement";
      break;
    case 5:
      name = "Trade Cancelled";
      break;
  }
  return name;
};

export const getInPlanRothConversionStatus = (x) => {
  let name;
  switch (x) {
    case 1:
      name = "Approval In Progress";
      break;
    case 2:
      name = "Completed";
      break;
    case 3:
      name = "Rejected";
      break;
  }
  return name;
};

export const getLoanRepaymentStatus = (x) => {
  let name;
  switch (x) {
    case 1:
      name = "AwaitingFundConfirmation";
      break;
    case 2:
      name = "AwaitingTrade";
      break;
    case 3:
      name = "AwaitingSettlement";
      break;
    case 4:
      name = "TradeCompleted";
      break;
  }
  return name;
};

export const getWithdrawalName = (x, hideHyphen = false) => {
  let name;
  switch (x) {
    case 1:
      name = "In-Service - ";
      break;
    case 2:
      name = "Hardship - ";
      break;
    case 3:
      name = "Required Minimum Distribution - ";
      break;
    case 4:
      name = "Separation from Service - ";
      break;
    case 5:
      name = "Permissible Withdrawal - ";
      break;
    case 6:
      name = "Force out - ";
      break;
    case 7:
      name = "Qualified Birth and Adoption Distribution - ";
      break;
    case 8:
      name = "QDRO Distribution - ";
      break;
    case 9:
      name = "Death Distribution - ";
      break;
    default:
      name = "";
  }
  return !hideHyphen ? name : name.substring(0, name.length - 3);
};

export const getHardshipReason = (x) => {
  let name;
  switch (x) {
    case 1:
      name = "Certain medical expenses";
      break;
    case 2:
      name = "Costs related to purchasing a principal residence";
      break;
    case 3:
      name = "College tuition and education fees for the next 12 months";
      break;
    case 4:
      name = "Expenses required to avoid a foreclosure or eviction";
      break;
    case 5:
      name = "Burial or funeral costs";
      break;
    case 6:
      name = "Home repair after a natural disaster";
      break;
    case 7:
      name = "Covid '19";
      break;
    case 8:
      name = "Safe harbor";
      break;
    case 9:
      name = "Other";
      break;
    default:
      name = "";
  }
  return name;
};

export const EMPLOYEE_DATA_SOURCE = {
  1: "Core",
  2: "Finch",
};

export const INTEGRATION_TYPE = {
  1: "Finch",
  2: "Enrich",
};

export const UploadedFileType = {
  IsDemographyOnly: 1,
  IsPayrollOnly: 2,
  IsBothDemographyAndPayrollOnly: 3,
  IsDataInitialization: 4,
  LFGProfile: 5,
};

export const uploadDocumentThrough = [
  "Upload the signed documents",
  "Sign the document through E-signature",
];

export const caroutes = [
  "manage-fund-switch",
  "manage-stock-split",
  "manage-fund-merger",
  "manage-dividend",
];

export const umRoutes = ["admin-groups", "manage-users"];

export const wfRoutes = [""];

export const rothSources = [5, 6, 8, 9];

export const employerRothSources = [7, 8];

export const uploadOptions = [
  {
    label: "Upload manually",
    value: false,
  },
  {
    label: "Use E-signature",
    value: true,
  },
];

export const errorCodes = {
  vestingDescription: "PL601",
  vestingOption: "PL604",
  additionalVestingDescription: "PL605",
  hirePeriod: "PL606",
  hireStartDate: "PL607",
  hireEndDate: "PL608",
  hireDate: "PL609",
  participationPeriod: "PL610",
  participationStartDate: "PL611",
  participationEndDate: "PL612",
  participationDate: "PL613",
  includedClassifications: "PL614",
  immediateVestingIndicator: "PL615",
  vestingPastPeriodComputation: "PL634",
  vestedAt: "PL616",
  vestingMethod: "PL617",
  hoursOfService: "PL618",
  elapsedTime: "PL619",
  vestingComputationalPeriod: "PL620",
  serviceCreditPeriod: "PL621",
  descriptionLength: "PL622",
  descriptionContent: "PL623",
  effectiveDateRange: "PL624",
  hoursOfServiceRange: "PL625",
  hireDateRange: "PL626",
  participationDateRange: "PL627",
  monthsRange: "PL628",
  hoursOfService: "PL629",
  vestingSchedule: "PL630",
  vestingScheduleTable: "PL631",
  vestingScheduleTablePercentage: "PL632",
  disregardPrior: "PL700",
  months: "PL701",
  hours: "PL702",
  //minHours:"PL703"
  activeEmployees: "PL653",
  activeEmployeesRange: "PL654",
  daily: "PL655",
  dailyRange: "PL656",
  weekly: "PL657",
  weeklyRange: "PL658",
  biWeekly: "PL659",
  biWeeklyRange: "PL660",
  semiMonthly: "PL661",
  semiMonthlyRange: "PL662",
  monthly: "PL663",
  monthlyRange: "PL664",
  quarterly: "PL665",
  quarterlyRange: "PL666",
  semiAnnually: "PL667",
  semiAnnuallyRange: "PL668",
  annually: "PL669",
  annuallyRange: "PL670",
  breakInServiceRules: "PL671",
  ageYear: "PL672",
  ageMonth: "PL673",
  // tablePercentage1: "tablePercentage1",
  // tablePercentage2: "tablePercentage2",
  // tablePercentage3: "tablePercentage3",
  // tablePercentage4: "tablePercentage4",
  // tablePercentage5: "tablePercentage5",
  // vestingSchedule: "PL60",
  // firstYear: "PL60",
  // secondYear: "PL60",
  // thirdYear: "PL60",
  // fourthYear: "PL60",
  // fifthYear: "PL60",
};

export const adjustmentTypeOptions = {
  1: "Update Balance",
  2: "Process Lost Earnings",
  3: "Transfer Of Assets",
};

export const documentPlanOptions = [
  {
    label: "Summary Plan Description",
    value: 3,
  },
];

export const documentUploadedThrough = {
  UI: 1,
};

export const DOCUMENT_UPLOADED_THROUGH = {
  1: "Manual upload",
};

export const documentSearchOptions = [
  {
    label: "Annual Disclosure",
    value: 1,
  },
  {
    label: "Quarterly Disclosure",
    value: 2,
  },
  {
    label: "Summary Plan Description",
    value: 3,
  },
  {
    label: "Enrollment Notice",
    value: 4,
  },
  {
    label: "Investment & Fee Change Notice",
    value: 5,
  },
  {
    label: "Safe Harbor Notice",
    value: 6,
  },
  {
    label: "Investment Disclosure",
    value: 22,
  },
];

export const DOCUMENT_CATEGORY = {
  1: "Disclosure",
  2: "Enrollment Notice",
  3: "Notice",
};

export const DISCLOSURE_DOCUMENT_TYPE = {
  1: "Annual Disclosure",
  2: "Quarterly Disclosure",
  3: "Summary Plan Description",
  4: "Enrollment Notice",
  5: "Investment & Fee Change Notice",
  6: "Safe Harbor Notice",
  22: "Investment Disclosure",
};

export const ModeOfCompensationCalculation = {
  1: "Added",
  2: "Deducted",
  3: "-",
};

export const countryOptions = [
  { label: "USA", value: "USA" },
  { label: "Other", value: "Other", disabled: true },
];

export const countryCodeOptions = [
  { label: "US", value: "US" },
  { label: "Other", value: "O" },
];

export const MODEL_PORTFOLIO_TRANSACTION_STATUS = {
  0: "All",
  2: "Awaiting trade",
  3: "Awaiting settlement",
  4: "Completed",
};

export const SSP_TRANSATION_STATUS = {
  2: "Awaiting Trade",
  3: "Completed",
  6: "Awaiting Settlement",
  7: "Draft",
};

export const DISBURSEMENT_TRANSATION_STATUS = {
  1: "Awaiting Disbursement",
  2: "Awaiting Disbursement Confirmation",
  3: "Disbursement Failed",
  4: "Completed",
};

export const SSP_ALLOCATION_TYPE = {
  0: "Both",
  1: "Average Daily Balance",
  2: "Record Date",
};

export const DISBURSEMENT_TRANSACTION_TYPE = {
  1: "Distributions",
  2: "Loans",
  3: "Fee",
  4: "Transactional Fees",
};

export const TRANSACTIONAL_FEE_TYPE_CODE = {
  CHKF: "CheckFee",
  EFTF: "EFTFee",
  ONDL: "OvernightDeliveryFee",
  LONF: "LoanFee",
  LREF: "LoanRefinancingFee",
  LRAM: "LoanReAmortizationFee",
  WDOR: "WithdrawalOrOneTimeOriginationFee",
  HARD: "HardshipWithdrawalFee",
  ROLF: "RolloverFee",
  TRNF: "TransferFee",
};

export const TransferStatus = {
  1: "InProgress",
  2: "Awaiting trade",
  3: "Completed",
  4: "Awaiting settlement",
  5: "Trade cancelled",
};

export const ELIGIBILITY_BASIS = {
  1: "Normal",
  2: "LTPT",
  3: "FLTPT",
};

export const CONTRIBUTION_REVERSAL_STATUS = {
  1: "Awaiting trade",
  2: "Awaiting settlement",
  3: "Completed",
  4: "Failed",
  5: "Trade cancelled",
};

export const CONTRIBUTION_REVERSAL_STATUS_HISTORY = {
  1: "Awaiting funding",
  2: "Awaiting trade",
  3: "Contribution reversal completed ",
  4: "Contribution reversal initiated",
};

export const ContributionReversalStatus = [
  { id: 1, label: "Awaiting trade" },
  { id: 2, label: "Awaiting settlement" },
  { id: 3, label: "Completed" },
  { id: 4, label: "Failed" },
  { id: 5, label: "Trade cancelled" },
];

export const CONTRIBUTION_REVERSAL_EMPLOYEE_STATUS = {
  1: "Completed",
  2: "Exempted",
};

export const BATCH_ADJUSTMENT_STATUS = {
  1: "InProgress",
  2: "Awaiting trade",
  3: "Awaiting settlement",
  4: "Completed",
};

export const BATCH_ADJUSTMENT_TRANSACTION_TYPES = {
  // 1: "Distributions",
  // 6: "Loan Request",
  // 7: "Loan Repayment",
  // 4: "Dividend",
  5: "Payroll",
};

export const ButtonWithIconTypes = {
  Excel: 1,
  Refresh: 2,
  ButtonWithImage: 3,
  ButtonWithIcon: 4,
};
export const prefixZero = (number) => {
  return number != 0 && number < 10 ? `0${number}` : `${number}`;
};

export const TenantManagementTableHeader = [
  { label: "Tenant Name", value: "tenantName", type: "link" },
  { label: "URL", value: "url" },
  { label: "Module", value: "module" },
  { label: "Action", value: "action", type: "icon", icon: faEdit },
];

export const Enrollment_applicableTo = [
  {
    label: "Manually Enrolled Employees",
    value: 1,
  },
  {
    label: "Auto Enrolled Employees",
    value: 2,
  },
  {
    label: "Both",
    value: 0,
  },
];

export const DeferralContributionRateUponRehire = [
  {
    label: "Participant's Latest Deferral Rate ",
    value: 1,
  },
  {
    label: "Plan Default Rate",
    value: 2,
  },
];

export const ADDRESS_TYPE = {
  EmployeeAddress: 1,
  EmployerAddress: 2,
  Custom: 3,
};

export const getAddressTypeLabel = (type) => {
  switch (type) {
    case ADDRESS_TYPE.EmployeeAddress:
      return "Employee";
    case ADDRESS_TYPE.Custom:
      return "Custom";
    case ADDRESS_TYPE.EmployerAddress:
      return "Employer";
    default:
      return "Employee";
  }
};

export const VESTING_EXCLUSION_TYPE = [
  {
    label: "None",
    value: 0,
  },
  {
    label: "Service prior to age",
    value: 1,
  },
];
export const repaymentMethod = [
  {
    label: "Check",
    value: 1,
  },
  {
    label: "EFT",
    value: 2,
  },
];

export const contributionReversalStatusStyle = (value) => {
  switch (value) {
    case "Awaiting trade":
      return (
        <div className="awaiting-trade-settlement-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {value}
        </div>
      );
    case "Awaiting settlement":
      return (
        <div className="awaiting-trade-settlement-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {value}
        </div>
      );
    case "Trade cancelled":
      return (
        <div className="trade-cancelled-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {value}
        </div>
      );
    case "Completed":
      return (
        <div className="completed-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {value}
        </div>
      );
    case "Failed":
      return (
        <div className="failed-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {value}
        </div>
      );
    default:
      return "-";
  }
};

export const feeReversalStatusStyle = (value) => {
  const displayValue =
    value?.length > 12 ? `${value?.slice(0, 12)}...` : value?.slice(0, 12);
  switch (value) {
    case "Awaiting trade":
      return (
        <div className="awaiting-trade-settlement-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {displayValue}
        </div>
      );
    case "Awaiting settlement":
      return (
        <div className="awaiting-trade-settlement-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {displayValue}
        </div>
      );
    case "Trade cancelled":
      return (
        <div className="trade-cancelled-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {displayValue}
        </div>
      );
    case "Completed":
      return (
        <div className="completed-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {displayValue}
        </div>
      );
    case "Partially completed":
      return (
        <div className="completed-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {displayValue}
        </div>
      );
    case "Failed":
      return (
        <div className="failed-reversal-style">
          <FontAwesomeIcon className="icon-size mr-1" icon={faCircle} />
          {displayValue}
        </div>
      );
    default:
      return "-";
  }
};

export const accountingTypes = [
  { label: "Cash Accounting", value: 1 },
  { label: "Accrual Accounting", value: 2 },
];

export const PAYMENT_MODE = Object.freeze({
  CHECK: 1,
  EFT: 2,
});

export const Payment_Mode = [
  {
    label: "EFT",
    value: 1,
  },
  {
    label: "Check",
    value: 2,
  },
  {
    label: "Credit Card",
    value: 3,
  },
  {
    label: "Other",
    value: 4,
  },
];

export const PaymentModeEnumMap = {
  1: "EFT",
  2: "Check",
  3: "Credit Card",
  4: "Other",
  5: "WaivedOff",
  6: "Partially WaivedOff",
  7: "Forfeiture Deduction",
};

export const TransactionStatusEnumMap = {
  1: "Awaiting Trade",
  2: "Trade Awaiting Confirmation",
  3: "Trade Rejected",
  4: "Cancelled",
  5: "Failed",
  6: "Completed",
  7: "Awaiting Settlement",
  8: "WaivedOff",
  9: "Partially WaivedOff",
  10: "Paid",
  11: "Partially Paid",
  12: "Not Paid",
};

export const FeeTypeEnum = {
  1: "Balance Based",
  2: "Investment Based",
  3: "Maintenance based",
};

export const FeeRunTypeEnum = {
  1: "One Time",
  2: "Recurring",
};

export const FeeStatusEnum = {
  1: "Draft",
  2: "Active",
  3: "InActive",
};

export const DisbursementPaymentTypeEnum = {
  1: "ACH",
  2: "Wire",
  3: "Check",
};

export const FeeRunStatus = {
  AwaitingTrade: 1,
  Completed: 6,
  AwaitingSettlement: 7,
  AwaitingDisbursement: 17,
  AwaitingDisbursementConfirmation: 18,
  DisbursementFailed: 19,
};

export const PAYEE_VISIBLE_FEE_RUN_STATUSES = [
  FeeRunStatus.AwaitingDisbursement,
  FeeRunStatus.AwaitingDisbursementConfirmation,
  FeeRunStatus.DisbursementFailed,
  FeeRunStatus.Completed,
];

export const Invoice_Fee_Status = [
  {
    label: "Payment Pending",
    value: 8,
  },
  {
    label: "Paid",
    value: 3,
  },
  {
    label: "Overdue",
    value: 7,
  },
  {
    label: "Failed",
    value: 9,
  },
];

export const Invoice_Payment_Mode = [
  {
    label: "Payment link",
    value: 8,
  },
  {
    label: "Credit Card",
    value: 3,
  },
  {
    label: "Check",
    value: 2,
  },
  {
    label: "EFT",
    value: 1,
  },
  {
    label: "Other",
    value: 4,
  },
];

export const InvoiceBulkUplaodEnumMap = {
  1: "Processing",
  2: "Completed",
  3: "Partially Completed",
  4: "Failed",
};

export const TRANSACTION_STATUS_OPTIONS = [
  { label: "Active", value: 1 },
  { label: "Delinquent", value: 2 },
  { label: "Default-Deemed", value: 3 },
  { label: "Suspended", value: 4 },
];

export const EXPORT_LIMIT_FOR_SCHEDULED_REPORTS = 5;

export const TRADE_CANCELLATION_ALLOWED_TRANSACTION_TYPES = {
  1: "IsDistribution",
  2: "IsRollover",
  3: "IsTransfer",
  6: "IsLoan",
  9: "IsRebalance",
  13: "IsAdjustment",
  19: "IsContributionReversal",
};

// Plan types that require 1099 code validation (cannot use "Code NA: Not Applicable")
export const PLAN_TYPES_REQUIRING_1099_CODE = {
  "401(k)": 1,
  "403(b)": 2,
  "401(a)": 11,
  SEP: 4,
  "Money Purchase Plan": 5,
  SARSEP: 20,
  "SIMPLE 401(k)": 9,
  "SIMPLE IRA": 7,
  "Solo 401(k)": 19,
  "Starter 401(k)": 12,
  ESOP: 14,
};

// Array of plan type IDs that require 1099 code validation
export const PLAN_TYPES_REQUIRING_1099_CODE_IDS = Object.values(
  PLAN_TYPES_REQUIRING_1099_CODE
);

//Enums for Switch Fund level
export const PlanApplicableLevel = {
  GLOBAL: 1,
  PLANS: 2,
  PLAN_GROUPS: 3,
};

export const SUBMITTED_TRANSACTION_STATUS = {
  loan: [
    "completed",
    "cancelled",
    "removed",
    "deleted",
    "closed",
    "rejected",
    "active",
    "delinquent",
    "defaultdeemeddistribution",
    "defaultbenefitoffset",
    "suspended",
    "esignaturefailed",
  ],
  withdrawal: [
    "completed",
    "cancelled",
    "removed",
    "deleted",
    "closed",
    "disbursed",
    "rejected",
    "esignaturefailed",
  ],
  rebalance: ["completed", "cancelled", "removed", "deleted", "closed"],
  transfer: ["completed", "cancelled", "removed", "deleted", "closed"],
  inPlanRothConversion: ["completed", "rejected"],
  // loanRepaymentRequest: ["draft","completed", "rejected", "tradeCompleted"],
};
