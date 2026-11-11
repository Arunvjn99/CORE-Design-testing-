import styles from "./Vesting.module.scss";
import { Formik } from "formik";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDeepEffect, useRouterParams } from "@/abstracts/hooks";
import CensusVestingCard from "@/components/CensusVestingCard";
import LoaderWrapper from "@/components/LoaderWrapper";

import { manageCensusStore } from "../../../../contexts";
import { useContext } from "react";
import { getParticipantAccountBalanceByPlan } from "@/services/payroll";
import { getEmployeeVestingDetails } from "@/services/vesting";
import moment from "moment";

const Vesting = ({ planDetails }) => {
  const { state, dispatch } = useContext(manageCensusStore);
  const { planId, censusId } = useRouterParams();
  const [toggle, setToggle] = useState(false);
  const [sources, setSources] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({});
  const [vestingDetails, setVestingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [participantBalances, setParticipantBalances] = useState({});
  useDeepEffect(() => {
    setIsLoading(true);
    getEmployeeVestingDetails({
      planId: planId,
      employeeId: censusId,
    })
      .then((response) => {
        setIsLoading(false);
        setVestingDetails(response);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [toggle]);

  //   const formName = manageCensusFormNames.CONTRIBUTIONS_FILTER;
  //   const fields = formFields[formName];

  useDeepEffect(() => {
    if (planId && censusId) {
      setIsLoading(true);
      getParticipantAccountBalanceByPlan(
        planId,
        censusId,
        moment(new Date()).format("YYYY-MM-DD")
      )
        .then((balance) => {
          setParticipantBalances(balance ?? {});
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [toggle]);

  var ComputationPeriodsGroupedByOfSources = vestingDetails.reduce(
    (group, product) => {
      const { sourceId } = product;
      group[sourceId] = group[sourceId] ?? [];
      group[sourceId].push(product);
      return group;
    },
    {}
  );
  //var latestOfEachSource = ComputationPeriodsGroupedByOfSources.map((item)=> item[key]);

  var sourceWiseComputationalPeriods = Object.values(
    ComputationPeriodsGroupedByOfSources
  );
  //print values1 array

  var currentComputationPeriodsOfEachsource =
    sourceWiseComputationalPeriods.map((item, index) => {
      return item[item.length - 1];
    });
  const onFormSubmit = (values) => {
    // dispatch(
    //   setManageCensusPageLevelData({
    //     formName: formName,
    //     fieldData: values,
    //   })
    // );
  };
  return (
    <>
      <LoaderWrapper isLoading={isLoading}>
        <Formik initialValues={{}} onSubmit={onFormSubmit} enableReinitialize>
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            setFieldError,
            values,
            ...rest
          }) => {
            return (
              <Form
                autoComplete="off"
                className="h-100p"
                onSubmit={handleSubmit}
              >
                <div className={`${styles["m-t-30px-v3"]}`}>
                  {vestingDetails.length === 0 ? (
                    <p>No record(s) found</p>
                  ) : (
                    currentComputationPeriodsOfEachsource.map((item, index) => {
                      return (
                        <div className={`mb-25px`}>
                          <CensusVestingCard
                            data={item}
                            toggle={toggle}
                            setToggle={setToggle}
                            setFieldError={setFieldError}
                            BISType={item?.bisType}
                            participantBalances={participantBalances?.sources?.find(
                              (_) => _.sourceId === item?.sourceId
                            )}
                            planDetails={planDetails}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </LoaderWrapper>
    </>
  );
};

export default Vesting;
