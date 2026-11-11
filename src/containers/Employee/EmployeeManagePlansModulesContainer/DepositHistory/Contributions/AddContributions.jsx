import React, { useContext, useEffect, useState } from "react";
import { get, isEmpty } from "lodash-es";
import { Button, Form } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import DatePicker from "@/components/DatePicker";
import FieldTextarea from "@/components/Forms/FieldTextarea";
import Table from "@/components/CsplTable";
import FormLeaveGuard from "@/components/FormLeaveGuard";
import FieldInputDollar from "@/components/Forms/FieldInputDollar";
import LoaderWrapper from "@/components/LoaderWrapper";
import DataTable from "@/components/DataTable";
import ModalNotification from "@/components/ModalNotification";
import AddToolTip from "@/components/AddToolTip";
import { useRouterParams, useDeepEffect } from "@/abstracts/hooks";
import { formFields } from "@/utils/constants/formFields";
import { manageCensusFormNames } from "@/utils/constants/employee";
import {
  usDateFormat,
  getFlowBasedFormValues,
  toMultiSelectValueById,
} from "@/utils/helpers";
import {
  manageCensusStore,
  setManagePageLevelData,
} from "../../../../../contexts";
import {
  addEmployeeContribution,
  getEligibleEmployerContribution,
  getEmployeePlanSources,
} from "@/services/census";

import RestrictionsMultiSelect from "../../../../../components/RestrictionsMultiSelect/RestrictionsMultiSelect";
const columns = [
  {
    label: "Source",
    className: "column-contribution-source",
    columnName: "name",
  },
  {
    label: "Contribution",
    className: "column-contribution-perc",
    columnName: "contribution",
  },
  {
    label: "Eligible contributions",
    className: "column-eligible-contributions",
    columnName: "eligibleContributions",
  },
];

const initialValues = {
  comments: "",
  acceptWarning: false,
};

const AddContributions = (props) => {
  const {
    toggleContributionsForm,
    isInnerFormDirty,
    setIsInnerFormDirty,
    setToggle,
    toggle,
  } = props;
  const { flow, planId, censusId } = useRouterParams();
  const { state, dispatch } = useContext(manageCensusStore);
  const [showDirtyCheckModal, setShowDirtyCheckModal] = useState(false);
  const formName = manageCensusFormNames.ADD_CONTRIBUTIONS;
  const fields = formFields[formName];
  const [fieldValues, setFieldValues] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [commonError, setCommonError] = useState([]);
  const [warning, setWarning] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [sources, setSources] = useState([]);
  const [eligibleContribution, setEligibleContribution] = useState([]);
  const [sourceDetails, setSourceDetails] = useState([]);
  useEffect(() => {
    return () => setIsInnerFormDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getEmployeePlanSources({
      planId: planId,
      companyId: get(state, "companyId", 0),
    })
      .then((res) => setSources(res))
      .catch(() => {
        //err
      });
    getEligibleEmployerContribution(planId)
      .then((res) => setEligibleContribution(res.deferralAndContributionData))
      .catch(() => {
        //err
      });
  }, []);

  useDeepEffect(() => {
    if (!isEmpty(sources) || !isEmpty(eligibleContribution)) {
      setSourceDetails(
        sources.map((x) => {
          return (x = {
            ...x,
            employerSources:
              translateOption(
                eligibleContribution?.find(
                  (y) => y.employeeDeferralSourceId == x.id
                )?.sourceData
              )?.map((_) => {
                return { ..._, checked: false };
              }) ?? [],
          });
        })
      );
    }
  }, [sources, eligibleContribution]);

  const prepareData = (values) => {
    return {
      payDate: values.payDate,
      comments: values.comments,
      acceptWarning: values.acceptWarning,
      sourceDetails: sourceDetails.map((source, index) => {
        return {
          // id : source.contributionId -onUpdate
          sourceId: parseInt(source.id), //onUpdate send deferralsourceId
          name: source.name,
          contributionAmount: isEmpty(
            values.sourceContribution && values.sourceContribution[index]
          )
            ? null
            : values.sourceContribution[index].contributionAmount === null ||
              values.sourceContribution[index].contributionAmount === ""
            ? null
            : parseFloat(values.sourceContribution[index].contributionAmount),
          employerSourceDetails: source.employerSources
            .filter((x) => x.checked == true)
            .map((z) => {
              return {
                // id : 1 //responseId (matchdefferalSourceId - onUpdate)
                employerSourceId: z.value,
                isDeleted: false,
              };
            }),
        };
      }),
      planId: parseInt(planId),
      employeeId: parseInt(censusId),
    };
  };

  const onSetValue = (values) => {
    setFieldValues(values);
    onFormSubmit(fieldValues);
  };

  const onFormSubmit = (values, { setFieldError }) => {
    setIsLoading(true);
    setCommonError([]);
    addEmployeeContribution(prepareData(values))
      .then((response) => {
        if (response.isSuccessfull) {
          dispatch(
            setManagePageLevelData({
              formName: formName,
              fieldData: values,
            })
          );
          toggleContributionsForm();
          setToggle(!toggle);
        } else {
          for (const error of response.errorMessages) {
            var errlen = response.errorMessages.filter(
              (x) => x.errorType === "IsError"
            ).length;
            if (errlen === 0 && response.errorMessages.length - errlen !== 0) {
              setWarning((e) => [...e, error.message + ".           "]);
              setisModalOpen(true);
            }
            if (error.controlName === "commonSources") {
              setCommonError((e) => [...e, error.message + ".           "]);
            }
            setFieldError(error.controlName, error.message);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        //Handle Error
        setIsLoading(false);
      });
  };

  const onFormToggle = () => {
    if (isInnerFormDirty) {
      setShowDirtyCheckModal(true);
    } else {
      toggleContributionsForm();
    }
  };
  const handleConfirmClick = () => {
    toggleContributionsForm();
  };

  const handleCancelClick = () => {
    setShowDirtyCheckModal(false);
  };
  const handleClose = () => {
    setisModalOpen(false);
    setWarning([]);
  };

  const translateOption = (data) => {
    return data?.map((x, ind) => ({
      label: x.sourceName,
      value: x.sourceId,
    }));
  };

  const setEmployerSources = (data, index) => {
    setSourceDetails(
      sourceDetails.map((_, ind) => {
        if (ind == index) {
          return { ..._, employerSources: data };
        }
        return _;
      })
    );
  };

  return (
    <>
      <LoaderWrapper isLoading={isLoading} className="overflow-visible">
        <Formik
          initialValues={{
            ...initialValues,
            ...getFlowBasedFormValues(get(state, formName, {}), flow),
          }}
          onSubmit={onFormSubmit}
          //enableReinitialize
        >
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            values,
            dirty,
            errors,
            ...rest
          }) => {
            const onDaySelected = (fieldName, value) => {
              setFieldValue(fieldName, value);
            };
            const onDeleteConfirmClick = () => {
              values.acceptWarning = true;
              setisModalOpen(false);
              setWarning([]);
            };
            if (isInnerFormDirty !== dirty) {
              setIsInnerFormDirty(dirty);
            }
            const OnSelectAll = (
              val,
              selectFieldName,
              fieldName,
              setData,
              data,
              index
            ) => {
              setFieldValue(selectFieldName, val);
              setData(
                data.map((_) => {
                  return { ..._, checked: val };
                }),
                index
              );
              if (val === true) {
                setFieldValue(
                  fieldName,
                  data.map((_) => _.value)
                );
              } else {
                setFieldValue(fieldName, []);
              }
            };
            const OnSelectOption = (data, fieldName, selectedAllField) => {
              setFieldValue(
                fieldName,
                data.filter((_) => _.checked === true)?.map((_) => _.value) ??
                  []
              );
              setFieldValue(
                selectedAllField,
                data.some((_) => _.checked == false) ? false : true
              );
            };
            return (
              <Form
                autoComplete="off"
                className="h-100p"
                onSubmit={handleSubmit}
                validated={!isEmpty(rest.errors)}
                noValidate
              >
                <div className="core-page-titles">Add contributions</div>
                <hr />
                <Field
                  size="sm"
                  label="Pay date"
                  name={fields.payDate}
                  isRequired
                  value={usDateFormat(values[fields.payDate])}
                  isDatePicker
                  onClear={() => onDaySelected(fields.payDate, null)}
                  popupContent={
                    <DatePicker
                      onDayClick={(value) =>
                        onDaySelected(fields.payDate, value)
                      }
                      value={usDateFormat(values[fields.payDate])}
                    />
                  }
                  component={FieldDropSide}
                />
                <Field
                  name={fields.comments}
                  label="Comments"
                  autoComplete="off"
                  value={values[fields.comments]}
                  onChange={handleChange}
                  component={FieldTextarea}
                />
                <br />
                <p className="fs-14px fw-400 critical-text-color">
                  {/* {commonError} */}
                  {commonError.map((data) => (
                    <div>{data}</div>
                  ))}
                </p>
                <div>
                  <FieldArray name="sourceContribution">
                    {() => (
                      <DataTable
                        columns={columns}
                        Data={sourceDetails}
                        getContent={(compensation, index) => {
                          return columns.map((item, cellIndex) => {
                            const getContent = () => {
                              if (item.columnName === "contribution") {
                                const fieldName = `sourceContribution[${index}].contributionAmount`;
                                return (
                                  <Field
                                    size="xs"
                                    name={fieldName}
                                    type="number"
                                    autoComplete="off"
                                    value={get(values, fieldName)}
                                    onChange={handleChange(fieldName)}
                                    isAllowNegative={true}
                                    preventNegative={false}
                                    component={FieldInputDollar}
                                  />
                                );
                              } else if (
                                item.columnName === "eligibleContributions"
                              ) {
                                const eligibleContributionFieldName = `sourceContribution[${index}].eligibleContributions`;
                                const employerSources =
                                  compensation?.employerSources;
                                if (!isEmpty(employerSources)) {
                                  return (
                                    <Field
                                      isRequired
                                      isMultiSelect
                                      direction="bottom"
                                      isOtherKeyPress={false}
                                      name={eligibleContributionFieldName}
                                      value={toMultiSelectValueById(
                                        get(
                                          values,
                                          `${eligibleContributionFieldName}`,
                                          null
                                        ),
                                        employerSources
                                      )}
                                      options={employerSources}
                                      popupContent={
                                        <RestrictionsMultiSelect
                                          optionsState={employerSources}
                                          setOptionsState={setEmployerSources}
                                          dataIndex={index}
                                          searchPlaceholder="Search"
                                          selectAll={(val) => {
                                            OnSelectAll(
                                              val,
                                              `eligibleContributionSelectAll[${index}]`,
                                              eligibleContributionFieldName,
                                              setEmployerSources,
                                              employerSources,
                                              index
                                            );
                                          }}
                                          isLoading={false}
                                          OnSelectOption={(data) => {
                                            OnSelectOption(
                                              data,
                                              eligibleContributionFieldName,
                                              `eligibleContributionSelectAll[${index}]`
                                            );
                                          }}
                                          selectAllField={`eligibleContributionSelectAll[${index}]`}
                                          values={values}
                                          className="create-generate-multiselect-dropdown"
                                        />
                                      }
                                      component={FieldDropSide}
                                    />
                                  );
                                } else {
                                  return "-";
                                }
                              } else if (item.columnName == "name") {
                                return (
                                  <>
                                    <AddToolTip
                                      name={compensation[item.columnName]}
                                    />
                                  </>
                                );
                              }
                              return compensation[item.columnName];
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
                        className="add-contributions-table employee-manage-plans-contributions"
                      />
                    )}
                  </FieldArray>
                </div>
                <br />
                <Button
                  variant="secondary"
                  className="mb-3"
                  onClick={onFormToggle}
                >
                  Cancel
                </Button>
                <Button type="submit" className="mb-3 ml-1r" variant="primary">
                  Save
                </Button>
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

export default AddContributions;
