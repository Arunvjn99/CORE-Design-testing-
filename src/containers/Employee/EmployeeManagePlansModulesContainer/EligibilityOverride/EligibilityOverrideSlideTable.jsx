import React, { useState } from "react";
import { get } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/pro-light-svg-icons";
import AddToolTip from "@/components/AddToolTip";
import Table from "@/components/CsplTable";
import moment from "moment";
import { OPTIONS_DATA_MAPPER } from "@/utils/constants/common";
import { usDateFormat } from "@/utils/helpers";

const columns = [
  {
    label: "",
    className: "w-5 pl-1p5r",
    columnName: "icon",
  },
  {
    label: "Eligibility status",
    className: "w-10",
    columnName: "eligibilityStatus",
    //dataMapper: OPTIONS_DATA_MAPPER.ELIBILITY_STATUS,
  },
  {
    label: "Eligibility requirement met date",
    className: "w-20",
    columnName: "eligibilityRequirementMetDate",
    type: "date",
  },
  {
    label: "Entry date",
    className: "w-12_5",
    columnName: "entryDate",
    type: "date",
  },
  {
    label: "Eligibility run date",
    className: "w-15",
    columnName: "eligibilityRunDate",
    type: "datetime",
  },
  {
    label: "Anchor eligibility",
    className: "w-12_5",
    columnName: "anchorEligibility",
    type: "boolean",
  },
  {
    label: "Eligibility Basis",
    className: "w-12_5",
    columnName: "eligibilityBasis",
    dataMapper: OPTIONS_DATA_MAPPER.ELIGIBILITY_BASIS,
  },
  {
    label: "Effective start date",
    className: "w-12_5",
    columnName: "effectiveStartDate",
    type: "date",
  },
  {
    label: "Effective end date",
    className: "w-12_5",
    columnName: "effectiveEndDate",
    type: "date",
  },
];

const RowGroup = ({ index, eligibilityDetail }) => {
  const [showAccordion, setShowAccordion] = useState(false);
  const className = showAccordion ? "open" : "";
  return (
    <div className="accordion-wrap">
      <Table.Tr
        key={index}
        onClick={() => setShowAccordion(!showAccordion)}
        className={`parent-row ${className} accordion-header`}
      >
        {columns.map((item, cellIndex) => {
          const getContent = () => {
            const columnName = item.columnName;
            if (item.dataMapper) {
              return item.dataMapper[eligibilityDetail[columnName]];
            }
            if (columnName === "eligibilityBasis") {
              const basisMap = {
                0: " ",
                1: "Normal",
                2: "LTPT",
                3: "FLTPT",
              };
              return basisMap[eligibilityDetail.eligibilityBasis] ?? " ";
            }
            if (item.type === "boolean") {
              return eligibilityDetail[columnName] ? "Yes" : "No";
            }
            if (item.type === "date") {
              return usDateFormat(eligibilityDetail[item.columnName]);
            }
            if (item.columnName === "icon") {
              return (
                <FontAwesomeIcon
                  icon={!showAccordion ? faChevronRight : faChevronDown}
                  className="accordion-icon"
                />
              );
            }
            if (item.columnName === "eligibilityRunDate") {
              return (
                moment(new Date(eligibilityDetail[columnName])).format(
                  "MM/DD/YYYY"
                ) +
                " " +
                moment(new Date(eligibilityDetail[columnName])).format("HH:mm")
              );
            } else return eligibilityDetail[columnName];
          };
          return (
            <Table.Td key={cellIndex} className={item.className}>
              {getContent()}
            </Table.Td>
          );
        })}
      </Table.Tr>
      {showAccordion && (
        <Table.Tr key={index} className="accordion-child">
          {/* <Table.Td className="icon" /> */}
          <Table.Td className="w-100 accordion-row">
            <div className="d-flex justify-content-between w-100">
              <div className="w-21">
                <div className="core-body-text-regular-semi-bold-sl">
                  Payroll based eligibility
                </div>
                <div className="core-body-text-regular-medium">
                  {eligibilityDetail.payrollBasedEligibility ? "Yes" : "No"}
                </div>
              </div>
              <div className="w-15">
                <div className="core-body-text-regular-semi-bold-sl">Rule</div>
                <div className="core-body-text-regular-medium">
                  <AddToolTip name={eligibilityDetail.rule} />
                </div>
              </div>
              <div className="w-16">
                <div className="core-body-text-regular-semi-bold-sl">
                  Reason
                </div>
                <div className="core-body-text-regular-medium">
                  <AddToolTip name={eligibilityDetail.reason} />
                </div>
              </div>
              <div className=" w-15">
                <div className="core-body-text-regular-semi-bold-sl">
                  Correction record
                </div>
                <div className="core-body-text-regular-medium">
                  {eligibilityDetail.correctionRecord ? "Yes" : "No"}
                </div>
              </div>
              <div className=" w-16">
                <div className="core-body-text-regular-semi-bold-sl">
                  Updated through
                </div>
                <div className="core-body-text-regular-medium">
                  <AddToolTip name={eligibilityDetail.updatedThrough} />
                </div>
              </div>
              <div className=" w-16">
                <div className="core-body-text-regular-semi-bold-sl">
                  Updated by
                </div>
                <div className="core-body-text-regular-medium">
                  <AddToolTip name={eligibilityDetail.updatedBy} />
                </div>
              </div>
            </div>
          </Table.Td>
        </Table.Tr>
      )}
    </div>
  );
};

const EligibilityOverrideSlideTable = ({ data }) => {
  return (
    <div className="eligibiliy-slider-table overflow-hidden">
      {/* <div>
        <div className="plan-sub-heading">Eligibility history</div>
      </div> */}
      <div className="history-eligibility-scroll">
        <div className="header-details">
          <div className="core-body-text-large-semi-bold">Source name</div>
          <div className="core-body-text-regular-semi-bold">
            {get(data, "sourceName")}
          </div>
        </div>
        <br />
        <div />
        <Table className="eligibility-override">
          <Table.Thead className="eligibility-title">
            {columns.map((item, index) => {
              return (
                <Table.Th key={index} className={item.className}>
                  {item.label}
                </Table.Th>
              );
            })}
          </Table.Thead>
          <Table.Tbody>
            {get(data, "history", []).map((eligibilityDetail, index) => {
              return (
                <RowGroup
                  key={index}
                  eligibilityDetail={eligibilityDetail}
                  index={index}
                />
              );
            })}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default EligibilityOverrideSlideTable;
