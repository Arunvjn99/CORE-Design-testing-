import styles from "./AddTreeStructure.module.scss";
import React, { useState } from "react";
import { usCurrency } from "@/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import { getEmployeeInvestmentsRor } from "@/services/census";
import moment from "moment";
import { useDeepEffect } from "@/abstracts/hooks";
import { Form } from "react-bootstrap";

const AddTreeStructure = (props) => {
  const {
    data,
    style = {},
    page,
    color,
    onClickReturn,
    returnValues,
    censusId,
    planId,
    isReturnsLoading,
    onClickReturnLoading,
    hasCheckBox = false,
    isChecked,
    setIsChecked,
    disableExpansion = false,
  } = props;
  const [isOpen, setOpen] = useState([]);
  useDeepEffect(() => {
    setOpen(
      data.map((_) => {
        return false;
      })
    );
  }, [data]);
  return (
    <ul style={style} className="tree">
      {data?.map((item, index) => {
        return (
          <li key={index}>
            <div
              className={
                page == "SummaryInvestment"
                  ? "color-brand-default-var core-body-text-large-medium-bd"
                  : "color-brand-default core-body-text-large-medium-bd"
              }
            >
              {page == "SummaryInvestment" && (
                <FontAwesomeIcon
                  icon={faCircle}
                  style={{
                    color: color,
                  }}
                />
              )}
              <i
                onClick={
                  !disableExpansion
                    ? () =>
                        setOpen(
                          isOpen.map((data, i) => {
                            if (i == index) {
                              return !data;
                            }
                            return data;
                          })
                        )
                    : undefined
                }
                className={`${
                  isOpen[index]
                    ? "far fa-minus-square mb-7"
                    : "far fa-plus-square mb-7"
                } ${
                  disableExpansion
                    ? "cursor-default tree-disabled"
                    : "cursor-pointer tree-active"
                }`}
              ></i>
              {item.head}
            </div>
            <div
              className="core-body-text-large-semi-bold d-flex "
              style={{
                float: "right",
                marginTop: "-30px",
                marginRight: page != "SummaryInvestment" ? "-35px" : "-27px",
              }}
            >
              {item.field ? item.field : usCurrency(item.amount)}

              {hasCheckBox && (
                <Form.Check
                  name={"checkBox"}
                  type="checkbox"
                  label=""
                  id={"checkBox"}
                  className="d-flex justify-content-center mt-1 ml-1"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
              )}
            </div>
            {!disableExpansion && isOpen[index] && (
              <ul>
                {item.subHead?.some((subHead) => subHead.isSDB) && (
                  <div className="row align-items-center pl-3">
                    <div className="col-5 core-body-text-regular-semi-bold-s">
                      Account Number
                    </div>
                    <div className="col-2 text-align-right core-body-text-regular-semi-bold-s">
                      Cash Balance
                    </div>
                    <div className="col-4 text-align-right core-body-text-regular-semi-bold-s">
                      Asset Balance
                    </div>
                  </div>
                )}
                {item.subHead?.map((subHead, index) => {
                  return page != "SummaryInvestment" ? (
                    <li key={index} className={`justify-content-between`}>
                      <div className="addtree-strucuture-li core-body-text-regular-semi-bold-s">
                        {subHead.name}
                      </div>
                      <div className="addtree-strucuture-li-gap core-body-text-regular-semi-bold-s">
                        {subHead.field
                          ? subHead.field
                          : usCurrency(subHead.amount)}
                      </div>
                      {page === "BalanceSummarySource" &&
                        subHead.footerSubText && (
                          <div className="core-body-text-regular-semi-bold-s addtree-strucuture-li">
                            {subHead.footerSubText}
                          </div>
                        )}
                    </li>
                  ) : (
                    <li key={index}>
                      {!subHead.isSDB ? (
                        <>
                          <div className={`justify-content-between`}>
                            <div className="d-flex">
                              <div className="addtree-strucuture-li core-body-text-regular-semi-bold-s">
                                {subHead.name}
                              </div>
                              &nbsp; &nbsp;
                              {!subHead.isSDB &&
                                (isReturnsLoading[subHead.idx][
                                  subHead.index
                                ] ? (
                                  <div
                                    role="status"
                                    className="spinner-border primary-text-color loading-spinner"
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                ) : returnValues[subHead.idx][subHead.index] ==
                                  null ? (
                                  <div
                                    className="core-body-text-regular-semi-bold-primary text-decoration-underline cursor-pointer"
                                    onClick={() => {
                                      onClickReturnLoading(
                                        subHead.idx,
                                        subHead.index,
                                        true
                                      );
                                      getEmployeeInvestmentsRor(
                                        censusId,
                                        planId,
                                        subHead["investId"],
                                        null,
                                        moment(new Date()).format("YYYY-MM-DD")
                                      ).then((response) => {
                                        onClickReturn(
                                          subHead.idx,
                                          subHead.index,
                                          response?.rateOfReturn.toFixed(2)
                                        );
                                        onClickReturnLoading(
                                          subHead.idx,
                                          subHead.index,
                                          false
                                        );
                                      });
                                    }}
                                  >
                                    {" "}
                                    View Returns %
                                  </div>
                                ) : (
                                  <div
                                    className={
                                      returnValues[subHead.idx][
                                        subHead.index
                                      ] >= 0
                                        ? "core-body-text-regular-semi-bold-st"
                                        : "core-body-text-regular-semi-bold-red"
                                    }
                                  >
                                    {" "}
                                    {returnValues[subHead.idx][subHead.index]} %
                                  </div>
                                ))}
                            </div>
                            <div
                              className={`addtree-strucuture-li-gap core-body-text-regular-semi-bold-s`}
                            >
                              {subHead.field
                                ? subHead.field
                                : usCurrency(subHead.amount)}
                            </div>
                          </div>
                          {!subHead.hideFooterAmount && (
                            <div className="core-body-text-regular-bold-s addtree-strucuture-li">
                              {subHead.field
                                ? subHead.field
                                : usCurrency(subHead.footerAmount)}
                            </div>
                          )}
                          {subHead.footerSubText && (
                            <div className="core-body-text-regular-semi-bold-s addtree-strucuture-li">
                              {subHead.footerSubText}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="row align-items-center">
                          <div className="col-6 addtree-strucuture-li">
                            {subHead.name}
                          </div>
                          <div className="col-3 text-align-right addtree-strucuture-li">
                            {subHead.field
                              ? subHead.field
                              : usCurrency(subHead.amount)}
                          </div>
                          <div className="col-3 text-align-right ml-70px ">
                            {subHead.sdbAssetField
                              ? subHead.sdbAssetField
                              : usCurrency(subHead.sdbAssetAmount)}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default AddTreeStructure;
