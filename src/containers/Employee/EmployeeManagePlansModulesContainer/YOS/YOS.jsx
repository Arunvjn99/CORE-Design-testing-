import React, { useEffect, useState } from "react";
import { getEmployeeYOSDetails } from "@/services/vesting";
import FieldButtonGroup from "@/components/Forms/FieldButtonGroup";
import FieldInputNumber from "@/components/Forms/FieldInputNumber";
import LoaderWrapper from "@/components/LoaderWrapper";
import SliderPanel from "@/components/SliderPanel";
import { useRouterParams } from "@/abstracts/hooks";
import { formFields } from "@/utils/constants/formFields";
import { manageCensusFormNames } from "@/utils/constants/employee";
import { yesNoOptions } from "@/utils/constants/common";
import { Field, Formik } from "formik";
import { Form } from "react-bootstrap";
import { Link } from "react-router";
import YOSHistory from "./YOSHistory";

const YOS = () => {
  const { flow, censusId, planId } = useRouterParams();
  const [YOSDetails, setYOSDetails] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);
  const formName = manageCensusFormNames.CENSUS_YOS;
  const fields = formFields[formName];

  const payload = {
    planId: planId,
    employeeId: censusId,
  };

  useEffect(() => {
    setIsLoading(true);
    getEmployeeYOSDetails(payload)
      .then((response) => {
        if (response) {
          setIsLoading(false);
          setYOSDetails(response);
        }
      })
      .catch((error) => {});
  }, []);

  var yosData = YOSDetails[YOSDetails?.length - 1];

  var bisType = yosData?.bisType;
  const BISTypeMessage = () => {
    switch (bisType) {
      case 1:
        return "The Participant is on hold out period";
      case 2:
        return "The Participant has met Five year BIS criteria";
      case 3:
        return "The Participant has met Rule of Parity criteria";
    }
  };
  const initialValues = {
    YOS: yosData?.yearsOfService,
    creditedThisYear: yosData?.creditedThisYear,
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
            return (
              <Form autoComplete="off" className="h-100p">
                {bisType != null && (
                  <div className="censusVestingCard border-0">
                    <div className="BISTypeForYOS mb-3">
                      <i
                        aria-hidden="true"
                        className="fas fa-exclamation-triangle WarningTriangle"
                      ></i>
                      <p className="BISTypeContent">{BISTypeMessage()}</p>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-1">
                  <p className="label">Credited this computation period</p>
                  <Link
                    className="link-style"
                    onClick={() => setSliderOpen(true)}
                  >
                    View history
                  </Link>
                </div>
                <Field
                  size="sm"
                  name={fields.creditedThisYear}
                  options={yesNoOptions}
                  selectedValue={values[fields.creditedThisYear]}
                  type="text"
                  autoComplete="off"
                  value={values[fields.creditedThisYear]}
                  onChange={(value) => {
                    setValues({
                      ...values,
                      [fields.creditedThisYear]: value,
                    });
                  }}
                  isRequired
                  disabled={true}
                  component={FieldButtonGroup}
                />

                <p className="label">YOS</p>
                <Field
                  size="xs"
                  isRequired
                  name={fields.YOS}
                  value={values[fields.YOS]}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      [fields.YOS]: e.target.value,
                    });
                  }}
                  component={FieldInputNumber}
                  type="number"
                  autoComplete="off"
                  disabled={true}
                  min={0}
                  max={99}
                  className="yos-input-no-grow"
                  formGroupClassName="w-fit-content"
                />
              </Form>
            );
          }}
        </Formik>

        <SliderPanel
          isOpen={sliderOpen}
          showBackButton={false}
          header="YOS History "
          showHeader={true}
          backdropClicked={() => {
            setSliderOpen(false);
          }}
          width="65%"
          onClose={() => setSliderOpen(false)}
          showCancel={true}
        >
          <YOSHistory></YOSHistory>
        </SliderPanel>
      </LoaderWrapper>
    </div>
  );
};

export default YOS;
