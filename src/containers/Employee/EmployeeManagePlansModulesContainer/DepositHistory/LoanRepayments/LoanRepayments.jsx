import styles from "./LoanRepayments.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { isEmpty } from "lodash-es";
import { Form, Button } from "react-bootstrap";
import { HeaderThElement } from "@progress/kendo-react-data-tools";
import DatePicker from "@/components/DatePicker";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import AddToolTip from "@/components/AddToolTip";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { useDeepEffect, useRouterParams } from "@/abstracts/hooks";
import {
  getEmployeeManagePlans,
  getPlansLoanRepayments,
} from "@/services/census";
import { exportLoanInDepositHistory } from "@/services/payroll";
import { formFields } from "@/utils/constants/formFields";
import { usDateFormat, usCurrency, dateTimeFormat } from "@/utils/helpers";
import { manageCensusFormNames } from "@/utils/constants/employee";
import { LOAN_STATUS } from "@/utils/constants/common";
import { Formik, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSpreadsheet as solidExcelIcon } from "@fortawesome/pro-solid-svg-icons";
import { Link } from "react-router";
import FileSaver from "file-saver";
import moment from "moment";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Tooltip } from "@progress/kendo-react-tooltip";

var defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() - 120);
defaultStartDate = usDateFormat(defaultStartDate);
const defaultEndDate = usDateFormat(new Date());

const columns = [
  {
    value: 1,
    label: "Loan ID",
    className: "column-loadId",
    columnName: "loanId",
    field: "loanId",
    width: 160,
    dataType: "alphaNumeric",
    field1: "loanId",
  },
  {
    value: 2,
    label: "Repayment date",
    className: "column-repaymentDate",
    columnName: "repaymentDate",
    field: "repaymentDate",
    width: 160,
    dataType: "date",
    field1: "repaymentDate",
  },
  {
    value: 3,
    label: "Repayment amount",
    className: "column-repaymentAmount",
    columnName: "repaymentAmount",
    field: "repaymentAmount",
    width: 180,
    dataType: "amount",
    field1: "repaymentAmount",
  },
  {
    value: 4,
    label: "Updated by",
    className: "column-uploadedBy",
    columnName: "uploadedBy",
    field: "uploadedBy",
    width: 180,
    dataType: "alphaNumeric",
    field1: "uploadedBy",
  },
  {
    value: 5,
    label: "Updated through",
    className: "column-updatedThrough",
    columnName: "uploadedThrough",
    field: "uploadedThrough",
    width: 180,
    dataType: "alphaNumeric",
    field1: "uploadedThrough",
  },
  {
    value: 6,
    label: "Date time loaded",
    className: "column-dateTimeLoaded",
    columnName: "uploadedDate",
    field: "uploadedDate",
    width: 200,
    dataType: "date",
    field1: "uploadedDate",
  },
  {
    value: 7,
    label: "Comments",
    className: "column-comments",
    columnName: "comments",
    field: "comments",
    width: 120,
    dataType: "alphaNumeric",
    field1: "comments",
    link: `link`,
  },
  {
    value: 8,
    label: "Plan ID",
    className: "column-planId",
    columnName: "planId",
    field: "planId",
    width: 120,
    dataType: "alphaNumeric",
    field1: "planId",
    link: `link`,
  },
  {
    value: 9,
    label: "Outstanding Loan Amount",
    className: "column-loanOutstandingAmount",
    columnName: "outstandingLoanBalance",
    field: "loanOutstandingAmount",
    width: 180,
    dataType: "amount",
    field1: "loanOutstandingAmount",
    link: `link`,
  },
  {
    value: 10,
    label: "Periodic Payment Amount",
    className: "column-periodicPaymentAmount",
    columnName: "periodicPaymentAmount",
    field: "periodicPaymentAmount",
    width: 180,
    dataType: "amount",
    field1: "periodicPaymentAmount",
    link: `link`,
  },
  {
    value: 11,
    label: "Loan Status",
    className: "column-loanStatus",
    columnName: "loanStatus",
    field: "loanStatus",
    width: 140,
    dataType: "alphaNumeric",
    field1: "loanStatus",
    link: `link`,
  },
];

// Only show columns up to "Comments" initially
const initialColumnValues = [1, 2, 3, 4, 5, 6, 7];

const LoanRepayments = (props) => {
  const { menu, subMenu, employeeName, planName, PlanId } = props;
  const [filteredResponse] = useState([]);
  const { planId, censusId } = useRouterParams();
  const formName = manageCensusFormNames.HOURS;
  const fields = formFields[formName];
  const [response, setResponse] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const emptycol = [
    {
      value: 0,
      label: "",
      className: "",
      columnName: "",
      field: "",
      width: 0,
      dataType: "",
      field1: "",
    },
  ];
  const [rkplan, setRkplan] = useState();
  const [flag, setFlag] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [final, setFinal] = useState(
    columns.filter((col) => initialColumnValues.includes(col.value))
  );
  const [isScroll, setIsScroll] = useState(false);
  const dropdownRef = useRef(null);

  const applyColumns = () => {
    if (selectedColumns.length >= 1) {
      setFinal(
        columns.filter((column) =>
          selectedColumns.map((x) => x).includes(column.value)
        )
      );
      setIsScroll(true);
    } else {
      setFinal(emptycol);
      setIsScroll(false);
    }
    hideColumns();
  };
  // const { response } = useRequest({
  //   method: getPlansLoanRepayments,
  //   payload: {
  //     planId: planId,
  //     employeeId: parseInt(censusId),
  //     startDate: defaultStartDate,
  //     endDate: defaultEndDate,
  //   },
  //   defaultResponse: filteredResponse,
  // });
  useDeepEffect(() => {
    getEmployeeManagePlans(censusId)
      .then((response) => {
        setRkplan(response);
      })
      .catch((error) => {});
  }, [censusId]);
  const exportFunction = (values) => {
    var column = columns.filter(
      (column) => !final.map((item) => item.value).includes(column.value)
    );
    var selectedCols = column.map((item) => item.value);

    exportLoanInDepositHistory({
      employeeName: props.employeeName,
      planName: props.planName,
      RkPlan: props.PlanId,
      planId: parseInt(planId),
      employeeId: parseInt(censusId),
      startDate: values.startDate,
      endDate: values.endDate,
      selectedColumns: selectedCols,
      timeZoneOffset: new Date().getTimezoneOffset(),
    })
      .then((response) => {
        var blob = new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(
          blob,
          `Loan Repayments_Deposit History_${
            rkplan[0]?.rkPlanNumber
          }_${dateTimeFormat()}.xlsx`
        );
      })
      .catch((error) => {});
  };

  const renderValue = (props) => {
    const value = props.dataItem[props.field];

    if (
      (props.field === "outstandingLoanBalance" ||
        props.field === "periodicPaymentAmount") &&
      props?.dataItem?.loanId?.startsWith("NTL_")
    ) {
      return <td>-</td>;
    }

    if (props.column.dataType === "amount") {
      return <td>{usCurrency(value)}</td>;
    }

    if (props.column.dataType === "date") {
      return <td>{usDateFormat(value)}</td>;
    }
    if (props.column.dataType === "dateTime") {
      return (
        <td>{moment.utc(value).local().format("MM/DD/YYYY, HH:mm:ss")}</td>
      );
    }

    if (props.column.columnName === "comments") {
      return (
        <td>
          <AddToolTip name={value || "-"} placement="top">
            {value || "-"}
          </AddToolTip>
        </td>
      );
    }

    if (
      props.column.dataType === "alphaNumeric" &&
      props.column.columnName === "loanStatus"
    ) {
      return <td>{LOAN_STATUS[value] || "-"}</td>;
    }

    if (props.column.columnName === "uploadedBy") {
      return (
        <td>
          <AddToolTip name={value}>
            {value !== "0"
              ? value?.length > 15
                ? value.slice(0, 15) + "..."
                : value
              : "-"}
          </AddToolTip>
        </td>
      );
    }

    return <td>{value === null || value === "" ? "-" : value}</td>;
  };

  const dateFieldRender = (props) => {
    return <td>{usDateFormat(props.dataItem[props.field])}</td>;
  };
  const hideColumns = () => {
    setFlag(!flag);
    setSelectedColumns(final.map((item) => item.value));
  };

  useEffect(() => {
    getPlansLoanRepayments({
      planId: parseInt(planId),
      employeeId: parseInt(censusId),
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    }).then((response) => {
      setResponse(response);
    });
  }, []);
  const onFormSubmit = {};
  const onFilter = (values) => {
    getPlansLoanRepayments({
      planId: parseInt(planId),
      employeeId: parseInt(censusId),
      startDate: values.startDate,
      endDate: values.endDate,
    }).then((response) => {
      setResponse(response);
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        flag &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setFlag(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [flag]);

  return (
    <>
      <div className="w-100">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="mt-mb-1p25r">Show record(s) of particular period</div>
        </div>
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
                <div className="d-flex hoursHeader">
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
                          value={usDateFormat(values[fields.startDate])}
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
                    className="mt-28"
                  >
                    Go
                  </Button>
                </div>
                <div className="d-flex justify-content-space-between mb-3">
                  <div className="mr-4">
                    {response.length} - Record(s) found
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      ref={dropdownRef}
                      className={`${styles["m-r-16px-relative"]}`}
                    >
                      <Button
                        variant="secondary"
                        className={`d-inline-block border-none`}
                        onClick={hideColumns}
                      >
                        <span className="marg-right-6">
                          <i className="fal fa-columns"></i>
                        </span>
                        Column
                      </Button>
                      {flag && (
                        <div
                          className={`${styles["w-277px-h-308px-p-0p5r-m-t-0p25r-absolute"]} manage-column-dropdown b-1px-solid-brand-primary`}
                        >
                          <div className="mb-1">
                            <div className="core-body-text-regular-medium-sl">
                              Manage columns
                            </div>
                          </div>
                          <div className={`popover-container-sm`}>
                            <MultiSelectDropdown
                              hideSelectedOptions="FALSE"
                              height="160px"
                              maxHeight="300px"
                              size="sm"
                              options={columns}
                              onSelect={(value) => {
                                setSelectedColumns(value);
                              }}
                              name={"Columns"}
                              value={selectedColumns}
                              trigger={trigger}
                            />
                            <Button
                              className={`ml-100px mt-2 `}
                              onClick={applyColumns}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() =>
                        response.length > 0 && exportFunction(values)
                      }
                      className={`d-flex align-items-center ${
                        response?.length > 0
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
                        className={`export-text btn-link ml-1 ${
                          response?.length > 0
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        }`}
                      >
                        Export
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div
        className={`min-w-0px table-width overflow-y-auto eligibility-report-table`}
      >
        {" "}
        <ExcelExport data={response}>
          <Tooltip openDelay={100} position="bottom" anchorElement="element">
            <Grid data={response} total={response.length} resizable={true}>
              {final.map((column, idx) => (
                <GridColumn
                  key={idx}
                  field={column.columnName}
                  title={column.label}
                  className={column.className}
                  width={column.width}
                  cells={{
                    headerCell: (props) => (
                      <HeaderThElement {...props.thProps}>
                        {props.children}
                      </HeaderThElement>
                    ),
                    data: (props) => renderValue({ ...props, column }),
                  }}
                />
              ))}
            </Grid>
          </Tooltip>
        </ExcelExport>
      </div>
    </>
  );
};

export default LoanRepayments;
