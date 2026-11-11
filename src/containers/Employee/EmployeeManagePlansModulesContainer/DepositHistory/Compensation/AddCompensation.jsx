import styles from "./AddCompensation.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { isEmpty, get, camelCase } from "lodash-es";
import { Button, Form } from "react-bootstrap";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import DatePicker from "@/components/DatePicker";
import FieldInputDollar from "@/components/Forms/FieldInputDollar";
import FieldTextarea from "@/components/Forms/FieldTextarea";
import FormLeaveGuard from "@/components/FormLeaveGuard";
import FieldButtonGroup from "@/components/Forms/FieldButtonGroup";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import LoaderWrapper from "@/components/LoaderWrapper";
import CompensationTree from "@/components/CompensationTree";
import ModalNotification from "@/components/ModalNotification";
import WarningInfo from "@/components/WarningInfo";
import { formFields } from "@/utils/constants/formFields";
import { manageCensusFormNames } from "@/utils/constants/employee";

import { usDateFormat, toMultiSelectValueById } from "@/utils/helpers";

import { yesNoOptions } from "@/utils/constants/common";
import { useRouterParams, useDeepEffect } from "@/abstracts/hooks";
import {
  appLayoutStore,
  manageCensusStore,
  setManagePageLevelData,
} from "../../../../../contexts";
import { Formik, Field } from "formik";
import { addEmployeeCompensation } from "@/services/census";
import { getEmployerSources } from "@/services/payroll";

import moment from "moment";

const initialValues = {
  acceptWarning: false,
};

const AddCompensations = (props) => {
  const {
    toggleCompensationForm,
    isInnerFormDirty,
    setIsInnerFormDirty,
    setToggle,
    toggle,
    formValues,
    setFormvalues,
    isEdit,
    isView,
    setIsView,
    menu,
    subMenu,
    planCompensation,
    grossCompensation,
    payPeriodGrossCompensation,
    payPeriodPlanCompensation,
    showCompensationForm,
    isAddMode,
    getEmploymentStatusBasedOnPayDate,
    employeeRehireData,
  } = props;
  const { flow, planId, censusId } = useRouterParams();
  const { state, dispatch } = useContext(manageCensusStore);
  const [showDirtyCheckModal, setShowDirtyCheckModal] = useState(false);
  const formName = manageCensusFormNames.ADD_COMPENSATIONS;
  const fields = formFields[formName];
  const [tags, setTags] = useState([]);
  const [sourceCompensationFieldError, setSourceCompensationFieldError] =
    useState("");
  const [selectedCompensation, setSelectedCompensation] = useState("");
  const [searchCompensation, setSearchCompensation] = useState("");
  const [transformedValues, setTransformedValues] = useState([]);
  // const isAllSelected = filteredValues.length;
  const [trigger, setTrigger] = useState(true);
  const [dropDownValues, setdropDownValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [warning, setWarning] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { state: state2 } = useContext(appLayoutStore);
  const permissions = get(state2, "permissions", {});
  useDeepEffect(() => {
    getEmployerSources(planId).then((response) => {
      setdropDownValues(
        response &&
          response.map((val) => ({
            label: val.name,
            value: val.id,
          }))
      );
      setFilteredValues(
        response &&
          response.map((val) => ({
            label: val.name,
            value: val.id,
          }))
      );
    });
  }, []);
  const columns = [
    {
      label: "Compensation",
      columnName: "Compensation",
      fieldName: "compensationCategoryName",
      className: "w-40",
    },
    {
      label: "Calculated Method",
      columnName: "Method",
      fieldName: "method",
      className: "w-30 method",
    },
    {
      label: "Payperiod",
      columnName: "Amount",
      fieldName: "payPeriodAmount",
      className: "w-20 amount",
    },
  ];

  const onSelectAllClick = () => {
    setTransformedValues(
      transformedValues.map((item) => ({
        ...item,
        // checked: isAllSelected ? false : true,
      }))
    );
    //const allSelectedOptions = isAllSelected ? [] : filteredValues;
    //setSelectedOptions(allSelectedOptions);
    selectedCompensation.length > 0
      ? setSelectedCompensation([])
      : setSelectedCompensation(filteredValues);

    // onSelect(allSelectedOptions.map(({ label }) => label));
  };

  // const { response: dropDownValues } = useRequest({
  //   method: getEmployerSources,
  //   payload: planId,
  //   defaultResponse: [],
  // });

  useEffect(() => {
    return () => setIsInnerFormDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = (values, { setFieldError }) => {
    setIsLoading(true);
    if (values.payDate === "") delete values.payDate;
    if (isEdit) values.acceptWarning = true;
    addEmployeeCompensation({
      ...values,
      planId: parseInt(planId),
      employeeId: parseInt(censusId),
      payPeriodGrossCompensation: parseFloat(values.grossCompensationCategory),
      payPeriodPlanCompensation: parseFloat(values.planCompensationCategory),
      grossCompensationCategory: values.grossCompensationCategory,
      planCompensationCategory: values.planCompensationCategory,
      annualSalary: parseFloat(values.annualSalary),
    })
      .then((response) => {
        if (response.isSuccessfull) {
          dispatch(
            setManagePageLevelData({
              formName: formName,
              fieldData: values,
            })
          );
          toggleCompensationForm();
          setToggle(!toggle);
        } else {
          for (const error of response.errorMessages) {
            var errlen = response.errorMessages.filter(
              (x) => x.errorType === "IsError"
            ).length;
            if (errlen === 0 && response.errorMessages.length - errlen !== 0) {
              setWarning(error.message);
              setisModalOpen(true);
            }
            if (error.controlName === "eligibleSources") {
              setSourceCompensationFieldError(error.message);
            } else setSourceCompensationFieldError("");
            if (error.errorCode != "EM119") {
              var errMsg = error.errorCode != "EM119" && error.message;
              setFieldError(error.controlName, errMsg);
            } else if (error.errorCode == "EM119") {
              var errMsg = response.errorMessages
                .filter((x) => x.errorCode == "EM119")
                .map((x) => x.message);
              const extractStringAfterHyphen = (str) => {
                return str.split("-").pop().trim();
              };

              const results = errMsg.map(extractStringAfterHyphen);
              const commaSeparatedResults = results.join(",");
              const index = error.message.indexOf(" -");
              var msg =
                index !== -1
                  ? error.message.substring(0, index)
                  : error.message;
              setFieldError(
                error.controlName,
                msg + " -" + commaSeparatedResults
              );
            }
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        //Handle Error
        setIsLoading(false);
      });
  };
  // compensationCategoryId:x.Id,
  // compensationCategoryName : x.compensationCategoryName,
  // grossModeOfCompensationCalculation: x.grossModeOfCompensationCalculation,
  // id : 0,
  // isIncluded: x.isIncluded,
  // payPeriodAmount : x.payPeriodAmount,

  const onFormToggle = () => {
    if (isInnerFormDirty) {
      setShowDirtyCheckModal(true);
    } else {
      toggleCompensationForm();
    }
    setFormvalues({});
    setIsView(false);
  };
  const handleConfirmClick = () => {
    toggleCompensationForm();
  };

  const handleCancelClick = () => {
    setShowDirtyCheckModal(false);
  };
  const handleClose = () => {
    setisModalOpen(false);
  };

  console.log(
    "isAddMode",
    isAddMode,
    payPeriodPlanCompensation.planCompensationCategory
  );

  return (
    <>
      <LoaderWrapper isLoading={isLoading}>
        <Formik
          initialValues={{
            ...initialValues,
            //[fields.eligiblePlanCompensation]: false,
            ...get(state, formName, {}),
            ...formValues,
            grossCompensationCategory:
              isAddMode == 1
                ? payPeriodGrossCompensation.map((x) => ({
                    compensationCategoryId: x.id,
                    compensationCategoryName: x.compensationCategoryName,
                    grossModeOfCompensationCalculation:
                      x.grossModeOfCompensationCalculation,
                    id: 0,
                    isIncluded: x?.isIncluded,
                    payPeriodAmount: x.payPeriodAmount,
                  }))
                : get(formValues, "employeeCompensationCategory", []).map(
                    (x) => ({
                      compensationCategoryId: x.compensationCategoryId,
                      compensationCategoryName: x.compensationCategoryName,
                      grossModeOfCompensationCalculation:
                        x.grossModeOfCompensationCalculation,
                      id: x.id,
                      isIncluded: payPeriodGrossCompensation.find(
                        (o) => o.id == x.compensationCategoryId
                      )?.isIncluded,
                      payPeriodAmount: x.payPeriodAmount,
                    })
                  ),
            planCompensationCategory:
              isAddMode == 1
                ? payPeriodPlanCompensation.planCompensationCategory?.map(
                    (x) => ({
                      compensationCategoryId: x.id,
                      compensationCategoryName: x.compensationCategoryName,
                      planModeOfCompensationCalculation:
                        x.planModeOfCompensationCalculation,
                      id: 0,
                      isIncluded: x?.isIncluded,
                      payPeriodAmount: x.payPeriodAmount,
                    })
                  )
                : get(
                    formValues,
                    "employeePlanLevelCompensationCategory",
                    []
                  ).map((x) => ({
                    compensationCategoryId: x.compensationCategoryId,
                    compensationCategoryName: x.compensationCategoryName,
                    planModeOfCompensationCalculation:
                      x.planModeOfCompensationCalculation,
                    id: x.id,
                    isIncluded: payPeriodGrossCompensation?.find(
                      (o) => o.id == x.compensationCategoryId
                    )?.isIncluded,
                    payPeriodAmount: x.payPeriodAmount,
                  })),
            [fields.eligiblePlanCompensation]:
              formValues.eligiblePlanCompensation === "Yes" ? true : false,
            [fields.annualSalary]:
              isAddMode == 0 ? get(formValues, "annualSalary") : null,
            [fields.payDate]:
              isAddMode == 0 ? get(formValues, "payDate") : undefined,
            [fields.eligibleSources]: isEmpty(formValues.eligibleSources)
              ? null
              : formValues.eligibleSources?.map((val, ind) => val.id),
          }}
          onSubmit={onFormSubmit}
          enableReinitialize
        >
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            values,
            errors,
            dirty,
            ...rest
          }) => {
            console.log("payPeriodPlanCompensation", payPeriodPlanCompensation);
            const onDaySelected = (fieldName, value) => {
              if (moment(value).isValid()) {
                const employmentStatus =
                  getEmploymentStatusBasedOnPayDate(value);
                if (
                  employmentStatus == "Terminated" &&
                  payPeriodPlanCompensation.isPostSeverance == 1 &&
                  !(moment(value) < moment(employeeRehireData[0].hireDate))
                ) {
                  var c =
                    payPeriodPlanCompensation.postSeveranceCompensationCategory.map(
                      (x) => ({
                        compensationCategoryId: x.id,
                        compensationCategoryName: x.compensationCategoryName,
                        planModeOfCompensationCalculation:
                          x.planModeOfCompensationCalculation,
                        id: 0,
                        isIncluded: x?.isIncluded,
                        payPeriodAmount: x.payPeriodAmount,
                      })
                    );
                  setFieldValue(fields.planCompensationCategory, c);
                } else {
                  var existingPlanComp = get(
                    values,
                    fields.planCompensationCategory,
                    []
                  );
                  var a =
                    payPeriodPlanCompensation.planCompensationCategory.map(
                      (x) => {
                        var temp = existingPlanComp.find(
                          (_) => _.compensationCategoryId == x.id
                        );
                        return {
                          compensationCategoryId: x.id,
                          compensationCategoryName: x.compensationCategoryName,
                          planModeOfCompensationCalculation:
                            x.planModeOfCompensationCalculation,
                          id: 0,
                          isIncluded: x?.isIncluded,
                          payPeriodAmount:
                            temp?.payPeriodAmount ?? x?.payPeriodAmount,
                        };
                      }
                    );
                  setFieldValue(fields.planCompensationCategory, a);
                }
              }
              setFieldValue(fieldName, value);
            };
            const selectedSources = values[fields.eligibleSources];
            if (isInnerFormDirty !== dirty) {
              setIsInnerFormDirty(dirty);
            }
            const onDeleteConfirmClick = () => {
              values.acceptWarning = true;
              setisModalOpen(false);
            };
            const errorMessage =
              "At least one of the Plan Compensation/ Gross Compensation/ Annual Salary is required";
            return (
              <Form
                autoComplete="off"
                className="h-100p"
                onSubmit={handleSubmit}
                validated={!isEmpty(rest.errors)}
              >
                <div className={`${styles["h-50px-flex-items-center"]}`}>
                  <div className={`${styles["p-r-20r"]} core-page-titles`}>
                    Add compensation
                  </div>
                </div>
                <div className="core-body-text-regular-medium-sl">
                  <WarningInfo
                    page="ManageSourceCompensationComponent"
                    className={`${
                      errors.addCompensationSlider ? "critical-text-color" : ""
                    }`}
                    message={errorMessage}
                  />
                </div>
                <hr />
                <Field
                  isRequired
                  size="sm"
                  label="Pay date"
                  name={fields.payDate}
                  value={usDateFormat(values[fields.payDate])}
                  isDatePicker
                  onClear={() => onDaySelected(fields.payDate, "")}
                  popupContent={
                    <DatePicker
                      onDayClick={(value) =>
                        onDaySelected(fields.payDate, value)
                      }
                      value={values[fields.payDate]}
                    />
                  }
                  component={FieldDropSide}
                  disabled={isView}
                />
                {isAddMode == 1 ? (
                  <>
                    <div className="column-header fw-16 ft-600">
                      {columns.map((column) => (
                        <div className={`header-cmp-item ${column.className}`}>
                          {column.label}
                        </div>
                      ))}
                    </div>
                    <CompensationTree
                      header={"Gross Compensation"}
                      compensations={values.grossCompensationCategory}
                      isPlanCompensation={false}
                      isAddMode={isAddMode}
                      fields={fields}
                      errorMessage={errors.payPeriodGrossCompensation}
                    />
                    <CompensationTree
                      header={"Plan Compensation"}
                      compensations={values.planCompensationCategory}
                      isPlanCompensation
                      isAddMode={isAddMode}
                      fields={fields}
                      errorMessage={errors.payPeriodPlanCompensation}
                    />
                  </>
                ) : (
                  <>
                    <div className="column-header fs-16px fw-600">
                      {columns.map((column) => (
                        <div className={`header-cmp-item ${column.className}`}>
                          {column.label}
                        </div>
                      ))}
                    </div>
                    <CompensationTree
                      header={"Gross Compensation"}
                      compensations={grossCompensation}
                      isPlanCompensation={false}
                      isAddMode={isAddMode}
                      fields={fields}
                    />
                    <CompensationTree
                      header={"Plan Compensation"}
                      compensations={planCompensation}
                      isPlanCompensation
                      isAddMode={isAddMode}
                      fields={fields}
                      // values={values}
                    />
                  </>
                )}
                <Field
                  name={fields.annualSalary}
                  label={"Annual Salary"}
                  isRequired
                  type="text"
                  autoComplete="off"
                  value={values[fields.annualSalary]}
                  onChange={handleChange}
                  max={999999999.99}
                  component={FieldInputDollar}
                  disabled={isEdit}
                />
                <Field
                  isRequired
                  name={fields.eligiblePlanCompensation}
                  label="Eligible Plan Compensation"
                  options={yesNoOptions}
                  value={false}
                  selectedValue={values[fields.eligiblePlanCompensation]}
                  onChange={(value) => {
                    setFieldValue(fields.eligiblePlanCompensation, value);
                  }}
                  disabled={isView}
                  component={FieldButtonGroup}
                  size="sm"
                />
                {values[fields.eligiblePlanCompensation] == true && (
                  <div className="mb-14 h-70">
                    {/* <div className="mb-5 fs-12px lh-18">Source Compensation</div> */}
                    <div className={`w-238`}>
                      <Field
                        size="md"
                        label={"Source Compensation"}
                        placeholder={"0 selected"}
                        name={fields.eligibleSources}
                        direction="right"
                        nonPayPeriod={true}
                        options={filteredValues}
                        value={toMultiSelectValueById(
                          selectedSources,
                          filteredValues
                        )}
                        disabled={isView}
                        isMultiSelect
                        popupContent={
                          <MultiSelectDropdown
                            trigger={trigger}
                            label={"Search"}
                            options={filteredValues}
                            // width="320px"
                            maxHeight="350px"
                            height="180px"
                            hideSelectAll={false}
                            onSelect={(value) =>
                              setFieldValue(fields.eligibleSources, value)
                            }
                            value={selectedSources}
                            hideSelectedOptions={true}
                          />
                        }
                        component={FieldDropSide}
                        isRequired={
                          values[fields.eligiblePlanCompensation] == true
                        }
                      />
                    </div>
                  </div>
                )}
                {/* {values[fields.eligiblePlanCompensation] == true && (
                  <div>
                    <p style={{ color: "var(--semantics-critical-text)", fontSize: "var(--fs-12)" }}>
                      {sourceCompensationFieldError}
                    </p>
                  </div>
                )} */}
                <Field
                  name={fields.comments}
                  label="Comments"
                  autoComplete="off"
                  value={values[fields.comments]}
                  onChange={handleChange}
                  component={FieldTextarea}
                  disabled={isView}
                />
                {(!isEdit && !isView) || (isEdit && !isView) ? (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onFormToggle}
                      className={`mr-15px`}
                    >
                      Cancel
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className={`${styles["p-015px-v2"]}`}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  // isEdit && isView ?
                  // (
                  <>
                    {!isEmpty(permissions) &&
                    permissions[menu + "SubMenu"][camelCase(subMenu)]?.includes(
                      "U"
                    ) ? (
                      <Button
                        onClick={() => setIsView(false)}
                        className={`mr-15px`}
                      >
                        Edit
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onFormToggle}
                      className={`${styles["p-015px-v2"]}`}
                    >
                      Cancel
                    </Button>
                  </>
                  //   ):
                  //   (
                  //   <>
                  //   <Button type="button" variant="secondary" onClick={onFormToggle} style={{marginRight:"15px"}}>
                  //   Cancel
                  // </Button>
                  // &nbsp;&nbsp;&nbsp;
                  // <Button type="submit" onClick={handleSubmit} style={{padding:"0 15px",}}>
                  //   save
                  // </Button>
                  // </>
                  //   )
                )}
                <br />
                <br />
                <FormLeaveGuard
                  showModal={showDirtyCheckModal}
                  handleConfirmClick={handleConfirmClick}
                  handleCancelClick={handleCancelClick}
                />
                <ModalNotification
                  show={isModalOpen}
                  header={"Accept Warning ?"}
                  message={warning}
                  onHide={handleClose}
                  infoType={2}
                  primaryButtonAction={onDeleteConfirmClick}
                  primaryButtonLabel={"Ok"}
                  secondaryButtonAction={handleClose}
                  secondaryButtonLabel={"Cancel"}
                />
              </Form>
            );
          }}
        </Formik>
      </LoaderWrapper>
    </>
  );
};

export default AddCompensations;
