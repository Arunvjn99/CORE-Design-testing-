// POC entry point. Mounts the production Employee > Plan Details screen
// (EmployeeManagePlansModules) inside the production app shell, with the API
// served from local fixtures. Only files under src/poc are new.
import "./mockApi"; // must load first: installs the fixture adapter on axios
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";

import "@/index.scss";
import theme from "@/theme";
import { AppLayoutProvider, ManageCensusProvider } from "@/contexts";
import {
  GlobalProvider,
  UseEffectTriggerProvider,
} from "@/SDUI/contexts/AppContext";
import { PersistentAppLayoutContainer } from "@/hoc/withAppLayout";
import EmployeeManagePlansModules from "@/layouts/Employee/EmployeeManagePlansModules";
import { MANAGE_CENSUS_ROUTES } from "@/utils/constants/employee";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// In the full app, Chart.js pie elements are registered as a side effect of
// containers/ManageYearEndProcess/PieChart.jsx. This POC loads only the
// Plan Details screen, so it registers them explicitly (same three elements).
ChartJS.register(ArcElement, Tooltip, Legend);

// Same URL shape as production: /manage-census/employee-information/employee-manage-plans/:flow/:censusId/:planId
const BASE = "/manage-census/employee-information";
const PLAN_DETAILS = `${BASE}/${MANAGE_CENSUS_ROUTES.EMPLOYEE_MANAGE_PLAN_MODULES}/edit/1001/723237`;

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <AppLayoutProvider>
      <UseEffectTriggerProvider>
        <GlobalProvider>
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route element={<PersistentAppLayoutContainer />}>
                  <Route
                    path={`${BASE}/${MANAGE_CENSUS_ROUTES.EMPLOYEE_MANAGE_PLAN_MODULES}/:flow/:censusId/:planId`}
                    element={
                      <ManageCensusProvider>
                        <EmployeeManagePlansModules />
                      </ManageCensusProvider>
                    }
                  />
                </Route>
                <Route path="*" element={<Navigate to={PLAN_DETAILS} replace />} />
              </Routes>
            </BrowserRouter>
          </div>
        </GlobalProvider>
      </UseEffectTriggerProvider>
    </AppLayoutProvider>
  </ChakraProvider>
);
