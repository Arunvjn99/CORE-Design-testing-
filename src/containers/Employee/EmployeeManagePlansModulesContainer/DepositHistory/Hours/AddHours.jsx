import React, { useContext, useEffect, useState } from "react";
import { isEmpty, get } from "lodash-es";
import { Button, Form } from "react-bootstrap";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import DatePicker from "@/components/DatePicker";
import FieldTextarea from "@/components/Forms/FieldTextarea";
import FormLeaveGuard from "@/components/FormLeaveGuard";
import FieldInputDecimal from "@/components/Forms/FieldInputDecimal";
import ModalNotification from "@/components/ModalNotification";
import { formFields } from "@/utils/constants/formFields";
import { manageCensusFormNames } from "@/utils/constants/employee";
import { getFlowBasedFormValues, usDateFormat } from "@/utils/helpers";
import {
  manageCensusStore,
  setManagePageLevelData,
} from "../../../../../contexts";

import { Formik, Field } from "formik";
import { useRouterParams } from "@/abstracts/hooks";
import { addHoursDetail } from "@/services/census";
const initialValues = {
  acceptWarning: false,
};

const AddHours = (props) => {
  const {
    toggleHoursForm,
    isInnerFormDirty,
    setIsInnerFormDirty,
    setToggle,
    toggle,
  } = props;
  const { flow, planId, censusId } = useRouterParams();
  const { state, dispatch } = useContext(manageCensusStore);
  const [showDirtyCheckModal, setShowDirtyCheckModal] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [warning, setWarning] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const formName = manageCensusFormNames.HOURS;
  const fields = formFields[formName];
  useEffect(() => {
    return () => setIsInnerFormDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = (values, { setFieldError }) => {
    setIsLoading(true);
    addHoursDetail({
      ...values,
      // planId: parseInt(planId),
      employeeId: parseInt(censusId),
      hours: parseFloat(values[fields.hours]),
    })
      .then((response) => {
        if (response.isSuccessfull) {
          dispatch(
            setManagePageLevelData({
              formName: formName,
              fieldData: values,
            })
          );
          toggleHoursForm();
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
            setFieldError(error.controlName, error.message);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        //Handle Errors
        setIsLoading(false);
      });
  };

  const onFormToggle = () => {
    if (isInnerFormDirty) {
      setShowDirtyCheckModal(true);
    } else {
      toggleHoursForm();
    }
    //setisModalOpen(true)
  };
  const handleConfirmClick = () => {
    toggleHoursForm();
  };

  const handleCancelClick = () => {
    setShowDirtyCheckModal(false);
  };

  const handleClose = () => {
    setisModalOpen(false);
  };

  return (
    // <LoaderWrapper isLoading={isLoading}>
    <div className="hours-container">
      <div className="mt-10  mb-10 core-page-titles">Add hours</div>
      <hr />
      <Formik
        initialValues={{
          ...initialValues,
          ...getFlowBasedFormValues(get(state, formName, {}), flow),
        }}
        onSubmit={onFormSubmit}
        enableReinitialize
      >
        {({
          handleChange,
          setFieldValue,
          handleSubmit,
          values,
          dirty,
          ...rest
        }) => {
          const onDeleteConfirmClick = () => {
            values.acceptWarning = true;
            setisModalOpen(false);
          };
          const onDaySelected = (fieldName, value) => {
            setFieldValue(fieldName, value);
          };
          if (isInnerFormDirty !== dirty) {
            setIsInnerFormDirty(dirty);
          }
          return (
            <Form
              autoComplete="off"
              className="h-100p"
              onSubmit={handleSubmit}
              validated={!isEmpty(rest.errors)}
            >
              <div className="d-flex emp-date-flair gap-1">
                <Field
                  size="md"
                  label="Pay date"
                  isRequired
                  name={fields.payDate}
                  value={usDateFormat(values[fields.payDate])}
                  isDatePicker
                  onClear={() => onDaySelected(fields.payDate, "")}
                  offset={400}
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
                &nbsp;&nbsp;&nbsp;
                <Field
                  size="xs"
                  name={fields.hours}
                  label={"Hours"}
                  isRequired
                  type="number"
                  autoComplete="off"
                  value={values[fields.hours]}
                  onChange={handleChange}
                  component={FieldInputDecimal}
                  isAllowNegative
                  //min={-9999}
                  max={9999}
                />
              </div>

              <Field
                name={fields.comments}
                label="Comments"
                autoComplete="off"
                value={values[fields.comments]}
                onChange={handleChange}
                component={FieldTextarea}
              />
              <Button
                variant="secondary"
                className="mr-4"
                type="button"
                onClick={onFormToggle}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
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
    </div>
    // </LoaderWrapper>
  );
};

export default AddHours;
