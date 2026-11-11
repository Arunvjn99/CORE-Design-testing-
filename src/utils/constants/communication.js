export const MANAGE_COMMUNICATION_ROUTES = {
  PLAN_LEVEL_COMMUNICATION: `plan-level-communication`,
  PLAN_LEVEL_COMMUNICATION_LINK: `/communication/plan-level-communication`,
  COMMUNICATION: `communication`,
  COMMUNICATION_LINK: `/communication/communication`,
  ADHOC_COMMUNICATION: `adhoc-communication`,
  ADHOC_COMMUNICATION_LINK: `/communication/adhoc-communication`,
  NEW_COMMUNICATION: `new-communication`,
  COMMUNICATION_HISTORY: `Communication-history`,
  COMMUNICATION_HISTORY_LINK: `/communication/Communication-history`,
  EMAIL_LAYOUT: `email-layout`,
  EMAIL_LAYOUT_LINK: `/communication/email-layout`,
  CONFIGURE_COMMUNICATION: `configure-communication`,
  COMMUNICATION_INFO: `communication-info`,
  COMMUNICATION_INFO_LINK: `/communication/communication-info`,
  COMMUNICATION_HISTORY_INFO: `/Communication-history-info`,
  ADHOC_COMMUNICATION_INFO: `adhoc-communication-info`,
  ADHOC_COMMUNICATION_INFO_LINK: `/communication/adhoc-communication-info`,
  COMMUNICATION_HISTORY_INFO_LINK: `/communication/Communication-history-info`,
  NEW_ADHOC_COMMUNICATION: `new-adhoc-communication`,
  EMAIL_LAYOUT_INFO: `email-layout-info`,
  EMAIL_LAYOUT_INFO_LINK: `/communication/email-layout-info`,
  DISCLOSURES_AND_NOTICES: `disclosures-and-notices`,
  POSTAL_MAIL_LOG_LINK: `/communication/postal-mail-log`,
  POSTAL_MAIL_LOG: `postal-mail-log`,
};
export const MANAGE_COMMUNICATION_MENU = [
  {
    //   label: "Communications",
    //   subNav: [
    //     {
    //       id: "planLevelCommunication",
    //       label: "Plan Communication",
    //       path: MANAGE_COMMUNICATION_ROUTES.PLAN_LEVEL_COMMUNICATION,
    //       contentHeader: "Plan Communication",
    //       breadCrumbs: [],
    //       childRoutes: [MANAGE_COMMUNICATION_ROUTES.CONFIGURE_COMMUNICATION],
    //     },
    //     {
    //       id: "communication",
    //       label: "Manage Communication",
    //       path: MANAGE_COMMUNICATION_ROUTES.COMMUNICATION,
    //       contentHeader: "Manage Communication",
    //       breadCrumbs: [],
    //       childRoutes: [
    //         MANAGE_COMMUNICATION_ROUTES.COMMUNICATION_INFO,
    //         MANAGE_COMMUNICATION_ROUTES.NEW_COMMUNICATION,
    //       ],
    //     },
    //   ],
    // },
    id: "communication",
    label: "Communications",
    path: MANAGE_COMMUNICATION_ROUTES.PLAN_LEVEL_COMMUNICATION,
    contentHeader: "Communications",
    breadCrumbs: [],
    childMenus: [
      {
        id: "planLevelCommunication",
        label: "Plan Communication",
        path: MANAGE_COMMUNICATION_ROUTES.PLAN_LEVEL_COMMUNICATION,
        contentHeader: "Plan Communication",
        breadCrumbs: [],
        childRoutes: [MANAGE_COMMUNICATION_ROUTES.CONFIGURE_COMMUNICATION],
      },

      {
        id: "communication",
        label: "Manage Communication",
        path: MANAGE_COMMUNICATION_ROUTES.COMMUNICATION,
        contentHeader: "Manage Communication",
        breadCrumbs: [],
        childRoutes: [
          MANAGE_COMMUNICATION_ROUTES.COMMUNICATION_INFO_LINK,
          MANAGE_COMMUNICATION_ROUTES.NEW_COMMUNICATION,
        ],
      },
      {
        id: "adhocCommunication",
        label: "Ad hoc Communication",
        path: MANAGE_COMMUNICATION_ROUTES.ADHOC_COMMUNICATION,
        contentHeader: "Ad hoc Communication",
        breadCrumbs: [],
        childRoutes: [
          MANAGE_COMMUNICATION_ROUTES.ADHOC_COMMUNICATION_INFO_LINK,
          MANAGE_COMMUNICATION_ROUTES.NEW_ADHOC_COMMUNICATION,
        ],
      },
    ],
  },
  {
    id: "emailLayout",
    label: "E-Mail Layout",
    path: MANAGE_COMMUNICATION_ROUTES.EMAIL_LAYOUT_LINK,
    contentHeader: "E-Mail Layout",
    breadCrumbs: [],
    childRoutes: [MANAGE_COMMUNICATION_ROUTES.EMAIL_LAYOUT_INFO_LINK],
  },
  {
    id: "communicationHistory",
    label: "Communication History",
    path: MANAGE_COMMUNICATION_ROUTES.COMMUNICATION_HISTORY,
    contentHeader: "Communication History",
    breadCrumbs: [],
    childRoutes: [MANAGE_COMMUNICATION_ROUTES.COMMUNICATION_HISTORY_INFO],
  },
  {
    id: "disclosuresAndNotices",
    label: "Disclosures & Notices",
    path: MANAGE_COMMUNICATION_ROUTES.DISCLOSURES_AND_NOTICES,
    contentHeader: "Disclosures & Notices",
    breadCrumbs: [],
    childRoutes: [MANAGE_COMMUNICATION_ROUTES.DISCLOSURES_AND_NOTICES],
  },
  {
    id: "postalMailLog",
    label: "Postal Mail Log",
    path: MANAGE_COMMUNICATION_ROUTES.POSTAL_MAIL_LOG_LINK,
    contentHeader: "Postal Mail Log",
    breadCrumbs: [],
    childRoutes: [MANAGE_COMMUNICATION_ROUTES.POSTAL_MAIL_LOG_LINK],
  },
];

export const manageCommunicationFormNames = {
  PLAN_LEVEL_COMMUNICATION: "plan level communication",
  ADHOC_COMMUNICATION_LISTING: "adhoc communication listing",
  COMMUNICATION: "communication",
  NEW_COMMUNICATION: "new communication",
  COMMUNICATION_HISTORY: "communication history",
  EMAIL_LAYOUT: "email layout",
  CONFIGURE_COMMUNICATION: "configure communication",
  COMMUNICATION_INFO: "communication info",
  COMMUNICATION_HISTORY_INFO: "communication history info",
  EMAIL_LAYOUT_INFO: "email layout info",
  DISCLOSURES_AND_NOTICES: "disclosures and notices",
  ADHOC_COMMUNICATION_INFO: "adhoc communication info",
  POSTAL_MAIL_LOG: "postal mail log",
};
export const communicationFormFields = {
  [manageCommunicationFormNames.PLAN_LEVEL_COMMUNICATION]: {
    planName: "planName",
    type: "type",
    search: "search",
    eventName: "eventName",
    eventCategory: "eventCategory",
    categorizedLevel: "categorizedLevel",
    fromDate: "fromDate",
    toDate: "toDate",
    planId: "planId",
    planGroupId: "planGroupId",
  },
  [manageCommunicationFormNames.ADHOC_COMMUNICATION_LISTING]: {
    planName: "planName",
    type: "type",
    search: "search",
    eventName: "eventName",
    eventCategory: "eventCategory",
    categorizedLevel: "categorizedLevel",
    fromDate: "fromDate",
    toDate: "toDate",
    planId: "planId",
    planGroupId: "planGroupId",
    createdrange: "createdrange",
  },
  [manageCommunicationFormNames.COMMUNICATION_INFO]: {
    channel: "channel",
    name: "name",
    communicationBlobAttachment: "communicationBlobAttachment",
    description: "description",
    subjectMetaData: "subjectMetaData",
    sendTo: "sendTo",
    cc: "cc",
    subject: "subject",
    levelOfCommunication: "level",
    planId: "planId",
    planGroupId: "planGroupId",
    planMappings: "planMappings",
    planGroupMappings: "planGroupMappings",
    type: "type",
    event: "event",
    eventId: "eventId",
    eventType: "eventType",
    eventCategory: "eventCategory",
    subEvent: "subEvent",
    scheduleName: "scheduleName",
    frequencyType: "frequencyType",
    //startDay: "startDay",
    weekly_StartDay: "weekly_StartDay",
    biWeekly_StartDate: "biWeekly_StartDate",
    // startDate: "startDate",
    // firstBeginDay: "firstBeginDay",
    // secondBeginDay: "secondBeginDay",
    semiMonthly_FirstDay: "semiMonthly_FirstDay",
    semiMonthly_SecondDay: "semiMonthly_SecondDay",
    monthly_StartDay: "monthly_StartDay",
    quarterly_StartsFrom: "quarterly_StartsFrom",
    semiAnnually_StartsFrom: "semiAnnually_StartsFrom",
    annually_StartsFrom: "annually_StartsFrom",
    anually_StartDate: "anually_StartDate",
    attachmentFileUpload: "attachmentFileUpload",
    // monthStartingDay: "monthStartingDay",
    // startMonth: "startMonth",
    // startMonthSemiAnnually: "startMonthSemiAnnually",
    // startMonthAnnually: "startMonthAnnually",
    time: "time",
    communicationTemplateHTML: "communicationTemplateHTML",
  },
  [manageCommunicationFormNames.ADHOC_COMMUNICATION_INFO]: {
    subject: "subject",
    level: "level",
    communicationTemplateHTML: "communicationTemplateHTML",
    scheduleType: "scheduleType",
    scheduleDate: "scheduleDate",
    scheduleTimeMinutes: "scheduleTimeMinutes",
    scheduleTimeHours: "scheduleTimeHours",
    attachmentFileUpload: "attachmentFileUpload",
  },
  [manageCommunicationFormNames.EMAIL_LAYOUT_INFO]: {
    layoutDescription: "layoutDescription",
    layoutName: "layoutName",
    layoutHTML: "layoutHTML",
  },
  [manageCommunicationFormNames.DISCLOSURES_AND_NOTICES]: {
    search: "search",
    planId: "planId",
    rkPlanNumber: "rkPlanNumber",
    planName: "planName",
    dateRange: "dateRange",
    documentName: "documentName",
    documentType: "documentType",
    sendTo: "sendTo",
    sentDate: "sentDate",
  },
  [manageCommunicationFormNames.POSTAL_MAIL_LOG]: {
    search: "search",
    documentType: "documentType",
    dateRange: "dateRange",
    documentStatus: "documentStatus",
  },
};

// export const channelForCommunication = [
//   {
//     label: "Email",
//     value: 1,
//   },
//   {
//     label: "SMS",
//     value: 2,
//   },
//   {
//     label: "Email & SMS",
//     value: 3,
//   },
//   {
//     label: "SMS & Email",
//     value: 3,
//   },
// ]
export const levelOptions = {
  1: "Global",
  2: "Plan Level",
  3: "Plan Group",
};
export const CategoryOptionsWithoutAdhoc = [
  {
    label: "Plan",
    value: 1,
  },
  {
    label: "Employee",
    value: 2,
  },
  {
    label: "Payroll and Funding",
    value: 3,
  },
  {
    label: "Miscellaneous",
    value: 4,
  },
  {
    label: "Rollover In",
    value: 5,
  },
  {
    label: "Enrollment",
    value: 6,
  },
  {
    label: "Loans and Distributions",
    value: 7,
  },
  {
    label: "Corporate Actions",
    value: 8,
  },
  {
    label: "Fee",
    value: 9,
  },
  {
    label: "Eligibility",
    value: 10,
  },
  {
    label: "Automated Payroll",
    value: 12,
  },
  {
    label: "Trade",
    value: 13,
  },
  {
    label: "Managed accounts",
    value: 14,
  },
  {
    label: "Disclosures & Notices",
    value: 15,
  },
  {
    label: "Year-End Processing",
    value: 16,
  },
  {
    label: "Transfers",
    value: 17,
  },
  {
    label: "In-Plan Roth Conversion",
    value: 18,
  },
  {
    label: "Adjustments",
    value: 19,
  },
  {
    label: "Rebalance",
    value: 20,
  },
];

export const CategoryOptions = [
  {
    label: "Plan",
    value: 1,
  },
  {
    label: "Employee",
    value: 2,
  },
  {
    label: "Payroll and Funding",
    value: 3,
  },
  {
    label: "Miscellaneous",
    value: 4,
  },
  {
    label: "Rollover In",
    value: 5,
  },
  {
    label: "Enrollment",
    value: 6,
  },
  {
    label: "Loans and Distributions",
    value: 7,
  },
  {
    label: "Corporate Actions",
    value: 8,
  },
  {
    label: "Fee",
    value: 9,
  },
  {
    label: "Eligibility",
    value: 10,
  },
  {
    label: "Adhoc",
    value: 11,
  },
  {
    label: "Automated Payroll",
    value: 12,
  },
  {
    label: "Trade",
    value: 13,
  },
  {
    label: "Managed accounts",
    value: 14,
  },
  {
    label: "Disclosures & Notices",
    value: 15,
  },
  {
    label: "Year-End Processing",
    value: 16,
  },
  {
    label: "Transfers",
    value: 17,
  },
  {
    label: "In-Plan Roth Conversion",
    value: 18,
  },
  {
    label: "Adjustments",
    value: 19,
  },
  {
    label: "Rebalance",
    value: 20,
  },
];

export const CategoryEnumOptions = [
  {
    label: "Plan",
    value: "plan",
  },
  {
    label: "Employee",
    value: "Employee",
  },
  {
    label: "Payroll and Funding",
    value: "Payroll",
  },
  {
    label: "Miscellaneous",
    value: "Miscellaneous",
  },
  {
    label: "Rollover In",
    value: "RollOverIn",
  },
  {
    label: "Enrollment",
    value: "Enrollment",
  },
  {
    label: "Loans and Distributions",
    value: "LoansAndDistribution",
  },
  {
    label: "Corporate Actions",
    value: "CorporateActions",
  },
  {
    label: "Fee",
    value: "Fee",
  },
  {
    label: "Eligibility",
    value: "Eligibility",
  },
  {
    label: "Adhoc",
    value: "Adhoc",
  },
  {
    label: "Trade",
    value: "Trade",
  },
  {
    label: "Managed accounts",
    value: "Managedaccounts",
  },
];

export const channelForCommunication = {
  Email: 1,
  SMS: 2,
  "Email&SMS": 3,
  "SMS&Email": 4,
};

// export const ALL_MANAGE_COMMUNICATION_ROUTES = [
//   ...MANAGE_COMMUNICATION_MENU,
//   {
//     id: "holidayCalendar",
//     contentHeader: "Maintenance",
//     path: MANAGE_PLAN_CONFIG_ROUTES.HOLIDAY_CALENDAR,
//     breadCrumbs: [
//       {
//         label: "Manage Maintenance",
//         link: MANAGE_PLAN_CONFIG_ROUTES.HOLIDAY_CALENDAR,
//       },
//     ],
//   },
//   {
//     id: "holidayCalendar",
//     contentHeader: "Holiday",
//     path: MANAGE_PLAN_CONFIG_ROUTES.ADD_HOLIDAY,
//     breadCrumbs: [
//       {
//         label: "Home",
//         link: ROUTES.HOME,
//       },
//       {
//         label: "Manage Holiday Calendar",
//         link: MANAGE_PLAN_CONFIG_ROUTES.HOLIDAY_CALENDAR,
//       },
//     ],
//   },
//   {
//     id: "managePlanGroup",
//     contentHeader: "Maintenance",
//     path: MANAGE_PLAN_CONFIG_ROUTES.MANAGE_PLAN_GROUP,
//     breadCrumbs: [
//       {
//         label: "Manage Maintenance",
//         link: MANAGE_PLAN_CONFIG_ROUTES.MANAGE_PLAN_GROUP,
//       },
//     ],
//   },
//   {
//     id: "managePlanGroup",
//     contentHeader: "Plan Group",
//     path: MANAGE_PLAN_CONFIG_ROUTES.ADD_PLAN_GROUP,
//     breadCrumbs: [
//       {
//         label: "Home",
//         link: ROUTES.HOME,
//       },
//       {
//         label: "Maintenance",
//         link: MANAGE_PLAN_CONFIG_ROUTES.MANAGE_PLAN_GROUP,
//       },
//     ],
//   },
// ];
