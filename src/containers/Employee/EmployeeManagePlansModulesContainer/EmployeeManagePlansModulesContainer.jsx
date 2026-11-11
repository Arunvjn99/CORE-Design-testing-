import styles from "./EmployeeManagePlansModulesContainer.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { get, isEmpty } from "lodash-es";
import { Col, OverlayTrigger, Row, Tab, Tabs, Tooltip } from "react-bootstrap";
import ManageCensusLayout from "@/components/ManageCensusLayout";
import TabLeavingGuard from "@/components/TabGuardLeaving";
import AddToolTip from "@/components/AddToolTip";
import GetInitials from "@/components/GetInitials";
import { useRouterParams } from "@/abstracts/hooks";
import useRequest from "@/abstracts/useRequest";
import DepositHistory from "./DepositHistory";
import EligibilityOverride from "./EligibilityOverride";
import Vesting from "./Vesting";
import {
  fullName,
  fullNameUSI,
  getNullTableItem,
  hyphenatedSSN,
} from "@/utils/helpers";
import { OPTIONS_DATA_MAPPER } from "@/utils/constants/common";

import {
  getEmployeeCensusInformation,
  getEmployeeManagePlans,
  getIRAAccountByIRANumber,
  getPlanMetaData,
} from "@/services/census";

import { getNotesPayroll } from "@/services/payroll";
import { getBasicPlanDetails } from "@/services/plan";
import { FLOW_TYPES } from "@/utils/constants/common";
import { MANAGE_CENSUS_ROUTES } from "@/utils/constants/employee";
import { getAdvancedPathWithParam } from "@/utils/helpers";
import Retirement from "./Retirement";
import DocumentDelivery from "./DocumentDelivery";
import Deferrals from "./Deferrals";
import tenantConfig from "../../../mocks/tenantOne.json";
import {
  appLayoutStore,
  manageCensusStore,
  setManageCensusLocalCache,
} from "../../../contexts";
import BalanceSummary from "./BalanceSummary/BalanceSummary";
import { useNavigate } from "react-router";
import YOS from "./YOS";

const EmployeeManagePlansContainer = (props) => {
  const navigate = useNavigate();
  const [keyValue, setkeyValue] = useState("balance_summary");
  const [nextkeyValue, setNextkeyValue] = useState(keyValue);
  const [isInnerFormDirty, setIsInnerFormDirty] = useState(false);
  const { flow, censusId = 1, planId } = useRouterParams();
  const [newFlow, setNewFlow] = useState();
  const { state } = useContext(appLayoutStore);
  const permissions = get(state, "permissions");
  const [employeeInfo, setEmployeeInfo] = useState({});
  const { state: censusState, dispatch } = useContext(manageCensusStore);
  const [notesResponse, setNotesResponse] = useState();
  useEffect(() => {
    getEmployeeCensusInformation(censusId)
      .then((response) => {
        setEmployeeInfo(response);
        dispatch(
          setManageCensusLocalCache({
            model: "employee",
            data: response,
          })
        );
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    getNotesPayroll({ id: censusId, entityType: "EmployeeInformation" })
      .then((response) => {
        setNotesResponse(response.notes);
      })
      .catch((error) => {
        //Handle Error
      });
  }, [censusId]);
  const { response: planDetails } = useRequest({
    method: getPlanMetaData,
    payload: planId,
  });
  const { response: employeeEligibility } = useRequest({
    method: getEmployeeManagePlans,
    payload: censusId,
  });
  const { response: basicPlanDetails } = useRequest({
    method: getBasicPlanDetails,
    payload: planId,
  });
  const { response: plandetailsIRA } = useRequest({
    method: getIRAAccountByIRANumber,
    payload: censusState.iraNumber,
    skip: state.appUsage !== "IRA",
  });

  const topPlanDetails = [
    {
      label: "Plan name",
      value: get(planDetails, "planName"),
    },
    {
      label: "Plan ID",
      value: get(planDetails, "planId"),
    },
    {
      label: "Plan category",
      value: getNullTableItem(
        OPTIONS_DATA_MAPPER.PLAN_CATERGORY[get(planDetails, "planCategory")]
      ),
      // value: get(planDetails, "planCategory"),
    },
    {
      label: "Status",
      value: employeeEligibility?.filter((e) => e.id == planId)[0]?.status,
    },
    {
      label: "Company Name",
      value: get(planDetails, "companyName"),
    },
    {
      label: "Plan Type",
      value: OPTIONS_DATA_MAPPER.PLAN_TYPES[basicPlanDetails?.plan?.planType],
    },
  ];
  const topPlanDetails_IRA = [
    {
      label: "Plan name",
      value: (() => {
        const v = get(planDetails, "planName") || "";
        return v.length > 10 ? (
          <AddToolTip name={v}>{v.slice(0, 10)}...</AddToolTip>
        ) : (
          v
        );
      })(),
    },
    {
      label: "Plan ID",
      value: (() => {
        const v = String(get(planDetails, "planId") || "");
        return v.length > 10 ? (
          <AddToolTip name={v}>{v.slice(0, 10)}...</AddToolTip>
        ) : (
          v
        );
      })(),
    },
    {
      label: "Plan Type",
      value: (() => {
        const v =
          OPTIONS_DATA_MAPPER.PLAN_TYPES[basicPlanDetails?.plan?.planType] ||
          "";
        return v.length > 10 ? (
          <AddToolTip name={v}>{v.slice(0, 7)}...</AddToolTip>
        ) : (
          v
        );
      })(),
    },
    {
      label: "IRA A/c Number",
      value: (() => {
        const v = plandetailsIRA?.iraAccount?.iraNumber || "";
        return v.length > 10 ? (
          <AddToolTip name={v}>{v.slice(0, 10)}...</AddToolTip>
        ) : (
          v
        );
      })(),
    },
    {
      label: "Distributing Plan Name",
      value: (() => {
        const v = plandetailsIRA?.iraAccount?.distributingPlanName || "";
        return v.length > 24 ? (
          <AddToolTip name={v}>{v.slice(0, 24)}...</AddToolTip>
        ) : (
          v
        );
      })(),
    },
    {
      label: "First Deposit Date",
      value: (() => {
        const v = plandetailsIRA?.iraAccount?.accountCreationDate
          ? new Date(
              plandetailsIRA.iraAccount.accountCreationDate
            ).toLocaleDateString()
          : "";
        return v.length > 10 ? (
          <AddToolTip name={v}>{v.slice(0, 10)}...</AddToolTip>
        ) : (
          v || "-"
        );
      })(),
    },
    {
      label: "Status",
      value: (() => {
        const v =
          employeeEligibility?.find((e) => e.id == planId)?.status || "";
        return v.length > 10 ? (
          <AddToolTip name={v}>{v.slice(0, 10)}...</AddToolTip>
        ) : (
          v
        );
      })(),
    },
    {
      label: "Company Name",
      value: (() => {
        const v = get(planDetails, "companyName") || "";
        return v.length > 10 ? (
          <AddToolTip name={v}>{v.slice(0, 10)}...</AddToolTip>
        ) : (
          v
        );
      })(),
    },
  ];

  // const buttons =
  //   keyValue === "eligibility_override"
  //     ? [
  //         {
  //           link: ROUTES.MANAGE_EMPLOYEE,
  //           label: "Cancel",
  //           variant: "secondary",
  //           type: "button",
  //           flow: [FLOW_TYPES.ADD, FLOW_TYPES.SAVE],
  //         },
  //         {
  //           label: "Save",
  //           variant: "primary",
  //           type: "submit",
  //           flow: [FLOW_TYPES.ADD],
  //           link: ROUTES.MANAGE_EMPLOYEE,
  //         },
  //         {
  //           label: "",
  //           variant: "link",
  //           type: "button",
  //           flow: [FLOW_TYPES.EDIT],
  //           icon: faTimes,
  //           link: ROUTES.MANAGE_EMPLOYEE,
  //         },
  //         {
  //           label: "",
  //           variant: "link",
  //           type: "button",
  //           flow: [FLOW_TYPES.EDIT],
  //           icon: faPencilAlt,
  //           onClick: () =>
  //             navigate(
  //               getAdvancedPathWithParam({
  //                 path: MANAGE_CENSUS_ROUTES.EMPLOYEE_MANAGE_PLAN_MODULES,
  //                 pathParam: [FLOW_TYPES.SAVE, censusId, planId],
  //               })
  //             ),
  //         },
  //         {
  //           label: "Save",
  //           variant: "primary",
  //           type: "submit",
  //           flow: [FLOW_TYPES.SAVE],
  //           // link: ROUTES.MANAGE_EMPLOYEE,
  //         },
  //       ]
  //     : [];

  const isEdit = flow === FLOW_TYPES.EDIT;
  const isSave = flow === FLOW_TYPES.SAVE;
  const { state: state2 } = useContext(appLayoutStore);
  const planTypeLabel =
    OPTIONS_DATA_MAPPER.PLAN_TYPES[basicPlanDetails?.plan?.planType];
  const menuList = [
    { id: "balanceSummary", label: "balanceSummary" },
    ...(state.appUsage !== "IRA"
      ? [
          ...(planTypeLabel !== "Cash Balance"
            ? [{ id: "deferrals", label: "deferrals" }]
            : []),
          { id: "documentDelivery", label: "documentDelivery" },
          { id: "eligibilityOverride", label: "eligibilityOverride" },
          { id: "depositHistory", label: "depositHistory" },
          { id: "yos", label: "YOS" },
          { id: "vesting", label: "vesting" },
          { id: "retirement", label: "retirement" },
        ]
      : []),
  ];
  const menuChange = (key) => {
    setNextkeyValue(key);
  };

  const onClickEdit = () => {
    navigate(
      getAdvancedPathWithParam({
        path: `../../${MANAGE_CENSUS_ROUTES.EMPLOYEE_MANAGE_PLAN_MODULES}`,
        pathParam: [FLOW_TYPES.SAVE, censusId, planId],
      })
    );
  };

  const onClickSave = () => {
    navigate(
      getAdvancedPathWithParam({
        path: `../../${MANAGE_CENSUS_ROUTES.EMPLOYEE_MANAGE_PLAN_MODULES}`,
        pathParam: [FLOW_TYPES.EDIT, censusId, planId],
      })
    );
  };

  return (
    <div className="h-100p employee-manage-plan-modules pb-4">
      <ManageCensusLayout
        //buttons={buttons}
        hasNotes={true}
        notesData={notesResponse}
        entityType={"EmployeeInformation"}
        entityId={censusId}
        buttons={[]}
        pageFlow={newFlow || flow}
        blockNavigation={isInnerFormDirty}
        page="employee-manage-plan-modules"
        childrenClassName="min-h-0 d-flex flex-column"
      >
        <div className="bg-color-layer2 d-flex highlevel-plan-details">
          <div className={`${styles["w-23p75p-p-20px"]} d-flex mr-2`}>
            <div className="d-flex align-items-center mr-1">
              {!isEmpty(employeeInfo.imageURL) ? (
                <img
                  alt=""
                  src={employeeInfo.imageURL}
                  className={`circle-50px circle-50px`}
                />
              ) : (
                <GetInitials
                  className={"fs-20px img-size"}
                  name={
                    employeeInfo?.employeeName ??
                    fullName(
                      employeeInfo?.firstName,
                      employeeInfo?.middleName,
                      employeeInfo?.lastName
                    )
                  }
                />
              )}
            </div>
            <div className="ml-2 w-75">
              <div className="core-body-text-large-bold  m-0 p-0">
                {employeeInfo?.employeeName ??
                fullNameUSI(
                  employeeInfo?.firstName,
                  employeeInfo?.middleName,
                  employeeInfo?.lastName
                )?.length > 10 ? (
                  <AddToolTip
                    name={
                      employeeInfo?.employeeName ??
                      fullNameUSI(
                        employeeInfo?.firstName,
                        employeeInfo?.middleName,
                        employeeInfo?.lastName
                      )
                    }
                  >
                    {employeeInfo?.employeeName ??
                      fullNameUSI(
                        employeeInfo?.firstName,
                        employeeInfo?.middleName,
                        employeeInfo?.lastName
                      )?.slice(0, 10)}
                    ...
                  </AddToolTip>
                ) : (
                  employeeInfo?.employeeName ??
                  fullNameUSI(
                    employeeInfo?.firstName,
                    employeeInfo?.middleName,
                    employeeInfo?.lastName
                  )
                )}
              </div>
              <div className={`core-body-text-regular-medium m-0 p-0`}>
                {hyphenatedSSN(
                  employeeInfo?.ssn ??
                    employeeInfo?.uniquePersonalIdentification
                )}
              </div>
              <div className="core-body-text-regular-medium m-0 p-0 success-text-color">
                {employeeInfo?.employmentStatus == "Active" ? (
                  <div className="success-text-color">
                    <Row className={`justify-content-start`}>
                      <Col md="1">
                        <i className="fas fa-check-circle"></i>
                      </Col>
                      {employeeInfo?.employmentStatus &&
                      employeeInfo?.employmentStatus?.length >= 15 ? (
                        <Col md="2" className={`ps-1`}>
                          <OverlayTrigger
                            overlay={
                              <Tooltip>
                                {employeeInfo?.employmentStatus}
                              </Tooltip>
                            }
                          >
                            <div className={`text-nowrap`}>
                              {employeeInfo?.employmentStatus?.slice(0, 15) +
                                "..."}
                            </div>
                          </OverlayTrigger>
                        </Col>
                      ) : (
                        <Col md="2" className={`ps-1 status-text-align`}>
                          <div className={`text-nowrap fw-500`}>
                            {employeeInfo?.employmentStatus}
                          </div>
                        </Col>
                      )}
                    </Row>
                  </div>
                ) : (
                  <div className="critical-text-color">
                    <Row>
                      <Col md="1">
                        <i className="fas fa-times"></i>
                      </Col>
                      {employeeInfo?.employmentStatus &&
                      employeeInfo?.employmentStatus?.length >= 15 ? (
                        <Col md="2" className={`ps-1`}>
                          <OverlayTrigger
                            overlay={
                              <Tooltip>
                                {employeeInfo?.employmentStatus}
                              </Tooltip>
                            }
                          >
                            <div className={`text-nowrap`}>
                              {employeeInfo?.employmentStatus?.slice(0, 12) +
                                "..."}
                            </div>
                          </OverlayTrigger>
                        </Col>
                      ) : (
                        <Col md="2" className={`ps-1 status-text-align`}>
                          <div className={`text-nowrap fw-500`}>
                            {employeeInfo?.employmentStatus}
                          </div>
                        </Col>
                      )}
                    </Row>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-space-between w-100">
            {(state.appUsage === "IRA"
              ? topPlanDetails_IRA
              : topPlanDetails
            ).map((item) => (
              <div
                className={`mt-30px ${`${
                  state.appUsage === "IRA" ? "ml-2" : "ml-1p5r"
                } w-20`}`}
              >
                <div className="plan-label-var">{item.label}</div>
                <div
                  className="plan-value"
                  // style={{
                  //   fontSize: "var(--fs-16)",
                  // }}
                >
                  <AddToolTip
                    name={item.value}
                    className={`metadata-truncate`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${styles["employeemanageplansmodulescontainer-v2"]} mt-3 d-flex table-min-height`}
        >
          <Tabs
            defaultActiveKey="balance_summary"
            transition={false}
            className="vertical-tabs"
            onSelect={menuChange}
            activeKey={keyValue}
            mountOnEnter
            unmountOnExit
          >
            {/* <Tab eventKey="plan_summary" title="Plan summary">
              <PlanSummary />
            </Tab> */}
            {menuList
              .filter(
                (_) =>
                  tenantConfig.employeesManagePlanSubMenu.includes(_.id) &&
                  permissions?.employeesManagePlanSubMenu[_.id]
              )
              .map((_) => {
                return _.id == "eligibilityOverride" ? (
                  <Tab
                    eventKey="eligibility_override"
                    title={
                      <div className="d-flex">
                        <div className="verticalLine-tab"></div>
                        <div className="ml-1r tab-var-census">
                          Eligibility Override
                        </div>
                      </div>
                    }
                  >
                    <EligibilityOverride
                      isEdit={isEdit}
                      isSave={isSave}
                      menu={"employees"}
                      subMenu={"employeeManagePlans"}
                      onClickEdit={onClickEdit}
                      onClickSave={onClickSave}
                      companyId={employeeInfo?.companyId}
                      {...{ isInnerFormDirty, setIsInnerFormDirty }}
                    />
                  </Tab>
                ) : _.id == "deferrals" ? (
                  <Tab
                    eventKey="deferrals"
                    title={
                      <div className="d-flex">
                        <div className="verticalLine-tab"></div>
                        <div className="ml-1r tab-var-census">Elections</div>
                      </div>
                    }
                  >
                    <Deferrals />
                  </Tab>
                ) : _.id == "depositHistory" ? (
                  <Tab
                    eventKey="deposit_history"
                    title={
                      <div className="d-flex">
                        <div className="verticalLine-tab"></div>
                        <div className="ml-1r tab-var-census">
                          Deposit History
                        </div>
                      </div>
                    }
                  >
                    <DepositHistory
                      {...{
                        isInnerFormDirty,
                        setIsInnerFormDirty,
                        employeeName:
                          employeeInfo?.employeeName ??
                          fullName(
                            employeeInfo?.firstName,
                            employeeInfo?.middleName,
                            employeeInfo?.lastName
                          ),
                        planName: planDetails?.planName,
                        PlanId: planDetails?.planId,
                        PlanStatus: basicPlanDetails?.plan?.planStatus,
                        eligibilityStatus: employeeEligibility?.filter(
                          (e) => e.id == planId
                        )[0]?.status,
                      }}
                    />
                  </Tab>
                ) : _.id == "yos" ? (
                  <Tab
                    eventKey="YOS"
                    title={
                      <div className="d-flex">
                        <div className="verticalLine-tab"></div>
                        <div className="ml-1r tab-var-census">YOS</div>
                      </div>
                    }
                  >
                    <YOS></YOS>
                  </Tab>
                ) : _.id == "vesting" ? (
                  <Tab
                    eventKey="vesting"
                    title={
                      <div className="d-flex">
                        <div className="verticalLine-tab"></div>
                        <div className="ml-1r tab-var-census">Vesting</div>
                      </div>
                    }
                  >
                    <Vesting planDetails={topPlanDetails} />
                  </Tab>
                ) : _.id == "retirement" ? (
                  <Tab
                    eventKey="retirement"
                    title={
                      <div className="d-flex">
                        <div className="verticalLine-tab"></div>
                        <div className="ml-1r tab-var-census">Retirement</div>
                      </div>
                    }
                  >
                    <Retirement />
                  </Tab>
                ) : _.id == "documentDelivery" ? (
                  <Tab
                    eventKey="document_delivery"
                    title={
                      <div className="d-flex">
                        <div className="verticalLine-tab"></div>
                        <div className="ml-1r tab-var-census">
                          Document Delivery
                        </div>
                      </div>
                    }
                  >
                    <DocumentDelivery
                      setIsInnerFormDirty={setIsInnerFormDirty}
                    />
                  </Tab>
                ) : _.id == "balanceSummary" ? (
                  <Tab
                    eventKey="balance_summary"
                    title={
                      <div className="d-flex">
                        <div className="verticalLine-tab"></div>
                        <div className="ml-1r tab-var-census">
                          Balance Summary
                        </div>
                      </div>
                    }
                  >
                    <BalanceSummary />
                  </Tab>
                ) : null;
              })}
          </Tabs>
        </div>
      </ManageCensusLayout>
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

export default EmployeeManagePlansContainer;
