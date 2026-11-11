import React from "react";
import styles from "./DocumentDelivery.module.scss";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import FormButtonGroup from "@/components/FormButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/pro-solid-svg-icons";

const deliveryModeOptions = [
  { label: "Email only", value: "email" },
  { label: "Email & Paper", value: "emailPost" },
];

const columns = [
  { label: "Document name", field: "name" },
  { label: "Delivery mode", field: "deliveryMode" },
];

const DocumentDeliveryTable = ({
  documents,
  disabled,
  isRowDisabled,
  onDeliveryModeChange,
  scrollable = true,
  fieldErrors = {},
  showPaperMailInactiveMessage = false,
}) => {
  const resolveDisabled = (doc) => {
    if (typeof isRowDisabled === "function") return isRowDisabled(doc);
    return !!disabled;
  };
  const shouldShowPaperMailInactiveMessage =
    showPaperMailInactiveMessage &&
    documents?.some((doc) => doc?.isDisabled === true);

  const renderCell = (value) => {
    const field = value.field;
    const dataItem = value.dataItem;

    if (field === "name") {
      return (
        <td>
          <div className="d-flex flex-column">
            <div className="core-body-text-large-semi-bold">
              {dataItem.name}
            </div>
            {dataItem.sub && (
              <div className="core-body-text-regular-semi-bold-sl">
                {dataItem.sub}
              </div>
            )}
          </div>
        </td>
      );
    }

    if (field === "deliveryMode") {
      const error = fieldErrors[dataItem.id];
      return (
        <td>
          <FormButtonGroup
            options={deliveryModeOptions}
            selectedValue={dataItem.deliveryMode}
            onChange={(val) => onDeliveryModeChange(dataItem.id, val)}
            disabled={resolveDisabled(dataItem)}
            disabledValues={dataItem.isDisabled ? ["emailPost"] : []}
          />
          {error && (
            <div className="input-critical-text-flair d-flex flex-row mt-1 mb-1">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="mr-2 mt-1"
              />
              {error}
            </div>
          )}
        </td>
      );
    }

    return <td>{dataItem[field]}</td>;
  };

  if (!documents || documents.length === 0) {
    return (
      <div
        className={`${styles.gridWrapper}${
          scrollable ? "" : " " + styles.noScroll
        }`}
      >
        <Grid data={[]} fixedScroll={false} style={{ width: "100%" }}>
          {columns.map((column, idx) => (
            <GridColumn key={idx} field={column.field} title={column.label} />
          ))}
        </Grid>
      </div>
    );
  }

  return (
    <div
      className={`${styles.gridWrapper}${
        scrollable ? "" : " " + styles.noScroll
      }`}
    >
      {shouldShowPaperMailInactiveMessage && (
        <div className="core-body-text-regular d-flex flex-row mb-3">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2 mt-1" />
          Email and Paper is disabled as paper mail integration is currently
          inactive.
        </div>
      )}
      <Grid data={documents} fixedScroll={false} style={{ width: "100%" }}>
        {columns.map((column, idx) => (
          <GridColumn
            key={idx}
            field={column.field}
            title={column.label}
            cells={{ data: renderCell }}
          />
        ))}
      </Grid>
    </div>
  );
};

export default DocumentDeliveryTable;
