import React from "react";
import AddToolTip from "@/components/AddToolTip";
import FieldInputPercentage from "@/components/Forms/FieldInputPercentage";
import Table from "@/components/CsplTable";
import { Form } from "react-bootstrap";
import { Field } from "formik";

const columns = [
  {
    label: "Investment",
    className: "column-investment-name",
    columnName: "investmentName",
  },
  {
    label: "Percentage",
    className: "column-investment-percentage",
    columnName: "percentage",
  },
];

const InvestmentAllocation = ({ investmentElection }) => {
  const totalAmount = () => {
    let sum = 0;
    investmentElection.map((_) => {
      sum = sum + (_?.allocationPercentage ?? _?.investmentPercentage);
    });
    return sum;
  };

  return (
    <div>
      <div className="mt-3 w-75">
        <div>
          <Table>
            <Table.Thead>
              {columns.map((item, index) => {
                return (
                  <Table.Th key={index} className={`${item.className} fw-500`}>
                    {item.label}
                  </Table.Th>
                );
              })}
            </Table.Thead>
            <Table.Tbody>
              {investmentElection?.map((investment, index) => {
                return (
                  <Table.Tr key={index} className="d-flex align-items-baseline">
                    <Table.Td className="column-investment-name">
                      {investment.investmentName.length > 20 ? (
                        <AddToolTip name={investment.investmentName}>
                          <div className="main-font">
                            {(investment.investmentName || "").slice(0, 20)}
                            ...
                          </div>
                        </AddToolTip>
                      ) : (
                        <div className="main-font">
                          {investment.investmentName}
                        </div>
                      )}
                    </Table.Td>
                    <Table.Td className="column-investment-percentage">
                      <Form
                        autoComplete="off"
                        className="h-100p percentage-field"
                      >
                        <Field
                          size="xs"
                          isRequired
                          name="employeeTax"
                          hasSuggestion
                          shouldDisplaySuggestion
                          value={
                            investment?.allocationPercentage ??
                            investment?.investmentPercentage
                          }
                          disabled={true}
                          component={FieldInputPercentage}
                          type="number"
                          autoComplete="off"
                        />
                      </Form>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
            <Table.Tbody>
              <Table.Tr className={"d-flex align-items-baseline"}>
                <Table.Td className="column-investment-name fw-500">
                  Total
                </Table.Td>
                <Table.Td className="column-investment-percentage">
                  <Form autoComplete="off" className="h-100p percentage-field">
                    <Field
                      size="xs"
                      isRequired
                      name="totalBox"
                      hasSuggestion
                      shouldDisplaySuggestion
                      component={FieldInputPercentage}
                      type="number"
                      value={totalAmount()}
                      autoComplete="off"
                      disabled
                    />
                  </Form>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAllocation;
