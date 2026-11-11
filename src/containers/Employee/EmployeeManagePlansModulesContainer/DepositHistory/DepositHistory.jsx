import React, { useContext, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import TabLeavingGuard from "@/components/TabGuardLeaving";
import Compensation from "./Compensation";
import Contributions from "./Contributions";
import Hours from "./Hours";
import LoanRepayments from "./LoanRepayments";
import { appLayoutStore } from "../../../../contexts";

const DepositHistory = ({
  isInnerFormDirty,
  setIsInnerFormDirty,
  employeeName,
  planName,
  PlanId,
  PlanStatus,
  eligibilityStatus,
  subMenu = "employeeManagePlans",
}) => {
  const [keyValue, setkeyValue] = useState("compensation");
  const [nextkeyValue, setNextkeyValue] = useState(keyValue);
  const menuChange = (key) => {
    setNextkeyValue(key);
  };

  const mapTabToMenuName = {
    compensation: "EmployeeCompensation",
    contributions: "Contributions",
    hours: "Hours",
    loan_repayments: "LoanRepayments",
  };
  const { state: state2 } = useContext(appLayoutStore);
  const activeMenuName = mapTabToMenuName[keyValue];
  return (
    <div className={`mb-5r deposit_histoy_tabs pb-0p3r`}>
      <Tabs
        mountOnEnter
        unmountOnExit
        onSelect={menuChange}
        activeKey={keyValue}
      >
        <Tab eventKey="compensation" title="Compensation">
          <Compensation
            {...{
              isInnerFormDirty,
              setIsInnerFormDirty,
              employeeName,
              planName,
              PlanId,
              PlanStatus,
            }}
            menu={"employees"}
            subMenu={"employeeManagePlans"}
          />
        </Tab>
        <Tab eventKey="contributions" title="Contributions">
          <Contributions
            {...{
              isInnerFormDirty,
              setIsInnerFormDirty,
              employeeName,
              planName,
              PlanId,
            }}
            menu={"employees"}
            subMenu={"employeeManagePlans"}
          />
        </Tab>
        <Tab eventKey="hours" title="Hours">
          <Hours
            {...{
              isInnerFormDirty,
              setIsInnerFormDirty,
              employeeName,
              planName,
              PlanId,
              PlanStatus,
              eligibilityStatus,
            }}
            menu={"employees"}
            subMenu={"employeeManagePlans"}
          />
        </Tab>
        <Tab eventKey="loan_repayments" title="Loan Repayments">
          <LoanRepayments
            {...{
              isInnerFormDirty,
              setIsInnerFormDirty,
              employeeName,
              planName,
              PlanId,
            }}
            menu={"employees"}
            subMenu={"employeeManagePlans"}
          />
        </Tab>
      </Tabs>
      <TabLeavingGuard
        {...{
          isInnerFormDirty,
          setIsInnerFormDirty,
          setkeyValue,
          nextkeyValue,
          setNextkeyValue,
          keyValue,
        }}
      />
    </div>
  );
};

export default DepositHistory;
