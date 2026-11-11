import styles from "./MultiSelectDropdown.module.scss";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEmpty, toLower, camelCase } from "lodash-es";
import React, { useState, useEffect } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import FormControl from "@/components/FormControl";
import LoaderWrapper from "@/components/LoaderWrapper";
import { useDeepEffect } from "@/abstracts/hooks";
import AddToolTip from "../AddToolTip";
import FormControlSearch from "../FormControlSearch";
import { getTestId } from "@/SDUI/utils/testIds";

const MultiSelectDropdownForSDUI = ({
  showLabelOnly = false,
  showSeparator = false,
  label,
  options,
  value,
  name,
  disabled,
  onSelect,
  isLoading,
  height,
  width,
  trigger,
  maxHeight,
  zIndex,
  background,
  overflow,
  position,
  isTypeAhead = false,
  isReset = false,
  placeholder,
  hideSelectedOptions,
  setToggle,
  isAllSelecetedByDefault = false,
  isArrayOfObjects = false,
  objectKey = null,
  onOptionClick = null,
  isSelectAllClick = null,
  showSelectAll = true,
  screenName = null,
  isNewLayout = false,
  isStockSplit,
  onAsyncChange,
  asyncChangesRequired = false,
  includeSecondLabel = false,
  groupBy = null,
  isManagePage = false,
  size = "xs",
  isNoLabelTransform = false,
  isCustomTooltipenabled = false,
  tradeCategory = false,
  onScrollEnd,
  onSearch,
  onClose,
  testId,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [queriedValue, setQueriedValue] = useState("");
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [transformedValues, setTransformedValues] = useState([]);
  const totalSelected = selectedOptions.length;
  const qvalue = options.filter(
    (item) =>
      toLower(item.label).includes(toLower(queriedValue)) ||
      toLower(item?.label1).includes(toLower(queriedValue))
  );
  const isAllSelected = queriedValue
    ? totalSelected >=
      options.filter(
        (item) =>
          toLower(
            item?.label?.props?.children?.props?.name
              ? item?.label?.props?.children?.props?.name
              : item.label
          )?.includes(toLower(queriedValue)) ||
          toLower(
            item?.label1?.props?.children?.props?.name
              ? item?.label1?.props?.children?.props?.name
              : item?.label1
          ).includes(toLower(queriedValue))
      ).length
    : totalSelected === options.length;
  const isAllDisabled =
    options.filter((_) => _.disabled === true)?.length === options.length
      ? true
      : false;
  useEffect(() => {
    const selectedOptionsOnMount = [];
    const allSelected =
      options?.length > 0 && options?.length === value?.length;
    setTransformedValues(
      isArrayOfObjects
        ? options?.map((item) => {
            if (value && value.some((e) => e[objectKey] == item.value)) {
              selectedOptionsOnMount.push(item);
            }
            return {
              ...item,
              checked: value && value.some((e) => e[objectKey] == item.value),
            };
          })
        : options?.map((item) => {
            if ((value || []).includes(item.value)) {
              selectedOptionsOnMount.push(item);
            }
            return {
              ...item,
              checked: (value || []).includes(item.value),
            };
          })
    );
    setSelectedOptions(selectedOptionsOnMount);
    setIsSelectAll(allSelected);
    if (isAllSelecetedByDefault) {
      onSelectAllClick();
      setToggle(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useDeepEffect(() => {
    const selectedOptionsOnMount = [];
    setTransformedValues(
      isArrayOfObjects
        ? options?.map((item) => {
            if (value && value.some((e) => e[objectKey] == item.value)) {
              selectedOptionsOnMount.push(item);
            }
            return {
              ...item,
              checked: value && value.some((e) => e[objectKey] == item.value),
            };
          })
        : options?.map((item) => {
            if ((value || []).includes(item.value)) {
              selectedOptionsOnMount.push(item);
            }
            return {
              ...item,
              checked: (value || []).includes(item.value),
            };
          })
    );
    setSelectedOptions(selectedOptionsOnMount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, options]);
  useEffect(() => {
    return () => {
      setQueriedValue("");
      onClose?.();
    };
  }, []);
  const onValueChange = (selectedItem) => {
    const totalChecked = [];
    setTransformedValues(
      transformedValues.map((item) => {
        const checked =
          selectedItem.value === item.value ? !item.checked : item.checked;
        if (checked) {
          totalChecked.push(item);
        }
        return {
          ...item,
          checked,
        };
      })
    );
    onSelect(totalChecked.map(({ value }) => value));
    setSelectedOptions(totalChecked);

    const allSelectableOptions = options.filter((item) => !item.disabled);
    const isAllOptionsSelected =
      totalChecked.length === allSelectableOptions.length;
    setIsSelectAll(isAllOptionsSelected);
  };
  const clearChecked = () => {
    const tempTransformedValues = transformedValues.map((item) => ({
      ...item,
      checked: item.disabled ? item.checked : false,
    }));
    const checkedOptions = tempTransformedValues.filter((_) => _.checked);
    setTransformedValues(tempTransformedValues);
    onSelect(checkedOptions.map(({ value }) => value));
    setSelectedOptions(checkedOptions);
    asyncChangesRequired && isSelectAllClick(checkedOptions);
    if (checkedOptions.length === 0) {
      setIsSelectAll(false);
    }
  };

  const onSelectAllClick = () => {
    const tran = queriedValue
      ? options.filter(
          (item) =>
            toLower(
              item?.label?.props?.children?.props?.name
                ? item?.label?.props?.children?.props?.name
                : item.label
            )?.includes(toLower(queriedValue)) ||
            toLower(
              item?.label1?.props?.children?.props?.name
                ? item?.label1?.props?.children?.props?.name
                : item?.label1
            ).includes(toLower(queriedValue))
        )
      : options;
    setTransformedValues(
      tran.map((item) => ({
        ...item,
        checked:
          isAllSelected && isSelectAll && item?.disabled !== true
            ? false
            : true,
      }))
    );
    const allSelectedOptions =
      isAllSelected && isSelectAll
        ? options?.filter((_) => _.disabled === true) ?? []
        : queriedValue
        ? options.filter(
            (item) =>
              toLower(
                item?.label?.props?.children?.props?.name
                  ? item?.label?.props?.children?.props?.name
                  : item.label
              )?.includes(toLower(queriedValue)) ||
              toLower(
                item?.label1?.props?.children?.props?.name
                  ? item?.label1?.props?.children?.props?.name
                  : item?.label1
              ).includes(toLower(queriedValue))
          )
        : options;
    setSelectedOptions(allSelectedOptions);
    asyncChangesRequired && isSelectAllClick(allSelectedOptions);
    isArrayOfObjects && isSelectAllClick(allSelectedOptions);
    onSelect(allSelectedOptions.map(({ value }) => value));
    setIsSelectAll(!isSelectAll);
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

  const optionsItem = [];
  const optionGroups = new Map();
  let visibleOptionCount = 0;
  const addOptionItem = (item, option) => {
    visibleOptionCount += 1;
    if (!groupBy) {
      optionsItem.push(option);
      return;
    }

    const groupLabel = item[groupBy];
    const groupKey = groupLabel || "";
    if (!optionGroups.has(groupKey)) {
      optionGroups.set(groupKey, { label: groupLabel, items: [] });
    }
    optionGroups.get(groupKey).items.push(option);
  };
  transformedValues.forEach((item, index) => {
    if (
      onSearch ||
      !queriedValue ||
      toLower(
        item?.label?.props?.children?.props?.name
          ? item?.label?.props?.children?.props?.name
          : item.label
      )?.includes(toLower(queriedValue)) ||
      toLower(
        item?.label1?.props?.children?.props?.name
          ? item?.label1?.props?.children?.props?.name
          : item?.label1
      ).includes(toLower(queriedValue))
    ) {
      if (disabled) {
        if (item.checked) {
          addOptionItem(
            item,
            <div className={`fs-12px fw-400 d-flex align-items-center`}>
              <input
                name={name}
                disabled={disabled || item?.disabled}
                type="checkbox"
                label={
                  item.label.length > 25 && overflow ? (
                    <AddToolTip name={item.label}>
                      {item.label.slice(0, 25)}...
                    </AddToolTip>
                  ) : (
                    item.label
                  )
                }
                value={
                  item.label.length > 25 && overflow ? (
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
                data-testid={
                  testId &&
                  getTestId(
                    `${testId.split("-")[0]}-checkbox-${
                      camelCase(name) || "option"
                    }${index + 1}`
                  )
                }
              />
              <button className="pl-1">
                {item?.label.length > 30 ? (
                  <AddToolTip name={item.label}>
                    {item.label.slice(0, 30)}...
                  </AddToolTip>
                ) : (
                  item?.label
                )}
              </button>
            </div>
          );
        }
      } else {
        addOptionItem(
          item,
          !includeSecondLabel ? (
            <>
              <div
                className="d-flex align-items-center core-body-text-small-medium pt-2 pb-2 multi-select-drop-down-hov"
                style={{
                  display: screenName == "txn" && "flex",
                  paddingLeft: "5px",
                }}
              >
                {/* {!item.checked && ( */}
                <input
                  name={name}
                  disabled={disabled || item?.disabled}
                  type="checkbox"
                  onClick={() => {
                    isArrayOfObjects && onOptionClick(item, item.checked);
                    asyncChangesRequired && onAsyncChange(item);
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
                  value={
                    item.label && item.label.length > 25 && overflow ? (
                      <AddToolTip name={item.label}>
                        {item.label.slice(0, 25)}...
                      </AddToolTip>
                    ) : (
                      item.label
                    )
                  }
                  checked={item.checked}
                  onFocus={(e) => rowItemFocus(e, true)}
                  onBlur={(e) => rowItemFocus(e, false)}
                  id={`custom-radio-${name}-${item.value}`}
                  key={`custom-radio-${name}-${item.value}`}
                  onChange={() => onValueChange(item)}
                  data-testid={
                    testId &&
                    getTestId(
                      `${testId.split("-")[0]}-checkbox-${
                        camelCase(name) || "option"
                      }${index + 1}`
                    )
                  }
                />
                {/* )} */}
                {item?.label?.length > 35 ? (
                  isCustomTooltipenabled ? (
                    <OverlayTrigger
                      overlay={
                        <Tooltip className={`${styles.customtooltipindex}`}>
                          {item.label}
                        </Tooltip>
                      }
                    >
                      <span>{item.label.slice(0, 35)}...</span>
                    </OverlayTrigger>
                  ) : (
                    <AddToolTip
                      name={item.label}
                      className={"pl-1"}
                      displayTooltip={true}
                    >
                      {item.label.slice(0, 35)}...
                    </AddToolTip>
                  )
                ) : (
                  <div className="pl-1">{item?.label}</div>
                )}
                {/* {item.checked && (
                <div className="ml-auto">
                  <FontAwesomeIcon onClick={() => { onValueChange(item) }} className="select-all-clear-text" icon={faCheck} />
                </div>
              )} */}
              </div>
              <div className="dropside-line"></div>
            </>
          ) : (
            <>
              <div
                className="d-flex align-items-center core-body-text-small-medium pt-2 pb-2 multi-select-drop-down-hov"
                style={{
                  display: screenName == "txn" && "flex",
                  paddingLeft: "5px",
                }}
              >
                {/* {!item.checked && ( */}
                <input
                  name={name}
                  disabled={disabled || item?.disabled}
                  type="checkbox"
                  onClick={() => {
                    isArrayOfObjects && onOptionClick(item, item.checked);
                    asyncChangesRequired && onAsyncChange(item);
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
                  value={
                    item.label && item.label.length > 25 && overflow ? (
                      <AddToolTip name={item.label}>
                        {item.label.slice(0, 25)}...
                      </AddToolTip>
                    ) : (
                      item.label
                    )
                  }
                  checked={item.checked}
                  onFocus={(e) => rowItemFocus(e, true)}
                  onBlur={(e) => rowItemFocus(e, false)}
                  id={`custom-radio-${name}-${item.value}`}
                  key={`custom-radio-${name}-${item.value}`}
                  onChange={() => onValueChange(item)}
                  data-testid={
                    testId &&
                    getTestId(
                      `${testId.split("-")[0]}-checkbox-${
                        camelCase(name) || "option"
                      }${index + 1}`
                    )
                  }
                />
                {/* )} */}
                <div>
                  {item?.label?.length > 25 ? (
                    <AddToolTip name={item.label} className={"pl-1"}>
                      {item.label.slice(0, 25)}...
                    </AddToolTip>
                  ) : (
                    <div className="pl-1">{item?.label}</div>
                  )}
                  {item?.label1?.length > 25 ? (
                    <AddToolTip name={item?.label1} className={"pl-1"}>
                      {item?.label1.slice(0, 25)}...
                    </AddToolTip>
                  ) : (
                    <div className="pl-1">{item?.label1}</div>
                  )}
                </div>
              </div>
              <div className="dropside-line"></div>
            </>
          )
        );
      }
    }
  });
  const renderedOptions = groupBy
    ? Array.from(optionGroups.entries())
        .sort(([firstGroup], [secondGroup]) =>
          firstGroup.localeCompare(secondGroup)
        )
        .map(([groupKey, group], index) => (
          <div key={`${name || "options"}-${groupKey || index}`}>
            {group.label && (
              <div
                className="px-2 py-1"
                style={{
                  backgroundColor: "var(--neutral-surface-layer-02)",
                  color: "var(--neutral-text-default)",
                  fontWeight: 600,
                }}
              >
                {group.label}
              </div>
            )}
            {group.items}
          </div>
        ))
    : optionsItem;

  const changeHandler = (e) => {
    const val = e.target.value;
    setQueriedValue(val);

    if (onSearch) {
      onSearch(val);
    } else {
      if (isEmpty(val)) {
        setTransformedValues(
          options.map((item) => ({
            ...item,
            checked:
              transformedValues?.find((_) => _.value === item.value)?.checked ??
              false,
          }))
        );
      }
    }
  };
  const className = disabled ? " disabled" : "";

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isBottom && onScrollEnd && !isLoading) {
      onScrollEnd();
    }
  };

  return (
    <div
      className={
        isTypeAhead
          ? `multiselect-dropdown-wrapper w-250 ${className}`
          : `multiselect-dropdown-wrapper ${className}`
      }
      style={{ height, width, maxHeight, zIndex, background, position }}
    >
      <LoaderWrapper isLoading={isLoading}>
        <div className="w-100 h-100p dropdown-items">
          {showLabelOnly ? (
            <div className="core-body-text-regular-semi-bold">{label}</div>
          ) : (
            ""
          )}
          {showSeparator ? (
            <div className="mt-2 mb-2 horizontal-line-ms"></div>
          ) : (
            ""
          )}
          {!isTypeAhead && (
            <FormControl
              label={label}
              noLabelTransform={isNoLabelTransform}
              isRequired={true}
              className="mb-2"
            >
              <FormControlSearch
                placeholder={placeholder ?? "Search"}
                autoFocus
                type="text"
                size={size}
                onChange={changeHandler}
                screenName="txn"
                isManagePage={isManagePage}
                isMultiSelect={true}
                value={queriedValue}
                isReset={isReset}
                isMultiSelectDropDown={true}
                setIsSelectAll={setIsSelectAll}
                data-testid={
                  testId && getTestId(`${testId.split("-")[0]}-input-search`)
                }
              />

              {/* <div className="button-wrapper">
              {!disabled && (
                <span className="total-selected">
                  {totalSelected > 0 && `(${totalSelected} selected) `}
                </span>
              )}
              {!disabled && (
                <Button
                  className="select-all-btn"
                  variant="link"
                  type="button"
                  onClick={onSelectAllClick}
                >
                  {!isAllSelected ? "Select All" : "Unselect All"}
                </Button>
              )}
            </div> */}
            </FormControl>
          )}
          {!hideSelectedOptions && selectedOptions.length > 0 && (
            <div
              className="selected-options"
              style={{
                paddingLeft: tradeCategory
                  ? "0px"
                  : "var(--dropside-paddingx-width)",
              }}
            >
              {selectedOptions.map((item, index) => {
                return (
                  <div
                    key={`${name}-${item.value}`}
                    className="selected-options-item"
                  >
                    <div
                      className={
                        tradeCategory
                          ? "d-flex w-100 align-items-center justify-content-between"
                          : "d-flex w-100"
                      }
                    >
                      <div>{item.label}</div>
                      <Button
                        onClick={() => onValueChange(item)}
                        variant="link"
                        data-testid={
                          testId &&
                          getTestId(
                            `${testId.split("-")[0]}-button-removeSelected${
                              camelCase(name) || "option"
                            }${index + 1}`
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isNewLayout &&
            showSelectAll &&
            visibleOptionCount !== 0 &&
            (screenName === "txn" ? (
              <>
                <div className="core-body-text-regular-medium-s mb-2">
                  {isStockSplit == true ? visibleOptionCount : options.length}{" "}
                  record(s) found
                </div>
                <div className="d-flex flex-wrap justify-content-between mb-2">
                  <div
                    className="select-all-clear-text"
                    onClick={onSelectAllClick}
                    data-testid={
                      testId &&
                      getTestId(`${testId.split("-")[0]}-button-selectAll`)
                    }
                  >
                    {!isSelectAll ? "Select All" : "Unselect All"}
                  </div>
                  <div
                    className="select-all-clear-text"
                    onClick={() => clearChecked()}
                    data-testid={
                      testId &&
                      getTestId(`${testId.split("-")[0]}-button-clear`)
                    }
                  >
                    Clear
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex flex-row space-between options align-items-baseline mb-2">
                <div
                  className="select-all-clear-text"
                  onClick={onSelectAllClick}
                  data-testid={
                    testId &&
                    getTestId(`${testId.split("-")[0]}-button-selectAll`)
                  }
                >
                  {!isSelectAll ? "Select All" : "Unselect All"}
                </div>
                <div
                  className="select-all-clear-text"
                  onClick={() => clearChecked()}
                  data-testid={
                    testId && getTestId(`${testId.split("-")[0]}-button-clear`)
                  }
                >
                  Cleared
                </div>
              </div>
            ))}
          {isNewLayout && (
            <div className="d-flex flex-wrap justify-content-between">
              <div
                className="select-all-clear-text"
                onClick={onSelectAllClick}
                data-testid={
                  testId &&
                  getTestId(`${testId.split("-")[0]}-button-selectAll`)
                }
              >
                {!isSelectAll ? "Select All" : "Unselect All"}
              </div>
              <div
                className="select-all-clear-text"
                onClick={clearChecked}
                data-testid={
                  testId && getTestId(`${testId.split("-")[0]}-button-clear`)
                }
              >
                Clear
              </div>
            </div>
          )}
          <div
            className="multi-select-drop-down-scroll"
            onScroll={handleScroll}
          >
            {renderedOptions}
          </div>
          {visibleOptionCount === 0 && !isLoading && (
            <div className={`text-center`}>No data found</div>
          )}
        </div>
      </LoaderWrapper>
    </div>
  );
};

MultiSelectDropdownForSDUI.defaultProps = {
  options: [],
  value: [],
  hideSelectedOptions: true,
  tradeCategory: false,
};
export default MultiSelectDropdownForSDUI;
