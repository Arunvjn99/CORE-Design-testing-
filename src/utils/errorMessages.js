export const errors = {
  companyName: {
    required: "Required",
    alreadyExist: "Company Name already exist",
  },
  companyType: {
    required: "Required",
  },
  sponsoringOrganizationId: {
    required: "PL005 : Required",
    alreadyExist: "PL016 : Sponsoring Organization Name already exists",
    lengthExceeded:
      "PL006 : Sponsoring Organization Name should not exceed 50 characters",
    characters:
      "PL010 : Sponsoring Organization Name should not contain special characters",
  },
  masterClassificationName: {
    required: "CM048 : Required",
    alreadyExist: "CM049 : Classification Type already exists",
    length:
      "CM050 : Classification type length should not exceed 50 characters.",
    characters:
      "CM051 : Classification Type should not contain special characters",
  },
  RecordKeeperName: {
    required: "CM079 : Required",
    alreadyExist: "CM080 : RecordKeeper Name already exists",
  },
  SourceName: {
    required: "PL177 : Required",
    alreadyExist: "PL518 : Source Name already exists",
  },
  feeClassificationName: {
    required: "FE048 : Required",
    alreadyExist: "FE049 : Classification Name already exists",
    length:
      "FE050 : Classification Name length should not exceed 30 characters",
    characters:
      "FE051 : Classification Name should not contain special characters",
  },
  masterInvestmentType: {
    required: "TDI002 : Required",
    alreadyExist: "TDI003 : Investment Type already exists",
    length: "TDI150 : Investment Type length should not exceed 50 characters",
    characters:
      "TDI100 : Investment Type should not contain special characters",
  },
  masterInvestmentCategory: {
    required: "TDI004 : Required",
    alreadyExist: "TDI005 : Investment Category already exists",
    length:
      "TDI097 : Investment Category length should not exceed 50 characters",
    characters:
      "TDI151 : Investment Category should not contain special characters",
  },
  masterEmploymentStatus: {
    required: "CM052 : Required",
    alreadyExist: "CM053 : Employment Status already exists",
    length: "CM054 : Employment status should not exceed 50 characters",
    characters:
      "CM055 : Employment status should not contain special characters",
  },

  adjustmentIncidentCode: {
    required: "AJ012 : Required",
    length: "AJ013 : Incident code should not exceed 50 characters",
    alreadyExist: "AJ014 : Incident name already exists",
  },

  masterLoanTypeExists: {
    required: "PL950 : Required",
    alreadyExist: "PL951 : Loan Type already exists",
    length: "PL952 : Loan Type length should not exceed 50 characters",
    characters: "PL953 : Loan Type should not contain special characters",
  },
  einNo: {
    required: "Required",
    alreadyExist: "Tax EIN already exist",
  },
  planName: {
    required: "Required",
    alreadyExist: "Plan Name already exist",
  },
  rkPlanNumber: {
    required: "Required",
    alreadyExist: "Record Keeping Plan number already exists",
  },
  payrollFilterDateOverlap: {
    overlapError: "File received from and to date should not get overlapped",
  },
  paydateFilterDateOverlap: {
    overlapError: "  Pay date from date and to date should not get overlapped",
  },
  marketTimingRules: {
    required: "Required",
  },
  failedRuleResult: {
    required: "TDI049 : Required",
  },
  daysBetweenTransfers: {
    required: "TDI048 : Required",
  },
  daysToBlockFutureTransaction: {
    required: "TDI050 : Required",
  },
  restrictions: {
    required: "Required",
    overlapError: "To date/time should be greater than From date/time",
  },
  restrictionsPlan: {
    required: "Required",
    overlapError:
      "Effective end date cannot be equal to or prior to the effective start date",
    inceptionDateError:
      "Restriction effective start date cannot be prior to the investment inception date",
    planEffectiveDateError:
      "Restriction effective start date cannot be prior to the plan effective date",
  },
  historyFilterDateOverlap: {
    overlapError: "TDI051 : To date should be greater than From date",
  },
  userRegistration: {
    required: "Required",
    invalidEmail: "Email ID is invalid.",
    passwordsDoesNotMatch: "Passwords does not match",
    length: "Email Length Should not exceed more than 500 characters",
    passwordLength:
      "Password Length Should not exceed more than 500 characters",
  },
  createUser: {
    required: "Required",
    invalidEmail: "Email ID is invalid.",
    length: "Email Length Should not exceed more than 500 characters",
  },
  investmentTotal: {
    invalidTotal:
      "PL1030 : The total value of investment election should be exactly 100%",
  },
  investmentPercentage: {
    lessThanMinimum:
      "PL1030 : The investment election percentage should not be less than 0.01",
  },
};

export const loanErrors = {
  loanType: {
    required: "Required",
  },
};

export const apiErrors = {
  404: {
    heading: "Unable to retrieve your data",
    reason: "Something went wrong! please try again.",
  },
  400: {
    heading: "Invalid Input",
    reason: "Please verify and re enter your details.",
  },
  500: {
    heading: "OOPS!",
    reason: "Something went wrong! please try again.",
  },
};
