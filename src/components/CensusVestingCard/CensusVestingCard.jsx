import styles from "./CensusVestingCard.module.scss";
import React, { useState, useContext, useEffect } from "react";
import { useRouterParams } from "@/abstracts/hooks";
import { Link } from "react-router";
import { Button, Form } from "react-bootstrap";
import SliderPanel from "@/components/SliderPanel";
import FieldTextarea from "@/components/Forms/FieldTextarea";
import FieldButtonGroup from "@/components/Forms/FieldButtonGroup";
import FormLeaveGuard from "@/components/FormLeaveGuard";
import DatePicker from "@/components/DatePicker";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import FieldInputNumber from "@/components/Forms/FieldInputNumber";
import FieldInputDecimal from "@/components/Forms/FieldInputDecimal";
import LoaderWrapper from "@/components/LoaderWrapper";
import ModalNotification from "@/components/ModalNotification";
import AddToolTip from "@/components/AddToolTip";
import { formFields } from "@/utils/constants/formFields";
import { manageCensusFormNames } from "@/utils/constants/employee";
import { yesNoOptions, OPTIONS_DATA_MAPPER } from "@/utils/constants/common";
import { usDateFormat } from "@/utils/helpers";
import { Formik, Field } from "formik";
import { get, isEmpty } from "lodash-es";
import {
  postSaveVestingConfigurationForSource,
  postEmployeeVestingHistoryDetails,
  GetVestingOverrideRestriction,
} from "@/services/vesting";
import VestingOverrideToggle from "../VestingOverrideToggle";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { appLayoutStore } from "../../contexts";

const initialValues = {};
const labelOptions = [
  { label: "Computation Period", value: 1 },
  { label: "Credited This Year", value: 2 },
  { label: "Vesting Override", value: 3 },
  // { label: "Vesting Multiplier", value: 4 },
  { label: "Vesting Percentage", value: 5 },
  //{ label: "VestingPercentageMetDate", value: 6 },
  { label: "Years Of Service", value: 6 },
  { label: "Comments", value: 7 },
];
const getVestingPercentage = (yos, vestingSchedule = null) => {
  if (vestingSchedule != null) {
    switch (parseInt(yos, 10)) {
      case 0:
        return vestingSchedule?.baseYear ?? 0;
      case 1:
        return vestingSchedule?.firstYear ?? 100;
      case 2:
        return vestingSchedule?.secondYear ?? 100;
      case 3:
        return vestingSchedule?.thirdYear ?? 100;
      case 4:
        return vestingSchedule?.fourthYear ?? 100;
      case 5:
        return vestingSchedule?.fifthYear ?? 100;
      case 6:
        return vestingSchedule?.sixthYear ?? 100;
      default:
        return 100;
    }
  }
  return 100;
};
const getCurrentVestingMultiplier = (vm, cvp, pvp, vb, rb) => {
  const vestingMultiplier = Math.trunc(vm * 10000) / 10000;
  if (cvp - pvp <= 0) {
    const fm = (100 / vestingMultiplier) * ((cvp - pvp) / 100);
    const cvm =
      vestingMultiplier + (vb / rb) * (Math.trunc(fm * 10000) / 10000);
    return Math.trunc(cvm * 10000) / 10000;
  } else {
    const fm = (100 / (1 - vestingMultiplier)) * ((cvp - pvp) / 100);
    const cvm =
      vestingMultiplier + ((rb - vb) / rb) * (Math.trunc(fm * 10000) / 10000);
    return Math.trunc(cvm * 10000) / 10000;
  }
};
const getDeficitAndVestingPercentage = (vb, cvm, pvm, rb) => {
  const cvb = rb * cvm;
  if (cvb < 0) {
    return { deficit: cvb, vestingAmount: -vb };
  }
  return { deficit: 0, vestingAmount: cvb - vb };
};

const columns = [
  {
    value: 1,
    label: "Vesting YOS",
    className: "column-vestingYOS",
    columnName: "vestingYOS",
    field: "vestingYOS",
    width: 111,
    dataType: "alphaNumeric",
    field1: "vestingYOS",
  },
  {
    value: 2,
    label: "Credited this computation period",
    className: "column-creditedThisComputationPeriod",
    columnName: "creditedThisYear",
    field: "creditedThisYear",
    width: 111,
    dataType: "alphaNumeric",
    field1: "creditedThisYear",
  },
  {
    value: 3,
    label: "Computation period",
    className: "column-computationPeriod",
    columnName: "computationPeriod",
    field: "computationPeriod",
    width: 210,
    dataType: "alphaNumeric",
    field1: "computationPeriod",
  },
  {
    value: 4,
    label: "Vesting percentage",
    className: "column-vestingPercentage",
    columnName: "vestingPercentage",
    field: "vestingPercentage",
    width: 149,
    dataType: "alphaNumeric",
    field1: "vestingPercentage",
  },
  {
    value: 5,
    label: "Vesting override",
    className: "column-vestingOverride",
    columnName: "vestingOverride",
    field: "vestingOverride",
    width: 149,
    dataType: "alphaNumeric",
    field1: "vestingOverride",
  },
  // {
  //   value: 6,
  //   label: "Vested balance",
  //   className: "column-vestedBalance",
  //   columnName: "vestedBalance",
  //   field: "vestedBalance",
  //   width: 135,
  //   dataType: "alphaNumeric",
  //   field1: "vestedBalance",
  // },
  {
    value: 7,
    label: "Comments",
    className: "column-comments",
    columnName: "comments",
    field: "comments",
    width: 130,
    dataType: "alphaNumeric",
    field1: "comments",
  },
  // {
  //   value: 8,
  //   label: "Vesting Computation Period",
  //   className: "column-vestingComputationPeriod",
  //   columnName: "vestingComputationPeriod",
  //   field: "vestingComputationPeriod",
  //   width: 144,
  //   dataType: "alphaNumeric",
  //   field1: "vestingComputationPeriod",
  // },
];

const CensusVestingCard = ({
  data,
  toggle,
  setToggle,
  setFieldError,
  BISType,
  participantBalances,
  planDetails,
}) => {
  const formName = manageCensusFormNames.CENSUS_VESTING;
  const fields = formFields[formName];
  const { planId } = useRouterParams();
  const { state } = useContext(appLayoutStore);
  const permissions = get(state, "permissions", {});
  //const intPlanId = parseInt(planId, 10);
  const { censusId } = useRouterParams();
  //const intEmployeeId = parseInt(censusId, 10);
  const [sliderOpen, setSliderOpen] = useState(false);
  const [historySliderOpen, setHistorySliderOpen] = useState(false);
  const [isInnerFormDirty, setIsInnerFormDirty] = useState(false);
  const [showDirtyCheckModal, setShowDirtyCheckModal] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(null);
  const [onClickSave, setOnClickSave] = useState(false);
  const [sorting, setSorting] = useState();
  const [runDateValue, setRunDateValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [final, setFinal] = useState(columns);
  const [employeeVestingHistoryDetails, setEmployeeVestingHistoryDetails] =
    useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchData, setSearchData] = useState();
  const [selectedColumns, setSelectedColumns] = useState([
    1, 2, 3, 4, 5, 6, 7,
    // 8,
  ]);
  const [modelOpen, setModelOpen] = useState(false);
  const [vestingRestrictionErrorMsg, setVestingRestrictionErrorMsg] =
    useState("");
  // const [overrideRestriction, setOverrideRestriction] = useState(false);

  const vestingLabels = [
    { label: "Source", columnName: "sourceName" },
    {
      label: "Source balance",
      columnName: "sourceBalance",
    },
    {
      label: "Vesting percentage %",
      columnName: "vestingPercentage",
    },
    { label: "Vesting override", columnName: "vestingOverride" },
    {
      label: "Vested balance",
      columnName: "vestedBalance",
    },
  ];
  const vestingLabels2 = [
    { label: "Vesting YOS", columnName: "vestingYOS" },
    { label: "Computation period", columnName: "computationStartDate" },
    {
      label: "Credited this computation period",
      columnName: "creditedThisYear",
    },
    { label: "", columnName: "computationButtons" },
  ];

  const planType = planDetails.find(
    (item) => item.label === "Plan Type"
  )?.value;
  const isNotApplicable = planType === OPTIONS_DATA_MAPPER.PLAN_TYPES[18];

  const sliderLabel = [
    { label: "Source name", columnName: "sourceName" },
    //{ label: "Vesting schedule", columnName: "vestingSchedule" },
    // {
    //   label: "Vesting percentage",
    //   columnName: "vestingPercentage",
    // },
    { label: "Computation period", columnName: "computationStartDate" },
  ];
  useEffect(() => {
    return () => setIsInnerFormDirty(false);
  }, []);
  const onFormToggle = () => {
    if (isInnerFormDirty) {
      setShowDirtyCheckModal(true);
    } else {
      setSliderOpen(false);
    }
  };
  const onFormToggleSave = () => {
    setShowDirtyCheckModal(true);
    //setSliderOpen(false);
  };
  const handleConfirmClick = () => {
    setSliderOpen(false);
  };

  const handleCancelClick = () => {
    setShowDirtyCheckModal(false);
  };

  const handleClose = () => {
    setModelOpen(false);
  };

  const handleOkClick = () => {
    setModelOpen(false);
  };

  const renderValue = (value) => {
    var tempVal = value;
    value = value?.dataItem ? value.dataItem[value.field] : value;
    const index = tempVal.dataItem["newIndex"];
    var comparedValue;
    if (employeeVestingHistoryDetails.length > index + 1) {
      if (tempVal.dataIndex < employeeVestingHistoryDetails[index + 1].length) {
        comparedValue =
          employeeVestingHistoryDetails[index + 1][tempVal.dataIndex][
            tempVal.field
          ];
      } else {
        comparedValue = tempVal.dataItem[tempVal.field];
      }
    } else {
      comparedValue = tempVal.dataItem[tempVal.field];
    }
    var status = tempVal.dataItem[tempVal] !== comparedValue;
    if (status) {
      return (
        <td className="default-text-color">
          {value || value === 0 ? (
            <div className="default-text-color">{value}</div>
          ) : (
            <div>NA</div>
          )}
        </td>
      );
    } else {
      return (
        <td>{value || value === 0 ? <div>{value}</div> : <div>NA</div>}</td>
      );
    }
    //return <td>{value || value === 0 ? <div>{value}</div> : <div> -</div>}</td>;
  };
  const filterByDates = (fd, td) => {
    var filtered;
    if (fd && td) {
      filtered = employeeVestingHistoryDetails.filter(
        (items) =>
          usDateFormat(items[0].runDate) >= fd &&
          usDateFormat(items[0].runDate) <= td
      );
    } else if (fd != null && td == null) {
      filtered = employeeVestingHistoryDetails.filter(
        (items) => usDateFormat(items[0].runDate) >= fd
      );
    } else if (td != null && fd == null) {
      filtered = employeeVestingHistoryDetails.filter(
        (items) => usDateFormat(items[0].runDate) <= td
      );
    } else {
      filtered = employeeVestingHistoryDetails;
    }
    setFilteredData(filtered);
  };

  const separateArrayByValue = (arr, prop) => {
    var grouped = {};
    var runDate = [];
    arr.forEach(function (obj) {
      var value = obj[prop];
      runDate.push(obj[prop].replace("T", " ").replace("Z", ""));
      // delete obj[prop];
      if (!grouped[value]) {
        grouped[value] = [];
      }
      grouped[value].push(obj);
    });
    // setRunDateValue([...new Set(runDate)]);
    const sortedDates = runDate.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB - dateA;
    });
    setRunDateValue([...new Set(sortedDates)]);
    return grouped;
  };

  const separateKeys = (separatedData) => {
    const rabbit = Object.keys(separatedData);
    const newrabbit = rabbit.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB - dateA;
    });
    var finalHistoryDetails = [];
    for (var i = 0; i < newrabbit.length; i++) {
      finalHistoryDetails.push(separatedData[newrabbit[i]]);
    }
    for (var i = 0; i < finalHistoryDetails.length; i++) {
      for (var j = 0; j < finalHistoryDetails[i].length; j++) {
        finalHistoryDetails[i][j]["newIndex"] = i;
      }
    }
    return finalHistoryDetails;
  };

  const renderValueDate = (value) => {
    var tempVal = value;
    value = value?.dataItem ? value.dataItem[value.field] : value;
    const index = tempVal.dataItem["newIndex"];
    var comparedValue;
    if (employeeVestingHistoryDetails.length > index + 1) {
      if (tempVal.dataIndex < employeeVestingHistoryDetails[index + 1].length) {
        comparedValue =
          employeeVestingHistoryDetails[index + 1][tempVal.dataIndex][
            tempVal.field
          ];
      } else {
        comparedValue = tempVal.dataItem[tempVal.field];
      }
    } else {
      comparedValue = tempVal.dataItem[tempVal.field];
    }
    var status = tempVal.dataItem[tempVal.field] !== comparedValue;
    if (status) {
      return (
        <td className="default-text-color">
          {value || value === 0 ? (
            <div className="default-text-color">{usDateFormat(value)}</div>
          ) : (
            <div>NA</div>
          )}
        </td>
      );
    } else {
      return (
        <td>
          {value || value === 0 ? (
            <div>{usDateFormat(value)}</div>
          ) : (
            <div>-</div>
          )}
        </td>
      );
    }
  };
  const renderValueDateRange = (value) => {
    var startDate = value?.dataItem ? value.dataItem["startDate"] : value;
    var endDate = value?.dataItem ? value.dataItem["endDate"] : value;
    return (
      <td>
        {startDate && endDate ? (
          <div>{`${usDateFormat(startDate)} - ${usDateFormat(endDate)}`}</div>
        ) : (
          <div>NA</div>
        )}
      </td>
    );
  };

  const renderValuePercentage = (value) => {
    return (
      <td>
        {value != null ? (
          <div>{`${parseFloat(value.dataItem.vestingPercentage ?? 0)?.toFixed(
            2
          )} %`}</div>
        ) : (
          <div>-</div>
        )}
      </td>
    );
  };

  const renderValueBoolean = (value) => {
    var tempVal = value;
    value = value?.dataItem ? value.dataItem[value.field] : value;
    const index = tempVal.dataItem["newIndex"];
    var comparedValue;
    if (employeeVestingHistoryDetails.length > index + 1) {
      if (tempVal.dataIndex < employeeVestingHistoryDetails[index + 1].length) {
        comparedValue =
          employeeVestingHistoryDetails[index + 1][tempVal.dataIndex][
            tempVal.field
          ];
      } else {
        comparedValue = tempVal.dataItem[tempVal.field];
      }
    } else {
      comparedValue = tempVal.dataItem[tempVal.field];
    }
    var status = tempVal.dataItem[tempVal.field] !== comparedValue;
    if (status) {
      return (
        <td className="default-text-color">
          {value ? (
            <div className="default-text-color">Yes</div>
          ) : (
            <div className="default-text-color"> No</div>
          )}
        </td>
      );
    } else {
      return <td>{value ? <div>Yes</div> : <div> No</div>}</td>;
    }
  };
  const renderValueConditionalNA = (value) => {
    const fieldName = value.field;

    if (
      isNotApplicable &&
      (fieldName === "creditedThisYear" ||
        fieldName === "vestingOverride" ||
        fieldName === "computationPeriod")
    ) {
      return (
        <td>
          <div>NA</div>
        </td>
      );
    }

    if (fieldName === "creditedThisYear" || fieldName === "vestingOverride") {
      return renderValueBoolean(value);
    }

    if (fieldName === "computationPeriod") {
      return renderValueDateRange(value);
    }
    if (fieldName === "vestingPercentage") {
      return renderValuePercentage(value);
    }

    // Default fallback
    return renderValue(value);
  };

  const scrollHandler = (event) => {
    const e = event.nativeEvent;
    if (lastScrollTop === e.target.scrollTop) {
      return;
    }
    setLastScrollTop(e.target.scrollTop);
    if (
      e.target.scrollTop + 20 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
    }
  };
  class ProductNameHeader extends React.Component {
    render() {
      return (
        <a className="k-link" onClick={this.props.onClick}>
          <span title={this.props.title}>{this.props.title}</span>
          {this.props.children}
        </a>
      );
    }
  }

  const functionApiCall = (values, { setFieldError }) => {
    setIsLoading(true);
    // var separatedData = separateArrayByValue(tempVestingHistoryDetails,'runDate');
    // var finalHistoryDetails = separateKeys(separatedData);
    // setEmployeeVestingHistoryDetails(finalHistoryDetails);
    if (values.toDate < values.fromDate) {
      setFieldError(fields.toDate, "To date should be prior to From date");
      return;
    }
    postEmployeeVestingHistoryDetails(
      parseInt(censusId),
      parseInt(planId),
      parseInt(data.sourceId)
      // vestingFields: values.label,
      // fromDate: values.fromDate ? values.fromDate : null,
      // toDate: values.toDate ? values.toDate : null,
    )
      .then((response) => {
        setIsLoading(false);
        if (response) {
          var separatedData = separateArrayByValue(response, "runDate");
          var finalHistoryDetails = separateKeys(separatedData);
          setEmployeeVestingHistoryDetails(finalHistoryDetails);
          setFilteredData(finalHistoryDetails);
        } else {
        }
      })
      .catch((error) => {
        setIsLoading(false);
        //Handle Error
      });
  };
  const onFormSubmit = (values, { setFieldError }) => {
    var payload = {
      EmployeeId: censusId,
      PlanId: planId,
      VestingOverride: values[fields.vestingOverride],
      YearsOfService: parseFloat(values[fields.vestingYOS], 10),
      comments: values[fields.Comment],
    };
    // setErrors({});
    GetVestingOverrideRestriction(payload).then((response) => {
      if (response.isSuccessfull) {
        setFieldError("comments", null);
        setFieldError("vestingYOS", null);
        setOnClickSave(true);
        setShowDirtyCheckModal(true);

        // onSave(values, { setFieldError });
        // setShowDirtyCheckModal(true);
        //setOnClickSave(true);
        // postSaveVestingConfigurationForSource({
        //   ...values,
        //   vestingMultiplier: parseFloat(values[fields.vestingMultiplier], 10),
        //   vestingYOS: parseFloat(values[fields.vestingYOS], 10),
        //   vestingPercentage: parseFloat(values[fields.vestingPercentage], 10),
        //   vestedBalance: parseFloat(values[fields.vestedBalance], 10),
        //   id: data.id,
        //   ...deficitAndVestingAmount,
        // })
        //   .then((response) => {
        //     if (response.isSuccessfull) {
        //       setToggle(!toggle);
        //       setSliderOpen(false);
        //       return true;
        //     } else {
        //       // setModelOpen(true);
        //       response.errorMessages.forEach((_) => {
        //         setFieldError(_.controlName, `${_.errorCode} : ${_.message}`);
        //         return false;
        //       });
        //       //setOnClickSave(false);
        //     }
        //   })
        //   .catch((error) => {
        //     //Handle Error
        //     setSliderOpen(true);
        //   });
      } else {
        response?.errorMessages?.forEach((_) => {
          if (_?.controlName != null) {
            setFieldError(_?.controlName, `${_?.errorCode} : ${_?.message}`);
          } else {
            setFieldError("comments", null);
            setFieldError("vestingYOS", null);
            setModelOpen(true);
            setVestingRestrictionErrorMsg(response.errorMessages[0].message);
          }
        });
      }
    });
  };

  const onSave = (values, { setFieldError }) => {
    const deficitAndVestingAmount =
      parseFloat(values[fields.vestingMultiplier], 10) != data.vestingMultiplier
        ? getDeficitAndVestingPercentage(
            get(participantBalances, "vestedBalance", 0),
            get(values, fields.vestingMultiplier, 0),
            data.vestingMultiplier,
            get(participantBalances, "regularAccountBalance", 0)
          )
        : {};
    postSaveVestingConfigurationForSource({
      ...values,
      vestingMultiplier: parseFloat(values[fields.vestingMultiplier], 10),
      vestingYOS: parseFloat(values[fields.vestingYOS], 10),
      vestingPercentage: parseFloat(values[fields.vestingPercentage], 10),
      vestedBalance: parseFloat(values[fields.vestedBalance], 10),
      id: data.id,
      ...deficitAndVestingAmount,
    })
      .then((response) => {
        if (response.isSuccessfull) {
          setOnClickSave(true);

          setToggle(!toggle);
          setSliderOpen(false);
          return true;
        } else {
          // setModelOpen(true);
          // response.errorMessages.forEach((_) => {
          //   setFieldError(_.controlName, `${_.errorCode} : ${_.message}`);
          //   return false;
          // });
          setOnClickSave(false);
        }
      })
      .catch((error) => {
        //Handle Error
        setSliderOpen(true);
      });
  };

  const BISTypeMessage = () => {
    switch (BISType) {
      case 1:
        return "The Participant is on hold out period";
      case 2:
        return "The Participant has met Five year BIS criteria";
      case 3:
        return "The Participant has met Rule of Parity criteria";
    }
  };

  const subMenuItem =
    !isEmpty(permissions) &&
    permissions["employeesManagePlanSubMenu"]?.["vesting"];
  const isAllowed = (icon) => {
    if (icon === "pencil-alt") {
      return (subMenuItem || "").includes("U") ? true : false;
    }
  };

  return (
    <>
      <div className="censusVestingCard">
        <div className="boxborder">
          {BISType > 0 && (
            <div className="BISType">
              <i
                aria-hidden="true"
                className="fas fa-exclamation-triangle WarningTriangle"
              ></i>
              <p className="BISTypeContent">{BISTypeMessage()}</p>
            </div>
          )}
          <div className="displaycontent">
            {vestingLabels.map((item, index) => {
              if (index == 0)
                return (
                  <div className="col-display">
                    <p className="label">{item.label}</p>
                    <AddToolTip
                      className="sourcename"
                      name={data[item.columnName]}
                      displayTooltip={data[item.columnName]?.length > 11}
                    >
                      <p className="sourcename">{data[item.columnName]}</p>
                    </AddToolTip>
                    {/* <div className="source-details">
                      <p className="label">{data.vestingSchedule}</p>
                      <hr class="percentage-separator"></hr>
                      <p className="label">
                        {parseFloat(data.vestingPercentage).toFixed(2)} %
                      </p>
                    </div> */}
                  </div>
                );
              else if (index == 1)
                return (
                  <div className="col-display">
                    <p className="label">{item.label}</p>
                    <p className="col-content">
                      {parseFloat(
                        participantBalances?.accountBalance ??
                          data[item.columnName]
                      ).toFixed(2)}
                    </p>
                  </div>
                );
              else if (index == 2)
                return (
                  <div className="col-display">
                    <p className="label">{item.label}</p>
                    <p className="col-content">
                      {parseFloat(data[item.columnName])} %
                    </p>
                  </div>
                );
              else if (index == 3)
                return (
                  <div className="col-display">
                    <p className="label">{item.label}</p>
                    <p className="col-content">
                      {isNotApplicable
                        ? "NA"
                        : data.vestingOverride
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                );
              else
                return (
                  <div className="col-display">
                    <p className="label">{item.label}</p>
                    <p className="col-content">
                      {parseFloat(
                        participantBalances?.vestedBalance ??
                          data[item.columnName]
                      ).toFixed(2)}
                    </p>
                  </div>
                );
            })}
          </div>
          <div className="line-separator"></div>
          <div className="displaycontent">
            {vestingLabels2.map((item, index) => {
              if (index == 3)
                return (
                  <div className="fl">
                    <Link
                      // to={getPathWithParam({
                      //   path: item.link,
                      //   pathParam: [flow, planId, source.id],
                      // })}
                      onClick={() => {
                        functionApiCall(
                          { fromDate: "", toDate: "", label: [] },
                          setFieldError
                        );
                        setHistorySliderOpen(true);
                      }}
                      className="link-style"
                    >
                      View history
                    </Link>
                    {isAllowed("pencil-alt") && (
                      <div className="button-class">
                        <Button
                          type="button"
                          variant="secondary"
                          className=""
                          disabled={isNotApplicable}
                          onClick={() => {
                            setIsInnerFormDirty(false);
                            setShowDirtyCheckModal(false);
                            setSliderOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                );
              else
                return (
                  <div className="col-display">
                    <p className={`label`}>{item.label}</p>
                    <p className="col-bottomcontent">
                      {isNotApplicable
                        ? "NA"
                        : item.columnName === "vestingYOS" &&
                          data[item.columnName] != null
                        ? data[item.columnName] > 1
                          ? data[item.columnName] + " years"
                          : data[item.columnName] + " year"
                        : item.columnName === "creditedThisYear" &&
                          data[item.columnName] != null
                        ? data[item.columnName] == true
                          ? "Yes"
                          : "No"
                        : item.columnName === "vestingOverride" &&
                          data[item.columnName] != null
                        ? data[item.columnName] == true
                          ? "Yes"
                          : "No"
                        : item.columnName === "computationStartDate" &&
                          data[item.columnName] != null
                        ? data[item.columnName]
                        : "NA"}
                    </p>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
      <SliderPanel
        isOpen={sliderOpen}
        width="70%"
        showCancel={false}
        backdropClicked={() => setSliderOpen(false)}
      >
        <Formik
          initialValues={{
            ...initialValues,
            [fields.creditedThisYear]: get(data, "creditedThisYear"),
            [fields.vestingMultiplier]: data.vestingMultiplier
              ? data.vestingMultiplier
              : null,
            [fields.vestingYOS]: data.vestingYOS ? data.vestingYOS : null,
            [fields.vestingPercentage]: data.vestingPercentage
              ? data.vestingPercentage
              : null,
            [fields.vestedBalance]:
              participantBalances?.vestedBalance || data.vestingOverride
                ? parseFloat(
                    get(participantBalances, "vestedBalance", 0)
                  )?.toFixed(2)
                : null,
            [fields.vestingOverride]: data.vestingOverride,
            [fields.comments]: data.comments ? data.comments : null,
          }}
          //onSubmit={onFormSubmit}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            setValues,
            setFieldError,
            values,
            dirty,
            ...rest
          }) => {
            if (isInnerFormDirty !== dirty) {
              setIsInnerFormDirty(dirty);
            }
            const handleConfirmClickVar = () => {
              const status = onSave(values, { setFieldError });
              if (status) {
                setSliderOpen(false);
              } else {
                setSliderOpen(true);
                setShowDirtyCheckModal(false);
              }
            };
            const setInitialDataOnChange = (vestingOverrideToggleData) => {
              setFieldValue(fields.vestingYOS, data.vestingYOS);
              if (!vestingOverrideToggleData) {
                setFieldValue(fields.creditedThisYear, true);
              } else {
                setFieldValue(
                  fields.creditedThisYear,
                  get(data, "creditedThisYear")
                );
              }
              //  setFieldValue(fields.creditedThisYear, data.creditedThisYear);
              setFieldValue(fields.comments, data.comments);
              setFieldValue(fields.vestingPercentage, data.vestingPercentage);
              setFieldValue(
                fields.vestedBalance,
                participantBalances?.vestedBalance || data.vestingOverride
                  ? parseFloat(
                      get(participantBalances, "vestedBalance", 0)
                    )?.toFixed(2)
                  : null
              );
            };
            const clearValuesSlider = () => {
              //    clearFieldValues({
              //       fieldsToClear: [fields.vestingYOS, fields.creditedThisYear,fields.vestingPercentage],
              // });
              if (values[fields.vestingOverride] !== false) {
                setFieldValue(fields.vestingYOS, "");
                setFieldValue(fields.vestingPercentage, "");
                setFieldValue(fields.creditedThisYear, "");
                setFieldValue(fields.vestedBalance, "");
              } else {
                setFieldValue(fields.vestingYOS, data.vestingYOS);
                setFieldValue(fields.vestingPercentage, data.vestingPercentage);
                setFieldValue(fields.creditedThisYear, data.creditedThisYear);
                setFieldValue(
                  fields.vestedBalance,
                  parseFloat(
                    get(participantBalances, "vestedBalance", 0)
                  )?.toFixed(2)
                );
              }
            };

            return (
              <Form
                autoComplete="off"
                className="h-100p"
                onSubmit={handleSubmit}
                validated={rest.submitCount > 0}
              >
                <div className="disp-flex-row space-between core-heading-regular-header mb-2">
                  <div className="core-page-titles">{data.sourceName}</div>
                  <div className="disp-flex-row">
                    <div>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          onFormToggle();
                          setOnClickSave(false);
                        }}
                        className="mr-10px"
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="ml-15">
                      <Button
                        variant="primary"
                        className=""
                        //type="submit"
                        onClick={() => {
                          onFormSubmit(values, { setFieldError });
                          // onFormToggleSave();
                          // setOnClickSave(true);
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="slider-box">
                  {sliderLabel.map((item, index) => (
                    <div className="col-display">
                      <p className="headercontent">{item.label}</p>
                      <p className="valuecontent">
                        {/* {item.columnName == "vestingPercentage"
                          ? data[item.columnName] + "%" */}
                        {data[item.columnName]}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <div>
                    <p className="vesting-fieldlabel">Vesting override</p>
                    <Form.Check
                      type="switch"
                      autoFocus="off"
                      className="mb-5 mt-2"
                      id={data.id}
                      name={fields.vestingOverride}
                      checked={values[fields.vestingOverride]}
                      onChange={() => {
                        setFieldValue(
                          fields.vestingOverride,
                          !values[fields.vestingOverride]
                        );
                        setInitialDataOnChange(values[fields.vestingOverride]);
                        //  clearValuesSlider();
                      }}
                    />
                  </div>
                  <div>
                    <p className="vesting-fieldlabel mt-2">Vesting YOS</p>
                    <Field
                      size="xs"
                      isRequired
                      name={fields.vestingYOS}
                      value={values[fields.vestingYOS]}
                      formGroupClassName="w-fit-content"
                      onChange={(e) => {
                        setFieldValue(fields.vestingYOS, e.target.value);
                        const cvp = getVestingPercentage(
                          e.target.value,
                          get(data, "vesting.scheduleTable", null)
                        );
                        const cvm = getCurrentVestingMultiplier(
                          get(participantBalances, "vestingMultiplier", 0),
                          cvp / 100,
                          (data.vestingPercentage ?? 0) / 100,
                          get(participantBalances, "vestedBalance", 0),
                          get(participantBalances, "regularAccountBalance", 1)
                        );
                        setFieldValue(fields.vestingMultiplier, cvm);
                        if (e.target.value === "") {
                          setFieldValue(fields.vestingPercentage, "");

                          setFieldValue(fields.vestedBalance, "");
                        } else {
                          setFieldValue(fields.vestingPercentage, cvp);
                          setFieldValue(
                            fields.vestedBalance,
                            Math.trunc(
                              cvm *
                                get(
                                  participantBalances,
                                  "regularAccountBalance",
                                  0
                                ) *
                                100 || 0
                            ) / 100
                          );
                        }
                      }}
                      component={FieldInputNumber}
                      type="number"
                      autoComplete="off"
                      disabled={!values[fields.vestingOverride]}
                      min={0}
                      max={99}
                    />
                  </div>
                  <div>
                    <p className="vesting-fieldlabel">Vesting percentage %</p>
                    <Field
                      size="xs"
                      isRequired
                      name={fields.vestingPercentage}
                      value={values[fields.vestingPercentage]}
                      onChange={handleChange}
                      component={FieldInputNumber}
                      type="number"
                      autoComplete="off"
                      disabled={true}
                      min={0}
                      max={100}
                      formGroupClassName="w-fit-content"
                    />
                  </div>
                  <div>
                    <p className="vesting-fieldlabel">Vested balance</p>
                    <Field
                      size="xs"
                      isRequired
                      name={fields.vestedBalance}
                      value={values[fields.vestedBalance]}
                      onChange={handleChange}
                      component={FieldInputDecimal}
                      type="number"
                      autoComplete="off"
                      disabled={true}
                      min={0}
                      max={1000000000000000}
                      formGroupClassName="w-fit-content"
                    />
                  </div>

                  {/* <div className="mt-20">
                    <p className="vesting-fieldlabel">Vesting Multiplier</p>
                    <Field
                      size="xs"
                      isRequired
                      name={fields.vestingMultiplier}
                      value={values[fields.vestingMultiplier]}
                      onChange={handleChange}
                      step="any" // used to remove the exclamatory suggestion in FieldInput
                      component={FieldInput}
                      type="number"
                      autoComplete="off"
                    />

                  </div> */}
                  <div>
                    <p className="vesting-fieldlabel">
                      Credited this computation period
                    </p>
                    <Field
                      size="sm"
                      name={fields.creditedThisYear}
                      options={yesNoOptions}
                      selectedValue={values[fields.creditedThisYear]}
                      type="text"
                      autoComplete="off"
                      value={values[fields.creditedThisYear]}
                      onChange={(value) => {
                        setValues({
                          ...values,
                          [fields.creditedThisYear]: value,
                        });
                      }}
                      isRequired
                      disabled={!values[fields.vestingOverride]}
                      component={FieldButtonGroup}
                    />
                  </div>

                  <div className={`${styles["p-b-25px"]}`}>
                    <Field
                      label="Comments"
                      name={fields.comments}
                      autoComplete="off"
                      value={values[fields.comments]}
                      placeholder="Enter Comments"
                      onChange={handleChange}
                      component={FieldTextarea}
                    />
                  </div>
                </div>
                <FormLeaveGuard
                  showModal={showDirtyCheckModal}
                  handleConfirmClick={handleConfirmClick}
                  handleCancelClick={handleCancelClick}
                />
                {onClickSave && (
                  <VestingOverrideToggle
                    showModal={showDirtyCheckModal}
                    handleConfirmClick={handleConfirmClickVar}
                    handleCancelClick={handleCancelClick}
                    sourceName={data.sourceName}
                  />
                )}
                <ModalNotification
                  show={modelOpen}
                  message={vestingRestrictionErrorMsg}
                  onHide={handleClose}
                  infoType={2}
                  primaryButtonAction={handleOkClick}
                  primaryButtonLabel={"OK"}
                  onlyOneButton={true}
                />
              </Form>
            );
          }}
        </Formik>
      </SliderPanel>
      <SliderPanel
        isOpen={historySliderOpen}
        width="70%"
        showCancel={false}
        backdropClicked={() => setHistorySliderOpen(false)}
        flair="overflow-hidden"
      >
        <LoaderWrapper isLoading={isLoading}>
          <div className="vesting-history-sliderpannel">
            <Formik
              initialValues={{
                ...initialValues,
              }}
              onSubmit={functionApiCall}
              enableReinitialize
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({
                handleChange,
                setFieldValue,
                handleSubmit,
                setValues,
                values,
                ...rest
              }) => {
                const onDaySelected = (fieldName, value) => {
                  setFieldValue(fieldName, value);
                };
                return (
                  <Form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="slider-header vesting-header">
                      <div className="slider-sourcename text-18-medium">
                        Vesting history - {data.sourceName}
                      </div>
                      <div>
                        <Link
                          onClick={() => {
                            setHistorySliderOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          <i className="fal fa-times slidercross-icon fs-24px"></i>
                        </Link>
                      </div>
                    </div>
                    <hr className="vesting-divider" />
                    <div className="fl w-100 space-between">
                      <div
                        className="fl w-100 space-between center"
                        style={{ marginTop: "0", paddingTop: "0" }}
                      >
                        <div
                          className={`${styles["flex-v3"]} fl center`}
                          style={{
                            marginTop: "0",
                            paddingTop: "0",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <Field
                              size="sm"
                              isRequired
                              label="Date range"
                              name={fields.fromDate}
                              value={usDateFormat(values[fields.fromDate])}
                              isDatePicker
                              placeholder="From date"
                              placement="right"
                              onClear={() => onDaySelected(fields.fromDate, "")}
                              popupContent={
                                <DatePicker
                                  onDayClick={(value) =>
                                    onDaySelected(fields.fromDate, value)
                                  }
                                  value={values[fields.fromDate]}
                                />
                              }
                              component={FieldDropSide}
                            />
                          </div>
                          <div>
                            <Field
                              size="sm"
                              label=""
                              name={fields.toDate}
                              isRequired
                              placeholder="To date"
                              value={usDateFormat(values[fields.toDate])}
                              direction="right"
                              isDatePicker
                              onClear={() => {
                                onDaySelected(fields.toDate, "");
                              }}
                              onDefaultClearDisplay={values[fields.fromDate]}
                              popupContent={
                                <DatePicker
                                  onDayClick={(value) =>
                                    onDaySelected(fields.toDate, value)
                                  }
                                  value={values[fields.toDate]}
                                />
                              }
                              component={FieldDropSide}
                            />
                          </div>
                          <div className="">
                            {/* <Field
                            size="sm"
                            isRequired
                            label="Label"
                            name={fields.label}
                            value={toMultiSelectValueById(
                              values[fields.label],
                              labelOptions
                            )}
                            options={labelOptions}
                            isMultiSelect
                            direction="vestingBottomSide"
                            popupContent={
                              <MultiSelectDropdown
                                label="Fields"
                                name={fields.label}
                                onSelect={(value) =>
                                  setFieldValue(fields.label, value)
                                }
                                value={values[fields.label]}
                                options={labelOptions}
                              />
                            }
                            component={FieldDropSide}
                          /> */}
                          </div>
                          <Button
                            className="mt-16"
                            variant="secondary"
                            type="submit"
                            onClick={() => {
                              const fromdate = usDateFormat(
                                values[fields.fromDate]
                              );
                              const todate = usDateFormat(
                                values[fields.toDate]
                              );
                              filterByDates(fromdate, todate);
                            }}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            {/* <div className="mt-16  history-content">
            {
              // renderHistoryTimeline(sortedHistory, get(state,"firstName",""))
              employeeVestingHistoryDetails.length === 0 ? (
                <p>No data available</p>
              ) : (
                employeeVestingHistoryDetails.map((item) => {
                  return <EmployeeVestingHistoryTimeline data={item} />;
                })
              )
            }
          </div> */}
            <div className="">
              {filteredData.map((item, index) => {
                return (
                  <div
                    className={`${styles["w-100p-m-t-0p5r-relative-overflow-scroll-x"]}`}
                  >
                    <div className="mb-2 fw-700">
                      Run date :{" "}
                      {item[0].runDate.replace("T", " ").replace("Z", "")}
                    </div>
                    <Grid
                      data={item}
                      //data={Object.keys(item)}
                      // style={{ height: "400px" }}
                      // total={forfeitureTable.length}
                      onScroll={scrollHandler}
                      resizable={true}
                      fixedScroll
                    >
                      {final.map((column, idx) => {
                        return (
                          <GridColumn
                            key={idx}
                            title={column.label}
                            field={column.field}
                            filter={column.dataType}
                            width={column.width}
                            // cell={renderValueConditionalNA}
                            cells={{ data: renderValueConditionalNA }}
                            headerCell={ProductNameHeader}
                            columnMenu={false}
                          />
                        );
                      })}
                    </Grid>
                  </div>
                );
              })}
            </div>
          </div>
        </LoaderWrapper>
      </SliderPanel>
    </>
  );
};

export default CensusVestingCard;
