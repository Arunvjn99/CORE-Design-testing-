import { ROUTES } from "./common";

export const MANAGE_COMPANY_ROUTES = {
  // DEFINITIONS: `definitions`,
  INCORPORATION_DETAILS: `company-details`,
  INCORPORATION_DETAILS_LINK: `/${ROUTES.MANAGE_COMPANY}/company-details`,
  SETTINGS: `settings`,
  SETTINGS_LINK: `/${ROUTES.MANAGE_COMPANY}/settings`,
  PAYROLL_FREQUENCY: `payroll-frequency`,
  PAYROLL_FREQUENCY_LINK: `/${ROUTES.MANAGE_COMPANY}/payroll-frequency`,
  MANAGE_PAYROLL_FREQUENCY: `manage-payroll-frequency`,
  MANAGE_PAYROLL_FREQUENCY_LINK: `/${ROUTES.MANAGE_COMPANY}/manage-payroll-frequency`,
  MANAGE_PAYROLL_CALENDAR: `manage-payroll-calendar`,
  MANAGE_PAYROLL_CALENDAR_LINK: `/${ROUTES.MANAGE_COMPANY}/manage-payroll-calendar`,
  PAYROLL_CALENDAR_SETTINGS: `payroll-calendar-settings`,
  PAYROLL_CALENDAR_SETTINGS_LINK: `/${ROUTES.MANAGE_COMPANY}/payroll-calendar-settings`,
  PAYROLL_CALENDAR_PAYDATES: `payroll-calendar-paydates`,
  PAYROLL_CALENDAR_PAYDATES_LINK: `/${ROUTES.MANAGE_COMPANY}/payroll-calendar-paydates`,
  PAYROLL_CALENDAR_MANAGE_PAYDATES: `payroll-calendar-manage-paydates`,
  COMPENSATION: `compensation`,
  MANAGE_EMPLOYEE_CLASSIFICATIONS: `manage-employee-classifications`,
  MANAGE_EMPLOYEE_CLASSIFICATIONS_LINK: `/${ROUTES.MANAGE_COMPANY}/manage-employee-classifications`,
  EMPLOYMENT_STATUS: `employment-status`,
  EMPLOYMENT_STATUS_LINK: `/${ROUTES.MANAGE_COMPANY}/employment-status`,
  EMPLOYEE_CLASSIFICATIONS: `employee-classifications`,
  EMPLOYEE_CLASSIFICATIONS_LINK: `/${ROUTES.MANAGE_COMPANY}/employee-classifications`,
  EMPLOYEE_CLASSIFICATIONS_TYPE: `employee-classification-type`,
  EMPLOYEE_CLASSIFICATIONS_TYPE_LINK: `/${ROUTES.MANAGE_COMPANY}/employee-classification-type`,
  MANAGE_COMPENSATION: `manage-compensation`,
  MANAGE_EMPLOYEE_CLASSIFICATIONS_ATTRIBUTE: `employee-attribute-classifications`,
  MANAGE_EMPLOYEE_CLASSIFICATIONS_ATTRIBUTE_LINK: `/${ROUTES.MANAGE_COMPANY}/employee-attribute-classifications`,
  MANAGE_EMPLOYMENT_STATUS: `manage-employment-status`,
  MANAGE_EMPLOYMENT_STATUS_LINK: `/${ROUTES.MANAGE_COMPANY}/manage-employment-status`,
  ACCOUNT_BALANCE: `account-balance`,
  INTEGRATION: `integration`,
};

export const MANAGE_COMPANY_PROFILES_OFFSET = 20;

export const MANAGE_COMPANY_MENU = [
  // {
  //   label: "Definition",
  //   path: MANAGE_COMPANY_ROUTES.DEFINITIONS,
  //   contentHeader: "Definition",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },

  {
    id: "incorporationDetails",
    label: "Incorporation Details",
    path: MANAGE_COMPANY_ROUTES.INCORPORATION_DETAILS,
    contentHeader: "Company Details",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "companySettings",
    label: "Settings",
    path: MANAGE_COMPANY_ROUTES.SETTINGS,
    contentHeader: "Settings",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "managePayrollFrequency",
    label: "Payroll Frequency",
    path: MANAGE_COMPANY_ROUTES.MANAGE_PAYROLL_FREQUENCY,
    contentHeader: "Manage Payroll Frequency",
    breadCrumbs: [],
    childRoutes: [MANAGE_COMPANY_ROUTES.PAYROLL_FREQUENCY],
  },
  {
    id: "managePayrollCalendar",
    label: "Payroll Calendar",
    path: MANAGE_COMPANY_ROUTES.MANAGE_PAYROLL_CALENDAR_LINK,
    contentHeader: "Manage Payroll Calendar",
    breadCrumbs: [],
    childRoutes: [
      MANAGE_COMPANY_ROUTES.PAYROLL_CALENDAR_SETTINGS,
      MANAGE_COMPANY_ROUTES.PAYROLL_CALENDAR_PAYDATES_LINK,
      MANAGE_COMPANY_ROUTES.PAYROLL_CALENDAR_MANAGE_PAYDATES,
    ],
  },
  {
    id: "manageCompanyClassification",
    label: "Employee Classification",
    path: MANAGE_COMPANY_ROUTES.MANAGE_EMPLOYEE_CLASSIFICATIONS,
    contentHeader: "Manage Employee Classification",
    breadCrumbs: [],
    childRoutes: [
      MANAGE_COMPANY_ROUTES.EMPLOYEE_CLASSIFICATIONS,
      MANAGE_COMPANY_ROUTES.EMPLOYEE_CLASSIFICATIONS_TYPE,
      MANAGE_COMPANY_ROUTES.MANAGE_EMPLOYEE_CLASSIFICATIONS_ATTRIBUTE,
    ],
  },
  {
    id: "manageEmploymentStatus",
    label: "Employment Status",
    path: MANAGE_COMPANY_ROUTES.MANAGE_EMPLOYMENT_STATUS,
    contentHeader: "Manage Employment Status",
    breadCrumbs: [],
    childRoutes: [MANAGE_COMPANY_ROUTES.EMPLOYMENT_STATUS],
  },
  {
    id: "companyCompensation",
    label: "Compensation",
    path: MANAGE_COMPANY_ROUTES.COMPENSATION,
    contentHeader: "Compensation",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "accountBalance",
    label: "Account Balance",
    path: MANAGE_COMPANY_ROUTES.ACCOUNT_BALANCE,
    contentHeader: "Account Balance",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "integration",
    label: "Integration",
    path: MANAGE_COMPANY_ROUTES.INTEGRATION,
    contentHeader: "Integration",
    breadCrumbs: [],
    childRoutes: [],
  },
];

export const ALL_MANAGE_COMPANY_ROUTES = [
  ...MANAGE_COMPANY_MENU,
  {
    id: "manageCompanyClassification",
    contentHeader: "Employee Classification Type",
    path: MANAGE_COMPANY_ROUTES.EMPLOYEE_CLASSIFICATIONS_TYPE,
    breadCrumbs: [
      {
        label: "Manage Employee Classification",
        link: MANAGE_COMPANY_ROUTES.MANAGE_EMPLOYEE_CLASSIFICATIONS,
      },
    ],
  },
  {
    id: "manageCompanyClassification",
    contentHeader: "Add Employee Classification",
    path: MANAGE_COMPANY_ROUTES.EMPLOYEE_CLASSIFICATIONS,
    breadCrumbs: [
      {
        label: "Manage Employee Classifications",
        link: MANAGE_COMPANY_ROUTES.MANAGE_EMPLOYEE_CLASSIFICATIONS,
      },
      {
        label: "Employee Classification Type",
        link: MANAGE_COMPANY_ROUTES.EMPLOYEE_CLASSIFICATIONS_TYPE,
      },
    ],
  },
  {
    id: "manageCompanyClassification",
    contentHeader: "Add Attribute",
    path: MANAGE_COMPANY_ROUTES.MANAGE_EMPLOYEE_CLASSIFICATIONS_ATTRIBUTE,
    breadCrumbs: [
      {
        label: "Manage Employee Classifications",
        link: MANAGE_COMPANY_ROUTES.MANAGE_EMPLOYEE_CLASSIFICATIONS,
      },
      {
        label: "Employee Classification Type",
        link: MANAGE_COMPANY_ROUTES.EMPLOYEE_CLASSIFICATIONS_TYPE,
      },
      {
        label: "Employee Classification",
        link: MANAGE_COMPANY_ROUTES.EMPLOYEE_CLASSIFICATIONS,
      },
    ],
  },
  {
    id: "manageEmploymentStatus",
    contentHeader: "Employment Status",
    path: MANAGE_COMPANY_ROUTES.EMPLOYMENT_STATUS,
    breadCrumbs: [
      {
        label: "Manage Employment Status",
        link: MANAGE_COMPANY_ROUTES.MANAGE_EMPLOYMENT_STATUS,
      },
    ],
  },
  {
    id: "managePayrollFrequency",
    contentHeader: "Payroll Frequency",
    path: MANAGE_COMPANY_ROUTES.PAYROLL_FREQUENCY,
    breadCrumbs: [
      {
        label: "Manage Payroll Frequency",
        link: MANAGE_COMPANY_ROUTES.MANAGE_PAYROLL_FREQUENCY,
      },
    ],
  },
  {
    id: "managePayrollCalendar",
    contentHeader: "Payroll Calendar",
    path: MANAGE_COMPANY_ROUTES.PAYROLL_CALENDAR_SETTINGS,
    breadCrumbs: [
      {
        label: "Manage Payroll Calendar",
        link: MANAGE_COMPANY_ROUTES.MANAGE_PAYROLL_CALENDAR_LINK,
      },
    ],
  },
  {
    id: "managePayrollCalendar",
    contentHeader: "Payroll Calendar",
    path: MANAGE_COMPANY_ROUTES.PAYROLL_CALENDAR_PAYDATES_LINK,
    breadCrumbs: [
      {
        label: "Manage Payroll Calendar",
        link: MANAGE_COMPANY_ROUTES.MANAGE_PAYROLL_CALENDAR_LINK,
      },
    ],
  },
  {
    id: "managePayrollCalendar",
    contentHeader: "Add Pay Date (Adhoc)",
    path: MANAGE_COMPANY_ROUTES.PAYROLL_CALENDAR_MANAGE_PAYDATES,
    breadCrumbs: [
      {
        label: "Manage Payroll Calendar",
        link: MANAGE_COMPANY_ROUTES.MANAGE_PAYROLL_CALENDAR_LINK,
      },
    ],
  },
];

export const manageCompanyFormNames = {
  DEFINITIONS_MANAGE_COMPANY: "definitions_managecompany",
  INCORPORATION_DETAILS_MANAGE_COMPANY: "incorporationdetails_managecompany",
  SETTINGS_MANAGE_COMPANY: "settings_managecompany",
  EMPLOYEE_CLASSIFICATIONS_TYPE_MANAGE_COMPANY:
    "employeeclassificationtype_managecompany",
  EMPLOYEE_CLASSIFICATIONS_MANAGE_COMPANY:
    "employeeclassification_managecompany",
  EMPLOYMENT_STATUS_MANAGE_COMPANY: "employeestatus_managecompany",
  PAYROLL_FREQUENCY_MANAGE_COMPANY: "payrollfrequency_managecompany",
  PAYROLL_CALENDAR_SETTINGS_MANAGE_COMPANY:
    "payrollcalendarsettings_managecompany",
  PAYROLL_CALENDAR_ADDPAYDATES_MANAGE_COMPANY:
    "payrollcalendaraddpaydates_managecompany",
  MANAGE_EMPLOYEE_CLASSIFICATIONS_ATTRIBUTE_MANAGE_COMPANY:
    "employeeclassificationattribute_managecompany",
  MANAGE_EMPLOYEE_CLASSIFICATIONS_MANAGE_COMPANY:
    "manageemployeeclassification_managecompany",
  MANAGE_COMPANY_COMPENSATIONS: "manage_company_compensations",
};

export const companyFormFields = {
  [manageCompanyFormNames.DEFINITIONS_MANAGE_COMPANY]: {
    companyName: "companyName",
    companyType: "companyType",
    sponsoringOrganizationId: "sponsoringOrganizationId",
    sponsoringOrganizationIdName: "sponsoringOrganizationIdName",
  },
  [manageCompanyFormNames.INCORPORATION_DETAILS_MANAGE_COMPANY]: {
    companyName: "companyName",
    address1: "address1",
    address2: "address2",
    country: "country",
    state: "state",
    city: "city",
    postalCode: "postalCode",
    phoneNumber: "phoneNumber",
    email: "email",
    website: "website",
    businessType: "businessType",
    taxedAs: "taxedAs",
    operatesAs: "operatesAs",
    fisicalYearMonth: "fisicalYearMonth",
    fisicalYearDay: "fisicalYearDay",
    stateOfIncorporation: "stateOfIncorporation",
    companyStartDate: "companyStartDate",
    taxEIN: "taxEIN",
    recordKeeperId: "recordKeeperId",
    recordkeeper: "recordkeeper",
    sicCode: "sicCode",
    businessCode: "businessCode",
    sponsorPostalCode: "sponsorPostalCode",
  },
  [manageCompanyFormNames.SETTINGS_MANAGE_COMPANY]: {
    modeOfHours: "modeOfHours",
    modeOfCompensation: "modeOfCompensation",
    modeOfContribution: "modeOfContribution",
    isPayrollCalenderRequire: "isPayrollCalenderRequire",
    useFutureDateOfFunding: "useFutureDateOfFunding",
    isLatePayrollApplicable: "isLatePayrollApplicable",
    isFileGenerationRequire: "isFileGenerationRequire",
    isPayrollConfirmationApplicable: "isPayrollConfirmationApplicable",
    isRehireDateLogicApplicable: "isRehireDateLogicApplicable",
  },
  [manageCompanyFormNames.EMPLOYEE_CLASSIFICATIONS_TYPE_MANAGE_COMPANY]: {
    employeeClassificationType: "employeeClassificationType",
    clientEligibilityClassificationRequired:
      "clientEligibilityClassificationRequired",
    classificationName: "classificationName",
    classificationTypeRequired: "classificationTypeRequired",
    multipleSelectionsAllowed: "multipleSelectionsAllowed",
    allowCreatingClassificationViaCodesFile:
      "allowCreatingClassificationViaCodesFile",
  },
  [manageCompanyFormNames.EMPLOYEE_CLASSIFICATIONS_MANAGE_COMPANY]: {
    classificationName: "value",
    classificationCode: "code",
    achNumber: "achNumber",
    effectiveStartDate: "effectiveStartDate",
    effectiveEndDate: "effectiveEndDate",
    classifications: "classifications",
  },
  [manageCompanyFormNames.MANAGE_EMPLOYEE_CLASSIFICATIONS_ATTRIBUTE_MANAGE_COMPANY]:
    {
      attributeName: "name",
      attributeValue: "value",
    },
  [manageCompanyFormNames.EMPLOYMENT_STATUS_MANAGE_COMPANY]: {
    employmentStatus: "employmentStatus",
    employmentStatusName: "employmentStatusName",
    employmentStatusCode: "employmentStatusCode",
  },
  [manageCompanyFormNames.PAYROLL_FREQUENCY_MANAGE_COMPANY]: {
    frequencyType: "frequencyType",
    worksOnSaturday: "worksOnSaturday",
    worksOnSunday: "worksOnSunday",
    startDay: "startDay",
    biWeeklyStartDate: "biWeeklyStartDate",
    startDate: "startDate",
    firstBeginDay: "firstBeginDay",
    secondBeginDay: "secondBeginDay",
    startMonth: "startMonth",
    startMonthFirstQuarter: "startMonthFirstQuarter",
    startMonthFirstHalfYear: "startMonthFirstHalfYear",
    startDateMonth: "startDateMonth",
    startDateDay: "startDateDay",
    frequencyName: "frequencyName",
  },
  [manageCompanyFormNames.PAYROLL_CALENDAR_SETTINGS_MANAGE_COMPANY]: {
    id: "id",
    frequencyType: "frequencyType",
    frequencyName: "frequencyName",
    scheduleBeginDate: "scheduleBeginDate",
    scheduleEndDate: "scheduleEndDate",
    effectivePayDateCount: "effectivePayDateCount",
    isScheduleExtensionApplicable: "isScheduleExtensionApplicable",
    holiday: "holiday",
    saturday: "saturday",
    sunday: "sunday",
  },
  [manageCompanyFormNames.PAYROLL_CALENDAR_ADDPAYDATES_MANAGE_COMPANY]: {
    beginDate: "beginDate",
    endDate: "endDate",
    payDate: "payDate",
  },
  [manageCompanyFormNames.MANAGE_COMPANY_COMPENSATIONS]: {
    name: "name",
    isIncluded: "isIncluded",
  },
};
