import React from "react";
import AddToolTip from "../AddToolTip";
import { get } from "lodash-es";
const PayrollFileName = (props) => {
  return (
    <>
      {get(props, "fileName", "")?.length > 25 ? (
        <AddToolTip placement={"right"} name={get(props, "fileName", "")}>
          <div className="para-wrap d-flex ml-0 pr-1">
            <div className="core-body-text-regular-bold">
              {(get(props, "fileName", "") || "").slice(0, 8)}...
              {(get(props, "fileName", "") || "").slice(
                get(props, "fileName", "")?.length - 16,
                get(props, "fileName", "")?.lastIndexOf(".")
              )}
            </div>
            <div
              className={`subtle-least-text-color core-body-text-regular-bold-sl`}
            >
              {(get(props, "fileName", "") || "").slice(
                get(props, "fileName", "")?.lastIndexOf("."),
                get(props, "fileName", "")?.length
              )}{" "}
            </div>
          </div>
        </AddToolTip>
      ) : (
        <div className="para-wrap d-flex payroll-fl">
          <div className="core-body-text-regular-bold">
            {get(props, "fileName", "")?.slice(
              0,
              get(props, "fileName", "")?.lastIndexOf(".")
            )}
          </div>

          {get(props, "fileName", "")?.includes(".") && (
            <div className="default-text-color">
              {get(props, "fileName", "")?.slice(
                get(props, "fileName", "")?.lastIndexOf("."),
                get(props, "fileName", "")?.length
              )}{" "}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PayrollFileName;
