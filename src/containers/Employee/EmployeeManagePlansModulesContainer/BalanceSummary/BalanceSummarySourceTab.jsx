import React from "react";
import Piechartsummary from "./Piechartsummary";
import AddTreeStructure from "@/components/AddTreeStructure";
import { get, isEmpty } from "lodash-es";
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

function BalanceSummarySourceTab({ accountBalanceByPlanResponse }) {
  function getUnitsAndNavLabel(investment) {
    const unitsValue =
      Number(investment?.regularBalanceUnits) +
      Number(investment?.repaymentBalanceUnits) +
      Number(investment?.basisBalanceUnits) +
      Number(investment?.earningsBalanceUnits);

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

  function getAmountWithPercentage(amount, total) {
    const safeAmount = Number(amount) || 0;
    const safeTotal = Number(total) || 0;
    const percentage =
      safeTotal > 0 ? ((safeAmount / safeTotal) * 100).toFixed(2) : "0.00";
    return `${usCurrency(safeAmount)} (${percentage}%)`;
  }

  function groupInvestmentsForSource(source) {
    const grouped = {};

    source?.investmentwiseBalances?.forEach((investment) => {
      if (Number(investment?.modelPortfolioInvestmentType ?? 0) !== 0) {
        return;
      }

      const investId = investment.investmentId;
      if (!grouped[investId]) {
        grouped[investId] = {
          ...investment,
          totalUnits:
            Number(investment.totalUnits ?? investment.regularBalanceUnits) ||
            0,
          _showUnitsNav: true,
        };
      } else {
        grouped[investId]["totalAccountBalance"] =
          (Number(grouped[investId]["totalAccountBalance"]) || 0) +
          (Number(investment["totalAccountBalance"]) || 0);
        grouped[investId].totalUnits =
          (Number(
            grouped[investId].totalUnits ??
              grouped[investId].regularBalanceUnits
          ) || 0) +
          (Number(investment.totalUnits ?? investment.regularBalanceUnits) ||
            0);
      }
    });

    source?.sdbInvestmentBalances?.forEach((investment) => {
      if (Number(investment?.modelPortfolioInvestmentType ?? 0) !== 0) {
        return;
      }

      const investId = investment.investmentId;
      if (!grouped[investId]) {
        grouped[investId] = {
          ...investment,
          totalUnits: Number(investment.totalUnits ?? 0) || 0,
          _showUnitsNav: false,
        };
      } else {
        grouped[investId]["totalAccountBalance"] =
          (Number(grouped[investId]["totalAccountBalance"]) || 0) +
          (Number(investment["totalAccountBalance"]) || 0);
        grouped[investId]["sdbCashBalance"] =
          (Number(grouped[investId]["sdbCashBalance"]) || 0) +
          (Number(investment["sdbCashBalance"]) || 0);
        grouped[investId]["sdbAssertBalance"] =
          (Number(grouped[investId]["sdbAssertBalance"]) || 0) +
          (Number(investment["sdbAssertBalance"]) || 0);
        grouped[investId].totalUnits =
          (Number(grouped[investId].totalUnits ?? 0) || 0) +
          (Number(investment.totalUnits ?? 0) || 0);
      }
    });

    source?.modelPortfolioInvestmentBalances?.forEach((investment) => {
      const investId = investment.investmentId;
      if (!grouped[investId]) {
        grouped[investId] = {
          ...investment,
          totalUnits:
            Number(investment.totalUnits ?? investment.regularBalanceUnits) ||
            0,
          _showUnitsNav: false,
        };
      } else {
        grouped[investId]["totalAccountBalance"] =
          (Number(grouped[investId]["totalAccountBalance"]) || 0) +
          (Number(investment["totalAccountBalance"]) || 0);
        grouped[investId].totalUnits =
          (Number(
            grouped[investId].totalUnits ??
              grouped[investId].regularBalanceUnits
          ) || 0) +
          (Number(investment.totalUnits ?? investment.regularBalanceUnits) ||
            0);
      }
    });

    return Object.values(grouped);
  }

  const sources = get(accountBalanceByPlanResponse, "sources", []);

  function getTotalAmount(idx) {
    let totalAmt = 0;
    const allInvestments = groupInvestmentsForSource(sources[idx]);

    allInvestments?.map(
      (eachInv) => (totalAmt += eachInv["totalAccountBalance"])
    );

    return totalAmt;
  }

  const labels = get(accountBalanceByPlanResponse, "sources", [])?.map(
    (element) => {
      if (
        element.sourceCategory === 2 &&
        element.sourceSubCategory === 5 &&
        element.sourceSubSubCategory === 3
      ) {
        return "In Plan Roth Conversion";
      }
      return element["sourceName"];
    }
  );

  const data = sources?.map((source, index) => {
    const rawResult =
      getTotalAmount(index) / accountBalanceByPlanResponse.totalAccountBalance;
    const roundedResult = Math.round(rawResult * 100 * 100) / 100;
    return roundedResult;
  });
  const dataChart = sources
    ?.map((source, index) => {
      const total = getTotalAmount(index);

      if (
        total === 0 ||
        accountBalanceByPlanResponse.totalAccountBalance === 0
      ) {
        return null;
      }

      const rawResult =
        total / accountBalanceByPlanResponse.totalAccountBalance;

      return Number((rawResult * 100).toFixed(2));
    })
    ?.filter((val) => val !== null);

  const labelsChart =
    dataChart && dataChart.length > 0
      ? sources
          ?.map((element, index) => {
            const total = getTotalAmount(index);

            if (total === 0) return null;

            if (
              element.sourceCategory === 2 &&
              element.sourceSubCategory === 5 &&
              element.sourceSubSubCategory === 3
            ) {
              return "In Plan Roth Conversion";
            }
            return element["sourceName"];
          })
          ?.filter((val) => val !== null)
      : [];

  return (
    <div className="cusstyrow ml-10px ml-0">
      <div className="w-25">
        <Piechartsummary
          labels={labelsChart}
          data={dataChart}
          colors={PieChartColors}
        />
      </div>

      <div className="w-75">
        {labels !== undefined && !isEmpty(labels) && (
          <div className="balancesummaryheadingstext cusstyrowspcbtw">
            <p className={`subtle-least-text-color fs-14px fw-600 m-0`}>
              Source Name
            </p>
            <p className={`subtle-least-text-color fs-14px fw-600 m-0`}>
              Source Balance
            </p>
          </div>
        )}

        {labels.map((cn, idx) => {
          const sourceTotalAmount = getTotalAmount(idx);
          const allInvestments = groupInvestmentsForSource(sources[idx]);

          // Check if tree structure should be non-expandable
          const shouldDisableExpansion =
            accountBalanceByPlanResponse?.planType === 18;

          return (
            <div key={idx} className="bl-pt-aftx-rth-ctr">
              <AddTreeStructure
                page="BalanceSummarySource"
                data={[
                  {
                    head: cn,
                    amount: getTotalAmount(idx),
                    field: getAmountWithPercentage(
                      sourceTotalAmount,
                      accountBalanceByPlanResponse?.totalAccountBalance
                    ),
                    subHead: allInvestments?.map((eachInv) => ({
                      name: eachInv["name"],
                      amount: eachInv["totalAccountBalance"],
                      field: getAmountWithPercentage(
                        eachInv["totalAccountBalance"],
                        sourceTotalAmount
                      ),
                      footerSubText:
                        eachInv?.investmentType == 10
                          ? sources[idx].sdbAccountNumber
                          : eachInv._showUnitsNav
                          ? getUnitsAndNavLabel(eachInv)
                          : null,
                    })),
                  },
                ]}
                disableExpansion={shouldDisableExpansion}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BalanceSummarySourceTab;
