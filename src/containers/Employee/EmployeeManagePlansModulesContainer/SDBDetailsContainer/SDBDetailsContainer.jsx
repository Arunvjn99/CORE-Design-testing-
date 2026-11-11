import AddToolTip from "@/components/AddToolTip";
import Table from "@/components/CsplTable";
import DataTable from "@/components/DataTable";
import FormLeaveGuard from "@/components/FormLeaveGuard";
import {
  FieldDropSide,
  FieldInput,
  FieldInputNumber,
} from "@/components/Forms";
import LoaderWrapper from "@/components/LoaderWrapper";
import SearchableList from "@/components/SearchableList";
import SliderPanel from "@/components/SliderPanel";
import {
  getSDBAccountDetails,
  insertSdbAccountDetails,
} from "@/services/trade";
import { OPTIONS_DATA_MAPPER } from "@/utils/constants/common";
import { parseUTCToLocal, toOptionValuesFromMapper } from "@/utils/helpers";
import { Field, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const columns = [
  {
    label: "SDB account number",
    className: "w-30",
    valueclassName: "w-30",
    columnName: "accountNumber",
  },
  {
    label: "SDB type",
    className: "w-20",
    valueclassName: "w-20",
    columnName: "isRothSDB",
  },
  {
    label: "Created on",
    className: "w-20",
    valueclassName: "w-20",
    columnName: "createdOn",
  },
  {
    label: "Updated through",
    className: "w-30",
    valueclassName: "w-30",
    columnName: "createdBy",
  },
];

const SDBDetailsContainer = ({
  employeeId,
  planId,
  getParticipantEnrollmentInfo,
  isLoading,
  setIsLoading,
  ...props
}) => {
  const [sdbData, setSdbData] = useState([]);
  const [isSlider, setIsSlider] = useState(false);

  const UPDATED_THROUGH = {
    0: "File Upload",
    1: "SDB account return file",
    2: "Create Payroll",
    3: "API",
    4: "Finch",
    5: "UI",
  };
  const [isDirty, setIsDirty] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    getSDBAccountDetails(employeeId, planId)
      .then((response) => {
        setSdbData(response?.sdbAccountDetails);
      })
      .catch((error) => {
        console.error("Error fetching SDB account details:", error);
      });
  }, [isSlider]);

  const formatDisplayValue = (val) =>
    val == null || val === "" || Number.isNaN(val) ? "-" : String(val);

  const getContent = (data) => {
    return columns.map((col, idx) => {
      if (col.columnName === "createdOn") {
        return (
          <Table.Td key={idx} className={col.valueclassName}>
            <div>
              <div className="core-body-text-regular-medium-secondary">
                {data?.[col.columnName]
                  ? moment(data?.[col.columnName]).format("MM/DD/YYYY")
                  : "-"}
              </div>
            </div>
          </Table.Td>
        );
      }

      if (col.columnName === "isRothSDB") {
        return (
          <Table.Td key={idx} className={col.valueclassName}>
            <div>
              <div className="core-body-text-regular-medium-secondary">
                {data?.[col.columnName] ? "Roth" : "Traditional"}
              </div>
            </div>
          </Table.Td>
        );
      }

      if (col.columnName === "createdBy") {
        return (
          <Table.Td key={idx} className={col.valueclassName}>
            <div className="min-w-0">
              {data?.["uploadedThrough"] != 1 && (
                <AddToolTip
                  className="core-body-text-regular-medium-secondary"
                  name={data?.[col.columnName]}
                  showOnEllipsisOnly
                >
                  {formatDisplayValue(data?.[col.columnName])}
                </AddToolTip>
              )}
              <AddToolTip
                className="core-body-text-regular-medium-s"
                name={UPDATED_THROUGH[data?.["uploadedThrough"]]}
                showOnEllipsisOnly
              >
                {formatDisplayValue(UPDATED_THROUGH[data?.["uploadedThrough"]])}
              </AddToolTip>
            </div>
          </Table.Td>
        );
      }

      return (
        <Table.Td key={idx} className={col.valueclassName}>
          <div className="min-w-0">
            <AddToolTip
              className="core-body-text-regular-medium-secondary"
              name={data?.[col.columnName]}
              showOnEllipsisOnly
            >
              {formatDisplayValue(data?.[col.columnName])}
            </AddToolTip>
          </div>
        </Table.Td>
      );
    });
  };
  const trackSeparately =
    getParticipantEnrollmentInfo?.participantTrackTraditionalAndRothSDBSeparately ==
    1;

  const hasTraditional = sdbData.some((account) => account.isRothSDB == false);
  const hasRoth = sdbData.some((account) => account.isRothSDB === true);

  const handleSliderClose = (resetForm) => {
    if (isDirty) {
      setShowLeaveModal(true);
    } else {
      resetForm();
      setIsSlider(false);
    }
  };

  const defaultSdbType = (() => {
    if (!trackSeparately) {
      return 0;
    }

    if (hasRoth && !hasTraditional) {
      return 0;
    }

    if (hasTraditional && !hasRoth) {
      return 1;
    }

    return null;
  })();

  const isSdbTypeDisabled = !trackSeparately || hasTraditional || hasRoth;

  const isAddDisabled = trackSeparately
    ? hasTraditional && hasRoth
    : hasTraditional;

  const onFormSubmit = (values) => {
    setIsLoading(true);
    const payload = {
      planId: planId,
      participantId: employeeId,
      accountNumber: values?.accountNumber,
      isRothSDB: values?.sdbType,
    };
    insertSdbAccountDetails(payload)
      .then((response) => {
        if (response?.isSuccessfull) {
          setIsLoading(false);
          setIsSlider(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error While Saving:", error);
      });
  };

  return (
    <div className="mt-3">
      <LoaderWrapper isLoading={isLoading}>
        <Formik
          initialValues={{
            accountNumber: "",
            sdbType: defaultSdbType,
          }}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onFormSubmit}
        >
          {(formProps) => {
            const {
              setFieldValue,
              values,
              handleChange,
              handleSubmit,
              setValues,
              setSubmitting,
              errors,
              resetForm,
              initialValues,
              setFieldError,
              setErrors,
              setFieldTouched,
              submitForm,
              ...rest
            } = formProps;

            return (
              <>
                <Form
                  autoComplete="off"
                  className="h-100p"
                  onSubmit={handleSubmit}
                >
                  <div className="w-100 text-align-right mb-3">
                    <Button
                      variant="primary"
                      type="button"
                      className={isAddDisabled ? "cursor-not-allowed" : ""}
                      onClick={() => setIsSlider(true)}
                      disabled={isAddDisabled}
                    >
                      Add
                    </Button>
                  </div>
                  <DataTable
                    columns={columns}
                    Data={sdbData}
                    getContent={getContent}
                    isLoading={isLoading}
                  />

                  <SliderPanel
                    isOpen={isSlider}
                    onClose={() => handleSliderClose(resetForm)}
                    showCancelButton={true}
                    showCancel={false}
                    header="Add SDB account"
                    width="40%"
                    separatorDisplay={true}
                    showSave={true}
                    onSave={() => {
                      submitForm();
                    }}
                  >
                    <Field
                      label="SDB account number"
                      isRequired
                      name={"accountNumber"}
                      value={values["accountNumber"]}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/[^a-zA-Z0-9]/g, "")
                          .slice(0, 25);

                        setFieldValue("accountNumber", value);
                        setIsDirty(
                          value !== initialValues.accountNumber ||
                            values.sdbType !== initialValues.sdbType
                        );
                      }}
                      component={FieldInput}
                      autoComplete="off"
                      maxLength={25}
                      validate={(value) => {
                        if (!value || value.trim() === "") {
                          return "Required";
                        }
                        return undefined;
                      }}
                    />
                    <Field
                      isRequired
                      label="SDB type"
                      name={"sdbType"}
                      value={values["sdbType"]}
                      direction="bottom"
                      options={toOptionValuesFromMapper(
                        OPTIONS_DATA_MAPPER.SDB_TYPE
                      )}
                      // size="xs"
                      popupContent={
                        <SearchableList
                          // size="xs"
                          // width="200px"
                          label="Select SDB type"
                          options={toOptionValuesFromMapper(
                            OPTIONS_DATA_MAPPER.SDB_TYPE
                          )}
                          onSelect={(value) => {
                            setFieldValue("sdbType", value);
                            setIsDirty(
                              values.accountNumber !==
                                initialValues.accountNumber ||
                                value !== initialValues.sdbType
                            );
                          }}
                          selectedValue={values["sdbType"]}
                          isNotTypeAhead
                        />
                      }
                      component={FieldDropSide}
                      disabled={isSdbTypeDisabled}
                      validate={(value) => {
                        if (
                          value == null ||
                          value == undefined ||
                          value === ""
                        ) {
                          return "Required";
                        }

                        return undefined;
                      }}
                    />
                  </SliderPanel>
                  <FormLeaveGuard
                    showModal={showLeaveModal}
                    handleConfirmClick={() => {
                      setShowLeaveModal(false);
                      setIsDirty(false);
                      resetForm();
                      setIsSlider(false);
                    }}
                    handleCancelClick={() => {
                      setShowLeaveModal(false);
                    }}
                  />
                </Form>
              </>
            );
          }}
        </Formik>
      </LoaderWrapper>
    </div>
  );
};

export default SDBDetailsContainer;
