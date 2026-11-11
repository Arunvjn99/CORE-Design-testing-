import styles from "./EligibilityOverride.module.scss";
import React, { useState, useContext, useEffect } from "react";
import { Field, FieldArray, Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { get, isEmpty, isNull, orderBy, isEqual } from "lodash-es";
import { faPencilAlt, faTimes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "@/components/CsplTable";
import DatePicker from "@/components/DatePicker";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import Link from "@/components/Link";
import LoaderWrapper from "@/components/LoaderWrapper";
import SliderPanel from "@/components/SliderPanel";
import AddToolTip from "@/components/AddToolTip";
import DataTable from "@/components/DataTable";
import FormLeaveGuard from "@/components/FormLeaveGuard";
import SearchableList from "@/components/SearchableList";
import {
  getEligibilityInformation,
  getEligibilityHistory,
  getComputationalPeriods,
} from "@/services/payroll";
import { manageCensusFormNames } from "@/utils/constants/employee";
import { getFlowBasedFormValues, usDateFormat } from "@/utils/helpers";
import { ROUTES, ELIGIBILITY_BASIS } from "@/utils/constants/common";
import { useRouterParams } from "@/abstracts/hooks";
import { appLayoutStore, manageCensusStore } from "../../../../contexts";
import { saveEligibilityInformation } from "@/services/payroll";
import EligibilityOverrideSlideTable from "./EligibilityOverrideSlideTable";

const initialValues = {};
// const computationPeriodTable=[
//   {
//     startDate:"09/12/2019",
//     endDate:"09/21/2022",
//     computationHours:"223",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"01/10/2019",
//     endDate:"02/12/2022",
//     computationHours:"423",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"12/16/2018",
//     endDate:"12/16/2022",
//     computationHours:"456",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"07/25/2018",
//     endDate:"07/25/2021",
//     computationHours:"756",
//     computationType:"plan year after anniversary of hire"
//   },
//   {
//     startDate:"06/22/2018",
//     endDate:"06/22/2021",
//     computationHours:"123",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"11/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"233",
//     computationType:"plan year after anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   //added
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },

//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },
//   {
//     startDate:"09/09/2017",
//     endDate:"31/12/2019",
//     computationHours:"500",
//     computationType:"Anniversary of hire"
//   },

// ];

const columns = [
  {
    label: "Source name",
    className: "column-sourceName",
    columnName: "sourceName",
  },
  {
    label: "Eligibility requirement met date",
    className: "column-eligibilityRequirementMetDate",
    columnName: "eligibilityRequirementMetDate",
  },
  {
    label: "Eligibility status",
    className: "column-eligibilityStatus",
    columnName: "eligibilityStatus",
    // dataMapper: OPTIONS_DATA_MAPPER.ELIBILITY_STATUS,
  },
  {
    label: "Entry date",
    className: "column-entryDate",
    columnName: "entryDate",
  },
  {
    label: "Anchor plan participation",
    className: "column-anchorEligibility",
    columnName: "anchorEligibility",
  },
  {
    label: "Payroll based eligibility",
    className: "column-payrollBasedEligibility",
    columnName: "payrollBasedEligibility",
    type: "boolean",
  },
  // {
  //   label: "LTPT eligibility",
  //   className: "w-9",
  //   columnName: "ltptEligibility",
  //   type: "boolean",
  // },
  {
    label: "Eligibility basis",
    className: "column-eligibilityBasis",
    columnName: "eligibilityBasis",
    // type: "boolean",
  },
  {
    label: "Eligibility history",
    className: "column-eligibilityHistory",
    columnName: "eligibilityHistory",
  },
  {
    label: "Computation period",
    className: "column-computationPeriod",
    columnName: "computationPeriod",
  },
];

const columnsComputationPeriod = [
  {
    label: "Computation period start date",
    className: "column-computationPeriodStartDate",
    columnName: "startDate",
  },
  {
    label: "Computation period end date",
    className: "column-computationPeriodEndDate",
    columnName: "endDate",
  },
  {
    label: "Computation hours",
    className: "column-column-computationPeriodHours",
    columnName: "hours",
    // dataMapper: OPTIONS_DATA_MAPPER.ELIBILITY_STATUS,
  },
  {
    label: "Computation type",
    className: "column-computationPeriodType",
    columnName: "computationType",
  },
];

const EligibilityOverride = ({
  isEdit,
  isSave,
  isInnerFormDirty,
  setIsInnerFormDirty,
  onClickEdit,
  onClickSave,
  menu,
  subMenu = "employeeManagePlans",
  companyId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sidePanelData, setSidePanelData] = useState({});
  const [isSliderOpen, setSliderOpen] = useState(false);
  const { flow } = useRouterParams();
  const [newFlow, setNewFlow] = useState();
  const { state, dispatch } = useContext(manageCensusStore);
  const formName = manageCensusFormNames.ADD_COMPENSATIONS;
  const [computationPeriodTable, setComputationPeriodTable] = useState([]);
  const [isEligible, setIsEligible] = useState([]);
  const [toggle, setToggle] = useState();
  const [eligibilityOverride, setEligibilityOverride] = useState([]);
  const { state: state2 } = useContext(appLayoutStore);
  const [edited, setEdited] = useState(true);
  const permissions = get(state2, "permissions", {});
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [originalEligibilityData, setOriginalEligibilityData] = useState([]);

  const [getIsOptedOut, setIsOptedOut] = useState();
  useEffect(() => {
    return () => setIsInnerFormDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortEligibilityInformationBySourceId = (eligibilityInfo) =>
    eligibilityInfo.sort((_) => _.sourceId);

  useEffect(() => {
    getEligibilityInformation({
      planId: planId,
      employeeId: censusId,
    }).then((response) => {
      setEligibilityOverride(response.eligibilityInformationDetails ?? []);
      setIsOptedOut(response.isOptedOut);
      const data = response.eligibilityInformationDetails ?? [];
      setOriginalEligibilityData(data);
    });
  }, []);

  const onViewComputationPeriodClick = (data) => {
    getComputationalPeriods({
      planId: planId,
      sourceId: data.sourceId,
      employeeId: censusId,
    }).then((response) => {
      setComputationPeriodTable(response);
      setSliderOpen(true);
    });
  };

  const onFormSubmit = (values) => {
    const formEligibilityOverrides =
      values["eligibilityOverride"]?.filter((item) => item !== undefined) || [];

    const mergedEligibilityOverrides = (eligibilityOverride || [])
      .map((original) => {
        const edited = formEligibilityOverrides.find(
          (formItem) => formItem?.sourceId === original?.sourceId
        );
        return edited ? { ...original, ...edited } : original;
      })
      .filter((item) =>
        formEligibilityOverrides.some(
          (formItem) => formItem?.sourceId === item?.sourceId
        )
      );

    const additionalOverrides = formEligibilityOverrides.filter(
      (formItem) =>
        !mergedEligibilityOverrides.some(
          (mergedItem) => mergedItem?.sourceId === formItem?.sourceId
        )
    );

    const mergedData = [...mergedEligibilityOverrides, ...additionalOverrides]
      .filter((item) => item)
      .map((item) => ({
        sourceId: item?.sourceId,
        planId: item?.planId ?? intPlanId,
        employeeId: item?.employeeId ?? intEmployeeId,
        anchorEligibility: item?.anchorEligibility ?? false,
        eligibilityStatus:
          item?.eligibilityStatus === true ||
          item?.eligibilityStatus === "Eligible",
        eligibilityRequirementMetDate:
          item?.eligibilityRequirementMetDate || null,
        entryDate: item?.entryDate || null,
        eligibilityBasis:
          // item?.anchorEligibility === false ||
          // item?.eligibilityStatus === "InEligible"
          //   ? 0
          item?.eligibilityBasis ?? 0,
      }))
      .filter((item) => item.sourceId);

    const inEligibleSourcesByAnchorEligibility = (originalEligibilityData || [])
      .filter((originalItem) => {
        if (!originalItem.anchorEligibility) {
          return false;
        }

        const currentItem = mergedData.find(
          (item) => item.sourceId === originalItem.sourceId
        );

        return currentItem?.anchorEligibility === false;
      })
      .map((item) => item.sourceId);

    const normalizeEligibilityData = (data = []) =>
      data
        .map((item) => ({
          sourceId: item?.sourceId,
          planId: item?.planId ?? intPlanId,
          employeeId: item?.employeeId ?? intEmployeeId,
          anchorEligibility: Boolean(item?.anchorEligibility),
          eligibilityStatus:
            item?.eligibilityStatus === true ||
            item?.eligibilityStatus === "Eligible",
          eligibilityRequirementMetDate: item?.eligibilityRequirementMetDate
            ? usDateFormat(item.eligibilityRequirementMetDate)
            : null,
          entryDate: item?.entryDate ? usDateFormat(item.entryDate) : null,
          eligibilityBasis: item?.eligibilityBasis ?? 0,
        }))
        .filter((item) => item.sourceId)
        .sort((a, b) => a.sourceId - b.sourceId);

    const originalData = normalizeEligibilityData(originalEligibilityData);
    const currentData = normalizeEligibilityData(mergedData);

    const hasEligibilityChanges = !isEqual(originalData, currentData);

    const eligiblityData = {
      sourceEligibilityInformation: mergedData.length > 0 ? mergedData : null,
      companyId,
      inEligibleSourcesByAnchorEligibility,
    };
    setIsLoading(true);
    if (isNull(eligiblityData.sourceEligibilityInformation)) {
      setIsLoading(false);
      onClickSave();
    } else {
      if (!hasEligibilityChanges) {
        setIsLoading(false);
        onClickSave();
        return;
      }
      const IsEntryDateChanged = eligibilityOverride.some((overrideItem) => {
        const match = eligiblityData?.sourceEligibilityInformation?.find(
          (dataItem) => dataItem.sourceId === overrideItem.sourceId
        );
        return (
          match &&
          usDateFormat(match.entryDate) !== usDateFormat(overrideItem.entryDate)
        );
      });
      saveEligibilityInformation({
        ...eligiblityData,
        isEntryDateChanged: IsEntryDateChanged,
      }).then((res) => {
        if (res) {
          getEligibilityInformation({
            planId: planId,
            employeeId: censusId,
          }).then((response) => {
            setEligibilityOverride(response.eligibilityInformationDetails);
            const latestData = response.eligibilityInformationDetails ?? [];
            setOriginalEligibilityData(latestData);
            setIsLoading(false);
            onClickSave();
          });
        }
      });
    }
  };
  const onViewButtonClick = (data) => {
    getEligibilityHistory({
      planId: planId,
      employeeId: censusId,
      sourceId: data.sourceId,
    })
      .then((response) => {
        data = {
          ...data,
          history: response,
        };
        setSidePanelData(data);
        setModalOpen(true);
      })
      .catch((error) => {
        //HandleError
      });
  };

  const { planId } = useRouterParams();
  const { censusId } = useRouterParams();
  const intPlanId = parseInt(planId, 10);
  const intEmployeeId = parseInt(censusId, 10);
  const subMenuItem =
    !isEmpty(permissions) &&
    permissions["employeesManagePlanSubMenu"]?.["eligibilityOverride"];
  const isAllowed = (icon, isAddButton) => {
    if (icon === "faPencilAlt") {
      return (subMenuItem || "").includes("U") ? true : false;
    } else if (isAddButton) {
      return (subMenuItem || "").includes("C") ? true : false;
    } else if (icon === "fatimes") {
      return true;
    }
  };
  return (
    <div className="mt-4 h-100p mb-5r">
      <Formik
        initialValues={{
          ...initialValues,
          eligibilityOverride: eligibilityOverride.map(() => undefined),
          ...getFlowBasedFormValues(get(state, formName, {}), flow),
        }}
        onSubmit={onFormSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validate={(values) => {
          const errors = {};

          eligibilityOverride.forEach((detail, index) => {
            const anchorEligibility = get(
              values,
              `eligibilityOverride[${index}].anchorEligibility`,
              detail.anchorEligibility
            );

            const eligibilityStatus = get(
              values,
              `eligibilityOverride[${index}].eligibilityStatus`,
              detail.eligibilityStatus === "Eligible"
            );

            const eligibilityBasis = get(
              values,
              `eligibilityOverride[${index}].eligibilityBasis`,
              detail.eligibilityBasis
            );

            const isFieldEnabled =
              anchorEligibility &&
              eligibilityStatus !== false &&
              detail.eligibilityStatus !== "InEligible";

            if (isFieldEnabled && !eligibilityBasis) {
              if (!errors.eligibilityOverride) {
                errors.eligibilityOverride = [];
              }

              errors.eligibilityOverride[index] = {
                eligibilityBasis: "Required",
              };
            }
          });

          return errors;
        }}
        enableReinitialize
      >
        {({
          handleChange,
          setFieldValue,
          handleSubmit,
          values,
          dirty,
          resetForm,
          setValues,
          errors,
          touched,
          ...rest
        }) => {
          {
            if (isInnerFormDirty !== dirty) {
              setIsInnerFormDirty(dirty);
            }
          }
          return (
            <Form
              autoComplete="off"
              name="eligibility-override"
              className="h-100p"
              onSubmit={handleSubmit}
            >
              <LoaderWrapper isLoading={isLoading}>
                <div className="d-flex flex-column mt-10 mb-10">
                  <div className="d-flex align-items-center">
                    <p className="h-50 core-heading-regular">
                      Eligibility override
                      <div></div>
                    </p>
                    {isSave ? (
                      <div className="ml-auto">
                        <Button
                          className=""
                          label="Cancel"
                          variant="secondary"
                          type="button"
                          onClick={() => {
                            if (dirty) {
                              setShowLeaveModal(true);
                            } else {
                              onClickSave();
                            }
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          label="Save"
                          variant="primary"
                          type="submit"
                          className="px-2 mx-2 "
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="ml-auto">
                        <div>
                          {isAllowed("faTimes", false) ? (
                            <Link
                              to={ROUTES.MANAGE_EMPLOYEE}
                              className="px-3 mx-3"
                            >
                              <FontAwesomeIcon
                                icon={faTimes}
                                color="var(--neutral-text-default)"
                                className={`fs-24px`}
                              />
                            </Link>
                          ) : null}
                          {isAllowed("faPencilAlt", false) ? (
                            <Button
                              icon={faPencilAlt}
                              color={
                                getIsOptedOut
                                  ? "var(--neutral-text-subtle-least)"
                                  : "var(--neutral-text-default)"
                              }
                              //style={{ fontSize: "1.5rem" }}
                              onClick={() => {
                                if (!getIsOptedOut) onClickEdit();
                              }}
                              className={
                                getIsOptedOut
                                  ? "cursor-not-allowed "
                                  : "pointer "
                              }
                              disabled={getIsOptedOut}
                            >
                              Edit
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <FieldArray name="eligibleOverride">
                  {() => (
                    <DataTable
                      className="eligibility-override-table"
                      columns={columns}
                      Data={eligibilityOverride}
                      getContent={(eligibilityDetail, index) => {
                        return columns.map((item, cellIndex) => {
                          const getContent = () => {
                            const columnName = item.columnName;
                            const fieldName = `eligibilityOverride[${index}].${columnName}`;

                            const data = get(eligibilityDetail, columnName);

                            const anchorEligibilityValue = get(
                              values,
                              `eligibilityOverride[${index}].anchorEligibility`,
                              eligibilityDetail["anchorEligibility"]
                            );
                            const isDateEnabled =
                              anchorEligibilityValue == true;

                            const overrideEligibilityStatus = get(
                              values,
                              `eligibilityOverride[${index}].eligibilityStatus`
                            );
                            const isIneligible =
                              overrideEligibilityStatus !== undefined
                                ? overrideEligibilityStatus === false
                                : eligibilityDetail.eligibilityStatus ===
                                  "InEligible";

                            const dateValue = isDateEnabled
                              ? usDateFormat(get(values, fieldName, data))
                              : usDateFormat(
                                  get(eligibilityDetail, columnName)
                                );
                            const onDaySelected = (name, value) => {
                              setFieldValue(name, value);
                            };
                            const requirementMetDate = get(
                              values,
                              `eligibilityOverride[${index}].eligibilityRequirementMetDate`,
                              eligibilityDetail.eligibilityRequirementMetDate
                            );
                            if (item.columnName === "sourceName") {
                              return (
                                <AddToolTip
                                  name={eligibilityDetail[item.columnName]}
                                >
                                  {!isEmpty(eligibilityDetail[item.columnName])
                                    ? eligibilityDetail[item.columnName]
                                        ?.length > 10
                                      ? eligibilityDetail[
                                          item.columnName
                                        ]?.slice(0, 10) + "..."
                                      : eligibilityDetail[item.columnName]
                                    : "-"}
                                </AddToolTip>
                              );
                            }
                            if (item.dataMapper) {
                              return (
                                <AddToolTip
                                  name={
                                    item.dataMapper[
                                      eligibilityDetail[columnName]
                                    ]
                                  }
                                />
                              );
                            }

                            if (
                              [
                                "eligibilityRequirementMetDate",
                                "entryDate",
                              ].includes(columnName)
                            ) {
                              return (
                                <div
                                  className={`employee-eligibility-requirement-date-override`} //${item.className}
                                >
                                  <AddToolTip
                                    name={
                                      edited
                                        ? usDateFormat(
                                            get(values, fieldName, data)
                                          )
                                        : usDateFormat(
                                            get(eligibilityDetail, columnName)
                                          )
                                    }
                                  >
                                    <Field
                                      size=""
                                      name={`${columnName}${[index]}`}
                                      value={
                                        edited
                                          ? usDateFormat(
                                              get(values, fieldName, data)
                                            )
                                          : usDateFormat(
                                              get(eligibilityDetail, columnName)
                                            )
                                      }
                                      isDatePicker
                                      onClear={() =>
                                        onDaySelected(fieldName, "")
                                      }
                                      validate={
                                        isDateEnabled
                                          ? (value) => {
                                              let cur_date = new Date();
                                              let selected_date = get(
                                                values,
                                                fieldName,
                                                data
                                              );
                                              let selectedDateOnly = new Date(
                                                selected_date
                                              ).setHours(0, 0, 0, 0);
                                              let requirementMetDateOnly =
                                                new Date(
                                                  requirementMetDate
                                                ).setHours(0, 0, 0, 0);
                                              return [
                                                undefined,
                                                null,
                                                "",
                                              ].includes(selected_date)
                                                ? "Required"
                                                : selected_date > cur_date
                                                ? get(
                                                    eligibilityDetail,
                                                    "sourceName"
                                                  ) +
                                                  `-` +
                                                  `${item.label}` +
                                                  ` cannot be future date`
                                                : columnName === "entryDate" &&
                                                  requirementMetDate &&
                                                  selectedDateOnly <
                                                    requirementMetDateOnly
                                                ? "Entry Date cannot be lesser than the Eligibility Requirement Met Date"
                                                : undefined;
                                            }
                                          : undefined
                                      }
                                      popupContent={
                                        <DatePicker
                                          onDayClick={(value) => {
                                            onDaySelected(fieldName, value);
                                            if (
                                              values[
                                                `eligibilityOverride[${index}].anchorEligibility`
                                              ] == undefined
                                            ) {
                                              setFieldValue(
                                                `eligibilityOverride[${index}].eligibilityStatus`,
                                                true
                                              );
                                              setFieldValue(
                                                `eligibilityOverride[${index}].anchorEligibility`,
                                                true
                                              );
                                              setFieldValue(
                                                `eligibilityOverride[${index}].sourceId`,
                                                eligibilityDetail.sourceId
                                              );
                                              setFieldValue(
                                                `eligibilityOverride[${index}].planId`,
                                                intPlanId
                                              );
                                              setFieldValue(
                                                `eligibilityOverride[${index}].employeeId`,
                                                intEmployeeId
                                              );
                                            }
                                          }}
                                          value={
                                            isDateEnabled
                                              ? usDateFormat(
                                                  get(values, fieldName, data)
                                                )
                                              : usDateFormat(
                                                  get(
                                                    eligibilityDetail,
                                                    columnName
                                                  )
                                                )
                                          }
                                        />
                                      }
                                      component={FieldDropSide}
                                      disabled={isEdit || !isDateEnabled}
                                    />
                                  </AddToolTip>
                                </div>
                              );
                            }

                            if (["anchorEligibility"].includes(columnName)) {
                              return (
                                <Form.Check
                                  className={item.className}
                                  name={fieldName}
                                  type="switch"
                                  id={`custom-switch-${index}`}
                                  label=" "
                                  defaultChecked={eligibilityDetail[columnName]}
                                  checked={anchorEligibilityValue}
                                  value={anchorEligibilityValue}
                                  onChange={() => {
                                    const toggle = !anchorEligibilityValue;

                                    const originalRecord =
                                      originalEligibilityData.find(
                                        (x) =>
                                          x.sourceId ===
                                          eligibilityDetail.sourceId
                                      );

                                    if (toggle) {
                                      setFieldValue(
                                        `eligibilityOverride[${index}].eligibilityStatus`,
                                        true
                                      );

                                      if (originalRecord?.anchorEligibility) {
                                        setFieldValue(
                                          `eligibilityOverride[${index}].eligibilityRequirementMetDate`,
                                          originalRecord.eligibilityRequirementMetDate
                                        );

                                        setFieldValue(
                                          `eligibilityOverride[${index}].entryDate`,
                                          originalRecord.entryDate
                                        );
                                      }
                                    } else {
                                      const restoreEligible =
                                        originalRecord?.eligibilityStatus ===
                                          "Eligible" &&
                                        originalRecord?.anchorEligibility ===
                                          false;

                                      setFieldValue(
                                        `eligibilityOverride[${index}].eligibilityStatus`,
                                        restoreEligible
                                      );

                                      if (restoreEligible) {
                                        setFieldValue(
                                          `eligibilityOverride[${index}].eligibilityRequirementMetDate`,
                                          originalRecord?.eligibilityRequirementMetDate ??
                                            null
                                        );

                                        setFieldValue(
                                          `eligibilityOverride[${index}].entryDate`,
                                          originalRecord?.entryDate ?? null
                                        );
                                        setFieldValue(
                                          `eligibilityOverride[${index}].eligibilityBasis`,
                                          originalRecord?.eligibilityBasis ??
                                            null
                                        );
                                      } else {
                                        setFieldValue(
                                          `eligibilityOverride[${index}].eligibilityRequirementMetDate`,
                                          null
                                        );

                                        setFieldValue(
                                          `eligibilityOverride[${index}].entryDate`,
                                          null
                                        );
                                        setFieldValue(
                                          `eligibilityOverride[${index}].eligibilityBasis`,
                                          0
                                        );
                                      }
                                    }

                                    setFieldValue(
                                      `eligibilityOverride[${index}].anchorEligibility`,
                                      toggle
                                    );

                                    setFieldValue(
                                      `eligibilityOverride[${index}].sourceId`,
                                      eligibilityDetail.sourceId
                                    );

                                    setFieldValue(
                                      `eligibilityOverride[${index}].planId`,
                                      intPlanId
                                    );

                                    setFieldValue(
                                      `eligibilityOverride[${index}].employeeId`,
                                      intEmployeeId
                                    );
                                  }}
                                  disabled={isEdit && !isSave}
                                />
                              );
                            }
                            if (item.type === "boolean") {
                              return eligibilityDetail[columnName]
                                ? "Yes"
                                : "No";
                            }

                            if (item.columnName === "eligibilityBasis") {
                              return (
                                <div className="employee-eligibility-basis-override">
                                  <Field
                                    size="xss"
                                    name={`eligibilityOverride[${index}].eligibilityBasis`}
                                    placeholder="Select"
                                    type="text"
                                    autoComplete="off"
                                    disabled={
                                      isEdit || !isDateEnabled || isIneligible
                                    }
                                    options={Object.entries(
                                      ELIGIBILITY_BASIS
                                    ).map(([key, label]) => ({
                                      label,
                                      value: key,
                                    }))}
                                    popupContent={
                                      <SearchableList
                                        label="Select eligibility basis"
                                        size="s"
                                        width="100%"
                                        options={Object.entries(
                                          ELIGIBILITY_BASIS
                                        ).map(([key, label]) => ({
                                          label,
                                          value: key,
                                        }))}
                                        onSelect={(value) => {
                                          setFieldValue(
                                            `eligibilityOverride[${index}].eligibilityBasis`,
                                            Number(value)
                                          );
                                          setFieldValue(
                                            `eligibilityOverride[${index}].sourceId`,
                                            eligibilityDetail.sourceId
                                          );
                                          setFieldValue(
                                            `eligibilityOverride[${index}].planId`,
                                            intPlanId
                                          );
                                          setFieldValue(
                                            `eligibilityOverride[${index}].employeeId`,
                                            intEmployeeId
                                          );
                                        }}
                                        selectedValue={get(
                                          values,
                                          `eligibilityOverride[${index}].eligibilityBasis`,
                                          eligibilityDetail.eligibilityBasis
                                        )}
                                      />
                                    }
                                    component={FieldDropSide}
                                    value={
                                      isIneligible
                                        ? " "
                                        : ELIGIBILITY_BASIS[
                                            get(
                                              values,
                                              `eligibilityOverride[${index}].eligibilityBasis`,
                                              eligibilityDetail.eligibilityBasis
                                            )
                                          ]
                                    }
                                  />
                                </div>
                              );
                            }

                            if (cellIndex === columns.length - 2) {
                              return (
                                <Link
                                  onClick={() => {
                                    if (!getIsOptedOut)
                                      onViewButtonClick({
                                        sourceName: get(
                                          eligibilityDetail,
                                          "sourceName"
                                        ),
                                        sourceId: get(
                                          eligibilityDetail,
                                          "sourceId"
                                        ),
                                      });
                                  }}
                                  className={
                                    getIsOptedOut
                                      ? `cursor-not-allowed ${item.className}`
                                      : `pointer ${item.className}`
                                  }
                                  disabled={getIsOptedOut}
                                >
                                  View
                                </Link>
                              );
                            }
                            if (cellIndex === columns.length - 1) {
                              return (
                                <Link
                                  onClick={() => {
                                    if (!getIsOptedOut)
                                      onViewComputationPeriodClick({
                                        sourceId: get(
                                          eligibilityDetail,
                                          "sourceId"
                                        ),
                                      });
                                  }}
                                  className={
                                    getIsOptedOut
                                      ? `cursor-not-allowed ${item.className}`
                                      : `pointer ${item.className}`
                                  }
                                  disabled={getIsOptedOut}
                                >
                                  View
                                </Link>
                              );
                            }

                            // if (
                            //   isEligible.status &&
                            //   index == isEligible.index &&
                            //   eligibilityDetail[columnName] == "InEligible"
                            // ) {
                            //   setToggle(true);
                            //   return (eligibilityDetail[columnName] =
                            //     "Eligible");
                            // } else if (
                            //   toggle &&
                            //   !isEligible.status &&
                            //   index == isEligible.index &&
                            //   eligibilityDetail[columnName] == "Eligible"
                            // ) {
                            //   return (eligibilityDetail[columnName] =
                            //     "InEligible");
                            // }

                            // return (
                            //   <AddToolTip
                            //     name={eligibilityDetail[columnName]}
                            //     className="mt-1"
                            //   />
                            // );
                            const overrideEligibility = get(
                              values,
                              `eligibilityOverride[${index}].eligibilityStatus`
                            );
                            const displayEligibility =
                              overrideEligibility !== undefined
                                ? overrideEligibility
                                  ? "Eligible"
                                  : "InEligible"
                                : eligibilityDetail[columnName];

                            return (
                              <AddToolTip
                                name={displayEligibility}
                                className="mt-1"
                              />
                            );
                          };
                          return (
                            <Table.Td
                              key={cellIndex}
                              className={item.className}
                            >
                              {getContent()}
                            </Table.Td>
                          );
                        });
                      }}
                      onSortClick={(sortData, column) => {
                        const eligibilityValues = get(
                          values,
                          "eligibilityOverride",
                          []
                        );
                        const sortEligibilityOverride = orderBy(
                          eligibilityOverride.map((value, ind) => {
                            if (eligibilityValues != undefined) {
                              return {
                                ...value,
                                ...eligibilityValues[ind],
                                eligibilityStatus: value.eligibilityStatus,
                              };
                            } else {
                              return value;
                            }
                          }),
                          column,
                          sortData
                        );

                        setEligibilityOverride(sortEligibilityOverride);
                        const eligibilityOverrideLookup = new Map();
                        get(values, "eligibilityOverride", []).forEach(
                          (item) => {
                            if (item) {
                              eligibilityOverrideLookup.set(
                                item.sourceId,
                                item
                              );
                            }
                          }
                        );

                        const sortEligibilityOverrideValues =
                          sortEligibilityOverride.map(
                            (item) =>
                              eligibilityOverrideLookup.get(item.sourceId) ||
                              undefined
                          );
                        setValues({
                          ...values,
                          eligibilityOverride: sortEligibilityOverrideValues,
                        });
                      }}
                    />
                  )}
                </FieldArray>
              </LoaderWrapper>
              <FormLeaveGuard
                showModal={showLeaveModal}
                handleConfirmClick={() => {
                  resetForm();
                  setShowLeaveModal(false);
                  onClickSave();
                }}
                handleCancelClick={() => setShowLeaveModal(false)}
              />
            </Form>
          );
        }}
      </Formik>
      <SliderPanel isOpen={isSliderOpen} width="55%" showCancel={false}>
        <div className="w-100">
          <div className="d-flex justify-content-space-between">
            {/* style={{display:"flex",marginLeft:"5px",justifyContent:"space-between",maxWidth:"810px"}} */}
            <div className={`${styles["m-t-18px"]} fw-500 lh-21px mw-450 `}>
              <h6>Computation Period</h6>
            </div>
            <div
              className="d-flex flex-row"
              onClick={() => setSliderOpen(false)}
            >
              <Button className="fs-16px ml-2 pointer btn-secondary ">
                Close
              </Button>
            </div>
          </div>
          <hr className=" w-100"></hr>
          {/* <div className="mt-20" style={{width:"790px"}}> */}
          <DataTable
            columns={columnsComputationPeriod}
            Data={computationPeriodTable}
            className="computation-period"
            getContent={(data, index) => {
              return (
                <>
                  <Table.Td className="column-computationPeriodStartDate">
                    {usDateFormat(data.startDate)}
                  </Table.Td>
                  <Table.Td className="column-computationPeriodEndDate">
                    {usDateFormat(data.endDate)}
                  </Table.Td>
                  <Table.Td className="column-computationPeriodHours">
                    {data.hours}
                  </Table.Td>
                  <Table.Td className="column-computationPeriodType">
                    {data.computationType == "AnniverseryOfHire"
                      ? "Anniversary Of Hire"
                      : data.computationType == "PlanYearAfterAnniverseryOfHire"
                      ? "Plan Year After Anniversary Of Hire"
                      : "Other Computational Period"}
                  </Table.Td>
                </>
              );
            }}
          />
        </div>
      </SliderPanel>
      <SliderPanel
        isOpen={isModalOpen}
        width="80%"
        onClose={() => setModalOpen(false)}
        showHeader={true}
        header="Eligibility history"
      >
        <EligibilityOverrideSlideTable data={sidePanelData} />
      </SliderPanel>
    </div>
  );
};

export default EligibilityOverride;
