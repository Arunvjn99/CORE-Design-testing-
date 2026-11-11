import { groupBy, isEmpty } from "lodash-es";
import React from "react";
import { Image } from "react-bootstrap";
import moment from "moment";
import AddToolTip from "@/components/AddToolTip";
import TransactionDateComp from "@/components/TransactionEachRecord/TransactionDateComp";
import upload from "@/assets/png/upload.png";
import sftp from "@/assets/png/ftp.png";

export const getModelPortfolioInvestments = (investmentList = []) => {
  return investmentList.filter(
    (_) => _.modelPortfolioId != 0 && _.modelPortfolioId != null
  );
};

export const getRegularInvestments = (investmentList = []) => {
  return investmentList.filter(
    (_) => _.modelPortfolioId == 0 || _.modelPortfolioId == null
  );
};

export const getSDBInvestments = (investmentList = []) => {
  return []; // No filter applied
};

export const translateModelPortfolioInvestments = (
  modelPortfolioInvestments = [],
  fieldName = "sourceInvestmentBalances"
) => {
  console.log("sdmnfg", modelPortfolioInvestments);
  if (isEmpty(modelPortfolioInvestments)) {
    return [];
  }
  const grouped = groupBy(
    modelPortfolioInvestments,
    (_) =>
      `${_.modelPortfolioId ?? 0}|${_.modelPortfolioName ?? ""}|${
        _.modelPortfolioInvestmentType ?? 0
      }`
  );
  return Object.entries(grouped).map(([key, values]) => {
    const [modelPortfolioId, modelPortfolioName, modelPortfolioInvestmentType] =
      key.split("|");
    const allocationDetails = values.reduce(
      (acc, curr) => [
        (curr?.grossWithdrawalAmount ?? 0) + acc[0],
        (curr?.allocation ?? 0) + acc[1],
        (curr?.investmentAccountBalance ?? 0) + acc[2],
        (curr?.requestedAmount ?? 0) + acc[3],
        (curr?.units ?? 0) + acc[4],
      ],
      [0, 0, 0, 0, 0]
    );
    const valuesData = values?.map((_) => {
      return {
        ..._,
        allocation: _?.allocation
          ? (_?.allocation / allocationDetails[1]) * 100
          : _?.allocation,
      };
    });
    return {
      investmentId: parseInt(modelPortfolioId),
      investmentName: modelPortfolioName,
      investmentType: parseInt(modelPortfolioInvestmentType),
      grossWithdrawalAmount: allocationDetails[0],
      allocation: allocationDetails[1],
      investmentAccountBalance: allocationDetails[2],
      requestedAmount: allocationDetails[3],
      units: allocationDetails[4],
      isExpandable: true,
      [fieldName]: valuesData,
      isBuy: modelPortfolioInvestments?.filter(
        (e) => e.modelPortfolioId == modelPortfolioId
      )[0]?.isBuy,
    };
  });
};

export const translateInvestments = (investmentObjects, fieldName) => {
  return {
    regularInvestments: getRegularInvestments(investmentObjects),
    modelPortfolioInvestments: translateModelPortfolioInvestments(
      getModelPortfolioInvestments(investmentObjects),
      fieldName
    ),
    sdbInvestments: getSDBInvestments(investmentObjects),
  };
};

export const translateInvestmentsLoan = (investmentObjects, fieldName) => {
  return [
    ...(translateModelPortfolioInvestments(
      getModelPortfolioInvestments(investmentObjects),
      fieldName
    ) ?? []),
    ...(getRegularInvestments(investmentObjects) ?? []),
    ...(getSDBInvestments(investmentObjects) ?? []),
  ];
};

export const transactionDate = (date) => {
  return (
    <TransactionDateComp
      TxnDate={moment(date).format("MM/DD/yyyy")}
      splitlen={10}
      fontSize={true}
    />
  );
};

export const payDate = (header, date, frequency) => {
  const formattedDate =
    typeof date === "string" ? date : date ? String(date) : "";
  return (
    <div>
      <p className="core-body-text-regular-semi-bold-sl mb-1">{header}</p>
      <p className="d-flex core-body-text-regular-semi-bold mb-1">
        <p className="mr-1">{formattedDate.substring(0, 8)}</p>
        <p className="core-body-text-regular-semi-bold-sl m-0">
          {formattedDate.substring(8)}
        </p>
      </p>
      <p className="core-body-text-regular-semi-bold">{frequency}</p>
    </div>
  );
};

export const fileName = (header, data) => {
  const fName = data.fileName ?? "";
  console.log(fName.substring(fName.lastIndexOf(".") + 1), "fileName");
  const date = moment(data?.uploadedDate).format("MMM DD,yyyy HH:mm");
  return (
    <div>
      <p className=" core-body-text-regular-semi-bold-sl mb-1">{header}</p>
      <div className="d-flex mt-1 core-body-text-regular-semi-bold">
        <Image
          src={data.uploadedThrough == "FileUpload" ? upload : sftp}
          className="mr-1 core-body-text-regular-semi-bold"
        />
        {/* {fName.substring(0, fName.lastIndexOf(".") + 1)} */}

        <AddToolTip name={fName}>
          {fName.length > 20 ? `${fName.substring(0, 20)}...` : fName}
        </AddToolTip>

        <span className="ml-1 m-0  core-body-text-regular-semi-bold-sl">
          {fName.substring(fName.lastIndexOf(".") + 1)}
        </span>
      </div>
      <div className="d-flex mt-1">
        <p className="core-body-text-regular-semi-bold-sl m-0 pr-1">
          {data?.uploadedBy}
        </p>
        <div className="d-flex core-body-text-regular-semi-bold-sl bl-1px-solid-strong pl-1">
          <p>{date.substring(0, 11)}</p>
          <p className="core-body-text-regular-semi-bold-sl ml-1 m-0">
            &nbsp;{date.substring(11)}
          </p>
        </div>
      </div>
    </div>
  );
};
