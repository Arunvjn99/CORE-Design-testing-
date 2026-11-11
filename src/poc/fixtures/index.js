import tenantConfig from "@/mocks/tenantOne.json";
// Fixture data for the POC, taken from the Figma "Census" screens
// (Employee Details > Plan details > Balance Summary / Vesting).
// Each route matches an API path used by the production services.

const employee = {
  id: 1001,
  employeeId: 1001,
  firstName: "Kevin",
  lastName: "Thomas",
  employeeName: "Kevin Thomas",
  ssn: "AAA-GG-XXXX",
  uniquePersonalIdentification: "1001",
  employmentStatus: "Active",
  imageURL: "/poc/avatar-kevin.png",
};

const plan = {
  id: 723237,
  planId: 723237,
  planName: "Mark Value Funding 401(K)",
  planCategory: 2,
  companyName: "Galileo",
  planType: 1,
};

const regular = (sourceId, investmentId, investmentType, name, amount) => ({
  sourceId,
  investmentId,
  investmentType,
  name,
  investmentName: name,
  totalAccountBalance: amount,
  regularBalanceUnits: amount / 10,
  earningsBalanceUnits: 0,
  basisBalanceUnits: 0,
  repaymentBalanceUnits: 0,
  netAssetValue: 10,
});

const accountBalance = {
  planType: 1,
  totalAccountBalance: 40200,
  investedAmount: 40200,
  sources: [
    {
      sourceId: 1,
      sourceName: "Employee Deferral",
      accountBalance: 31000,
      vestedBalance: 0,
      regularInvestmentBalances: [
        regular(1, 11, 1, "NLG annuity funds", 16000),
        regular(1, 21, 2, "Mid cap funds", 15000),
      ],
      investmentwiseBalances: [
        regular(1, 11, 1, "NLG annuity funds", 16000),
        regular(1, 21, 2, "Mid cap funds", 15000),
      ],
    },
    {
      sourceId: 2,
      sourceName: "ERMatch",
      accountBalance: 9200,
      vestedBalance: 9200.38,
      regularInvestmentBalances: [
        regular(2, 12, 1, "Money market fund", 4000),
        regular(2, 22, 2, "Small cap index fund", 5200),
      ],
      investmentwiseBalances: [
        regular(2, 12, 1, "Money market fund", 4000),
        regular(2, 22, 2, "Small cap index fund", 5200),
      ],
    },
  ],
};

const vesting = [
  {
    id: 1,
    sourceId: 2,
    sourceName: "ERMatch",
    vestingPercentage: 100,
    vestingOverride: false,
    vestingYOS: null,
    vestingMultiplier: null,
    creditedThisYear: null,
    vestingSchedule: null,
    comments: "Participant data changed",
  },
];

// Full-access permissions built from the tenant config the app ships with:
// every menu / sub-menu item gets Create-Read-Update-Delete-Submit.
const permissions = Object.fromEntries(
  Object.entries(tenantConfig)
    .filter(([, v]) => Array.isArray(v))
    .map(([k, list]) => [k, Object.fromEntries(list.map((i) => [i, "CRUDS"]))])
);

export const routes = [
  { test: /\/Home\/GetMenuPermissions/, data: permissions },
  { test: /\/Home\/GetPadNumber/, data: [] },
  { test: /\/Home\/GetLogo/, data: "/poc/tenant-logo.svg" },
  { test: /\/Payroll\/GetEmployee\//, data: employee },
  { test: /\/Payroll\/GetPlanMetaData\//, data: plan },
  {
    test: /\/Payroll\/GetEnrolledPlans\//,
    data: [{ ...plan, status: "Enrolled" }],
  },
  {
    test: /BasicPlanDetails\/GetBasicPlanDetails/,
    data: { plan: { ...plan } },
  },
  { test: /GetNotes|Note\/ByEntity/, data: { notes: [] } },
  { test: /GetParticipantAccountBalanceByPlan/i, data: accountBalance },
  {
    test: /GetMasterInvestmentType/,
    data: [
      { id: 1, name: "Cash Equivalents" },
      { id: 2, name: "Small/Mid cap funds" },
    ],
  },
  {
    test: /TotalOutStandingLoanPrinciple/i,
    data: { totalOutStandingLoanPrinciple: 0 },
  },
  { test: /GetEmployeeVestingDetails/, data: vesting },
  { test: /GetEmployeeInvestmentsRor/, data: { rateOfReturn: 5 } },
];
