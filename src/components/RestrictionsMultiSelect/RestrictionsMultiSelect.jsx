import styles from "./RestrictionsMultiSelect.module.scss";
import React from "react";
import { useState } from "react";
import AddToolTip from "../AddToolTip";
import LoaderWrapper from "../LoaderWrapper";
import { Form, InputGroup } from "react-bootstrap";
import FormControlSearch from "../FormControlSearch";
import FormControl from "../FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-light-svg-icons";
import { cloneDeep, get, isEmpty, set } from "lodash-es";

export default function RestrictionsMultiSelect(props) {
  const {
    optionsState,
    setOptionsState,
    isLoading,
    selectAll,
    OnSelectOption,
    className = "create-generate-multiselect-dropdown",
    searchPlaceholder = "Search applicable transactions",
    selectAllField = "selectAll",
    dataIndex = null,
    label = "",
    searchChildLabel = false,
    rowClassName = "",
    ...rest
  } = props;
  const [searchString, setSearchString] = useState("");
  const onSearchChange = (e) => {
    setSearchString(e.target.value);
  };
  const isSubString = (stringA, stringB) =>
    stringA.toLowerCase().includes(stringB.toLowerCase());
  const filteredOptions = optionsState
    ?.filter(
      (_) =>
        searchString.trim() == "" ||
        isSubString(_.label, searchString) ||
        (searchChildLabel == true &&
          isSubString(_.childlabel || "", searchString)) ||
        (_.isComplex &&
          _.childOptions.some((x) => isSubString(x.label, searchString)))
    )
    ?.map((_) => {
      if (_.isComplex)
        return {
          ..._,
          checked: _.checked ?? false,
          childOptions: _.childOptions
            ?.filter((x) => isSubString(x.label ?? "", searchString))
            ?.map((x) => {
              return { ...x, checked: x.checked ?? false };
            }),
        };
      return { ..._, checked: _.checked ?? false };
    });
  function renderOptions(optionsList, id = 0) {
    return optionsList?.map((item) => {
      const index = optionsState.findIndex((_) => _.label === item.label);
      const isExplanded = get(item, "isExplanded");
      let data = null;
      return (
        <>
          <div
            className={`${styles["w-100p-v3"]} additional-rule-alignment d-flex align-items-center border-bottom justify-content-start pl-1 ${rowClassName}`}
          >
            <input
              type="checkbox"
              onClick={() => {
                if (id === 0) {
                  data = optionsState?.map((_) => {
                    if (_.value === item.value) {
                      return _.isComplex
                        ? {
                            ..._,
                            checked: !item.checked,
                            childOptions: _.childOptions?.map((data) => {
                              return { ...data, checked: !item.checked };
                            }),
                          }
                        : { ..._, checked: !item.checked };
                    } else return _;
                  });
                } else {
                  data = optionsState?.map((_) => {
                    if (_.value == id) {
                      let count = _.childOptions?.find((a) => {
                        if (a.checked == true && a.value !== item.value)
                          return true;
                      });
                      return {
                        ..._,
                        checked: !isEmpty(count) || !item.checked,
                        childOptions: _.childOptions?.map((data) => {
                          if (data.value == item.value) {
                            return { ...data, checked: !item.checked };
                          } else return data;
                        }),
                      };
                    } else return _;
                  });
                }
                item.checked = !item.checked;
                dataIndex != null
                  ? setOptionsState(data, dataIndex)
                  : setOptionsState(data);
                OnSelectOption(data);
              }}
              label={
                item.label && item.label.length > 25 ? (
                  <AddToolTip name={item.label}>
                    {item.label.slice(0, 25)}...
                  </AddToolTip>
                ) : (
                  item.label
                )
              }
              value={
                item.label && item.label.length > 25 ? (
                  <AddToolTip name={item.label}>
                    {item.label.slice(0, 25)}...
                  </AddToolTip>
                ) : (
                  item.label
                )
              }
              checked={item.checked}
              id={`custom-radio-${item.label}-${item.value}`}
              key={`custom-radio-${item.label}-${item.value}`}
              onChange={() => {}}
            />
            <div className="d-flex flex-column pl-1">
              {item.label && item.label.length > 25 ? (
                <AddToolTip name={item.label}>
                  {item.label.slice(0, 25)}...
                </AddToolTip>
              ) : (
                item.label
              )}
              {item?.childlabel && (
                <div className="muted-text-12px">{`ID: ${item?.childlabel}`}</div>
              )}
            </div>
            {item.isComplex && (
              <div
                className="px-2 ml-auto"
                onClick={() => {
                  let tempOptionsState = cloneDeep(optionsState);
                  set(tempOptionsState, `${index}.isExplanded`, !isExplanded);
                  tempOptionsState.childOptions =
                    tempOptionsState.childOptions?.map((option, id) => {
                      return item.checked && index === id
                        ? { ...option, checked: item.checked }
                        : option;
                    });
                  dataIndex != null
                    ? setOptionsState(tempOptionsState, dataIndex)
                    : setOptionsState(tempOptionsState);
                }}
              >
                {" "}
                <FontAwesomeIcon
                  size="md"
                  icon={isExplanded ? faAngleDown : faAngleUp}
                />
              </div>
            )}
          </div>
          <div className="ml-1r">
            {item.isComplex && item.isExplanded ? (
              renderOptions(item.childOptions, item.value)
            ) : (
              <></>
            )}
          </div>
        </>
      );
    });
  }
  return (
    <div className="search-text-restriction-container p-0">
      <LoaderWrapper isLoading={isLoading}>
        <div className={`w-100 h-100p dropdown-items ${className}`}>
          <Form.Label className={"searchable-list-label"}>{label}</Form.Label>
          <FormControl>
            <div className="search-wrapper">
              <InputGroup>
                <FormControlSearch
                  placeholder={searchPlaceholder}
                  autoFocus
                  type="text"
                  size="xs"
                  onChange={onSearchChange}
                  value={searchString}
                  screenName="txn"
                  isMultiSelect={true}
                />
              </InputGroup>
            </div>
          </FormControl>

          <div className="w-100 d-flex justify-content-around mb-2 hover-underline">
            <div
              className="primary-text-color"
              onClick={() => {
                selectAll(!get(rest.values, selectAllField, null));
              }}
            >
              {!get(rest.values, selectAllField, null)
                ? "Select All"
                : "Unselect All"}
            </div>
            <div
              className="primary-text-color ml-auto"
              onClick={() => {
                selectAll(false);
              }}
            >
              Clear
            </div>
          </div>

          {
            <div className={`${styles.restrictionsmultiselect}`}>
              {renderOptions(filteredOptions)}
            </div>
          }
          {filteredOptions?.length === 0 && (
            <div className={`text-center`}>No data found</div>
          )}
        </div>
      </LoaderWrapper>
    </div>
  );
}
