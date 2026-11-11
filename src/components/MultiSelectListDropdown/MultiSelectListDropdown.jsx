import React, { useState } from "react";
import { useEffect } from "react";
import LoaderWrapper from "@/components/LoaderWrapper";
import AddToolTip from "../AddToolTip";

const MultiSelectListDropdown = ({
  setTransformedValues,
  transformedValues,
  name,
  onSelect = () => {},
  isLoading,
  height,
  width,
  maxHeight,
  zIndex,
  background,
  overflow,
  position,
}) => {
  const totalSelected = transformedValues?.filter((_) => _?.checked)?.length;
  const isAllSelected = totalSelected === transformedValues?.length;
  const [selectAll, setSelectAll] = useState(isAllSelected ? true : false);
  useEffect(() => {
    isAllSelected ? setSelectAll(true) : setSelectAll(false);
  });
  const onSelectAllClick = () => {
    if (!selectAll) {
      var temOptions = transformedValues?.map((item, ind) => {
        return { ...item, checked: true };
      });
      setTransformedValues(temOptions);
      onSelect(temOptions.filter((_) => _.checked).map((item) => item.value));
    } else {
      var temOptions = transformedValues.map((item, ind) => {
        return { ...item, checked: false };
      });
      setTransformedValues(temOptions);
      onSelect(temOptions.filter((_) => _.checked).map((item) => item.value));
    }
  };

  const onOptionClick = (value, index) => {
    var temOptions = transformedValues.map((item, ind) => {
      if (ind == index) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setSelectAll(temOptions.every((_) => _.checked));
    setTransformedValues(temOptions);
    onSelect(temOptions.filter((_) => _.checked).map((item) => item.value));
  };
  const rowItemFocus = (e, isFocus) => {
    const targetElement = e.target.parentElement;
    if (targetElement) {
      const classNames = targetElement.getAttribute("class");
      if (isFocus) {
        targetElement.setAttribute("class", `${classNames} focus`);
      } else {
        targetElement.setAttribute("class", classNames.replace(" focus", ""));
      }
    }
  };

  return (
    <div
      className={"pl-0 pr-0"}
      style={{
        height,
        width,
        maxHeight,
        zIndex,
        background,
        position,
        padding: "15px",
        overflowY: maxHeight ? "auto" : undefined,
        boxSizing: "border-box",
      }}
    >
      <LoaderWrapper isLoading={isLoading}>
        <div className="filter-status pl-1">
          <div>
            <div className="d-flex mb-8px">
              <input
                custom
                name={name}
                type="checkbox"
                onClick={() => {
                  setSelectAll(!selectAll);
                  onSelectAllClick();
                }}
                checked={selectAll}
                onFocus={(e) => rowItemFocus(e, true)}
                onBlur={(e) => rowItemFocus(e, false)}
                className="cursor-pointer mt-5px"
              />
              <div className="statusfee-font pl-1">Select All</div>
            </div>
          </div>
          <>
            {transformedValues?.map((item, index) => {
              return (
                <div>
                  <div className="d-flex mb-8px">
                    <input
                      custom
                      name={name}
                      type="checkbox"
                      onClick={() => {
                        onOptionClick(item, index);
                      }}
                      label={
                        item.label && item.label.length > 25 && overflow ? (
                          <AddToolTip name={item.label}>
                            {item.label.slice(0, 25)}...
                          </AddToolTip>
                        ) : (
                          item.label
                        )
                      }
                      checked={item.checked}
                      id={`custom-radio-${name}-${item.value}`}
                      key={`custom-radio-${name}-${item.value}`}
                      className="cursor-pointer mt-5px"
                    />
                    <AddToolTip
                      name={item.label}
                      className="statusfee-font pl-1"
                    >
                      {item.label}
                    </AddToolTip>
                  </div>
                </div>
              );
            })}
          </>
        </div>
      </LoaderWrapper>
    </div>
  );
};

MultiSelectListDropdown.defaultProps = {
  options: [],
  value: [],
  hideSelectedOptions: true,
};
export default MultiSelectListDropdown;
