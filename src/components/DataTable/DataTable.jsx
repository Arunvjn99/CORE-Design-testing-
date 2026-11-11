import React, { useState } from "react";
import Table from "../CsplTable/CsplTable";
import { orderBy } from "lodash-es";
import { Form } from "react-bootstrap";
import { useDeepEffect } from "@/abstracts/hooks";
import { Virtuoso } from "react-virtuoso";

export default function DataTable({
  columns,
  Data,
  getContent,
  onSortClick = null,
  className = "",
  name = "sortData",
  offset = 20,
  isLoading = false,
  istotalDetails = false,
  isInfiniteScroll = false,
  loadMoreFunc = null,
  height = "min-height",
  onHeaderCheckboxClick = null,
  isHeaderConsitsCheck = false,
  isAllChecked = false,
  stopInfiniteScroll = false,
  scrollCallBack = null,
  headerClassName,
  bodyClassName = "",
  isTotalAmount = false,
  totalAmountContent = null,
  ...props
}) {
  const lastItem = Data?.slice(-1);
  const [sortData, setSortData] = useState([]);
  const [sortStatus, setSortStatus] = useState({});
  useDeepEffect(() => {
    if (istotalDetails) {
      const DataothT = Data?.slice(0, -1);
      setSortData(DataothT);
    } else {
      setSortData(Data);
    }
  }, [Data, istotalDetails]);

  const handleSort = (sortDetails, columnName) => {
    const sortedData = orderBy(
      sortData,
      [
        (item) => {
          const value = item[columnName];

          if (typeof value === "string") {
            return value.toLowerCase();
          }

          return value;
        },
      ],
      [sortDetails]
    );
    setSortData(sortedData);
  };

  const renderRow = (index) => {
    const detail = sortData[index];
    if (!detail) {
      return null;
    }
    return getContent(detail, index) ? (
      <Table.Tr key={index} className="core-body-text-regular-semi-bold">
        {getContent(detail, index)}
      </Table.Tr>
    ) : null;
  };

  return (
    <>
      {isLoading && (
        <div className="spinner-loader">
          <div className="mb-2 loader-wrapper-overlay" />
          <div className="mt-3 textloader">Loading</div>
        </div>
      )}
      <Table className={className}>
        <Table.Thead className={`${headerClassName}`}>
          {columns.map((item, index) => {
            if (index === 0 && isHeaderConsitsCheck) {
              return (
                <Table.Th
                  key={index}
                  className={item.className}
                  style={item?.style}
                >
                  <Form.Check
                    className="checkbox"
                    name="master-sources-radio-head"
                    type="checkbox"
                    label=""
                    id={`master-sources-radio-head`}
                    onChange={onHeaderCheckboxClick}
                    checked={isAllChecked}
                  />
                </Table.Th>
              );
            } else {
              return (
                <Table.Th
                  key={index}
                  isSortable={item?.isSortable}
                  sortStatus={sortStatus}
                  setSortStatus={setSortStatus}
                  columnName={item?.columnName}
                  onSortClick={(sortDetails) => {
                    if (onSortClick) {
                      onSortClick(sortDetails, item?.columnName);
                    } else {
                      handleSort(sortDetails, item?.columnName);
                    }
                  }}
                  className={` ${item?.className} `}
                  style={item?.style}
                >
                  {item?.label}
                </Table.Th>
              );
            }
          })}
        </Table.Thead>
        <Table.Tbody scrollCallBack={scrollCallBack} className={bodyClassName}>
          {sortData?.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center core-body-text-large-medium mt-5">
              No record(s) found.
            </div>
          ) : isInfiniteScroll ? (
            <Virtuoso
              style={{ height: height === "min-height" ? "400px" : height }}
              data={sortData}
              endReached={() => {
                if (!stopInfiniteScroll && loadMoreFunc) {
                  loadMoreFunc();
                }
              }}
              itemContent={(index) => renderRow(index)}
              overscan={200}
            />
          ) : (
            sortData?.map((detail, index) => renderRow(index))
          )}
          {istotalDetails && (
            <Table.Tr key={Data?.length || 0} className="table-footer-details">
              {lastItem &&
                lastItem?.length !== 0 &&
                getContent(lastItem[0], Data?.length || 0)}
            </Table.Tr>
          )}
          {isTotalAmount && totalAmountContent}
        </Table.Tbody>
      </Table>
    </>
  );
}
