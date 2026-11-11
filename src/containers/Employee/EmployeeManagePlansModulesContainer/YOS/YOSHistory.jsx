import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { getEmployeeYOSDetails } from "@/services/vesting";
import DatePicker from "@/components/DatePicker";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import LoaderWrapper from "@/components/LoaderWrapper";
import { useRouterParams } from "@/abstracts/hooks";
import { formFields } from "@/utils/constants/formFields";
import { usDateFormat } from "@/utils/helpers";
import { manageCensusFormNames } from "@/utils/constants/employee";
import { Button, Form } from "react-bootstrap";
import { Field, Formik } from "formik";
import moment from "moment";

const columns = [
  {
    value: 1,
    label: "YOS",
    columnName: "YOS",
    className: "column-yos",
    field: "yearsOfService",
    width: 111,
    dataType: "number",
  },
  {
    value: 2,
    label: "Credited this computation period",
    columnName: "Credited this computation period",
    className: "column-creditedThisComputationPeriod",
    field: "creditedThisYear",
    width: 250,
    dataType: "alphanumeric",
  },
  {
    value: 3,
    label: "Computation period",
    columnName: "computationPeriod",
    className: "column-computationPeriod",
    field: "computationPeriod",
    width: 210,
    dataType: "date",
  },
  {
    value: 4,
    label: "Computation method",
    columnName: "computationmethod",
    className: "column-ComputationMethod",
    field: "responsibleForCalculation",
    width: 200,
    dataType: "alphanumeric",
  },
  {
    value: 5,
    label: "Comments",
    columnName: "comments",
    className: "column-comments",
    field: "coments",
    width: 200,
    dataType: "",
  },
];

const YOSHistory = () => {
  const { flow, censusId, planId } = useRouterParams();
  const [YOSDetails, setYOSDetails] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [final, setFinal] = useState(columns);
  const [lastScrollTop, setLastScrollTop] = useState(null);
  const formName = manageCensusFormNames.CENSUS_YOS;
  const fields = formFields[formName];
  const [filteredYOSData, setFilterYOSData] = useState([]);

  const payload = { planId: planId, employeeId: censusId };

  useEffect(() => {
    setIsLoading(true);
    getEmployeeYOSDetails(payload)
      .then((response) => {
        if (response) {
          const groupedData = response.reduce((acc, item) => {
            const key = item.createdOn;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
          }, {});

          const groupedArray = Object.entries(groupedData).map(
            ([createdOn, items]) => ({
              createdOn,
              items,
            })
          );

          setIsLoading(false);
          setYOSDetails(groupedArray);
          setFilterYOSData(groupedArray);
        }
      })
      .catch(() => setIsLoading(false));
  }, []);

  const scrollHandler = (event) => {
    const e = event.nativeEvent;
    if (lastScrollTop === e.target.scrollTop) {
      return;
    }
    setLastScrollTop(e.target.scrollTop);
    if (
      e.target.scrollTop + 20 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
    }
  };

  class ProductNameHeader extends React.Component {
    render() {
      return (
        <a className="k-link" onClick={this.props.onClick}>
          <span title={this.props.title}>{this.props.title}</span>
          {this.props.children}
        </a>
      );
    }
  }

  const renderValue = (value) => {
    value = value?.dataItem ? value.dataItem[value.field] : value;
    return <td>{value ? <div>{value}</div> : <div>{"-"}</div>}</td>;
  };
  const renderDecimalValue = (value) => {
    value = value?.dataItem ? value.dataItem[value.field] : value;
    return (
      <td>
        {![null, undefined].includes(value) ? (
          <div>{value}</div>
        ) : (
          <div>{"-"}</div>
        )}
      </td>
    );
  };
  const renderResponsibleForCalculation = (value) => {
    value = value?.dataItem ? value.dataItem[value.field] : value;
    return <td>{value === 1 ? <div>Client</div> : <div>Core</div>}</td>;
  };

  const renderValueBoolean = (value) => {
    value = value?.dataItem ? value.dataItem[value.field] : value;
    return <td>{value ? <div>Yes</div> : <div>No</div>}</td>;
  };

  const renderValueDateRange = (value) => {
    const startDate = value?.dataItem ? value.dataItem["startDate"] : value;
    const endDate = value?.dataItem ? value.dataItem["endDate"] : value;

    return (
      <td>
        {startDate && endDate ? (
          <div>{`${usDateFormat(startDate)} - ${usDateFormat(endDate)}`}</div>
        ) : (
          <div>NA</div>
        )}
      </td>
    );
  };

  const renderValueConditions = (value) => {
    const fieldName = value.field;
    if (fieldName === "creditedThisYear") return renderValueBoolean(value);
    if (fieldName === "computationPeriod") return renderValueDateRange(value);
    if (fieldName === "responsibleForCalculation")
      return renderResponsibleForCalculation(value);
    if (fieldName === "yearsOfService") return renderDecimalValue(value);
    return renderValue(value);
  };

  const initialValues = {};

  const handleSearch = (fd, td, setFieldError) => {
    let filtered = filteredYOSData;
    if (fd && td && Date.parse(fd) > Date.parse(td)) {
      setFieldError(fields.toDate, "Selected date range is invalid");
      return;
    }
    if (fd && td) {
      filtered = filteredYOSData.filter(
        (items) =>
          usDateFormat(items.createdOn) >= fd &&
          usDateFormat(items.createdOn) <= td
      );
    } else if (fd && !td) {
      filtered = filteredYOSData.filter(
        (items) => usDateFormat(items.createdOn) >= fd
      );
    } else if (!fd && td) {
      filtered = filteredYOSData.filter(
        (items) => usDateFormat(items.createdOn) <= td
      );
    }

    setYOSDetails(filtered);
  };
  return (
    <div>
      <LoaderWrapper isLoading={loading}>
        <Formik
          initialValues={{
            ...initialValues,
          }}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            setValues,
            setFieldError,
            values,
            dirty,
            ...rest
          }) => {
            const onDaySelected = (fieldName, value) => {
              setFieldValue(fieldName, value);
            };

            return (
              <Form autoComplete="off" className="h-100p">
                <div className="d-flex">
                  <Field
                    size="sm"
                    isRequired
                    label="From date"
                    name={fields.fromDate}
                    value={usDateFormat(values[fields.fromDate])}
                    isDatePicker
                    placeholder="From date"
                    placement="right"
                    onClear={() => onDaySelected(fields.fromDate, "")}
                    popupContent={
                      <DatePicker
                        onDayClick={(value) =>
                          onDaySelected(fields.fromDate, value)
                        }
                        value={values[fields.fromDate]}
                      />
                    }
                    component={FieldDropSide}
                  />

                  <span className="ml-1p5r">
                    <Field
                      size="sm"
                      label="To date"
                      name={fields.toDate}
                      isRequired
                      placeholder="To date"
                      value={usDateFormat(values[fields.toDate])}
                      direction="right"
                      isDatePicker
                      onClear={() => {
                        onDaySelected(fields.toDate, "");
                      }}
                      onDefaultClearDisplay={values[fields.fromDate]}
                      popupContent={
                        <DatePicker
                          onDayClick={(value) =>
                            onDaySelected(fields.toDate, value)
                          }
                          value={values[fields.toDate]}
                        />
                      }
                      component={FieldDropSide}
                    />
                  </span>

                  <Button
                    className="ml-1p5r mt-28"
                    variant="primary"
                    onClick={() => {
                      const fromdate = usDateFormat(values[fields.fromDate]);
                      const todate = usDateFormat(values[fields.toDate]);
                      handleSearch(fromdate, todate, setFieldError);
                    }}
                  >
                    Search
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
        {YOSDetails?.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="mb-2 fw-700">
              Run Date: {moment(group?.createdOn).format("DD-MM-YYYY HH:mm:ss")}
            </div>

            <Grid
              data={group?.items}
              total={group?.items.length}
              resizable
              fixedScroll
              onScroll={scrollHandler}
            >
              {final.map((column, idx) => (
                <GridColumn
                  key={idx}
                  field={column.field}
                  width={column.width}
                  title={column.label}
                  filter={column.dataType}
                  cells={{ data: renderValueConditions }}
                  headerCell={ProductNameHeader}
                />
              ))}
            </Grid>
          </div>
        ))}
      </LoaderWrapper>
    </div>
  );
};

export default YOSHistory;
