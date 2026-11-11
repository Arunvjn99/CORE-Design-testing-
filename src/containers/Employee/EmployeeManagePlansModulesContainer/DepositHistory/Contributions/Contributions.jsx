import styles from "./Contributions.module.scss";
import { Field, Formik } from "formik";
import { isEmpty, get } from "lodash-es";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDeepEffect, useRouterParams } from "@/abstracts/hooks";
import DatePicker from "@/components/DatePicker";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import Table from "@/components/CsplTable";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import Link from "@/components/Link";
import SliderPanel from "@/components/SliderPanel";
import AddToolTip from "@/components/AddToolTip";
import DataTable from "@/components/DataTable";
import LoaderWrapper from "@/components/LoaderWrapper";

import {
  getPlansContributions,
  getSourceLevelContribution,
  getEmployeePlanSources,
  getEmployeeManagePlans,
  getEligibleEmployerContribution,
} from "@/services/census";

import { exportContributionInDepositHistory } from "@/services/payroll";
import { formFields } from "@/utils/constants/formFields";
import { manageCensusFormNames } from "@/utils/constants/employee";

import {
  usDateFormat,
  toMultiSelectValue,
  usCurrency,
  dateTimeFormat,
} from "@/utils/helpers";

import AddContributions from "./AddContributions";
import ContributionsSidePanel from "./ContributionsSidePanel";
import {
  setManageCensusPageLevelData,
  manageCensusStore,
  appLayoutStore,
} from "../../../../../contexts";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fileSaver from "file-saver";
import { faFileSpreadsheet as solidExcelIcon } from "@fortawesome/pro-solid-svg-icons";
import moment from "moment";

const columns = [
  {
    label: "Pay date",
    className: "column-payDate",
    columnName: "payDate",
  },
  {
    label: "Total contributions",
    className: "column-contributionAmount",
    columnName: "contributionAmount",
  },
  {
    label: "Comments",
    className: "column-comments",
    columnName: "comments",
  },
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
    className: "column-uploadedThrough min-w-0",
    columnName: "createdOn",
  },
];
const updatedBy = [null, "Admin"];
var defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() - 120);
defaultStartDate = usDateFormat(defaultStartDate);
const defaultEndDate = usDateFormat(new Date());

const Contributions = (props) => {
  const { menu, subMenu, employeeName, planName, PlanId } = props;
  const [filteredResponse, setFilteredResponse] = useState([]);
  const { state, dispatch } = useContext(manageCensusStore);
  const [showContributionsForm, setShowContributionsForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sidePanelData, setSidePanelData] = useState({});
  const { planId, censusId } = useRouterParams();
  const [toggle, setToggle] = useState(false);
  const [sources, setSources] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({});
  const { state: state2 } = useContext(appLayoutStore);
  const [isHovered, setIsHovered] = useState(false);
  const permissions = get(state2, "permissions", {});
  const [eligibleContribution, setEligibleContribution] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isAddContributionHidden, setIsAddContributionHidden] = useState(false);
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
  const characterLimit = 10;
  useDeepEffect(() => {
    getEmployeePlanSources({
      planId: parseInt(planId),
      companyId: get(state, "companyId", 0),
    })
      .then((response) => {
        setSources(response);
      })
      .catch((error) => {
        //Handle Error
      });
    getEmployeeManagePlans(censusId)
      .then((response) => {
        setCurrentPlan(response.find((_) => _.id === parseInt(planId)));
      })
      .catch((error) => {});
  }, [toggle]);

  useDeepEffect(() => {
    setIsLoading(true);
    getPlansContributions({
      employeeName: props.employeeName,
      planName: props.planName,
      RkPlan: props.PlanId,
      employeeId: parseInt(censusId),
      planId: parseInt(planId),
      sourceslist: sources.map((source) => source.id),
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    })
      .then((response) => {
        if (response.isSuccessfull) {
          setIsLoading(false);
          setFilteredResponse(response?.employeeContributionsDetails);
          setIsAddContributionHidden(response?.showAddContribution);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        //Handle Error
      });
  }, [sources, toggle]);

  const formName = manageCensusFormNames.CONTRIBUTIONS_FILTER;
  const fields = formFields[formName];

  const onFormSubmit = (values) => {
    dispatch(
      setManageCensusPageLevelData({
        formName: formName,
        fieldData: values,
      })
    );
  };

  const exportContributionSummary = (values) => {
    const { sourcesList, startDate, endDate } = values;
    exportContributionInDepositHistory({
      employeeId: parseInt(censusId),
      planId: parseInt(planId),
      sourceslist: sourcesList,
      SourceName: sources.filter((item) => sourcesList.includes(item.id)),
      startDate: startDate,
      RkPlan: currentPlan?.rkPlanNumber,
      employeeName: props.employeeName,
      planName: props.planName,
      endDate: endDate,
      timeZoneOffset: new Date().getTimezoneOffset(),
    })
      .then((response) => {
        var blob = new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        fileSaver.saveAs(
          blob,
          `Contribution_Deposit History_${
            currentPlan?.rkPlanNumber
          }_${dateTimeFormat(new Date())}.xlsx`
        );
      })
      .catch((error) => {});
  };

  const onFilter = (values) => {
    setIsLoading(true);
    getPlansContributions({
      sourcesList: values.sourcesList,
      employeeId: parseInt(censusId),
      planId: parseInt(planId),
      startDate: values.startDate,
      endDate: values.endDate,
    })
      .then((res) => {
        if (res.isSuccessfull) {
          setIsLoading(false);
          setFilteredResponse(res?.employeeContributionsDetails);
          setIsAddContributionHidden(res?.showAddContribution);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        //Handle Errors
      });
  };

  const translateOption = (data) => {
    return data?.map((x, ind) => ({
      label: x.sourceName,
      value: x.sourceId,
    }));
  };

  const toggleContributionsForm = () => {
    setShowContributionsForm(!showContributionsForm);
    setIsEdit(false);
  };

  useDeepEffect(() => {
    getEligibleEmployerContribution(planId)
      .then((res) => setEligibleContribution(res.deferralAndContributionData))
      .catch(() => {
        //err
      });
  }, [isModalOpen]);

  const onViewButtonClick = (data) => {
    getSourceLevelContribution({
      planId: parseInt(planId),
      employeeId: parseInt(censusId),
      payDate: data.payDate,
      comments: data.comments,
      uploadedThrough: data.uploadedThrough,
      updatedBy: 1,
      ids: data.ids,
    })
      .then((response) => {
        data = {
          ...data,
          contributions: response.map((x) => {
            return {
              ...x,
              employerSource: translateOption(
                eligibleContribution.find(
                  (y) => y.employeeDeferralSourceId == x.sourceId
                )?.sourceData ?? []
              ).map((z) => {
                if (
                  x.employerSourceDetails.some(
                    (_) => _.employerSourceId == z.value
                  )
                ) {
                  return { ...z, checked: true };
                }
                return { ...z, checked: false };
              }),
            };
          }),
        };
        setSidePanelData(data);
        setModalOpen(true);
      })
      .catch((error) => {
        //Handle Error
      });
  };

  var totPayPeriodContribution = 0;
  if (!isEmpty(filteredResponse)) {
    filteredResponse.map((contribution, initValue) => {
      totPayPeriodContribution =
        totPayPeriodContribution + contribution.contributionAmount;
    });
  }

  return (
    <>
      <div className="w-100">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="mt-mb-1p25r">Show record(s) of particular period</div>
          <div className="core-body-text-large-medium mt-mb-1p25r d-flex">
            <div className={styles["pay-period-contribution"]}>
              Total pay period contribution
            </div>
            {usCurrency(totPayPeriodContribution)}
          </div>
        </div>

        <LoaderWrapper isLoading={isLoading}>
          <Formik
            initialValues={{
              startDate: defaultStartDate,
              endDate: defaultEndDate,
              sourcesList: sources.map((source) => source.id),
            }}
            onSubmit={onFormSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
          >
            {({
              handleChange,
              setFieldValue,
              handleSubmit,
              values,
              ...rest
            }) => {
              const onDaySelected = (fieldName, value) => {
                setFieldValue(fieldName, value);
              };
              const selectedSources = values[fields.sourcesList];
              return (
                <Form
                  autoComplete="off"
                  className="h-100p"
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex compensation-container">
                      <div className="mr-3">
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
                      <div className="mr-3">
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
                      <div className="mr-3">
                        <Field
                          size="sm"
                          label="Sources"
                          name={fields.sourcesList}
                          value={toMultiSelectValue(selectedSources, sources)}
                          isMultiSelect
                          popupContent={
                            <MultiSelectDropdown
                              noLabelTransform
                              label="Select Sources"
                              height="190px"
                              hideSelectedOptions={true}
                              name={fields.sourcesList}
                              onSelect={(value) =>
                                setFieldValue(fields.sourcesList, value)
                              }
                              value={values[fields.sourcesList]}
                              options={
                                sources &&
                                sources.map((source, index) => ({
                                  label: source.name,
                                  value: source.id,
                                }))
                              }
                            />
                          }
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
                      {isAddContributionHidden && (
                        <div className="mt-28 ml-1r">
                          {isAllowed("", true) ? (
                            <Button
                              type="button"
                              className={`add-btn button-css button-padding ${styles["button-padding"]}`}
                              onClick={toggleContributionsForm}
                              variant="secondary"
                              disabled={currentPlan.status != "Eligible"}
                            >
                              Add contributions
                            </Button>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>{filteredResponse?.length} - Record(s) found</div>
                    <div
                      onClick={() => {
                        filteredResponse?.length > 0 &&
                          exportContributionSummary(values);
                      }}
                      className={`${
                        filteredResponse?.length > 0
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      } mr-4`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <FontAwesomeIcon
                        className="export-icon"
                        icon={solidExcelIcon}
                      />
                      <Link
                        className={`export-text ${
                          filteredResponse?.length > 0
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
            // isLoading={isLoading}
            className="contributions-table"
            columns={columns}
            Data={filteredResponse}
            headerClassName="justify-content-flex-start"
            getContent={(contributions, ind) => {
              return columns.map((item, cellIndex) => {
                const getContent = () => {
                  if (item.columnName === "contributionAmount") {
                    return (
                      <div
                        onClick={() => {
                          onViewButtonClick({
                            payDate: contributions.payDate,
                            totalContribution: usCurrency(
                              contributions.contributionAmount
                            ),
                            comments: contributions.comments,
                            updatedBy: contributions.updatedBy,
                            uploadedThrough: contributions.uploadedThrough,
                            ids: contributions.ids,
                            adjustmentDate: contributions.adjustmentDate,
                          });
                          setIsEdit(true);
                          setIsView(true);
                        }}
                        className="text-color-primary-cursor-pointer"
                      >
                        {usCurrency(contributions[item.columnName])}
                        <div className="b-1px-solid-brand-primary"></div>
                      </div>
                    );
                  }

                  if (item.columnName === "payDate") {
                    return usDateFormat(contributions[item.columnName]);
                  }
                  if (item.columnName === "uploadedThrough") {
                    const uploadedThrough = get(
                      contributions,
                      "uploadedThroughString"
                    );
                    return uploadedThrough != "0" ? uploadedThrough : "-";
                  }
                  if (
                    item.columnName === "updatedBy" ||
                    item.columnName === "comments"
                  ) {
                    return (
                      <AddToolTip name={contributions[item.columnName]}>
                        {!isEmpty(contributions[item.columnName])
                          ? contributions[item.columnName]?.length >
                            characterLimit
                            ? contributions[item.columnName]?.slice(
                                0,
                                characterLimit
                              ) + "..."
                            : contributions[item.columnName]
                          : "-"}
                      </AddToolTip>
                    );
                  }
                  if (item.columnName === "createdOn") {
                    const formattedDate = moment
                      .utc(contributions[item.columnName])
                      .local()
                      .format("MM/DD/YYYY, HH:mm:ss");

                    return formattedDate.length > 10 ? (
                      <AddToolTip name={formattedDate}>
                        {formattedDate.slice(0, 10) + "..."}
                      </AddToolTip>
                    ) : (
                      formattedDate
                    );
                  }
                  if (item.dataMapper) {
                    return item.dataMapper[contributions[item.columnName]];
                  }
                  return contributions[item.columnName];
                };
                return (
                  <Table.Td key={cellIndex} className={item.className}>
                    {getContent()}
                  </Table.Td>
                );
              });
            }}
          />
        </LoaderWrapper>
      </div>
      <SliderPanel
        isOpen={showContributionsForm}
        width="50%"
        showCancel={false}
        onClose={() => setModalOpen(false)}
        screen={"Deposit-History-Contributions"}
      >
        <AddContributions
          toggleContributionsForm={toggleContributionsForm}
          sources={sources}
          setToggle={setToggle}
          toggle={toggle}
          {...props}
        />
      </SliderPanel>
      <SliderPanel
        screen={"Deposit-History-Contributions"}
        isOpen={isModalOpen}
        width="50%"
        showCancel={false}
      >
        <ContributionsSidePanel
          data={sidePanelData}
          isView={isView}
          setIsView={setIsView}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      </SliderPanel>
    </>
  );
};

export default Contributions;
