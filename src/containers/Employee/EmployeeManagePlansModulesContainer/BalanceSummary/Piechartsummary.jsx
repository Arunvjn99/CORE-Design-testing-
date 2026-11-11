import styles from "./Piechartsummary.module.scss";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import AddToolTip from "../../../../SDUI/components_library/3rdOrder/AddToolTip";

const PieChartSummary = ({ labels, data, colors }) => {
  const pieData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
      },
    ],
  };
  ChartJS.register(ChartDataLabels);

  return (
    <div className={`pt-20px`}>
      <Pie
        data={pieData}
        options={{
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
          plugins: {
            datalabels: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
      <div className={`${styles["p-l-0px-v2"]}`}>
        {labels.map((dataEntry, index) => (
          <div className="d-flex justify-content-between">
            <div
              key={index}
              className={`${styles["m-b-5px-flex-items-center"]} justify-content-start`}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: colors[index],
                  marginRight: "5px",
                  borderRadius: "35px",
                }}
              ></div>
              &nbsp;
              {dataEntry?.length > 15 ? (
                <AddToolTip name={dataEntry} className="fs-16px fw-600 w-80">
                  {dataEntry?.slice(0, 15)}...
                </AddToolTip>
              ) : (
                <span className="fs-16px fw-600">{dataEntry}</span>
              )}
            </div>
            <div className="justify-content-end">{data[index]} %</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartSummary;
