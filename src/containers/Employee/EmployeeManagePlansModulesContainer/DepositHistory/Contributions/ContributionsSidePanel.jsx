import styles from "./ContributionsSidePanel.module.scss";
import { get, isEmpty, isEqual, orderBy } from "lodash-es";
import React, { useContext, useState } from "react";
import AddToolTip from "@/components/AddToolTip";
import DataTable from "@/components/DataTable";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import LoaderWrapper from "@/components/LoaderWrapper";
import ModalNotification from "@/components/ModalNotification";
import Table from "@/components/CsplTable";
import { formFields } from "@/utils/constants/formFields";
import { manageCensusFormNames } from "@/utils/constants/employee";
import {
  synchronizeCollectionNew,
  toMultiSelectValueById,
  usDateFormat,
} from "@/utils/helpers";
import { Field, Formik } from "formik";
import RestrictionsMultiSelect from "../../../../../components/RestrictionsMultiSelect/RestrictionsMultiSelect";
import { useRouterParams } from "@/abstracts/hooks";
import {
  manageCensusStore,
  setManagePageLevelData,
} from "../../../../../contexts";
import { Button, Form } from "react-bootstrap";
import { addEmployeeContribution } from "@/services/census";

import { appLayoutStore } from "../../../../../contexts";

const ContributionsSidePanel = ({
  data,
  isView,
  setIsView,
  isEdit,
  setIsEdit,
  isModelOpen,
  setModalOpen,
}) => {
  const { flow, planId, censusId } = useRouterParams();
  const { state, dispatch } = useContext(manageCensusStore);
  const formName = manageCensusFormNames.ADD_CONTRIBUTIONS;
  const fields = formFields[formName];
  const [isLoading, setIsLoading] = useState(false);
  const [contributionData, setContributionData] = useState(
    get(data, "contributions", [])
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [commonError, setCommonError] = useState([]);
  const [warning, setWarning] = useState([]);
  const [isWarningModal, setIsWarningModal] = useState(false);
  const { state: layoutState } = useContext(appLayoutStore);
  const permissions = layoutState?.permissions;
  const canEdit =
    permissions?.employeesManagePlanSubMenu?.depositHistory?.includes("U");
  const disableEdit = !canEdit;
  const columns = [
    {
      label: "Source",
      className: "column-contribution-source",
      columnName: "sourceName",
    },
    {
      label: `${
        get(data, "comments") == "Contribution reversal"
          ? "Amount reversed"
          : "Contribution"
      }`,
      className: "column-contribution-perc",
      columnName: "contribution",
    },
    get(data, "comments") == "Contribution reversal"
      ? {}
      : {
          label: "Eligible contributions",
          className: "column-eligible-contributions",
          columnName: "eligibleContributions",
        },
  ];
  const onFormToggle = () => {
    setModalOpen(false);
    setIsView(false);
  };

  const setEmployerSources = (data, index) => {
    setContributionData(
      contributionData.map((_, ind) => {
        if (ind == index) {
          return { ..._, employerSource: data };
        }
        return _;
      })
    );
  };

  const onFormSubmit = (values, { setFieldError }) => {
    setIsLoading(false);
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
          setModalOpen(false);
        } else {
          for (const error of response.errorMessages) {
            var errlen = response.errorMessages.filter(
              (x) => x.errorType === "IsError"
            ).length;
            if (
              (errlen === 0 && response.errorMessages.length - errlen !== 0) ||
              true
            ) {
              setWarning((e) => [error.message + ".           "]);
              setIsWarningModal(true);
            }
            if (error.controlName === "commonSources" || true) {
              setCommonError((e) => [...e, error.message + ".           "]);
            }
            setFieldError(error.controlName, error.message);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const prepareData = (values) => {
    return {
      payDate: usDateFormat(get(data, "payDate")),
      comments: null,
      acceptWarning: values.acceptWarning,
      sourceDetails: contributionData.map((source, index) => {
        var checkedEmployerSource = source.employerSource
          .filter((x) => x.checked == true || x.checked == false)
          .map((y) => {
            return {
              id:
                source.employerSourceDetails.find(
                  (_) => y.value == _.employerSourceId
                )?.id ?? 0,
              employerSourceId: y.value,
              isDeleted: !y.checked,
            };
          });

        return {
          id: source.id,
          sourceId: parseInt(source.sourceId),
          name: source.sourceName,
          contributionAmount: source.contribution,
          employerSourceDetails: synchronizeCollectionNew(
            source.employerSourceDetails ?? [],
            checkedEmployerSource.filter(
              (x) => x.id != 0 || x.isDeleted == false
            ),
            "id"
          ),
        };
      }),
      planId: parseInt(planId),
      employeeId: parseInt(censusId),
    };
  };

  const initialValues = {
    acceptWarning: false,
    eligibleContributionSelectAll: contributionData.map((x) =>
      x.employerSource.every((y) => y.checked == true)
    ),
    sourceContribution: contributionData.map((e) => {
      return {
        eligibleContributions: e.employerSourceDetails.map(
          (_) => _.employerSourceId
        ),
      };
    }),
  };

  const onCancelClick = () => {
    const checkIfEqual = isEqual(
      contributionData.map((x) => x.employerSource),
      get(data, "contributions", []).map((y) => y.employerSource)
    );
    if (checkIfEqual) {
      setModalOpen(false);
    } else {
      setModalVisible(true);
    }
  };

  const onYesClick = () => {
    setModalOpen(false);
    setModalVisible(false);
  };

  const handleClose = () => {
    setIsWarningModal(false);
    setWarning([]);
  };

  return (
    <LoaderWrapper isLoading={isLoading} className="h-auto">
      <Formik
        initialValues={{
          ...initialValues,
        }}
        onSubmit={onFormSubmit}
      >
        {({
          handleChange,
          setFieldValue,
          handleSubmit,
          values,
          dirty,
          ...rest
        }) => {
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
              data.filter((_) => _.checked == true)?.map((_) => _.value) ?? []
            );
            setFieldValue(
              selectedAllField,
              data.some((_) => _.checked == false) ? false : true
            );
          };
          const onWarningConfirmClick = () => {
            values.acceptWarning = true;
            setIsWarningModal(false);
            setWarning([]);
          };
          return (
            <Form autoComplete="off" className="h-100p" onSubmit={handleSubmit}>
              <div className="contributions-slider-table d-flex h-100p">
                {/* <div className="w-100"> */}
                <div className="header-details">
                  <div>
                    <div className="core-body-text-regular-medium-sl text-nowrap">
                      Pay Date
                    </div>
                    <div className="value">
                      {usDateFormat(get(data, "payDate"))}
                    </div>
                  </div>
                  <br />
                  <div>
                    <div className="core-body-text-regular-medium-sl text-nowrap">
                      Adjustment Date
                    </div>
                    <div className="value">
                      {get(data, "adjustmentDate")
                        ? usDateFormat(get(data, "adjustmentDate"))
                        : "-"}
                    </div>
                  </div>
                  <br />
                  <div>
                    <div className="core-body-text-regular-medium-sl text-nowrap">
                      {get(data, "comments") == "Contribution reversal"
                        ? "Contribution Reversed"
                        : "Total Contribution"}
                    </div>
                    <div className="value">
                      {get(data, "totalContribution")}
                    </div>
                  </div>
                  <br />
                  <div>
                    <div className="core-body-text-regular-medium-sl text-nowrap">
                      Comments
                    </div>
                    <div className="value">{get(data, "comments") || "-"}</div>
                  </div>
                </div>
                <br />
                <DataTable
                  columns={columns}
                  className="add-contributions-table w-100 h-100p"
                  Data={contributionData}
                  getContent={(contributions, index) => {
                    return columns.map((item, cellIndex) => {
                      const getContent = () => {
                        if (item.columnName === "contribution") {
                          return contributions[item.columnName] ||
                            contributions[item.columnName] === 0
                            ? "$" + contributions[item.columnName].toFixed(2)
                            : "$0.00";
                        } else if (item.columnName == "eligibleContributions") {
                          const eligibleContributionFieldName = `sourceContribution[${index}].eligibleContributions`;
                          const employerSources = contributions?.employerSource;
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
                                disabled={disableEdit || isView}
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
                        } else if (item.columnName == "sourceName") {
                          return (
                            <>
                              <AddToolTip
                                name={contributions[item.columnName]}
                              />
                            </>
                          );
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
                  onSortClick={(sortData, column) => {
                    setContributionData(
                      orderBy(contributionData, column, sortData)
                    );
                  }}
                />
                {(!isEdit && !isView) || (isEdit && !isView) ? (
                  <span className={`${styles["p-00200px"]} mt-3`}>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        onCancelClick();
                      }}
                    >
                      Cancel
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="submit" onClick={handleSubmit}>
                      Save
                    </Button>
                  </span>
                ) : (
                  <span className={`${styles["p-00200px"]} mt-3`}>
                    {get(data, "comments") != "Contribution reversal" ? (
                      <Button
                        disabled={disableEdit}
                        onClick={() => {
                          setIsView(false);
                        }}
                      >
                        Edit
                      </Button>
                    ) : null}
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </span>
                )}
                <ModalNotification
                  show={isWarningModal}
                  header={"Accept Warning ?"}
                  message={warning}
                  onHide={handleClose}
                  infoType={2}
                  primaryButtonAction={onWarningConfirmClick}
                  primaryButtonLabel={"Ok"}
                  secondaryButtonAction={() => setIsWarningModal(false)}
                  secondaryButtonLabel={"Cancel"}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      <ModalNotification
        show={modalVisible}
        header={"Are you sure?"}
        message={`Your changes may be lost. Do you want to continue?`}
        onHide={() => setModalVisible(false)}
        infoType={2}
        primaryButtonAction={onYesClick}
        primaryButtonLabel={"Yes"}
        secondaryButtonAction={() => setModalVisible(false)}
        secondaryButtonLabel={"No"}
      />
    </LoaderWrapper>
  );
};

export default ContributionsSidePanel;
