import styles from "./Compensation.module.scss";
import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router";
import { isEmpty, get, isUndefined, orderBy } from "lodash-es";
import { Formik, Field } from "formik";
import { Button, Form } from "react-bootstrap";
import Table from "@/components/CsplTable";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import DatePicker from "@/components/DatePicker";
import SliderPanel from "@/components/SliderPanel";
import DataTable from "@/components/DataTable";
import ModalNotification from "@/components/ModalNotification";
import { formFields } from "@/utils/constants/formFields";
import { manageEligibilityFormNames } from "@/utils/constants/eligibility";
import {
  getFlowBasedFormValues,
  usDateFormat,
  usCurrency,
  dateTimeFormat,
} from "@/utils/helpers";
import { planStatus } from "@/utils/constants/common";
import { useRouterParams, useDeepEffect } from "@/abstracts/hooks";
import {
  getEmployeePayPeriodCompensation,
  getPlansCompensation,
} from "@/services/census";
import { downloadCompensationReport } from "@/services/payroll";
import {
  manageCensusStore,
  setManageCensusPageLevelData,
  appLayoutStore,
} from "../../../../../contexts";
import AddCompensation from "./AddCompensation";
import AddToolTip from "../../../../../components/AddToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileSaver from "file-saver";
import { faFileSpreadsheet as solidExcelIcon } from "@fortawesome/pro-solid-svg-icons";
import moment from "moment";

const initialValues = {};
const columns = [
  {
    label: "Pay date",
    className: "column-payDate",
    columnName: "payDate",
    link: `link`,
  },
  {
    label: "Pay period plan compensation",
    className: "column-payPeriodPlanCompensation",
    columnName: "payPeriodPlanCompensation",
  },
  {
    label: "Eligible plan compensation",
    className: "column-eligiblePlanCompensation",
    columnName: "eligiblePlanCompensation",
  },
  {
    label: "Pay period gross compensation",
    className: "column-payPeriodGrossCompensation",
    columnName: "payPeriodGrossCompensation",
  },
  {
    label: "Annual salary",
    className: "column-annualSalary",
    columnName: "annualSalary",
  },
  {
    label: "Source compensation",
    className: "column-sourceCompensation",
    columnName: "matchSourceCompensation",
  },
  // {
  //   label: "Comments",
  //   className: "column-comments",
  //   columnName: "comments",
  //   link: `link`,
  // },
  {
    label: "Updated by",
    className: "column-updatedBy",
    columnName: "updatedBy",
  },
  {
    label: "Updated through",
    className: "column-uploadedThrough",
    columnName: "uploadedThrough",
  },
  {
    label: "Date time loaded",
    className: "column-uploadedThrough",
    columnName: "uploadedDate",
  },
];

//const updatedBy = [null, "Admin"];
var defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() - 120);
defaultStartDate = usDateFormat(defaultStartDate);
const defaultEndDate = usDateFormat(new Date());
let characterLimit = 10;

const Compensations = (props) => {
  const { menu, subMenu, employeeName, planName, PlanId, PlanStatus } = props;
  const { censusId, planId, flow } = useRouterParams();
  const { state, dispatch } = useContext(manageCensusStore);
  const [showCompensationForm, setShowCompensationForm] = useState(false);
  const [formValues, setFormvalues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [compensations, setCompensations] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const { state: state2 } = useContext(appLayoutStore);
  const permissions = get(state2, "permissions", {});
  const [final, setFinal] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [planCompensation, setplanCompensation] = useState([]);
  const [grossCompensation, setGrossCompensation] = useState([]);
  const [payPeriodPlanCompensation, setPayPeriodPlanCompensation] = useState(
    []
  );
  const [adjustmentModalOpen, setAdjustmentModalOpen] = useState(false);
  const [fileName, setFileName] = useState();

  const [employeeRehireData, setEmployeeRehireData] = useState([]);
  const getEmploymentStatusBasedOnPayDate = (payDateInput) => {
    var status = "Terminated";
    if (employeeRehireData.length > 0) {
      const payDate = moment(payDateInput);
      employeeRehireData.forEach((rehireData) => {
        let { terminationDate, hireDate } = rehireData;
        hireDate = moment(hireDate);
        terminationDate = moment(terminationDate);
        if (
          payDate >= hireDate &&
          (isNaN(terminationDate) || terminationDate >= payDate)
        ) {
          status = "Active";
        }
      });
      return status;
    }
  };
  const [payPeriodGrossCompensation, setPayPeriodGrossCompensation] = useState(
    []
  );
  const [isAddMode, setIsAddMode] = useState(1);

  const subMenuItem =
    !isEmpty(permissions) &&
    permissions["employeesManagePlanSubMenu"]?.["depositHistory"];

  const disableAddPayPeriodButton = () => {
    var inactivePlanContact = planStatus.find(
      (item) => item.label.toLowerCase() === "inactive"
    )?.value;

    if (inactivePlanContact && PlanStatus === inactivePlanContact) {
      return true;
    }

    return false;
  };

  const isAllowed = (icon, isAddButton) => {
    if (icon === "pencil-alt") {
      return (subMenuItem || "").includes("U") ? true : false;
    } else if (isAddButton) {
      return (subMenuItem || "").includes("C") &&
        (subMenuItem || "").includes("U")
        ? true
        : false;
    } else if (icon === "times") {
      return true;
    }
  };

  const exportFunction = (values) => {
    downloadCompensationReport({
      employeeName: props.employeeName,
      planName: props.planName,
      PlanID: parseInt(planId),
      employeeId: parseInt(censusId),
      startDate: values.startDate,
      endDate: values.endDate,
      timeZoneOffset: new Date().getTimezoneOffset(),
    })
      .then((response) => {
        var blob = new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(
          blob,
          `Compensation_Deposit History_${
            props.PlanId
          }_${dateTimeFormat()}.xlsx`
        );
      })
      .catch((error) => {});
  };

  const formikValuesRef = useRef({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });
  useDeepEffect(() => {
    const { startDate, endDate } = formikValuesRef.current;
    getPlansCompensation({
      employeeId: parseInt(censusId),
      startDate: startDate,
      endDate: endDate,
      planId: parseInt(planId),
    }).then((response) => {
      setCompensations(response?.employeeCompensations);
      setFileName(response?.fileName);
    });
  }, [toggle]);

  var totPlanCompensations = 0;
  var totGrossCompensations = 0;
  if (!isEmpty(compensations)) {
    compensations.map((Comp, initValue) => {
      totPlanCompensations =
        totPlanCompensations + Comp.payPeriodPlanCompensation;
      totGrossCompensations =
        totGrossCompensations + Comp.payPeriodGrossCompensation;
    });
  }

  const formName = manageEligibilityFormNames.ELIGIBILITY_SUMMARY_FILTER;
  const fields = formFields[formName];

  const onFormSubmit = (values) => {
    dispatch(
      setManageCensusPageLevelData({
        formName: formName,
        fieldData: values,
      })
    );
  };

  const onFilter = (values) => {
    getPlansCompensation({
      employeeId: parseInt(censusId),
      startDate: values.startDate,
      endDate: values.endDate,
      planId: parseInt(planId),
    })
      .then((response) => {
        setCompensations(response?.employeeCompensations);
        setFileName(response?.fileName);
      })
      .catch((error) => {});
  };

  useDeepEffect(() => {
    getEmployeePayPeriodCompensation(parseInt(planId), parseInt(censusId))
      .then((response) => {
        const { grossCompensationCategory, employeeRehireData, ...rest } =
          response.compensationList;
        setPayPeriodGrossCompensation(grossCompensationCategory);
        setPayPeriodPlanCompensation(rest);
        setEmployeeRehireData(employeeRehireData);
      })
      .catch((error) => {});
  }, []);

  const toggleCompensationForm = () => {
    setShowCompensationForm(!showCompensationForm);
    setIsEdit(false);
    setIsAddMode(1);
  };

  return (
    <>
      <div className="w-100 compensation-container">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="core-body-text-large-medium mt-mb-1p25r">
            Total pay period plan compensation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {usCurrency(totPlanCompensations)}
          </div>
          <div className="core-body-text-large-medium mt-mb-1p25r">
            Total pay period gross compensation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {usCurrency(totGrossCompensations)}
          </div>
        </div>
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="core-body-text-large-medium mt-mb-1p25r">
            Show record(s) of particular period
          </div>
        </div>
        <Formik
          initialValues={{
            ...initialValues,
            ...getFlowBasedFormValues(get(state, formName, {}), flow),
            startDate: defaultStartDate,
            endDate: defaultEndDate,
          }}
          onSubmit={onFormSubmit}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, setFieldValue, handleSubmit, values, ...rest }) => {
            const onDaySelected = (fieldName, value) => {
              setFieldValue(fieldName, value);
            };
            formikValuesRef.current = {
              startDate: values[fields.startDate],
              endDate: values[fields.endDate],
            };
            return (
              <Form
                autoComplete="off"
                className="h-100p"
                onSubmit={handleSubmit}
                validated={!isEmpty(rest.errors)}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex w-70">
                    <div className="mr-4">
                      <Field
                        size="sm"
                        label="Start Date"
                        name={fields.startDate}
                        value={usDateFormat(values[fields.startDate])}
                        isDatePicker
                        onClear={() => onDaySelected(fields.startDate, null)}
                        popupContent={
                          <DatePicker
                            onDayClick={(value) =>
                              onDaySelected(fields.startDate, value)
                            }
                            value={values[fields.startDate]}
                          />
                        }
                        component={FieldDropSide}
                      />
                    </div>
                    <div className="mr-4">
                      <Field
                        size="sm"
                        label="End Date"
                        name={fields.endDate}
                        value={usDateFormat(values[fields.endDate])}
                        isDatePicker
                        onClear={() => onDaySelected(fields.endDate, null)}
                        popupContent={
                          <DatePicker
                            onDayClick={(value) =>
                              onDaySelected(fields.endDate, value)
                            }
                            value={values[fields.endDate]}
                          />
                        }
                        component={FieldDropSide}
                        validate={(value) => {
                          if (value && values[fields.startDate]) {
                            if (
                              moment(value).isBefore(
                                moment(values[fields.startDate])
                              )
                            ) {
                              return "Should be ahead of 'from date'";
                            }
                          }
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => onFilter(values)}
                      type="submit"
                      className={`${styles["m-t-28px-v3"]} align-center core-body-button-medium`}
                    >
                      Go
                    </Button>
                    {isAllowed("", true) ? (
                      <Button
                        type="button"
                        className="add-btn button-css b-1px-solid-brand-primary mt-28 ml-1r"
                        size="sm"
                        onClick={toggleCompensationForm}
                        variant="secondary"
                        disabled={disableAddPayPeriodButton()}
                      >
                        Add pay period compensation
                      </Button>
                    ) : null}
                  </div>
                </div>
                {console.log("compensations", compensations)}
                <div className="d-flex justify-content-between">
                  <div className="mr-4">
                    {compensations?.length} - Record(s) found
                  </div>
                  <div
                    onClick={() =>
                      compensations?.length > 0 && exportFunction(values)
                    }
                    className={`${
                      compensations?.length > 0
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } mr-2 ${styles.exportAction} btn-link p-5px br-4px`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <FontAwesomeIcon
                      className="export-icon"
                      icon={solidExcelIcon}
                    />
                    <Link
                      className={`${
                        compensations?.length > 0
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                    >
                      Export
                    </Link>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <br />
        <DataTable
          columns={columns}
          Data={compensations}
          className="deposit-history-compensation"
          getContent={(compensation, index) => {
            return columns.map((item, cellIndex) => {
              const formattedDate = moment
                .utc(compensation[item.columnName])
                .local()
                .format("MM/DD/YYYY, HH:mm:ss");

              return (
                <Table.Td key={cellIndex} className={item.className}>
                  {compensation[item.columnName] === null ||
                  compensation[item.columnName] === "" ? (
                    "-"
                  ) : item.dataMapper ? (
                    item.dataMapper[compensation[item.columnName]]
                  ) : item.columnName === "payDate" ? (
                    <Link
                      onClick={() => {
                        if (compensations[index].isAdjustedComp) {
                          setAdjustmentModalOpen(true);
                        } else {
                          setShowCompensationForm(true);
                          setFormvalues(compensations[index]);
                          setplanCompensation(
                            compensations[index]
                              .employeePlanLevelCompensationCategory
                          );
                          setIsAddMode(0);
                          setGrossCompensation(
                            compensations[index].employeeCompensationCategory
                          );
                          setIsEdit(true);
                          setIsView(true);
                        }
                      }}
                    >
                      {usDateFormat(compensation[item.columnName])}
                    </Link>
                  ) : item.columnName === "uploadedThrough" ? (
                    <AddToolTip
                      name={
                        compensation[item.columnName] != "0"
                          ? compensation[item.columnName]
                          : "-"
                      }
                      placement="top"
                    >
                      {compensation[item.columnName] != "0"
                        ? compensation[item.columnName].length > characterLimit
                          ? compensation[item.columnName].slice(
                              0,
                              characterLimit
                            ) + "..."
                          : compensation[item.columnName]
                        : "-"}
                    </AddToolTip>
                  ) : item.columnName === "updatedBy" ||
                    item.columnName === "comments" ? (
                    <AddToolTip name={compensation[item.columnName]}>
                      {compensation[item.columnName] != "0"
                        ? compensation[item.columnName].length > characterLimit
                          ? compensation[item.columnName].slice(
                              0,
                              characterLimit
                            ) + "..."
                          : compensation[item.columnName]
                        : "-"}
                    </AddToolTip>
                  ) : item.columnName === "eligiblePlanCompensation" ? (
                    compensation[item.columnName]
                  ) : item.columnName === "payPeriodPlanCompensation" ||
                    item.columnName === "payPeriodGrossCompensation" ||
                    item.columnName === "annualSalary" ? (
                    <div className="min-width-100px">
                      <AddToolTip
                        name={usCurrency(compensation[item.columnName])}
                        showOnEllipsisOnly
                      >
                        {usCurrency(compensation[item.columnName])}
                      </AddToolTip>
                    </div>
                  ) : item.columnName === "matchSourceCompensation" ? (
                    //data=compensation[item.columnName]
                    <AddToolTip name={compensation[item.columnName]}>
                      {compensation[item.columnName] != "0"
                        ? compensation[item.columnName].length > characterLimit
                          ? compensation[item.columnName].slice(
                              0,
                              characterLimit
                            ) + "..."
                          : compensation[item.columnName]
                        : "-"}
                    </AddToolTip>
                  ) : item.columnName === "uploadedDate" ? (
                    formattedDate.length > 10 ? (
                      <AddToolTip name={formattedDate}>
                        {formattedDate.slice(0, 10) + "..."}
                      </AddToolTip>
                    ) : (
                      formattedDate
                    )
                  ) : isUndefined(compensation[item.columnName]) ||
                    compensation[item.columnName] === null ? null : (
                    compensation[item.columnName]
                  )}
                </Table.Td>
              );
            });
          }}
          onSortClick={(sortDetails, column) => {
            setCompensations(orderBy(compensations, column, sortDetails));
          }}
          isInfiniteScroll={true}
          height="30vh"
        />
      </div>
      <ModalNotification
        show={adjustmentModalOpen}
        header={`Compensation adjustments by system due to out of order pay date corresponding to File ${fileName}.`}
        onHide={() => setAdjustmentModalOpen(false)}
        infoType={1}
        primaryButtonAction={() => setAdjustmentModalOpen(false)}
        primaryButtonLabel={"Ok"}
        onlyOneButton={true}
      />
      <SliderPanel isOpen={showCompensationForm} width="55%" showCancel={false}>
        <div className="d-flex justify-content-space-between">
          <AddCompensation
            {...props}
            setToggle={setToggle}
            toggle={toggle}
            formValues={formValues}
            setFormvalues={setFormvalues}
            isEdit={isEdit}
            isView={isView}
            setIsView={setIsView}
            toggleCompensationForm={toggleCompensationForm}
            menu={menu}
            subMenu={subMenu}
            planCompensation={planCompensation}
            grossCompensation={grossCompensation}
            payPeriodGrossCompensation={payPeriodGrossCompensation}
            payPeriodPlanCompensation={payPeriodPlanCompensation}
            isAddMode={isAddMode}
            getEmploymentStatusBasedOnPayDate={
              getEmploymentStatusBasedOnPayDate
            }
            employeeRehireData={employeeRehireData}
          />
        </div>
      </SliderPanel>
    </>
  );
};

export default Compensations;
