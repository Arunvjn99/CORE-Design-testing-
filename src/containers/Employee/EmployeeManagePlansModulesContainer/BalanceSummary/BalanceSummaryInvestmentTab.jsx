import React, { useState } from "react";
import PieChartSummary from "./Piechartsummary";
import AddTreeStructure from "@/components/AddTreeStructure";
import { useRouterParams } from "@/abstracts/hooks";
import { PieChartColors } from "@/utils/constants/common";
import { usCurrency } from "@/utils/helpers";

const formatUnits = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(numericValue);
};

function BalanceSummaryInvestmentTab({
  accountBalanceByPlanResponse,
  invTypes,
}) {
  const { censusId, planId } = useRouterParams();
  const getTotalUnits = (investment) =>
    Number(investment?.regularBalanceUnits || 0) +
    Number(investment?.repaymentBalanceUnits || 0) +
    Number(investment?.basisBalanceUnits || 0) +
    Number(investment?.earningsBalanceUnits || 0);
  function groupAndRemoveDuplicates(data) {
    const grpdInvestment = {};

    data?.sources?.forEach((source) => {
      source?.regularInvestmentBalances?.forEach((investment) => {
        const investId = investment.investmentId;
        const investmentType = investment.investmentType;

        if (!grpdInvestment[investmentType]) {
          grpdInvestment[investmentType] = [];
        }
        const typeInvestments = grpdInvestment[investmentType];
        let exiInvestment = typeInvestments.find(
          (item) => item.investmentId === investId
        );

        if (!exiInvestment) {
          typeInvestments.push({
            ...investment,
            totalUnits: getTotalUnits(investment),
            _showUnitsNav: true,
          });
        } else {
          //get the existing account balance
          //for existing item
          const idx = typeInvestments.indexOf(exiInvestment);

          if (idx !== -1) {
            let clonedInv = Object.assign({}, exiInvestment);
            clonedInv["totalAccountBalance"] =
              (Number(exiInvestment["totalAccountBalance"]) || 0) +
              (Number(investment["totalAccountBalance"]) || 0);
            clonedInv.totalUnits =
              (Number(exiInvestment.totalUnits) || 0) +
              getTotalUnits(investment);
            typeInvestments[idx] = clonedInv;
          }

          // console.log(grpdInvestment,categInvestments,investment["totalAccountBalance"],"5882")
        }
      });

      source?.sdbInvestmentBalances?.forEach((investment) => {
        groupSDBInvestment(grpdInvestment, investment, data);
      });
      source?.modelPortfolioInvestmentBalances?.forEach((investment) => {
        groupModelPortfolioInvestment(grpdInvestment, investment);
      });
    });

    return grpdInvestment;
  }

  function groupModelPortfolioInvestment(grpdInvestment, investment) {
    const investId = investment.investmentId;
    const investmentType = investment.investmentType;

    if (!grpdInvestment[investmentType]) {
      grpdInvestment[investmentType] = [];
    }
    const typeInvestments = grpdInvestment[investmentType];
    let exiInvestment = typeInvestments.find(
      (item) => item.investmentId === investId
    );

    if (!exiInvestment) {
      typeInvestments.push({
        ...investment,
        totalUnits: getTotalUnits(investment),
        _showUnitsNav: false, // Do NOT show Units/NAV for model portfolio investments
      });
    } else {
      //get the existing account balance
      //for existing item
      const idx = typeInvestments.indexOf(exiInvestment);

      if (idx !== -1) {
        let clonedInv = Object.assign({}, exiInvestment);
        clonedInv["totalAccountBalance"] +=
          Number(investment["totalAccountBalance"]) || 0;
        clonedInv.totalUnits =
          (Number(exiInvestment.totalUnits) || 0) + getTotalUnits(investment);
        typeInvestments[idx] = clonedInv;
      }
    }
  }

  function getUnitsAndNavLabel(investment) {
    const unitsValue = Number(investment?.totalUnits) || 0;

    const navValue = Number(investment?.netAssetValue);
    const hasUnits = Number.isFinite(unitsValue);
    const hasNav = Number.isFinite(navValue);

    if (!hasUnits && !hasNav) {
      return null;
    }

    const unitsText = hasUnits ? `Units: ${formatUnits(unitsValue)}` : null;
    const navText = hasNav ? `NAV: ${usCurrency(navValue)}` : null;

    if (unitsText && navText) {
      return `${unitsText} • ${navText}`;
    }

    return unitsText || navText;
  }

  function groupSDBInvestment(grpdInvestment, investment, data) {
    const uniqueSdbAccBal = Object.values(
      data.sources.reduce((acc, item) => {
        const key = item.sdbAccountNumber;

        if (!acc[key]) {
          acc[key] = {
            sdbAccountNumber: key,
            sdbCashBalance: 0,
            sdbAssetBalance: 0,
          };
        }

        acc[key].sdbCashBalance += item.sdbSourceWiseCashAccountBalance;
        acc[key].sdbAssetBalance += item.sdbSourceWiseAssetAccountBalance;

        return acc;
      }, {})
    );
    const investId = investment.investmentId;
    const investmentType = investment.investmentType;

    if (!grpdInvestment[investmentType]) {
      grpdInvestment[investmentType] = [];
    }
    const typeInvestments = grpdInvestment[investmentType];
    let exiInvestment = typeInvestments.find(
      (item) => item.investmentId === investId
    );

    if (!exiInvestment) {
      investment.sdbAssertBalance = investment.totalAssetAccountBalance || 0;
      investment.sdbCashBalance = investment.totalCashAccountBalance || 0;
      investment.totalAccountBalance =
        investment.sdbAssertBalance + investment.sdbCashBalance;
      investment._showUnitsNav = false;
      investment.sdbAccountNumber = uniqueSdbAccBal || null;

      typeInvestments.push(investment);
    } else {
      const idx = typeInvestments.indexOf(exiInvestment);

      if (idx !== -1) {
        let clonedInv = Object.assign({}, exiInvestment);
        clonedInv.sdbAssertBalance += investment.totalAssetAccountBalance || 0;
        clonedInv.sdbCashBalance += investment.totalCashAccountBalance || 0;
        clonedInv.totalAccountBalance =
          clonedInv.sdbAssertBalance + clonedInv.sdbCashBalance;
        clonedInv.sdbAccountNumber = uniqueSdbAccBal || null;

        typeInvestments[idx] = clonedInv;
      }
    }
  }

  const groupedInvestments = groupAndRemoveDuplicates(
    accountBalanceByPlanResponse
  );
  const amountsSumEachInv = Object.values(groupedInvestments).map(
    (eachCatList) => {
      return eachCatList.reduce((sum, category) => {
        if (category["investmentType"] === 10) {
          return (
            sum +
            (Number(category["sdbCashBalance"]) || 0) +
            (Number(category["sdbAssertBalance"]) || 0)
          );
        } else {
          return sum + (Number(category["totalAccountBalance"]) || 0);
        }
      }, 0);
    }
  );

  const tsm = amountsSumEachInv.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  // GetParticipantAccountBalanceByPlan?planId=1489&participantId=135
  //!group by category and calculate total amount and calculate % of total

  const labels = Object.keys(groupedInvestments)?.map((invId) => {
    const numericInvId = parseInt(invId, 10); // Convert invId to a number
    return invTypes?.find((invEch) => invEch?.id === numericInvId)?.name;
  });

  const totalAmount = amountsSumEachInv.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const getAmountWithPercentage = (amount, baseAmount = totalAmount) => {
    const safeAmount = Number(amount) || 0;
    const safeBaseAmount = Number(baseAmount) || 0;
    const percentage =
      safeBaseAmount !== 0
        ? ((safeAmount / safeBaseAmount) * 100).toFixed(2)
        : "0.00";
    return `${usCurrency(safeAmount)} (${percentage}%)`;
  };

  const initializeArray = () => {
    return Object.values(groupedInvestments).map((innerArray) =>
      innerArray.map(() => null)
    );
  };
  const initializeArrayBoolean = () => {
    return Object.values(groupedInvestments).map((innerArray) =>
      innerArray.map(() => false)
    );
  };

  const [returnValues, setReturnValues] = useState(initializeArray());
  const [isReturnsLoading, setIsReturnsLoading] = useState(
    initializeArrayBoolean()
  );

  const onClickReturn = (rowIndex, colIndex, val) => {
    setReturnValues((prevArray) => {
      const newArray = [...prevArray];
      newArray[rowIndex] = [...newArray[rowIndex]];
      newArray[rowIndex][colIndex] = val;
      return newArray;
    });
  };
  const onClickReturnLoading = (rowIndex, colIndex, val) => {
    setIsReturnsLoading((prevArray) => {
      const newArray = [...prevArray];
      newArray[rowIndex] = [...newArray[rowIndex]];
      newArray[rowIndex][colIndex] = val;
      return newArray;
    });
  };

  return (
    <div className="cusstyrow">
      <div className="w-25">
        <PieChartSummary
          labels={tsm === 0 || !amountsSumEachInv?.length ? [] : labels}
          data={amountsSumEachInv?.map((invamt) =>
            ((invamt / tsm) * 100).toFixed(2)
          )}
          colors={PieChartColors}
        />
      </div>
      <div className={`mb-5r w-75`}>
        {labels.map((cn, idx) => {
          const investmentTypeTotal = Number(amountsSumEachInv[idx]) || 0;
          return (
            <div key={idx} className="bl-pt-aftx-rth-ctr">
              <AddTreeStructure
                page="SummaryInvestment"
                color={PieChartColors[idx]}
                onClickReturn={onClickReturn}
                returnValues={returnValues}
                isReturnsLoading={isReturnsLoading}
                onClickReturnLoading={onClickReturnLoading}
                censusId={censusId}
                planId={planId}
                data={[
                  {
                    head: cn,
                    amount: `${
                      totalAmount && totalAmount !== 0
                        ? (
                            (Number(amountsSumEachInv[idx] || 0) /
                              totalAmount) *
                            100
                          ).toFixed(2)
                        : "0.00"
                    } %`,
                    field: getAmountWithPercentage(amountsSumEachInv[idx]),
                    subHead: [
                      ...(cn !== "Self-directed brokerage"
                        ? Object.values(groupedInvestments)[idx]?.map(
                            (eachInv, index) => ({
                              name: eachInv["name"],
                              amount: `${
                                investmentTypeTotal !== 0
                                  ? (
                                      (Number(
                                        eachInv["totalAccountBalance"] || 0
                                      ) /
                                        investmentTypeTotal) *
                                      100
                                    ).toFixed(2)
                                  : "0.00"
                              } %`,
                              field: getAmountWithPercentage(
                                eachInv["totalAccountBalance"],
                                investmentTypeTotal
                              ),
                              footerAmount: eachInv["totalAccountBalance"],
                              footerSubText: eachInv._showUnitsNav
                                ? getUnitsAndNavLabel(eachInv)
                                : null,
                              hideFooterAmount: true,
                              idx: idx,
                              index: index,
                              investId: eachInv["investmentId"],
                              isSDB: false,
                            })
                          )
                        : []),
                      ...(cn === "Self-directed brokerage"
                        ? Object.values(groupedInvestments)[idx].flatMap(
                            (eachInv, index) =>
                              (eachInv.sdbAccountNumber || []).flatMap(
                                (acc, accIndex) => [
                                  {
                                    name: acc.sdbAccountNumber,
                                    amount: `${
                                      investmentTypeTotal !== 0
                                        ? (
                                            (Number(acc.sdbCashBalance || 0) /
                                              investmentTypeTotal) *
                                            100
                                          ).toFixed(2)
                                        : "0.00"
                                    } %`,
                                    sdbAssetAmount: `${
                                      investmentTypeTotal !== 0
                                        ? (
                                            (Number(acc.sdbAssetBalance || 0) /
                                              investmentTypeTotal) *
                                            100
                                          ).toFixed(2)
                                        : "0.00"
                                    } %`,
                                    field: getAmountWithPercentage(
                                      acc.sdbCashBalance,
                                      investmentTypeTotal
                                    ),
                                    sdbAssetField: getAmountWithPercentage(
                                      acc.sdbAssetBalance,
                                      investmentTypeTotal
                                    ),
                                    isSDB: true,
                                  },
                                ]
                              )
                          )
                        : []),
                    ],
                  },
                ]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BalanceSummaryInvestmentTab;
