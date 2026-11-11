import styles from "./AddSlider.module.scss";
import React, { useEffect, useRef, useState } from "react";
import SliderPanel from "../SliderPanel/SliderPanel";
import FormControlSearch from "../FormControlSearch/FormControlSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InvestmentDetailsCard from "../InvestmentDetailsCard";
import {
  faChevronDown,
  faChevronUp,
  faTimesCircle,
} from "@fortawesome/pro-solid-svg-icons";
import PillComponent from "../PillComponent/PillComponent";
import { Formik } from "formik";
import { get, isEqual } from "lodash-es";
import LoaderWrapper from "../LoaderWrapper/LoaderWrapper";
import { Button } from "react-bootstrap";
import { useDeepEffect } from "@/abstracts/hooks";
import MultiSelectListDropdown from "../MultiSelectListDropdown";
import Link from "../Link";
import ModalNotification from "../ModalNotification/ModalNotification";
import { getInvestmentListByPlanId } from "@/services/plan";

const RecordCountFunc = ({
  count,
  className = "core-body-text-regular-semi-bold-primary text-decoration-underline",
  isShown = false,
  text = "Add All",
  onClick = () => {},
}) => {
  return (
    <div className="d-flex justify-content-between mb-2 mt-3">
      <div className="core-body-text-small-bold">
        {count < 10 && count != 0 ? `0${count}` : count}
        <span className="core-body-text-small-semi-bold-sl"> Record(s)</span>
      </div>
      {isShown && (
        <a className={className} onClick={onClick}>
          {text}
        </a>
      )}
    </div>
  );
};

const AddSlider = ({
  masterInvestment = null,
  isOpen,
  setIsOpen,
  filters = [],
  apiFunction,
  isAddAll = false,
  isRemoveAll = false,
  isSdb = false,
  page = "Investment",
  placeholder = "Investment name, ticker, CUSIP",
  title = "Add Investment",
  customButtonLabel = "Save",
  onSaveClick,
  customDisabled = false,
  existingData = [],
  payloadExtraProps,
  responseMapper,
  warningCondition = null,
  warning = "",
  initialValuesData,
  sourceDetails,
  setSourceDetails,
}) => {
  const formikRef = useRef();
  const [response, setResponse] = useState({ isLoading: false, apiData: [] });
  const [modalVisible, setModalVisible] = useState(false);
  const [masterInvestmentData, setMasterInvestmentData] = useState([]);
  const [addedData, setAddedData] = useState([]);
  useEffect(() => {
    masterInvestment != null &&
      getInvestmentListByPlanId(masterInvestment).then((res) => {
        setMasterInvestmentData(get(res, "investmentPlanDetails", []));
      });
  }, [masterInvestment]);

  const apiFunc = (
    filter = [],
    search = "",
    addedData = [],
    range = { from: 0, to: masterInvestment ? 1000 : 20 },
    apiData = []
  ) => {
    setResponse({ ...response, isLoading: true });
    var payload = payloadExtraProps?.isFunction
      ? payloadExtraProps?.Function({
          ...payloadExtraProps,
          search: search,
          from: range.from,
          to: range.to,
          [payloadExtraProps?.addedData]: addedData,
          ...filters.reduce((acc, item, index) => {
            acc[item?.name] =
              get(filter, `${index}`, [])
                ?.filter((_) => _.checked)
                ?.map((_) => _.value) ?? [];
            return acc;
          }, {}),
        })
      : {
          ...payloadExtraProps,
          search: search,
          from: range.from,
          to: range.to,
          [payloadExtraProps?.addedData]: addedData,
          ...filters.reduce((acc, item, index) => {
            acc[item?.name] =
              get(filter, `${index}`, [])
                ?.filter((_) => _.checked)
                ?.map((_) => _.value) ?? [];
            return acc;
          }, {}),
        };
    apiFunction(payload)
      .then((res) => {
        if (masterInvestment) {
          const matchingInvestments = masterInvestmentData
            .map((masterInvestment) => {
              return res.find(
                (allInvestment) =>
                  allInvestment.investmentId === masterInvestment.investmentId
              );
            })
            .filter(Boolean);
          setResponse({
            isLoading: false,
            apiData:
              matchingInvestments.length > 0
                ? matchingInvestments?.map((_) => ({
                    ..._,
                    isAddButton: true,
                    heading: _?.[responseMapper.heading],
                    subHeading: _?.[responseMapper.subHeading],
                    columns: responseMapper?.columns?.map((col) => ({
                      ...col,
                      data: _?.[col.data],
                    })),
                  }))
                : [],
          });
        } else if (payloadExtraProps?.planId) {
          setResponse({
            isLoading: false,
            apiData: [
              ...apiData,
              ...(res.planInvestmentListData?.map((plan) => ({
                ...plan,
                isAddButton: true,
                heading: plan?.[responseMapper.heading],
                subHeading: plan?.[responseMapper.subHeading],
                columns: responseMapper?.columns?.map((col) => ({
                  ...col,
                  data: plan?.[col.data],
                })),
              })) ?? []),
            ],
          });
        } else {
          setResponse({
            isLoading: false,
            apiData: [
              ...apiData,
              ...(res?.map((_) => ({
                ..._,
                isAddButton: true,
                heading: _?.[responseMapper.heading],
                subHeading: _?.[responseMapper.subHeading],
                columns:
                  responseMapper?.columns?.map((col) => ({
                    ...col,
                    data: _?.[col.data],
                  })) ?? [],
              })) ?? []),
            ],
          });
        }
      })
      .catch((ex) => {
        setResponse({ isLoading: false, apiData: [] });
      });
  };

  useDeepEffect(() => {
    if (isOpen) {
      apiFunc([], "", existingData?.map((_) => _?.investmentId) ?? []);
      setAddedData(existingData);
    }
  }, [isOpen]);
  const filterOptions = filters?.map((_) => _?.options) ?? [];
  const hideFilter = (ind) => {
    let x = document?.getElementById(`filters_${ind}`);
    if (x != null) {
      let y = x?.style?.display;
      if (y === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
  };
  const onClearOptions = (i, setFieldValue) => {
    setFieldValue(`transformedValues[${i}]`, get(filterOptions, `${i}`, []));
  };
  return (
    <SliderPanel
      isOpen={isOpen}
      showCancel={false}
      onClose={() => {
        if (formikRef?.current) {
          if (!isEqual(addedData, existingData ?? [])) {
            setModalVisible(true);
          } else {
            formikRef?.current?.resetForm();
            setIsOpen(false);
          }
        }
      }}
      onCustomClick={() => {
        if (formikRef?.current) {
          formikRef?.current?.resetForm();
          onSaveClick(addedData);
          setIsOpen(false);
        }
      }}
      showCancelButton={true}
      showHeader={true}
      header={title}
      customDisabled={
        customDisabled &&
        !addedData?.some((item) => item?.isRemoveButton == true)
      }
      showSave={false}
      customButton={true}
      customButtonLabel={customButtonLabel}
      width={"90%"}
    >
      <div className="overflow-y-scroll">
        {warningCondition != null &&
        addedData?.find(
          (item) =>
            item?.[warningCondition.name] === warningCondition?.value &&
            item?.isRemoveButton
        )
          ? warning
          : ""}
      </div>
      <div className="add-slider-content">
        <Formik
          innerRef={formikRef}
          initialValues={{
            arrowState: false,
            searchString: "",
            addedInvSearch: "",
            filter: [],
            lastFilter: [],
            range: { from: 0, to: 20 },
            transformedValues: filterOptions,
          }}
          enableReinitialize={true}
        >
          {({ setFieldValue, setValues, values, ...rest }) => {
            const addedDataIds = addedData?.map((_) => _.investmentId) ?? [];
            const selectedLables = filters.flatMap(
              (item, index) =>
                get(values, `transformedValues[${index}]`, [])
                  ?.map((da, ind) => ({ ...da, index, dataInd: ind }))
                  ?.filter((da) => da.checked) ?? []
            );
            const addedFilterData =
              addedData?.filter(
                (e) =>
                  e?.name
                    ?.toLowerCase()
                    ?.includes(
                      get(values, "addedInvSearch", "")?.toLowerCase()
                    ) ||
                  e?.cusip
                    ?.toLowerCase()
                    ?.includes(
                      get(values, "addedInvSearch", "")?.toLowerCase()
                    ) ||
                  e?.ticker
                    ?.toLowerCase()
                    ?.includes(get(values, "addedInvSearch", "")?.toLowerCase())
              ) ?? [];
            return (
              <>
                <div className="add-slider-border filter-investment-component ">
                  <div className="border-right-strong">
                    <div className="filter-investment-component-changes pb-0 pl-0 pt-0">
                      <div>
                        <div className="d-flex core-body-text-large-semi-bold align-items-center  justify-content-between mb-3 pb-3 border-bottom-strong ">
                          <div>Filters</div>
                          <div className="core-body-text-regular-semi-bold-sl">
                            {selectedLables?.length < 10 &&
                            selectedLables?.length != 0
                              ? `0${selectedLables?.length}`
                              : selectedLables?.length ?? 0}{" "}
                            Selected
                            <Button
                              variant="secondary"
                              className="ml-2"
                              onClick={() => {
                                if (
                                  !isEqual(
                                    get(values, "lastFilter", []),
                                    get(values, "transformedValues", [])
                                  )
                                ) {
                                  setFieldValue("range", { from: 0, to: 20 });
                                  document.getElementById(
                                    "slider-component-investment"
                                  ).scrollTop = 0;
                                  apiFunc(
                                    get(values, "transformedValues", []),
                                    get(values, "searchString", ""),
                                    addedDataIds,
                                    { from: 0, to: 20 },
                                    []
                                  );
                                  setFieldValue(
                                    "lastFilter",
                                    get(values, "transformedValues", [])
                                  );
                                }
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="border-bottom-strong mb-3 d-flex core-body-text-regular-semi-bold  justify-content-between pb-3 ">
                          <div>Filters applied</div>
                          <div className="core-body-text-regular-semi-bold-sl">
                            <a
                              className="core-body-text-small-bold-p pr-2 mr-2 border-right-strong"
                              onClick={() => {
                                const clearedFilters = filterOptions.map(
                                  (filterGroup) =>
                                    filterGroup.map((option) => ({
                                      ...option,
                                      checked: false,
                                    }))
                                );
                                setFieldValue(
                                  "transformedValues",
                                  clearedFilters
                                );
                              }}
                            >
                              Clear All
                            </a>
                            <FontAwesomeIcon
                              icon={
                                values["arrowState"]
                                  ? faChevronUp
                                  : faChevronDown
                              }
                              onClick={() => {
                                setFieldValue(
                                  "arrowState",
                                  !values["arrowState"]
                                );
                              }}
                            />
                          </div>
                        </div>
                        {values["arrowState"] && (
                          <div className="mb-1 d-flex flex-wrap">
                            {selectedLables.map((item, ind) => {
                              return (
                                <PillComponent
                                  label={item?.label}
                                  className={`mr-2 pill-component`}
                                  iconClassName="pill-close-icon"
                                  isInput={true}
                                  iconRight={true}
                                  icon={faTimesCircle}
                                  inputForClick={1}
                                  secondInput={ind}
                                  iconClick={() => {
                                    setFieldValue(
                                      `transformedValues[${item.index}][${item.dataInd}].checked`,
                                      false
                                    );
                                  }}
                                  isIconClick={true}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="">
                        {filters.map((e, ind) => {
                          return (
                            <>
                              <div className="d-flex justify-content-space-between core-body-text-regular-medium-sl">
                                <div>{e.label}</div>
                                <div className="Arrow-up primary-text-color">
                                  <Link
                                    onClick={() => {
                                      const currentOptions = get(
                                        values,
                                        `transformedValues[${ind}]`,
                                        []
                                      );
                                      const clearedOptions = currentOptions.map(
                                        (opt) => ({
                                          ...opt,
                                          checked: false,
                                        })
                                      );
                                      setFieldValue(
                                        `transformedValues[${ind}]`,
                                        clearedOptions
                                      );
                                      if (e.onClear) {
                                        e.onClear();
                                      }
                                    }}
                                    className="core-body-text-small-semi-bold-bd"
                                  >
                                    Clear all
                                  </Link>
                                </div>
                              </div>
                              <div className="status-Pop-model-portfolio">
                                <div className="d-flex justify-content-space-between">
                                  <div className="core-body-text-regular-semi-bold-sl">
                                    {" "}
                                    {get(
                                      values,
                                      `transformedValues[${ind}]`,
                                      []
                                    )?.filter((_) => _.checked)?.length ??
                                      0}{" "}
                                    Selected
                                  </div>
                                  <Link onClick={() => hideFilter(ind)}>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                  </Link>
                                </div>
                                <div id={`filters_${ind}`} className={`d-none`}>
                                  <hr className="margin-0"></hr>
                                  <MultiSelectListDropdown
                                    width="100%"
                                    height="auto"
                                    maxHeight="238px"
                                    transformedValues={get(
                                      values,
                                      `transformedValues[${ind}]`,
                                      []
                                    )}
                                    setTransformedValues={(options) =>
                                      setFieldValue(
                                        `transformedValues[${ind}]`,
                                        options ?? []
                                      )
                                    }
                                    name={`filter[${ind}].values`}
                                  />
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="investment-table">
                    <div className="filter-component-changes pr-0 pt-0 pb-0">
                      <div>
                        <p className="core-body-text-large-semi-bold mb-2">
                          {page} Details
                        </p>
                        <FormControlSearch
                          name="searchString"
                          label={null}
                          screen="Addinvestmentlg"
                          value={values["searchString"]}
                          placeholder={placeholder}
                          onChange={(e) => {
                            setFieldValue("searchString", e.target.value);
                            setFieldValue("range", { from: 0, to: 20 });
                            document.getElementById(
                              "slider-component-investment"
                            ).scrollTop = 0;
                            apiFunc(
                              get(values, "transformedValues", []),
                              e.target.value,
                              addedDataIds,
                              { from: 0, to: 20 },
                              []
                            );
                          }}
                          showClear={true}
                          showCancel={true}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                            }
                          }}
                        />
                        <RecordCountFunc
                          count={get(response, "apiData", []).length}
                          isShown={isAddAll}
                        />
                      </div>
                      <LoaderWrapper isLoading={response?.isLoading ?? false}>
                        <div
                          className={`${styles.addslider} overflow-y-scroll`}
                          id="slider-component-investment"
                          onScroll={(event) => {
                            const e = event.nativeEvent;
                            const apiData = get(response, "apiData", []);
                            const range = get(values, "range", {
                              from: 0,
                              to: 20,
                            });
                            if (
                              e.target.scrollTop + 10 >=
                                e.target.scrollHeight - e.target.clientHeight &&
                              apiData?.length >= range.to
                            ) {
                              setFieldValue("range", {
                                from: range.from + 20,
                                to: range.to + 20,
                              });
                              apiFunc(
                                get(values, "transformedValues", []),
                                get(values, "searchString", ""),
                                addedDataIds,
                                {
                                  from: range.from + 20,
                                  to: range.to + 20,
                                },
                                apiData
                              );
                            }
                          }}
                        >
                          {get(response, "apiData", []).map((_, ind) => (
                            <InvestmentDetailsCard
                              initialValuesData={initialValuesData}
                              sourceDetails={sourceDetails}
                              data={_}
                              addedData={addedData}
                              isSdb={isSdb}
                              onIconClick={() => {
                                const apiData = get(response, "apiData", []);
                                const to = get(values, "range.to", 0);
                                const data = addedData;
                                setAddedData([
                                  ...data,
                                  ...apiData.splice(ind, 1)?.map((_) => ({
                                    ..._,
                                    isAddButton: false,
                                    isRemoveButton: true,
                                  })),
                                ]);
                                if (apiData.length >= to - 1)
                                  apiFunc(
                                    get(values, "transformedValues", []),
                                    get(values, "searchString", ""),
                                    data?.map((_) => _.investmentId) ?? [],
                                    {
                                      from: to,
                                      to: to + 1,
                                    },
                                    apiData
                                  );
                              }}
                            />
                          ))}
                          {get(response, "apiData", [])?.length == 0 && (
                            <div className="p-2 fw-600 text-center">
                              No record(s) found
                            </div>
                          )}
                        </div>
                      </LoaderWrapper>
                    </div>
                  </div>
                </div>
                <div className="add-slider-border filter-component-changes">
                  <div>
                    <p className="core-body-text-large-semi-bold mb-2">
                      Added {page}s
                    </p>
                    <FormControlSearch
                      name="addedInvSearch"
                      label={null}
                      screen="Addinvestmentlg"
                      value={values["addedInvSearch"]}
                      placeholder={placeholder}
                      onChange={(e) => {
                        setFieldValue("addedInvSearch", e.target.value);
                      }}
                      showClear={true}
                      showCancel={true}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") e.preventDefault();
                      }}
                    />
                    <RecordCountFunc
                      count={addedFilterData?.length}
                      isShown={isRemoveAll}
                      text="Remove All"
                      className="core-body-text-regular-semi-bold-bd text-decoration-underline-ct"
                      onClick={() => {
                        setAddedData(
                          existingData?.filter(
                            (_) => _?.isRemoveButton !== true
                          ) ?? []
                        );
                        setFieldValue("range", { from: 0, to: 20 });
                        apiFunc(
                          get(values, "transformedValues", []),
                          get(values, "searchString", ""),
                          existingData
                            ?.filter((_) => _?.isRemoveButton !== true)
                            ?.map((_) => _?.investmentId) ?? [],
                          {
                            from: 0,
                            to: 20,
                          },
                          []
                        );
                      }}
                    />
                  </div>
                  <div className={`${styles["addslider-v2"]} overflow-y-auto`}>
                    {addedFilterData?.map((_, ind) => (
                      <InvestmentDetailsCard
                        initialValuesData={initialValuesData}
                        sourceDetails={sourceDetails}
                        data={{
                          ..._,
                          isAddButton: false,
                          isRemoveButton: true,
                        }}
                        isSdb={isSdb}
                        addedData={addedData}
                        onIconClick={() => {
                          const data = addedData; // clone array to avoid direct mutation
                          data.splice(ind, 1);
                          setFieldValue("range", { from: 0, to: 20 });
                          apiFunc(
                            get(values, "transformedValues", []),
                            get(values, "searchString", ""),
                            data?.map((_) => _.investmentId) ?? [],
                            {
                              from: 0,
                              to: 20,
                            },
                            []
                          );
                        }}
                      />
                    ))}
                    {addedFilterData?.length == 0 && addedData?.length != 0 && (
                      <div className="p-2 fw-600 text-center">
                        No record(s) found
                      </div>
                    )}
                    {addedData?.length == 0 && (
                      <div className="plan-group-no-plan">
                        <div className="core-body-text-regular-medium">
                          No{" "}
                          <span className="text-transform-lowercase">
                            {page}
                          </span>
                          s added
                        </div>
                        <div className="core-body-text-small-medium-sl">
                          Please add{" "}
                          <span className="text-transform-lowercase">
                            {page}
                          </span>
                          s here by clicking on the arrow
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
      <ModalNotification
        show={modalVisible}
        header={"Are you sure?"}
        message={"Your changes may be lost. Do you want to continue?"}
        onHide={() => {
          setModalVisible(false);
        }}
        infoType={2}
        primaryButtonAction={() => {
          setModalVisible(false);
          formikRef?.current?.resetForm();
          setIsOpen(false);
        }}
        primaryButtonLabel={"Yes"}
        secondaryButtonAction={() => {
          setModalVisible(false);
        }}
        secondaryButtonLabel={"No"}
      />
    </SliderPanel>
  );
};
export default AddSlider;
