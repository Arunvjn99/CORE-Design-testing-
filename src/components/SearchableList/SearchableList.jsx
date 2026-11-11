import styles from "./SearchableList.module.scss";
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { isEmpty, toLower, toString } from "lodash-es";
import { Dropdown, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import LoaderWrapper from "../LoaderWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlSearch from "../FormControlSearch";
import FormControl from "../FormControl";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { convertPasaclToSentenceCase } from "@/utils/helpers";
import { getTestId } from "@/SDUI/utils/testIds";

let typeAheadChangeTimeout = null;
const SearchableList = forwardRef((props, ref) => {
  const {
    options = [],
    onSelect,
    label,
    placeholder = "Search",
    isNotTypeAhead,
    disabled,
    selectedValue,
    height,
    width = "300px",
    onTypeAheadChange,
    typeAheadChangeDelay = 500,
    isLoading,
    defaultLabel,
    isSelectedByDefault,
    isFieldClear = false,
    className = "",
    page,
    mappercustomize = false,
    isCapitalize = false,
    fromLoan = false,
    screen,
    size,
    isSearch = false,
    hasToolTipLabel = false,
    onScrollEnd,
    onSearch,
    onClose,
    maxLength,
    testId,
    inputTestId,
  } = props;
  const popupWrapper = useRef(null);
  const popupSearchBox = useRef(null);
  const isFetchingRef = useRef(false);
  const [query, setQuery] = useState("");

  useImperativeHandle(ref, () => ({
    tiggerOnSelect(value, label) {
      onSelect(value, label);
    },
  }));

  useEffect(() => {
    const popupSearchBoxDom = popupSearchBox.current;
    if (!isNotTypeAhead && popupSearchBoxDom) {
      window.setTimeout(() => {
        popupSearchBoxDom.focus();
      }, 100);
    }

    if (isSelectedByDefault && options.length === 1) {
      options.map(({ value, label }) => {
        onSelect(value, label);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setQuery("");
      onClose?.();
    };
  }, []);

  const wasLoadingRef = useRef(false);
  useEffect(() => {
    if (wasLoadingRef.current && !isLoading) {
      isFetchingRef.current = false;
    }
    wasLoadingRef.current = isLoading;
  }, [isLoading]);

  const prevOptionsLengthRef = useRef(options.length);
  useEffect(() => {
    if (options.length !== prevOptionsLengthRef.current) {
      isFetchingRef.current = false;
      prevOptionsLengthRef.current = options.length;
    }
  }, [options]);

  const [showTooltip, setShowTooltip] = useState(false);
  const handleScroll = (e) => {
    setShowTooltip(null);

    if (onScrollEnd && !isFetchingRef.current) {
      const el = e.currentTarget;
      const threshold = 10;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
      if (atBottom) {
        isFetchingRef.current = true;
        onScrollEnd();
      }
    }
  };

  const keyDown = (e) => {};
  const changeHandler = (e) => {
    const val = e;
    setQuery(val);

    window.clearInterval(typeAheadChangeTimeout);
    typeAheadChangeTimeout = window.setTimeout(() => {
      if (onTypeAheadChange) {
        onTypeAheadChange(val);
      }
      if (onSearch) {
        onSearch(val);
      }
    }, typeAheadChangeDelay);
  };

  const popUpOptionsUI = options.map((option, index) => {
    const { value, label, toolTipLabel } = option;

    if (
      query.length !== 0 &&
      !label
        ?.toString()
        .trim()
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase())
    ) {
      return null;
    }
    const checked = selectedValue === value;

    if (option.break) {
      return <br />;
    }

    return (
      <>
        <Dropdown.Item
          ref={ref}
          key={value}
          as="button"
          type="button"
          onClick={() => onSelect(value, label)}
          className={checked ? "selected" : ""}
          data-attr={toLower(value)}
          data-attr-label={toLower(label)}
          disabled={disabled || option.disabled}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          tabIndex={-1}
          data-testid={getTestId(
            testId
              ? `${testId.split("-")[0]}-option-${testId.split("-")[2]}${
                  index + 1
                }`
              : undefined
          )}
        >
          <OverlayTrigger
            overlay={
              showTooltip === true && hasToolTipLabel ? (
                <Tooltip className={`${styles.searchablelist}`}>
                  {toolTipLabel}
                </Tooltip>
              ) : showTooltip === true ? (
                <Tooltip className={`${styles.searchablelist}`}>
                  {fromLoan ? convertPasaclToSentenceCase(label) : label}
                </Tooltip>
              ) : (
                <div></div>
              )
            }
          >
            <div className={`text-ellipsis core-body-text-small-medium`}>
              {fromLoan ? convertPasaclToSentenceCase(label) : label}
            </div>
          </OverlayTrigger>
        </Dropdown.Item>
        <div className="dropside-line"></div>
      </>
    );
  });
  const popUpOptionsPlanList = options.map((option, index) => {
    const { value, label, label1 } = option;
    if (
      query.length !== 0 &&
      !toString(`${label1}${label}`)
        ?.trim()
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
    ) {
      return null;
    }
    const checked = selectedValue === label;

    if (option.break) {
      return <br />;
    }

    return (
      <>
        <Dropdown.Item
          ref={ref}
          key={value}
          as="button"
          type="button"
          onClick={() => onSelect(value, label)}
          className={`d-flex justify-content-space-between`}
          data-attr={toLower(value)}
          data-attr-label={toLower(label)}
          data-attr-label1={toLower(label1)}
          disabled={disabled}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          data-testid={getTestId(
            testId
              ? `${testId.split("-")[0]}-option-${testId.split("-")[2]}${
                  index + 1
                }`
              : undefined
          )}
        >
          <div className="d-flex flex-column">
            {/* <AddToolTip className="font-weight-600" name={label}></AddToolTip>
            <AddToolTip name={label1}></AddToolTip> */}
            <OverlayTrigger
              overlay={
                showTooltip === true ? (
                  <Tooltip className={`${styles.searchablelist}`}>
                    {fromLoan ? convertPasaclToSentenceCase(label) : label}
                  </Tooltip>
                ) : (
                  <div></div>
                )
              }
            >
              <div className={`text-ellipsis core-body-text-small-medium`}>
                {fromLoan ? convertPasaclToSentenceCase(label) : label}
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                showTooltip === true ? (
                  <Tooltip className={`${styles.searchablelist}`}>
                    {fromLoan ? convertPasaclToSentenceCase(label1) : label1}
                  </Tooltip>
                ) : (
                  <div></div>
                )
              }
            >
              <div
                className={`fs-12px text-ellipsis ${
                  mappercustomize && "grey-text"
                }`}
              >
                {fromLoan ? convertPasaclToSentenceCase(label1) : label1}
              </div>
            </OverlayTrigger>
          </div>
          <div className={`${styles["p-t-13px"]} d-flex flex-row`}>
            {checked && (
              <FontAwesomeIcon
                icon={faCheck}
                className="fs-12px primary-text-color"
              />
            )}
          </div>
        </Dropdown.Item>
        <div className="dropside-line"></div>
      </>
    );
  });
  const CheckPopupOptionsAreEmpty = (arr) => arr.every((val) => val === null);
  const transformedDefaultLabel = `Select ${defaultLabel}`;
  return (
    <LoaderWrapper isLoading={isLoading} className="h-100p">
      <div
        ref={popupWrapper}
        className={`searchable-list-wrapper border-color-searchbar`}
      >
        <Form.Group
          style={{
            textTransform: isCapitalize && label == "Plan ID" && "capitalize",
          }}
          className={"searchable-list-input"}
        >
          <Form.Label
            style={{
              textTransform:
                screen == "Finch"
                  ? "none"
                  : isCapitalize && label == "Plan ID" && "capitalize",
            }}
            className={"searchable-list-label"}
          >
            {label || transformedDefaultLabel}
          </Form.Label>
          {!isNotTypeAhead && (
            <FormControl isSearchable={true} className="mb-2">
              <FormControlSearch
                placeholder={placeholder}
                className="searchable-list-input-text global-placeholder-color"
                autoFocus
                type="text"
                size={size ?? "md"}
                onChange={(e) => changeHandler(e.target.value)}
                onKeyDown={keyDown}
                screen={screen}
                value={query}
                isMultiSelect={true}
                isSearch={isSearch}
                screenName="SearchableList"
                maxLength={maxLength}
                data-testid={inputTestId}
              />
            </FormControl>
          )}
        </Form.Group>
        <div
          className={`searchable-list overflow-y-auto  ${className}`}
          style={{
            height: height,
            width: width,
            justifyContent: "space-between",
            marginRight: "0px ",
            overflowX: "hidden",
          }}
          onScroll={handleScroll}
        >
          {!isLoading &&
            (isEmpty(options) ||
              (page !== "managePayroll" &&
                CheckPopupOptionsAreEmpty(popUpOptionsUI)) ||
              (page == "managePayroll" &&
                CheckPopupOptionsAreEmpty(popUpOptionsPlanList))) && (
              <div
                className={
                  mappercustomize == false
                    ? "text-center"
                    : "text-center mr-5px fs-12px"
                }
              >
                No data found
              </div>
            )}
          {page == "managePayroll" ? popUpOptionsPlanList : popUpOptionsUI}
        </div>
      </div>
    </LoaderWrapper>
  );
});
export default SearchableList;
