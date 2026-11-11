import React, { useState } from "react";
import { get, isEmpty } from "lodash-es";
import { Button, Form } from "react-bootstrap";
import Table from "@/components/CsplTable";
import SliderPanel from "@/components/SliderPanel";
import DatePicker from "@/components/DatePicker";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import AddToolTip from "@/components/AddToolTip";
import DataTable from "@/components/DataTable";
import { useRouterParams, useDeepEffect } from "@/abstracts/hooks";
import { getPlanMetaData, getPlansHours } from "@/services/census";
import { ExportHoursSummaryReport } from "@/services/payroll";
import AddHours from "./AddHours";
import { formFields } from "@/utils/constants/formFields";
import { usDateFormat, dateTimeFormat } from "@/utils/helpers";
import { manageCensusFormNames } from "@/utils/constants/employee";
import { Formik, Field } from "formik";
import { useContext } from "react";
import { appLayoutStore } from "../../../../../contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fileSaver from "file-saver";
import { Link } from "react-router";
import { faFileSpreadsheet as solidExcelIcon } from "@fortawesome/pro-solid-svg-icons";
import moment from "moment";
import { PLAN_STATUS } from "@/utils/constants/plan";

const columns = [
  {
    label: "Pay date",
    className: "column-payDate",
    columnName: "payDate",
  },
  {
    label: "Pay period hours",
    className: "column-payPeriodHours",
    columnName: "payPeriodHours",
  },
  {
    label: "Comments",
    className: "column-comments",
    columnName: "comments",
    // link: `link`,
  },
  {
    label: "Updated by",
    className: "column-updatedBy",
    columnName: "updatedBy",
  },

  {
    label: "Updated through",
    className: "column-updatedThrough",
    columnName: "uploadedThrough",
  },
  {
    label: "Date time loaded",
    className: "column-updatedThrough",
    columnName: "uploadedDate",
  },
];
//const updatedBy = [null, "Admin"];

var defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() - 120);
defaultStartDate = usDateFormat(defaultStartDate);
var defaultEndDate = usDateFormat(new Date());
const Hours = (props) => {
  const {
    menu,
    subMenu,
    employeeName,
    planName,
    PlanId,
    PlanStatus,
    eligibilityStatus,
  } = props;
  const [filteredResponse] = useState([]);
  const [showHoursForm, setShowHoursForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading] = useState(false);
  const { censusId, planId } = useRouterParams();
  const [totalPay, setTotalPay] = useState(0);
  const [hoursList, setHoursList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const formName = manageCensusFormNames.HOURS;
  const fields = formFields[formName];
  const { state } = useContext(appLayoutStore);
  const permissions = get(state, "permissions", {});
  const subMenuItem =
    !isEmpty(permissions) &&
    permissions["employeesManagePlanSubMenu"]?.["depositHistory"];
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
  useDeepEffect(() => {
    getPlansHours({
      employeeId: parseInt(censusId),
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    }).then((response) => {
      setHoursList(response);
    });
  }, [toggle]);

  var totPayHours = 0;
  if (!isEmpty(hoursList)) {
    hoursList.map((hr, initValue) => {
      totPayHours = totPayHours + hr.payPeriodHours;
    });
  }

  const toggleHoursForm = () => {
    setShowHoursForm(!showHoursForm);
  };

  const onFormSubmit = {};
  const onFilter = (values) => {
    getPlansHours({
      employeeId: parseInt(censusId),
      startDate: values.startDate,
      endDate: values.endDate,
    }).then((response) => {
      setHoursList(response);
    });
  };

  const exportHoursSummary = (values) => {
    const { startDate, endDate } = values;

    getPlanMetaData(planId)
      .then((response1) => {
        ExportHoursSummaryReport({
          employeeName: props.employeeName,
          planName: props.planName,
          PlanID: props.PlanId,
          employeeId: parseInt(censusId),
          startDate: startDate,
          endDate: endDate,
          timeZoneOffset: new Date().getTimezoneOffset(),
        }).then((response) => {
          console.log("yes123", response);
          var blob = new Blob([response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          fileSaver.saveAs(
            blob,
            `Hours_Deposit History_${response1.planId}_${dateTimeFormat(
              new Date()
            )}.xlsx`
          );
        });
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="w-100 hours-table hours-container">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="mt-mb-1p25r">Show record(s) of particular period</div>
          <div className="mt-mb-1p25r">
            Total Pay Period Hours &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {totPayHours?.toFixed(2)}
          </div>
        </div>
        {/* <div className="plan-sub-heading">
              Total Pay Period Hours &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totPayHours}
            </div> */}
        <Formik
          initialValues={{
            startDate: defaultStartDate,
            endDate: defaultEndDate,
          }}
          onSubmit={onFormSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize
        >
          {({ handleChange, setFieldValue, handleSubmit, values, ...rest }) => {
            const onDaySelected = (fieldName, value) => {
              setFieldValue(fieldName, value);
            };
            return (
              <Form
                autoComplete="off"
                className="h-100p"
                onSubmit={handleSubmit}
                validated={!isEmpty(rest.errors)}
              >
                <div className="d-flex justify-content-between compensation-container w-100">
                  <div className="d-flex justify-content-between hoursHeader">
                    <div>
                      <Field
                        size="sm"
                        label="Start Date"
                        name={fields.startDate}
                        className="startDate"
                        value={usDateFormat(values[fields.startDate])}
                        isDatePicker
                        onClear={() => {
                          onDaySelected(fields.startDate, null);
                          defaultStartDate = null;
                        }}
                        popupContent={
                          <DatePicker
                            onDayClick={(value) => {
                              onDaySelected(fields.startDate, value);
                              defaultStartDate = value;
                            }}
                            value={usDateFormat(values[fields.startDate])}
                          />
                        }
                        component={FieldDropSide}
                      />
                    </div>
                    <div className="ml-1r">
                      <Field
                        size="sm"
                        label="End Date"
                        name={fields.endDate}
                        value={usDateFormat(values[fields.endDate])}
                        isDatePicker
                        onClear={() => {
                          onDaySelected(fields.endDate, null);
                          defaultEndDate = null;
                        }}
                        popupContent={
                          <DatePicker
                            onDayClick={(value) => {
                              onDaySelected(fields.endDate, value);
                              defaultEndDate = value;
                            }}
                            value={usDateFormat(values[fields.endDate])}
                          />
                        }
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
                        component={FieldDropSide}
                      />
                    </div>
                    <Button
                      onClick={() => onFilter(values)}
                      type="submit"
                      className="mt-28 ml-1r"
                    >
                      Go
                    </Button>
                    <div className="mt-28 mr-4 ml-1r">
                      {isAllowed("", true) ? (
                        <Button
                          type="button"
                          className="add-btn button-css"
                          onClick={toggleHoursForm}
                          variant="secondary"
                          disabled={PlanStatus === PLAN_STATUS.Inactive}
                        >
                          Add pay period hours
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="mr-4 ">
                    {/* Total Pay Period Hours {totPayHours} */}
                    {hoursList.length} - Record(s) found
                  </div>
                  <div
                    onClick={() =>
                      hoursList.length > 0 && exportHoursSummary(values)
                    }
                    className={`mr-20px ${
                      hoursList?.length > 0
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <FontAwesomeIcon
                      className="export-icon"
                      icon={solidExcelIcon}
                    />
                    <Link
                      className={`export-text ${
                        hoursList?.length > 0
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
          Data={hoursList}
          getContent={(hours, ind) => {
            return columns.map((item, cellIndex) => {
              const formattedDate = moment
                .utc(hours[item.columnName])
                .local()
                .format("MM/DD/YYYY, HH:mm:ss");
              return (
                <Table.Td key={cellIndex} className={item.className}>
                  {hours[item.columnName] === null ||
                  hours[item.columnName] === "" ? (
                    "-"
                  ) : item.dataMapper ? (
                    item.dataMapper[hours[item.columnName]]
                  ) : item.columnName === "payDate" ? (
                    usDateFormat(hours[item.columnName])
                  ) : item.columnName === "0" ? (
                    hours[item.columnName] == "UIEditing" ? (
                      "UI"
                    ) : (
                      hours[item.columnName]
                    )
                  ) : (item.columnName === "updatedBy") |
                    (item.columnName === "comments") ? (
                    <AddToolTip
                      name={hours[item.columnName] || "-"}
                      placement="top"
                    >
                      {(hours[item.columnName] || "-").slice(0, 12)}...
                    </AddToolTip>
                  ) : item.columnName === "uploadedThrough" ? (
                    hours[item.columnName] != "0" ? (
                      hours[item.columnName]
                    ) : (
                      "-"
                    )
                  ) : item.columnName == "uploadedDate" ? (
                    formattedDate
                  ) : (
                    hours[item.columnName]
                  )}
                </Table.Td>
              );
            });
          }}
          isInfiniteScroll={true}
          height="30vh"
        />
      </div>
      <SliderPanel
        flair="add-hours-flair"
        isOpen={showHoursForm}
        width="55%"
        showCancel={false}
      >
        <div className="d-flex justify-content-space-between">
          <AddHours
            {...props}
            toggleHoursForm={toggleHoursForm}
            setToggle={setToggle}
            toggle={toggle}
          />
        </div>
      </SliderPanel>
    </>
  );
};

export default Hours;
