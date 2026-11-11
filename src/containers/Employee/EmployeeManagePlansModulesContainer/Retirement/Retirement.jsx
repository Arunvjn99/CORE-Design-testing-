import styles from "./Retirement.module.scss";
import { get } from "lodash-es";
import React, { useState } from "react";
import useRequest from "@/abstracts/useRequest";
import { useRouterParams } from "@/abstracts/hooks";
import LoaderWrapper from "@/components/LoaderWrapper";
import CensusRetirementCard from "@/components/CensusRetirementCard";
import { usDateFormat } from "@/utils/helpers";
import { manageCensusStore } from "../../../../contexts";
import { getEmployeeCensusInformation } from "@/services/census";
import { getEmployeeRetirementDetails } from "@/services/vesting";
import { useContext } from "react";

const Retirement = (props) => {
  const { state, dispatch } = useContext(manageCensusStore);
  const { planId, censusId } = useRouterParams();
  const [toggle, setToggle] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({});
  //const [isLoading, setLoading] = useState(false);
  const { response: employeeDetails, loading: isLoading } = useRequest({
    method: getEmployeeCensusInformation,
    payload: censusId,
    defaultResponse: [],
  });
  const { response: retirementDetails } = useRequest({
    method: getEmployeeRetirementDetails,
    payload: {
      planId: planId,
      employeeId: get(state, "censusId", 0),
    },
    defaultResponse: [],
  });
  retirementDetails.employeeDOB = usDateFormat(employeeDetails.birthDate);
  console.log("employeeDetails", employeeDetails);
  retirementDetails.employeeName =
    employeeDetails.middleName != null
      ? employeeDetails.firstName +
        " " +
        employeeDetails.middleName +
        " " +
        employeeDetails.lastName
      : employeeDetails.firstName + " " + employeeDetails.lastName;

  const earlyRetirementData = [
    "earlyRetirementStatus",
    "earlyRetirementDate",
  ].reduce((a, v) => ({
    status: retirementDetails[a],
    date: retirementDetails[v],
  }));
  const normalRetirementData = [
    "normalRetirementStatus",
    "normalRetirementDate",
  ].reduce((a, v) => ({
    status: retirementDetails[a],
    date: retirementDetails[v],
  }));

  return (
    <>
      <LoaderWrapper isLoading={isLoading} className="min-h-0">
        <div className={`${styles["m-t-30px-m-b-5r"]}`}>
          <CensusRetirementCard
            data={retirementDetails}
            isMainCard
            cardName="retirementcard"
          />
          <CensusRetirementCard
            data={earlyRetirementData}
            isERACard
            cardName="eracard"
          />
          <CensusRetirementCard
            data={normalRetirementData}
            isNRACard
            cardName="eracard"
          />
        </div>
      </LoaderWrapper>
    </>
  );
};

export default Retirement;
