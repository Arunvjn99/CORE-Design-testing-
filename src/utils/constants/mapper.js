import { ROUTES } from "./common";
import { v4 as uuid } from "uuid";
import { splitParams } from "../helpers";
import { getIn } from "formik";
import moment from "moment";
import { isEmpty } from "lodash-es";

export const MANAGE_MAPPER_PROFILES_OFFSET = 20;

export const dataTypeOptions = [
  { value: 1, label: "String" },
  { value: 2, label: "Number" },
  { value: 3, label: "Boolean" },
  { value: 4, label: "Date" },
];

export const dateFormats = [
  { value: 0, label: "MM-DD-YYYY" },
  { value: 1, label: "DD-MM-YYYY" },
  { value: 2, label: "YYYY-MM-DD" },
  { value: 3, label: "MMDDYYYY" },
  { value: 4, label: "DDMMYYYY" },
  { value: 5, label: "YYYYMMDD" },
];

export const parameterTypes = [
  { value: 1, label: "Field" },
  { value: 2, label: "Function" },
  { value: 3, label: "Constant" },
  { value: 4, label: "Variable" },
];

export const passthroughParameterTypes = [
  { value: 1, label: "Field" },
  { value: 2, label: "Function" },
  { value: 3, label: "Constant" },
];

export const fileNameTypes = [
  { value: 2, label: "Function" },
  { value: 3, label: "Constant" },
  { value: 4, label: "Variable" },
];

export const sectionTypeOptions = [
  {
    label: "Header",
    value: 0,
  },
  {
    label: "Generic",
    value: 1,
  },
  {
    label: "Trailer",
    value: 2,
  },
];

export const typeSetting = [
  {
    label: "Key",
    value: 1,
  },
  {
    label: "Generic",
    value: 2,
  },
  {
    label: "Indicator",
    value: 3,
  },
];

export const MANAGE_MAPPER_ROUTES = {
  MAP_AND_TRANSFORM: `map-and-transform`,
  MAP_AND_TRANSFORM_LINK: `/${ROUTES.MANAGE_MAPPER}/map-and-transform`,
  MAP_AND_TRANSFORM_OUTPUT: `map-and-transform-output`,
  MAP_AND_TRANSFORM_OUTPUT_LINK: `/${ROUTES.MANAGE_MAPPER}/map-and-transform-output`,
  BASIC_INFORMATION: `basic-information`,
  BASIC_INFORMATION_LINK: `/manage-mapper/basic-information`,
  AGGREGATE: `aggregate`,
  SOURCE: `source`,
  SOURCE_LINK: `/${ROUTES.MANAGE_MAPPER}/source`,
  PREVIEW: `preview`,
  PREVIEW_LINK: `/${ROUTES.MANAGE_MAPPER}/preview`,
  FILTER: `filter`,
  FILTER_LINK: `/${ROUTES.MANAGE_MAPPER}/filter`,
  OUTPUT_FILTER: `output-filter`,
  OUTPUT_FILTER_LINK: `/${ROUTES.MANAGE_MAPPER}/output-filter`,
  TARGET: `target`,
  TARGET_LINK: `/${ROUTES.MANAGE_MAPPER}/target`,
  ASSOCIATEDPLANS: `associate-plans`,
  RULESET: `ruleset`,
  VALIDATIONS: `validations`,
  SCHEDULER: `scheduler`,
  SCHEDULER_LINK: `/${ROUTES.MANAGE_MAPPER}/scheduler`,
  VERIFY_MAP: `verify-map`,
  VERIFY_MAP_LINK: `/${ROUTES.MANAGE_MAPPER}/verify-map`,
  VERIFY_AND_MAP_OUTPUT: `map-and-verify-output`,
  VERIFY_AND_MAP_OUTPUT_LINK: `/${ROUTES.MANAGE_MAPPER}/map-and-verify-output`,
  REVIEW_AND_CONFIRM: `review-and-confirm`,
  OVERVIEW: `overview`,
  OVERVIEW_LINK: `/manage-mapper/overview`,

  FIXED_LENGTH: `fixed-length`,
  OUTPUT_TARGET: `output-target`,
  PASSTHROUGH_TARGET: `passthrough-target`,
  PASSTHROUGH_TARGET_LINK: `/${ROUTES.MANAGE_MAPPER}/passthrough-target`,
  SPLIT: `split`,
};

export const MANAGE_MAPPER_MENU_WITH_OVERVIEW = [
  {
    id: "overview",
    label: "Overview",
    contentHeader: "Overview",
    path: MANAGE_MAPPER_ROUTES.OVERVIEW,
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "loadDefinitionHome",
    label: "Basic Information",
    contentHeader: "Basic Information",
    path: MANAGE_MAPPER_ROUTES.BASIC_INFORMATION,
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "loadDefinitionSource",
    label: "Source",
    path: MANAGE_MAPPER_ROUTES.SOURCE_LINK,
    contentHeader: "Source",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "fixedLength",
    label: "File Specifications",
    path: MANAGE_MAPPER_ROUTES.FIXED_LENGTH,
    contentHeader: "File Specifications",
    breadCrumbs: [],
    childRoutes: [],
  },
  // {
  //   id: "preview",
  //   label: "Preview",
  //   path: MANAGE_MAPPER_ROUTES.PREVIEW,
  //   contentHeader: "Preview",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  {
    id: "targetContainers",
    label: "Target",
    path: MANAGE_MAPPER_ROUTES.TARGET_LINK,
    contentHeader: "Target",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "mapAndTransform",
    label: "Map & Transform",
    path: MANAGE_MAPPER_ROUTES.MAP_AND_TRANSFORM_LINK,
    contentHeader: "Map & Transform",
    breadCrumbs: [],
    childRoutes: [],
  },
  // {
  //   id: "validations",
  //   label: "Validations",
  //   path: MANAGE_MAPPER_ROUTES.VALIDATIONS,
  //   contentHeader: "Validations",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  {
    id: "verifyMap",
    label: "Verify Map",
    path: MANAGE_MAPPER_ROUTES.VERIFY_MAP,
    contentHeader: "Verify Map",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "loadFilter",
    label: "Filter",
    path: MANAGE_MAPPER_ROUTES.FILTER,
    contentHeader: "Filter",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "aggregate",
    label: "Aggregate",
    path: MANAGE_MAPPER_ROUTES.AGGREGATE,
    contentHeader: "Aggregate",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "ruleset",
    label: "Ruleset",
    path: MANAGE_MAPPER_ROUTES.RULESET,
    contentHeader: "Ruleset",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "scheduler",
    label: "Scheduler",
    path: MANAGE_MAPPER_ROUTES.SCHEDULER_LINK,
    contentHeader: "Scheduler",
    breadCrumbs: [],
    childRoutes: [],
  },
];

export const MANAGE_MAPPER_MENU_OUTPUT = [
  {
    id: "loadDefinitionHome",
    label: "Basic Information",
    contentHeader: "Basic Information",
    path: MANAGE_MAPPER_ROUTES.BASIC_INFORMATION,
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "targetOutput",
    label: "Target",
    path: MANAGE_MAPPER_ROUTES.OUTPUT_TARGET,
    contentHeader: "Target",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "mapAndTransform",
    label: "Map & Transform",
    path: MANAGE_MAPPER_ROUTES.MAP_AND_TRANSFORM_OUTPUT_LINK,
    contentHeader: "Map & Transform",
    breadCrumbs: [],
    childRoutes: [],
  },
  // {
  //   label: "Associate Plans",
  //   path: MANAGE_MAPPER_ROUTES.ASSOCIATEDPLANS,
  //   contentHeader: "Associate Plans",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  {
    id: "verifyMap",
    label: "Verify Map",
    path: MANAGE_MAPPER_ROUTES.VERIFY_AND_MAP_OUTPUT,
    contentHeader: "Verify Map",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "loadFilter",
    label: "Filter",
    path: MANAGE_MAPPER_ROUTES.OUTPUT_FILTER,
    contentHeader: "Filter",
    breadCrumbs: [],
    childRoutes: [],
  },
  // {
  //   id: "aggregate",
  //   label: "Aggregate",
  //   path: MANAGE_MAPPER_ROUTES.AGGREGATE,
  //   contentHeader: "Aggregate",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  // {
  //   id: "ruleset",
  //   label: "Ruleset",
  //   path: MANAGE_MAPPER_ROUTES.RULESET,
  //   contentHeader: "Ruleset",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  // {
  //   id: "scheduler",
  //   label: "Scheduler",
  //   path: MANAGE_MAPPER_ROUTES.SCHEDULER,
  //   contentHeader: "Scheduler",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  // {
  //   id: "reviewAndConfirm",
  //   label: "Review & Confirm",
  //   path: MANAGE_MAPPER_ROUTES.REVIEW_AND_CONFIRM,
  //   contentHeader: "Review & Confirm",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
];

export const MANAGE_MAPPER_MENU_PASSTHROUGH = [
  {
    id: "loadDefinitionHome",
    label: "Basic Information",
    contentHeader: "Basic Informationss",
    path: MANAGE_MAPPER_ROUTES.BASIC_INFORMATION,
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "loadDefinitionSource",
    label: "Source",
    path: MANAGE_MAPPER_ROUTES.SOURCE_LINK,
    contentHeader: "Source",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "fixedLength",
    label: "File Specifications",
    path: MANAGE_MAPPER_ROUTES.FIXED_LENGTH,
    contentHeader: "File Specifications",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "preview",
    label: "Preview",
    path: MANAGE_MAPPER_ROUTES.PREVIEW_LINK,
    contentHeader: "Preview",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "targetContainers",
    label: "Target",
    path: MANAGE_MAPPER_ROUTES.PASSTHROUGH_TARGET_LINK,
    contentHeader: "Target",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "mapAndTransform",
    label: "Map & Transform",
    path: MANAGE_MAPPER_ROUTES.MAP_AND_TRANSFORM_LINK,
    contentHeader: "Map & Transform",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "validations",
    label: "Validations",
    path: MANAGE_MAPPER_ROUTES.VALIDATIONS,
    contentHeader: "Validations",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "verifyMap",
    label: "Verify Map",
    path: MANAGE_MAPPER_ROUTES.VERIFY_AND_MAP_OUTPUT,
    contentHeader: "Verify Map",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "loadFilter",
    label: "Filter",
    path: MANAGE_MAPPER_ROUTES.OUTPUT_FILTER,
    contentHeader: "Filter",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "aggregate",
    label: "Aggregate",
    path: MANAGE_MAPPER_ROUTES.AGGREGATE,
    contentHeader: "Aggregate",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "split",
    label: "Split",
    path: MANAGE_MAPPER_ROUTES.SPLIT,
    contentHeader: "Split",
    breadCrumbs: [],
    childRoutes: [],
  },
  // {
  //   id: "ruleset",
  //   label: "Ruleset",
  //   path: MANAGE_MAPPER_ROUTES.RULESET,
  //   contentHeader: "Ruleset",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  // {
  //   id: "scheduler",
  //   label: "Scheduler",
  //   path: MANAGE_MAPPER_ROUTES.SCHEDULER,
  //   contentHeader: "Scheduler",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },

  // {
  //   id: "reviewAndConfirm",
  //   label: "Review & Confirm",
  //   path: MANAGE_MAPPER_ROUTES.REVIEW_AND_CONFIRM,
  //   contentHeader: "Review & Confirm",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
];

export const MANAGE_MAPPER_MENU = [
  {
    id: "loadDefinitionHome",
    label: "Basic Information",
    contentHeader: "Basic Information",
    path: MANAGE_MAPPER_ROUTES.BASIC_INFORMATION,
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "loadDefinitionSource",
    label: "Source",
    path: MANAGE_MAPPER_ROUTES.SOURCE_LINK,
    contentHeader: "Source",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "fixedLength",
    label: "File Specifications",
    path: MANAGE_MAPPER_ROUTES.FIXED_LENGTH,
    contentHeader: "File Specifications",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "targetContainers",
    label: "Target",
    path: MANAGE_MAPPER_ROUTES.TARGET_LINK,
    contentHeader: "Target",
    breadCrumbs: [],
    childRoutes: [],
  },
  // {
  //   id: "targetOutput",
  //   label: "Target",
  //   path: MANAGE_MAPPER_ROUTES.OUTPUT_TARGET,
  //   contentHeader: "Target",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  // {
  //   label: "Associate Plans",
  //   path: MANAGE_MAPPER_ROUTES.ASSOCIATEDPLANS,
  //   contentHeader: "Associate Plans",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  {
    id: "mapAndTransform",
    label: "Map & Transform",
    path: MANAGE_MAPPER_ROUTES.MAP_AND_TRANSFORM_LINK,
    contentHeader: "Map & Transform",
    breadCrumbs: [],
    childRoutes: [],
  },
  // {
  //   id: "validations",
  //   label: "Validations",
  //   path: MANAGE_MAPPER_ROUTES.VALIDATIONS,
  //   contentHeader: "Validations",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  {
    id: "verifyMap",
    label: "Verify Map",
    path: MANAGE_MAPPER_ROUTES.VERIFY_MAP,
    contentHeader: "Verify Map",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "loadFilter",
    label: "Filter",
    path: MANAGE_MAPPER_ROUTES.FILTER,
    contentHeader: "Filter",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "aggregate",
    label: "Aggregate",
    path: MANAGE_MAPPER_ROUTES.AGGREGATE,
    contentHeader: "Aggregate",
    breadCrumbs: [],
    childRoutes: [],
  },
  // {
  //   id: "split",
  //   label: "split",
  //   path: MANAGE_MAPPER_ROUTES.SPLIT,
  //   contentHeader: "split",
  //   breadCrumbs: [],
  //   childRoutes: [],
  // },
  {
    id: "ruleset",
    label: "Ruleset",
    path: MANAGE_MAPPER_ROUTES.RULESET,
    contentHeader: "Ruleset",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "scheduler",
    label: "Scheduler",
    path: MANAGE_MAPPER_ROUTES.SCHEDULER_LINK,
    contentHeader: "Scheduler",
    breadCrumbs: [],
    childRoutes: [],
  },
  {
    id: "reviewAndConfirm",
    label: "Review & Confirm",
    path: MANAGE_MAPPER_ROUTES.REVIEW_AND_CONFIRM,
    contentHeader: "Review & Confirm",
    breadCrumbs: [],
    childRoutes: [],
  },
];

export const ALL_MANAGE_MAPPER_ROUTES = [
  ...MANAGE_MAPPER_MENU,
  {
    id: "mapAndTransform",
    contentHeader: "Mapper",
    path: MANAGE_MAPPER_ROUTES.MAP_AND_TRANSFORM_LINK,
    breadCrumbs: [
      // {
      //   label: "Manage Reports",
      //   link: MANAGE_REPORTS_ROUTES.ELIGIBILITY_FILTER,
      // },
    ],
  },
];

export const manageMapperFormNames = {
  BASIC_INFORMATION: "basic_information",
  MAP_AND_TRANSFORM: "map_and_transform",
  MAP_AND_TRANSFORM_OUTPUT: "map-and-transform-output",
  AGGREGATE: "load_definition_aggregate",
  SOURCE: "load_definition_source",
  FILTER: "load_definition_filter",
  OUTPUT_FILTER: "output_filter",
  TARGET: "target",
  ASSOCIATEDPLANS: "associate_plans",
  RULESET: "ruleset",
  SCHEDULER: "scheduler",
  REVIEW_AND_CONFIRM: "review_and_confirm",
  OVERVIEW: "overview",
  FIXED_LENGTH: "fixed_length",
  OUTPUT_TARGET: "output_target",
  SPLITS: "splits",
};

export const mapperFormFields = {
  [manageMapperFormNames.BASIC_INFORMATION]: {
    mapName: "name",
    mapType: "mapType",
    dataModel: "dataModel",
    profileLevel: "profileLevel",
  },
  [manageMapperFormNames.MAP_AND_TRANSFORM_OUTPUT]: {
    header: "header",
    headerText: "headerText",
    value: "value",
    generate: "generate",
    field: "field",
    function: "function",
    valueSelect: "valueSelect",
    typeSetting: "typeSetting",
    from: "from",
    to: "to",
    fieldName: "fieldName",
    configureOption: "configureOption",
    fileNameOption: "fileNameOption",
    headerSelect: "headerSelect",
    value: "value",
    parameterType: "parameterType",
    headerName: "headerName",
  },
  [manageMapperFormNames.SOURCE]: {
    fileType: "fileType",
    uploadedFileType: "uploadedFileType",
    conversionType: "conversionType",
    fileFormat: "format",
    selectDataFrom: "selectDataFrom",
    hasHeader: "hasHeader",
    checkForHeaderCountMismatch: "checkForHeaderCountMismatch",
    contentStartsFrom: "contentStartsFrom",
    uploadSourceFile: "uploadSourceFile",
    sourceUrl: "sourceUrl",
    sourceUserName: "sourceUserName",
    sourcePassword: "sourcePassword",
    delimiter: "delimiter",
    spreadSheetNumber: "spreadSheetNumber",
    spreadSheetName: "spreadSheetName",
    recordLength: "recordLength",
    ftpUrl: "ftpUrl",
    sftpPortNumber: "sftpPortNumber",
    ftpPath: "ftpPath",
    username: "username",
    password: "password",
    requireFtp: "requireFtp",
    allowEmptyInputFile: "allowEmptyInputFile",
  },
  [manageMapperFormNames.FIXED_LENGTH]: {
    fieldName: "fieldName",
    from: "from",
    to: "to",
    length: "length",
    isSectionIndicator: "isSectionIndicator",
    isKey: "isKey",
    value: "value",
  },
  [manageMapperFormNames.SPLITS]: {
    filteredName: "filteredName",
    fileName: "fileName",
    configureOption: "configureOption",
    isSplitModel: "isSplitModel",
  },
  [manageMapperFormNames.OUTPUT_TARGET]: {
    fileType: "fileType",
    fileName: "fileName",
    fileFormat: "format",
    delimiter: "delimiter",
    hasHeader: "hasHeader",
    hasDefaultHeader: "hasDefaultHeader",
    defaultHeaderName: "defaultHeaderName",
    hasEncryption: "hasEncryption",
    key: "publicKey",
    contentStartsFrom: "contentStartsFrom",
    fileNameOption: "fileNameOption",
    ftpUrl: "ftpUrl",
    sftpPortNumber: "sftpPortNumber",
    ftpPath: "ftpPath",
    username: "username",
    password: "password",
    recordLength: "recordLength",
    requireFtp: "requireFtp",
    targetFields: "targetFields",
    configureOption: "configureOption",
  },
};

export const DataType = {
  1: "string",
  2: "number",
  3: "boolean",
  4: "date",
};

const EmployeeYOSChilds = [
  {
    id: uuid(),
    isCollection: false,
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 1,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "5812",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "YOS",
    propertyName: "YearsOfService",
    dataType: 2,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 2,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "10000",
  },
];
export const EmployeeClassificationGroup = [
  {
    id: uuid(),
    // id: 0,
    isCollection: false,
    displayName: "NAME",
    propertyName: "ClassificationName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    fieldOperations: [],
    sortOrder: 1,
    constantValue: "",
    dataSource: 1,
    datum: "Division",
  },
  {
    id: uuid(),
    // id: 1,
    isCollection: false,
    displayName: "VALUE",
    propertyName: "Code",
    dataType: 1,
    format: "",
    fieldOperations: [],
    sortOrder: 2,
    constantValue: "",
    dataSource: 1,
    datum: "Div",
  },
  {
    id: uuid(),
    // id: 3,
    isCollection: false,
    displayName: "START DATE",
    propertyName: "EffectiveStartDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldOperations: [],
    sortOrder: 3,
    constantValue: "",
    dataSource: 1,
    datum: "08/01/2021",
  },
  {
    id: uuid(),
    // id: 4,
    isCollection: false,
    displayName: "END DATE",
    propertyName: "EffectiveEndDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldOperations: [],
    sortOrder: 4,
    constantValue: "",
    dataSource: 4,
    datum: "09/01/2023",
  },
];
export const CensusFilterData = [
  {
    id: uuid(),
    id: 0,
    order: 0,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "EMPLOYEE ID",
    propertyName: "EmployeeNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "MQD1",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 1,
    order: 1,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "SSN",
    propertyName: "UniquePersonalIdentification",
    dataType: 1,
    format: "XXX-XXX-XXX",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "175-74-8973",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 2,
    order: 2,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "1690",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 3,
    order: 3,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "FIRST NAME",
    propertyName: "FirstName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 1,
    datum: "JENNIFER",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 4,
    order: 4,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "LAST NAME",
    propertyName: "LastName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 1,
    datum: "RORY",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 5,
    order: 5,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "MIDDLE NAME",
    propertyName: "MiddleName",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 50,
    datum: "A",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 6,
    order: 6,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "GENDER",
    propertyName: "Gender",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 15,
    datum: "F",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 7,
    order: 7,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "MARITAL STATUS",
    propertyName: "MaritalStatus",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 15,
    datum: "M",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 8,
    order: 8,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "BIRTH DATE",
    propertyName: "BirthDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 1,
    datum: "1/1/1980",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 9,
    order: 9,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ADDRESS 1",
    propertyName: "Address1",
    dataType: 1,
    format: "",
    fieldLength: 150,
    sortOrder: 2,
    datum: "2117 W. 81ST ST. , TRLR 3",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 10,
    order: 10,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ADDRESS 2",
    propertyName: "Address2",
    dataType: 1,
    format: "",
    sortOrder: 2,
    fieldLength: 150,
    datum: "Suite Ccc",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 11,
    order: 11,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "CITY",
    propertyName: "City",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "ODESSA",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 12,
    order: 12,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "COUNTRY",
    propertyName: "Country",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "USA",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 13,
    order: 13,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "STATE",
    propertyName: "State",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "IN",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 14,
    order: 14,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ZIP CODE",
    propertyName: "ZipCode",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "46227",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 16,
    order: 16,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "PHONE NUMBER",
    propertyName: "MobilePhoneNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "(850) 564-2113",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 15,
    order: 15,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "COUNTRY CODE INDICATOR PRIMARY",
    propertyName: "CountryCodeIndicatorPrimary",
    dataType: 1,
    format: "",
    fieldLength: 2,
    sortOrder: 2,
    datum: "US",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 18,
    id: 16,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "SECONDARY PHONE NUMBER",
    propertyName: "WorkPhoneNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "(893) 504-3572",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 17,
    order: 17,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "COUNTRY CODE INDICATOR SECONDARY",
    propertyName: "CountryCodeIndicatorSecondary",
    dataType: 1,
    format: "",
    fieldLength: 2,
    sortOrder: 2,
    datum: "US",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 19,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "EMAIL ADDRESS",
    propertyName: "PrimaryEmailAddress",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 2,
    datum: "vineeeforeman@zentia.com",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 18,
    order: 18,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Hire Date",
    propertyName: "HireDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "4/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 19,
    order: 19,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Most Recent Term Date",
    propertyName: "TerminationDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "6/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 20,
    order: 20,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Most Recent Rehire Date",
    propertyName: "ReHireDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 21,
    order: 21,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Leave Start Date",
    propertyName: "LeaveStartDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/22/1998",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 22,
    order: 22,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Leave End Date",
    propertyName: "LeaveEndDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/28/1998",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 23,
    order: 23,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Payroll Frequency",
    propertyName: "PayrollFrequencyName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "M",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 25,
    order: 25,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "HCE Indicator",
    propertyName: "HCEIndicator",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "Y",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 32,
    order: 32,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "HPI Year",
    propertyName: "HPIYear",
    dataType: 2,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: 2025,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 26,
    order: 26,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Employment Status Code",
    propertyName: "EmploymentStatus",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 3,
    datum: "P",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 27,
    order: 27,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Pay Date",
    propertyName: "PayDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "8/27/2020",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 28,
    order: 28,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: EmployeeClassificationGroup,
    groupName: "Employee Classification",
    propertyName: "EmployeeClassifications",
    dataType: 2,
    format: "",
    fieldLength: 150,
    sortOrder: 4,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  // {
  //   id: uuid(),
  //   isCollection: false,
  //   groupName: "Hours",
  //   displayName: "Hours",
  //   propertyName: "PayPeriodHours",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 4,
  // },
  {
    id: uuid(),
    id: 29,
    order: 29,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours",
    displayName: "Pay Period Hours",
    propertyName: "PayPeriodHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 5,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 30,
    order: 30,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours",
    displayName: "YTD Hours",
    propertyName: "YTDHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 5,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 31,
    order: 0,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Others",
    displayName: "Notes",
    propertyName: "Comment",
    dataType: 1,
    format: "",
    fieldLength: 0,
    sortOrder: 1,
    datum: "This is a Note",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
];

export const CensusAndPayrollFilterData = [
  {
    id: uuid(),
    isFilter: "no",
    id: 0,
    order: 0,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "EMPLOYEE ID",
    propertyName: "EmployeeNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "MQD1",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 1,
    order: 1,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "SSN",
    propertyName: "UniquePersonalIdentification",
    dataType: 1,
    format: "XXX-XXX-XXX",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "175-74-8973",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 2,
    order: 2,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "1690",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 3,
    order: 3,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "FIRST NAME",
    propertyName: "FirstName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 1,
    datum: "JACKSON",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 4,
    order: 4,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "LAST NAME",
    propertyName: "LastName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 1,
    datum: "RORY",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 5,
    order: 5,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "MIDDLE NAME",
    propertyName: "MiddleName",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 50,
    datum: "A",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 6,
    order: 6,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "GENDER",
    propertyName: "Gender",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 15,
    datum: "F",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 7,
    order: 7,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "MARITAL STATUS",
    propertyName: "MaritalStatus",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 15,
    datum: "M",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 8,
    order: 8,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "BIRTH DATE",
    propertyName: "BirthDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 1,
    datum: "1/1/1980",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 9,
    order: 9,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ADDRESS 1",
    propertyName: "Address1",
    dataType: 1,
    format: "",
    fieldLength: 150,
    sortOrder: 2,
    datum: "2117 W. 81ST ST. , TRLR 3",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 10,
    order: 10,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ADDRESS 2",
    propertyName: "Address2",
    dataType: 1,
    format: "",
    sortOrder: 2,
    fieldLength: 150,
    datum: "Suite Ccc",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 11,
    order: 11,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "CITY",
    propertyName: "City",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "ODESSA",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 12,
    order: 12,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "COUNTRY",
    propertyName: "Country",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "USA",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 13,
    order: 13,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "STATE",
    propertyName: "State",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "IN",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 14,
    order: 14,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ZIP CODE",
    propertyName: "ZipCode",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "46227",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 15,
    order: 15,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "PHONE NUMBER",
    propertyName: "MobilePhoneNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "(850) 564-2113",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 16,
    order: 16,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "SECONDARY PHONE NUMBER",
    propertyName: "WorkPhoneNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "(893) 504-3572",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 17,
    order: 17,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "EMAIL ADDRESS",
    propertyName: "PrimaryEmailAddress",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 2,
    datum: "vineeeforeman@zentia.com",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 18,
    order: 18,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Hire Date",
    propertyName: "HireDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "4/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 19,
    order: 19,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Most Recent Term Date",
    propertyName: "TerminationDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "6/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 20,
    order: 20,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Most Recent Rehire Date",
    propertyName: "ReHireDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 21,
    order: 21,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Leave Start Date",
    propertyName: "LeaveStartDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/22/98",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 22,
    order: 22,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Leave End Date",
    propertyName: "LeaveEndDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/28/1998",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 23,
    order: 23,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Payroll Frequency",
    propertyName: "PayrollFrequencyName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "M",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 24,
    order: 24,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "HCE Indicator",
    propertyName: "HCEIndicator",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "Y",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 32,
    order: 32,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "HPI Year",
    propertyName: "HPIYear",
    dataType: 2,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: 2025,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 25,
    order: 25,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Employment Status Code",
    propertyName: "EmploymentStatus",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 3,
    datum: "P",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 26,
    order: 26,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Pay Date",
    propertyName: "PayDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "8/27/2020",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 27,
    order: 27,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Officer Indicator",
    propertyName: "OfficerIndicator",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "Yes",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 28,
    order: 28,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "Annual Salary",
    propertyName: "AnnualSalary",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 4,
    datum: "1000",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  // {
  //   id: uuid(),
  //   isFilter: "no",
  //   id: 29,
  //   order: 29,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Hours and Compensation",
  //   displayName: "Deferral %",
  //   propertyName: "DeferralPercentage",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 4,
  //   datum: "5",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  // {
  //   id: uuid(),
  //   isFilter: "no",
  //   id: 30,
  //   order: 30,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Hours and Compensation",
  //   displayName: "Match %",
  //   propertyName: "MatchPercentage",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 4,
  //   datum: "5",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  {
    id: uuid(),
    isFilter: "no",
    id: 31,
    order: 31,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "Pay Period Hours",
    propertyName: "PayPeriodHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 4,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    id: 32,
    order: 32,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "YTD Hours",
    propertyName: "YTDHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 4,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 33,
    order: 33,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Others",
    displayName: "Notes",
    propertyName: "Comment",
    dataType: 1,
    format: "",
    fieldLength: 0,
    sortOrder: 1,
    datum: "This is a Note",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },

  //For Filters not for Map AndTransform

  ///collection
  // {
  //   id: uuid(),
  //   id: 38,
  //   // isFilter : "Yes",
  //   order: 38,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: true,
  //   isCollectionStart: true,
  //   isCollectionEnd: true,
  //   childObjectMaps: EmployeeClassificationGroup,
  //   groupName: "Employee Classification",
  //   propertyName: "EmployeeClassifications",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 150,
  //   sortOrder: 5,
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  // {
  //   id: uuid(),
  //   id: 39,
  //   // isFilter : "Yes",
  //   order: 39,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: true,
  //   isCollectionStart: true,
  //   isCollectionEnd: true,
  //   childObjectMaps: CompenstionChilds,
  //   groupName: "Compensation",
  //   propertyName: "Compensations",
  //   dataType: 1,
  //   format: "",
  //   fieldLength: 15,
  //   sortOrder: 6,
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  // {
  //   id: uuid(),
  //   id: 40,
  //   // isFilter : "Yes",
  //   order: 40,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: true,
  //   isCollectionStart: true,
  //   isCollectionEnd: true,
  //   childObjectMaps: ContributionChilds,
  //   groupName: "Contribution",
  //   propertyName: "Contributions",
  //   dataType: 1,
  //   format: "",
  //   fieldLength: 15,
  //   sortOrder: 7,
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  // {
  //   id: uuid(),
  //   id: 41,
  //   order: 41,
  //   selected: false,
  //   // isFilter : "Yes",
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: true,
  //   isCollectionStart: true,
  //   isCollectionEnd: true,
  //   childObjectMaps: PayrollLoanChilds,
  //   groupName: "Loan",
  //   propertyName: "PayrollLoans",
  //   dataType: 1,
  //   format: "",
  //   fieldLength: 15,
  //   sortOrder: 8,
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
];

const CompenstionChilds = [
  {
    id: uuid(),
    isCollection: false,
    displayName: "NAME",
    propertyName: "CompensationType",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 1,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "Gross Compensation",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "PAY PERIOD AMOUNT",
    propertyName: "PayPeriodAmount",
    dataType: 2,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 2,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "10000",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "YTD AMOUNT",
    propertyName: "YTDAmount",
    dataType: 2,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 2,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "10000",
  },
];
const FundingBankInformationChilds = [
  {
    id: uuid(),
    isCollection: false,
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 1,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "1690",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "BANK ACCOUNT NUMBER",
    propertyName: "BankAccountNumber",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 2,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "123456789",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "ABA ROUTING NUMBER",
    propertyName: "ABARoutingNumber",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 3,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "123456789",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "BANK NAME",
    propertyName: "BankName",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 4,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "Bank of America",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "FUNDING METHOD",
    propertyName: "FundingMethod",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 5,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "ACH Debit",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 6,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "1690",
  },
];
const ContributionChilds = [
  {
    id: uuid(),
    isCollection: false,
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 1,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "1690",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "NAME",
    propertyName: "SourceName",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 2,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "PreTax",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "PAY PERIOD AMOUNT",
    propertyName: "ContributionAmount",
    dataType: 2,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 3,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "500",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "YTD AMOUNT",
    propertyName: "YTDContributionAmount",
    dataType: 2,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 4,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "500",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "DEFERRAL TYPE",
    propertyName: "DeferralType",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 5,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "Dollar",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "DEFERRAL RATE",
    propertyName: "DeferralRate",
    dataType: 2,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 6,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "50",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "ELIGIBILITY INDICATOR",
    propertyName: "EligibilityIndicator",
    dataType: 1,
    format: "",
    fieldLength: 17,
    path: null,
    sortOrder: 7,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "50",
  },
];

const PayrollLoanChilds = [
  {
    id: uuid(),
    isCollection: false,
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 1,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "1690",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "LOAN ID",
    propertyName: "LoanNumber",
    dataType: 1,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 2,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "01",
  },
  {
    id: uuid(),
    isCollection: false,
    displayName: "LOAN REPAYMENT",
    propertyName: "RepaymentAmount",
    dataType: 2,
    format: "",
    fieldLength: 0,
    path: null,
    sortOrder: 3,
    index: null,
    constantValue: "",
    dataSource: 1,
    datum: "250",
  },
];
export const PayrollFilterData = [
  {
    id: uuid(),
    id: 0,
    order: 0,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "SSN",
    propertyName: "UniquePersonalIdentification",
    dataType: 1,
    format: "XXX-XXX-XXX",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "175-74-8973",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 1,
    order: 1,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "1690",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 2,
    id: 2,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Pay Date",
    propertyName: "PayDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 2,
    datum: "8/27/2020",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 3,
    id: 3,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "Annual Salary",
    propertyName: "AnnualSalary",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 3,
    datum: "1000",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  // {
  //   id: uuid(),
  //   order: 4,
  //   isFilter: "no",
  //   id: 4,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Hours and Compensation",
  //   displayName: "Deferral %",
  //   propertyName: "DeferralPercentage",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 3,
  //   datum: "5",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  // {
  //   id: uuid(),
  //   order: 5,
  //   id: 5,
  //   isFilter: "no",
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Hours and Compensation",
  //   displayName: "Match %",
  //   propertyName: "MatchPercentage",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 3,
  //   datum: "5",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  {
    id: uuid(),
    order: 6,
    id: 6,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "Pay Period Hours",
    propertyName: "PayPeriodHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 3,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 7,
    id: 7,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "YTD Hours",
    propertyName: "YTDHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 3,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 8,
    order: 8,
    // isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: ContributionChilds,
    groupName: "Contribution",
    propertyName: "Contributions",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 4,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 9,
    id: 9,
    // isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: CompenstionChilds,
    groupName: "Compensation",
    propertyName: "Compensations",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 6,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 10,
    id: 10,
    // isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: PayrollLoanChilds,
    groupName: "Loan",
    propertyName: "PayrollLoans",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 8,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 11,
    order: 11,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Others",
    displayName: "Notes",
    propertyName: "Comment",
    dataType: 1,
    format: "",
    fieldLength: 0,
    sortOrder: 9,
    datum: "This is a Note",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 12,
    id: 9,
    // isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: EmployeeYOSChilds,
    groupName: "EmployeeYOS",
    propertyName: "EmployeeYOSs",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 10,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 13,
    order: 13,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: FundingBankInformationChilds,
    groupName: "Funding Bank Information",
    propertyName: "FundingBankInformations",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 10,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
];

export const CensusAndPayroll = [
  {
    id: uuid(),
    isFilter: "no",
    // id: 0,
    order: 0,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "EMPLOYEE ID",
    propertyName: "EmployeeNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "MQD1",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 1,
    order: 1,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "SSN",
    propertyName: "UniquePersonalIdentification",
    dataType: 1,
    format: "XXXXXXXXX",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "XXXXX8973",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 2,
    order: 2,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    // format: "XXX-XXX-XXX",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "AC10",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 3,
    order: 3,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "FIRST NAME",
    propertyName: "FirstName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 1,
    datum: "JACKSON",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 4,
    order: 4,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "LAST NAME",
    propertyName: "LastName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 1,
    datum: "RORY",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 5,
    order: 5,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "MIDDLE NAME",
    propertyName: "MiddleName",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 50,
    datum: "A",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 6,
    order: 6,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "GENDER",
    propertyName: "Gender",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 15,
    datum: "F",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 7,
    order: 7,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "MARITAL STATUS",
    propertyName: "MaritalStatus",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 15,
    datum: "M",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 8,
    order: 8,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "BIRTH DATE",
    propertyName: "BirthDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 1,
    datum: "1/1/1980",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 9,
    order: 9,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ADDRESS 1",
    propertyName: "Address1",
    dataType: 1,
    format: "",
    fieldLength: 150,
    sortOrder: 2,
    datum: "2117 W. 81ST ST. , TRLR 3",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 10,
    order: 10,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ADDRESS 2",
    propertyName: "Address2",
    dataType: 1,
    format: "",
    sortOrder: 2,
    fieldLength: 150,
    datum: "Suite Ccc",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 11,
    order: 11,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "CITY",
    propertyName: "City",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "ODESSA",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 12,
    order: 12,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "COUNTRY",
    propertyName: "Country",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "USA",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 13,
    order: 13,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "STATE",
    propertyName: "State",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "IN",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 14,
    order: 14,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ZIP CODE",
    propertyName: "ZipCode",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "46227",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 15,
    order: 15,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "COUNTRY CODE INDICATOR PRIMARY",
    propertyName: "CountryCodeIndicatorPrimary",
    dataType: 1,
    format: "",
    fieldLength: 2,
    sortOrder: 2,
    datum: "US",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 15,
    order: 16,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "PHONE NUMBER",
    propertyName: "MobilePhoneNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "(850) 564-2113",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    id: 17,
    order: 17,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "COUNTRY CODE INDICATOR SECONDARY",
    propertyName: "CountryCodeIndicatorSecondary",
    dataType: 1,
    format: "",
    fieldLength: 2,
    sortOrder: 2,
    datum: "US",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 16,
    order: 18,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "SECONDARY PHONE NUMBER",
    propertyName: "WorkPhoneNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "(893) 504-3572",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 17,
    order: 19,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "EMAIL ADDRESS",
    propertyName: "PrimaryEmailAddress",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 2,
    datum: "vineeeforeman@zentia.com",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 18,
    order: 18,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "HIRE DATE",
    propertyName: "HireDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "4/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 19,
    order: 19,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "MOST RECENT TERM DATE",
    propertyName: "TerminationDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "6/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 20,
    order: 20,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "MOST RECENT REHIRE DATE",
    propertyName: "ReHireDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 21,
    order: 21,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "LEAVE START DATE",
    propertyName: "LeaveStartDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/22/98",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 22,
    order: 22,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "LEAVE END DATE",
    propertyName: "LeaveEndDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/28/1998",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 23,
    order: 23,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "PAYROLL FREQUENCY",
    propertyName: "PayrollFrequencyName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "M",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 24,
    order: 24,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "HCE INDICATOR",
    propertyName: "HCEIndicator",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "Y",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 24,
    order: 24,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "HPI YEAR",
    propertyName: "HPIYear",
    dataType: 2,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: 2025,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 25,
    order: 25,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "EMPLOYMENT STATUS CODE",
    propertyName: "EmploymentStatus",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 3,
    datum: "A",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 26,
    order: 26,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "PAY DATE",
    propertyName: "PayDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "8/27/2020",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 27,
    order: 27,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "OFFICER INDICATOR",
    propertyName: "OfficerIndicator",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "Yes",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 28,
    order: 28,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "ANNUAL SALARY",
    propertyName: "AnnualSalary",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 4,
    datum: "1000",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  // {
  //   id: uuid(),
  //   isFilter: "no",
  //   // id: 29,
  //   order: 29,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Hours and Compensation",
  //   displayName: "DEFERRAL %",
  //   propertyName: "DeferralPercentage",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 4,
  //   datum: "5",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  // {
  //   id: uuid(),
  //   isFilter: "no",
  //   // id: 30,
  //   order: 30,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Hours and Compensation",
  //   displayName: "MATCH %",
  //   propertyName: "MatchPercentage",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 4,
  //   datum: "5",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  {
    id: uuid(),
    isFilter: "no",
    // id: 31,
    order: 31,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "PAY PERIOD HOURS",
    propertyName: "PayPeriodHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 4,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "no",
    // id: 32,
    order: 32,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "YTD HOURS",
    propertyName: "YTDHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 4,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },

  ///collection
  {
    id: uuid(),
    // id: 35,
    // isFilter : "Yes",
    order: 35,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: EmployeeClassificationGroup,
    groupName: "Employee Classification",
    propertyName: "EmployeeClassifications",
    dataType: 2,
    format: "",
    fieldLength: 150,
    sortOrder: 5,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    // id: 36,
    // isFilter : "Yes",
    order: 36,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: CompenstionChilds,
    groupName: "Compensation",
    propertyName: "Compensations",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 6,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    // id: 37,
    // isFilter : "Yes",
    order: 37,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: ContributionChilds,
    groupName: "Contribution",
    propertyName: "Contributions",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 7,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    // id: 38,
    order: 38,
    selected: false,
    // isFilter : "Yes",
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: PayrollLoanChilds,
    groupName: "Loan",
    propertyName: "PayrollLoans",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 8,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    // id: 39,
    order: 39,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Others",
    displayName: "Notes",
    propertyName: "Comment",
    dataType: 1,
    format: "",
    fieldLength: 0,
    sortOrder: 1,
    datum: "This is a Note",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    // id: 36,
    // isFilter : "Yes",
    order: 40,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: EmployeeYOSChilds,
    groupName: "EmployeeYOS",
    propertyName: "EmployeeYOSs",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 6,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 41,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: FundingBankInformationChilds,
    groupName: "Funding Bank Information",
    propertyName: "FundingBankInformations",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 10,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
];

export const Payroll = [
  {
    id: uuid(),
    order: 0,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "SSN",
    propertyName: "UniquePersonalIdentification",
    dataType: 1,
    format: "XXX-XXX-XXX",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "175-74-8973",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 1,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "1690",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 2,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Pay Date",
    propertyName: "PayDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 2,
    datum: "8/27/2020",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 4,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "Annual Salary",
    propertyName: "AnnualSalary",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 3,
    datum: "1000",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  // {
  //   id: uuid(),
  //   order: 5,
  //   isFilter: "no",
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Hours and Compensation",
  //   displayName: "Deferral %",
  //   propertyName: "DeferralPercentage",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 3,
  //   datum: "5",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  // {
  //   id: uuid(),
  //   order: 6,
  //   isFilter: "no",
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Hours and Compensation",
  //   displayName: "Match %",
  //   propertyName: "MatchPercentage",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 3,
  //   datum: "5",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  {
    id: uuid(),
    order: 7,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "Pay Period Hours",
    propertyName: "PayPeriodHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 3,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 8,
    isFilter: "no",
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours and Compensation",
    displayName: "YTD Hours",
    propertyName: "YTDHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 3,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 9,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: ContributionChilds,
    groupName: "Contribution",
    propertyName: "Contributions",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 4,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 10,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: CompenstionChilds,
    groupName: "Compensation",
    propertyName: "Compensations",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 6,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 11,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: PayrollLoanChilds,
    groupName: "Loan",
    propertyName: "PayrollLoans",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 8,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 12,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Others",
    displayName: "Notes",
    propertyName: "Comment",
    dataType: 1,
    format: "",
    fieldLength: 0,
    sortOrder: 1,
    datum: "This is a Note",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 13,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: EmployeeYOSChilds,
    groupName: "EmployeeYOS",
    propertyName: "EmployeeYOSs",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 6,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 14,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: FundingBankInformationChilds,
    groupName: "Funding Bank Information",
    propertyName: "FundingBankInformations",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 10,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
];

export const fileMetaData = [
  {
    //id: 0,
    id: uuid(),
    displayName: "Plan Name",
    propertyName: "PlanName",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "ABC",
  },
  {
    // id: 1,
    id: uuid(),
    displayName: "Plan Id",
    propertyName: "ContractId",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "345",
  },

  {
    // id: 2,
    id: uuid(),
    displayName: "File Creation DateTime",
    propertyName: "FileCreateDt",
    dataType: 3,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "2022-11-30T08:33:55",
  },

  {
    // id: 3,
    id: uuid(),
    displayName: "Indicator",
    propertyName: "IsTest",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "true",
  },
  {
    // id: 4,
    id: uuid(),
    displayName: "Payroll Date",
    propertyName: "PayrollDate",
    dataType: 3,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "12/09/2000",
  },
  {
    //id: 5,
    id: uuid(),
    displayName: "Sub Id",
    propertyName: "SubId",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "567",
  },
  {
    //id: 6,
    id: uuid(),
    displayName: "Total Payroll Amount",
    propertyName: "TotalPayrollAmount",
    dataType: 2,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "10000",
  },
  {
    // id: 7,
    id: uuid(),
    displayName: "ACH Number",
    propertyName: "ACHNumber",
    dataType: 2,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "100",
  },
  {
    // id: 8,
    id: uuid(),
    displayName: "File Name",
    propertyName: "FileName",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "File",
  },
  {
    // id: 9,
    id: uuid(),
    displayName: "Total Contribution",
    propertyName: "TotalContribution",
    dataType: 2,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "2000",
  },
  // {
  //   id: 10,
  //   id: uuid(),
  //   displayName: "Total Compensation",
  //   propertyName: "TotalCompensation",
  //   dataType: 1,
  //   format: "",
  //   fieldLength: 15,
  //   sortOrder: 1,
  //   datum: "1000",
  // },
];

export const passthroughFileMetaData = (fileName = null) => {
  return [
    {
      id: 0,
      id: uuid(),
      displayName: "File Creation DateTime",
      propertyName: "FileCreateDt",
      dataType: 3,
      format: "",
      fieldLength: 15,
      sortOrder: 1,
      datum: moment(new Date())?.format("MM/DD/yyyy HH:mm:ss")?.toString(),
    },

    {
      id: 1,
      id: uuid(),
      displayName: "File Name",
      propertyName: "FileName",
      dataType: 1,
      format: "",
      fieldLength: 15,
      sortOrder: 1,
      datum: fileName ?? "File",
    },
  ];
};

export const Census = [
  {
    id: uuid(),

    order: 0,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "EMPLOYEE ID",
    propertyName: "EmployeeNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    datum: "MQD1",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 1,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "SSN",
    propertyName: "UniquePersonalIdentification",
    dataType: 1,
    format: "XXXXXXXXX",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "XXXXX8973",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 2,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "RK PLAN NUMBER",
    propertyName: "RKPlanNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 1,
    isRequired: true,
    datum: "1690",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 3,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "FIRST NAME",
    propertyName: "FirstName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 1,
    datum: "JENNIFER",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 4,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "LAST NAME",
    propertyName: "LastName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 1,
    datum: "RORY",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 5,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "MIDDLE NAME",
    propertyName: "MiddleName",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 50,
    datum: "A",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 6,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "GENDER",
    propertyName: "Gender",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 15,
    datum: "F",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 7,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "MARITAL STATUS",
    propertyName: "MaritalStatus",
    dataType: 1,
    format: "",
    sortOrder: 1,
    fieldLength: 15,
    datum: "M",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 8,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Personal Information",
    displayName: "BIRTH DATE",
    propertyName: "BirthDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 1,
    datum: "1/1/1980",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 9,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ADDRESS 1",
    propertyName: "Address1",
    dataType: 1,
    format: "",
    fieldLength: 150,
    sortOrder: 2,
    datum: "2117 W. 81ST ST. , TRLR 3",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 10,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ADDRESS 2",
    propertyName: "Address2",
    dataType: 1,
    format: "",
    sortOrder: 2,
    fieldLength: 150,
    datum: "Suite Ccc",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 11,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "CITY",
    propertyName: "City",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "ODESSA",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 12,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "COUNTRY",
    propertyName: "Country",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "USA",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 13,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "STATE",
    propertyName: "State",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "IN",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 14,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "ZIP CODE",
    propertyName: "ZipCode",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "46227",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 15,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "PHONE NUMBER",
    propertyName: "MobilePhoneNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "(850) 564-2113",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 16,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "SECONDARY PHONE NUMBER",
    propertyName: "WorkPhoneNumber",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 2,
    datum: "(893) 504-3572",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 17,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Contact Information",
    displayName: "EMAIL ADDRESS",
    propertyName: "PrimaryEmailAddress",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 2,
    datum: "vineeeforeman@zentia.com",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 18,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Hire Date",
    propertyName: "HireDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "4/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 19,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Most Recent Term Date",
    propertyName: "TerminationDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "6/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 20,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Most Recent Rehire Date",
    propertyName: "ReHireDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/4/2018",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 21,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Leave Start Date",
    propertyName: "LeaveStartDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/22/1998",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 22,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Leave End Date",
    propertyName: "LeaveEndDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "12/28/1998",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 23,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Payroll Frequency",
    propertyName: "PayrollFrequencyName",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "M",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 25,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "HCE Indicator",
    propertyName: "HCEIndicator",
    dataType: 1,
    format: "",
    fieldLength: 50,
    sortOrder: 3,
    datum: "Y",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 26,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Employment Status Code",
    propertyName: "EmploymentStatus",
    dataType: 1,
    format: "",
    fieldLength: 15,
    sortOrder: 3,
    datum: "P",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 28,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Employment & Age Details",
    displayName: "Pay Date",
    propertyName: "PayDate",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 3,
    datum: "8/27/2020",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 29,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: true,
    isCollectionStart: true,
    isCollectionEnd: true,
    childObjectMaps: EmployeeClassificationGroup,
    groupName: "Employee Classification",
    propertyName: "EmployeeClassifications",
    dataType: 2,
    format: "",
    fieldLength: 150,
    sortOrder: 4,
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  // {
  //   id: uuid(),
  //   isCollection: false,
  //   groupName: "Hours",
  //   displayName: "Hours",
  //   propertyName: "PayPeriodHours",
  //   dataType: 2,
  //   format: "",
  //   fieldLength: 0,
  //   sortOrder: 4,
  // },
  {
    id: uuid(),
    order: 30,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours",
    displayName: "Pay Period Hours",
    propertyName: "PayPeriodHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 5,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 31,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Hours",
    displayName: "YTD Hours",
    propertyName: "YTDHours",
    dataType: 2,
    format: "",
    fieldLength: 0,
    sortOrder: 5,
    datum: "100",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    order: 32,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    groupName: "Others",
    displayName: "Notes",
    propertyName: "Comment",
    dataType: 1,
    format: "",
    fieldLength: 0,
    sortOrder: 1,
    datum: "This is a Note",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
];

// export const TargetFields = [

//   // {
//   //   id: 36,
//   //   isCollection: true,
//   //   groupName: "Contribution",
//   //   displayName: "RKPlanNumber",
//   //   propertyName: "RKPlanNumber",
//   //   dataType: DataType[1],
//   //   format: "",
//   //   fieldLength: 15,
//   // },
//   // {
//   //   id: 37,
//   //   isCollection: true,
//   //   groupName: "Contribution",
//   //   displayName: "Name",
//   //   propertyName: "ContributionName",
//   //   dataType: DataType[1],
//   //   format: "",
//   //   fieldLength: 0,
//   // },
//   // {
//   //   id: 38,
//   //   isCollection: true,
//   //   groupName: "Contribution",
//   //   displayName: "Amount",
//   //   propertyName: "ContributionAmount",
//   //   dataType: DataType[2],
//   //   format: "",
//   //   fieldLength: 0,
//   // },

//   // {
//   //   id: 42,
//   //   isCollection: true,
//   //   groupName: "Loan",
//   //   displayName: "RK Plan Number",
//   //   propertyName: "RKPlanNumber",
//   //   dataType: DataType[1],
//   //   format: "",
//   //   fieldLength: 15,
//   // },
//   // {
//   //   id: 43,
//   //   isCollection: true,
//   //   groupName: "Loan",
//   //   displayName: "Loan Id",
//   //   propertyName: "LoanNumber",
//   //   dataType: DataType[1],
//   //   format: "",
//   //   fieldLength: 0,
//   // },
//   // {
//   //   id: 44,
//   //   isCollection: true,
//   //   groupName: "Loan",
//   //   displayName: "Loan Repayment",
//   //   propertyName: "RepaymentAmount",
//   //   dataType: DataType[2],
//   //   format: "",
//   //   fieldLength: 0,
//   // },
//   // {
//   //   id: 45,
//   //   isCollection: true,
//   //   groupName: "Custom Fields",
//   // },
// ];

// export const MappingInformation = TargetFields.reduce((res, data) => {
//   if (!res[data.groupName]) {
//     res[data.groupName] = [];
//   }
//   res[data.groupName].push(data);
//   return res;
// }, {});

export const stringOptions = [
  {
    value: 0,
    label: "Is Not Null",
  },
  {
    value: 1,
    label: "Is Null",
  },
  {
    value: 2,
    label: "Between",
  },
  {
    value: 3,
    label: "Is equal to",
  },
  {
    value: 4,
    label: "Contains",
  },
  {
    value: 5,
    label: "Starts With",
  },
  {
    value: 6,
    label: "Ends With",
  },
  {
    value: 7,
    label: "In",
  },
  {
    value: 8,
    label: "Length Equal to",
  },
  {
    value: 9,
    label: "Length Greater than",
  },
  {
    value: 10,
    label: "Length Greater than or equal to",
  },
  {
    value: 11,
    label: "Length Lesser than or equal to",
  },
  {
    value: 12,
    label: "Greater than",
  },
  {
    value: 13,
    label: "Lesser than",
  },
  {
    value: 14,
    label: "Greater than or equal to",
  },
  {
    value: 15,
    label: "Lesser than or equal to",
  },
];

export const numericOptions = [
  {
    value: 0,
    label: "Is Not Null",
  },
  {
    value: 1,
    label: "Is Null",
  },
  {
    value: 2,
    label: "Between",
  },
  {
    value: 3,
    label: "Is equal to",
  },
  {
    value: 4,
    label: "Length Equal to",
  },
  {
    value: 5,
    label: "Length Greater than",
  },
  {
    value: 6,
    label: "Length Lesser than",
  },
  {
    value: 7,
    label: "Length Greater than or equal to",
  },
  {
    value: 8,
    label: "Length Lesser than or equal to",
  },
  {
    value: 9,
    label: "Greater than",
  },
  {
    value: 10,
    label: "Lesser than",
  },
  {
    value: 11,
    label: "Greater than or equal to",
  },
  {
    value: 12,
    label: "Lesser than or equal to",
  },
];

export const dateOptions = [
  {
    value: 0,
    label: "Is Not Null",
  },
  {
    value: 1,
    label: "Is Null",
  },
  {
    value: 2,
    label: "Between",
  },
  {
    value: 3,
    label: "Is equal to",
  },
  {
    value: 4,
    label: "Greater than",
  },
  {
    value: 5,
    label: "Lesser than",
  },
  {
    value: 6,
    label: "Greater than or equal to",
  },
  {
    value: 7,
    label: "Lesser than or equal to",
  },
];

export const sourceTypeData = [
  {
    label: "File",
    value: 1,
  },
  // {
  //   label: "API",
  //   value: 2,
  // },
];

export const fileFormatData = [
  {
    label: "Excel",
    value: 3,
  },
  {
    label: "CSV",
    value: 1,
  },
  {
    label: "Fixed Width",
    value: 2,
  },
];

export const PassthorughfileFormatData = [
  {
    label: "Excel",
    value: 3,
  },
  {
    label: "CSV",
    value: 1,
  },
  {
    label: "Fixed Width",
    value: 2,
  },
];

export const PassthorughTargetfileFormatData = [
  {
    label: "Excel",
    value: 3,
  },
  {
    label: "CSV",
    value: 1,
  },
  {
    label: "Txt",
    value: 14,
  },
];
export const filterCondition = [
  {
    label: "All",
    value: "And",
  },
  {
    label: "Any",
    value: "Or",
  },
  {
    label: "Not",
    value: "Not",
  },
];

export const FilterConditionCategory = {
  EmployeeClassifications: [
    {
      label: "Classification Type Name",
      dataType: "string",
      propertyName: "ClassificationName",
      value: 1,
    },
    {
      label: "Classification code",
      dataType: "string",
      propertyName: "Code",
      value: 2,
    },
    {
      label: "ACH Number",
      dataType: "integer",
      propertyName: "ACHNumber",
      value: 3,
    },
    {
      label: "Start Date",
      dataType: "date",
      propertyName: "EffectiveStartDate",
      value: 4,
    },
    {
      label: "End Date",
      dataType: "date",
      propertyName: "EffectiveEndDate",
      value: 5,
    },
  ],
  Compensations: [
    {
      label: "Compensation Type",
      dataType: "string",
      propertyName: "CompensationType",
      value: 1,
    },
    {
      label: "Pay Period Amount",
      dataType: "decimal",
      isDropDown: false,
      propertyName: "PayPeriodAmount",
      value: 2,
    },
    {
      label: "YTD Amount",
      value: 3,
      dataType: "decimal",
      propertyName: "YTDAmount",
    },
    {
      label: "RK Plan Number",
      value: 4,
      dataType: "string",
      propertyName: "RKPlanNumber",
    },
  ],

  CompensationCategories: [
    {
      label: "Name",
      dataType: "string",
      propertyName: "CompensationCategoryName",
      value: 1,
    },
    {
      label: "Pay Period Amount",
      dataType: "decimal",
      isDropDown: false,
      propertyName: "PayPeriodAmount",
      value: 2,
    },
    {
      label: "YTD Amount",
      value: 3,
      dataType: "decimal",
      propertyName: "YTDAmount",
    },
  ],
  Contributions: [
    {
      label: "Source - Name",
      dataType: "string",
      propertyName: "SourceName",
      value: 1,
    },
    {
      label: "RK Plan Number",
      dataType: "string",
      propertyName: "RKPlanNumber",
      value: 2,
    },
    // {
    //   label: "source amount",
    //   dataType: "integer",
    //   isDropDown: true,
    //   propertyName: "SourceAmount",
    //   value: 3,
    // },
    {
      label: "Pay Period Amount",
      dataType: "decimal",
      propertyName: "ContributionAmount",
      value: 3,
    },
    {
      label: "YTD Amount",
      dataType: "decimal",
      propertyName: "YTDAmount",
      value: 4,
    },
    {
      label: "Deferral Type",
      dataType: "string",
      propertyName: "DeferralType",
      value: 5,
    },
    {
      label: "Deferral Rate",
      dataType: "decimal",
      propertyName: "DeferralRate",
      value: 6,
    },
    {
      label: "Eligibility Indicator",
      dataType: "string",
      propertyName: "EligibilityIndicator",
      value: 7,
    },
  ],
  PayrollLoans: [
    {
      label: "Loan Number",
      dataType: "integer",
      propertyName: "LoanNumber",
      value: 1,
    },
    // {
    //   label: "Loan Amount",
    //   dataType: "integer",
    //   isDropDown: true,
    //   propertyName: "LoanAmount",
    //   value: 2,
    // },
    {
      label: "Repayment Amount",
      dataType: "decimal",
      isDropDown: false,
      propertyName: "RepaymentAmount",
      value: 2,
    },
    {
      label: "YTD Repayment Amount",
      dataType: "decimal",
      isDropDown: false,
      propertyName: "YTDAmount",
      value: 3,
    },
    {
      label: "Display Order",
      dataType: "integer",
      propertyName: "DisplayOrder",
      value: 4,
    },
  ],
  SourceDetails: [
    {
      label: "Source - Name",
      dataType: "string",
      propertyName: "SourceName",
      value: 1,
    },
    {
      label: "RK Plan Number",
      dataType: "string",
      propertyName: "RKPlanNumber",
      value: 2,
    },
    {
      label: "Pay Period Amount",
      dataType: "decimal",
      propertyName: "ContributionAmount",
      value: 3,
    },
    {
      label: "YTD Amount",
      dataType: "decimal",
      propertyName: "YTDAmount",
      value: 4,
    },
  ],

  InvestmentDetails: [
    {
      label: "Source - Name",
      dataType: "string",
      propertyName: "SourceName",
      value: 1,
    },
    {
      label: "Investment - Name",
      dataType: "string",
      propertyName: "InvestmentName",
      value: 1,
    },
    {
      label: "Opening Balance",
      dataType: "decimal",
      propertyName: "OpeningBalance",
      value: 3,
    },
    {
      label: "Closing Balance",
      dataType: "decimal",
      propertyName: "ClosingBalance",
      value: 3,
    },
    {
      label: "Units",
      dataType: "decimal",
      propertyName: "Units",
      value: 3,
    },
  ],
};

export const extraFilterFields = [
  {
    id: uuid(),
    isFilter: "yes",
    order: 31,
    id: 31,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    // groupName: "Plan Eligible",
    isFunction: true,
    displayName: "Plan Eligible",
    propertyName:
      "Collection(EmployeeEligiblePlans,IsEligible,All(Equal(/PlanId,@PlanId)))",
    dataType: 1,
    format: "",
    fieldLength: 0,
    sortOrder: 4,
    datum: "true",
    options: [["Is Not Null", "Is Null", "Is equal to"]],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "yes",
    order: 32,
    id: 32,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    // groupName: "Employment Status",
    displayName: "Employment Status",
    propertyName: "EmploymentStatus",
    dataType: 1,
    format: "",
    fieldLength: 0,
    sortOrder: 4,
    datum: "Active",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  {
    id: uuid(),
    isFilter: "yes",
    order: 33,
    id: 33,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    isFunction: true,
    groupName: "Eligibility Date",
    displayName: "Eligibility Date",
    propertyName:
      "Collection(EmployeeEligiblePlans,EligibilityDate,All(Equal(/PlanId,@PlanId)))",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 4,
    datum: "29/09/2017",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
  // {
  //   id: uuid(),
  //   isFilter: "yes",
  //   order: 34,
  //   id: 34,
  //   selected: false,
  //   filterSelect: false,
  //   firstchoice: "",
  //   selectedFilter: "",
  //   isCollection: false,
  //   groupName: "Entry Date",
  //   displayName: "Entry Date",
  //   propertyName: "Entry Date",
  //   dataType: 4,
  //   format: "MM-DD-YYYY",
  //   fieldLength: 0,
  //   sortOrder: 4,
  //   datum: "29/09/2018",
  //   options: [
  //     [
  //       "Is Not Null",
  //       "Is Null",
  //       "Between",
  //       "Is equal to",
  //       "Contains",
  //       "Starts With",
  //       "Ends With",
  //       "In",
  //       "Length Equal to",
  //       "Length Greater than",
  //       "Length Lesser than",
  //       "Length Greater than or equal to",
  //       "Length Lesser than or equal to",
  //       "Greater than",
  //       "Lesser than",
  //       "Greater than or equal to",
  //       "Lesser than or equal to",
  //     ],
  //   ],
  //   SimOpt: "",
  //   From: "",
  //   To: "",
  // },
  {
    id: uuid(),
    isFilter: "yes",
    order: 35,
    id: 35,
    selected: false,
    filterSelect: false,
    firstchoice: "",
    selectedFilter: "",
    isCollection: false,
    isFunction: true,
    groupName: "Enrollment Date",
    displayName: "Enrollment Date",
    propertyName:
      "Collection(EmployeeEnrollmentPlanMap,EnrollmentDate,All(Equal(/PlanId,@PlanId)))",
    dataType: 4,
    format: "MM-DD-YYYY",
    fieldLength: 0,
    sortOrder: 4,
    datum: "21/05/1988",
    options: [
      [
        "Is Not Null",
        "Is Null",
        "Between",
        "Is equal to",
        "Contains",
        "Starts With",
        "Ends With",
        "In",
        "Length Equal to",
        "Length Greater than",
        "Length Lesser than",
        "Length Greater than or equal to",
        "Length Lesser than or equal to",
        "Greater than",
        "Lesser than",
        "Greater than or equal to",
        "Lesser than or equal to",
      ],
    ],
    SimOpt: "",
    From: "",
    To: "",
  },
];

export const CollectionOption = {
  CompensationAmount: [
    {
      label: "YTD Amount",
      value: "YTDAmount",
    },
    {
      label: "Pay Period Amount",
      value: "PayPeriodAmount",
    },
  ],
  PayPeriodAmount: [
    {
      label: "YTD Amount",
      value: "YTDAmount",
    },
    {
      label: "Other",
      value: "Other",
    },
  ],
  sourceAmount: [
    {
      label: "Pay Period Amount",
      value: "ContributionAmount",
    },
    {
      label: "YTD Amount",
      value: "YTDAmount",
    },
  ],
  loanAmount: [
    {
      label: "Repayment Amount",
      value: "RepaymentAmount",
    },
    {
      label: "YTD Amount",
      value: "YTDAmount",
    },
  ],
  repaymentAmount: [
    {
      label: "YTD Amount",
      value: "YTDAmount",
    },
    {
      label: "Other",
      value: "Other",
    },
  ],
  YTDAmount: [
    {
      label: "Repayment Amount",
      value: "RepaymentAmount",
    },
    {
      label: "Other",
      value: "Other",
    },
  ],
};

export const ConditionCategory = [
  {
    label: "Is Not Null",
    // value: "_Internal_IsNotNull",
    value: "IsNotNullOrEmpty",
    noOfParameter: 0,
    parameters: [],
    dataType: ["string", "integer", "decimal", "date"],
    // value: 1,
  },
  {
    label: "Is Null",
    value: "IsNullOrEmpty",
    noOfParameter: 0,
    parameters: [],
    dataType: ["string", "integer", "decimal", "date"],
    // value: 2,
  },
  {
    label: "Is equal to",
    value: "Equal",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string", "integer", "decimal", "date"],
    // value: 3,
  },
  {
    label: "Contains",
    value: "Contains",
    noOfParameter: 0,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 4,
  },
  {
    label: "Starts With",
    value: "StartsWith",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 5,
  },
  {
    label: "Ends With",
    value: "EndsWith",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 6,
  },
  {
    label: "In",
    value: "In",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 7,
  },
  {
    label: "Length Equal to",
    value: "LengthEqualTo",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 8,
  },
  {
    label: "Length Greater than",
    value: "LengthGreaterThan",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 9,
  },
  {
    label: "Length Lesser than",
    value: "LengthLesserThan",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 10,
  },
  {
    label: "Length Greater than or equal to",
    value: "LengthGreaterThanOrEqualTo",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 11,
  },
  {
    label: "Length Lesser than or equal to",
    value: "LengthLesserThanOrEqualTo",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["string"],
    // value: 12,
  },
  {
    label: "Greater than",
    value: "GreaterThan",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["integer", "decimal", "date"],
    // value: 13,
  },
  {
    label: "Lesser than",
    value: "LessThan",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["integer", "decimal", "date"],
    // value: 14,
  },
  {
    label: "Greater than or equal to",
    value: "GreaterThanOrEqual",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["integer", "decimal", "date"],
    // value: 15,
  },
  {
    label: "Lesser than or equal to",
    value: "LessThanOrEqual",
    noOfParameter: 1,
    parameters: [{ name: "conditionCategory", value: "" }],
    dataType: ["integer", "decimal", "date"],
    // value: 16,
  },
  {
    label: "Between",
    value: "Between",
    noOfParameter: 2,
    parameters: [
      { name: "conditionCategory", value: "" },
      { name: "secondaryConditionCategory", value: "" },
    ],
    dataType: ["integer", "decimal", "date"],
    // value: 17,
  },
  // {
  //   label: "Position",
  //   value: "Position",
  //   noOfParameter: 1,
  //   parameters: [{ name: "conditionCategory", value: "" }],
  //   dataType: ["string", "integer", "decimal", "date"],
  //   // value: 18,
  // },
];

function isNumber(searchValue) {
  if (typeof searchValue == "string") {
    var found = searchValue.search(/^(\d*\.?\d*)$/);
    if (found > -1) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

export const filterExpressionConverter = (val) => {
  let str = "";
  if (val.dataType == 1) {
    //string
    switch (val.SimOpt) {
      case 0:
        str =
          str +
          `IsNotNullOrEmpty(${
            (!val.isFunction ? "/" : "") + val.propertyName
          })`;
        break;
      case 1:
        str =
          str +
          `IsNullOrEmpty(${(!val.isFunction ? "/" : "") + val.propertyName})`;
        break;
      case 2:
        str =
          str +
          `Equal(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 3:
        str =
          str +
          `Contains(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 4:
        str =
          str +
          `StartsWith(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 5:
        str =
          str +
          `EndsWith(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 6:
        str =
          str +
          `LengthEqualTo(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 7:
        str =
          str +
          `LengthGreaterThan(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 8:
        str =
          str +
          `LengthLesserThan(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 9:
        //Length Greater than or equal to
        str =
          str +
          `LengthGreaterThanOrEqualTo(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 10:
        //Length Lesser than or equal to
        str =
          str +
          `LengthLesserThanOrEqualTo(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
    }
  } else if (val.dataType == 4) {
    //Date
    switch (val.SimOpt) {
      case 0:
        str =
          str +
          `IsNotNullOrEmpty(${
            (!val.isFunction ? "/" : "") + val.propertyName
          })`;
        break;
      case 1:
        str =
          str +
          `IsNullOrEmpty(${(!val.isFunction ? "/" : "") + val.propertyName})`;
        break;
      case 2:
        str =
          str +
          `Between(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.From}'` +
          "," +
          `'${val.To}'` +
          ")";
        break;
      case 3:
        str =
          str +
          `Equal(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 4:
        str =
          str +
          `GreaterThan(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 5:
        str =
          str +
          `LessThan(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 6:
        str =
          str +
          `GreaterThanOrEqual(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 7:
        str =
          str +
          `LessThanOrEqual(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
    }
  } else if (val.dataType == 2) {
    //number
    switch (val.SimOpt) {
      case 0:
        str =
          str +
          `IsNotNullOrEmpty(${
            (!val.isFunction ? "/" : "") + val.propertyName
          })`;
        break;
      case 1:
        str =
          str +
          `IsNullOrEmpty(${(!val.isFunction ? "/" : "") + val.propertyName})`;
        break;
      case 2:
        str =
          str +
          `Between(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.From}'` +
          "," +
          `'${val.To}'` +
          ")";
        break;
      case 3:
        str =
          str +
          `Equal(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 4:
        str =
          str +
          `Contains(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 5:
        str =
          str +
          `StartsWith(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 6:
        str =
          str +
          `EndsWith(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 7:
        str =
          str +
          `LengthEqualTo(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 8:
        str =
          str +
          `LengthGreaterThan(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 9:
        str =
          str +
          `LengthLesserThan(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 10:
        //Length Greater than or equal to
        str =
          str +
          `LengthGreaterThanOrEqualTo(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 11:
        //Length Lesser than or equal to
        str =
          str +
          `LengthLesserThanOrEqualTo(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 12:
        str =
          str +
          `GreaterThan(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 13:
        str =
          str +
          `LessThan(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 14:
        str =
          str +
          `GreaterThanOrEqual(${
            (!val.isFunction ? "/" : "") + val.propertyName
          }` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
      case 15:
        str =
          str +
          `LessThanOrEqual(${(!val.isFunction ? "/" : "") + val.propertyName}` +
          "," +
          `'${val.selectedFilter}'` +
          ")";
        break;
    }
  }
  return str;
};

export const standardOrAdvanced = [
  {
    label: "Standard",
    value: 1,
  },
  {
    label: "Advanced",
    value: 2,
  },
];

export const DataTypeForTransformationFunction = {
  1: "string",
  2: "number",
  3: "boolean",
  4: "date",
};

export const transformationFunctions = [
  {
    id: 0,
    name: "IFF",
    displayedName: "IFF",
    dataType: 3,
    returnDataType: 1,
    numberOfParameters: 3,
    informationDescription:
      "If this condition evaluates to true then it will execute the first statement otherwise the second statement will be executed.",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        dataType: 1,
        headerName: "Condition",
      },
      {
        id: 2,
        value: "",
        // name: "number",
        code: "length",
        dataType: 2,
        headerName: "True",
      },
      {
        id: 3,
        value: "",
        // name: "number",
        code: "length",
        dataType: 2,
        headerName: "False",
      },
    ],
    description:
      "If this condition evaluates to true then it will execute the first statement otherwise the second statement will be executed.",
    sliderDescription:
      "Returns true if the condition satisfies otherwise false",
    syntax:
      "If the expression stated by condition is true, the result is true otherwise false",
    example:
      "value1=20,value2=20 if(value==value2) return true else return false",
  },
  {
    id: 35,
    name: "IsNull",
    displayedName: "Is Null",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 1,
    informationDescription:
      "It is used to find whether the value of the object is null.If object has null value then the output will be true otherwise false.",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns a Boolean value that indicates whether a specified expression contains no valid data (Null)",
    sliderDescription:
      "Returns a Boolean value that indicates whether a specified expression contains no valid data (Null)",
    syntax: "isNull(value)",
    example: "isNull(10) return true ",
  },
  // {
  //   id: 36,
  //   name: "IsNotNull",
  //   displayedName: "IsNotNull",
  //   dataType: 1,
  //   returnDataType: 1,
  //   numberOfParameters: 1,
  //   informationDescription:
  //     "It is used to find whether the value of the object is not null.If object has not null value then the output will be true otherwise false.",
  //   parameters: [
  //     {
  //       id: 1,
  //       value: "",
  //       // name: "number",
  //       code: "start",
  //       headerName: "Field",
  //     },
  //   ],
  //   description:
  //     "Returns a Boolean value that indicates whether a specified expression contains not null value",
  //   sliderDescription:
  //     "Returns a Boolean value that indicates whether a specified expression contains not null value",
  //   syntax: "isNotNull(value)",
  //   example: "isNotNull(10) return true ",
  // },
  {
    id: 49,
    name: "IsNotNullOrEmpty",
    displayedName: "IsNotNullOrEmpty",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 1,
    informationDescription:
      "It is used to find whether the value of the object is not null.If object has not null value then the output will be true otherwise false.",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns a Boolean value that indicates whether a specified expression contains not null value",
    sliderDescription:
      "Returns a Boolean value that indicates whether a specified expression contains not null value",
    syntax: "isNotNull(value)",
    example: "isNotNull(10) return true ",
  },
  {
    id: 37,
    name: "Equal",
    displayedName: "Equal",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "The equality function checks whether its two operands are equal, returning a Boolean result.",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        dataType: 1,
        headerName: "Field",
      },
    ],
    description: "Returns true if both operands are true otherwise false",
    sliderDescription:
      "The equal function returns true if both the value is true otherwise false",
    syntax: "value1 == value2",
    example:
      "Eg : value1 = 10 , value2 = 20 , value1 == value2, returns true if both values are true otherwise false",
  },
  {
    id: 38,
    name: "GreaterThan",
    displayedName: "Greaterthan",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "The greater than function checks whether the first operand is greater than second operand, returning a Boolean result.",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if first operands is greater than second , otherwise false",
    sliderDescription:
      "The greater than function returns true if the first value is greater than second ,otherwise false",
    syntax: "value1 > value2",
    example:
      "Eg : value1 = 30 , value2 = 20 , value1 > value2, returns true if first value is greater than second otherwise false",
  },
  {
    id: 39,
    name: "LessThan",
    displayedName: "Lesserthan",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "The Lesser than function checks whether the first operand is lesser than second operand, returning a Boolean result.",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if first operands is lesser than second  otherwise false",
    sliderDescription:
      "The lesser than function returns true if the first value is lesser than second ,otherwise false",
    syntax: "value1 < value2",
    example:
      "Eg : value1 = 20 , value2 = 30 , value1 < value2, returns true if first value is leser than second otherwise false",
  },
  {
    id: 40,
    name: "GreaterThanOrEqual",
    displayedName: "Greaterthanorequalto",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "The greater than or equal to function checks whether the first operand is greater than or equal to second operand, returning a Boolean result.",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if first operands is greater than or equal to second operands , otherwise false",
    sliderDescription:
      "The greater than or equal to function returns true if the first value is greater than or equal to second ,otherwise false",
    syntax: "value1 >= value2",
    example:
      "Eg : value1 = 30 , value2 = 20 , value1 >= value2, returns true if first value is greater than or equal to second otherwise false",
  },
  {
    id: 41,
    name: "LessThanOrEqual",
    displayedName: "Lesserthanorequalto",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "The Lesser than or equal to function checks whether the first operand is lesser than second operand, returning a Boolean result.",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if first operands is lesser than or equal to second , otherwise false",
    sliderDescription:
      "The lesser than or equalto function returns true if the first value is lesser than or equalto second ,otherwise false",
    syntax: "value1 <= value2",
    example:
      "Eg : value1 = 20 , value2 = 30 , value1 <= value2, returns true if first value is leser than second otherwise false",
  },
  {
    id: 42,
    name: "LengthEqualTo",
    displayedName: "Lengthequalto",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "Returns a boolean value whether a length of the value is eqaul to constant value",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if the length of the value is equal to the second constant value , otherwise false",
    sliderDescription:
      "The length equalto function returns true if the first value length is equalto the second constant value,otherwise false",
    syntax: "value1.length == value2",
    example:
      "Eg : value1 = hello , value2 = 5 , value1.length == value2, returns true if first value is equal to second value otherwise false",
  },
  {
    id: 43,
    name: "LengthGreaterThan",
    displayedName: "Lengthgreaterthan",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "Returns a boolean value whether a length of the value is greater than constant value",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if the length of the value is greater than  second constant value , otherwise false",
    sliderDescription:
      "The Length greaterthan function returns true if the first value length is greater than second constant value,otherwise false",
    syntax: "value1.length <= value2",
    example:
      "Eg : value1 = hello , value2 = 6 , value1.length <= value2, returns true if first value is equal to second value otherwise false",
  },
  {
    id: 44,
    name: "LengthLesserThan",
    displayedName: "Lengthlesserthan",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "Returns a boolean value whether a length of the value is lesser than constant value",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if the length of the value is lesser than  second constant value , otherwise false",
    sliderDescription:
      "The Length lesserthan function returns true if the first value length is lesser than second constant value,otherwise false",
    syntax: "value1.length >= value2",
    example:
      "Eg : value1 = hello , value2 = 3 , value1.length >= value2, returns true if first value is lesser than second value otherwise false",
  },
  {
    id: 45,
    name: "LengthLesserThanOrEqualTo",
    displayedName: "Lengthlesserthanorequalto",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "Returns a boolean value whether a length of the value is lesser than or equal to constant value",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if the length of the value is lesser than or equal to second constant value , otherwise false",
    sliderDescription:
      "The Length lesserthan or equalto function returns true if the first value length is lesser than or equal to second constant value,otherwise false",
    syntax: "value1.length <= value2",
    example:
      "Eg : value1 = hello , value2 = 7 , value1.length <= value2, returns true if first value is lesser than second value otherwise false",
  },
  {
    id: 46,
    name: "LengthGreaterThanOrEqualTo",
    displayedName: "Lengthgreaterthanorequalto",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "Returns a boolean value whether a length of the value is greater than or equal to constant value",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if the length of the value is greater than or equal to second constant value , otherwise false",
    sliderDescription:
      "The Length greater than or equalto function returns true if the first value length is greater than or equal to second constant value,otherwise false",
    syntax: "value1.length >= value2",
    example:
      "Eg : value1 = hello , value2 = 3 , value1.length >= value2, returns true if first value is lesser than second value otherwise false",
  },
  {
    id: 47,
    name: "Between",
    displayedName: "Between",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 3,
    informationDescription:
      "Return true if the specified value is the given range otherwise false",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        dataType: 1,
        headerName: "Field",
      },
    ],
    description:
      "Returns boolean value if the value is between the given range of value",
    sliderDescription:
      "Check if the number is greater than the lower range,check if the number is less than the higher range.If both conditions are met, the number is between the two numbers.",
    syntax: "value1 > value2 && value1 < value3",
    example:
      "Eg : value1 = 50,value = 30,value = 150, value1 > value2 && value1 < value3",
  },
  {
    id: 48,
    name: "Contains",
    displayedName: "Contains",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "Returns true if the specified string is within another string",
    parameters: [
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        // name: "number",
        code: "start",
        headerName: "Field",
      },
    ],
    description:
      "Returns true if a string contains a specified string,otherwise false",
    sliderDescription:
      "Contains function check whether one string may be found within another string",
    syntax: "value1.includes(value2)",
    example:
      "Eg : value1 = Jenny,value2 = en, returns true if value2 is found in value1",
  },

  {
    id: 1,
    name: "Split",
    displayedName: "Split",
    dataType: 2,
    numberOfParameters: 3,
    returnDataType: 2,
    parameters: [],
    description: "Split the string based on the given parameter",
    informationDescription:
      "This will split the string based on the given parameter and return the value",
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "Value",
        parameterType: 1,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "string",
        code: "Value",
        parameterType: 1,
        headerName: "Delimiter",
      },
      {
        id: 3,
        value: "",
        name: "string",
        code: "Value",
        parameterType: 1,
        headerName: "Section",
      },
    ],
    sliderDescription:
      "This will split the string based on the given parameter and return the value",
    syntax: "Split 'character'  number",
    example:
      'Say Employee Id column has the value EE_123. The above function will return the value 123. The split happens based "_" and EE is treated as 0th value and 123 is treated as 1st value. Since the function specifies to return the 1st value the function will return 123 as result.',
  },
  {
    id: 2,
    name: "Substring",
    displayedName: "Substring",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 3,
    informationDescription:
      "This function will allow to extract a specific sub data from the data in a column.",
    parameters: [
      {
        id: 1,
        value: "",
        name: "number",
        code: "start",
        dataType: 1,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "number",
        code: "length",
        dataType: 2,
        headerName: "Start Index",
      },
      {
        id: 3,
        value: "",
        name: "number",
        code: "length",
        dataType: 2,
        headerName: "Length",
      },
    ],
    description: "Extract a specific sub data from the data in a column.",
    sliderDescription:
      "This function will allow to extract a specific sub data from the data in a column.",
    syntax:
      "The first number denotes the index start and the second number denotes the length till which the substring has to be considered.",
    example:
      "Say the SourceName Column (P123ERMATCH) has Plan id (P123)  data along with it. We can get the plan id data using, Substring 0 4. This function will start from the 0th position/index of the data and will pick data till the index length is 4.",
  },
  {
    id: 3,
    name: "Concat",
    displayedName: "Concat",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "This function will concat the value in a column and a value in another column",
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "Value",
        dataType: 1,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "string",
        code: "Value",
        dataType: 1,
        headerName: "Field",
      },
    ],
    description: "Concat the value in a column and a value in another column",
    hasDynamicParameters: true,
    sliderDescription:
      "This function will concat the value in a column and a given data",
    syntax: "Concat 'String'",
    example:
      'Say the Plan Id column has value "P123". The above function will return "P123ER".',
  },
  {
    id: 4,
    name: "ToLowercase",
    displayedName: "ToLowerCase",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 1,
    informationDescription:
      "This function will convert the value in a column to lowercase",
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
    ],
    description: "Convert the value in a column to lowercase",
    sliderDescription:
      "This function will convert the value in a column to lowercase",
    syntax: "ToLowerCase",
    example:
      'Say the value in column City is "NEW YORK". The above function will return "new york"',
  },

  {
    id: 5,
    name: "ToUppercase",
    displayedName: "ToUpperCase",
    dataType: 1,
    informationDescription:
      "This function will convert the value in a column to uppercase",
    returnDataType: 1,
    numberOfParameters: 1,
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
    ],
    description: "Convert the value in a column to uppercase",
    sliderDescription:
      "This function will convert the value in a column to uppercase",
    syntax: "ToUpperCase",
    example:
      'Say the value in column City is "new york". The above function will return "NEW YORK"',
  },
  {
    id: 6,
    name: "NumberToString",
    displayedName: "NumberToString",
    informationDescription:
      "This will convert the data type of the value in Target column to String",
    dataType: 2,
    returnDataType: 1,
    numberOfParameters: 1,
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
    ],
    description: "Convert the input value to string",
    sliderDescription:
      "This will convert the data type of the value in Target column to String.",
    syntax: "NumberToString",
    example:
      ": Say the Employee Id column has a data 1234 which is in the format (data type) number, this function will convert the data to String format.",
  },

  {
    id: 7,
    name: "PadLeading",
    displayedName: "PadLeading",
    informationDescription: "Add leading values according to the length",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 3,
    parameters: [
      { id: 1, value: "", name: "number", code: "Length", headerName: "Field" },
      { id: 2, value: "", name: "number", code: "Value", headerName: "Length" },
      { id: 3, value: "", name: "number", code: "Value", headerName: "Value" },
    ],
    description: "Add leading values according to the length ",
    sliderDescription: "Add leading values according to the length",
    syntax: "PadLeading",
    example: "User has to only select PadLeading",
  },
  {
    id: 8,
    name: "PadTrailing",
    displayedName: "PadTrailing",
    informationDescription: "Add trailing values according to the length",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 3,
    parameters: [
      { id: 1, value: "", name: "number", code: "Length", headerName: "Field" },
      { id: 2, value: "", name: "number", code: "Value", headerName: "Length" },
      { id: 3, value: "", name: "number", code: "Value", headerName: "Value" },
    ],
    description: "Add trailing values according to the length ",
    sliderDescription: "Add trailing values according to the length",
    syntax: "PadTrailing",
    example: "User has to only select PadTrailing",
  },
  {
    id: 9,
    name: "ToNumber",
    displayedName: "ToNumber",
    informationDescription:
      "This will convert the data type of the value in Target column to number.",
    dataType: 1,
    returnDataType: 2,
    numberOfParameters: 1,
    parameters: [
      { id: 1, value: "", name: "number", code: "Value", headerName: "Field" },
    ],
    description: "Convert the input value to number",
    sliderDescription:
      "This will convert the data type of the value in Target column to number",
    syntax: "ToNumber",
    example: "User has to only select ToNumber",
  },
  {
    id: 10,
    name: "Trim",
    displayedName: "Trim",
    dataType: 1,
    returnDataType: 1,
    informationDescription: "Removes Leading and trailing space in the data.",
    numberOfParameters: 1,
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
    ],
    description: "Removes Leading and trailing space in the data",
    sliderDescription: "Removes Leading and trailing space in the data",
    syntax: "Trim",
    example: "User has to only select Trim",
  },
  {
    id: 11,
    name: "TrimLeading",
    displayedName: "TrimLeading",
    informationDescription: "Removes Leading spaces in the data.",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 1,
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
    ],
    description: "Removes Leading spaces in the data",
    sliderDescription: "Removes Leading spaces in the data",
    syntax: "TrimLeading",
    example: "User has to only select TrimLeading",
  },
  {
    id: 12,
    name: "TrimTrailing",
    displayedName: "TrimTrailing",
    informationDescription: "Removes Trailing spaces in the data",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 1,
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
    ],
    description: "Removes trailing spaces in the data",
    sliderDescription: "Removes trailing spaces in the data",
    syntax: "TrimTrailing",
    example: "User has to only select TrimTrailing",
  },
  {
    id: 13,
    name: "DefaultOption",
    displayedName: "DefaultOption",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    informationDescription:
      "This function will write the specified value or the value in another specified column into the target column only for the records with no data.",
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
      { id: 2, value: "", name: "string", code: "Value", headerName: "Value" },
    ],
    description: "Fill values for record with no data",
    sliderDescription:
      "This function will write the specified value or the value in another specified column into the target column only for the records with no data.",
    syntax: "DefaultOption 'String'",
    example:
      'This will write  "FIN" as Division ID for records with empty values for Division ID.',
  },
  {
    id: 14,
    name: "Replace",
    displayedName: "Replace",
    dataType: 1,
    returnDataType: 1,
    informationDescription:
      "This function will replace a value in the input column with another value given by the user",
    numberOfParameters: 3,
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "Search Value",
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "string",
        code: "New value ",
        headerName: "Search Value",
      },
      {
        id: 3,
        value: "",
        name: "string",
        code: "Value ",
        headerName: "New Value",
      },
    ],
    description: "Replace the value with another value",
    sliderDescription:
      "This function will replace a value in the input column with another value given by the user",
    syntax: "Replace 'String' 'String'",
    example:
      'This will replace all the "M" values with "Male" in the Gender Column.',
  },
  {
    id: 15,
    name: "ReplaceLookup",
    informationDescription:
      "This function will replace a set of values in the input column with a set of values given by the user",
    displayedName: "ReplaceLookup",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 3,
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "Search Value",
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "string",
        code: "New Value",
        headerName: "Search Value",
      },
      {
        id: 3,
        value: "",
        name: "string",
        code: "Value ",
        headerName: "New Value",
      },
    ],
    description: "Replace set of values with another set of values",
    sliderDescription:
      "This function will replace a set of values in the input column with a set of values given by the user",
    syntax:
      "['String-1','String-2',,,,'String-n']['String-1','String-2',,,,'String-n']",
    example:
      'This will replace all the "M" values with "Male" and all the "F" values with "Female" in the Gender Column.',
  },
  {
    id: 16,
    name: "ToDate",
    displayedName: "ToDate",
    dataType: 1,
    returnDataType: 4,
    informationDescription:
      "This function will assume the specified date format for all the values in the column.",
    numberOfParameters: 2,
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "Format",
        dataType: 1,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "string",
        code: "Format",
        datType: 1,
        headerName: "Date Format",
      },
    ],
    description: "Convert to specified date format",
    sliderDescription:
      "This function will assume the specified date format for all the values in the column.",
    syntax: "['ddMMyyyy']",
    example:
      "Say Hiredate has a date value 12102021. This will read as 10th of December 2021.",
  },
  {
    id: 17,
    name: "Strip",
    displayedName: "Strip",
    dataType: 1,
    informationDescription:
      "This function will remove a specified character that is present in the input value",
    returnDataType: 1,
    numberOfParameters: 2,
    parameters: [
      { id: 1, value: "", name: "string", code: "value", headerName: "Field" },
      { id: 2, value: "", name: "string", code: "value", headerName: "Value" },
    ],
    description:
      "Remove a specified character that is present in the input value",
    sliderDescription:
      "This function will remove a specified character that is present in the input value",
    syntax: "Strip 'Character'",
    example:
      "Say the SSN column has the value 123-456-789. The above function will remove " -
      " from the value and return 123456789.",
  },
  {
    id: 18,
    name: "StartOfMonth",
    informationDescription:
      "This populates the selected column with the month's starting date based on the date in the column",
    displayedName: "StartOfMonth",
    dataType: 4,
    returnDataType: 4,
    numberOfParameters: 1,
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "value",
        dataType: 4,
        headerName: "Field",
      },
    ],
    description: "Populates the starting month based on current date",
    sliderDescription:
      "This populates the selected column with the month's starting date based on the date in the column.",
    syntax: "StartOfMonth",
    example:
      "Say Paydate for a record is 12/10/2021. This function for that record will return 12/01/2021.",
  },

  {
    id: 19,
    name: "EndOfTheMonth",
    displayedName: "EndOfTheMonth",
    informationDescription:
      "This populates the selected column with the month's end date based on the date in the column.",
    dataType: 4,
    returnDataType: 4,
    numberOfParameters: 1,
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "value",
        dataType: 4,
        headerName: "Field",
      },
    ],
    description: "Populates the end of month based on current date",
    sliderDescription:
      "Say Paydate for a record is 12/10/2021. This function for that record will return 12/01/2021.",
    syntax: "EndOfMonth",
    example:
      "Say Paydate for a record is 12/10/2021. This function for that record will return 12/31/2021.",
  },
  {
    id: 20,
    name: "Today",
    displayedName: "Today",
    informationDescription:
      "This populates the current day's date based on when the file was processed",
    dataType: 4,
    returnDataType: 4,
    numberOfParameters: 1,
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "value",
        dataType: 4,
        headerName: "Field",
      },
    ],
    description: "Populated the current days date",
    sliderDescription:
      "This populates the current day's date based on when the file was processed.",
    syntax: "Today",
    example:
      "Say the file is processed on 4/20/2021. This function will return 4/20/2021.",
  },

  {
    id: 21,
    name: "Divide",
    displayedName: "Divide",
    informationDescription:
      "To divide the value in the Target column with the number or a  value in another column from the input file to arrive at the quotient",
    dataType: 2,
    returnDataType: 2,
    numberOfParameters: 2,
    parameters: [
      {
        id: 1,
        value: "",
        name: "divisor",
        code: "Value",
        dataType: 2,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "divisor",
        code: "value",
        dataType: 2,
        headerName: "Value",
      },
    ],
    description: "Division of multiple value ",
    sliderDescription:
      "To divide the value in the Target column with a number and give the quotient",
    syntax: "Divide number",
    example:
      "This will divide the value in the Gross Compensation column by 5 and will give the quotient",
  },

  {
    id: 22,
    name: "Ceil",
    informationDescription: "Rounds up Decimal values",
    displayedName: "Ceil",
    dataType: 2,
    returnDataType: 2,
    numberOfParameters: 1,
    parameters: [
      {
        id: 1,
        value: "",
        name: "number",
        code: "Value",
        dataType: 2,
        headerName: "Field",
      },
    ],
    description: "Rounds up Decimal values",
    sliderDescription: "Rounds up Decimal values",
    syntax: "Ceil",
    example:
      "Say the Plan Compensation field has a value of 330.5, this will be converted to 331",
  },
  {
    id: 23,
    name: "Floor",
    displayedName: "Floor",
    informationDescription: "Rounds down Decimal values",
    dataType: 2,
    returnDataType: 2,
    numberOfParameters: 1,
    parameters: [
      {
        id: 1,
        value: "",
        name: "number",
        code: "Value",
        dataType: 2,
        headerName: "Field",
      },
    ],
    description: "Rounds down Decimal values",
    sliderDescription: "Rounds down Decimal values",
    syntax: "Floor",
    example:
      "Say the Plan Compensation field has a value 330.5, this will be converted to 330.",
  },
  {
    id: 24,
    name: "Max",
    displayedName: "Max",
    informationDescription:
      "Compares and gives the maximum between the value in the Target column and the number entered or the value of another column from the input file.",
    dataType: 2,
    returnDataType: 2,
    numberOfParameters: 2,
    parameters: [
      {
        id: 1,
        value: "",
        name: "number",
        code: "Value",
        dataType: 2,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "number",
        code: "Value",
        dataType: 2,
        headerName: "Max Of",
      },
    ],
    description: "Maximum between the input value ",
    sliderDescription:
      "Compares andgives the maximum between the value in the Target column and the number entered.",
    syntax: "Max number",
    example:
      "This will give the maximum of the data in the Plan Compensation column and 1000.",
  },
  {
    id: 25,
    name: "Min",
    informationDescription:
      "Compares and gives the minimum between the value in the Target column and the value of another column from the input file.",
    displayedName: "Min",
    dataType: 2,
    returnDataType: 2,
    numberOfParameters: 2,
    parameters: [
      {
        id: 1,
        value: "",
        name: "number",
        code: "value",
        dataType: 2,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "number",
        code: "value",
        dataType: 2,
        headerName: "Min Of",
      },
    ],
    description: "Minimum between the input value ",
    sliderDescription:
      "Compares and gives the minimum between the value in the Target column and the number entered.",
    syntax: "Min number",
    example:
      "This will give the minimum of the data in the Plan Compensation column and 1000.",
  },
  {
    id: 26,
    name: "Modulo",
    informationDescription:
      "To divide the value in the Target column with the  number or a value in another column from the input file to arrive at the remainder.",
    displayedName: "Modulo",
    dataType: 2,
    returnDataType: 2,
    numberOfParameters: 2,
    parameters: [
      {
        id: 1,
        value: "",
        name: "number",
        code: "value",
        dataType: 2,
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        name: "number",
        code: "value",
        dataType: 2,
        headerName: "Value",
      },
    ],
    description: "To divide the value and arrive at the remainder ",
    sliderDescription:
      "To divide the value in the Target column with a number and give the remainder.",
    syntax: "Modulo number",
    example:
      "This will divide the value in the Gross Compensation column by 5 and will give the remainder.",
  },

  {
    id: 27,
    name: "Abs",
    displayedName: "Abs",
    informationDescription: "Ignores the values after decimal.",
    dataType: 2,
    returnDataType: 2,
    numberOfParameters: 1,
    parameters: [
      {
        id: 1,
        value: "",
        name: "number",
        code: "Value",
        dataType: 2,
        headerName: "Field",
      },
    ],
    description: "Absolute of the input value",
    sliderDescription: "Ignores the values after decimal.",
    syntax: "Abs",
    example:
      "When used on a field all the values will be whole numbers : the result of Abs (100.01) will be 100.",
  },
  {
    id: 28,
    name: "Sum",
    displayedName: "Sum",
    informationDescription:
      "This will sum the value in the Target column with the a number or a value in another column from the input file.",
    dataType: 2,
    returnDataType: 2,
    numberOfParameters: 2,
    hasDynamicParameters: true,
    parameters: [
      {
        id: 1,
        value: "",
        name: "number",
        code: "Value",
        dataType: 2,
        headerName: "Field",
      },
      {
        id: 1,
        value: "",
        name: "number",
        code: "Value",
        dataType: 2,
        headerName: "Field",
      },
    ],
    description: "Adds input value",
    sliderDescription:
      "This will sum the value in the Target column with the provided number.",
    syntax: "Sum number",
    example: "This will sum the value in the Salary field and 1000",
  },
  {
    id: 29,
    name: "StartsWith",
    displayedName: "StartsWith",
    dataType: 1,
    returnDataType: 1,
    numberOfParameters: 2,
    parameters: [
      { id: 1, value: "", name: "string", code: "value", headerName: "Field" },
      { id: 2, value: "", name: "string", code: "Value", headerName: "Value" },
    ],
    description: "Comparison of the begining word with the value",
    informationDescription: "Comparison of the begining word with the value",
    sliderDescription:
      "Determines whethere the beginning of the string instance matches the specified string when compared using specified comparison option 'STARTS WITH'",
    syntax: "StartsWith 'Character' Return Boolean",
    example:
      " Ajay - StartsWith('A') Return True. It check whether the value starts with 'A' and returns True or False.",
  },
  {
    id: 30,
    name: "EndsWith",
    displayedName: "EndsWith",
    dataType: 1,
    returnDataType: 3,
    numberOfParameters: 2,
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
      { id: 2, value: "", name: "string", code: "Value", headerName: "Value" },
    ],
    description: "Comparison of the ending word with the value",
    informationDescription: "Comparison of the ending word with the value",
    sliderDescription:
      "Determines whethere the ending of the string instance matches the specified string when compared using specified comparison option 'ENDS WITH'",
    syntax: "EndsWith 'Character' Return Boolean",
    example:
      " Ajay - EndtsWith('A') Return False. It check whether the value ends with 'A' and returns True or False.",
  },
  {
    id: 31,
    name: "Length",
    displayedName: "Length",
    dataType: 1,
    returnDataType: 3,
    numberOfParameters: 1,
    informationDescription:
      "This will return the total length of the value in the Target column",
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
      // { id: 2, value: "", name: "string", code: "Value" },
    ],
    description: "Total length of the input value ",
    sliderDescription:
      "This will return the total length of the value in the Target column",
    syntax: "Length",
    example:
      "Say there is a record value in the First Name column as John. This function will return value 4.",
  },
  {
    id: 32,
    name: "ConvertEmptyStringToNull",
    displayedName: "ConvertEmptyStringToNull",
    informationDescription:
      "This will convert the empty values in the Target column into null",
    dataType: 1,
    returnDataType: 3,
    numberOfParameters: 1,
    parameters: [
      { id: 1, value: "", name: "string", code: "Value", headerName: "Field" },
      // { id: 2, value: "", name: "string", code: "Value" },
    ],
    description: "Convert the empty input values to Null ",
    sliderDescription:
      "This will convert the empty values in the Target column into null",
    syntax: "ConvertEmptyStringToNull",
    example:
      "Say there is an empty record in the column City for an Employee. This function will convert that empty value into NULL.",
  },
  {
    id: 33,
    name: "IndexOf",
    displayedName: "IndexOf",
    dataType: 1,
    informationDescription:
      "Returns the index value of the first match with the provided string",
    returnDataType: 3,
    numberOfParameters: 2,
    parameters: [
      {
        id: 1,
        value: "",
        datatype: 1,
        name: "string",
        code: "Value",
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        datatype: 1,
        name: "string",
        code: "Value",
        headerName: "Field",
      },
    ],
    description: "Index value of the first match with the input string ",
    sliderDescription:
      "Returns the index value of the first match with the provided string",
    syntax: "'String'",
    example:
      "Say the First namehas a value 'Kenn'. This function will return a value 2 as the first occurrence of 'n' is in the 2nd index position.",
  },
  {
    id: 34,
    name: "DateToString",
    displayedName: "DateToString",
    dataType: 4,
    informationDescription:
      "This will convert the datatype of the value in the target column to string",
    returnDataType: 3,
    numberOfParameters: 2,
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "Format",
        dataType: 4,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "string",
        code: "Format",
        datType: 1,
        headerName: "Date Format",
      },
    ],
    description:
      "This will convert the datatype of the value in the target column to string ",
    sliderDescription:
      "This will convert the datatype of the value in the target column to string",
    syntax: "'String'",
    example:
      "User has to only select DateToString, Eg: Say the Paydate column has a data 03/02/2022 which is in the format (data type) date, this function will convert the data to String format.",
  },
  {
    id: 35,
    name: "DateToStringWithBlank",
    displayedName: "DateToStringWithBlank",
    dataType: 4,
    informationDescription:
      "This will convert the datatype of the value in the target column to string or return null if input is null",
    returnDataType: 3,
    numberOfParameters: 2,
    parameters: [
      {
        id: 1,
        value: "",
        name: "string",
        code: "Format",
        dataType: 4,
        headerName: "Field",
      },
      {
        id: 2,
        value: "",
        name: "string",
        code: "Format",
        datType: 1,
        headerName: "Date Format",
      },
    ],
    description:
      "This will convert the datatype of the value in the target column to string or return null if the input is null",
    sliderDescription:
      "This will convert the datatype of the value in the target column to string or return null if the input is null",
    syntax: "'String'",
    example:
      "User has to only select DateToStringWithBlank, Eg: Say the Paydate column has a data 03/02/2022 which is in the format (data type) date, this function will convert the data to String format.",
  },
];

export const jsonToStringConverter = (
  json,
  mapType = 0,
  isFunction = false
) => {
  let str = "";
  if (json?.parameterType == 2) {
    let functionName =
      mapType != 3
        ? json?.value?.name
        : json?.value?.name == "Concat"
        ? "DynamicConcat"
        : json?.value?.name == "Sum"
        ? "DynamicSum"
        : json?.value?.name;
    let startParms =
      mapType != 3
        ? "("
        : json?.value?.name == "Concat"
        ? "(["
        : json?.value?.name == "Sum"
        ? "(["
        : "(";
    let endParms =
      mapType != 3
        ? ")"
        : json?.value?.name == "Concat"
        ? "])"
        : json?.value?.name == "Sum"
        ? "])"
        : ")";
    str = str + functionName + startParms;
    json?.value?.parameters?.forEach((item, index) => {
      if (index == json?.value?.numberOfParameters - 1) {
        str = str + jsonToStringConverter(item, mapType, true) + endParms;
      } else {
        str = str + jsonToStringConverter(item, mapType, true) + ",";
      }
    });
    return str;
  } else if (json?.parameterType == 1) {
    if (json?.value?.isCollection) {
      return str + json?.value?.filterString;
    }
    if (json?.value?.path) {
      if (mapType == 3 && isFunction) {
        return `get(source,'/${str + json?.value?.path}')`;
      }
      return "/" + str + json?.value?.path;
    }
    return null;
  } else if (json?.parameterType == 4) {
    if (mapType == 3 && isFunction) {
      return `getVariables(source,'@${str}${json?.value?.propertyName}')`;
    }
    return "@" + str + json?.value?.propertyName;
  } else {
    if (
      json?.value?.charAt(0) == "[" &&
      json?.value?.charAt(json?.value?.length - 1) == "]"
    ) {
      return str + json?.value;
    } else {
      return "'" + str + json?.value + "'";
    }
  }
};

export const getFilteredFunctionList = (datatype, isInput) => {
  if (!datatype) {
    return transformationFunctions;
  }
  if (isInput) {
    return transformationFunctions.filter((item) => item?.dataType == datatype);
  } else {
    return transformationFunctions.filter(
      (item) => item?.returnDataType == datatype
    );
  }
};

export const passthroughValidationJsonToString = (jsonObject, condition) => {
  var converToString = "";
  var field = jsonObject.map((item, index) => {
    return {
      newObj: `${item.conditionCategory}(${item.firstFieldRule}${
        !isEmpty(item?.secondFieldRule0) ? `,` : ""
      }${!isEmpty(item?.secondFieldRule0) ? item?.secondFieldRule0 : ""}${
        !isEmpty(item?.secondFieldRule1) ? `,` : ""
      }${!isEmpty(item?.secondFieldRule1) ? item?.secondFieldRule1 : ""})`,
    };
  });
  for (const obj of field) {
    converToString += obj["newObj"] + " " + condition + " ";
  }
  if (
    converToString.slice(converToString?.lastIndexOf(")") + 1).trim() == "Not"
  ) {
    converToString = converToString?.slice(
      0,
      converToString?.lastIndexOf(")") + 1
    );
    converToString = condition + "(" + converToString + ")";
  } else if (
    converToString.slice(converToString?.lastIndexOf(")") + 1).trim() == "And"
  ) {
    converToString = converToString + "true";
  } else {
    converToString = converToString + "false";
  }
  return converToString.trim();
};

export const removePassthroughFieldTrans = (string) => {
  if (string?.includes("ReplaceLookup")) {
    string = string.replace(/\[[^\[\]]*\]/g, "'$&'");
  }
  if (string?.includes("DynamicConcat")) {
    string = string.replace(/\(\[/g, "(");
    string = string.replace(/\]\)/g, ")");
  }
  if (string?.includes("DynamicSum")) {
    string = string?.replace(/\(\[/g, "(");
    string = string?.replace(/\]\)/g, ")");
  }
  string = string?.replace(/DynamicConcat/g, "Concat");
  string = string?.replace(/DynamicSum/g, "Sum");
  if (string?.includes("get(source,'/")) {
    const regex = /get\(source,'(.*?)'\)/g;
    const replacedString = string.replace(regex, "$1");
    return `${replacedString}`;
  } else if (string?.includes("getVariables(source,'@")) {
    const regex = /getVariables\(source,'(.*?)'\)/g;
    const replacedString = string?.replace(regex, "$1");
    return `${replacedString}`;
  } else {
    return string;
  }
};

export const stringToJsonConverter = (str, section, sourceData) => {
  if (str.charAt(0) == "/" || str.substring(0, 10) == "Collection") {
    if (str.charAt(0) == "/") {
      let fieldData = section?.fields?.find((e) => {
        if (e.isCollection)
          return e.childObjectMaps.find(
            (item) => item.propertyName == str.slice(1)
          );
        else return e.propertyName == str.slice(1);
      });
      fieldData = fieldData?.isCollection
        ? fieldData.childObjectMaps?.find(
            (item) => item.propertyName == str.slice(1)
          )
        : fieldData;
      return {
        parameterType: 1,
        value: {
          ...fieldData,
          path: fieldData?.propertyName,
          value: fieldData?.datum,
        },
      };
    } else {
      let collectionName = str.substring(
        str.indexOf("(") + 1,
        str.indexOf(",")
      );
      let temp = str.substring(str.indexOf(",") + 1);
      let propertyName = temp.substring(0, temp.indexOf(","));
      let collection = section?.fields?.find((e) => {
        return e.propertyName == collectionName;
      });
      let collectionData = {
        ...collection?.childObjectMaps?.find(
          (x) => x.propertyName == propertyName
        ),
        isCollection: true,
        isCollectionParent: false,
        propertyNameParent: collection?.propertyName,
        filterString: str,
      };
      return {
        parameterType: 1,
        value: {
          ...collectionData,
          path: collectionData?.propertyName,
          value: collectionData?.datum,
        },
      };
    }
  } else if (str.charAt(0) == `'`) {
    return { parameterType: 3, value: str.slice(1, -1) };
  } else if (str.charAt(0) == "[") {
    return {
      parameterType: 3,
      value: str,
    };
  } else if (str.charAt(0) == "@") {
    var filterFileMetaData = !isEmpty(sourceData) ? sourceData : fileMetaData;
    var data = filterFileMetaData?.find(
      (itm) => itm.propertyName == str.substring(1)
    );
    return {
      parameterType: 4,
      value: {
        id: data.id,
        displayName: data.displayName,
        propertyName: data.propertyName,
        dataType: data.dataType,
        datum: data.datum,
      },
    };
  } else if (
    !["", undefined, null].includes(str) &&
    str.indexOf("(") != -1 &&
    str.indexOf(")") != -1
  ) {
    let functionName = str.substring(0, str.indexOf("("));
    let functionParameters = str.substring(
      str.indexOf("(") + 1,
      str.lastIndexOf(")")
    );
    let parameters;
    // if (functionName == "ReplaceLookup") {
    //   let x = functionParameters.split("[");
    //   parameters = x.map((item) => {
    //     if (item.includes("]") || item.includes("["))
    //       return {
    //         parameterType: 3,
    //         value: "[" + item.substring(0, item.indexOf("]") + 1),
    //       };
    //     else return stringToJsonConverter(item.slice(0, -2), section);
    //   });
    // } else {
    parameters = splitParams(functionParameters);
    // }
    let filteredValue = transformationFunctions.find(
      (item) => item.name == functionName
    );
    let json = {
      parameterType: 2,
      value: {
        id: filteredValue?.id,
        name: filteredValue?.name,
        dataType: filteredValue?.dataType,
        returnDataType: filteredValue?.returnDataType,
        hasDynamicParameters: filteredValue?.hasDynamicParameters ?? null,
        numberOfParameters: parameters?.length,
        parameters:
          // functionName == "ReplaceLookup"
          //   ? parameters :
          parameters?.map((itm) =>
            stringToJsonConverter(itm, section, sourceData)
          ),
      },
    };
    return json;
  } else
    return {
      parameterType: 1,
      value: null,
    };
};

export const collectionStringToJson = (filterString, collectionName) => {
  if (filterString != null) {
    let x = filterString.substring(
      filterString.indexOf("(") + 1,
      filterString.lastIndexOf(")")
    );

    let str = x.substring(x.indexOf("(") + 1, x.lastIndexOf(")"));
    let filterCondition = x.substring(0, x.indexOf("(")).split(",");
    let conditionCategory = FilterConditionCategory[collectionName];

    let arrayElements = splitParams(str);
    let json = {
      standardOrAdvanced: 1,
      filterCondition: getIn(filterCondition, "[2]", null),
      fieldOperations: arrayElements.map((item) => {
        let functionName = item.substring(0, item.indexOf("("));
        let filterElement = item
          .substring(item.indexOf("(") + 2, item.lastIndexOf(")"))
          .split(/,/);
        let collectionData = conditionCategory?.find(
          (_) =>
            _.propertyName == getIn(filterElement, "[0]", null).replace("/", "")
        );
        // let operationCategory = parseInt(getIn(filterElement, "[1]", null));
        return {
          collectionCategory: collectionData?.value,
          operationCategory: functionName,
          conditionCategory: getIn(filterElement, "[1]", null)?.slice(1, -1),
          dataType: collectionData?.dataType ?? null,
          isDropDown: collectionData?.isDropDown ?? false,
          collectionOption: collectionData?.propertyName ?? null,
          secondaryConditionCategory:
            functionName == "Between"
              ? getIn(filterElement, "[2]", null)?.slice(1, -1)
              : null,
        };
      }),
    };
    return json;
  }
  return null;
};

export const passthroughStringToFunctionConverter = (
  str,
  passthroughSourceData,
  headerOrValue
) => {
  switch (str?.charAt(0)) {
    case "/":
      var displayNameField =
        passthroughSourceData?.find((elem) => elem.fieldName === str) ?? str;
      return headerOrValue == 1
        ? displayNameField?.datum
        : displayNameField?.fieldName?.substring(1) ??
            displayNameField?.substring(1);
    case "'":
      return str.slice(1, -1);
    case "@":
      var displayNameFile = passthroughSourceData.find(
        (elem) => elem.propertyName == str.substring(1)
      );
      return displayNameFile?.datum;

    default:
      if (str == null) {
        return null;
      }
      if (str.substring(0, str.indexOf("(")) == "undefined") {
        return null;
      } else {
        let functionName = str.substring(0, str.indexOf("("));
        let parameters = splitParams(
          str.substring(str.indexOf("(") + 1, str.lastIndexOf(")"))
        );
        let params = parameters.map((element) => {
          if (
            !element.includes(")") &&
            !element.includes("'") &&
            !element.includes("/") &&
            !element.includes("@")
          ) {
            return null;
          }
          if (element.indexOf("(") != -1) {
            return passthroughStringToFunctionConverter(
              element,
              passthroughSourceData,
              headerOrValue
            );
          } else if (element.charAt(0) == "/") {
            var displayNameField = passthroughSourceData.find(
              (elem) => elem.fieldName === element
            );
            return headerOrValue == 1
              ? displayNameField?.datum
              : displayNameField?.fieldName.substring(1);
          } else if (element.charAt(0) == "@") {
            var displayNameFile = passthroughSourceData.find(
              (elem) => elem.propertyName == element.substring(1)
            );
            return displayNameFile?.datum;
          }
          return element.slice(1, -1);
        });
        return outputFunctionList(functionName, params);
      }
  }
};

export const stringToFunctionConverter = (
  str,
  headerOrValueOrFile,
  sourceData,
  fileName
) => {
  switch (str?.charAt(0)) {
    case "/":
      var displayNameFile = fileMetaData.find(
        (elem) => elem.propertyName == str.substring(1)
      );
      var displayNameField = CensusAndPayroll.find((elem) => {
        if (elem.isCollection)
          return elem.childObjectMaps.find(
            (item) => item.propertyName == str.substring(1)
          );
        else return elem.propertyName == str.substring(1);
      });
      displayNameField = displayNameField?.isCollection
        ? displayNameField.childObjectMaps?.find(
            (item) => item.propertyName == str.substring(1)
          )
        : displayNameField;
      if (isEmpty(displayNameField)) {
        return str.slice(1);
      }
      return headerOrValueOrFile == 1
        ? displayNameField?.displayName
        : headerOrValueOrFile == 2
        ? displayNameFile?.datum
        : displayNameField?.datum;
    case "'":
      return str.slice(1, -1);
    case "@":
      var displayNameFile = fileMetaData.find(
        (elem) => elem.propertyName == str.substring(1)
      );
      return headerOrValueOrFile == 1
        ? displayNameFile?.datum
        : displayNameFile?.propertyName;

    default:
      if (str == null) {
        return null;
      }
      if (str.substring(0, str.indexOf("(")) == "Collection") {
        var collectionIndex = str
          .substring(str.indexOf("("), str.lastIndexOf(")"))
          .match(/\([A-Za-z]+/g);
        var comaSeparatedCollection = str
          .substring(str.indexOf("("), str.lastIndexOf(")"))
          .match(/\,[A-Za-z]+/g);
        var findCollectionName = CensusAndPayroll.find(
          (elem) => elem.propertyName == collectionIndex[0]?.substring(1)
        );
        var findPropertyName = findCollectionName?.childObjectMaps.find(
          (elem) =>
            elem.propertyName == comaSeparatedCollection[0]?.substring(1)
        );
        return findPropertyName?.datum;
      } else if (str.substring(0, str.indexOf("(")) == "undefined") {
        return null;
      } else {
        let functionName = str.substring(0, str.indexOf("("));
        let parameters = splitParams(
          str.substring(str.indexOf("(") + 1, str.lastIndexOf(")"))
        );
        let params = parameters.map((element) => {
          if (element.indexOf("(") != -1) {
            return stringToFunctionConverter(
              element,
              headerOrValueOrFile,
              sourceData
            );
          } else if (element.charAt(0) == "/") {
            var displayNameFile = fileMetaData.find(
              (elem) => elem.propertyName == element.substring(1)
            );
            var displayNameField = CensusAndPayroll.find(
              (elem) => elem.propertyName == element.substring(1)
            );
            return headerOrValueOrFile == 1
              ? displayNameField?.displayName
              : headerOrValueOrFile == 2
              ? displayNameFile?.datum
              : displayNameField?.datum;
          } else if (element.charAt(0) == "@") {
            var concatSourceData = [undefined, null].includes(sourceData)
              ? fileMetaData
              : sourceData?.concat(fileMetaData);
            var displayNameFile = concatSourceData?.find(
              (elem) => elem.propertyName == element.substring(1)
            );
            return displayNameFile?.datum;
          }
          return element.slice(1, -1);
        });
        return outputFunctionList(functionName, params, fileName);
      }
  }
};

const compareValues = (operator, val1, val2) => {
  const value1 = String(val1); // Ensure value is a string
  const value2 = String(val2);

  const isDate1 = value1.includes("-") || value1.includes("/");
  const isDate2 = value2.includes("-") || value2.includes("/");

  if (isDate1 && isDate2) {
    // Both are dates → Convert and compare
    const date1 = new Date(value1);
    const date2 = new Date(value2);
    switch (operator) {
      case "greaterthan":
        return date1 > date2;
      case "lessthan":
        return date1 < date2;
      case "greaterthanorequal":
        return date1 >= date2;
      case "lessthanorequal":
        return date1 <= date2;
    }
  } else if (!isDate1 && !isDate2) {
    // Both are numbers → Convert and compare
    const num1 = Number(value1);
    const num2 = Number(value2);
    switch (operator) {
      case "greaterthan":
        return num1 > num2;
      case "lessthan":
        return num1 < num2;
      case "greaterthanorequal":
        return num1 >= num2;
      case "lessthanorequal":
        return num1 <= num2;
    }
  }
  return null;
};

export const outputFunctionList = (functionName, inputValue, fileName) => {
  inputValue.forEach((item, index) => {
    if (item === "Date" || item === "FileCreateDt") {
      inputValue[index] = moment().format("MM/DD/YYYY HH:mm:ss");
    } else if (item === "File" || item === "FileName") {
      inputValue[index] = fileName;
    }
  });
  functionName =
    functionName == "DynamicConcat"
      ? "Concat"
      : functionName == "DynamicSum"
      ? "Sum"
      : functionName;
  let returnObject = "";
  let res;
  switch (functionName?.toLowerCase()) {
    case "isnull":
      returnObject = isEmpty(inputValue[0]) ? true : false;
      res = returnObject;
      break;
    case "isnotnull":
      returnObject = inputValue[0] !== null ? true : false;
      break;
    case "isnotnullorempty":
      returnObject =
        inputValue[0] !== null || !isEmpty(inputValue[0]) ? true : false;
      break;
    case "equal":
      returnObject = inputValue[0] == inputValue[1] ? true : false;
      break;
    // case "greaterthan":
    //   if (inputValue[0]?.includes("-") || inputValue[0]?.includes("/") && inputValue[1]?.includes("-") || inputValue[1]?.includes("/")) {
    //     returnObject = new Date(inputValue[0]) > new Date(inputValue[1]) ? true : false;
    //   } else if (!(inputValue[0]?.includes("-") || inputValue[0]?.includes("/")) && !(inputValue[1]?.includes("-") || inputValue[1]?.includes("/"))) {
    //     returnObject = Number(inputValue[0]) > Number(inputValue[1]) ? true : false;
    //   } else {
    //     returnObject = null;
    //   }
    //   // returnObject =
    //   //  parseInt(inputValue[0]) > parseInt(inputValue[1]) ? true : false;
    //   break;
    // case "lessthan":
    //   if (inputValue[0]?.includes("-") || inputValue[0]?.includes("/") && inputValue[1]?.includes("-") || inputValue[1]?.includes("/")) {
    //     returnObject = new Date(inputValue[0]) < new Date(inputValue[1]) ? true : false;
    //   } else if (!(inputValue[0]?.includes("-") || inputValue[0]?.includes("/")) && !(inputValue[1]?.includes("-") || inputValue[1]?.includes("/"))) {
    //     returnObject = Number(inputValue[0]) < Number(inputValue[1]) ? true : false;
    //   } else {
    //     returnObject = null;
    //   }
    //   // returnObject =
    //   //   parseInt(inputValue[0]) < parseInt(inputValue[1]) ? true : false;
    //   break;
    // case "greaterthanorequal":
    //   if (inputValue[0]?.includes("-") || inputValue[0]?.includes("/") && inputValue[1]?.includes("-") || inputValue[1]?.includes("/")) {
    //     returnObject = new Date(inputValue[0]) >= new Date(inputValue[1]) ? true : false;
    //   } else if (!(inputValue[0]?.includes("-") || inputValue[0]?.includes("/")) && !(inputValue[1]?.includes("-") || inputValue[1]?.includes("/"))) {
    //     returnObject = Number(inputValue[0]) >= Number(inputValue[1]) ? true : false;
    //   } else {
    //     returnObject = null;
    //   }
    //   // returnObject =
    //   //   parseInt(inputValue[0]) >= parseInt(inputValue[1]) ? true : false;
    //   break;
    // case "lessthanorequal":
    //   if (inputValue[0]?.includes("-") || inputValue[0]?.includes("/") && inputValue[1]?.includes("-") || inputValue[1]?.includes("/")) {
    //     returnObject = new Date(inputValue[0]) <= new Date(inputValue[1]) ? true : false;
    //   } else if (!(inputValue[0]?.includes("-") || inputValue[0]?.includes("/")) && !(inputValue[1]?.includes("-") || inputValue[1]?.includes("/"))) {
    //     returnObject = Number(inputValue[0]) <= Number(inputValue[1]) ? true : false;
    //   } else {
    //     returnObject = null;
    //   }
    //   // returnObject =
    //   //   parseInt(inputValue[0]) <= parseInt(inputValue[1]) ? true : false;
    //   break;
    case "greaterthan":
    case "lessthan":
    case "greaterthanorequal":
    case "lessthanorequal":
      returnObject = compareValues(
        functionName?.toLowerCase(),
        inputValue[0],
        inputValue[1]
      );
      break;
    case "lengthequalto":
      returnObject =
        parseInt(inputValue[0]?.length) == parseInt(inputValue[1])
          ? true
          : false;
      break;
    case "lengthgreaterthan":
      returnObject =
        parseInt(inputValue[0]?.length) > parseInt(inputValue[1])
          ? true
          : false;
      break;
    case "lengthlesserthan":
      returnObject =
        parseInt(inputValue[0]?.length) < parseInt(inputValue[1])
          ? true
          : false;
      break;
    case "lengthgreaterthanorequalto":
      returnObject =
        parseInt(inputValue[0]?.length) >= parseInt(inputValue[1])
          ? true
          : false;
      break;
    case "lengthlesserthanorequalto":
      returnObject =
        parseInt(inputValue[0]?.length) <= parseInt(inputValue[1])
          ? true
          : false;
      break;
    case "between":
      returnObject =
        parseInt(inputValue[0]) >= parseInt(inputValue[1]) &&
        parseInt(inputValue[0]) <= parseInt(inputValue[2])
          ? true
          : false;
      break;
    case "contains":
      returnObject = inputValue[0]?.includes(inputValue[1]) ? true : false;
      break;
    case "iff":
      returnObject = inputValue[0] == true ? inputValue[1] : inputValue[2];
      break;
    case "split":
      var arg1 = inputValue[1]?.replace(/'/g, "");
      var arg2 = inputValue[2];
      returnObject = inputValue[0]
        ?.split(arg1)
        [arg2]?.toString()
        ?.replace(/,/g, " ");
      break;
    case "concat":
      for (let i = 0; i < inputValue.length; i++) {
        returnObject = returnObject.concat(inputValue[i]);
      }
      break;
    case "tolowercase":
      returnObject = inputValue[0]?.toLowerCase();
      break;
    case "substring":
      var firstElement = inputValue.shift();
      var arg1 = parseInt(inputValue[0]);
      var arg2 = parseInt(inputValue[1]);
      if (typeof firstElement === "string") {
        returnObject = firstElement?.substring(arg1, arg2 + arg1);
      }
      break;
    case "touppercase":
      returnObject = inputValue[0]?.toUpperCase();
      break;
    case "numbertostring":
      returnObject = inputValue[0]?.toString();
      break;
    case "padleading":
      var firstElement = inputValue[0]?.toString();
      var arg1 = inputValue[1];
      var arg2 = inputValue[2]?.replace(/'/g, "");
      returnObject = firstElement?.padStart(arg1, arg2);
      break;
    case "padtrailing":
      var firstElement = inputValue[0]?.toString();
      var arg1 = inputValue[1];
      var arg2 = inputValue[2]?.replace(/'/g, "");
      returnObject = firstElement?.padEnd(arg1, arg2);
      break;
    case "tonumber":
      returnObject = !isNumber(inputValue[0]) ? "" : parseInt(inputValue[0]);
      //returnObject = parseInt(inputValue[0]);
      break;
    case "trim":
      returnObject = inputValue[0]?.trim();
      break;
    case "trimleading":
      returnObject = inputValue[0]?.trimStart();
      break;
    case "trimtrailing":
      returnObject = inputValue[0]?.trimEnd();
      break;
    case "indexof":
      returnObject = inputValue[0]?.indexOf(inputValue[1]);
      break;
    case "startswith":
      var arg1 = inputValue[0];
      var arg2 = inputValue[1];
      returnObject = inputValue[0]?.startsWith(inputValue[1]);
      break;
    case "convertemptystringtonull":
      returnObject = inputValue[0] == "" ? "null" : inputValue[0];
      break;
    case "endswith":
      var arg1 = inputValue[0];
      var arg2 = inputValue[1];
      returnObject = inputValue[0]?.endsWith(inputValue[1]);
      break;

    case "defaultoption":
      var temp_ = null;
      if (isEmpty(inputValue[0])) {
        temp_ = inputValue[1];
      } else {
        temp_ = inputValue[0];
      }
      returnObject = temp_;
      break;

    case "replace":
      returnObject = inputValue[0]?.replace(inputValue[1], inputValue[2]);
      break;
    case "replacelookup":
      let temp = null;
      if (
        typeof inputValue[0] == "string" &&
        typeof inputValue[1] == "string" &&
        typeof inputValue[2] == "string"
      ) {
        let temp_arg1 = inputValue[1];
        temp_arg1 = temp_arg1?.replace("[", "");
        temp_arg1 = temp_arg1?.replace("]", "");
        temp_arg1 = temp_arg1?.split(",");
        temp_arg1 = temp_arg1?.map((e) => e.slice(1, -1));
        let temp_arg2 = inputValue[2];
        temp_arg2 = temp_arg2?.replace("[", "");
        temp_arg2 = temp_arg2?.replace("]", "");
        temp_arg2 = temp_arg2?.split(",");
        temp_arg2 = temp_arg2?.map((e) => e?.slice(1, -1));

        if (temp_arg1?.includes(inputValue[0])) {
          temp = temp_arg2[temp_arg1?.indexOf(inputValue[0])];
        }
      } else if (!isEmpty(inputValue[1]) && !isEmpty(inputValue[2])) {
        let temp_arg1 = inputValue[1]?.toString();
        temp_arg1 = temp_arg1?.replace("[", "");
        temp_arg1 = temp_arg1?.replace("]", "");
        temp_arg1 = temp_arg1?.split(",");
        temp_arg1 = temp_arg1?.map((e) => e?.slice(1, -1));
        let temp_arg2 = inputValue[2]?.toString();
        temp_arg2 = temp_arg2?.replace("[", "");
        temp_arg2 = temp_arg2?.replace("]", "");
        temp_arg2 = temp_arg2?.split(",");
        temp_arg2 = temp_arg2?.map((e) => e?.slice(1, -1));
        if (temp_arg1?.includes(inputValue[0])) {
          temp = temp_arg2[temp_arg1?.indexOf(inputValue[0])];
        }
      }
      returnObject = temp;
      break;
    case "datetostring":
      returnObject = moment(inputValue[0])
        ?.format(inputValue[1]?.toUpperCase())
        ?.toString();
      break;
    case "datetostringwithblank":
      returnObject = inputValue[0]
        ? moment(inputValue[0])
            ?.format(inputValue[1]?.toUpperCase())
            ?.toString()
        : null;
      break;
    case "todate":
      returnObject = moment(inputValue[0]?.toString().trim())
        .format(inputValue[1]?.toUpperCase())
        .toString();
      break;
    case "tostring":
      returnObject = inputValue[0]?.toString();
      break;

    case "strip":
      var arg1 = inputValue[1];
      returnObject = inputValue[0]
        ?.split(inputValue[1]?.slice(1, -1))
        ?.join("");
      // input_value.split(arg1.slice(1, -1)).join("")
      break;
    // 11/1/2022, 12:00:00 AM
    case "startofmonth":
      // var date = new Date(inputValue[0]);
      // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      // returnObject = firstDay;
      // returnObject = moment().startOf("month").format("MM/DD/YYYY");
      returnObject = moment(inputValue[0])
        .startOf("month")
        .format("MM/DD/YYYY");
      break;
    case "endofthemonth":
      returnObject = moment(inputValue[0]).endOf("month").format("MM/DD/YYYY");
      break;
    case "today":
      returnObject = moment().format("MM/DD/YYYY");
      break;
    case "divide":
      returnObject =
        !isNaN(parseFloat(inputValue[0])) && !isNaN(parseFloat(inputValue[1]))
          ? parseFloat(inputValue[0]) / parseFloat(inputValue[1])
          : "";
      break;
    case "ceil":
      returnObject = !isNaN(parseFloat(inputValue[0]))
        ? Math.ceil(parseFloat(inputValue[0]))
        : "";
      break;
    case "floor":
      returnObject = !isNaN(parseFloat(inputValue[0]))
        ? Math.floor(parseFloat(inputValue[0]))
        : "";
      break;
    case "max":
      returnObject =
        !isNaN(parseFloat(inputValue[0])) && !isNaN(parseFloat(inputValue[1]))
          ? Math.max(parseFloat(inputValue[0]), parseFloat(inputValue[1]))
          : "";
      break;
    case "min":
      returnObject =
        !isNaN(parseFloat(inputValue[0])) && !isNaN(parseFloat(inputValue[1]))
          ? Math.min(parseFloat(inputValue[0]), parseFloat(inputValue[1]))
          : "";
      break;
    case "modulo":
      returnObject =
        !isNaN(parseFloat(inputValue[0])) && !isNaN(parseFloat(inputValue[1]))
          ? parseFloat(inputValue[0]) % parseFloat(inputValue[1])
          : "";
      break;
    case "abs":
      returnObject = !isNaN(inputValue[0]) ? Math.abs(inputValue[0]) : "";
      break;
    case "sum":
      returnObject =
        inputValue?.reduce(
          (a, b) => (parseFloat(a) || 0) + (parseFloat(b) || 0)
        ) ?? 0;
      break;
    case "length":
      var arg1 = inputValue[0];
      returnObject = arg1?.length;
      break;
    case "get":
      returnObject = inputValue[1]?.substring(1);
  }
  return returnObject;
};

// export const FilterOptions = [
//   {
//     displayName:"Is Not Null",
//     functionName:"IsNotNull",
//     parameter:[
//       {value:"", parameterType}
//     ],
//     dataType:DataType[1],
//     noOfParameter:0,
//   },
//   {
//     displayName:"Contains",
//     functionName:"Contains",
//     parameter:[
//       {name:"string", value:""}
//     ],
//     dataType:DataType[1],
//     noOfParameter:0,
//   },
// "Is Null",
// "Between",
// "Is equal to",
// "Contains",
// "Starts With",
// "Ends With",
// "In",
// "Length Equal to",
// "Length Greater than",
// "Length Lesser than",
// "Length Greater than or equal to",
// "Length Lesser than or equal to",
// "Greater than",
// "Lesser than",
// "Greater than or equal to",
// "Lesser than or equal to",
// ]

// export const arr= [

//   {
//     fieldName:"FirstName",
//     expression:"Contains(/FirstName,'abc')"
//   },
//   {
//     fieldName:"LastName",
//     expression:"Contains(/LastName,'bcd')"
//   }
// ]

// export const statemodel=[
//   {
//     displayName:"Contains",
//     functionName:"Contains",
//     fieldName:"/FirstName",
//     parameter:[
//       {value:"/FirstName"},
//       {value:"'abc'"}
//     ],
//     dataType:DataType[1],
//     noOfParameter:1,

//   },
// ]
