import { isEmptyArray } from "formik";
import React, { useState } from "react";
import { Link } from "react-router";
import useRequest from "@/abstracts/useRequest";
import { useRouterParams } from "@/abstracts/hooks";
import {
  GetEmployeeYOSHistoryDetails,
  getEmployeeYOSDetails,
} from "@/services/vesting";
import { usDateFormat } from "@/utils/helpers";
import LoaderWrapper from "../LoaderWrapper";
import SliderPanel from "../SliderPanel";
import SponsorCard from "../SponsorCards";
import { Col, Row } from "react-bootstrap";
import AddToolTip from "@/components/AddToolTip";

const CensusRetirementCard = (props) => {
  const { data, isMainCard, isERACard, isNRACard, cardName } = props;
  const { planId, censusId } = useRouterParams();
  const [historySliderOpen, setHistorySliderOpen] = useState(false);
  const [viewUpdatedYOSSlider, setViewUpdatedYOSSlider] = useState(false);
  const [currentEmployeeYos, setCurrentEmployeeYOS] = useState({});
  const normalRetirementCardLabel = [
    { label: "Status", columnName: "status" },
    { label: "Date", columnName: "date" },
  ];
  const [employeeHistoryDetails, setEmployeeHistoryDetails] = useState([]);

  const { response: getEmployeeYOS, loading: load } = useRequest({
    method: getEmployeeYOSDetails,
    payload: { planId: planId, employeeId: censusId },
    defaultResponse: [],
  });

  var retirementYos =
    getEmployeeYOS[getEmployeeYOS?.length - 1]?.yearsOfService;

  const getHistoryDetails = (employeeYos) => {
    setViewUpdatedYOSSlider(true);
    GetEmployeeYOSHistoryDetails(employeeYos?.id).then((response) => {
      setEmployeeHistoryDetails(response);
    });
    setCurrentEmployeeYOS(employeeYos);
  };

  const getPreviousValue = (index) => {
    return employeeHistoryDetails[index + 1]?.yearsOfService;
  };
  const getCurrentValue = (index) => {
    return employeeHistoryDetails[index]?.yearsOfService;
  };

  const retirementCardLabel = [
    { label: "", columnName: "employerName" },
    //{ label: "Eligibility YOS", columnName: "eligibilityYearsOfService" },
    //{ label: "Age of Participant", columnName: "ageOfParticipant" },
    { label: "Years of service", columnName: "vestingYearsOfService" },
    { label: "Years of participation", columnName: "yearsOfParticipation" },
  ];
  //var year;
  //var month;
  // if (isMainCard) {
  //   var date = new Date();
  //   var birthday = data.employerDOB ? new Date(data.employerDOB) : null;
  //   year = date.getFullYear() - birthday.getFullYear();
  //   var datenow;
  //   if (date.getMonth() >= birthday.getMonth()) {
  //     month = date.getMonth() - birthday.getMonth();
  //   } else {
  //     year--;
  //     month = 12 + (date.getMonth() - birthday.getMonth());
  //   }
  //   if (date.getDate() >= birthday.getDate()) {
  //     datenow = date.getDate() - birthday.getDate();
  //   } else {
  //     month--;
  //     datenow = 31 + (date.getDate() - birthday.getDate());
  //     if (month < 0) {
  //       month = 11;
  //       year--;
  //     }
  //   }
  // }
  return (
    <div className={`d-flex flex-column`}>
      {isERACard && (
        <div className="core-heading-regular mb-10">Early retirement</div>
      )}
      {isNRACard && (
        <div className="core-heading-regular mb-10">Normal retirement</div>
      )}
      <div className={`${cardName}`}>
        {isMainCard &&
          retirementCardLabel.map((item, index) => {
            if (
              index == 0 &&
              data.ageInYears != null &&
              data.ageInMonths != null
            )
              return (
                <>
                  <div className="col-display w-33p">
                    <p className="source-name">{data.employeeName}</p>
                    {/* <p className="label">
                    DOB: {data.employeeDOB} ({data.ageInYears}{" "}
                    {data.ageInYears > 1 ? "Years" : "Year"} {data.ageInMonths}{" "}
                    {data.ageInMonths > 1 ? "months" : "month"})
                  </p> */}
                  </div>
                  <div className="dotline-separator"></div>
                  <div className="col-display w-22p">
                    <p className="label">Age of participant</p>
                    <p className="col-content mb-0px pr-4">
                      {data.ageInYears} {data.ageInYears > 1 ? "Years" : "Year"}{" "}
                      {data.ageInMonths}{" "}
                      {data.ageInMonths > 1 ? "months" : "month"}
                    </p>
                  </div>
                </>
              );
            else if (
              index == 0 &&
              data.ageInYears == null &&
              data.ageInMonths == null
            )
              return (
                <>
                  <div className="col-display w-33p ">
                    <p className="label">Employee Name</p>
                    {data?.employeeName?.length > 15 ? ( // adjust length if needed
                      <AddToolTip name={data.employeeName}>
                        {data.employeeName.slice(0, 15)}...
                      </AddToolTip>
                    ) : (
                      data?.employeeName ?? "-"
                    )}
                    {/* <p className="col-content mb-0 pr-4">{data.employeeName}</p> */}
                    {/* <p className="label">DOB: {data.employeeDOB}</p> */}
                  </div>
                  <div className="dotline-separator"></div>
                  <div className="col-display w-22p">
                    <p className="label">Age of participant</p>
                    <p className="col-content mb-0px pr-4">NA</p>
                  </div>
                </>
              );
            else if (index == 1)
              if (cardName === "retirementcard") {
                return (
                  <>
                    <div className="dotline-separator"></div>
                    <div className="col-display w-28p ">
                      <p className="label">{item.label}</p>
                      <p className="col-content d-flex mb-0px pr-3">
                        {retirementYos}{" "}
                        {retirementYos ? (
                          <Link
                            onClick={() => {
                              setHistorySliderOpen(true);
                            }}
                            className="ml-1r link-style"
                          >
                            {" "}
                            View History
                          </Link>
                        ) : (
                          "NA"
                        )}
                      </p>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div className="dotline-separator"></div>
                    <div className="col-display d-flex w-28p">
                      <p className="label">{item.label}</p>
                      <p className="col-content mb-0px pr-4">
                        {data[item.columnName]}{" "}
                        {data[item.columnName] ? (
                          <Link
                            onClick={() => {
                              setHistorySliderOpen(true);
                            }}
                            className={"ml-1r"}
                          >
                            {" "}
                            View History
                          </Link>
                        ) : (
                          "NA"
                        )}
                      </p>
                    </div>
                  </>
                );
              }
            else if (index == 2)
              return (
                <>
                  <div className="dotline-separator"></div>
                  <div className="col-display w-28p">
                    <p className="label">{item.label}</p>
                    <p className="col-content mb-0px pr-4">
                      {data[item.columnName] ? data[item.columnName] : "NA"}
                      {data[item.columnName]
                        ? data[item.columnName] > 1
                          ? " years"
                          : " year"
                        : ""}
                    </p>
                  </div>
                </>
              );
          })}
        {(isNRACard || isERACard) &&
          normalRetirementCardLabel.map((item, index) => {
            return (
              <>
                {index != 0 && <div className="dotline-separator"></div>}
                <div className="col-display w-50">
                  <p className="label">{item.label}</p>
                  <p className="col-content mb-0px pr-4">
                    {data[item.columnName] ? data[item.columnName] : "NA"}
                  </p>
                </div>
              </>
            );
          })}
      </div>
      <SliderPanel
        isOpen={historySliderOpen}
        showBackButton={false}
        backdropClicked={() => {
          setHistorySliderOpen(false);
        }}
        width="50%"
        className="mt-4 mr-4"
        onClose={() => setHistorySliderOpen(false)}
        showCancel={true}
      >
        <LoaderWrapper isLoading={load}>
          {!isEmptyArray(getEmployeeYOS) ? (
            getEmployeeYOS?.map((employeeYos, ind) => {
              return (
                <div>
                  <div className="updatedfields-card mt-4">
                    <SponsorCard
                      value={`${usDateFormat(
                        employeeYos?.startDate
                      )} - ${usDateFormat(employeeYos?.endDate)}`}
                      title={"Computation period"}
                      type="text"
                    />
                    <SponsorCard
                      value={employeeYos?.yearsOfService}
                      title={"Years Of Service"}
                      type="text"
                    />
                    <SponsorCard
                      value={employeeYos?.Comments ?? "-"}
                      title={"Comments"}
                      type="text"
                    />
                    <SponsorCard
                      value={"View History"}
                      type="link"
                      onClick={() => getHistoryDetails(employeeYos)}
                    ></SponsorCard>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="updatedfields-card mt-4 p-2">
              No record(s) found
            </div>
          )}
        </LoaderWrapper>
      </SliderPanel>
      <SliderPanel
        isOpen={viewUpdatedYOSSlider}
        showBackButton={false}
        backdropClicked={() => {
          setViewUpdatedYOSSlider(false);
        }}
        width="50%"
        className="mt-4 mr-4"
        onClose={() => setViewUpdatedYOSSlider(false)}
        showCancel={true}
      >
        <LoaderWrapper isLoading={load}>
          <>
            <Row className="d-flex justify-content-between Ecr-Payroll-Details">
              <Col>Field Name</Col>
              <Col>Previous Value</Col>
              <Col>Updated Value</Col>
              <Col md="4">Computation Period</Col>
            </Row>
            <hr></hr>
            {!isEmptyArray(employeeHistoryDetails) &&
              employeeHistoryDetails?.map(
                (employee, index) =>
                  index !== employeeHistoryDetails?.length - 1 && (
                    <Row className="d-flex justify-content-between mt-3">
                      <Col>Years Of Service</Col>
                      <Col>{getPreviousValue(index)}</Col>
                      <Col>{getCurrentValue(index)}</Col>
                      <Col md="4">
                        {`${usDateFormat(employee?.startDate)} - ${usDateFormat(
                          employee?.endDate
                        )}`}
                      </Col>
                    </Row>
                  )
              )}
            {!isEmptyArray(employeeHistoryDetails) && (
              <Row className="d-flex justify-content-between mt-3">
                <Col>Years of service</Col>
                <Col>{"-"}</Col>
                <Col>
                  {
                    employeeHistoryDetails[employeeHistoryDetails?.length - 1]
                      ?.yearsOfService
                  }
                </Col>
                <Col md="4">
                  {`${usDateFormat(
                    employeeHistoryDetails[0]?.startDate
                  )} - ${usDateFormat(employeeHistoryDetails[0]?.endDate)}`}
                </Col>
              </Row>
            )}
            {isEmptyArray(employeeHistoryDetails) && (
              <div className="updatedfields-card mt-4 p-2">
                No record(s) found
              </div>
            )}
          </>
        </LoaderWrapper>
      </SliderPanel>
    </div>
  );
};

export default CensusRetirementCard;
