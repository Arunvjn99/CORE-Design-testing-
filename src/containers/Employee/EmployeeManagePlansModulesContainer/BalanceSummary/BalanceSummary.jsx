import styles from "./BalanceSummary.module.scss";
import React, { useContext } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  OverlayTrigger,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { OPTIONS_DATA_MAPPER } from "@/utils/constants/common";
import {
  toOptionValuesFromMapper,
  usCurrency,
  usDateFormat,
} from "@/utils/helpers";
import BalanceSummaryInvestmentTab from "./BalanceSummaryInvestmentTab";
import BalanceSummarySourceTab from "./BalanceSummarySourceTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import statementIcon from "../../../../assets/svg/statement-icon.svg";
import nodataimg from "../../../../assets/svg/no-data-img.svg";
import {
  faCheck,
  faInfoCircle,
  faQuestionCircle,
} from "@fortawesome/pro-light-svg-icons";
import { faQuestionCircle as AlterFaQuestionCircle } from "@fortawesome/pro-solid-svg-icons";
import { faInfoCircle as AlterFaInfoCircle } from "@fortawesome/pro-solid-svg-icons";

import {
  generateDisclosure,
  getEmployeeInvestmentsRor,
} from "@/services/census";

import { getParticipantAccountBalanceByPlan } from "@/services/payroll";
import { getInvestmentType } from "@/services/trade";
import { getTotalOutStandingLoanPrinciple } from "@/services/transaction";
import { useDeepEffect, useRouterParams } from "@/abstracts/hooks";
import { isEmpty } from "lodash-es";
import moment from "moment";
import DatePicker from "@/components/DatePicker";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import LoaderWrapper from "@/components/LoaderWrapper";
import ModalNotification from "@/components/ModalNotification";
import SearchableList from "@/components/SearchableList";
import { Field, Formik } from "formik";
import * as fileSaver from "file-saver";
import { downloadDocument } from "../../../../services/Documents";
import {
  appLayoutStore,
  MANAGE_CENSUS_SET_LOADER,
  manageCensusStore,
} from "../../../../contexts";
function BalanceSummary() {
  const [fileDetails, setFileDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [keyValue, setkeyValue] = useState("source");
  const { planId, censusId } = useRouterParams();
  const [invTypes, setinvTypes] = useState([]);
  const [accountBalanceByPlanResponse, setaccountBalanceByAccount] = useState(
    {}
  );
  const [downloadedCompleted, setDownloadedCompleted] = useState(false);
  const [pstModalVisible, setPstModalVisible] = useState(false);
  const [planBalanceReturn, setPlanBalanceReturn] = useState(0);
  const [isReturnsLoading, setIsReturnsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const [loader, setLoader] = useState(false);
  const { state } = useContext(appLayoutStore);
  const { dispatch } = useContext(manageCensusStore);
  console.log("efdefrgfe: ", state.appUsage);
  const [totalOutStandingLoanPrinciple, setTotalOutStandingLoanPrinciple] =
    useState(0);
  const menuChange = (key) => {
    setkeyValue(key);
  };
  const classNameList = [
    "balance_s_conts",
    "balance_s_conts",
    "balance_s_conts_wht",
    "balance_s_conts_wht",
  ];
  const namesList = [
    "Account balance",
    "Total Outstanding Loan",
    "Vested balance",
    "Invested Amount",
  ];
  const handleMouseEnter = () => setIconHovered(true);
  const handleMouseLeave = () => setIconHovered(false);
  function calculateVestedBalanceSum(data) {
    return data?.sources?.reduce((sum, source) => {
      return sum + source?.vestedBalance;
    }, 0);
  }

  const handleDownload1 = (values, { setFieldError, setErrors }) => {
    const payload = {
      planId: planId,
      employeeId: censusId,
      fromDate:
        values?.statementPeriod === 3
          ? values?.fromDate
            ? usDateFormat(values?.fromDate)
            : null
          : null,
      toDate:
        values?.statementPeriod === 3
          ? values?.toDate
            ? usDateFormat(values?.toDate)
            : null
          : null,
      dateRange: values?.statementPeriod,
    };

    setIsLoading(true);
    setDownloadedCompleted(false);
    setErrorType(null);

    generateDisclosure(payload)
      .then((response) => {
        if (response.isSuccessfull) {
          const fromDateFormatted =
            payload?.dateRange === 1
              ? usDateFormat(
                  new Date(new Date().setMonth(new Date().getMonth() - 3))
                )
              : payload?.dateRange === 2
              ? usDateFormat(
                  new Date(new Date().setMonth(new Date().getMonth() - 6))
                )
              : payload.fromDate;
          const toDateFormatted =
            payload?.dateRange === 1 || payload?.dateRange === 2
              ? usDateFormat(new Date())
              : payload.toDate;
          const downloadName = `Periodic Statement ${fromDateFormatted} - ${toDateFormatted}`;

          downloadDocument(response.fileName)
            .then((fileResponse) => {
              const blob = new Blob([fileResponse], {
                type: "application/octet-stream",
              });
              fileSaver.saveAs(blob, `${downloadName}.pdf`);
            })
            .catch((error) => console.error(error));

          setDownloadedCompleted(true);
        } else {
          setShowError(true);
        }
        setIsLoading(false); // Removed the redundant 'else' here
        const errorFields = response.errorMessages
          ? response.errorMessages.map((error) => error.controlName)
          : [];
        if (response.errorMessages) {
          response.errorMessages.forEach((error) => {
            setFieldError(
              error.controlName,
              `${error.errorCode} : ${error.message}`
            );
          });
        }
        if (!errorFields.includes("fromDate")) {
          setFieldError("fromDate", "");
        } else {
          setErrorType("Validations-Error");
        }
        if (!errorFields.includes("toDate")) {
          setFieldError("toDate", "");
        } else {
          setErrorType("Validations-Error");
        }
        if (!errorFields.includes("statementPeriod")) {
          setFieldError("statementPeriod", "");
        } else {
          setErrorType("Validations-Error");
        }
      })
      .catch((err) => {
        console.error(err);
        setShowError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const currencyList = [
    accountBalanceByPlanResponse?.totalAccountBalance,
    totalOutStandingLoanPrinciple,
    calculateVestedBalanceSum(accountBalanceByPlanResponse),
    accountBalanceByPlanResponse?.investedAmount,
  ];

  useDeepEffect(() => {
    dispatch({ type: MANAGE_CENSUS_SET_LOADER, payload: true });
    const fetchData = async () => {
      try {
        const [balanceResult, invTypeResult, loanResult] =
          await Promise.allSettled([
            getParticipantAccountBalanceByPlan(
              planId,
              censusId,
              moment(new Date()).format("YYYY-MM-DD")
            ),
            getInvestmentType(),
            getTotalOutStandingLoanPrinciple(censusId, planId),
          ]);

        if (balanceResult.status === "fulfilled") {
          setaccountBalanceByAccount(balanceResult.value);
        }

        if (invTypeResult.status === "fulfilled") {
          setinvTypes(invTypeResult.value);
        }

        if (loanResult.status === "fulfilled") {
          setTotalOutStandingLoanPrinciple(
            loanResult.value.totalOutStandingLoanPrinciple
          );
        }
      } catch (error) {
        console.error("Unexpected error in fetching data:", error);
      } finally {
        dispatch({ type: MANAGE_CENSUS_SET_LOADER, payload: false });
      }
    };
    fetchData();
  }, [planId, censusId]);

  return (
    <Formik
      initialValues={{
        statementPeriod: 1,
        fromDate: "",
        toDate: "",
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
        setErrors,
        setFieldError,
        values,
        dirty,
        ...rest
      }) => {
        return (
          <LoaderWrapper isLoading={isLoading} className="pb-5" overflow-auto>
            <Form>
              <>
                <div className="balance_summary_tabs">
                  <div
                    className={`${styles["p-t-10px-p-b-7px-m-b-10px-flex-items-center"]} core-heading-regular`}
                  >
                    <div>Balance Summary</div>

                    <Button
                      variant="secondary"
                      className="mb-1"
                      onClick={() => setPstModalVisible(true)}
                    >
                      Generate Statement
                    </Button>
                  </div>

                  {/* PERIODIC STATEMENT MODAL */}
                  {pstModalVisible && (
                    <>
                      <div
                        className="modal-overlay"
                        onClick={() => setPstModalVisible(false)}
                      ></div>
                      <div className="pst-modal">
                        <div className="d-flex justify-content-between">
                          <div className="core-page-titles">
                            Periodic Statement
                          </div>
                          <Button
                            variant="secondary"
                            className="mb-2"
                            onClick={() => {
                              setPstModalVisible(false);
                              setDownloadedCompleted(false);
                              setFieldValue("statementPeriod", "");
                              setFieldValue("fromDate", "");
                              setFieldValue("toDate", "");
                              setShowError(false);
                            }}
                          >
                            Close
                          </Button>
                        </div>
                        <hr className="mb-2" />
                        {isLoading ? (
                          <div className="spinner-loader">
                            <div className="mt-4 loader-wrapper-overlay" />
                            <div className="mt-3 textloader">
                              The file is being generated, please wait
                            </div>
                          </div>
                        ) : downloadedCompleted ? (
                          <div className="d-flex flex-column align-items-center mt-4">
                            <img src={statementIcon} alt="statement-icon" />

                            {values?.statementPeriod == 3 ? (
                              <div className="mt-3 core-body-text-large-bold text-align-center">
                                Periodic Statement{" "}
                                {values?.fromDate
                                  ? usDateFormat(values?.fromDate)
                                  : null}{" "}
                                -{" "}
                                {values?.toDate
                                  ? usDateFormat(values?.toDate)
                                  : null}
                                .pdf
                              </div>
                            ) : values?.statementPeriod == 1 ? (
                              <div className="mt-3 core-body-text-large-bold text-align-center">
                                Periodic Statement{" "}
                                {usDateFormat(
                                  new Date(
                                    new Date().setMonth(
                                      new Date().getMonth() - 3
                                    )
                                  )
                                )}{" "}
                                - {usDateFormat(new Date())}.pdf
                              </div>
                            ) : (
                              <div className="mt-3 core-body-text-large-bold text-align-center">
                                Periodic Statement{" "}
                                {usDateFormat(
                                  new Date(
                                    new Date().setMonth(
                                      new Date().getMonth() - 6
                                    )
                                  )
                                )}{" "}
                                - {usDateFormat(new Date())}.pdf
                              </div>
                            )}
                            <div className="mt-3 core-body-text-regular-semi-bold text-align-center">
                              File generated and downloaded successfully!
                            </div>
                          </div>
                        ) : showError && errorType !== "Validations-Error" ? (
                          <div className="d-flex flex-column align-items-center mt-4">
                            <img src={nodataimg} alt="no-data-img" />
                            <div className="mt-3 core-body-text-large-bold text-align-center">
                              Unable to generate the statement!
                            </div>
                            <div className="mt-3 core-body-text-regular-semi-bold text-align-center">
                              There is not enough data.
                            </div>
                          </div>
                        ) : (
                          <>
                            <Field
                              size="md"
                              isRequired
                              label="Statement Period"
                              name={"statementPeriod"}
                              placeholder="Select"
                              type="text"
                              autoComplete="off"
                              options={toOptionValuesFromMapper(
                                OPTIONS_DATA_MAPPER.PERIODIC_STATEMENT_VALUES
                              )}
                              direction="bottom"
                              popupContent={
                                <SearchableList
                                  width="200px"
                                  options={toOptionValuesFromMapper(
                                    OPTIONS_DATA_MAPPER.PERIODIC_STATEMENT_VALUES
                                  )}
                                  onSelect={(value) => {
                                    setFieldValue("statementPeriod", value);
                                  }}
                                  selectedValue={values?.statementPeriod}
                                  isNotTypeAhead
                                  label="Select"
                                />
                              }
                              component={FieldDropSide}
                              onChange={handleChange}
                            />

                            {/* FOR CUSTOM DATE RANGE ONLY */}
                            {values?.statementPeriod == 3 && (
                              <div className="d-flex flex-row">
                                <Field
                                  size="xs"
                                  isRequired
                                  label="From"
                                  name={"fromDate"}
                                  value={
                                    values?.fromDate
                                      ? usDateFormat(values?.fromDate)
                                      : null
                                  }
                                  direction="bottom"
                                  isDatePicker
                                  onClear={() =>
                                    setFieldValue("fromDate", null)
                                  }
                                  popupContent={
                                    <DatePicker
                                      onDayClick={(value) => {
                                        setFieldValue("fromDate", value);
                                      }}
                                      value={
                                        values?.fromDate
                                          ? usDateFormat(values?.fromDate)
                                          : null
                                      }
                                    />
                                  }
                                  component={FieldDropSide}
                                />

                                <div className="ml-1r" />
                                <Field
                                  size="xs"
                                  isRequired
                                  label="To"
                                  name={"toDate"}
                                  value={
                                    values?.toDate
                                      ? usDateFormat(values?.toDate)
                                      : null
                                  }
                                  direction="bottom"
                                  isDatePicker
                                  onClear={() => setFieldValue("toDate", null)}
                                  popupContent={
                                    <DatePicker
                                      onDayClick={(value) => {
                                        setFieldValue("toDate", value);
                                      }}
                                      value={
                                        values?.toDate
                                          ? usDateFormat(values?.toDate)
                                          : null
                                      }
                                    />
                                  }
                                  component={FieldDropSide}
                                />
                              </div>
                            )}
                            <Button
                              variant="secondary"
                              type="button"
                              onClick={() => {
                                handleDownload1(values, {
                                  setFieldError,
                                  setErrors,
                                });
                                setShowError(true);
                              }}
                            >
                              Download
                            </Button>
                          </>
                        )}
                      </div>
                    </>
                  )}

                  <div className="cusstyrow">
                    {classNameList.map((cn, idx) => {
                      console.log("statappUagee.:", state.appUsage); // Debugging state.appUage
                      console.log("namesList[idx]:", namesList[idx]); // Debugging namesList[idx]

                      if (
                        state.appUsage === "IRA" &&
                        (namesList[idx] === "Total Outstanding Loan" ||
                          namesList[idx] === "Vested balance")
                      ) {
                        console.log("Hiding card:", namesList[idx]); // Debugging hidden cards
                        return null;
                      }
                      return (
                        <div className={`${cn}`} key={idx}>
                          <div className="d-flex justify-content-space-between">
                            <div className="d-flex flex-column">
                              <span className="core-body-text-regular-semi-bold-sl justify-content-space-between d-flex">
                                {namesList[idx]}
                              </span>
                              <span className="core-body-text-large-bold mt-1">
                                {/* {idx + 1 != classNameList.length */}
                                {/* ?  */}
                                {usCurrency(currencyList[idx])}
                                {/* : currencyList[idx].toFixed(2) + " %"} */}
                              </span>
                            </div>
                            <div>
                              {namesList[idx] == "Account balance" &&
                              isReturnsLoading ? (
                                <div
                                  role="status"
                                  className="spinner-border primary-text-color loading-spinner"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : namesList[idx] == "Account balance" &&
                                !planBalanceReturn &&
                                state.appUsage !== "IRA" ? (
                                <div
                                  className="core-body-text-regular-semi-bold-primary text-decoration-underline cursor-pointer"
                                  onClick={() => {
                                    setIsReturnsLoading(true);
                                    getEmployeeInvestmentsRor(
                                      censusId,
                                      planId,
                                      null,
                                      null,
                                      moment(new Date()).format("YYYY-MM-DD")
                                    ).then((response) => {
                                      setPlanBalanceReturn(
                                        response?.rateOfReturn.toFixed(2)
                                      );
                                      setIsReturnsLoading(false);
                                    });
                                  }}
                                >
                                  {" "}
                                  View Returns %
                                </div>
                              ) : (
                                namesList[idx] == "Account balance" &&
                                state.appUsage !== "IRA" && (
                                  <div className="d-flex">
                                    <div
                                      className={
                                        planBalanceReturn >= 0
                                          ? "core-body-text-regular-semi-bold-st"
                                          : "core-body-text-regular-semi-bold-red"
                                      }
                                    >
                                      {" "}
                                      {planBalanceReturn} %
                                    </div>
                                    <FontAwesomeIcon
                                      icon={
                                        isHovered
                                          ? AlterFaQuestionCircle
                                          : faQuestionCircle
                                      }
                                      className={`${styles["m-t-0p2r"]} subtle-text-color cursor-pointer ml-1`}
                                      onMouseEnter={() => setIsHovered(true)}
                                      onMouseLeave={() => setIsHovered(false)}
                                      onClick={() => {
                                        setModalVisible(true);
                                      }}
                                    />
                                  </div>
                                )
                              )}
                              {namesList[idx] === "Total Outstanding Loan" && (
                                <div className="d-flex">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id={`tooltip-${idx}`}>
                                        This amount indicates outstanding
                                        loan(s) principal for active,delinquent,
                                        suspended, deemed loans, if any.
                                      </Tooltip>
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={
                                        iconHovered
                                          ? AlterFaInfoCircle
                                          : faInfoCircle
                                      }
                                      className={`subtle-text-color cursor-pointer ml-1 ${
                                        iconHovered ? "hovered" : ""
                                      }`}
                                      onMouseEnter={handleMouseEnter}
                                      onMouseLeave={handleMouseLeave}
                                    />
                                  </OverlayTrigger>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {!isEmpty(accountBalanceByPlanResponse?.sources) && (
                    <Tabs
                      mountOnEnter
                      unmountOnExit
                      onSelect={menuChange}
                      activeKey={keyValue}
                    >
                      <Tab
                        eventKey="source"
                        title={
                          <span>
                            {keyValue === "source" ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={`${styles["w-p-r-4px"]} font-size-12`}
                                onClick={() => {}}
                              />
                            ) : null}
                            Source
                          </span>
                        }
                      >
                        <div
                        //style={{ height: "45vh", overflowY: "scroll" }}
                        >
                          <BalanceSummarySourceTab
                            accountBalanceByPlanResponse={
                              accountBalanceByPlanResponse
                            }
                          />
                        </div>
                      </Tab>
                      {accountBalanceByPlanResponse?.planType !== 18 && (
                        <Tab
                          eventKey="investment"
                          title={
                            <span>
                              {keyValue === "investment" ? (
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={`${styles["w-p-r-4px"]} font-size-10`}
                                  onClick={() => {}}
                                />
                              ) : null}
                              Investment
                            </span>
                          }
                        >
                          <div
                          //style={{ height: "45vh", overflowY: "scroll" }}
                          >
                            <BalanceSummaryInvestmentTab
                              invTypes={invTypes}
                              accountBalanceByPlanResponse={
                                accountBalanceByPlanResponse
                              }
                            />
                          </div>
                        </Tab>
                      )}
                    </Tabs>
                  )}
                </div>

                <ModalNotification
                  show={modalVisible}
                  header={"How Returns % is calculated?"}
                  message={
                    "The Rate of return is calculated on the basis of Opening and closing balance accounting for all time-weighted cashflows like contributions and withdrawals"
                  }
                  onHide={() => setModalVisible(false)}
                  infoType={4}
                  primaryButtonAction={() => setModalVisible(false)}
                  primaryButtonLabel={"Okay"}
                  onlyOneButton={true}
                />
              </>
            </Form>
          </LoaderWrapper>
        );
      }}
    </Formik>
  );
}

export default BalanceSummary;
