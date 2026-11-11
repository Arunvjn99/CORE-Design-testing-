import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adiminMaxValidation, adiValidation } from "@/utils/validationHelpers";
import { FieldInputDollar, FieldInputPercentage } from "../Forms";
import { Field, useFormikContext } from "formik";
import { get } from "lodash-es";
import { faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { isEmpty } from "lodash-es";
import { CONTRIBUTION_TYPE } from "@/utils/constants/plan";

const ADIApplicableCard = ({
  sourceDeferral,
  values,
  isEdit,
  isSave,
  handleChange,
  transformedEmployeeDeferralSourceList,
  index,
  fieldNameAutoDeferralIncreasePercentage,
  fieldNameAutoDeferralIncreaseDollar,
  fieldNameMaximumADIDollar,
  fieldNameMaximumADIPercentage,
  isDefault = false,
  isAdditionalAdi = false,
  defaultSourceId,
  fields,
  defaultSource,
  isManual = false,
  hce = false,
  fieldNameAutoDeferralIncreasePercentageHce,
  fieldNameMaximumADIPercentageHce,
  fieldNameAutoDeferralIncreaseDollarHce,
  fieldNameMaximumADIDollarHce,
}) => {
  const sourceDetails = get(
    transformedEmployeeDeferralSourceList,
    `[${index}]`,
    []
  );
  const contributionType = get(sourceDetails, "contributionType", null);
  const { errors } = useFormikContext();
  let errs = [
    "PL540 : ADI stops at cannot be greater than Maximum Contribution limit set in the Source",
    "PL539 : ADI stops at cannot be lesser than or equal to Minimum Contribution limit set in the Source.",
  ];
  let errs2 = ["PL732 : Required", "PL730 : Required"];

  let checkErr =
    errors !== undefined && !isEmpty(errors?.autoDeferralncreaseApplicable?.adi)
      ? errs.includes(
          errors?.autoDeferralncreaseApplicable?.adi[index]?.maximumADIDollar
        )
      : false;
  let checkErr3 =
    checkErr &&
    errors !== undefined &&
    !isEmpty(errors?.autoDeferralncreaseApplicable?.adi)
      ? errors?.autoDeferralncreaseApplicable?.adi[index]
          ?.autoDeferralIncreaseDollar === undefined
      : false;
  let checkErr2 =
    contributionType === CONTRIBUTION_TYPE.Both &&
    (get(values, `useDefaultElection`, null) == null || !isManual)
      ? errors !== undefined &&
        !isEmpty(errors?.autoDeferralncreaseApplicable?.adi)
        ? errs2.includes(
            errors?.autoDeferralncreaseApplicable?.adi[index]
              ?.autoDeferralIncreaseDollar
          ) &&
          errors?.autoDeferralncreaseApplicable?.adi[index]
            ?.maximumADIDollar === undefined
          ? true
          : false
        : false
      : false;

  const defaultSourceDetail = isManual
    ? defaultSource?.filter((m) => m.sourceId === defaultSourceId)
    : [];
  const minMaxDescriptionDollar =
    "Minimum $" +
    sourceDetails.limitMinimumDollar +
    " / " +
    "Maximum $" +
    sourceDetails.limitMaximumDollar;

  const minMaxDescriptionDollarHCE =
    "Minimum $" +
    (sourceDetails.hceMinimumAmount != null
      ? sourceDetails.hceMinimumAmount
      : sourceDetails.limitMinimumDollar) +
    " / " +
    "Maximum $" +
    (sourceDetails.hceMaximumAmount != null
      ? sourceDetails.hceMaximumAmount
      : sourceDetails.limitMaximumDollar);

  const minMaxDescriptionPer =
    "Minimum " +
    sourceDetails.limitMinimumPercentage +
    "% / " +
    "Maximum " +
    sourceDetails.limitMaximumPercentage +
    "%";
  const minMaxDescriptionPerHCE =
    "Minimum " +
    (sourceDetails.hceMinimumPercentage != null
      ? sourceDetails.hceMinimumPercentage
      : sourceDetails.limitMinimumPercentage) +
    "% / " +
    "Maximum " +
    (sourceDetails.hceMaximumPercentage != null
      ? sourceDetails.hceMaximumPercentage
      : sourceDetails.limitMaximumPercentage) +
    "%";

  const isBothDollar =
    (defaultSourceDetail[0]?.contributionFieldType == 2 &&
      get(values, `useDefaultElection`, null) != null) ||
    get(values, `useDefaultElection`, null) == null;

  const isBothPer =
    (defaultSourceDetail[0]?.contributionFieldType == 1 &&
      get(values, `useDefaultElection`, null) != null) ||
    get(values, `useDefaultElection`, null) == null;

  return (
    <div>
      <div className="">
        <div>
          {((contributionType === CONTRIBUTION_TYPE.Both &&
            (!isManual || (isManual && isBothDollar))) ||
            contributionType === CONTRIBUTION_TYPE.Dollar) && (
            <div className="adiApplicableCard">
              <div className="ADI_source1 core-body-text-regular-bold">
                {!hce ? sourceDeferral.sourceName : " "}
              </div>
              <div className="ADI_stop_field core-body-text-regular-bold">
                <Field
                  validate={
                    isAdditionalAdi
                      ? (value) => {
                          return adiValidation(
                            get(values, fieldNameMaximumADIDollar),
                            value,
                            "PL1132",
                            "PL619"
                          );
                        }
                      : null
                  }
                  size="xs"
                  isRequired
                  name={fieldNameAutoDeferralIncreaseDollar}
                  type="number"
                  autoComplete="off"
                  value={get(values, fieldNameAutoDeferralIncreaseDollar)}
                  onChange={handleChange(fieldNameAutoDeferralIncreaseDollar)}
                  preventNegative={true}
                  isAllowNegative={false}
                  component={FieldInputDollar}
                  disabled={(isEdit && !isSave) || isDefault}
                  max={999999999999999}
                />
              </div>
              <div className="ADI_stop_at core-body-text-regular-bold">
                <>
                  <Field
                    validate={
                      isAdditionalAdi
                        ? (value) => {
                            return adiminMaxValidation(
                              sourceDetails.limitMinimumDollar,
                              sourceDetails.limitMaximumDollar,
                              value,
                              "PL1133",
                              "PL1156",
                              "PL618"
                            );
                          }
                        : null
                    }
                    size="xs"
                    isRequired
                    name={fieldNameMaximumADIDollar}
                    type="number"
                    autoComplete="off"
                    value={get(values, fieldNameMaximumADIDollar)}
                    onChange={handleChange(fieldNameMaximumADIDollar)}
                    preventNegative={true}
                    isAllowNegative={false}
                    component={FieldInputDollar}
                    disabled={(isEdit && !isSave) || isDefault}
                    max={999999999999999}
                  />
                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="defaultElectionInfo core-body-text-small-medium-sl mt-0-1"
                    />
                    <div className="core-body-text-small-medium-sl">
                      {minMaxDescriptionDollar}
                    </div>
                  </div>
                </>
              </div>
            </div>
          )}
          {((contributionType === CONTRIBUTION_TYPE.Both &&
            (!isManual || (isManual && isBothPer))) ||
            contributionType === CONTRIBUTION_TYPE.Percentage) && (
            <div className="adiApplicableCard">
              <div className="ADI_source1 core-body-text-regular-bold">
                {!hce &&
                !(
                  (contributionType === CONTRIBUTION_TYPE.Both &&
                    (!isManual || (isManual && isBothDollar))) ||
                  contributionType === CONTRIBUTION_TYPE.Dollar
                )
                  ? sourceDeferral.sourceName
                  : " "}
              </div>
              <div className="ADI_stop_field core-body-text-regular-bold">
                <div>
                  <Field
                    validate={
                      isAdditionalAdi
                        ? (value) => {
                            return adiValidation(
                              get(values, fieldNameMaximumADIPercentage),
                              value,
                              "PL1132",
                              "PL619"
                            );
                          }
                        : null
                    }
                    size="xs"
                    isRequired
                    name={fieldNameAutoDeferralIncreasePercentage}
                    type="number"
                    autoComplete="off"
                    value={get(values, fieldNameAutoDeferralIncreasePercentage)}
                    onChange={handleChange(
                      fieldNameAutoDeferralIncreasePercentage
                    )}
                    preventNegative={true}
                    isAllowNegative={false}
                    component={FieldInputPercentage}
                    disabled={(isEdit && !isSave) || isDefault}
                    max={100}
                  />
                </div>
              </div>
              <div className="ADI_stop_at core-body-text-regular-bold">
                <div>
                  <>
                    <Field
                      validate={
                        isAdditionalAdi
                          ? (value) => {
                              return adiminMaxValidation(
                                sourceDetails.limitMinimumPercentage,
                                sourceDetails.limitMaximumPercentage,
                                value,
                                "PL1131",
                                "PL1155",
                                "PL618"
                              );
                            }
                          : null
                      }
                      size="xs"
                      isRequired
                      name={fieldNameMaximumADIPercentage}
                      type="number"
                      autoComplete="off"
                      value={get(values, fieldNameMaximumADIPercentage)}
                      onChange={handleChange(fieldNameMaximumADIPercentage)}
                      preventNegative={true}
                      isAllowNegative={false}
                      component={FieldInputPercentage}
                      disabled={(isEdit && !isSave) || isDefault}
                      max={100}
                    />
                    <div className="d-flex">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="defaultElectionInfo core-body-text-small-medium-sl mt-0-1"
                      />
                      <div className="core-body-text-small-medium-sl">
                        {minMaxDescriptionPer}
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          )}
        </div>
        {hce && (
          <div className="adiApplicableCard">
            <div className="ADI_source1 core-body-text-regular-bold">
              {sourceDeferral.sourceName}
            </div>
            <div className="ADI_stop_field core-body-text-regular-bold">
              HCE ADI
            </div>
            <div className="ADI_stop_at core-body-text-regular-bold">
              HCE ADI Stops At
            </div>
          </div>
        )}
        {hce && (
          <div>
            <div className="adiApplicableCardc2">
              <div className="ADI_source1 core-body-text-regular-bold"></div>
              <div className="ADI_stop_field core-body-text-regular-bold">
                {((contributionType === CONTRIBUTION_TYPE.Both &&
                  (!isManual || (isManual && isBothDollar))) ||
                  contributionType === CONTRIBUTION_TYPE.Dollar) && (
                  <Field
                    validate={
                      isAdditionalAdi
                        ? (value) => {
                            return adiValidation(
                              get(values, fieldNameMaximumADIDollarHce),
                              value,
                              "PL1132",
                              "PL619"
                            );
                          }
                        : null
                    }
                    size="xs"
                    isRequired
                    name={fieldNameAutoDeferralIncreaseDollarHce}
                    type="number"
                    autoComplete="off"
                    value={get(values, fieldNameAutoDeferralIncreaseDollarHce)}
                    onChange={handleChange(
                      fieldNameAutoDeferralIncreaseDollarHce
                    )}
                    preventNegative={true}
                    isAllowNegative={false}
                    component={FieldInputDollar}
                    disabled={(isEdit && !isSave) || isDefault}
                    max={999999999999999}
                  />
                )}
              </div>

              <div className="ADI_stop_at core-body-text-regular-bold">
                {((contributionType === CONTRIBUTION_TYPE.Both &&
                  (!isManual || (isManual && isBothDollar))) ||
                  contributionType === CONTRIBUTION_TYPE.Dollar) && (
                  <>
                    <Field
                      validate={
                        isAdditionalAdi
                          ? (value) => {
                              return adiminMaxValidation(
                                sourceDetails.limitMinimumDollar,
                                sourceDetails.limitMaximumDollar,
                                value,
                                "PL1133",
                                "PL1156",
                                "PL618"
                              );
                            }
                          : null
                      }
                      size="xs"
                      isRequired
                      name={fieldNameMaximumADIDollarHce}
                      type="number"
                      autoComplete="off"
                      value={get(values, fieldNameMaximumADIDollarHce)}
                      onChange={handleChange(fieldNameMaximumADIDollarHce)}
                      preventNegative={true}
                      isAllowNegative={false}
                      component={FieldInputDollar}
                      disabled={(isEdit && !isSave) || isDefault}
                      max={999999999999999}
                    />
                    <div className="d-flex">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="defaultElectionInfo core-body-text-small-medium-sl mt-0-1"
                      />
                      <div className="core-body-text-small-medium-sl">
                        {minMaxDescriptionDollarHCE}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="adiApplicableCardc2">
              <div className="ADI_source1 core-body-text-regular-bold"></div>
              <div className="ADI_stop_field core-body-text-regular-bold">
                {((contributionType === CONTRIBUTION_TYPE.Both &&
                  (!isManual || (isManual && isBothPer))) ||
                  contributionType === CONTRIBUTION_TYPE.Percentage) && (
                  <div>
                    <Field
                      validate={
                        isAdditionalAdi
                          ? (value) => {
                              return adiValidation(
                                get(values, fieldNameMaximumADIPercentageHce),
                                value,
                                "PL1132",
                                "PL619"
                              );
                            }
                          : null
                      }
                      size="xs"
                      isRequired
                      name={fieldNameAutoDeferralIncreasePercentageHce}
                      type="number"
                      autoComplete="off"
                      value={get(
                        values,
                        fieldNameAutoDeferralIncreasePercentageHce
                      )}
                      onChange={handleChange(
                        fieldNameAutoDeferralIncreasePercentageHce
                      )}
                      preventNegative={true}
                      isAllowNegative={false}
                      component={FieldInputPercentage}
                      disabled={(isEdit && !isSave) || isDefault}
                      max={100}
                    />
                  </div>
                )}
              </div>

              <div className="ADI_stop_at core-body-text-regular-bold">
                <div>
                  {((contributionType === CONTRIBUTION_TYPE.Both &&
                    (!isManual || (isManual && isBothPer))) ||
                    contributionType === CONTRIBUTION_TYPE.Percentage) && (
                    <>
                      <Field
                        validate={
                          isAdditionalAdi
                            ? (value) => {
                                return adiminMaxValidation(
                                  sourceDetails.limitMinimumPercentage,
                                  sourceDetails.limitMaximumPercentage,
                                  value,
                                  "PL616",
                                  "PL1155",
                                  "PL618"
                                );
                              }
                            : null
                        }
                        size="xs"
                        isRequired
                        name={fieldNameMaximumADIPercentageHce}
                        type="number"
                        autoComplete="off"
                        value={get(values, fieldNameMaximumADIPercentageHce)}
                        onChange={handleChange(
                          fieldNameMaximumADIPercentageHce
                        )}
                        preventNegative={true}
                        isAllowNegative={false}
                        component={FieldInputPercentage}
                        disabled={(isEdit && !isSave) || isDefault}
                        max={100}
                      />
                      <div className="d-flex">
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="defaultElectionInfo core-body-text-small-medium-sl mt-0-1"
                        />
                        <div className="core-body-text-small-medium-sl">
                          {minMaxDescriptionPerHCE}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ADIApplicableCard;
