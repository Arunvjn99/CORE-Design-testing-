import React from "react";
import { Route } from "react-router";

import { manageCompanyFormNames } from "@/utils/constants/company";
import { managePlanFormNames } from "@/utils/constants/plan";
import { managePayrollFormNames } from "@/utils/constants/payroll";

import {
  map,
  get,
  isArray,
  memoize,
  isEmpty,
  toLower,
  upperFirst,
  lowerCase,
  uniqBy,
  groupBy,
  startCase,
} from "lodash-es";

import {
  FLOW_TYPES,
  OPTIONS_DATA_MAPPER,
  ROUTES,
  MANAGE_TRANSACTION_MAINTENANCE_ROUTES,
  getUserRole,
  getWithdrawalStatus,
  getRebalanceStatus,
  getInPlanRothConversionStatus,
  PERMITTED_DISPARITY_TABLE,
  LOAN_STATUS,
} from "@/utils/constants/common";
import {
  MANAGE_DISTRIBUTION_ROUTES,
  MANAGE_TRANSFER_ROUTES,
} from "@/utils/constants/distribution";
import { planFormFields } from "@/utils/constants/plan";
import { MANAGE_CENSUS_ROUTES } from "@/utils/constants/employee";
import { MANAGE_TRANSACTION_ROUTES } from "@/utils/constants/transaction";

import moment from "moment";
import payrollFrequency from "../mocks/payrollFrequency.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheckCircle,
  faSave,
  faTimesCircle,
} from "@fortawesome/pro-light-svg-icons";
import {
  translateInvestments,
  translateInvestmentsLoan,
} from "./transactionsHelper";
import AddToolTip from "@/components/AddToolTip";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AppConfig from "../config/AppConfig";
import { getHomePage } from "@/services/home";

// Helper function for handle kendo and other tooltips
export const handleGridTooltipHover = (e) => {
  const el = e.target;
  const isCell = el.tagName === "TD";
  const isHeaderTitle = el.classList && el.classList.contains("k-column-title");

  if (isCell || isHeaderTitle) {
    if (el.scrollWidth > el.clientWidth) {
      if (!el.getAttribute("title")) {
        el.setAttribute("title", el.innerText || el.textContent);
      }
    } else {
      el.removeAttribute("title");
    }
  }
};

export const getCommaSeparatedValuesFromArr = (arr = []) => arr.join(", ");

export const DRO_STATUS = {
  PENDING_REVIEW: "Pending Review",
  QUALIFIED: "Qualified",
  REJECTED: "Rejected",
  SETTLED: "Settled",
};

// Backend enum Congruent.Core.Events.Shared.Qdro.QDROStatus
export const DRO_STATUS_CODES = {
  [DRO_STATUS.PENDING_REVIEW]: 1,
  [DRO_STATUS.QUALIFIED]: 2,
  [DRO_STATUS.REJECTED]: 3,
  [DRO_STATUS.SETTLED]: 4,
};

export const DRO_STATUS_BY_CODE = Object.fromEntries(
  Object.entries(DRO_STATUS_CODES).map(([status, code]) => [code, status])
);

export const qdroStatusOptions = Object.values(DRO_STATUS).map((status) => ({
  label: status,
  value: status,
  Id: DRO_STATUS_CODES[status],
}));

export const getEventOptionsForCommunicationLevel = (
  events = [],
  eventCategory,
  communicationLevel,
  globalLevelValue = 1
) => {
  return events.filter((eventItem) => {
    if (eventItem?.eventCategory !== eventCategory) {
      return false;
    }
    if (
      communicationLevel === globalLevelValue ||
      communicationLevel === 0 ||
      communicationLevel === null ||
      communicationLevel === undefined
    ) {
      return true;
    }
    return !(eventItem?.isConsolidated ?? false);
  });
};

export const populateManagePayrollFilterForm = (data) => {
  return {
    [managePayrollFormNames.PAYROLL_FILTER]: {
      companyId: get(data, "companyId"),
      planId: get(data, "planId"),
      fileStatus: get(data, "fileStatus"),
      fromDate: get(data, "fromDate"),
      toDate: get(data, "toDate"),
    },
  };
};
export const populateManageCompanyForm = (data) => {
  return {
    [manageCompanyFormNames.DEFINITIONS_MANAGE_COMPANY]: {
      companyName: get(data, "name"),
      companyType: get(data, "employerType"),
      sponsoringOrganizationId: get(data, "sponsoringOrganizationId"),
    },
    [manageCompanyFormNames.INCORPORATION_DETAILS_MANAGE_COMPANY]: {
      companyName: get(data, "name"),
      address1: get(data, "address1"),
      address2: get(data, "address2"),
      country: get(data, "country", "USA"),
      state: get(data, "state"),
      city: get(data, "city"),
      postalCode: get(data, "postalCode"),
      sponsorPostalCode: get(data, "sponsorPostalCode"),
      phoneNumber: get(data, "phoneNumber"),
      email: get(data, "email"),
      website: get(data, "website"),
      businessType: get(data, "businessType"),
      taxedAs: get(data, "taxedAs"),
      fisicalYearMonth: get(data, "fisicalYearMonth"),
      fisicalYearDay: get(data, "fisicalYearDay"),
      stateOfIncorporation: get(data, "stateOfIncorporation"),
      companyStartDate: get(data, "companyStartDate"),
      taxEIN: get(data, "taxEIN"),
      rkPlanNumber: get(data, "rkPlanNumber"),
      companyImage: get(data, "companyImage"),
      operatesAs: get(data, "operatesAs"),
      recordKeeperId: get(data, "recordKeeperId"),
      sicCode: get(data, "sicCode"),
      businessCode: get(data, "businessCode"),
    },
    [manageCompanyFormNames.SETTINGS_MANAGE_COMPANY]: {
      modeOfHours: get(data, "modeOfHours"),
      modeOfCompensation: get(data, "modeOfCompensation"),
      modeOfContribution: get(data, "modeOfContribution"),
      isPayrollCalenderRequire: get(data, "isPayrollCalenderRequire"),
      useFutureDateOfFunding: get(data, "useFutureDateOfFunding"),
      isFileGenerationRequire: get(data, "isFileGenerationRequire"),
      isLatePayrollApplicable: get(data, "isLatePayrollApplicable"),
      isPayrollConfirmationApplicable: get(
        data,
        "isPayrollConfirmationApplicable"
      ),
      isRehireDateLogicApplicable: get(data, "isRehireDateLogicApplicable"),
    },
  };
};

export const populateManagePlanForm = (data) => {
  // return data;
  return {
    [managePlanFormNames.CREATE_PLAN]: {
      category: get(data, "category"),
      planType: get(data, "planType"),
      prototype: get(data, "prototype"),
      company: get(data, "company"),
      planName: get(data, "name"),
      planID: get(data, "id"),
      planLevel: get(data, "level"),
      AECompany: get(data, "company"),
      masterPlan: get(data, "masterPlan"),
      sponsoringOrganisation: get(data, "sponsoringOrganisation.name"),
      sponsoringOrganizationId: get(data, "sponsoringOrganisation.id"),
    },
    [managePlanFormNames.BASIC_DETAILS_MANAGE_PLAN]: {
      planName: get(data, "planName"),
      yearStartMonth: get(data, "startDate.month"),
      yearStartDate: get(data, "startDate.day"),
      yearEndMonth: get(data, "endDate.month"),
      yearEndDate: get(data, "endDate.day"),
      effectiveDate: get(data, "effectiveDate"),
      planTerminationDate: get(data, "planTerminationDate"),
      shortYearIndicator: get(data, "shortYearIndicator"),
      shortYearStartDate: get(data, "shortYearStartDate"),
      shortYearEndDate: get(data, "shortYearEndDate"),
      limitHandling415c: get(data, "limitHandling415c"),
      irsPlanNumber: get(data, "irsPlanNumber") || "",
      trsContractId: get(data, "trsContractId") || "",
      name: get(data, "planAdministrator.name"),
      mobilePhoneNumber:
        get(data, "planAdministrator.contact.mobilePhoneNumber") ||
        get(data, "planAdministrator.contact.workPhoneNumber"),
      email: get(data, "planAdministrator.contact.email"),
    },
    [managePlanFormNames.ADD_SPONSOR_MANAGE_PLAN]: {
      firstName: get(data, "firstName"),
      lastName: get(data, "lastName"),
      ssn: get(data, "ssn"),
      email: get(data, "email"),
      phoneNumber: get(data, "phoneNumber"),
    },
    [managePlanFormNames.ADD_TRUSTEE_MANAGE_PLAN]: {
      trusteeCompanyName: get(data, "trusteeCompanyName"),
      email: get(data, "email"),
      mobilePhoneNumber: get(data, "mobilePhoneNumber"),
      workPhoneNumber: get(data, "workPhoneNumber"),
      website: get(data, "website"),
      level: get(data, "level"),
      addToMaster: get(data, "addToMaster"),
    },
    [managePlanFormNames.MANAGE_RETIREMENT]: {
      earlyRetirement: get(data, "earlyRetirement"),
      earlyAgeYears: get(data, "earlyAgeYears"),
      earlyAgeMonths: get(data, "earlyAgeMonths"),
      earlyServiceYears: get(data, "earlyServiceYears"),
      earlyRetirementDateRule: get(data, "earlyRetirementDateRule"),
      normalRetirement: get(data, "normalRetirement"),
      normalAgeYears: get(data, "normalAgeYears"),
      normalAgeMonths: get(data, "normalAgeMonths"),
      normalServiceYears: get(data, "normalServiceYears"),
      normalRetirementDateRule: get(data, "normalRetirementDateRule"),
    },
    [manageCompanyFormNames.BASIC_SOURCES]: {
      sourceType: get(data, "sourceType"),
      sourceCategory: get(data, "sourceCategory"),
      sourceSubCategory: get(data, "sourceSubCategory"),
      sourceName: get(data, "sourceName"),
      recordKeepingNumber: get(data, "recordKeepingNumber"),
      effectiveStartDate: get(data, "effectiveStartDate"),
      isNewContributionAllowed: get(data, "isNewContributionAllowed"),
      isDisplayToParticipantWebsite: get(data, "isDisplayToParticipantWebsite"),
      isContributionManatory: get(data, "isContributionManatory"),
      contributionType: get(data, "contributionType"),
      limitMinimum: get(data, "limitMinimum"),
      limitMaximum: get(data, "limitMaximum"),

      maximumDollarCompensation: get(data, "maximumDollarCompensation"),
      rehireDeferralPercentage: get(data, "rehireDeferralPercentage"),
      allocationPercForRehires: get(data, "allocationPercForRehires"),
      otherPercForRehires: get(data, "otherPercForRehires"),
      shouldEnrollInAdiProgramme: get(data, "shouldEnrollInAdiProgramme"),
      adiApplicableTo: get(data, "adiApplicableTo"),
      periodOfIncrease: get(data, "periodOfIncrease"),
      autoDeferralIncrease: get(data, "autoDeferralIncrease"),
      maximumADI: get(data, "maximumADI"),
      subjectToAutoEnrollment: get(data, "subjectToAutoEnrollment"),
      defaultContributionForAutoEnrollment: get(
        data,
        "defaultContributionForAutoEnrollment"
      ),
      enrollmentType: "enrollmentType",
      responsibleMode: "responsibleMode",
      eligiblePaymentType: "eligiblePaymentType",
      employerContributionType: "employerContributionType",
      percentageOfCompensation: "percentageOfCompensation",
      periodForCalculation: "periodForCalculation",
      periodForMatchCalculation: "periodForMatchCalculation",
      sourceOfMatch: "sourceOfMatch",
      isSafeHarbourMatch: "isSafeHarbourMatch",
      isMaximumLimitApplicable: "isMaximumLimitApplicable",
      maximumDollarLimit: "maximumDollarLimit",
      isCalculationSuspended: "isCalculationSuspended",
      isCatchApplicable: "isCatchApplicable",
      isTrueUpApplicable: "isTrueUpApplicable",
      safeHarbourType: "safeHarbourType",
      enhancedshMatchPercentage: "enhancedshMatchPercentage",
      uptoPercentageOfDeferral: "uptoPercentageOfDeferral",
      percentageOfCalculation: "percentageOfCalculation",
      percentageOfCompensationMatched: "percentageOfCompensationMatched",
      firstTierMatchPercent: "firstTierMatchPercent",
      secondTierMatchPercent: "secondTierMatchPercent",
      thirdTierMatchPercent: "thirdTierMatchPercent",
      firstTierCompensationMatchPercent: "firstTierCompensationMatchPercent",
      secondTierCompensationMatchPercent: "secondTierCompensationMatchPercent",
      thirdTierCompensationMatchPercent: "thirdTierCompensationMatchPercent",
      employeeGroupsApplicable: "employeeGroupsApplicable",
      qmacType: "qmacType",
      qmacBefore1989: "qmacBefore1989",
      qnecBefore1989: "qnecBefore1989",
    },
    [managePlanFormNames.ADD_ELIGIBILITY]: {
      eligibilityRule: get(data, "eligibilityRuleFor"),
      eligibilityName: get(data, "name"),
      eligibilityDescription: get(data, "description"),
      exclusionType: get(data, "exclusionFromRule.exclusionType"),
      hire: get(data, "exclusionFromRule.dateOfHireType"),
      immediateEligibility: get(data, "immediateEligibility"),
      employeePopulation: get(data, "isRevaluationRequired"),
      isBreakInService: get(data, "isBreakInService"),
      applicableEligibilityRequirement: get(data, "eligibilityType"),
      yearsOfServiceDefinition: get(data, "yearsOfServiceDefinition"),
      eligibilityOption: get(data, "eligibilityOption"),
      age: get(data, "age"),
      yearsOfServiceHours: get(data, "elapsedTime.yearsOfServiceHours"),
      activeEmployee: get(data, "activeEmployee"),
      disabledEmployee: get(data, "disabledEmployee"),
      deceasedEmployee: get(data, "deceasedEmployee"),
      retiredEmployee: get(data, "retiredEmployee"),
      daily: get(data, "daily"),
      weekly: get(data, "weekly"),
      biweekly: get(data, "biweekly"),
      semiMonthly: get(data, "semiMonthly"),
      monthly: get(data, "monthly"),
      quarterly: get(data, "quarterly"),
      semiAnnually: get(data, "semiAnnually"),
      annually: get(data, "annually"),
      eligibilittyCalculationPeriod: get(
        data,
        "defaultEligibilityRule.eligibilittyCalculationPeriod"
      ),
      yearsOfServiceRequirement: get(
        data,
        "actualHours.yearsOfServiceRequirement"
      ),
      serviceCreditPeriod: get(data, "actualHours.serviceCreditPeriod"),
      consecutiveBreaksInService: get(data, "consecutiveBreaksInService"),
      breakInServiceDefinition: get(data, "breakInServiceDefinition"),
      sourceEligibilities: get(data, "sourceEligibilities"),
      hiredOnOrAfterDate: get(data, "exclusionFromRule.hiredOnOrAfterDate"),
      hiredOnOrBeforeDate: get(data, "exclusionFromRule.hiredOnOrBeforeDate"),
      // lengthOfServiceRequirement: get(
      //   data,
      //   "elapsedTime.lengthOfServiceRequirement"
      // ),
      monthsYearDropdown: get(data, "monthsYearDropdown"),
      // lengthOfService: get(data, "elapsedTime.lengthOfService"),
      otherComputationalMonths: get(data, "otherComputationalMonths"),
      hours: get(data, "hours"),
      lengthOfService: get(data, "lengthOfService"),
      period: get(data, "period"),
      eligibilityBreakInServices: get(
        data,
        "eligibilityBreakInServices",
        []
      ).map(({ breakInServiceRuleId }) => breakInServiceRuleId),
    },
  };
};

export const getPathWithParam = ({ path, pathParam, queryParam }) => {
  const isPathParamString =
    pathParam !== "" && ["number", "string"].includes(typeof pathParam);
  if (isPathParamString || pathParam) {
    const params = isArray(pathParam)
      ? pathParam.join("/").replace(`${FLOW_TYPES.ADD}/`, "")
      : pathParam;
    return `${path}/${params}${queryParam || ""}`;
  }
  return `${path}${queryParam || ""}`;
};

export const getAdvancedPathWithParam = ({ path, pathParam, queryParam }) => {
  const isPathParamString =
    pathParam !== "" && ["number", "string"].includes(typeof pathParam);
  if (isPathParamString || pathParam) {
    const params = isArray(pathParam) ? pathParam.join("/") : pathParam;
    return `${path}/${params}${queryParam || ""}`;
  }
  return `${path}${queryParam || ""}`;
};

export const getFlowBasedFormValues = (formValues, flow) => {
  if (flow === FLOW_TYPES.ADD) {
    return {};
  }
  return formValues;
};

export const tranformListToDropdownValues = (list = [], labelKey, valueKey) => {
  return map(list, (item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
};

export const GetTransactionStatus = (x) => {
  switch (x) {
    case 1:
      return (
        <div className="partial-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faBan} /> Awaiting settlement
        </div>
      );
    case 2:
      return (
        <div className="completed-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faCheckCircle} /> Trade completed
        </div>
      );
    case 3:
      return (
        <div className="rejected-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faBan} /> Trade rejected
        </div>
      );
    case 4:
      return (
        <div className="partial-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faBan} /> Disbursement initiated
        </div>
      );
    case 5:
      return (
        <div className="completed-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faCheckCircle} /> Disbursement completed
        </div>
      );
    case 6:
      return (
        <div className="partial-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faBan} /> Trade partially completed
        </div>
      );
    case 7:
      return (
        <div className="rejected-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faBan} /> Trade cancelled
        </div>
      );
    default:
      return (
        <div className="partial-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faBan} /> Awaiting trade
        </div>
      );
  }
};
export const GetPayrollTransactionStatus = (x) => {
  switch (x) {
    case 6:
      return (
        <div className="partial-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faBan} /> Awaiting trade
        </div>
      );
    case 7:
      return (
        <div className="completed-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faCheckCircle} /> Trade completed
        </div>
      );
    default:
      return (
        <div className="partial-tag p-1 fs-12px fw-500">
          <FontAwesomeIcon icon={faBan} /> Awaiting settlement
        </div>
      );
  }
};
export const GetTradeType = (x) => {
  switch (x) {
    case 1:
      return <div className="core-body-text-regular-semi-bold-st">Buy</div>;
    case 2:
      return <div className="core-body-text-regular-semi-bold-red">Sell</div>;
  }
};
export const GetFileType = (x) => {
  switch (x) {
    case 1:
      return <div className="fs-14px fw-500">Input</div>;
    case 2:
      return <div className="fs-14px fw-500">Output</div>;
  }
};
export const GetStatusType = (x) => {
  switch (x) {
    case "0":
    case 0:
      return "Awaiting settlement";
    case "1":
    case 1:
      return "Awaiting settlement";
    case "2":
    case 2:
      return "Settled";
    case "3":
    case 3:
      return "Rejected";
    case "8":
    case 8:
      return "Awaiting settlement";
  }
};
export const GetTradeStatusReportType = (x) => {
  switch (x) {
    case "031":
    case "031":
    case 31:
      return "Confirmed";
    case "36":
    case "036":
    case "37":
    case "037":
    case 36:
    case 37:
      return "Settled";
    case "073":
    case "074":
    case "076":
    case "077":
    case "73":
    case "74":
    case "76":
    case "77":
    case 73:
    case 74:
    case 76:
    case 77:
      return "Rejected";
    case "8":
    case 8:
    default:
      return "Awaiting";
  }
};
export const AggregationLevel = (accountAggregationLevel) => {
  switch (parseInt(accountAggregationLevel)) {
    case 0:
      return "Net Off";
    case 1:
      return "Fully Disclosed";
    default:
      return "Unknown Aggregation Level";
  }
};
export const GetTransactionType = (transactionType) => {
  switch (transactionType) {
    case 1:
      return "Distribution";

    case 2:
      return "Rollover";

    case 3:
      return "Transfer";

    case 4:
      return "Dividend";

    case 5:
      return "Payroll";

    case 6:
      return "Loan";

    case 7:
      return "Loan Repayment";

    case 8:
      return "Fee";

    case 9:
      return "Rebalance";

    case 10:
      return "StockSplit";

    case 11:
      return "FundMerger";

    case 12:
      return "FundSwitch";

    case 15:
      return "Forfeiture In";
    case 17:
      return "Shareholder Servicing Payment";
    case 19:
      return "Contribution Reversal";
    case 13:
      return "Adjustments";
    case 21:
      return "Fee Reversal";
    default:
      return "-";
  }
};
export const usDateFormat = (date) => {
  if (!date) {
    return null;
  }
  if (typeof date === "string" && date.includes("-") && !date.includes("T")) {
    return date.replaceAll("-", "/");
  }
  if (moment(date, "MM/DD/YYYY").isValid() && typeof date === "string") {
    return date;
  } else {
    const jsDate =
      typeof date === "string" ? moment(new Date(date)).utc() : moment(date);
    return jsDate.format("MM/DD/YYYY");
  }
};
export const reportFileDateTimeFormat = (date) => {
  if (!date) {
    return null;
  }
  return moment(date).format("MMDDYYYY_HHmmssSSS");
};
export const reportFileDateFormat = (date) => {
  if (!date) {
    return null;
  }
  return moment(date).format("MMDDYYYY");
};
export const usDateFormatNew = (date) => {
  if (!date) {
    return null;
  }
  if (typeof date === "string" && date.includes("-") && !date.includes("T")) {
    return moment(date, "YYYY-MM-DD").format("MM/DD/YYYY");
  }
  if (moment(date, "MM/DD/YYYY").isValid() && typeof date === "string") {
    return date;
  } else {
    const jsDate =
      typeof date === "string" ? moment(new Date(date)).utc() : moment(date);
    return jsDate.format("MM/DD/YYYY");
  }
};

export const YYYYMMDDdateFormat = (date) => {
  if (!date) {
    return null;
  }
  if (typeof date === "string" && date.includes("-") && !date.includes("T")) {
    return date.replaceAll("/", "-");
  }
  const jsDate =
    typeof date === "string" ? moment(new Date(date)) : moment(date);
  const dayAsStr = jsDate.format("YYYY-MM-DD");

  return dayAsStr;
};
export const truncateWithTooltip = (text, length = 10, className) => {
  if (!text) return "-";
  return (
    <AddToolTip className={className} name={text}>
      {text.length > length ? `${text.slice(0, length)}...` : text}
    </AddToolTip>
  );
};

export const DateFormat = (date, symbol) => {
  if (!date) {
    return null;
  }
  const jsDate = typeof date === "string" ? new Date(date) : date;
  const dayAsStr =
    (jsDate.getMonth() > 8
      ? jsDate.getMonth() + 1
      : "0" + (jsDate.getMonth() + 1)) +
    symbol +
    (jsDate.getDate() > 9 ? jsDate.getDate() : "0" + jsDate.getDate()) +
    symbol +
    jsDate.getFullYear();
  return dayAsStr;
};

export const getNullTableItem = (data) => {
  return !["", null, undefined].includes(data) ? (
    data
  ) : (
    <span className="null-data">NA</span>
  );
};

export const getNullTableData = (data) => {
  return !["", null, undefined].includes(data) ? (
    data
  ) : (
    <span className="null-data">-</span>
  );
};

export const recordCount = (count = 0) => {
  return String(count ?? 0).padStart(2, "0");
};

export const byteConverter = (bytes, decimals = 2) => {
  let units = ["B", "KB", "MB", "GB", "TB", "PB"];

  let i = 0;

  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }

  return parseFloat(bytes.toFixed(decimals)) + " " + units[i];
};

export const sumOfArray = (value = []) => {
  return value.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};
export const sumOfJsonArray = (value = [], key) => {
  return value.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue?.[key] || 0);
  }, 0);
};

export const returnOnlyIfBoolean = (value) => {
  const isBoolean = typeof value === "boolean";
  if (isBoolean) {
    return value;
  }
  return undefined;
};

export const toOptionValuesFromMapper = memoize((obj) => {
  return Object.keys(obj).map((key) => ({
    label: obj[key],
    value: !isNaN(key) ? parseInt(key, 10) : key,
  }));
});

export const clearFieldValues = ({
  values = {},
  fieldsToExculde = [],
  fieldsToClear = [],
}) => {
  const fieldValues = {};
  Object.keys(values).forEach((key) => {
    if (
      (!isEmpty(fieldsToExculde) && !fieldsToExculde.includes(key)) ||
      (!isEmpty(fieldsToClear) && fieldsToClear.includes(key))
    ) {
      fieldValues[key] = null;
    } else {
      fieldValues[key] = values[key];
    }
  });
  return fieldValues;
};

export const fullName = (fName, mName, lName) => {
  return !["", null, undefined].includes(mName)
    ? fName + " " + mName + " " + lName
    : fName + " " + lName;
};

export const fullNameUSI = (fName, mName, lName) => {
  if (!lName && !fName) return "";
  if (!lName) return `${fName}`;
  if (!fName) return `${lName}`;
  if (!mName || !mName.trim()) return `${lName}, ${fName}`;
  return `${lName}, ${fName} ${mName}`;
};

export const getValidName = (name) => {
  return name?.replace(/[^a-zA-Z]/g, "");
};

export const getRandomThreeDigitValue = () => {
  return Math.floor(Math.random() * (999 - 100 + 1) + 100);
};

export const normaliseClassificationValues = (classifications = []) => {
  const normalisedClassification = classifications.map((item) => {
    return {
      ...item,
      id: item.id < 0 ? undefined : item.id,
      employeeClassificationType: parseInt(item.employeeClassificationType, 10),
      isNew: undefined,
      employeeClassificationCodes: get(
        item,
        "employeeClassificationCodes",
        []
      ).map((codeItem) => ({
        ...codeItem,
        id: codeItem.id < 0 ? undefined : codeItem.id,
        isNew: undefined,
        attributes: get(codeItem, "attributes", []).map((attrItem) => ({
          ...attrItem,
          id: attrItem.id < 0 ? undefined : attrItem.id,
          isNew: undefined,
        })),
      })),
    };
  });
  return normalisedClassification;
};

export const getFieldsToBeTouched = (fields = {}) => {
  const temp = {};
  Object.keys(fields).forEach((field) => {
    temp[field] = true;
  });
  return temp;
};

export const getSingleCharDayName = (dayNumber) => {
  const dayMapper = {
    0: "S",
    1: "M",
    2: "T",
    3: "W",
    4: "T",
    5: "F",
    6: "S",
  };
  return dayMapper[dayNumber];
};

// export const ApplicationRoute = AuthorizeRoute;
export const ApplicationRoute = Route;
// export const getRedirectionRoute = (userRole, planId) => {
//   const tokenKey = window.localStorage.getItem(
//     `${AppConfig.get("VITE_CLIENTID")}user:${AppConfig.get(
//       "VITE_AUTHENTICATION_BASE_URL"
//     )}:${AppConfig.get("VITE_CLIENTID")}`
//   );
//   let profileId = get(JSON.parse(tokenKey), "profile.ProfileId");

//   if (userRole) {
//     switch (userRole) {
//       case "SPONSOR":
//         return planId
//           ? `/${MANAGE_PLAN_ROUTES.BASIC_DETAILS}/edit/${planId}`
//           : `/${ROUTES.PLAN}`;
//       case "PARTICIPANT":
//         if (parseInt(profileId))
//           return getPathWithParam({
//             path: `${ROUTES.MANAGE_CENSUS}/employee-information`,
//             pathParam: [FLOW_TYPES.EDIT, profileId],
//           });
//         return `/${ROUTES.MANAGE_EMPLOYEE}`;
//       case "ADMIN":
//       case "ADMINLND":
//       case "ADMINPAYROLL":
//         return `/${ROUTES.DASHBOARD}`;
//       case "ADVISOR":
//         return `/${ROUTES.PLAN}`;
//       default:
//         return ROUTES.PAYROLL_LINK;
//     }
//   } else return ROUTES.HOME;
// };
export const getRedirectionRoute = (userRole, planId) => {
  const tokenKey = window.localStorage.getItem(
    `${AppConfig.get("VITE_CLIENTID")}user:${AppConfig.get(
      "VITE_AUTHENTICATION_BASE_URL"
    )}:${AppConfig.get("VITE_CLIENTID")}`
  );

  if (!tokenKey) {
    return ROUTES.PAYROLL_LINK;
  }

  let profileId = get(JSON.parse(tokenKey), "profile.ProfileId");
  const userData = JSON.parse(tokenKey);
  const tenantId =
    get(userData, "profile.TenantId") || get(userData, "profile.tenantId") || 1;

  if (userRole) {
    return getHomePage(userRole, tenantId).then((response) => {
      const homePage = response;
      return `/${homePage}`;
    });
  } else {
    return ROUTES.HOME;
  }
};
export const getSaveMessage = (isEdit, createMessage) => {
  return isEdit || !createMessage ? "Data saved successfully" : createMessage;
};

export const getFilteredInvestments = ({
  list,
  selectedInvestmentSearch,
  selectedInvestmentType,
  selectedInvestmentStatus,
}) => {
  return list.filter((item) => {
    const isInvestmentNameMatching =
      toLower(item.name).indexOf(toLower(selectedInvestmentSearch)) !== -1;

    const isInvestmentTypeMatching = selectedInvestmentType === item.type;

    const isInvestmentStatusMatching = selectedInvestmentStatus === item.status;

    if (
      !selectedInvestmentSearch &&
      !selectedInvestmentType &&
      (isNaN(selectedInvestmentStatus) || selectedInvestmentStatus === "")
    ) {
      return true;
    }

    if (
      isInvestmentNameMatching &&
      isInvestmentTypeMatching &&
      isInvestmentStatusMatching
    ) {
      return true;
    }

    if (
      (isNaN(selectedInvestmentStatus) || selectedInvestmentStatus === "") &&
      isInvestmentNameMatching &&
      isInvestmentTypeMatching
    ) {
      return true;
    }

    if (
      !selectedInvestmentType &&
      isInvestmentNameMatching &&
      isInvestmentStatusMatching
    ) {
      return true;
    }

    if (
      !selectedInvestmentSearch &&
      isInvestmentTypeMatching &&
      isInvestmentStatusMatching
    ) {
      return true;
    }

    if (
      !selectedInvestmentType &&
      (isNaN(selectedInvestmentStatus) || selectedInvestmentStatus === "") &&
      isInvestmentNameMatching
    ) {
      return true;
    }

    if (
      !selectedInvestmentSearch &&
      (isNaN(selectedInvestmentStatus) || selectedInvestmentStatus === "") &&
      isInvestmentTypeMatching
    ) {
      return true;
    }

    if (
      !selectedInvestmentSearch &&
      !selectedInvestmentType &&
      isInvestmentStatusMatching
    ) {
      return true;
    }
    return false;
  });
};

export const getScrollParent = (node, selector) => {
  if (node == null) {
    if (selector) {
      return document.querySelector(selector);
    }
    return null;
  }

  if (node.scrollHeight > node.clientHeight + 3) {
    return node;
  } else {
    return getScrollParent(node.parentNode, selector);
  }
};

export const getPlanBasicDetailsHeader = (values, data) => {
  const dataArr = [];
  const fields = planFormFields[managePlanFormNames.CREATE_PLAN];
  const category = OPTIONS_DATA_MAPPER.PLAN_CATERGORY[values[fields.category]];
  const planLevel = OPTIONS_DATA_MAPPER.PLAN_LEVEL[values.level];
  const planType = OPTIONS_DATA_MAPPER.PLAN_TYPES[values[fields.planType]];
  const isMepOrPep = ["MEP", "PEP"].includes(category);
  if (category) {
    dataArr.push({
      label: "Category",
      value: category,
    });
  }

  if (["Regular"].includes(category)) {
    dataArr.push({ label: "Type", value: planType });
    dataArr.push({
      label: "Prototype",
      value: values[fields.mepPlanId] === 0 ? null : values[fields.mepPlanName],
    });
    dataArr.push({ label: "Company", value: values[fields.companyName] });
    dataArr.push({ label: "Plan Groups", value: values[fields.planGroup] });
    dataArr.push({
      label: "RecordKeeper",
      value: values[fields.recordKeeperName],
    });
  }
  if (isMepOrPep && planLevel === "Master") {
    dataArr.push({ label: "Level", value: planLevel });
    dataArr.push({ label: "Type", value: planType });
    dataArr.push({
      label: "Sponsoring Org.",
      value: values[fields.companyName],
    });
    dataArr.push({
      label: "Associated AEs",
      value: data?.adoptingEmployerPlan?.length,
    });
    dataArr.push({ label: "Plan Groups", value: values[fields.planGroup] });
    dataArr.push({
      label: "RecordKeeper",
      value: values[fields.recordKeeperName],
    });
  }

  if (isMepOrPep && planLevel !== "Master") {
    dataArr.push({ label: "Level", value: planLevel });
    dataArr.push({ label: "Master Plan", value: values[fields.mepPlanName] });
    dataArr.push({ label: "Company", value: values[fields.companyName] });
    dataArr.push({ label: "Plan Groups", value: values[fields.planGroup] });
    dataArr.push({
      label: "RecordKeeper",
      value: values[fields.recordKeeperName],
    });
  }
  if (["Prototype"].includes(category)) {
    dataArr.push({ label: "Type", value: planType });
    //dataArr.push({ label: "Plan Groups", value: values[fields.planGroup] });
  }
  return dataArr;
};
export const convertNumber = (value) => {
  if (value >= 1000000) {
    return parseInt(value / 1000000) + "M" + (value % 1000000 ? "+" : "");
  } else if (value >= 1000) {
    return parseInt(value / 1000) + "K" + (value % 1000 ? "+" : "");
  } else return value;
};
export const getFormattedSsn = (ssn = "") => {
  const isHyphenatedSSN = JSON.parse(
    localStorage.getItem("IsHyphenatedSSN") || "false"
  );

  if (!ssn || !isHyphenatedSSN) {
    return ssn;
  }

  const digits = ssn.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
};
export const getNumber = (value) => {
  return value === 0 ? value : value || undefined;
};

// Treats null/undefined/"" (an empty compensation field) as 0.
export const toCompensationAmount = (amount) => {
  if (amount === null || amount === undefined || amount === "") return 0;
  const parsed = Number(amount);
  return isNaN(parsed) ? 0 : parsed;
};

// Parses a compensation input change. A cleared input ("" or "-") is stored as
// null but counts as 0 for the diff, so the previous amount is backed out of
// the totals. Returns null for incomplete input ("-2.", "abc") that should not
// update anything yet.
export const getCompensationInputChange = (rawValue, previousAmount) => {
  const isCleared = rawValue === "" || rawValue === "-";
  if (!isCleared && rawValue.endsWith(".")) return null;

  const current = isCleared ? 0 : parseFloat(rawValue);
  if (isNaN(current)) return null;

  return {
    value: isCleared ? null : current,
    diff: current - toCompensationAmount(previousAmount),
  };
};
export const getFormattedPhone = (value, maxDigits = 10) => {
  let val = (value || "").replace(/\D/g, "").slice(0, maxDigits);
  val = val.replace(/^(\d{3})(\d{1})/, "$1-$2");
  val = val.replace(/(\d)-(\d{3})(\d{1})/, "$1-$2-$3");
  val = val.replace(/(\d)-(\d)-(\d{4}).*/, "$1-$2-$3");
  return val;
};

export const getFormattedAlphaNumeric = (value) => {
  let val = (value || "").replace(/[^a-zA-Z0-9]/g, "");

  return val;
};

export const getFormattedAlphaNumericWithSpace = (value) => {
  let val = (value || "").replace(/[^a-zA-Z0-9 ]/g, "");
  return val;
};

export const getFormattedSerialNumber = (value) => {
  let val = (value || "").replace(/[^a-zA-Z0-9]/g, "");
  val = val.replace(/^([a-zA-Z0-9]{14})([a-zA-Z0-9]{1})/, "$1-$2");
  val = val.replace(/([a-zA-Z0-9])-(\w{1})([a-zA-Z0-9]{1})/, "$1-$2-$3");
  val = val.replace(/([a-zA-Z0-9])-(\w)-([a-zA-Z0-9]{3}).*/, "$1-$2-$3");
  return val;
};

export const getFormattedZip = (value) => {
  let val = (value || "")?.replace(/\D/g, "");
  val = val?.replace(/^(\d{5})(\d{1})/, "$1-$2");
  val = val?.replace(/(\d)-(\d{4}).*/, "$1-$2");
  return val;
};

export const getAlternatePayeeFullName = ({
  firstName,
  middleName,
  lastName,
} = {}) => {
  const first = (firstName || "").trim();
  const middle = (middleName || "").trim();
  let last = (lastName || "").trim();
  if (!middle && last && last === first) last = "";
  if (middle && last.startsWith(`${middle} `)) {
    last = last.slice(middle.length + 1);
  }
  return [first, middle, last].filter(Boolean).join(" ");
};
export const getFormattedPostalCode = (value) => {
  let val = (value || "")?.replace(/\D/g, "");
  val = val?.replace(/^(\d{5})(\d{1})/, "$1-$2");
  val = val?.replace(/(\d)-(\d{5}).*/, "$1-$2");
  return val;
};

export const getFormattedTaxEIN = (value) => {
  let val = (value || "").replace(/\D/g, "");
  val = val.replace(/^(\d{2})(\d{1})/, "$1-$2");
  val = val.replace(/(\d)-(\d{7}).*/, "$1-$2");
  return val;
};

export const transformMasterDataInfo = (list = []) => {
  return list.map((item) => ({
    ...item,
    email: get(item, "contactDetails.email"),
    phoneNumber:
      get(item, "contactDetails.mobilePhoneNumber") ||
      get(item, "contactDetails.workPhoneNumber"),
  }));
};

export const contextSharing = {
  setContext: (contextId, context = {}) => {
    sessionStorage.setItem(contextId, JSON.stringify(context));
  },
  getContext: (contextId) => {
    return JSON.parse(sessionStorage.getItem(contextId));
  },
  clearContext: (contextId) => {
    sessionStorage.removeItem(contextId);
  },
};

export const transformToMultiselectSave = (list, key) => {
  return (list || []).map((value) => ({
    id: 0,
    [key]: value,
    isDeleted: false,
  }));
};
export const transformToMultiselectloanSave = (list, changedList, key) => {
  return changedList
    .filter((val) => !(list || []).some((item) => item === val[key]))
    .map((val) => ({
      id: 0,
      [key]: val[key],
      isDeleted: false,
    }));
};
export const synchronizeCollection = (list, changedList, key) => {
  return list.map((val) => {
    if ((changedList || []).includes(val[key])) {
      return val;
    }
    return { ...val, isDeleted: true };
  });
};
export const synchronizeCollectionPlanGroups = (list, changedList, key) => {
  let newList = [];
  newList = list.map((val) => {
    if ((changedList || []).map((_) => _[key]).includes(val[key])) {
      return val;
    }
    return { ...val, isDeleted: true };
  });
  newList = [
    ...newList,
    ...(changedList ?? []).filter(
      (_) => !newList.map((x) => x[key]).includes(_[key])
    ),
  ];
  return newList;
};
export const synchronizeCollectionNew = (list = [], changedList = [], key) => {
  let newList = [];

  newList = [
    ...changedList,
    ...(list ?? [])
      .filter((_) => !changedList.map((x) => x[key]).includes(_[key]))
      .map((_) => ({ ..._, isDeleted: true })),
  ];
  return newList;
};
export const synchronizeCollectionWithId = (
  list = [],
  changedList = [],
  key = "id"
) => {
  const listMap = new Map(list.map((item) => [item[key], item]));

  const updatedChangedList = changedList.map((item) => {
    const existingItem = listMap.get(item[key]);
    if (!item.id && existingItem?.id) {
      return { ...item, id: existingItem.id };
    }
    return item;
  });

  const deletedItems = list
    .filter(
      (item) => !changedList.some((changed) => changed[key] === item[key])
    )
    .map((item) => ({ ...item, isDeleted: true }));

  return [...updatedChangedList, ...deletedItems];
};

export const synchronizeCollectionTenantNew = (list, changedList, key) => {
  let newList = [];

  newList = [
    ...changedList,
    ...(list ?? [])
      .filter((_) => !changedList.map((x) => x[key]).includes(_[key]))
      .map((_) => ({ ..._, IsDeleted: true })),
  ];
  return newList;
};

export const replaceSpaceAndParseInt = (str = "") => {
  return parseInt(str.replace(/\s/g, ""), 10);
};

export const payrollFrequencyMapper = (val) => {
  {
    return payrollFrequency.data
      .find((_) => _.value == val)
      ?.label.replace("-", "");
  }
};
export const toFlowLayoutHeader = (header, flow) => {
  if (FLOW_TYPES.EDIT === flow) {
    return (header || "").replace(/add/gi, "");
  }
  return header;
};

export const toCurrency = (num = 0) => {
  return num.toLocaleString();
};

export const usCurrency = (num = 0) => {
  num = num === null || num === undefined || Math.abs(num) < 0.005 ? 0 : num;
  return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export const pluraliser = (count, prefix = "", label, sufix = "") => {
  let tempLabel = count === 1 ? label : label + "s";
  tempLabel = `${recordCount(count)} ${prefix} ${tempLabel} ${sufix}`;
  return tempLabel;
};

export const sortArrayOfObjects = (data, key, order, dataType) => {
  return data.sort((x, y) => {
    let val1 = get(x, key);
    let val2 = get(y, key);
    if (dataType === "dateTime") {
      val1 = moment(val1);
      val2 = moment(val2);
    }

    if (order == "asc") {
      return val1 > val2 ? 1 : val1 < val2 ? -1 : 0;
    } else {
      return val1 < val2 ? 1 : val1 > val2 ? -1 : 0;
    }
  });
};
export const handleApiErrors = (response, formikRef) => {
  if (response.errorMessages) {
    response.errorMessages.forEach((error) => {
      formikRef.current.setFieldTouched(error.controlName, true);
      formikRef.current.setFieldError(
        error.controlName,
        `${error.errorCode} : ${error.message}`
      );
    });
  }
};

export const scrollToErrorControl = (name) => {
  const elem = document.querySelector(`[name="${name}"]`);
  if (elem) {
    elem.scrollIntoView({ block: "center", behavior: "smooth" });
  }
};

export const getCurrentDateInDDMMYYYY = (addDaysToCurrent) => {
  var today = new Date();
  if (addDaysToCurrent == 0) today.setDate(today.getDate());
  else today.setDate(today.getDate() + addDaysToCurrent);
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return today;
};

export const PAYMENTS_PER_YEAR = {
  Daily: 365,
  Weekly: 52,
  BiWeekly: 26,
  SemiMonthly: 24,
  Monthly: 12,
  Quarterly: 4,
  SemiAnnual: 2,
  Annual: 1,
};

export const periodsToMonths = (periods, frequency) => {
  const paymentsPerYear = PAYMENTS_PER_YEAR[frequency];
  return (periods * 12) / paymentsPerYear;
};

export const roundMonths = (totalMonths, frequency) => {
  switch (frequency) {
    case "Daily":
    case "Weekly":
    case "BiWeekly":
    case "Monthly":
      return Math.ceil(totalMonths);

    case "Quarterly":
      return Math.ceil(totalMonths / 3) * 3;

    case "SemiMonthly":
      return Math.floor(totalMonths);

    case "SemiAnnual":
      return Math.floor(totalMonths / 6) * 6;

    case "Annual":
      return Math.floor(totalMonths / 12) * 12;

    default:
      return Math.ceil(totalMonths);
  }
};

export const splitYearsAndMonths = (totalMonths) => {
  const roundedMonths = Math.ceil(totalMonths);
  const years = Math.floor(roundedMonths / 12);
  const months = roundedMonths % 12;
  return { years, months };
};

export const getTenure = (
  loanAmount,
  periodicPayment,
  interestRate,
  frequency
) => {
  const r = getInterestRateForFrequency(interestRate, frequency);

  // Zero-interest handling
  if (r === 0) {
    return loanAmount / periodicPayment;
  }

  return (
    Math.log(periodicPayment / (periodicPayment - r * loanAmount)) /
    Math.log(1 + r)
  );
};

export const getInterestRateForFrequency = (interestRate, frequency) => {
  if (frequency == "Annual") frequency = "Annually";
  if (frequency == "SemiAnnual") frequency = "SemiAnnually";

  switch (frequency) {
    case "Daily":
      return interestRate / 36500;
    case "BiWeekly":
      return (interestRate / 36500) * 14;
    case "SemiMonthly":
      return interestRate / 2400;
    case "Monthly":
      return interestRate / 1200;
    case "Quarterly":
      return interestRate / 400;
    case "SemiAnnually":
      return interestRate / 200;
    case "Annually":
      return interestRate / 100;
    case "Weekly":
      return (interestRate / 36500) * 7;
    default:
      return interestRate / 1200;
  }
};

export const calculateTotalNoOfInstallments = (
  frequency,
  tenureYears,
  tenureMonths
) => {
  if (frequency == "Annual") frequency = "Annually";
  if (frequency == "SemiAnnual") frequency = "SemiAnnually";

  switch (frequency) {
    case "Daily":
      return (tenureYears + tenureMonths / 12) * 365;
    case "Weekly":
      return ((tenureYears + tenureMonths / 12) * 365) / 7;
    case "BiWeekly":
      return ((tenureYears + tenureMonths / 12) * 365) / 14;
    case "SemiMonthly":
      return (tenureYears * 12 + tenureMonths) * 2;
    case "Monthly":
      return tenureYears * 12 + tenureMonths;
    case "Quarterly":
      return tenureYears * 4 + Math.floor(tenureMonths / 3);
    case "SemiAnnually":
      return tenureYears * 2 + tenureMonths / 6;
    case "Annually":
      return tenureYears + tenureMonths / 12;
    default:
      return tenureYears * 12 + tenureMonths;
  }
};

export const getPeriodicPayment = (
  loanAmount,
  noOfYears,
  noOfMonths,
  interestRate,
  frequency
) => {
  const noOfInstallments = Math.round(
    calculateTotalNoOfInstallments(frequency, noOfYears ?? 0, noOfMonths ?? 0)
  );

  const interestRateForFrequency = getInterestRateForFrequency(
    interestRate,
    frequency
  );

  return Number(
    (
      loanAmount *
      (interestRateForFrequency /
        (1 - Math.pow(1 + interestRateForFrequency, -noOfInstallments)))
    ).toFixed(2)
  );
  // return Math.floor(Math.random() * 100) + 1;
};

export const getPeriodicPaymentWithNoOfInstallmentsGiven = (
  loanAmount,
  noOfInstallments,
  interestRate,
  frequency
) => {
  const interestRateForFrequency = getInterestRateForFrequency(
    interestRate,
    frequency
  );

  return Number(
    (
      loanAmount *
      (interestRateForFrequency /
        (1 - Math.pow(1 + interestRateForFrequency, -noOfInstallments)))
    ).toFixed(2)
  );
  // return Math.floor(Math.random() * 100) + 1;
};

export const momentDateFormat = (date) => {
  return moment(date).format("MM/DD/YYYY");
};

export const hyphenatedSSN = (ssn = "") => {
  const isHyphenatedSSN = JSON.parse(
    localStorage.getItem("IsHyphenatedSSN") || "false"
  );

  if (!ssn || !isHyphenatedSSN) {
    return ssn;
  }

  const digits = ssn.replace(/\D/g, "");

  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};
export const ssnMasking = (ssn = "") => {
  return ssn?.length == 0 || ssn == null
    ? null
    : ssn?.replaceAll("-", "").length < 9
    ? ssn
    : `XXX-XX-${ssn.slice(-4)} `;
};

export const ssnMaskingAdjust = (ssn = "") => {
  return ssn?.length == 0 || ssn == null
    ? null
    : ssn?.replaceAll("-", "").length < 9
    ? ssn
    : `${ssn.substring(0, 3)}-${ssn.substring(3, 5)}-XXXX `;
};

export const ssnMaskingWithOutHyphen = (ssn = "") => {
  const ssnStr = String(ssn);
  return ssnStr?.length == 0 || ssnStr == null
    ? null
    : `XXX-XX-${ssnStr.slice(-4)}`;
};

export const getParamsFromQueryString = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return (urlParams && urlParams.get(param)) || "";
};

export const stripHyphenForApi = (value = "") => {
  const str = value.toString().trim();

  if (!str) return "";

  if (/[a-zA-Z]/.test(str)) {
    return str.replace(/-/g, "");
  }

  return str.replace(/\D/g, "");
};

export function numberWithCommas(x) {
  return x.toLocaleString("en");
}

export const convertPasaclToSentenceCase = (str) => {
  return upperFirst(lowerCase(str));
};

export const toMultiSelectValue = (selectedValues = [], options) => {
  if (isEmpty(selectedValues)) {
    return "";
  } else if (selectedValues.length > 1) {
    return `${selectedValues.length} Selected`;
  } else if (selectedValues.length === 1) {
    const result = options.filter((option) => option.id === selectedValues[0]);
    return result.length > 0 ? result[0].name : "";
  }
};

export const getNullDataTableItem = (data) => {
  return !["", null, undefined].includes(data) ? data : <span>-</span>;
};

export const getLocalDateTime = (
  date,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) => {
  var localDate = new Date(date);
  localDate.setHours(hours, minutes, seconds, milliseconds);
  return localDate;
};

export const getUTCDateTime = (
  date,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) => {
  var utcDate = moment.utc([
    Number(date.slice(0, 4)),
    Number(date.slice(5, 7)) - 1,
    Number(date.slice(8, 10)),
    hours,
    minutes,
    seconds,
    milliseconds,
  ]);
  return utcDate;
};

export function convertDateToUTCParts(date, isEndOfDay = false) {
  const localDate = new Date(date);
  const year = localDate.getFullYear();
  const month = localDate.getMonth();
  const day = localDate.getDate();
  const d = new Date(
    year,
    month,
    day,
    isEndOfDay ? 23 : 0,
    isEndOfDay ? 59 : 0,
    isEndOfDay ? 59 : 0,
    isEndOfDay ? 999 : 0
  );
  const utcString = d.toISOString();
  const [utcDate, utcTime] = utcString.split("T");
  const formattedTime = utcTime.substring(0, 8);
  return { utcDate, formattedTime };
}

export const toMultiSelectValueById = (
  selectedValues = [],
  options = [],
  isArrayOfObjects,
  objectKey,
  formTypeOptionList = false
) => {
  const values = Array.isArray(selectedValues)
    ? selectedValues
    : [selectedValues].filter((_) => _ !== undefined && _ !== null);
  const totalSelected = values.length;
  const disabledCount = formTypeOptionList
    ? formTypeOptionList?.filter((item) => item.disabled)?.length
    : 0;
  const totalCount = totalSelected + disabledCount;

  if (isEmpty(values) && disabledCount === 0) {
    return "";
  } else if (totalCount > 1) {
    return `${totalCount} Selected`;
  } else if (totalCount === 1) {
    const selectedValue = values[0];
    const selectedKey = isArrayOfObjects
      ? selectedValue?.[objectKey]
      : selectedValue;

    const result = options.find((option) => option.value === selectedKey);
    const disabledResult = formTypeOptionList
      ? formTypeOptionList?.find((item) => item.disabled)?.label
      : "";
    const selectedLabel =
      selectedValue?.label || selectedValue?.name || selectedValue?.title || "";

    return result?.label || disabledResult || selectedLabel || "";
  }
};
export const List = [
  {
    label: "Trade",
    value: 0,
  },
];

export const subList = [
  {
    label: "Price File",
    value: 3,
    fileType: 1,
  },
  {
    label: "Daily Accrual Rate",
    value: 8,
    fileType: 1,
  },
  {
    label: "Trade Order",
    value: 1,
    fileType: 1,
  },
  {
    label: "Internal Position File",
    value: 12,
    fileType: 1,
  },
  {
    label: "Network Dividend",
    value: 10,
    fileType: 1,
  },
  {
    label: "PCRA Account Opening Response",
    value: 21,
    fileType: 1,
  },
  {
    label: "PCRA Cashering Response File",
    value: 23,
    fileType: 1,
  },
  {
    label: "Network Activity",
    value: 14,
    fileType: 1,
  },
  {
    label: "Detail Net Cash Activity",
    value: 27,
    fileType: 1,
  },
  {
    label: "Security Master Daily",
    value: 32,
    fileType: 1,
  },
  {
    label: "Trade Order Fund Acknowledgement",
    value: 18,
    fileType: 1,
  },
  {
    label: "Account Conversion",
    value: 31,
    fileType: 1,
  },
  {
    label: "Trade Order",
    value: 1,
    fileType: 2,
  },
  {
    label: "PCRA Cashering File",
    value: 22,
    fileType: 2,
  },
  {
    label: "Client Partner Holding",
    value: 7,
    fileType: 2,
  },
];

export const FileType = [
  {
    label: "Input",
    value: 1,
  },
  {
    label: "Output",
    value: 2,
  },
];
export const toMultiSelectValueByFileStatus = (
  selectedValues = [],
  options,
  pipelinedata = false
) => {
  if (isEmpty(selectedValues)) {
    return "";
  } else if (selectedValues.length > 1) {
    return pipelinedata
      ? `${selectedValues.length} Modules`
      : `${selectedValues.length} Status`;
  } else if (selectedValues.length === 1) {
    return selectedValues[0];
  }
};

export const splitParams = (input) => {
  let nParens = 0;
  let nBrackets = 0;
  let inQuote = false;

  let start = 0;
  let result = [];

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (ch === "'") {
      inQuote = !inQuote;
      continue;
    }

    if (!inQuote) {
      switch (ch) {
        case "(":
          nParens++;
          break;
        case ")":
          nParens--;
          // if (nParens < 0) throw "Unbalanced parenthesis at offset #" + i;
          break;

        case "[":
          nBrackets++;
          break;

        case "]":
          nBrackets--;
          break;

        case ",":
          if (nParens === 0 && nBrackets === 0) {
            result.push(input.substring(start, i));
            start = i + 1;
          }
          break;
      }
    }
  }
  //if (nParens > 0) throw "Missing closing parenthesis";
  result.push(input.substring(start));
  return result;
};

export const toSentenceCase = (str) => upperFirst(toLower(str));

export const formatDateForApiRequest = (date) => {
  let date_array = date.replaceAll("/", "-").split("-").reverse();
  return `${date_array[0]}-${date_array[2]}-${date_array[1]}`;
};

export const dateTimeFormat = (date) => {
  return moment(date).format("MM/DD/YY HH:mm");
};

export const dateTimeFormatTrade = (date) => {
  return moment(date).format("MM/DD/YYYY HH:mm");
};

export const getMultiSelectListFromValue = (val, lastIndex) => {
  let result = [];
  for (let i = 1; i <= lastIndex; i++) {
    if ((i & val) === i) {
      result.push(i);
    }
  }
  return result;
};

export const getKeyUsingValue = (object, value) => {
  for (var key in Object.keys(object)) {
    if (object[key] === value) {
      return key;
    }
  }
  return undefined;
};

export const getTenantLabel = (label) => {
  const data = { planGroupName: "Plan Group", description: "Description" };
  return data[label];
};

export const getTwoDecimalPlaces = (value) => {
  if (value !== null || undefined) return parseFloat(value).toFixed(2);
  return null;
};

export const getKeyByValue = (obj, val) => {
  return Object.keys(obj).find((key) => obj[key] === val);
};

export const getRepaymentStartDateForFirstRepaymentDate = (
  frequency,
  repaymentStartDate,
  date
) => {
  if (frequency == "Annual") frequency = "Annually";
  if (frequency == "SemiAnnual") frequency = "SemiAnnually";

  switch (frequency) {
    case "Daily":
      return repaymentStartDate.clone().add(-1, "days") > date
        ? repaymentStartDate.clone().add(-1, "days")
        : date;
    case "Weekly":
      return repaymentStartDate.clone().add(-7, "days") > date
        ? repaymentStartDate.clone().add(-7, "days")
        : date;
    case "BiWeekly":
      return repaymentStartDate.clone().add(-14, "days") > date
        ? repaymentStartDate.clone().add(-14, "days")
        : date;
    case "SemiMonthly":
      return repaymentStartDate.clone().add(-15, "days") > date
        ? repaymentStartDate.clone().add(-15, "days")
        : date;
    case "Monthly":
      return repaymentStartDate.clone().add(-1, "months") > date
        ? repaymentStartDate.clone().add(-1, "months")
        : date;
    case "Quarterly":
      return repaymentStartDate.clone().add(-3, "months") > date
        ? repaymentStartDate.clone().add(-3, "months")
        : date;
    case "SemiAnnually":
      return repaymentStartDate.clone().add(-6, "months") > date
        ? repaymentStartDate.clone().add(-6, "months")
        : date;
    case "Annually":
      return repaymentStartDate.clone().add(-1, "years") > date
        ? repaymentStartDate.clone().add(-1, "years")
        : date;
    default:
      break;
  }
};

export const getNextDateForFrequency = (frequency, date) => {
  if (frequency == "Annual") frequency = "Annually";
  if (frequency == "SemiAnnual") frequency = "SemiAnnually";

  switch (frequency) {
    case "Daily":
      return date.clone().add(1, "days");
    case "Weekly":
      return date.clone().add(7, "days");
    case "SemiMonthly":
      return date.clone().add(15, "days");
    case "Monthly":
      return date.clone().add(1, "months");
    case "Quarterly":
      return date.clone().add(3, "months");
    case "SemiAnnually":
      return date.clone().add(6, "months");
    case "Annually":
      return date.clone().add(1, "years");
    case "BiWeekly":
      return date.clone().add(14, "days");

    default:
      return;
  }
};

export const CalculateNumberOfInstallments = (z) => {
  if (z["frequency"] == "Annual") z["frequency"] = "Annually";
  if (z["frequency"] == "SemiAnnual") z["frequency"] = "SemiAnnually";

  // 1: "Daily", 2: "Weekly", 3: "SemiMonthly", 4: "Monthly", 5: "Quarterly", 6: "SemiAnnually", 7: "Annually", 8: "BiWeekly",
  switch (z["frequency"]) {
    case "Daily":
      return z["tenureYears"] + z["tenureMonths"] / 12;
    case "Weekly":
      return (z["tenureYears"] + (z["tenureMonths"] / 12) * 365) / 7;
    case "SemiMonthly":
      return (z["tenureYears"] * 12 + z["tenureMonths"]) * 2;
    case "Monthly":
      return z["tenureYears"] * 12 + z["tenureMonths"];
    case "Quarterly":
      return (z["tenureYears"] + z["tenureMonths"] / 12) * 4;
    case "SemiAnnually":
      return (z["tenureYears"] + z["tenureMonths"] / 12) * 2;
    case "Annually":
      return z["tenureYears"] + z["tenureMonths"] / 12;
    case "BiWeekly":
      return ((z["tenureYears"] + z["tenureMonths"] / 12) * 365) / 14;
    default:
      break;
  }
};

export const validateValue = (val) => {
  return ["", null, Infinity, NaN].includes(val);
};
export const getFrequencyName = (frequency) => {
  switch (frequency) {
    case 1:
      return "Daily";
    case 2:
      return "Weekly";
    case 3:
      return "SemiMonthly";
    case 4:
      return "Monthly";
    case 5:
      return "Quarterly";
    case 6:
      return "SemiAnnually";
    case 7:
      return "Annually";
    case 8:
      return "BiWeekly";
    default:
      return "";
  }
};
export const getFrequencyEnum = (frequencyType) => {
  switch (frequencyType) {
    case "Daily":
      return 1;
    case "Weekly":
      return 2;
    case "SemiMonthly":
      return 3;
    case "Monthly":
      return 4;
    case "Quarterly":
      return 5;
    case "SemiAnnually":
      return 6;
    case "Annually":
      return 7;
    case "BiWeekly":
      return 8;
    default:
      return null;
  }
};
export const CalculateAmortizationSchedule = (
  data,
  noOfInstallments = 0,
  tenureFallsBeforeCurrentDate = false
) => {
  const normalizeFrequency = (frequencyInput) => {
    if ([null, undefined, ""].includes(frequencyInput)) {
      return null;
    }

    if (typeof frequencyInput === "number") {
      return getFrequencyName(frequencyInput) || null;
    }

    if (typeof frequencyInput !== "string") {
      return null;
    }

    const normalized = frequencyInput.toLowerCase().replace(/[-\s_]/g, "");
    const frequencyMap = {
      daily: "Daily",
      weekly: "Weekly",
      biweekly: "BiWeekly",
      semimonthly: "SemiMonthly",
      monthly: "Monthly",
      quarterly: "Quarterly",
      semiannually: "SemiAnnually",
      semiannual: "SemiAnnually",
      annually: "Annually",
      annual: "Annually",
    };

    return frequencyMap[normalized] || null;
  };

  if (
    validateValue(data["frequency"]) ||
    validateValue(data["loanRequestAmout"]) ||
    validateValue(data["tenureYears"]) ||
    validateValue(data["tenureMonths"]) ||
    validateValue(data["interest"]) ||
    validateValue(data["periodicPayment"]) ||
    validateValue(data["firstRepaymentDate"])
  )
    return [];

  var firstRepaymentDate = moment(data["firstRepaymentDate"]);
  if (!firstRepaymentDate.isValid()) {
    return [];
  }

  const noOfYears = data["tenureYears"];
  const noOfMonths = data["tenureMonths"];
  const P = get(data, "loanRequestAmout");
  const rateOfInterest = get(data, "interest"); //send as number
  const periodicPayment = get(data, "periodicPayment");
  const frequency = normalizeFrequency(data["frequency"]);
  if (!frequency) {
    return [];
  }

  const dailyInterest = rateOfInterest / 36500;
  var numberOfInstallments =
    tenureFallsBeforeCurrentDate && noOfInstallments === 0
      ? 0
      : !tenureFallsBeforeCurrentDate && noOfInstallments === 0
      ? Math.round(
          calculateTotalNoOfInstallments(frequency, noOfYears, noOfMonths)
        )
      : noOfInstallments;

  var interestEffectiveDate = getRepaymentStartDateForFirstRepaymentDate(
    frequency,
    firstRepaymentDate.startOf("day"),
    moment(new Date()).startOf("day")
  );

  var installmentCount = numberOfInstallments;
  var balancePrincipal = P;
  var installmentnumber = 1;
  var schedule = [];
  while (installmentCount > 0) {
    var interest =
      balancePrincipal *
      firstRepaymentDate.diff(interestEffectiveDate, "days", true) *
      dailyInterest;
    const dailyPayment =
      installmentCount !== 1
        ? periodicPayment
        : balancePrincipal *
          (1 +
            firstRepaymentDate.diff(interestEffectiveDate, "days", true) *
              dailyInterest);
    var x = {
      installmentCount: installmentnumber,
      payment: dailyPayment?.toFixed(2),
      interest: interest?.toFixed(2),
      principal: (dailyPayment - interest)?.toFixed(2),
      firstRepaymentDate: firstRepaymentDate,
    };
    interestEffectiveDate = firstRepaymentDate.clone();
    const nextRepaymentDate = getNextDateForFrequency(
      frequency,
      firstRepaymentDate
    );
    if (!nextRepaymentDate || !nextRepaymentDate.isValid()) {
      return [];
    }
    firstRepaymentDate = nextRepaymentDate;
    balancePrincipal = balancePrincipal - x["principal"];
    x["balancePrincipal"] =
      balancePrincipal < 0 ? (0).toFixed(2) : balancePrincipal.toFixed(2);
    schedule.push(x);
    installmentnumber++;
    installmentCount--;
  }
  return schedule;
};

export const translateLoan = (loans, censusId, onLoanDeleteClick) => {
  return loans.map((loan) => {
    return {
      transaction: "Loan",
      amount: loan.loanAmount,
      status: loan.loanStatus,
      dateOfRequest: loan.loanRequestDate,
      requestName: loan.requestType,
      raisedBy: loan.raisedBy,
      type: loan.loanType ?? "-",
      loanId: loan.id,
      businessKey: loan.businessKey,
      nextRepaymentDate: loan.nextPaymentDate,
      lastPaidDate: loan.lastPaidDate ?? loan.nextPaymentDate,
      loanAmount: loan?.loanAmount,
      repaidAmount: loan?.loanAmount - loan?.outstandingBalance ?? 0,
      outstandingBalance: loan.outstandingBalance ?? 0,
      outstandingBalanceWithInterest: loan.outstandingBalanceWithInterest ?? 0,
      onDeleteClick: () => onLoanDeleteClick(loan.id),
      path:
        loan.loanStatus == "InProgress"
          ? ROUTES.LOAN_REQUEST_LINK
          : ROUTES.LOAN_SUMMARY_LINK,
      pathParam: [FLOW_TYPES.EDIT, censusId, loan.id],
      notes: loan.notes,
      id: loan.id,
      entityType: "Loan",
    };
  });
};

export const translateRolloverIn = (
  rolloverInData,
  censusId,
  onRollOverInDeleteClick
) => {
  const normalizedStatus = startCase(lowerCase(rolloverInData.status));
  return {
    ...rolloverInData,
    status: normalizedStatus,
    transaction: "RolloverIn",
    amount: rolloverInData.rolloverAmount,
    dateOfRequest: rolloverInData.requestedDate,
    requestName: rolloverInData.transactionType,
    entityType: "RollOverIn",
    onDeleteClick: () => onRollOverInDeleteClick(rolloverInData.id),
    path:
      normalizedStatus === "Request In Progress"
        ? MANAGE_CENSUS_ROUTES.ROLLOVER_REQUEST_LINK
        : MANAGE_CENSUS_ROUTES.ROLLOVER_SUMMARY_LINK,
    pathParam: [FLOW_TYPES.EDIT, censusId, rolloverInData?.id, 2],
    id: rolloverInData.id,
    entityType: "RollOverIn",
    notes: rolloverInData.notes,
    transactionkey: rolloverInData.transactionKey,
  };
};
const getWithdrawalDescription = (withdrawal) => {
  if (withdrawal.withdrawalDescription) return withdrawal.withdrawalDescription;
  let hardshipReason = get(
    OPTIONS_DATA_MAPPER.DISTRIBUTIONS_HARDSHIP_REASONS,
    withdrawal.hardshipReason
  );
  if (withdrawal.hardshipReason === 9)
    hardshipReason = `${hardshipReason} - ${withdrawal.otherHardshipReason}`;
  return hardshipReason;
};
export const translateWithdrawal = (
  withdrawals,
  censusId,
  onWithdrawalDeleteClick
) => {
  return withdrawals.map((withdrawal) => {
    return {
      requestName: "Withdrawal",
      amount: withdrawal.requestedAmount,
      status: getWithdrawalStatus(withdrawal.withdrawalStatus),
      dateOfRequest: usDateFormat(withdrawal.createdOn),
      raisedBy: getUserRole(withdrawal.roleId),
      type: getWithdrawalDescription(withdrawal),
      onDeleteClick: () => onWithdrawalDeleteClick(withdrawal?.id),
      path:
        withdrawal.withdrawalStatus == 1
          ? MANAGE_DISTRIBUTION_ROUTES.WITHDRAWAL_REQUEST_LINK
          : MANAGE_DISTRIBUTION_ROUTES.WITHDRAWAL_SUMMARY_LINK,
      pathParam:
        withdrawal.withdrawalStatus == 1
          ? [FLOW_TYPES.EDIT, censusId, withdrawal?.id, 3]
          : [
              FLOW_TYPES.EDIT,
              censusId,
              withdrawal?.id,
              3,
              withdrawal?.withdrawalStatus,
              withdrawal?.transactionKey,
            ],
      transaction: "Withdrawal",
      withdrawalType: withdrawal.withdrawalType,
      id: withdrawal.id,
      entityType: "WithdrawalRequest",
      notes: withdrawal.notes,
      transactionKey: withdrawal.transactionKey,
    };
  });
};

export const translateRebalance = (
  rebalanceData,
  censusId,
  onRebalanceDeleteClick
) => {
  return rebalanceData.map((rebalance) => {
    return {
      requestName: "rebalance",
      status: getRebalanceStatus(rebalance.rebalanceStatus),
      dateOfRequest: usDateFormat(rebalance.dateOfRequest),
      raisedBy:
        rebalance.isAutoRebalance == true && rebalance.roleId === 0
          ? "System Generated"
          : getUserRole(rebalance.roleId),
      type: rebalance.requestType,
      onDeleteClick: () => onRebalanceDeleteClick(rebalance?.id),
      path:
        rebalance.rebalanceStatus == 1
          ? MANAGE_TRANSFER_ROUTES.REBALANCE_REQUEST_LINK
          : MANAGE_TRANSFER_ROUTES.REBALANCE_SUMMARY_LINK,
      pathParam: [FLOW_TYPES.EDIT, censusId, rebalance?.id, 3],
      transaction: "rebalance",
      id: rebalance.id,
      entityType: "RebalanceDetails",
      notes: rebalance.notes,
    };
  });
};

export const translateTransfer = (
  transferData,
  censusId,
  onTransferDeleteClick
) => {
  return transferData.map((transfer) => {
    return {
      requestName: "transfer",
      status: getRebalanceStatus(transfer.transferStatus),
      dateOfRequest: usDateFormat(transfer.dateOfRequest),
      raisedBy: getUserRole(transfer.roleId),
      type: transfer.requestType,
      amount: transfer.totalAmount,
      onDeleteClick: () => onTransferDeleteClick(transfer?.id),
      path:
        transfer.transferStatus == 1
          ? MANAGE_CENSUS_ROUTES.TRANSFER_REQUEST_LINK
          : `/${ROUTES.TRANSACTION_MAINTENANCE}/${MANAGE_TRANSACTION_MAINTENANCE_ROUTES.TRANSFER}`,
      pathParam:
        transfer.transferStatus == 1
          ? [FLOW_TYPES.EDIT, censusId, transfer?.id]
          : [
              // employeeId (censusId), planId, transferRequestId, referenceKey
              censusId,
              transfer?.planId ?? 0,
              transfer?.id,
              transfer?.transactionKey,
              "census",
            ],
      transaction: "transfer",
      id: transfer.id,
      entityType: "TransferDetails",
      notes: transfer.notes,
    };
  });
};

export const translateInPlanRothConversion = (
  inPlanRothConversionData,
  censusId
) => {
  return inPlanRothConversionData.map((planRoth) => {
    return {
      requestName: "inPlanRothConversion",
      status: getInPlanRothConversionStatus(planRoth.status),
      dateOfRequest: usDateFormat(planRoth.dateOfRequest),
      raisedBy: getUserRole(planRoth.roleId),
      type: "In-Plan Roth Conversion",
      amount: planRoth.totalAmount,
      onDeleteClick: () => {},
      path: `/${ROUTES.MANAGE_CENSUS}/${MANAGE_TRANSACTION_ROUTES.PENDINGINPLANROTHAPPROVAL}`,
      pathParam: [FLOW_TYPES.VIEW, censusId, planRoth?.id, "census"],
      transaction: "inPlanRothConversion",
      id: planRoth.id,
      entityType: "InPlanRothConversion",
      notes: planRoth.notes,
    };
  });
};
export const translateLoanRepayment = (
  loanRepaymentData,
  censusId,
  onDeleteClick
) => {
  return loanRepaymentData.map((loanRepayment) => ({
    requestName: "loanRepayment",
    status: loanRepayment.status,
    dateOfRequest: usDateFormat(loanRepayment.requestDate),
    raisedBy: loanRepayment.raisedBy,
    type: "LoanRepayment",
    amount: loanRepayment.repaymentAmount,
    onDeleteClick: () => onDeleteClick(loanRepayment.id),
    path: MANAGE_DISTRIBUTION_ROUTES.LOAN_REPAYMENT_SUMMARY_LINK,
    pathParam: [FLOW_TYPES.EDIT, censusId, loanRepayment.id],
    transaction: "loanRepayment",
    id: loanRepayment.id,
    entityType: "LoanRepayment",
    notes: loanRepayment.notes,
  }));
};

const calculateAllocationPercentage = (amt, totalAmt) => {
  return totalAmt !== 0 ? (amt / totalAmt) * 100 : 0;
};

const groupInvestments = (arr, inv) => {
  return inv.reduce((res, value) => {
    if (!res[value.modelPortfolioId]) {
      res[value.modelPortfolioId] = {};
    }
    const portfolioGroup = res[value.modelPortfolioId];
    if (
      !portfolioGroup[value.investmentId] ||
      portfolioGroup[value.investmentId].isBuy !== value.isBuy
    ) {
      portfolioGroup[value.investmentId] = {
        ...value,
        quantity: 0,
        amount: 0,
      };
      arr.push({
        ...value,
        modelPortfolioId: value.modelPortfolioId,
        investmentId: value.investmentId,
        isBuy: value.isBuy,
        quantity: portfolioGroup[value.investmentId].quantity,
        amount: portfolioGroup[value.investmentId].amount,
      });
    }
    portfolioGroup[value.investmentId].quantity += value.quantity;
    portfolioGroup[value.investmentId].amount += value.amount;
    const existingItem = arr.find(
      (item) =>
        item.modelPortfolioId === value.modelPortfolioId &&
        item.investmentId === value.investmentId &&
        item.isBuy === value.isBuy
    );
    if (existingItem) {
      existingItem.quantity = portfolioGroup[value.investmentId].quantity;
      existingItem.amount = portfolioGroup[value.investmentId].amount;
    }
    return res;
  }, {});
};

const parseDate = (dateStr) => new Date(dateStr);

export const translateTrade = (trade) => {
  return uniqBy(trade, (obj) => obj.clearingPartnerId).map((_) => {
    let inv = groupBy(trade, "clearingPartnerId")[_.clearingPartnerId];
    var grpInv = [];
    groupInvestments(grpInv, inv);
    const latestSettlement = usDateFormat(
      Math.max.apply(
        null,
        inv.map((i) => parseDate(i.settlementDate))
      )
    );
    const latestEntry = usDateFormat(
      Math.max.apply(
        null,
        inv.map((i) => parseDate(i.entryDate))
      )
    );
    let groupedByInvestments = grpInv.map((x) => {
      return (x = {
        sourceId: x.sourceId,
        sourceName: x.sourceName,
        investmentId: x.investmentId,
        investmentName: x.investmentName,
        modelPortfolioId: x.modelPortfolioId,
        modelPortfolioName: x.modelPortfolioName,
        cusip: x.cusip,
        quantity: Math.abs(x.quantity),
        amount: Math.abs(x.amount),
        nav: Math.abs(x.nav),
        isSuccess: x.isSuccess,
        isBuy: x.isBuy,
        settlementDate: _.settlementDate,
        investmentType: x.investmentType,
      });
    });
    return (_ = {
      clearingPartnerId: _.clearingPartnerId,
      clearingPartnerName: _.clearingPartnerName,
      clearingPartnerLogoPath: _.clearingPartnerLogoPath,
      clearningPartnerAccountNumber: _.clearningPartnerAccountNumber,
      clearingPartnerAccountId: _.clearingPartnerAccountId,
      settlementDate: latestSettlement,
      clearenceTime: latestEntry,
      confirmationDate: latestSettlement,
      investmentDetails: translateInvestments(
        groupedByInvestments,
        "investmentDetails"
      ),
      allInvestments: translateInvestmentsLoan(
        groupedByInvestments,
        "investmentDetails"
      ),
    });
  });
};

export const groupedTradeByInvestmentId = (trade) => {
  let groupedResult = trade?.reduce((acc, curr) => {
    let found = acc.find(
      (a) =>
        a.sourceId === curr.sourceId &&
        a.investmentId === curr.investmentId &&
        a.modelPortfolioId == curr.modelPortfolioId &&
        a?.isBuy == curr?.isBuy
    );
    if (found) {
      found.amount += Math.abs(curr.amount);
      found.quantity += Math.abs(curr.quantity);
    } else {
      acc.push({
        ...curr,
        amount: Math.abs(curr.amount),
        quantity: Math.abs(curr.quantity),
      });
    }
    return acc;
  }, []);

  return groupedResult;
};
export const groupedTransferTradeByInvestmentId = (trade) => {
  let groupedResult = trade?.reduce((acc, curr) => {
    let found = acc.find(
      (a) =>
        a.sourceId === curr.sourceId &&
        a.investmentId === curr.investmentId &&
        a.modelPortfolioId == curr.modelPortfolioId &&
        a?.isBuy == curr?.isBuy
    );

    if (found) {
      found.amount += curr.amount;
      found.quantity += curr.quantity;
    } else {
      acc.push({
        ...curr,
        amount: curr.amount,
        quantity: curr.quantity,
      });
    }

    return acc;
  }, []);

  return groupedResult;
};
export const groupInvestmentsAccordingToId = (trade) => {
  let groupedResult = trade?.reduce((acc, curr) => {
    let found = acc.find((a) => a.investmentId === curr.investmentId);
    if (found) {
      found.amount += curr.amount;
      found.quantity += curr.quantity;
      found.units += curr.units;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);
  return groupedResult;
};

export const translateSourceAndInvForTransfer = (trade) => {
  let groupedTrade = groupedTradeByInvestmentId(trade);
  return uniqBy(groupedTrade, (obj) => obj.sourceId).map((_) => {
    let inv = groupBy(groupedTrade, "sourceId")[_.sourceId];
    let sourceGrossAmount = inv.reduce((x, y) => x + Math.abs(y?.amount), 0);
    const invObjects = inv.map((x) => {
      return (x = {
        ...x,
        investmentName: x.investmentName,
        grossWithdrawalAmount: Math.abs(x.amount),
        transaction: x.isBuy ? "Buy" : "Sell",
      });
    });
    return (_ = {
      sourceId: _.sourceId,
      sourceName: _.sourceName,
      grossWithdrawalAmount: sourceGrossAmount,
      requestedAmount: inv.reduce((x, y) => x + Math.abs(y?.amount), 0), //Need to be changed - amount after fee deduction
      sourceInvestmentBalances: invObjects,
      columnValues: translateInvestmentsLoan(invObjects),
      totalInv: translateInvestmentsLoan(invObjects)?.length,
      buy: translateInvestmentsLoan(invObjects)?.filter((e) => e?.isBuy)
        ?.length,
      sell: translateInvestmentsLoan(invObjects)?.filter((e) => !e?.isBuy)
        ?.length,
    });
  });
};

export const translateSourceSplitUp = (trade) => {
  let groupedTrade = groupedTradeByInvestmentId(trade);
  return uniqBy(groupedTrade, (obj) => obj.sourceId).map((_) => {
    let inv = groupBy(groupedTrade, "sourceId")[_.sourceId];
    let sourceGrossAmount = inv.reduce((x, y) => x + Math.abs(y?.amount), 0);
    const invObjects = inv.map((x) => {
      const units =
        x.units ??
        (Math.abs(x.nav) > 0 ? Math.abs(x.amount) / Math.abs(x.nav) : 0);
      return (x = {
        ...x,
        investmentName: x.investmentName,
        cusip: x.cusip,
        units:
          x.quantity != null && Number.isFinite(Number(x.quantity))
            ? Math.abs(x.quantity)
            : Math.abs(x.nav ?? x.navPrice) > 0
            ? Math.abs(x.amount) / Math.abs(x.nav ?? x.navPrice)
            : 0,
        grossWithdrawalAmount: Math.abs(x.amount),
        nav: Math.abs(x.nav ?? x.navPrice),
        allocation: calculateAllocationPercentage(
          Math.abs(x.amount),
          sourceGrossAmount
        ),
        transaction: x.isBuy ? "Buy" : "Sell",
      });
    });
    return (_ = {
      identifier: _?.identifier ?? "",
      clearingPartnerName: _?.clearingPartnerName ?? "",
      sourceTransaction: _?.isBuy ? "Buy" : "Sell",
      sourceId: _.sourceId,
      sourceName: _.sourceName,
      grossWithdrawalAmount: sourceGrossAmount,
      requestedAmount: inv.reduce((x, y) => x + Math.abs(y?.amount), 0), //Need to be changed - amount after fee deduction
      sourceInvestmentBalances: invObjects,
      columnValues: translateInvestmentsLoan(invObjects),
      totalInv: translateInvestmentsLoan(invObjects)?.length,
      buy: translateInvestmentsLoan(invObjects)?.filter((e) => e?.isBuy)
        ?.length,
      sell: translateInvestmentsLoan(invObjects)?.filter((e) => !e?.isBuy)
        ?.length,
    });
  });
};
export const translateTransferSourceSplitUp = (trade) => {
  let groupedTrade = groupedTransferTradeByInvestmentId(trade);

  return uniqBy(groupedTrade, (obj) => obj.sourceId).map((_) => {
    let inv = groupBy(groupedTrade, "sourceId")[_.sourceId];
    const grossWithdrawalAmount = Math.abs(
      inv.reduce((sum, item) => sum + Math.abs(item.amount), 0)
    );

    const requestedAmount = Math.abs(
      inv.reduce((sum, item) => sum + Math.abs(item.amount), 0)
    );

    const totalAbsAmount = inv.reduce(
      (sum, item) => sum + Math.abs(item.amount),
      0
    );

    const invObjects = inv.map((x) => ({
      ...x,
      investmentName: x.investmentName,
      cusip: x.cusip,
      units: Math.abs(x.amount) / Math.abs(x.nav),
      grossWithdrawalAmount: Math.abs(x.amount),
      nav: Math.abs(x.nav),
      allocation: calculateAllocationPercentage(
        Math.abs(x.amount),
        totalAbsAmount
      ),

      transaction: x.isBuy ? "Buy" : "Sell",
    }));

    return {
      identifier: _?.identifier ?? "",
      clearingPartnerName: _?.clearingPartnerName ?? "",
      sourceTransaction: _?.isBuy ? "Buy" : "Sell",
      sourceId: _.sourceId,
      sourceName: _.sourceName,
      grossWithdrawalAmount,
      requestedAmount,
      sourceInvestmentBalances: invObjects,
      columnValues: translateInvestmentsLoan(invObjects),
      totalInv: translateInvestmentsLoan(invObjects)?.length,
      buy: translateInvestmentsLoan(invObjects)?.filter((e) => e?.isBuy)
        ?.length,
      sell: translateInvestmentsLoan(invObjects)?.filter((e) => !e?.isBuy)
        ?.length,
    };
  });
};
export const translateTransactionSplitUp = (trade) => {
  const groupedByTransaction = groupBy(trade, "transactionId");
  const outputData = Object.keys(groupedByTransaction).map((transactionId) => {
    const transactions = groupedByTransaction[transactionId];
    const sources = groupBy(
      transactions,
      (transaction) => transaction.sourceId
    );
    const sourceObjects = Object.keys(sources).map((sourceKey) => {
      const sourceTransactions = sources[sourceKey];
      let sourceGrossAmount = sourceTransactions.reduce(
        (x, y) => x + y?.amount,
        0
      );
      const investment = groupBy(sourceTransactions, "investmentId");
      const investmentObjects = Object.keys(investment).map((investmentId) => {
        const investmentTransactions = investment[investmentId];
        let balances = {
          regularCCBBalance: 0,
          repaymentCCBBalance: 0,
          basisCCBBalance: 0,
          regularEarningsBalance: 0,
          repaymentEarningsBalance: 0,
          basisEarningsBalance: 0,
        };
        investmentTransactions.map((transaction) => {
          switch (transaction.bucketId) {
            case 1:
              balances.regularCCBBalance = Math.abs(transaction.amount);
              break;
            case 2:
              balances.repaymentCCBBalance = Math.abs(transaction.amount);
              break;
            case 3:
              balances.basisCCBBalance = Math.abs(transaction.amount);
              break;
            case 4:
              balances.regularEarningsBalance = Math.abs(transaction.amount);
              break;
            case 5:
              balances.repaymentEarningsBalance = Math.abs(transaction.amount);
              break;
            case 6:
              balances.basisEarningsBalance = Math.abs(transaction.amount);
              break;
            default:
              return;
          }
        });
        const invAmount = investmentTransactions.reduce(
          (x, y) => x + y?.amount,
          0
        );
        return {
          ...balances,
          investmentId: parseInt(investmentId),
          investmentName: investmentTransactions[0].investmentName,
          quantity: investmentTransactions[0].quantity,
          cusip: investmentTransactions[0].cusip,
          units:
            Math.abs(investmentTransactions[0].nav) > 0
              ? Math.abs(invAmount) / Math.abs(investmentTransactions[0].nav)
              : 0,
          grossWithdrawalAmount: invAmount,
          requestedAmount: invAmount,
          nav: Math.abs(investmentTransactions[0].nav),
          allocation: calculateAllocationPercentage(
            invAmount,
            sourceGrossAmount
          ),
          transaction: investmentTransactions[0].isBuy,
        };
      });

      const [firstTransaction] = sourceTransactions;
      return {
        sourceId: firstTransaction.sourceId,
        sourceName: firstTransaction.sourceName,
        sourceSubCategory: firstTransaction.sourceSubCategory,
        grossWithdrawalAmount: sourceGrossAmount,
        requestedAmount: sourceGrossAmount,
        sourceInvestmentBalances: investmentObjects,
        regularCCBBalance: investmentObjects.reduce(
          (x, y) => x + y?.regularCCBBalance,
          0
        ),
        repaymentCCBBalance: investmentObjects.reduce(
          (x, y) => x + y?.repaymentCCBBalance,
          0
        ),
        basisCCBBalance: investmentObjects.reduce(
          (x, y) => x + y?.basisCCBBalance,
          0
        ),
        regularEarningsBalance: investmentObjects.reduce(
          (x, y) => x + y?.regularEarningsBalance,
          0
        ),
        repaymentEarningsBalance: investmentObjects.reduce(
          (x, y) => x + y?.repaymentEarningsBalance,
          0
        ),
        basisEarningsBalance: investmentObjects.reduce(
          (x, y) => x + y?.basisEarningsBalance,
          0
        ),
      };
    });
    return {
      transactionId: parseInt(transactionId),
      sourceBalances: sourceObjects,
    };
  });
  return outputData;
};

// export const translateRkaasData = (rkaas) => {
//   return rkaas.map((source) => {
//     return (source = {
//       participantId: source.participantId,
//       planId: source.planId,
//       sourceId: source.sourceId,
//       sourceName: source.sourceName,
//       sourceEmployeeMap: {
//         ...source,
//         sourceEmployeeInvestmentMaps: source.investmentwiseBalances.map(
//           (inv) => {
//             return (inv = { ...inv, investmentName: inv.name });
//           }
//         ),
//       },
//       sourceInvestmentBalances: source.investmentwiseBalances.map((inv) => {
//         return (inv = {
//           investmentId: inv.investmentId,
//           investmentName: inv.name,
//           sourceEmployeeInvestmentMap: inv,
//         });
//       }),
//     });
//   });
// };

export const RENDER_TYPE = {
  DoubleColumnData: 1,
  TripleColumnData: 2,
  TripleColumnDataWithStatus: 3,
  DataFromComponent: 4,
  TripleColumnDataWithHeader: 5,
  DoubleColumnDataWithToolTip: 6,
  DoubleColumnMultipleDataToolTip: 7,
};

export const getCountPadStart = (number = 0) =>
  number?.toString()?.padStart(2, "0");

export const getUsernameFromEmail = (email) => {
  var username = email.split("@")[0];
  return username;
};

export const LOAN_HISTORY_STATUS = {
  3: "Request Submitted", //Awaiting Approval
  7: "Request Approved", //Awaiting Trade
  //11: "Trade Generated", //need to be changed
  8: "Trade Completed", //Active
};

export const TRANSFER_REBALANCE_HISTORY_STATUS = {
  1: "InProgress",
  2: "AwaitingTrade",
  3: "Completed",
  4: "AwaitingSettlement",
};

export const INPLANROTH_HISTORY_STATUS = {
  1: "Request Submitted",
  2: "Completed",
  3: "Rejected",
  4: "Request Approved",
};

export const MODEL_PORTFOLIO_REBALANCE_HISTORY_STATUS = {
  1: "InProgress",
  2: "AwaitingTrade",
  3: "AwaitingSettlement",
  4: "Completed",
  5: "Rejected",
};
export const REBALANCE_REQUEST_TYPE = {
  0: "Manual rebalance",
  1: "Auto rebalance",
};

export const LOAN_REPAYMENT_HISTORY_STATUS = {
  0: "AwaitingFundConfirmation",
  1: "AwaitingTrade",
  2: "AwaitingSettlement",
  3: "TradeCompleted",
};

// export const FEE_HISTORY_STATUS = {
//   1: "Fee Processed", //AwaitingTrade
//   2: "Trade Generated", //TradeAwaitingConfirmation
//   6: "Trade Completed", //Completed
// };
export const FEE_HISTORY_STATUS = {
  1: "AwaitingTrade",
  2: "AwaitingTradeConfirmation",
  3: "TradeRejected",
  4: "Cancelled",
  5: "Failed",
  6: "Completed",
  7: "AwaitingSettlement",
  17: "AwaitingDisbursement",
  18: "AwaitingDisbursementConfirmation",
  19: "DisbursementFailed",
  20: "FeeReversed",
};

export const FEE_REVERSAL_HISTORY_STATUS = {
  1: "AwaitingTrade",
  2: "AwaitingSettlement",
  3: "Completed",
  4: "Failed",
  5: "PartiallyCompleted",
  6: "TradeCancelled",
};

// export const WITHDRAWAL_HISTORY_STATUS = {
//   2: "Request Submitted", //ApprovalInProgress
//   3: "Request Approved", //Approved
//   5: "Trade Generated", //Trade initiated
//   6: "Trade Completed", //Trade Completed
// };

export const WITHDRAWAL_HISTORY_STATUS = {
  1: "RequestInProgress",
  2: "ApprovalInProgress",
  3: "AwaitingTrade",
  4: "Rejected",
  5: "TradeInitiated",
  6: "TradeCompleted",
  7: "TradeRejected",
  8: "Disbursed",
  9: "EsignatureInProgress",
  10: "EsignatureRejected",
  11: "EsignatureVoided",
  12: "AwaitingSettlement",
  13: "AwaitingDisbursement",
  14: "DisbursementFailed",
  15: "TradeCancelled",
  16: "AwaitingDisbursementConfirmation",
  17: "Completed",
  18: "EsignatureFailed",
};

// export const PAYROLL_HISTORY_STATUS = {
//   2: "File Uploaded", //FileUploadInProgress
//   5: "File Submitted", //AwaitingFunding
//   14: "Fund Allocated", //AwaitingFundConfirmation
//   6: "Fund Confirmed", //AwaitingTade
//   //5: "Trade Generated", //need to be changed
//   7: "Trade Completed", //Completed
// };
export const PAYROLL_HISTORY_STATUS = {
  1: "CreationInProgress",
  2: "FileUploadInProgress",
  3: "ErrorCorrectionRequired",
  4: "PendingSubmission",
  5: "AwaitingFunding",
  6: "AwaitingTrade",
  7: "Completed",
  8: "Cancelled",
  9: "Deleted",
  10: "DuplicateRecordsFound",
  11: "Obsolete",
  12: "StructuralValidationFailed",
  13: "SystemFailure",
  14: "AwaitingFundConfirmation",
  15: "PayrollFunded",
  16: "FundingFailed",
  17: "PayrollFundingInProgress",
  18: "Failed",
  19: "ContributionReversed",
  20: "Removed",
  21: "TradeCancelled",
};
export const IS_ENABLE_INTEGRATION = {
  Both: 0,
  IsCompanyEnabled: 1,
  IsIntegrationEnabled: 2,
};

export const INTEGRATION_TYPE = {
  Enrich: 10,
  Integration: 12,
};
export const translateTransactionHistory = (
  data,
  TRANSACTION_STATUS,
  isUnique = true
) => {
  var uniqueData = isUnique
    ? uniqBy(data, (data) => data.transactionStatus ?? data.eventStatus)
    : data;
  return uniqueData.map((_) => {
    return (_ = {
      eventName: TRANSACTION_STATUS[_.transactionStatus ?? _.eventStatus],
      eventTriggeredBy: _.eventTriggeredBy,
      userRole: _.role ?? _.userRole,
      eventTriggeredTime: _.transactionDate ?? _.eventTriggeredTime,
      reasonforRejection: _.reasonForRejection ?? null,
    });
  });
};

export const ATTRIBUTION_KIND = {
  USER: 1,
  SYSTEM: 2,
  CLEARING_PARTNER: 3,
};

export const LOAN_REQUEST_TYPE = {
  NEW_REQUEST: 1,
  REFINANCE: 2,
  REPAYMENT: 3,
  REAMORTIZE: 4,
  SUSPENSION: 5,
};

export const mapTimelineRowToHistoryEvent = (row) => ({
  eventName: row.eventLabel,
  eventTriggeredTime: row.timestamp,
  eventTriggeredBy: row.email,
  userRole: row.roleName,
  reasonforRejection: row.rejectionReason,
  attributionKind: row.attributionKind,
  partnerName: row.partnerName,
  edited: row.edited,
  preFormatted: true,
  requestType: row.requestType,
  transactionId: row.transactionId,
  transactionKey: row.transactionKey,
  parentTransactionKey: row.parentTransactionKey,
  businessKey: row.businessKey,
});

export const mapTimelineRowsToHistoryEvents = (rows = []) =>
  (rows || []).map(mapTimelineRowToHistoryEvent);

export const translateTransactionHistoryDTO = (data, TRANSACTION_STATUS) =>
  data.map((item) => ({
    eventName: TRANSACTION_STATUS[item.transactionStatus],
    eventTriggeredBy: item.eventTriggeredBy ?? "System Generated",
    userRole: item.role ?? "Clearing Partner",
    eventTriggeredTime: item.transactionDate,
    reasonforRejection: item.reasonForRejection ?? null,
    refinance: item.refinance ?? [],
    refinanceCount: item.refinanceCount ?? 0,
    reAmortize: item.reAmortize ?? [],
    reAmortizeCount: item.reAmortizeCount ?? 0,
  }));

export const tradeData = [
  {
    clearingPartnerId: 1,
    clearingPartnerName: "Bofa One",
    clearingPartnerLogoPath: null,
    clearningPartnerAccountNumber: "12345678",
    clearingPartnerAccountId: 1,
    sourceId: 1,
    sourceName: "Pretax",
    investmentId: 1,
    investmentName: "Annuity",
    cusip: "AS1238788",
    quantity: 10,
    amount: 100,
    nav: 10,
    settlementDate: new Date(),
    clearenceTime: new Date(),
    isSuccess: true,
    isBuy: false,
  },
  {
    clearingPartnerId: 1,
    clearingPartnerName: "Bofa One",
    clearingPartnerLogoPath: null,
    clearningPartnerAccountNumber: "12345678",
    clearingPartnerAccountId: 1,
    sourceId: 2,
    sourceName: "AfterTax",
    investmentId: 2,
    investmentName: "Bond",
    cusip: "AS1238869",
    quantity: 20,
    amount: 200,
    nav: 10,
    settlementDate: new Date(),
    clearenceTime: new Date(),
    isSuccess: true,
    isBuy: true,
  },
  {
    clearingPartnerId: 2,
    clearingPartnerName: "BofA Sec",
    clearingPartnerLogoPath: null,
    clearningPartnerAccountNumber: "12345678",
    clearingPartnerAccountId: 2,
    sourceId: 2,
    sourceName: "AfterTax",
    investmentId: 1,
    investmentName: "Annuity",
    cusip: "AS1238778",
    quantity: 1,
    amount: 100,
    nav: 100,
    settlementDate: new Date(),
    clearenceTime: new Date(),
    isSuccess: false,
    isBuy: false,
  },
  {
    clearingPartnerId: 2,
    clearingPartnerName: "Bofa Sec",
    clearingPartnerLogoPath: null,
    clearningPartnerAccountNumber: "12345678",
    clearingPartnerAccountId: 2,
    sourceId: 1,
    sourceName: "PreTax",
    investmentId: 2,
    investmentName: "Bond",
    cusip: "AS1238798",
    quantity: 2,
    amount: 150,
    nav: 75,
    settlementDate: new Date(),
    clearenceTime: new Date(),
    isSuccess: false,
    isBuy: false,
  },
];

export function formatAmtValue(num) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "T";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  } else {
    return num.toFixed(2).toString();
  }
}
export const getSeparateCapitalLettersWithSpace = (value) => {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const areObjectAttributesEqual = (obj1, obj2, attribute) => {
  return obj1[attribute] === obj2[attribute];
};

export const compareFinchData = (obj1, obj2, category, attribute) => {
  const returnDetails = [];
  if (obj1[category]?.length === 0) return obj2[category];
  else {
    obj1[category]?.map((e, index) => {
      const checkData = obj2[category]?.find((f) =>
        areObjectAttributesEqual(e, f, attribute)
      );
      if (checkData)
        returnDetails.push({
          ...checkData,
          id: e.id,
          isDeleted: false,
          coreClassificationCodeId: e.coreClassificationCodeId,
        });
      else
        returnDetails.push({
          ...e,
          isDeleted: true,
        });
    });
  }
  return returnDetails;
};

export const FINCH_CONNECTION_STATUS = {
  1: "Active",
  2: "Inactive",
  3: "Reconnecting",
  4: "Disconnected",
  5: "Pending",
};

export const FINCH_ONBOARDING_STATUS = {
  1: "CompanyInProgress", //CompanyInProgress
  2: "PlanInProgress", // PlanInProgress
  3: "EmployeeExclusionInProgress", //EmployeeExclusionInProgress
  4: "EmployeeInProgress", // EmployeeInProgress
  5: "Completed", // Completed
};

export const mergeFinchPlanArrays = (pdp, gfod) => {
  const res = pdp.map((ob) => {
    const mch = gfod.find((gf) => gf.benefitId === ob.benefitId);
    return {
      ...ob,
      id: mch ? mch.id : 0,
      isDeleted: mch ? mch.isDeleted : false,
    };
  });

  // Add items from gfod that are not in pdp to res
  gfod.forEach((gf) => {
    const existsInRes = res.some((ob) => ob.benefitId === gf.benefitId);
    if (!existsInRes) {
      res.push({
        ...gf,

        isDeleted: true,
      });
    }
  });

  return res;
};

export const HolidayDisplay = ({ holidays }) => {
  function constructHolidayString(holidays) {
    const holidayLabels = [];

    if (holidays.federalHoliday) {
      holidayLabels.push("Federal Holiday");
    }
    if (holidays.tradeHoliday) {
      holidayLabels.push("Trade Holiday");
    }
    if (holidays.settlementHoliday) {
      holidayLabels.push("Settlement Holiday");
    }

    return holidayLabels.join(", ");
  }

  const holidayString = constructHolidayString(holidays);

  return (
    <div>
      <div>{holidayString}</div>
    </div>
  );
};
export const GetTradeStatusBasedOnTransaction = (x, status, isTradeStatus) => {
  switch (x) {
    case 1:
      return GetTradeDistributionStatus(status);
    case 2:
      return GetTradeRolloverInStatus(status);
    case 9:
    case 3:
      return GetTradeTransferRebalanceStatus(status);
    case 5:
      return GetTradePayrollStatus(status);
    case 6:
      return GetTradeLoanStatus(status, isTradeStatus);
    case 8:
      return GetTradeFeeStatus(status);
    case 15:
      return GetTradeForfeitureStatus(status);
    case 7:
      return GetLoanRepaymentStatus(status);
    case 19:
      return GetContributionReversalStatus(status);
    case 21:
      return GetTradeFeeReversalStatus(status);
    case 13:
      return GetAdjustementsStatus(status);
    case 17:
      return GetTradeSSPStatus(status);
    default:
      return null;
  }
};
export const GetToolTipLengthBasedOnTransactionType = (x) => {
  switch (x) {
    case 6:
      return 23;
    case 1:
      return 15;
  }
};
export const GetTradeForfeitureStatus = (x) => {
  switch (x) {
    case 0:
      return "Awaiting trade";
    case 1:
      return "Awaiting settlement";
    case 2:
      return "Trade completed";
  }
};
export const GetLoanRepaymentStatus = (x) => {
  switch (x) {
    case 1:
      return "Awaiting trade";
    case 2:
      return "Awaiting settlement";
    case 3:
      return "Trade completed";
  }
};
export const GetAdjustementsStatus = (x) => {
  switch (x) {
    case 1:
      return "In Progress";
    case 2:
      return "Awaiting trade";
    case 3:
      return "Awaiting settlement";
    case 4:
      return "Trade completed";
    case 5:
      return "Trade cancelled";
  }
};
export const GetContributionReversalStatus = (x) => {
  switch (x) {
    case 1:
      return "Awaiting trade";
    case 2:
      return "Awaiting settlement";
    case 3:
      return "Trade completed";
    case 5:
      return "Trade cancelled";
  }
};

export const GetTradeFeeReversalStatus = (x) => {
  switch (x) {
    case 1:
      return "Completed";
    case 3:
      return "Awaiting settlement";
    case 5:
      return "Trade cancelled";
    default:
      return null;
  }
};
export const GetTradeDistributionStatus = (x) => {
  switch (x) {
    case 3:
      return "Awaiting trade";
    case 12:
      return "Awaiting settlement";
    case 13:
      return "Awaiting Disbursement";
    case 14:
      return "Disbursement Failed";
    case 15:
      return "Trade cancelled";
    case 16:
      return "Awaiting Disbursement Confirmation";
    case 17:
      return "Completed";
  }
};

export const GetWithdrawalTransactionStatus = (x) => {
  switch (x) {
    case 4:
      return "Completed";
    case 3:
      return "Disbursement Failed";
    case 2:
      return "Awaiting Disbursement Confirmation";
    case 1:
      return "Awaiting Disbursement";
  }
};
export const GetWithdrawalTransactionStatusClasses = (x) => {
  switch (x) {
    case 4:
      return "core-body-text-regular-medium-green";
    case 3:
      return "core-body-text-regular-bold-red";
    case 2:
      return "core-body-text-regular-bold-wt";
    case 1:
      return "core-body-text-regular-bold-wt";
  }
};

export const GetTradeRolloverInStatus = (x) => {
  switch (x) {
    case 5:
      return "Completed";
    case 10:
      return "Trade cancelled";
    case 8:
      return "Awaiting trade";
    case 9:
      return "Awaiting settlement";
    case 2:
      return "Approval in progress";
  }
};

export const GetTradeTransferRebalanceStatus = (x) => {
  switch (x) {
    case 2:
      return "Awaiting trade";
    case 3:
      return "Trade completed";
    case 4:
      return "Awaiting settlement";
    case 5:
      return "Trade cancelled";
  }
};

export const GetTradePayrollStatus = (x) => {
  switch (x) {
    // case 5:
    //   return (
    //     <div className="partial-tag p-1 fs-12px fw-500">
    //       <FontAwesomeIcon icon={faBan} /> Awaiting settlement
    //     </div>
    //   );
    case 6:
      return "Awaiting trade";
    case 7:
      return "Trade completed";
    case 21:
      return "Trade cancelled";
  }
};

export const GetTradeSSPStatus = (x) => {
  switch (x) {
    case 2:
      return "Awaiting trade";
    case 3:
      return "Trade completed";
    case 6:
      return "Awaiting settlement";
  }
};

export const GetTradeStatusBasedOnRakkas = (x) => {
  switch (x) {
    case 1:
      return "Sent For Trade";
    case 2:
      return "Trade completed";
    case 3:
      return "Trade Failed";
    case 4:
      return "Dispersion Initiated";
    case 5:
      return "Dispersion Completed";
    case 6:
      return "Partially Completed";
    case 7:
      return "Trade Cancelled";
    case 8:
      return "Awaiting Settlement";
  }
};

export const GetTradeLoanStatus = (x, isTradeStatus) => {
  switch (x) {
    case 7:
    case 15: // RefinancingRequestAwaitingTrade
      return "Awaiting trade";
    case 24:
      return "Trade completed";
    case 8:
      return isTradeStatus ? "Completed" : "Active";
    case 25:
    case 39: // ReFinanceAwaitingSettlement
      return "Awaiting settlement";
    case 33:
    case 40: // ReFinanceAwaitingDisbursement
      return "Awaiting Disbursement";
    case 34:
    case 42: // ReFinanceDisbursementFailed
      return "Disbursement Failed";
    case 35:
    case 43: // ReFinanceTradeCancelled
      return "Trade cancelled";
    case 36:
    case 41: // ReFinanceAwaitingDisbursementConfirmation
      return "Awaiting Disbursement Confirmation";
    case 9:
      return "Delinquent";
    case 5:
      return "Suspended";
    case 10:
      return "Default - Deemed Distribution";
    case 11:
      return "Default - Benefit Offset";
    case 12:
      return "Closed";
    default:
      return convertPasaclToSentenceCase(LOAN_STATUS[x]);
  }
};
export const GetTradeFeeStatus = (x) => {
  switch (x) {
    case 1:
      return "Awaiting trade";
    case 7:
      return "Awaiting settlement";
    /*
    case 3:
      return "Rejected";
    */
    case 17:
      return "Awaiting Disbursement";
    case 18:
      return "Awaiting Disbursement Confirmation";
    case 19:
      return "Disbursement Failed";
    case 6:
      return "Completed";
  }
};

export const GetTradeAwaitingStatus = (type, status) => {
  switch (type) {
    case 1:
      return status == 3;
      break;
    case 3:
    case 9:
      return status == 2;
      break;
    case 5:
      return status == 6;
      break;
    case 19:
      return status == 2;
      break;
    case 6:
      return status == 7;
      break;
    case 8:
      return status == 1;
      break;
    case 15:
      return status == 0;
      break;
    case 7:
      return status == 1;
      break;
    case 13:
      return status == 2 || status == 3;
      break;
    case 21:
      return status == 2 || status == 8;
      break;
    case 17:
      return status == 2 || status == 6;
    default:
      return false;
  }
};

export const GetTradeStatusColor = (type, status) => {
  switch (type) {
    case 1:
      return status == 6;
      break;
    case 2:
      return status == 5;
    case 3:
    case 9:
      return status == 3;
      break;
    case 5:
      return status == 7;
      break;
    case 6:
      return status == 8;
      break;
    case 19:
      return status == 3;
      break;
    case 8:
      return status == 2;
      break;
    case 15:
      return status == 2;
      break;
    case 7:
      return status == 3;
    case 13:
      return status == 4;
    case 21:
      return status == 1;
    case 17:
      return status == 3;
    default:
      return false;
  }
};

export const HtmlRenderer = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export const inputFieldSize = (size) => {
  switch (size) {
    case "xxs":
    case "xs":
    case "sm":
      return "core-body-text-small-medium-sl";
      break;
    case "sms":
    case "smsd":
    case "smd":
    case "smdd":
    case "md":
      return "core-body-text-regular-medium-sl";
      break;
    case "lg":
    case "xl":
    case "xxl":
    case "xxxl":
      return "core-body-text-large-medium-sl";
      break;
    default:
      return "";
  }
};

export const otherInputFieldSize = (size) => {
  switch (size) {
    case "xs":
      return "p-xs";
      break;
    case "sm":
      return "p-sm";
      break;
    case "md":
      return "p-md";
      break;
    case "lg":
      return "p-lg";
      break;
    case "xl":
      return "p-xl";
      break;
    default:
      return "";
  }
};

export const badgeStatusStyle = (status, path) => {
  let statusStyle = status?.toLowerCase();
  if (path == "plan" && statusStyle == "inactive") {
    return "neutral";
  }
  switch (statusStyle) {
    case "active":
    case "trade completed":
    case "settled":
    case "closed":
    case "completed":
      return "success";
    case "inactive":
    case "cancelled":
    case "trade rejected":
    case "failed":
    case "terminated":
    case "trade cancelled":
    case "partiallyterminated":
    case "exempted":
    case "suspended":
    case "rejected":
    case "disbursement failed":
      return "danger";
    case "awaiting trade":
    case "awaiting settlement":
    case "awaiting trade confirmation":
    case "awaiting disbursement confirmation":
    case "delinquent":
    case "default - deemed distribution":
    case "default - benefit offset":
    case "awaiting disbursement":
    case "approval in progress":
    case "draft":
      return "warning";
    case "underconstruction":
    case "readyforapproval":
    case "approved":
    case "pending":
    case "awaiting fund confirmation":
      return "info";
    case "":
      return "neutral";
    default:
      return "";
  }
};
export const getStatusColorForFeeRun = (status) => {
  switch (status) {
    case 1: // Awaiting Trade
      return "warning";
    case 7: // Awaiting Settlement
      return "warning";

    case 6: // Completed
      return "success";
    case 20: // Completed-Fee Reversed
      return "success";
    case 10: // Paid
      return "success";

    case 12: // Not Paid
    case 19: // Disbursement Failed
      return "danger";

    case 11: // Partially Paid
    case 17: // Awaiting Disbursement
    case 18: // Awaiting Disbursement Confirmation
      return "warning";
    case 9: // Partially waived off
      return "info";
    case 8: // Waived off
      return "info";

    default:
      return "neutral";
  }
};
export const badgeIcon = (icon) => {
  let finalicon = icon?.toLowerCase();
  switch (finalicon) {
    case "trade completed":
    case "settled":
    case "completed":
    case "closed":
    case "active":
      return faCheckCircle;
    case "awaiting trade":
    case "awaiting settlement":
    case "awaiting disbursement":
    case "awaiting disbursement confirmation":
    case "inactive":
    case "cancelled":
    case "trade rejected":
    case "suspended":
    case "delinquent":
    case "default - deemed distribution":
    case "default - benefit offset":
    case "failed":
    case "rejected":
    case "approval in progress":
      return faBan;
    case "terminated":
    case "disbursement failed":
    case "trade cancelled":
      return faTimesCircle;
    case "draft":
      return faSave;
    default:
      return "";
  }
};

export const translateRedemptionFeeCommand = (splits, initialBalances) => {
  const res = splits?.map((s) => {
    var sourceMap = s.sourceEmployeeMap;
    return {
      ...s,
      sourceEmployeeMap: {
        accountBalance: isNaN(sourceMap.accountBalance)
          ? 0
          : sourceMap.accountBalance,
        basisAccountBalance: isNaN(sourceMap.basisAccountBalance)
          ? 0
          : sourceMap.basisAccountBalance,
        basisCCBBalance: isNaN(sourceMap.basisCCBBalance)
          ? 0
          : sourceMap.basisCCBBalance,
        basisEarningsBalance: isNaN(sourceMap.basisEarningsBalance)
          ? 0
          : sourceMap.basisEarningsBalance,
        regularAccountBalance: isNaN(sourceMap.regularAccountBalance)
          ? 0
          : sourceMap.regularAccountBalance,
        regularCCBBalance: isNaN(sourceMap.regularCCBBalance)
          ? 0
          : sourceMap.regularCCBBalance,
        regularEarningsBalance: isNaN(sourceMap.regularEarningsBalance)
          ? 0
          : sourceMap.regularEarningsBalance,
        repaymentAccountBalance: isNaN(sourceMap.repaymentAccountBalance)
          ? 0
          : sourceMap.repaymentAccountBalance,
        repaymentCCBBalance: isNaN(sourceMap.repaymentCCBBalance)
          ? 0
          : sourceMap.repaymentCCBBalance,
        repaymentEarningsBalance: isNaN(sourceMap.repaymentEarningsBalance)
          ? 0
          : sourceMap.repaymentEarningsBalance,
      },
      sourceInvestmentBalances: s.sourceInvestmentBalances?.map((inv) => {
        const investment = initialBalances.find(
          (x) => x.investmentId === inv.investmentId
        );
        return {
          ...inv,
          sourceEmployeeInvestmentMap: {
            ...inv.sourceEmployeeInvestmentMap,
            nav: investment?.sourceEmployeeInvestmentMap?.nav ?? 0,
          },
        };
      }),
    };
  });
  return res;
};

export const mergeInvestments = (data) => {
  const investmentsMap = new Map();
  data?.forEach((source) => {
    source?.sourceInvestmentBalances?.forEach((investment) => {
      if (!investmentsMap.has(investment.investmentId)) {
        investmentsMap.set(investment.investmentId, investment);
      }
    });
  });
  return Array.from(investmentsMap.values());
};

export const getRedemptionFeeSplits = (data) => {
  const investments = {};

  data?.forEach((item) => {
    if (!investments[item.investmentId]) {
      investments[item.investmentId] = {
        investmentId: item.investmentId,
        investmentName: item.investmentName,
        isTierBased: item.isTierBased,
        nav: item.nav,
        redemptionFeeAmount: 0,
        redemptionFeeUnits: 0,
        redemptionFeeBreakup: {},
      };
    }

    investments[item.investmentId].redemptionFeeAmount +=
      item.redemptionFeeAmount;
    investments[item.investmentId].redemptionFeeUnits +=
      item.redemptionFeeUnits;

    if (!investments[item.investmentId].redemptionFeeBreakup[item.tier]) {
      investments[item.investmentId].redemptionFeeBreakup[item.tier] = {
        tier: item.tier,
        holdingPeriod: item.holdingPeriod,
        holdingPeriodType: item.holdingPeriodType,
        redemptionFeePercentage: item.redemptionFeePercentage,
        isTierBased: item.isTierBased,
        sourceWiseRedemptionFee: {},
      };
    }

    const tier = investments[item.investmentId].redemptionFeeBreakup[item.tier];

    if (!tier.sourceWiseRedemptionFee[item.sourceId]) {
      tier.sourceWiseRedemptionFee[item.sourceId] = {
        sourceId: item.sourceId,
        sourceName: item.sourceName,
        feeAmount: 0,
        grossAmount: 0,
        grossUnits: 0,
        feeUnits: 0,
      };
    }

    const source = tier.sourceWiseRedemptionFee[item.sourceId];

    source.feeAmount += item.redemptionFeeAmount;
    source.grossAmount += item.grossAmount;
    source.grossUnits += item.grossUnits;
    source.feeUnits += item.redemptionFeeUnits;
  });

  return Object.values(investments).map((investment) => {
    return {
      ...investment,
      redemptionFeeBreakup: Object.values(investment.redemptionFeeBreakup).map(
        (tier) => ({
          ...tier,
          sourceWiseRedemptionFee: Object.values(tier.sourceWiseRedemptionFee),
        })
      ),
    };
  });
};

export const getRedemptionFeeDataForLoan = (data, amountName) => {
  let InputData = data.slice(1);
  let redempFeeInput = [];
  InputData?.forEach((source) => {
    var totalAmount = source.sourceAccountBalance ?? 0;
    var amount =
      amountName == "requestedAmount"
        ? source.requestedAmount
        : amountName == "fees"
        ? (source.chequeFees ?? 0) +
          (source.loanFeeAmount ?? 0) +
          (source.eftFees ?? 0)
        : 0;
    let translatedObject = {
      sourceId: source.sourceId,
      sourceName: source.sourceName,
      sourceEmployeeMap: {
        sourceId: source.sourceId,
        sourceName: source.sourceName,
        repaymentCCBBalance:
          totalAmount == 0
            ? 0
            : (source.repaymentCCBBalance / totalAmount) * amount,
        regularCCBBalance:
          totalAmount == 0
            ? 0
            : (source.regularCCBBalance / totalAmount) * amount,
        basisCCBBalance:
          totalAmount == 0
            ? 0
            : (source.basisCCBBalance / totalAmount) * amount,
        repaymentAccountBalance:
          totalAmount == 0
            ? 0
            : (source.repaymentAccountBalance / totalAmount) * amount,
        regularAccountBalance:
          totalAmount == 0
            ? 0
            : (source.regularAccountBalance / totalAmount) * amount,
        basisAccountBalance:
          totalAmount == 0
            ? 0
            : (source.basisAccountBalance / totalAmount) * amount,
        repaymentEarningsBalance:
          totalAmount == 0
            ? 0
            : (source.repaymentEarningsBalance / totalAmount) * amount,
        regularEarningsBalance:
          totalAmount == 0
            ? 0
            : (source.regularEarningsBalance / totalAmount) * amount,
        basisEarningsBalance:
          totalAmount == 0
            ? 0
            : (source.basisEarningsBalance / totalAmount) * amount,
        accountBalance: amount,
      },
      sourceInvestmentBalances: source.sourceInvestmentBalances?.map(
        (investment) => {
          let invAmount = investment.investmentAccountBalance ?? 0;
          var amount =
            amountName == "requestedAmount"
              ? investment.requestedAmount
              : amountName == "fees"
              ? (investment.chequeFees ?? 0) +
                (investment.loanFeeAmount ?? 0) +
                (investment.eftFees ?? 0)
              : 0;
          return {
            investmentName: investment.investmentName,
            investmentId: investment.investmentId,
            sourceEmployeeInvestmentMap: {
              investmentName: investment.investmentName,
              investmentId: investment.investmentId,
              repaymentCCBBalance:
                invAmount == 0
                  ? 0
                  : (investment.repaymentCCBBalance / invAmount) * amount,
              regularCCBBalance:
                invAmount == 0
                  ? 0
                  : (investment.regularCCBBalance / invAmount) * amount,
              basisCCBBalance:
                invAmount == 0
                  ? 0
                  : (investment.basisCCBBalance / invAmount) * amount,
              repaymentAccountBalance:
                invAmount == 0
                  ? 0
                  : (investment.repaymentAccountBalance / invAmount) * amount,
              regularAccountBalance:
                invAmount == 0
                  ? 0
                  : (investment.regularAccountBalance / invAmount) * amount,
              basisAccountBalance:
                invAmount == 0
                  ? 0
                  : (investment.basisAccountBalance / invAmount) * amount,
              repaymentEarningsBalance:
                invAmount == 0
                  ? 0
                  : (investment.repaymentEarningsBalance / invAmount) * amount,
              regularEarningsBalance:
                invAmount == 0
                  ? 0
                  : (investment.regularEarningsBalance / invAmount) * amount,
              basisEarningsBalance:
                invAmount == 0
                  ? 0
                  : (investment.basisEarningsBalance / invAmount) * amount,
              accountBalance: amount,
              nav: investment.netAssetValue,
              modelPortfolioId: investment?.modelPortfolioId,
              modelPortfolioName: investment?.modelPortfolioName,
            },
          };
        }
      ),
    };
    redempFeeInput.push(translatedObject);
  });
  return redempFeeInput;
};
///redemption fee subledger which is 100 is removed so that it does not come in fees and requested amount calculation as it is being calculated separately
export const translateLoanEventWiseTransactions = (data) => {
  const groupedBySources = groupBy(data, "sourceId");
  const feeSubledgerIds = [94, 95, 98, 99, 96, 97];

  //tax chart of account ids are there in backend so removed

  // const taxSubledgerIds = Array.from({ length: 51 }, (_, i) => i + 35).filter(
  //   (id) => id < 86,
  // );

  const output = Object.keys(groupedBySources).map((sourceId) => {
    const investments = groupBy(groupedBySources[sourceId], "investmentId");

    const grosswithdrawalamount = groupedBySources[sourceId].reduce(
      (a, b) => a + b.amount,
      0
    );

    // const tax = groupedBySources[sourceId]
    //   .filter((e) => 34 < e.chartOfAccountId && e.chartOfAccountId < 86)
    //   .reduce((a, b) => a + b?.amount, 0);

    const fees = groupedBySources[sourceId]
      .filter((e) => feeSubledgerIds.includes(e.subLedgerId))
      .reduce((a, b) => a + b?.amount, 0);
    const requestedAmount = grosswithdrawalamount - fees;
    const groupedInvestment = groupBy(
      groupedBySources[sourceId],
      (_) => `${_.investmentId ?? 0}|${_.modelPortfolioId ?? 0}`
    );
    const groupedInvestmentObjects = Object.entries(groupedInvestment).map(
      ([key, values]) => {
        const [investmentId, modelPortfolioId] = key.split("|");
        const amount = values.reduce((a, b) => a + Math.abs(b.amount), 0);
        return {
          investmentId: parseInt(investmentId),
          modelPortfolioId: parseInt(modelPortfolioId),
          investmentName: values[0].investmentName,
          investmentType: values[0].investmentType,
          modelPortfolioName: values[0].modelPortfolioName,
          cusip: values[0].cusip,
          units: values.reduce(
            (a, b) => a + (b.units ?? Math.abs(b.quantity)),
            0
          ),
          grossWithdrawalAmount: amount,
          nav: values[0].nav,
          allocation:
            grosswithdrawalamount != 0 && !isNaN(grosswithdrawalamount)
              ? (amount / grosswithdrawalamount) * 100
              : 0,
        };
      }
    );
    return {
      sourceId: parseInt(sourceId),
      sourceName: groupedBySources[sourceId][0].sourceName,
      sourceType: groupedBySources[sourceId][0].sourceType,
      sourceCategory: groupedBySources[sourceId][0].sourceCategory,
      sourceSubCategory: groupedBySources[sourceId][0].sourceSubCategory,
      sourceSubSubCategory: groupedBySources[sourceId][0].sourceSubSubCategory,
      grossWithdrawalAmount: grosswithdrawalamount,
      tax: 0,
      fees: fees,
      requestedAmount: requestedAmount,
      sourceInvestmentBalances: translateInvestments(groupedInvestmentObjects),
      columnValues: translateInvestmentsLoan(groupedInvestmentObjects),
    };
  });
  return output;
};

export const translateEventWiseTransactions = (
  data,
  assetLedgerSourceSplit = null
) => {
  if (isEmpty(data)) return [];
  const netWithdrawalChartOfAccountIds = [26, 27, 28, 29];
  const feeChartOfAccountIds = [30, 106, 107, 108];
  const taxChartOfAccountIds = [31, 109];

  const groupedBySources = groupBy(data, "sourceId");
  const output = Object.keys(groupedBySources).map((sourceId) => {
    const groupedInvestment =
      assetLedgerSourceSplit == null
        ? groupBy(
            groupedBySources[sourceId],
            (_) => `${_.investmentId ?? 0}|${_.modelPortfolioId ?? 0}`
          )
        : groupBy(
            groupBy(assetLedgerSourceSplit, "sourceId")[sourceId],
            (_) => `${_.investmentId ?? 0}|${_.modelPortfolioId ?? 0}`
          );

    const redemptionFeeAmount = groupedBySources[sourceId]
      .filter(
        (e) =>
          feeChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId === 100
      )
      .reduce((a, b) => a + b?.amount, 0);
    const tax = groupedBySources[sourceId]
      .filter(
        (e) =>
          taxChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId >= 35 &&
          e.subLedgerId < 87
      )
      .reduce((a, b) => a + b?.amount, 0);
    const fees = groupedBySources[sourceId]
      .filter(
        (e) =>
          feeChartOfAccountIds.includes(e.chartOfAccountId) &&
          [87, 88, 90, 91].includes(e.subLedgerId)
      )
      .reduce((a, b) => a + b?.amount, 0);
    const requestedAmount = groupedBySources[sourceId]
      .filter((e) =>
        netWithdrawalChartOfAccountIds.includes(e.chartOfAccountId)
      )
      .reduce((a, b) => a + b?.amount, 0);

    const grosswithdrawalamount = requestedAmount + tax + fees;

    const groupedInvestmentObjects = Object.entries(groupedInvestment).map(
      ([key, values]) => {
        const [investmentId, modelPortfolioId] = key.split("|");
        const amount = values.reduce((a, b) => a + Math.abs(b.amount), 0);
        return {
          investmentId: parseInt(investmentId),
          modelPortfolioId: parseInt(modelPortfolioId),
          investmentName: values[0].investmentName,
          investmentType: values[0].investmentType,
          modelPortfolioName: values[0].modelPortfolioName,
          cusip: values[0].cusip,
          units: values.reduce(
            (a, b) => a + (b.units ?? Math.abs(b.quantity)),
            0
          ),
          grossWithdrawalAmount: amount,
          nav: values[0].nav,
          allocation:
            grosswithdrawalamount != 0 && !isNaN(grosswithdrawalamount)
              ? (amount / grosswithdrawalamount) * 100
              : 0,
        };
      }
    );

    return {
      sourceId: parseInt(sourceId),
      sourceName: groupedBySources[sourceId][0].sourceName,
      sourceType: groupedBySources[sourceId][0].sourceType,
      sourceCategory: groupedBySources[sourceId][0].sourceCategory,
      sourceSubCategory: groupedBySources[sourceId][0].sourceSubCategory,
      sourceSubSubCategory: groupedBySources[sourceId][0].sourceSubSubCategory,
      grossWithdrawalAmount: grosswithdrawalamount,
      tax: tax,
      fees: fees,
      requestedAmount: requestedAmount,
      sourceInvestmentBalances: translateInvestments(groupedInvestmentObjects),
      columnValues: translateInvestmentsLoan(groupedInvestmentObjects),
    };
  });
  return output;
};

export const calculateTransactionDetails = (eventWiseTransactions = null) => {
  if (eventWiseTransactions == null) return;
  const netWithdrawalChartOfAccountIds = [26, 27, 28, 29];
  const feeChartOfAccountIds = [30, 106, 107, 108, 100];
  const taxChartOfAccountIds = [31, 109];

  const totalCheckFee =
    eventWiseTransactions
      ?.filter(
        (e) =>
          feeChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId === 87
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalEftFee =
    eventWiseTransactions
      ?.filter(
        (e) =>
          feeChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId === 88
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalWithdrawalFee =
    eventWiseTransactions
      ?.filter(
        (e) =>
          feeChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId === 90
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalRollOverFee =
    eventWiseTransactions
      ?.filter(
        (e) =>
          feeChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId === 91
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalStateTax =
    eventWiseTransactions
      ?.filter(
        (e) =>
          taxChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId >= 36 &&
          e.subLedgerId <= 86
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalFederalTax =
    eventWiseTransactions
      ?.filter(
        (e) =>
          taxChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId === 35
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalRequestedAmount =
    eventWiseTransactions
      ?.filter((e) =>
        netWithdrawalChartOfAccountIds.includes(e.chartOfAccountId)
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalRedemptionFee =
    eventWiseTransactions
      ?.filter(
        (e) =>
          feeChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId === 100
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalCommission =
    eventWiseTransactions
      ?.filter(
        (e) =>
          feeChartOfAccountIds.includes(e.chartOfAccountId) &&
          e.subLedgerId === 121
      )
      ?.reduce((a, object) => a + object?.amount, 0) ?? 0;

  const totalGrossAmount =
    totalRequestedAmount +
    totalCheckFee +
    totalEftFee +
    totalWithdrawalFee +
    totalRollOverFee +
    totalStateTax +
    totalFederalTax;

  return {
    totalCheckFee,
    totalEftFee,
    totalWithdrawalFee,
    totalRollOverFee,
    totalStateTax,
    totalFederalTax,
    totalRequestedAmount,
    totalRedemptionFee,
    totalGrossAmount,
    totalCommission,
  };
};

export const comparePercentageElections = (
  originalInvestments,
  updatedInvestments
) => {
  if (originalInvestments?.length != updatedInvestments?.length) {
    return true;
  } else {
    for (var i = 0; i < originalInvestments?.length; i++) {
      if (
        originalInvestments[i]?.allocationPercentage !=
        updatedInvestments[i]?.allocationPercentage
      )
        return true;
    }
    return false;
  }
};

export const AccordianDataType = {
  dollar: 1,
  percentage: 2,
  string: 3,
  units: 4,
};

export const isValidDate = (day, month, year, minDate, maxDate) => {
  if (Number(month) < 1 || Number(month) > 12) {
    return false;
  }

  if (Number(year) < 1000 || Number(year) >= 3000) {
    return false;
  }

  const date = new Date(year, parseInt(month) - 1, day);
  if (minDate) {
    let min = new Date(minDate?.setHours(0, 0, 0, 0));
    if (minDate && date < min) {
      return false;
    }
  }

  if (maxDate) {
    let max = new Date(maxDate?.setHours(0, 0, 0, 0));
    if (maxDate && date > max) {
      return false;
    }
  }
  return (
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day)
  );
};

export const allowOnlyNumbers = (value) => {
  if (
    !/[0-9]/.test(value.key) &&
    !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(value.key)
  ) {
    value.preventDefault();
  }
};

export const translateTradeWithoutModelPortfolio = (trade) => {
  return uniqBy(trade, (obj) => obj.clearingPartnerId).map((_) => {
    let inv = groupBy(trade, "clearingPartnerId")[_.clearingPartnerId];
    var grpInv = [];
    groupInvestments(grpInv, inv);
    const latestSettlement = usDateFormat(
      Math.max.apply(
        null,
        inv.map((i) => parseDate(i.settlementDate))
      )
    );
    const latestEntry = usDateFormat(
      Math.max.apply(
        null,
        inv.map((i) => parseDate(i.entryDate))
      )
    );
    let groupedByInvestments = grpInv.map((x) => {
      return (x = {
        sourceId: x.sourceId,
        sourceName: x.sourceName,
        investmentId: x.investmentId,
        investmentName: x.investmentName,
        //modelPortfolioId: x.modelPortfolioId,
        //modelPortfolioName: x.modelPortfolioName,
        cusip: x.cusip,
        quantity: Math.abs(x.quantity),
        amount: Math.abs(x.amount),
        nav: Math.abs(x.nav),
        isSuccess: x.isSuccess,
        isBuy: x.isBuy,
        settlementDate: _.settlementDate,
      });
    });
    return (_ = {
      clearingPartnerId: _.clearingPartnerId,
      clearingPartnerName: _.clearingPartnerName,
      clearingPartnerLogoPath: _.clearingPartnerLogoPath,
      clearningPartnerAccountNumber: _.clearningPartnerAccountNumber,
      clearingPartnerAccountId: _.clearingPartnerAccountId,
      settlementDate: latestSettlement,
      clearenceTime: latestEntry,
      confirmationDate: latestSettlement,
      investmentDetails: translateInvestments(
        groupedByInvestments,
        "investmentDetails"
      ),
      allInvestments: translateInvestmentsLoan(
        groupedByInvestments,
        "investmentDetails"
      ),
    });
  });
};

export const translateSourceWiseSplitUp = (trade) => {
  let groupedTrade = groupedTradeByInvestmentId(trade);

  return uniqBy(groupedTrade, (obj) => obj.sourceId).map((source) => {
    let investments = groupBy(groupedTrade, "sourceId")[source.sourceId];

    let sourceGrossAmount = investments.reduce(
      (total, investment) => total + Math.abs(investment?.amount),
      0
    );

    // Group investments by investmentId and sum their amounts
    let investmentMap = {};
    investments.forEach((inv) => {
      if (!investmentMap[inv.investmentId]) {
        investmentMap[inv.investmentId] = {
          id: inv.investmentId,
          name: inv.investmentName ?? "-",
          amount: 0,
        };
      }
      investmentMap[inv.investmentId].amount += Math.abs(inv.amount);
    });

    let subHead = Object.values(investmentMap); // Convert grouped investments to an array

    return {
      id: source.sourceId,
      head: source.sourceName,
      amount: sourceGrossAmount, // Total amount for the source
      subHead: subHead, // Grouped investments with summed amounts
    };
  });
};

export const getMaxDisparityPercentage = (percentage, planYear = 2025) => {
  const result = PERMITTED_DISPARITY_TABLE.find(
    (_) =>
      _.planYear === planYear &&
      (_.includeFrom
        ? percentage >= _.percentageFrom
        : percentage > _.percentageFrom) &&
      (_.includeTo ? percentage <= _.percentageTo : percentage < _.percentageTo)
  );

  return result?.maxDisparityPercentage ?? 0;
};

export const calculateIntegrationLevelPercentage = (values) => {
  const taxableWageBase = values.taxableWageBase;
  const integrationLevelType = values.integrationLevelType;
  const addOneDollar =
    values.applyAdditionalOneDollarToIntegrationLevel ?? false ? 1 : 0;
  const integrationLevel =
    integrationLevelType == 1
      ? values.integrationLevel
      : taxableWageBase * (values.integrationLevel / 100) + addOneDollar;

  const cappedIntegrationLevel = Math.min(integrationLevel, taxableWageBase);
  return (cappedIntegrationLevel / taxableWageBase) * 100;
};

export const getStartAndEndDateFromFiscalYear = (fiscalYear, date) => {
  const currentYear = date.getFullYear();

  let startDate = new Date(currentYear, fiscalYear.month - 1, fiscalYear.day);

  if (date < startDate) {
    startDate.setFullYear(startDate.getFullYear() - 1);
  }
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 12);
  endDate.setDate(endDate.getDate() - 1);

  const finalStartDate = new Date(startDate);
  finalStartDate.setFullYear(finalStartDate.getFullYear());

  const finalEndDate = new Date(endDate);
  finalEndDate.setFullYear(finalEndDate.getFullYear());
  return { startDate: finalStartDate, endDate: finalEndDate };
};
export function toLocalDateString(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export const toDateOnlyString = (date) => {
  if (!date) return null;
  if (typeof date === "string") return date.split("T")[0];
  return toLocalDateString(date);
};
export const renderTextWithTooltip = (
  text,
  width,
  align = "left",
  tooltipLength
) => {
  const shortText =
    text?.length > tooltipLength ? text.substring(0, tooltipLength) : text;
  return text?.length > tooltipLength ? (
    <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
      <div
        className="d-flex flex-column justify-content-center "
        style={{ width, textAlign: align }}
      >
        {shortText}...
      </div>
    </OverlayTrigger>
  ) : (
    <div
      className="d-flex flex-column justify-content-center "
      style={{ width, textAlign: align }}
    >
      {text}
    </div>
  );
};

export const parseUTCToLocal = (utcString) => {
  if (!utcString) return null;
  // Ensure the string is treated as UTC by adding 'Z' if not present
  const utcStringWithZ = utcString.endsWith("Z") ? utcString : utcString + "Z";
  return new Date(utcStringWithZ);
};

export const USER_STATUS = {
  0: "Activation In Progress",
  1: "Activation In Progress",
  2: "Active",
  3: "Inactive",
  4: "Terminated",
  5: "Activation Reverted",
};

export const USER_STATUS_ENUM = {
  ACTIVATION_IN_PROGRESS_0: 0,
  ACTIVATION_IN_PROGRESS_1: 1,
  ACTIVE: 2,
  INACTIVE: 3,
  TERMINATED: 4,
  ACTIVATION_REVERTED: 5,
};

export const filterCSSClass = (cssArr) => {
  if (!Array.isArray(cssArr)) {
    throw new Error("filterCSSClass expects an array as input");
  }
  return cssArr.filter(Boolean).join(" ");
};

export const DocumentStatus = {
  1: "Ready for processing",
  2: "Rendered",
  3: "Mailed",
  4: "In transit",
  5: "In local area",
  6: "Processed for delivery",
  7: "Re routed",
  8: "Returned to sender",
  9: "International exit",
  10: "Resent",
  11: "Failure",
  12: "Delivered",
};

export const formatTo24Hour = (dateObj, type = "from") => {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return null;
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();

  if (type === "from") {
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else if (type === "to") {
    hours = 23;
    minutes = 59;
    seconds = 59;
  }

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");

  return `${month}/${day}/${year}, ${hh}:${mm}:${ss}`;
};
const EMPTY_SPONSOR_COMPANY_VALUES = ["", undefined, null, "Select One"];

export const isSponsorCompanyEmpty = (value) =>
  EMPTY_SPONSOR_COMPANY_VALUES.includes(value);

export const getSponsorCompanyValidators = ({
  sponsorField,
  companyField,
}) => ({
  sponsor: (value, values) => {
    const sponsorEmpty = isSponsorCompanyEmpty(values?.[sponsorField]);
    const companyEmpty = isSponsorCompanyEmpty(values?.[companyField]);
    if (sponsorEmpty && companyEmpty) {
      return "PL082:Search using either Company Name and Plan ID or Sponsoring Organization to view records";
    }

    return null;
  },

  company: () => null,
});

export const formatEmployeeName = (name) => {
  if (!name) return "";
  // Add space before uppercase letters that follow lowercase letters or other uppercase letters
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2") // lowercase followed by uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"); // uppercase followed by uppercase+lowercase
};

export const formatAddress = (address) => {
  if (!address) return "";
  // Improve spacing in addresses with multiple regex replacements
  return (
    address
      .replace(/([a-z])([A-Z])/g, "$1 $2") // lowercase followed by uppercase
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // uppercase followed by uppercase+lowercase
      // Handle numbers followed by letters, but preserve ordinals like 1st, 2nd, 3rd, etc.
      .replace(/([0-9])(?!st|nd|rd|th)([A-Za-z])/gi, "$1 $2") // number followed by letter (except ordinals)
      .replace(/([A-Za-z])([0-9])/g, "$1 $2") // letter followed by number
      // Common address component separators - excluding USA to preserve it as one word
      .replace(
        /(Avenue|Street|Road|Drive|Lane|Blvd|Place|Court|Way)([A-Z])/g,
        "$1 $2"
      ) // Common street types
      .replace(/(City|Town|Village|US(?!A)|Canada|UK)([A-Z])/g, "$1 $2") // Common location identifiers (with negative lookahead to avoid splitting USA)
      // Add spaces between state and zip code
      .replace(
        /(Alaska|Alabama|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|Hampshire|Jersey|Mexico|York|Carolina|Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode|Island|Tennessee|Texas|Utah|Vermont|Virginia|Washington|Wisconsin|Wyoming)([0-9])/g,
        "$1 $2"
      )
      // Remove any duplicate spaces that might have been added
      .replace(/\s{2,}/g, " ")
      .trim()
  );
};

export const modifyedColumns = (data, dateFields) => {
  return data?.map((item) => {
    const updatedItem = { ...item };

    dateFields.forEach((field) => {
      updatedItem[field] = item[field] ? new Date(item[field]) : null;
    });

    return updatedItem;
  });
};

export const formatDeletedParticipantDates = (data) =>
  data.map((item) => ({
    ...item,
    deletedDateAndTime: item.deletedDateAndTime
      ? moment
          .utc(item.deletedDateAndTime)
          .local()
          .format("MM/DD/YYYY hh:mm:ss A")
      : "",
  }));
export const gridDateFormatter = (dataType, enableTime = false) => {
  return dataType === "date"
    ? `{0:MM/dd/yyyy${enableTime ? " HH:mm:ss" : ""}}`
    : "";
};

export const isWeekEnd = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
const isDateValid = (date, blockedSet = []) => {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const isBlocked = blockedSet.has(usDateFormat(date));
  return !isWeekend && !isBlocked;
};
export const getMinMaxValidDates = (date, blockedDates = [], maxDays = 365) => {
  const minDate = new Date(date);
  const blockedSet = new Set(blockedDates);
  while (!isDateValid(minDate, blockedSet)) {
    minDate.setDate(minDate.getDate() + 1);
  }
  const maxDate = new Date(minDate);
  let count = 0;
  while (count <= maxDays) {
    if (isDateValid(maxDate, blockedSet)) count++;
    if (count < maxDays) maxDate.setDate(maxDate.getDate() + 1);
  }
  return { minDate, maxDate };
};

export const DROPDOWN_PAGE_SIZE = 20;

export const formatDisbursementAddress = (addr, countries = null) => {
  if (!addr) return "-";

  let country = addr.country;

  if (addr.country == null && addr.countryId != null) {
    const countryObj = countries?.find((c) => c.id === addr.countryId);
    country = countryObj?.name ?? "USA";
  }

  const addressParts = [
    addr?.address1,
    addr?.address2,
    addr?.address3,
    addr?.city,
    ...(country !== "Other"
      ? [addr?.state, addr?.zipCode, country]
      : [addr?.foreignState, addr?.foreignZipCode, addr?.foreignCountry]),
  ];
  return addressParts.filter(Boolean).join(", ") || "-";
};
