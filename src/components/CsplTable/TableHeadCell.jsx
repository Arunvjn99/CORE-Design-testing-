import { faSort } from "@fortawesome/pro-solid-svg-icons";
import { faSort as faSortLight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isNullOrUndefined } from "@microsoft/applicationinsights-core-js";
import React, { useState, useEffect } from "react";

const TableHeadCell = ({
  children,
  className,
  isSortable,
  onSortClick = null,
  orderBy,
  style = {},
  columnName = null,
  sortStatus,
  setSortStatus,
}) => {
  const [sortOrder, setSortOrder] = useState(orderBy);

  useEffect(() => {
    setSortOrder(orderBy);
  }, [orderBy]);

  const onSortIconClick = () => {
    if (!isNullOrUndefined(columnName)) {
      setSortStatus({ [columnName]: true });
    }
    const newOrder = ["desc", ""].includes(sortOrder) ? "asc" : "desc";
    setSortOrder(newOrder);
    onSortClick(newOrder);
  };
  return (
    <div className={`d-flex table-head-cell ${className}`} style={style}>
      <div className="d-flex core-body-text-regular-medium-s align-items-center">
        {children}
        {isSortable && (
          <FontAwesomeIcon
            className="ml-2 cursor-pointer"
            icon={
              !isNullOrUndefined(columnName) &&
              (sortStatus[columnName] ? faSort : faSortLight)
            }
            onClick={() => onSortIconClick()}
          />
        )}
      </div>
    </div>
  );
};

export default TableHeadCell;
