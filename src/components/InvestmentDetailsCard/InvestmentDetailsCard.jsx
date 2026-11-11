import styles from "./InvestmentDetailsCard.module.scss";
import {
  faArrowRight,
  faExclamationTriangle,
} from "@fortawesome/pro-light-svg-icons";
import {
  faFilePdf,
  faInfoCircle,
  faTimes,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { appLayoutStore } from "../../contexts";
import IconDownloadButtons from "../IconDownloadButtons/IconDownloadButtons";
import AddToolTip from "../AddToolTip";

const InvestmentDetailsCard = ({
  data,
  onIconClick,
  isSdb = false,
  addedData = [],
  initialValuesData,
  sourceDetails,
  ...rest
}) => {
  const { state } = useContext(appLayoutStore);
  {
    const sdbRestriction = (data, values) => {
      if (values?.optInForSdb === false) {
        return true;
      }
      const accounts = data?.accountNumber ?? data?.sdbAccountDetails ?? [];
      if (accounts?.length === 0) return true;

      const isSeparateTracking =
        values?.participantTrackTraditionalAndRothSDBSeparately;
      if (!isSeparateTracking) return false;

      const hasTraditional = accounts.some((x) => x?.isRothSdb === false);

      const hasRoth = accounts.some((x) => x?.isRothSdb === true);

      return !(hasTraditional && hasRoth);
    };

    const isType10Added = addedData.some((inv) => inv.type === 10);
    const shouldRestrict =
      data?.restricted ||
      (isSdb
        ? data?.type === 10 && sdbRestriction(data, initialValuesData)
        : isType10Added && data?.type === 10);
    return (
      <div className="core-mtb-8 model-portfolio-card">
        <div className="d-flex justify-content-space-between model-portfolio-card-top">
          <div className="core-body-text-small-medium-sl">{data?.heading}</div>
          {state.appUsage === "IRA" && (
            <div
              className={`${styles["text-v27"]} d-flex core-body-text-small-medium-bd`}
            >
              <div className="core-body-text-small-medium-bd text-decoration-underline pr-1">
                Added
              </div>
            </div>
          )}
          {data?.isAddButton &&
            !data?.isRemoveButton &&
            !rest?.removeItem &&
            !data?.noIconButtons && (
              <div
                className="d-flex core-body-text-small-medium-bd cursor-pointer"
                //onClick={() => onIconClick()}
                onClick={() => {
                  if (!shouldRestrict) {
                    onIconClick();
                  }
                }}
                style={
                  rest?.addIconDisabled || shouldRestrict
                    ? {
                        color: "var(--neutral-text-subtle-least)",
                        pointerEvents: "none",
                        opacity: 0.6,
                      }
                    : {}
                }
              >
                <div
                  className={` ${
                    shouldRestrict
                      ? "color-slider"
                      : "core-body-text-small-medium-bd  text-decoration-underline"
                  }  pr-1`}
                  //className="core-body-text-small-medium-bd text-decoration-underline pr-1"
                >
                  Add
                </div>
                <div className={` ${shouldRestrict ? "color-slider" : ""}`}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            )}
          {(data?.isRemoveButton || rest?.removeItem) &&
            !data?.noIconButtons && (
              <div
                className="d-flex core-body-text-small-medium-cd cursor-pointer"
                onClick={() => onIconClick()}
              >
                <div className="text-decoration-underline-ct pr-1">Remove</div>
                <div>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            )}
        </div>
        <div className="model-portfolio-card-bottom">
          <div className="core-body-text-large-bold">{data?.subHeading}</div>
          <div className="d-flex justify-content-space-between flex-wrap">
            {data?.columns?.map((column, ind) => {
              return (
                <div>
                  <div className={`d-flex ${column?.className}`} key={ind}>
                    {ind !== 0 && (
                      <div className="align-self-center vertical-separator-investment"></div>
                    )}
                    <div className="d-flex">
                      {column?.subTitle && (
                        <div className="core-body-text-small-bold-sl">
                          {column.subTitle} :
                        </div>
                      )}
                      &nbsp;
                      <div className="core-body-text-small-semi-bold-s">
                        {column?.data ?? "-"}
                      </div>
                    </div>
                    <br />
                  </div>
                  <div>
                    {column?.subTitle === "CUSIP" &&
                      initialValuesData?.optInForSdb === true &&
                      data?.sdbAccountDetails?.length > 0 &&
                      !shouldRestrict && (
                        <div className="w-100 d-flex flex-wrap core-body-text-small-bold-sl">
                          <span className="me-1">Account Number(s) :</span>
                          {(() => {
                            const accounts = data?.sdbAccountDetails || [];
                            const isSameElection =
                              initialValuesData?.doesAllSourcesFollowSameElection;
                            const isSdbTracking =
                              initialValuesData?.participantTrackTraditionalAndRothSDBSeparately;
                            const { sourceCategory, sourceSubCategory } =
                              sourceDetails || {};
                            const traditionalCategory = [5, 6, 9, 10, 11, 12];
                            const traditionalSubCategory = [4, 7];

                            const rothCategory = [7, 8];
                            const rothSubCategory = [5, 6, 8, 9];

                            const isTraditional =
                              traditionalCategory.includes(sourceCategory) ||
                              traditionalSubCategory.includes(
                                sourceSubCategory
                              );

                            const isRoth =
                              rothCategory.includes(sourceCategory) ||
                              rothSubCategory.includes(sourceSubCategory);

                            const filteredAccounts = isSameElection
                              ? accounts
                              : !isSdbTracking
                              ? accounts
                              : accounts.filter(
                                  ({ isRothSdb }) =>
                                    (isTraditional && isRothSdb === false) ||
                                    (isRoth && isRothSdb === true)
                                );

                            return filteredAccounts.map(
                              ({ accountNumber }, index) => (
                                <React.Fragment key={index}>
                                  <AddToolTip name={accountNumber}>
                                    <span className="me-1">
                                      {accountNumber?.length > 15
                                        ? `${accountNumber.slice(0, 15)}...`
                                        : accountNumber}
                                    </span>
                                  </AddToolTip>

                                  {index < filteredAccounts.length - 1 && (
                                    <span className="me-1">,</span>
                                  )}
                                </React.Fragment>
                              )
                            );
                          })()}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
          {data?.prospectusUrl && (
            <div className="horizontal-separator-investment">
              <div className="d-flex align-items-center pdf-section">
                <IconDownloadButtons
                  icon={faFilePdf}
                  iconColor="var(--semantics-critical-text)"
                  data="Investment fact sheet"
                  url={data.prospectusUrl}
                />
              </div>
            </div>
          )}
        </div>
        {(data?.sdbAccountDetails?.length <= 0 || shouldRestrict) &&
          data?.type === 10 &&
          isSdb === true &&
          (initialValuesData?.optInForSdb === false ? (
            <div className="addSDBSlider-validation d-flex flex-row mt-1 align-items-center">
              <FontAwesomeIcon
                icon={faInfoCircle}
                size="xs"
                className="ml-1 core-body-text-regular-semi-bold"
              />
              <div className="ml-1 core-body-text-regular-semi-bold">
                Not opted in for SDB
              </div>
            </div>
          ) : (
            <div className="addInvestmentSlider-validation d-flex flex-row mt-1 align-items-center">
              <FontAwesomeIcon
                icon={faInfoCircle}
                size="xs"
                className="ml-1 core-body-text-regular-semi-bold-red"
              />
              <span className="ml-1 core-body-text-regular-semi-bold-red d-flex align-items-center">
                Account not activated
              </span>
            </div>
          ))}
        {data?.restricted ? (
          <div className="addInvestmentSlider-validation d-flex flex-row mt-1 align-items-center">
            <AddToolTip
              name={"Buy transaction is restricted for the investment"}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                size="xs"
                className="ml-1 core-body-text-regular-semi-bold-red"
              />
            </AddToolTip>
            <div className="ml-1 core-body-text-regular-semi-bold-red">
              {" "}
              Restricted
            </div>
          </div>
        ) : (
          data.redemptionFee && (
            <div className="addRedemptionFee-validation d-flex flex-row mt-1 align-items-center">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                size="xs"
                className="ml-1 light-brown-text"
              />
              <div className="ml-1 light-brown-text">
                Redemption fee applicable
              </div>
            </div>
          )
        )}
      </div>
    );
  }
};

export default InvestmentDetailsCard;
