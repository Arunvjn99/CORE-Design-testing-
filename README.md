# CORE Census POC: Employee › Plan Details

A small React app that runs the **production** "Employee › Plan Details" screens
(Balance Summary, Vesting, and the Edit Vesting slide-over) from the
`congruent-core-frontend` master branch **on their own**, with no backend and no login.

The design target is the Figma *Census* file (node `4622:78064`).

## Run it

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:5173
```

## What's production code and what's POC code

Everything under `src/` **except `src/poc/`** is copied verbatim from the master
repo. No component files were edited. Only the files these screens actually
import are included: 546 modules found by a build-time import trace, plus the
global `src/styles` and `src/abstracts` SCSS. The other ~36 MB of the app is
left out.

| File | Purpose |
|---|---|
| `src/poc/main.jsx` | Entry point. Mounts the real `PersistentAppLayoutContainer` (header and sidebar) and `EmployeeManagePlansModules` at the production URL `/manage-census/employee-information/employee-manage-plans/edit/1001/723237`. |
| `src/poc/mockApi.js` | Replaces axios' default adapter so every production service call resolves from local fixtures. Any call without a fixture is logged to the console as `[POC mock] no fixture for …`. |
| `src/poc/fixtures/` | The Figma data (Kevin Thomas, Mark Value Funding 401(K), $40,200.00, ERMatch 100%) plus full-access permissions derived from `src/mocks/tenantOne.json`. |
| `src/poc/overrides/AuthorizeService.jsx` | Stub OIDC user. `vite.config.mjs` swaps it in for the real service. |
| `src/poc/fa-shim/` | Font Awesome **Pro** icons are licensed, so every Pro icon the code imports is mapped to the Free icon of the same name. 29 names have no Free equivalent and show a neutral circle. To use real Pro icons, install them with your licensed `.npmrc` and remove the three aliases in `vite.config.mjs`. |
| `public/poc/` | Images taken from Figma: employee photo and tenant logo. |

## Production components the screens use

- **Shell:** `hoc/withAppLayout` → `Header`, `Sidebar`, `SideBarContent`
- **Page:** `containers/Employee/EmployeeManagePlansModulesContainer` (profile header and vertical `Tabs` sub-menu)
- **Balance Summary:** `BalanceSummary`, `BalanceSummarySourceTab`, `BalanceSummaryInvestmentTab` and `Piechartsummary` (chart.js)
- **Vesting:** `Vesting` → `CensusVestingCard` → `SliderPanel`, plus the Formik fields: `FieldInput`, the toggle, `FieldButtonGroup` (Yes/No) and `FieldTextarea`

## Gaps between production and the Figma design

| Area | Figma | Production today |
|---|---|---|
| Page title | "← Back" link plus "Plan Details" | A notes icon only |
| Balance figures | 3 (Plan balance, Vested balance, Rate of return) | 4 (Account balance, Total outstanding loan, Vested balance, Invested amount), plus a "Generate Statement" button |
| Slide-over width | 600px | 80% of the viewport (`SliderPanel` default) |
| Tenant logo | 191×34 | Forced to 50px high by `.company-logo-new` |
| Navbar | Bell with count, help icon, avatar | User icon only |

## Findings worth fixing in the master repo

- **Hidden Chart.js registration:** the Balance Summary pie only works because an unrelated module (`containers/ManageYearEndProcess/PieChart.jsx`) registers `ArcElement` as a side effect. Loaded on its own, the screen crashes. The POC registers it in `main.jsx`.
- **Undeclared Kendo dependencies:** `@progress/kendo-react-grid` 14.x needs several packages that `package.json` doesn't declare: `kendo-react-conversational-ui`, `kendo-react-upload`, `kendo-react-notification`, `kendo-common`, `kendo-csv`, `kendo-smartpaste-common` and `kendo-webspeech-common`. They were added here.
