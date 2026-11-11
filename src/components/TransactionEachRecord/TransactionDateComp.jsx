import React from "react";
function TransactionDateComp({
  sider = null,
  header = null,
  TxnDate,
  fromEmployee = false,
  splitlen = 8,
  fromRecords = false,
  fontSize = false,
}) {
  return (
    <div>
      {header == null ? (
        <div
          // className={
          //   !fromEmployee ? "transacreccoldate" : "transacreccoldate-emp"
          // }
          style={{
            paddingLeft: fromRecords ? "0px" : null,
            paddingRight: fromRecords ? "0px" : null,
          }}
        >
          <div
            className={`${
              fontSize
                ? "core-body-text-large-bold"
                : "core-body-text-regular-semi-bold"
            }`}
          >
            {TxnDate.substring(0, splitlen)}
          </div>
          <div className="core-body-text-regular-semi-bold-sl">
            {TxnDate.substring(splitlen)}
          </div>
        </div>
      ) : (
        <div>
          {header != null && (
            <div className="core-body-text-regular-semi-bold-sl mb-1">
              {header}
            </div>
          )}
          <div
          // className={`${
          //   !fromEmployee ? "transacreccoldate" : "transacreccoldate-emp"
          // } core-body-text-regular-semi-bold justify-content-start`}
          >
            {sider != null && (
              <div className="core-body-text-regular-semi-bold">
                {sider} &nbsp;|&nbsp;
              </div>
            )}
            <div>{TxnDate.substring(0, splitlen)}</div>
            <div className="core-body-text-regular-semi-bold-sl">
              {TxnDate.substring(splitlen)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionDateComp;
