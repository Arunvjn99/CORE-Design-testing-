import React from "react";
import { faMinusSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usCurrency } from "@/utils/helpers";
import { ModeOfCompensationCalculation } from "@/utils/constants/common";
import { FieldInputDollar } from "../Forms";
import { Field, useFormikContext } from "formik";
import { get } from "lodash-es";
import AddToolTip from "../AddToolTip";

const CompensationTree = (props) => {
  const {
    header,
    compensations,
    isPlanCompensation,
    isAddMode,
    fields,
    errorMessage,
  } = props;
  const { values, setValues, setFieldValue } = useFormikContext();

  const fieldModeOfCalculation = isPlanCompensation
    ? "planModeOfCompensationCalculation"
    : "grossModeOfCompensationCalculation";

  const filterOutNaN = (value) => (isNaN(value) ? 0 : value);
  const handleCompensationChange = (e, name, index) => {
    const current = e.target.value; //["-", ""].includes(e.target.value)
    // ? e.target.value
    // : parseFloat(e.target.value);
    const fieldValue = `${fields.grossCompensationCategory}[${index}].payPeriodAmount`;
    setFieldValue(fieldValue, current);
    setFieldValue(
      `${fields.planCompensationCategory}[${index}].payPeriodAmount`,
      current
    );
  };

  const payperiodTotal = () => {
    return compensations.reduce(
      (acc, category) =>
        category[fieldModeOfCalculation] == 1
          ? acc +
            (isNaN(category.payPeriodAmount)
              ? 0
              : parseFloat(category.payPeriodAmount))
          : category[fieldModeOfCalculation] == 2
          ? acc -
            (isNaN(category.payPeriodAmount)
              ? 0
              : parseFloat(category.payPeriodAmount))
          : acc,
      0
    );
  };
  return (
    <div className={`payroll-compensation-details`}>
      <div className={`card-cmp tree  ${errorMessage ? "dh-error-cnt" : ""}`}>
        <div className="box-cmp">
          <div className="card-head">
            <div className="d-flex align-items-center w-60p">
              <FontAwesomeIcon className="mr-2 icon" icon={faMinusSquare} />
              {header}
            </div>
            <div className="mr-5px">
              {usCurrency(filterOutNaN(payperiodTotal()))}
            </div>
          </div>

          <div className="content-cmp">
            <ul className="tree">
              {compensations?.map((x, index) => {
                const fieldNameInput = `${fields.grossCompensationCategory}[${index}].payPeriodAmount`;
                return (
                  <li className={`justify-content-between`}>
                    <div className="content-cmp-row">
                      <div className="category-name w-40 mb-2">
                        <span>
                          {x?.compensationCategoryName?.length > 20 ? (
                            <AddToolTip name={x?.compensationCategoryName}>
                              {x?.compensationCategoryName?.slice(0, 20)}...
                            </AddToolTip>
                          ) : (
                            x?.compensationCategoryName
                          )}
                        </span>
                        {isAddMode == 0 ? (
                          <>
                            {x[fieldModeOfCalculation] == 3 ? (
                              <span className="pill excluded">Excluded</span>
                            ) : (
                              <span className="pill">Included</span>
                            )}
                          </>
                        ) : (
                          <>
                            {x.isIncluded == 0 ? (
                              <span className="pill excluded">Excluded</span>
                            ) : (
                              <span className="pill">Included</span>
                            )}
                          </>
                        )}
                      </div>

                      <div className="fw-600 w-30 fs-14px currencyAndMethod">
                        {
                          ModeOfCompensationCalculation[
                            x[fieldModeOfCalculation]
                          ]
                        }
                      </div>
                      <div className="dh-payperiod-amount">
                        {isAddMode == 0 ? (
                          <div className="mr-5px fw-700  fs-14px currencyAndMethod">
                            {usCurrency(x?.payPeriodAmount)}
                          </div>
                        ) : (
                          <>
                            <Field
                              size="xs"
                              name={fieldNameInput}
                              autoComplete="off"
                              disabled={isPlanCompensation}
                              max={999999999.99}
                              min={-999999999.99}
                              onChange={(e) => {
                                handleCompensationChange(
                                  e,
                                  fieldNameInput,
                                  index
                                );
                              }}
                              value={
                                get(values, fieldNameInput) === null
                                  ? ""
                                  : get(values, fieldNameInput)
                              }
                              ignoreError={true}
                              isGreyInputBox={true}
                              component={FieldInputDollar}
                              preventNegative={false}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {errorMessage && <div className="dh-error-box">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default CompensationTree;
