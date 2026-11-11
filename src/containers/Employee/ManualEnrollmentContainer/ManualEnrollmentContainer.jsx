import styles from "./ManualEnrollmentContainer.module.scss";
import React, { useState, useEffect, useRef } from "react";
import LoaderWrapper from "@/components/LoaderWrapper";
import Table from "@/components/CsplTable";
import Link from "@/components/Link";
import FieldButtonGroup from "@/components/Forms/FieldButtonGroup";
import AddPlans from "@/components/AddPlans";
import FieldInputDollar from "@/components/Forms/FieldInputDollar";
import FieldInputPercentage from "@/components/Forms/FieldInputPercentage";
import AddToolTip from "@/components/AddToolTip";
import ADIApplicableCard from "@/components/ADIApplicableCard";
import SearchableList from "@/components/SearchableList";
import FieldDropSide from "@/components/Forms/FieldDropSide";
import BannerNotification from "@/components/BannerNotification";
import ModalNotification from "@/components/ModalNotification";
import ToastNotification from "@/components/ToastNotification";
import { usDateFormat, toOptionValuesFromMapper } from "@/utils/helpers";
import {
  Enrollment_periodOfIncrease,
  investmentElectionOptions,
} from "@/utils/constants/common";
import { formFields } from "@/utils/constants/formFields";
import { returnOnlyIfBoolean } from "@/utils/helpers";
import {
  FLOW_TYPES,
  yesNoOptions,
  OPTIONS_DATA_MAPPER,
  dollarOrPercentage,
} from "@/utils/constants/common";
import { manageCensusFormNames } from "@/utils/constants/employee";
import { useRouterParams, useDeepEffect } from "@/abstracts/hooks";
import useRequest from "@/abstracts/useRequest";
import { Formik, Field, FieldArray } from "formik";
import { Form, Button } from "react-bootstrap";

import {
  getDefaultElectionSetting,
  getPlanSourceInformation,
  getPlanInvestments,
  getEmployeeEnrollment,
  optOutPlan,
  getADIApplicableConfiguration,
} from "@/services/enrollment";

import { ParticipantOptOutCommunication } from "@/services/onBoarding";

import {
  saveEnrollment,
  listTransfer,
  listInvestment,
  GetPlanInvestmentsByPlanIdAndEmployeeId,
  getAdvisorRepresentativesByPlanId,
} from "@/services/plan";

import { getInvestmentType } from "@/services/trade";
import { get, isEmpty, flatMap, isEqual } from "lodash-es";
import {
  faTrashAlt,
  faInfoCircle as infocircle,
} from "@fortawesome/pro-light-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
import axios from "axios";
import { appLayoutStore, manageCensusStore } from "../../../contexts";
import { useContext } from "react";
import ManagedAccountInvestmentCard from "./ManagedAccount/ManagedAccountInvestmentCard";
import { getServiceProviderPlanMapping } from "../../../services/managedAccount";
import InvestmentAllocation from "./ManagedAccount/InvestmentAllocation";
import AddSlider from "../../../components/AddSlider/AddSlider";
import { CONTRIBUTION_TYPE } from "@/utils/constants/plan";

const today = new Date();
const columnsADI = [
  {
    label: "Sources",
    className: "ADI_source",
    columnName: "sourceName",
  },
  {
    label: "ADI",
    className: "ADI_applicable",
    columnName: "autoDeferralIncrease",
  },
  {
    label: "ADI stops at",
    className: "w-40p",
    columnName: "maximumADI",
  },
];

const investmentElections = [
  {
    investmentName: "Investment1",
    investmentPercentage: 20,
  },
  {
    investmentName: "Investment2",
    investmentPercentage: 30,
  },
  {
    investmentName: "Investment3",
    investmentPercentage: 50,
  },
];

const ManualEnrollmentContainer = (props) => {
  const {
    getParticipantEnrollmentInfo,
    setGetParticipantEnrollmentInfo,
    saveInvestments,
    setSaveInvestments,
    loading,
    setLoading,
    restricted,
    setRestricted,
    getIsOptOutAccess,
    setIsOptOutAccess,
    getIsOptedOut,
    setIsOptedOut,
    history,
  } = props;
  const { state } = useContext(appLayoutStore);
  const { state: censusState } = useContext(manageCensusStore);
  const permissions = get(state, "permissions", {});
  const [newFlow, setNewFlow] = useState("");
  const [advisorRepresentativeData, setAdvisorRepresentativeData] = useState({
    originalData: [],
    filterData: [],
  });
  const { censusId, flow, planId } = useRouterParams();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("name");
  const planName = name?.replace("%", " ");
  const formName = manageCensusFormNames.MANUAL_ENROLLMENT;
  const fields = formFields[formName];
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [serviceProviderName, setServiceProviderName] = useState(null);
  let [filteredResponse, setFilteredResponse] = useState([]);
  const [sourceDetails, setSourceDetails] = useState();
  const [addedInvestments, setAddedInvestments] = useState({ 0: [] });
  const [searchString, setSearchString] = useState("");
  const [adiData, setAdiData] = useState([]);
  // Flips once getADIApplicableConfiguration has resolved (success or
  // failure), so employeeAdiSources knows when it's safe to stop tracking
  // adiData and lock in a stable value for initialValues.
  const [adiConfigLoaded, setAdiConfigLoaded] = useState(false);
  const [periodOfIncreaseField, setPeriodOfIncreaseField] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [sourceInd, setSourceInd] = useState(0);
  const [investmentTypes, setInvestmentTypes] = useState([]);
  const [DefaultElection, setDefaultElection] = useState({});
  const isEdit = flow === FLOW_TYPES.EDIT;
  const isSave = newFlow === FLOW_TYPES.SAVE;
  const getDefaultElection = DefaultElection;
  const doesAllSourcesFollowSameElection = useRef();
  const customDeferralValuesRef = useRef([]);
  // Backing refs for the employeeAdiSources lock described below.
  const employeeAdiSourcesLocked = useRef(null);
  const employeeAdiSourcesRecordId = useRef(undefined);
  const [sourcesList, setSourcesList] = useState([]);
  let source = axios.CancelToken.source();
  const { response: investmentList } = useRequest({
    method: getPlanInvestments,
    payload: planId,
    defaultResponse: [],
  });
  const [cancelModal, setCancelModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  // const { response: sourcesList } = useRequest({
  //   method: getPlanSourceInformation,
  //   payload: planId,
  // });

  const { response: requestResponse } = useRequest({
    method: listInvestment,
    payload: planId,
    defaultResponse: [],
  });

  const sdBInvestment = requestResponse?.investmentPlanMappings?.filter(
    (_) => _.type === 10
  );

  // Get plan-level SDB tracking setting from the SDB investment data
  const planSDBTrackingEnabled =
    !isEmpty(sdBInvestment) &&
    sdBInvestment[0]?.trackTraditionalAndRothSDBSeparately === true;
  // console.log("planSDBTrackingEnabled", planSDBTrackingEnabled);
  // console.log("sdBInvestment", sdBInvestment);
  const [request, setRequest] = useState({
    method: getInvestmentType,
    stopTrigger: !isEmpty(investmentTypes),
  });
  const { response } = useRequest(request);
  useDeepEffect(() => {
    setInvestmentTypes(
      response?.map((itm, label) => {
        return {
          label: itm.name,
          value: itm.id,
        };
      })
    );
    // setAllInvestmentTypes(
    //   response?.map((itm, label) => {
    //     return {
    //       label: itm.name,
    //       value: itm.id,
    //     };
    //   })
    // );
  }, [response]);

  const enrollmentModes = [
    "NA",
    "Manually Enrolled",
    "Auto Enrolled",
    "Auto Enrolled",
    "Force Enrolled",
  ];
  const filteredClassifications = !isEmpty(censusState?.employee)
    ? censusState?.employee?.employeeClassifications?.filter(
        (item) =>
          item.classificationId &&
          ((item.effectiveStartDate &&
            item.effectiveEndDate &&
            new Date(item.effectiveStartDate) <= today &&
            new Date(item.effectiveEndDate) >= today) ||
            (item.effectiveStartDate &&
              !item.effectiveEndDate &&
              new Date(item.effectiveStartDate) <= today) ||
            (!item.effectiveStartDate &&
              item.effectiveEndDate &&
              new Date(item.effectiveEndDate) >= today))
      )
    : [];

  const classificationIds = [
    ...new Set(filteredClassifications.map((item) => item.classificationId)),
  ];

  // const { response: getDefaultElection } = useRequest({
  //   method: getDefaultElectionSetting,
  //   payload: {
  //     planId: parseInt(planId),
  //     classificationIds: !isEmpty(classificationIds)
  //       ? classificationIds?.join(",")
  //       : "0",
  //   },
  // });

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const [warningVisible, setWarningVisible] = useState(false);
  const closeWarning = () => {
    setWarningVisible(false);
  };

  // const { response: getParticipantEnrollmentInfo } = useRequest({
  //   method: getEnrollment,
  //   payload: { planId: planId, employeeId: censusId },
  // });

  const { response: transfers, loading: isLoading } = useRequest({
    method: listTransfer,
    payload: parseInt(planId),
    defaultResponse: [],
  });
  const transferApiData = get(transfers, "transfers", []);
  let transferData = get(transferApiData, "[0]", {});
  const [serviceProviderOptions, setServiceProviderOptions] = useState([]);
  const [serviceProviderData, setServiceProviderData] = useState({});

  useEffect(() => {
    setLoading(true);
    const classfications = !isEmpty(classificationIds)
      ? classificationIds?.join(",")
      : "0";
    getDefaultElectionSetting({
      planId: parseInt(planId),
      classificationIds: classfications,
      employeeId: parseInt(censusId),
    }).then((response) => {
      if (response) {
        setDefaultElection(response);
      }
    });

    getPlanSourceInformation(planId, source.token).then((response) => {
      setSourcesList(
        response.filter((team) => {
          return team;
        })
      );
    });
    var payload = {
      planId: parseInt(planId),
      classificationIds: !isEmpty(classificationIds)
        ? classificationIds?.join(",")
        : "0",
    };
    getADIApplicableConfiguration(payload)
      .then((response) => {
        setAdiData(get(response, "deferralIncrease", []));
        setPeriodOfIncreaseField(response.periodOfIncrease);
      })
      .finally(() => setAdiConfigLoaded(true));
    return () => {
      source.cancel("cancelled");
    };
  }, []);

  const enrollmentDate = usDateFormat(
    getParticipantEnrollmentInfo?.enrollmentDate
  );
  const optedOutDate = usDateFormat(getParticipantEnrollmentInfo?.optedOutDate);

  let enrollmentStatus;
  if (getIsOptedOut && optedOutDate) {
    enrollmentStatus = "Opted Out";
  } else if (enrollmentDate) {
    enrollmentStatus = "Enrolled";
  } else {
    enrollmentStatus = "Not Enrolled";
  }

  const enrollmentDateLabel =
    getIsOptedOut && optedOutDate ? "Opted out Date" : "Enrollment Date";
  const isEmployeeEnrolled =
    enrollmentStatus === "Enrolled" &&
    !isEmpty(getParticipantEnrollmentInfo?.enrolledSources);

  const displayType = (amt, cont, number) => {
    let res;
    if (cont === "Dollar")
      res =
        number === 0
          ? "Minimum amount " + "$" + amt
          : "Maximum amount " + "$" + amt;
    else
      res =
        number === 0
          ? "Minimum percentage " + amt + "%"
          : "Maximum percentage " + amt + "%";
    return res;
  };

  const columns = [
    {
      label: "Investment",
      className: "column-investment-name",
      columnName: "investmentName",
    },
    {
      label: "Percentage",
      className: "column-investment-percentage",
      columnName: "percentage",
    },
  ];

  const columnsWithAction = [
    {
      label: "Investment",
      className: "column-investment-name-own",
      columnName: "investmentName",
    },
    {
      label: "Percentage",
      className: "column-investment-percentage-own",
      columnName: "percentage",
    },
    {
      label: "",
      className: "column-investment-action-own",
      columnName: "action",
    },
  ];

  const addInvestmentsAndSourceIdToPlan = (name) => {
    setAddedInvestments((e) => ({
      ...e,
      [sourceInd]: name,
    }));
  };

  const onViewButtonClick = () => {
    setModalOpen(true);
  };
  const Invsum = () => {
    let sum1 = 0;
    get(getDefaultElection, "investmentDetails", []).map((source) => {
      sum1 = sum1 + source.investmentPercentage;
    });
    return sum1;
  };
  console.log(filteredResponse, "filteredResponse");
  useEffect(() => {
    if (
      !isEmpty(getParticipantEnrollmentInfo, !isEmpty(serviceProviderOptions))
    ) {
      var serviceProviderDetail = serviceProviderOptions.find(
        (_) => _.id == getParticipantEnrollmentInfo.serviceProviderPlanMapId
      );
      setServiceProviderData(
        getParticipantEnrollmentInfo.serviceProviderPlanMapId != null
          ? {
              name: serviceProviderDetail?.serviceProviderName,
              logoUrl: serviceProviderDetail?.logoUrl,
              isActive: getParticipantEnrollmentInfo.isActive,
            }
          : {}
      );
      setServiceProviderName(serviceProviderDetail?.serviceProviderName);
    }
  }, [getParticipantEnrollmentInfo, serviceProviderOptions]);
  useDeepEffect(() => {
    if (sourceInd === undefined || sourceInd === null) return;
    setFilteredResponse({
      ...filteredResponse,
      [sourceInd]: investmentList
        .filter((team) => {
          return team.investmentName
            ?.toLowerCase()
            .includes(searchString.toLowerCase());
        })
        .map((y) => ({
          ...y,
          sourceId: sourcesList[sourceInd]?.sourceId,
        })),
    });
  }, [searchString, investmentList, sourcesList]);
  const communicationTrigger = () => {
    const payload = {
      employeeId: censusId,
      planId: planId,
    };
    ParticipantOptOutCommunication(payload);
  };

  useEffect(() => {
    filteredResponse = {};
    if (doesAllSourcesFollowSameElection.current == false) {
      sourcesList.forEach((x, i) => {
        filteredResponse[i] = investmentList.map((y) => ({
          ...y,
          sourceId: x.sourceId,
        }));
      });
      setFilteredResponse(filteredResponse);
      return;
    }
    setFilteredResponse({
      [sourceInd]: investmentList.filter((team) => {
        return team.investmentName
          ?.toLowerCase()
          .includes(searchString.toLowerCase());
      }),
    });
  }, [doesAllSourcesFollowSameElection.current]);
  // to set the added Investments
  useDeepEffect(
    () => {
      if (isEmpty(getParticipantEnrollmentInfo) || isEmpty(sourcesList)) return;
      if (
        getParticipantEnrollmentInfo.useDefaultAllocation != null &&
        getParticipantEnrollmentInfo.useDefaultAllocation == true
      )
        return;
      if (
        getParticipantEnrollmentInfo.doesAllSourcesFollowSameElection &&
        getParticipantEnrollmentInfo.doesAllSourcesFollowSameElection == true
      ) {
        setAddedInvestments({
          [sourceInd]: getParticipantEnrollmentInfo.electedInvestments,
        });
        return;
      }
      setAddedInvestments(
        setSourceWiseInvestmentsInformation(getParticipantEnrollmentInfo)
      );
    },
    [getParticipantEnrollmentInfo, sourcesList],
    true
  );

  const getElectedInvestments = (es, values) => {
    if (values["useDefaultAllocation"] == true)
      return getDefaultElection.investmentDetails.map((_) => {
        return { ..._, allocationPercentage: _.investmentPercentage };
      });
    // else {
    else if (values.doesAllSourcesFollowSameElection == true) {
      return values.sameSourcesInvestmentElection;
    }
    return flatMap(Object.values(values.sourceWiseInvestments));
  };
  const getEnrolledSources = (values) => {
    if (
      isEmpty(get(getDefaultElection, "sourceList")) ||
      getDefaultElection.sourceList === undefined ||
      values[fields.useDefaultElection] === false
    ) {
      return values["enrolledSources"].filter((value) => {
        return value.election !== undefined;
      });
    } else {
      return getDefaultElection.sourceList.map((e) => {
        var source = values["enrolledSources"]?.find(
          (x) => x.sourceName === e.sourceName
        );
        return source ? source : e;
      });
    }
  };
  const formSubmit = (
    values,
    { setFieldError, setErrors, setFieldTouched },
    showModal = true
  ) => {
    var errorValues = {};
    if (
      values?.useDefaultAllocation === false &&
      values?.doesAllSourcesFollowSameElection === true &&
      values.sameSourcesInvestmentElection.length === 0
    ) {
      errorValues["sameElectionInvestment"] = `Required`;
    }
    if (
      values?.useDefaultAllocation === false &&
      values?.doesAllSourcesFollowSameElection === false
    ) {
      sourcesList.map((e, i) => {
        if (get(values, `sourceWiseInvestments.${i}`, []).length === 0) {
          errorValues["differentElectionInvestment"] = get(
            errorValues,
            "differentElectionInvestment",
            {}
          );
          errorValues["differentElectionInvestment"][i] = "Required";
        }
      });
    }
    setErrors(errorValues);
    if (isEmpty(errorValues)) {
      saveEnrollmentData(values, showModal, setFieldError, setFieldTouched);
    }
  };

  const saveEnrollmentData = (
    values,
    showModal,
    setFieldError,
    setFieldTouched
  ) => {
    if (values?.serviceProviderPlanMapId != null && showModal) {
      setIsModalVisible(!isModalVisible);
    } else {
      // Mirrors the visibility condition of the "Opt in for Auto-rebalance?" field in the UI.
      const isOptInForAutoRebalanceVisible =
        !get(values, fields.optForManagedAccountService, false) &&
        get(values, fields.optInForSmartRebalancing, true) === false &&
        transferData.periodicRebalancingRequired === true;

      var enrollmentData = {
        id: get(values, "id", 0),
        employeeId: parseInt(censusId, 10),
        planId: parseInt(planId, 10),
        //enrollmentData: get(formValues, "enrollmentData", null),
        useDefaultElection: get(values, fields.useDefaultElection, true),
        useDefaultAllocation: get(values, fields.useDefaultAllocation, true),
        autoDeferralIncease: get(values, fields.autoDeferralIncrease, false),
        doesAllSourcesFollowSameElection: get(
          values,
          fields.doesAllSourcesFollowSameElection,
          true
        ),
        optInForSmartRebalancing: get(
          values,
          fields.optInForSmartRebalancing,
          true
        ),
        planAutoDeferralIncrease: get(
          values,
          fields.autoDeferralIncrease,
          false
        )
          ? get(values, fields.planAutoDeferralIncrease, true)
          : false,
        optInForAutoRebalance: isOptInForAutoRebalanceVisible
          ? get(values, fields.optInForAutoRebalance, true)
          : null,
        threshold:
          isOptInForAutoRebalanceVisible &&
          get(values, fields.optInForAutoRebalance, true) === true
            ? get(values, fields.threshold, null)
            : null,
        enrollmentMode: 1,
        electedInvestments: getElectedInvestments({}, values),
        enrolledSources: getEnrolledSources(values),
        employeeADI: get(values, fields.autoDeferralIncrease, false)
          ? {
              ...get(values, "employeeADI", {}),
              adiSources:
                get(values, "employeeADI.adiSources", [])?.filter(
                  (e) =>
                    !get(values, "enrolledSources", [])?.find(
                      (m) => m.sourceId === e.sourceId
                    )?.excludeFromEnrollment
                ) || [],
            }
          : { adiSources: [] },
        optForManagedAccountService: get(
          values,
          fields.optForManagedAccountService,
          false
        ),
        serviceProviderPlanMapId: get(
          values,
          fields.serviceProviderPlanMapId,
          null
        ),
        participantTrackTraditionalAndRothSDBSeparately:
          get(values, fields.participantTrackTraditionalAndRothSDBSeparately) ??
          false,
        optInForSdb: get(values, "optInForSdb", false),
        isActive: true, //to be removed
        optInForAdvisor: get(values, "optInForAdvisor", false),
        advisorRepresentativeId: get(values, "advisorRepresentativeId", false),
      };
      // Ensure employeeADI always has adiSources array
      if (
        isEmpty(enrollmentData.employeeADI) ||
        !Array.isArray(enrollmentData.employeeADI.adiSources)
      ) {
        enrollmentData.employeeADI = { adiSources: [] };
      }
      setLoading(true);
      saveEnrollment(enrollmentData)
        .then((res) => {
          var enrolledSourcesErrors = 0;
          for (var i = 0; i < res.employeePlanMap.enrolledSources.length; i++) {
            var j = 0;
            if (
              res.employeePlanMap.enrolledSources[i].errorMessages.length > 0
            ) {
              enrolledSourcesErrors = enrolledSourcesErrors + 1;
            }
          }
          if (
            res.employeePlanMap.errorMessages.length === 0 &&
            enrolledSourcesErrors === 0
          ) {
            setLoading(false);
            setIsDisabled(true);
            setNewFlow(FLOW_TYPES.EDIT);
            setIsOptOutAccess(res.isOptOutAccess);
            setIsOptedOut(res.isOptedOut);
            // The saved record keeps the same id, so the ADI-sources lock
            // (see employeeAdiSourcesLocked above) would otherwise never
            // reset and the table would keep showing pre-save values until
            // a full page refresh. Unlock here so it re-derives from the
            // freshly saved employeeADI.adiSources on the next render.
            employeeAdiSourcesLocked.current = null;
            setGetParticipantEnrollmentInfo(res.employeePlanMap);
            setShowToast(true);
            props.onSaveSuccess?.();
          } else {
            for (var i = 0; i < res.employeePlanMap.errorMessages.length; i++) {
              var _ = res.employeePlanMap.errorMessages[i];
              setFieldTouched(_.controlName, true);
              setFieldError(
                _.controlName,
                `${_.errorCode} : ${_.errorMessage}`
              );
            }
            if (
              res.employeePlanMap.useDefaultElection !== null &&
              res.employeePlanMap.useDefaultElection === false
            ) {
              for (
                var i = 0;
                i < res.employeePlanMap.enrolledSources.length;
                i++
              ) {
                var j = 0;
                if (
                  res.employeePlanMap.enrolledSources[i].errorMessages.length >
                  0
                ) {
                  var _ =
                    res.employeePlanMap.enrolledSources[i].errorMessages[j];
                  setFieldTouched(`enrolledSources[${i}].election`, true);
                  setFieldError(
                    `enrolledSources[${i}].election`,
                    `${_.errorCode} : ${_.errorMessage}`
                  );
                }
              }
            }
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const setSourceWiseInvestmentsInformation = (
    getParticipantEnrollmentInfo
  ) => {
    if (
      !isEmpty(getParticipantEnrollmentInfo) &&
      getParticipantEnrollmentInfo.useDefaultAllocation != null &&
      !getParticipantEnrollmentInfo.useDefaultAllocation &&
      getParticipantEnrollmentInfo.doesAllSourcesFollowSameElection != null &&
      !getParticipantEnrollmentInfo.doesAllSourcesFollowSameElection
    ) {
      const sourArr = {};
      for (const investment of getParticipantEnrollmentInfo.electedInvestments) {
        const ind = sourcesList.findIndex(
          (x) => x.sourceId == investment.sourceId
        );
        sourArr[ind] = sourArr[ind]
          ? [...sourArr[ind], investment]
          : [investment];
      }
      return sourArr;
    }
    return getParticipantEnrollmentInfo.electedInvestments != null
      ? getParticipantEnrollmentInfo.electedInvestments
      : [];
  };

  const onOptClick = () => {
    setModalVisible(false);
    optOutPlan(planId, censusId)
      .then((res) => {
        if (res === true) {
          setIsOptedOut(true);
          props.onSaveSuccess?.();
        } else {
          setWarningVisible(true);
        }
        // setLoading(false);
        // setNewFlow(FLOW_TYPES.EDIT);
      })
      .catch(() => {
        // setLoading(false);
      });
  };
  const enrolledSourcesInitialValues =
    !isEmpty(getParticipantEnrollmentInfo) &&
    getParticipantEnrollmentInfo.enrolledSources != null
      ? getParticipantEnrollmentInfo.enrolledSources.map((_) => {
          var source = sourcesList.find((s) => s.sourceId === _.sourceId);
          var contributionFieldType = get(
            getDefaultElection,
            "sourceList",
            []
          ).find((i) => i.sourceContributionId === _.sourceId);
          const defaultElectionSource = get(
            getDefaultElection,
            "sourceList",
            []
          ).find(
            (i) =>
              i.sourceContributionId === _.sourceId ||
              i.sourceName === _.sourceName
          );
          contributionFieldType =
            contributionFieldType?.contributionFieldType ??
            contributionFieldType?.contributionType;
          return {
            ..._,
            isCatchUp:
              source?.isCatchUp ?? defaultElectionSource?.isCatchUp ?? false,
            sourceName: source?.sourceName ?? defaultElectionSource?.sourceName,
            dollarLimitMaximum: source?.dollarLimitMaximum,
            dollarLimitMinimum: source?.dollarLimitMinimum,
            percentageLimitMaximum: source?.percentageLimitMaximum,
            percentageLimitMinimum: source?.percentageLimitMinimum,
            contributionType: source?.contributionType,
            excludeFromEnrollment: _?.excludeFromEnrollment ?? false,
            contributionFieldType:
              _?.contributionFieldType ?? contributionFieldType,
          };
        })
      : sourcesList
          .filter((x) => x.sourceType === 1 && x.sourceCategory === 2)
          .map((_) => {
            return {
              ..._,
              isCatchUp: source?.isCatchUp ?? false,
              election: isEmployeeEnrolled
                ? get(getDefaultElection, "sourceList", []).find(
                    (i) => i.sourceContributionId === _.sourceId
                  )?.contributionRate
                : null,
              excludeFromEnrollment: false,
              contributionFieldType:
                _?.contributionType === "Both"
                  ? 1
                  : _?.contributionType == "Dollar"
                  ? 2
                  : 1,
            };
          });
  const subMenuItem =
    !isEmpty(permissions) &&
    permissions["employeesManagePlanSubMenu"]?.["deferrals"];
  const isAllowed = (icon) => {
    if (icon === "pencil-alt") {
      return (subMenuItem || "").includes("U") ? true : false;
    }
  };
  // Only include sources that are configured for ADI (present in adiData)
  const adiSourceIds = adiData.map((a) => a.sourceId);
  const employeeAdiSourcesComputed = isEmpty(
    getParticipantEnrollmentInfo.employeeADI?.adiSources
  )
    ? !isEmpty(getParticipantEnrollmentInfo.enrolledSources)
      ? getParticipantEnrollmentInfo.enrolledSources
          .filter((_) => !get(_, "excludeFromEnrollment", false))
          .filter((_) => adiSourceIds.includes(_?.sourceId))
          .map((_) => {
            const sourceId = _?.sourceId;
            const adiConfig = adiData.find((e) => e.sourceId === sourceId);
            return {
              id: 0,
              employeeADIId: getParticipantEnrollmentInfo.employeeADI?.id ?? 0,
              sourceId,
              autoDeferralIncreasePercentage:
                adiConfig?.autoDeferralIncreasePercentage ?? 0,
              maximumADIPercentage: adiConfig?.maximumADIPercentage ?? 0,
              autoDeferralIncreaseDollar:
                adiConfig?.autoDeferralIncreaseDollar ?? 0,
              maximumADIDollar: adiConfig?.maximumADIDollar ?? 0,
            };
          })
      : sourcesList
          .filter(
            (x) =>
              x.sourceType === 1 &&
              x.sourceCategory === 2 &&
              adiSourceIds.includes(x.sourceId)
          )
          .map((_) => {
            const sourceId = _?.sourceId;
            const adiConfig = adiData.find((e) => e.sourceId === sourceId);
            return {
              id: 0,
              employeeADIId: getParticipantEnrollmentInfo.employeeADI?.id ?? 0,
              sourceId,
              autoDeferralIncreasePercentage:
                adiConfig?.autoDeferralIncreasePercentage ?? 0,
              maximumADIPercentage: adiConfig?.maximumADIPercentage ?? 0,
              autoDeferralIncreaseDollar:
                adiConfig?.autoDeferralIncreaseDollar ?? 0,
              maximumADIDollar: adiConfig?.maximumADIDollar ?? 0,
            };
          })
    : getParticipantEnrollmentInfo.employeeADI?.adiSources;

  // employeeAdiSourcesComputed legitimately changes once adiData finishes
  // loading (placeholder 0s -> real ADI percentages), which is a genuine
  // initialValues content change and trips Formik's enableReinitialize -
  // wiping out any in-progress edits (e.g. Own election / per-source
  // toggles) that have nothing to do with ADI. Lock the value in once ADI
  // config has loaded so later renders don't keep re-feeding a moving
  // target into initialValues. Re-locks when a different record loads.
  if (employeeAdiSourcesRecordId.current !== getParticipantEnrollmentInfo.id) {
    employeeAdiSourcesRecordId.current = getParticipantEnrollmentInfo.id;
    employeeAdiSourcesLocked.current = null;
  }
  if (adiConfigLoaded && employeeAdiSourcesLocked.current === null) {
    employeeAdiSourcesLocked.current = employeeAdiSourcesComputed;
  }
  const employeeAdiSources =
    employeeAdiSourcesLocked.current ?? employeeAdiSourcesComputed;

  //managed account changes

  useEffect(() => {
    setLoading(true);
    getServiceProviderPlanMapping(planId)
      .then((res) => {
        setLoading(false);
        setServiceProviderOptions(
          res.serviceProviderPlanMapping
            ?.filter((_) => _.connectionStatus == 2)
            .map((e) => {
              return {
                ...e,
                label: e?.serviceProviderName,
                value: e?.id,
              };
            })
        );
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [planId]);

  const updatedAdiSources = (
    currentSources,
    sourceId,
    employeeAdiSources,
    adiData,
    employeeADIId
  ) => {
    const existingSource = employeeAdiSources.find(
      (adiSource) => adiSource.sourceId === sourceId
    );
    if (existingSource) {
      return currentSources.some((s) => s.sourceId === sourceId)
        ? currentSources
        : [existingSource, ...currentSources];
    }

    const adiConfig = adiData.find((e) => e.sourceId === sourceId);
    if (!adiConfig) {
      return currentSources;
    }

    const constructedSource = {
      id: 0,
      employeeADIId,
      sourceId,
      autoDeferralIncreasePercentage:
        adiConfig.autoDeferralIncreasePercentage ?? 0,
      maximumADIPercentage: adiConfig.maximumADIPercentage ?? 0,
      autoDeferralIncreaseDollar: adiConfig.autoDeferralIncreaseDollar ?? 0,
      maximumADIDollar: adiConfig.maximumADIDollar ?? 0,
    };

    return currentSources.some((s) => s.sourceId === sourceId)
      ? currentSources
      : [constructedSource, ...currentSources];
  };
  useDeepEffect(() => {
    getAdvisorRepresentativesByPlanId({
      id: 0,
      from: 0,
      to: 0,
      searchText: "",
      planId: planId,
    })
      .then((response) => {
        if (response?.isSuccessful) {
          const advisorRepresentatives =
            response?.advisorRepresentatives?.map((advisorRepresentative) => ({
              ...advisorRepresentative,
              label: advisorRepresentative.name,
              label1: advisorRepresentative.number,
              value: advisorRepresentative.id,
            })) || [];

          setAdvisorRepresentativeData({
            originalData: advisorRepresentatives,
            filterData: advisorRepresentatives,
          });
        } else {
          setAdvisorRepresentativeData({
            originalData: [],
            filterData: [],
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching advisor representatives:", error);
        setAdvisorRepresentativeData({
          originalData: [],
          filterData: [],
        });
      });
  }, []);
  useDeepEffect(() => {
    if (getParticipantEnrollmentInfo?.advisorRepresentativeId) {
      const temp = advisorRepresentativeData?.originalData?.filter(
        (x) => x.id == getParticipantEnrollmentInfo?.advisorRepresentativeId
      );
      setGetParticipantEnrollmentInfo((prev) => ({
        ...prev,
        advisorRepresentative: get(temp, "0.name"),
        advisorRepresentativeId: parseInt(get(temp, "0.id")),
      }));
    }
  }, [getParticipantEnrollmentInfo]);
  const optInForAdvisorOptions = [
    {
      label: "Yes",
      value: true,
    },
    {
      label: "No",
      value: false,
    },
  ];

  const onAdvisorRepresentativeChange = (value, setFieldValue) => {
    if (value) {
      const temp = advisorRepresentativeData?.originalData?.filter(
        (x) => x.id == value
      );
      setFieldValue(fields.advisorRepresentative, get(temp, "0.name"));
      setFieldValue(
        fields.advisorRepresentativeId,
        parseInt(get(temp, "0.id"))
      );
    } else {
      setFieldValue(fields.advisorRepresentative, "");
      setFieldValue(fields.advisorRepresentativeId, null);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          [fields.sameSourcesInvestmentElection]:
            !isEmpty(getParticipantEnrollmentInfo) &&
            getParticipantEnrollmentInfo.useDefaultAllocation != null &&
            !getParticipantEnrollmentInfo.useDefaultAllocation &&
            getParticipantEnrollmentInfo.doesAllSourcesFollowSameElection !=
              null &&
            getParticipantEnrollmentInfo.doesAllSourcesFollowSameElection
              ? getParticipantEnrollmentInfo.electedInvestments
              : [],
          sourceWiseInvestments: setSourceWiseInvestmentsInformation(
            getParticipantEnrollmentInfo
          ),
          [fields.optForManagedAccountService]:
            getParticipantEnrollmentInfo?.optForManagedAccountService ?? false,
          [fields.threshold]:
            getParticipantEnrollmentInfo.threshold ??
            transferData.rebalancingThreshold,

          ...getParticipantEnrollmentInfo,
          [fields.useDefaultElection]: isEmployeeEnrolled
            ? getParticipantEnrollmentInfo?.useDefaultElection ?? false
            : false,
          enrolledSources: enrolledSourcesInitialValues,
          [fields.planAutoDeferralIncrease]:
            getParticipantEnrollmentInfo.planAutoDeferralIncrease ?? true,
          [fields.optInForSmartRebalancing]:
            getParticipantEnrollmentInfo?.enrollmentMode == 4
              ? false
              : getParticipantEnrollmentInfo.optInForSmartRebalancing ?? true,
          [fields.optInForAutoRebalance]:
            getParticipantEnrollmentInfo?.enrollmentMode == 4
              ? false
              : getParticipantEnrollmentInfo.optInForAutoRebalance ?? false,
          optInForSdb: getParticipantEnrollmentInfo?.optInForSdb ?? false,
          [fields.participantTrackTraditionalAndRothSDBSeparately]:
            getParticipantEnrollmentInfo.participantTrackTraditionalAndRothSDBSeparately ??
            false,
          [fields.employeeADI]: {
            ...getParticipantEnrollmentInfo.employeeADI,
            adiSources: employeeAdiSources,
          },
          [fields.optInForAdvisor]:
            getParticipantEnrollmentInfo?.optInForAdvisor ?? false,
        }}
        enableReinitialize
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={formSubmit}
      >
        {(formProps) => {
          const {
            setFieldValue,
            values,
            handleChange,
            handleSubmit,
            setValues,
            setSubmitting,
            errors,
            resetForm,
            initialValues,
            setFieldError,
            setErrors,
            setFieldTouched,
            ...rest
          } = formProps;
          const allSources = sourcesList
            .filter((x) => x.sourceType === 1 && x.sourceCategory === 2)
            .map((e) => e.sourceId);
          const newSources = get(getParticipantEnrollmentInfo, "id")
            ? allSources.filter((e) => {
                const a = get(values, "enrolledSources", []).find(
                  (x) => x.sourceId === e
                );
                if (isEmpty(a)) {
                  return e;
                }
              })
            : allSources.filter((e) => {
                const a = get(getDefaultElection, "sourceList", []).find(
                  (x) => x.sourceContributionId === e
                );
                if (isEmpty(a)) {
                  return e;
                }
              });

          // get(getDefaultElection, "sourceList", [])?.filter(e => !allSources.find(_ => _ === e.sourceContributionId)).filter(e => !isEmpty(e))?.map(e => e.sourceContributionId),"defaultdefault")
          const addSource = newSources.map((e) => {
            const a = sourcesList.find((x) => x.sourceId === e);
            if (!isEmpty(a)) {
              return {
                ...a,
                sourceContributionId: a.sourceId,
                election: null,
                excludeFromEnrollment: false,
                contributionFieldType: e.contributionType === "Both" ? 1 : 2,
              };
            }
          });
          const isTerminated =
            censusState?.employee?.employmentStatus === "Terminated";
          const sameSourceElectionArrayToRender = isTerminated
            ? get(values, "enrolledSources", [])
            : values[fields.useDefaultElection] === true
            ? getDefaultElection.defaultElection
              ? get(getDefaultElection, "sourceList", []).map((ds) => {
                  const enrolled = get(values, "enrolledSources", []).find(
                    (es) =>
                      es.sourceId === ds.sourceContributionId ||
                      es.sourceName === ds.sourceName
                  );
                  return enrolled && enrolled.election != null
                    ? { ...ds, contributionRate: enrolled.election }
                    : ds;
                })
              : get(values, "enrolledSources", [])
            : get(values, "enrolledSources", []);

          const onSubmit = (savedInvestments) => {
            let inv = [];
            if (values.sameSourcesInvestmentElection)
              savedInvestments.forEach((e) => {
                if (
                  values.sameSourcesInvestmentElection.some(
                    (x) => x.investmentName == e.investmentName
                  )
                )
                  return;
                inv.push(e);
              });
            else {
              inv = saveInvestments; // for the base case pageLoad
            }
            setValues({
              ...values,
              sameSourcesInvestmentElection: [
                ...values.sameSourcesInvestmentElection,
                ...inv,
              ],
            });
            setSaveInvestments([
              ...values.sameSourcesInvestmentElection,
              ...inv,
            ]);
            setModalOpen(false);
          };
          const addSourceWiseInvestments = (addedInvestments, sourceInd) => {
            var invs = [];
            const prevInvs = values.sourceWiseInvestments[sourceInd];
            if (prevInvs && prevInvs.length > 0) {
              invs = [
                ...prevInvs,
                ...addedInvestments?.filter(
                  (x) =>
                    !prevInvs
                      .map((i) => i.investmentId)
                      .includes(x.investmentId)
                ),
              ]; // case where already one or more investments are present for the source
            }
            // else if (invsPresent && !prevInvs) {
            //   invs = [ ...addedInvestments];
            // }
            else {
              invs = addedInvestments ?? []; // case where no investments are added for a source
            }
            setValues({
              ...values,
              sourceWiseInvestments: {
                ...values.sourceWiseInvestments,
                [sourceInd]: invs.map((_) => {
                  return {
                    ..._,
                    sourceId: sourcesList[sourceInd]?.sourceId ?? 0,
                  };
                }),
              },
            });
            setModalOpen(false);
          };

          const Invsum1 = () => {
            let sum1 = 0;
            const sumInp = values.sameSourcesInvestmentElection;
            if (sumInp && sumInp.length > 0) {
              sumInp.forEach((i) => {
                if (i.allocationPercentage) sum1 += i.allocationPercentage;
              });
            }
            return sum1;
          };
          const Invsum2 = (sourceInd) => {
            let sum = 0;
            if (sourceInd in values.sourceWiseInvestments)
              values.sourceWiseInvestments[sourceInd].forEach((i) => {
                if (i.allocationPercentage) sum += i.allocationPercentage;
              });
            return sum;
          };

          const sdBValidation = (investmentId, percentage) => {
            if (sdBInvestment.length !== 0) {
              let isSDb = false;
              if (sdBInvestment[0].id === investmentId) {
                isSDb = true;
              }
              if (isSDb) {
                if (percentage > sdBInvestment[0].maximumSdbAllocation) {
                  return true;
                }
              }
            }
            return false;
          };
          const deletefunction = (name) => {
            const invs =
              !values.useDefaultAllocation &&
              values.doesAllSourcesFollowSameElection
                ? values.sameSourcesInvestmentElection
                : values.sourceWiseInvestments[sourceInd];

            var temp = invs.filter((e) => e.investmentName !== name);
            values.sameSourcesInvestmentElection =
              values.sameSourcesInvestmentElection.filter(
                (x) => x.investmentName !== name
              );
            setAddedInvestments({ [sourceInd]: temp });
            setSaveInvestments(temp);
            setValues({ ...values });
            if (
              values.doesAllSourcesFollowSameElection ===
              getParticipantEnrollmentInfo.doesAllSourcesFollowSameElection
            ) {
              //writing this to prevent enablereintialise resetting the deleted investments
              setGetParticipantEnrollmentInfo((prev) => ({
                ...prev,
                useDefaultAllocation: values.useDefaultAllocation,
                electedInvestments: values.sameSourcesInvestmentElection,
              }));
            }
            //values["ID" + name] = null;
          };
          const deleteSourceInvestment = (name, sourceInd, invInd) => {
            const DATA =
              invInd == 0
                ? [values.sourceWiseInvestments[sourceInd].shift()]
                : values.sourceWiseInvestments[sourceInd].splice(invInd, 1);
            if (values.sourceWiseInvestments[sourceInd].length == 0)
              delete values.sourceWiseInvestments.sourceInd;
            setValues({ ...values });
            // console.log(
            //   "addedInvestments1234",
            //   addedInvestments,
            //   sourceInd,
            //   DATA
            // );
            // setSourcesList(
            //   sourcesList?.filter(
            //     (_) => _?.investmentId != DATA?.investmentId
            //   ) ?? []
            // );
            // const ind = sourcesList.findIndex(
            //   (x) =>
            //     x.sourceId == values.sourceWiseInvestments[sourceInd].sourceId
            // );
            const electedInv =
              getParticipantEnrollmentInfo?.electedInvestments?.filter(
                (_) =>
                  !(
                    _?.investmentId == DATA[0]?.investmentId &&
                    _?.sourceId == DATA[0]?.sourceId
                  )
              ) ?? [];
            setSourcesList(
              sourcesList?.filter(
                (_) => _?.investmentId != DATA[0]?.investmentId
              ) ?? []
            );
            if (
              values.doesAllSourcesFollowSameElection ===
              getParticipantEnrollmentInfo.doesAllSourcesFollowSameElection
            ) {
              //writing this to prevent enablereintialise resetting the deleted investments
              setGetParticipantEnrollmentInfo((prev) => ({
                ...prev,
                electedInvestments: electedInv,
              }));
            }
            setSaveInvestments(values.sourceWiseInvestments[sourceInd]);
            setAddedInvestments({
              [sourceInd]: values.sourceWiseInvestments[sourceInd],
            });
          };
          const isAutoEnrolled =
            getParticipantEnrollmentInfo?.enrollmentMode == 2 ||
            getParticipantEnrollmentInfo?.enrollmentMode == 3;

          // ensure enrolledSources is populated correctly for the no-default case
          values.enrolledSources = get(values, "enrolledSources", []);
          if (
            !getDefaultElection.defaultElection &&
            isEmpty(values.enrolledSources)
          ) {
            values.enrolledSources = addSource;
          }
          if (values[fields.useDefaultElection] === null) {
            values.enrolledSources = values.enrolledSources.map((source) => ({
              ...source,
              election: "",
            }));
          }
          return (
            <>
              <LoaderWrapper isLoading={loading}>
                <Form
                  autoComplete="off"
                  className="h-100p"
                  onSubmit={handleSubmit}
                >
                  <div className={"employee-enrollment-container"}>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <div className="core-heading-regular">
                        Employee enrollment
                        details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div></div>
                      </div>
                      <ModalNotification
                        show={modalVisible}
                        header={"Are you sure?"}
                        message={`You will be opted out from the plan. Would you like to proceed?`}
                        onHide={closeModal}
                        infoType={2}
                        primaryButtonAction={() => onOptClick()}
                        primaryButtonLabel={"Yes"}
                        secondaryButtonAction={closeModal}
                        secondaryButtonLabel={"No"}
                      />

                      <ModalNotification
                        show={warningVisible}
                        header={"Are you sure?"}
                        message={`You will be opted out from the plan. Would you like to proceed?`}
                        onHide={closeWarning}
                        infoType={4}
                        primaryButtonAction={closeWarning}
                        primaryButtonLabel={"Ok"}
                        onlyOneButton={true}
                      />
                      <ModalNotification
                        show={cancelModal}
                        header={"Are you sure?"}
                        message={`Your changes may be lost. Do you want to continue?`}
                        onHide={() => setCancelModal(false)}
                        infoType={2}
                        primaryButtonAction={() => {
                          resetForm();
                          setCancelModal(false);
                          setIsDisabled(true);
                        }}
                        primaryButtonLabel={"Yes"}
                        secondaryButtonAction={() => {
                          setIsDisabled(false);
                          setCancelModal(false);
                        }}
                        secondaryButtonLabel={"No"}
                      />

                      {isDisabled == true ? (
                        isAllowed("pencil-alt") && (
                          <div className="align-center d-flex mr-2">
                            <Button
                              type="button"
                              className="add-btn mr-2"
                              variant="secondary"
                              onClick={() => setModalVisible(true)}
                              disabled={
                                getIsOptedOut == true ||
                                (isAutoEnrolled
                                  ? !getIsOptOutAccess
                                  : getIsOptedOut)
                              }
                            >
                              Opt out of plan
                            </Button>

                            <Button
                              variant="primary"
                              type="button"
                              disabled={getIsOptedOut || restricted}
                              className=""
                              onClick={(event) => {
                                event.preventDefault();
                                setIsDisabled(false);
                                if (!getIsOptedOut)
                                  setTimeout(
                                    () => setNewFlow(FLOW_TYPES.SAVE),
                                    300
                                  );
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        )
                      ) : (
                        <div className="align-center mr-2">
                          <Button
                            type="button"
                            className="add-btn mr-2"
                            variant="secondary"
                            onClick={() => {
                              setNewFlow(FLOW_TYPES.EDIT);
                              if (isEqual(values, initialValues) == false) {
                                setCancelModal(true);
                              } else {
                                setIsDisabled(true);
                                setCancelModal(false);
                              }
                            }}
                          >
                            Cancel
                          </Button>

                          <Button
                            type="submit"
                            className="add-btn "
                            variant="primary"
                          >
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                    {getIsOptedOut == true && (
                      <div className="mb-30px">
                        <BannerNotification
                          infoType={3}
                          message={`You have been opted Out of the Plan`}
                        />
                      </div>
                    )}

                    <div className={`${styles["p-b-7px-m-b-20px-m-l-0px"]}`} />
                    <div className="enrollment-status-card">
                      <div className="name cusstyrow">
                        <p className=" w-20 core-body-text-regular-medium-d ">
                          Enrollment Status{" "}
                        </p>
                        <p className="core-body-text-regular-medium-d w-30">
                          Mode of Enrollment
                        </p>
                        <p className="core-body-text-regular-medium-d w-20">
                          {enrollmentDateLabel}
                        </p>
                      </div>
                      <div className="name cusstyrow">
                        <p className="m-0 w-20">{enrollmentStatus}</p>
                        <p className="m-0 w-30">
                          {enrollmentModes[
                            getParticipantEnrollmentInfo?.enrollmentMode
                          ] ?? "-"}
                        </p>
                        <p className="m-0 w-20">
                          {getIsOptedOut ? optedOutDate : enrollmentDate || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="enrollment-deferal-card">
                      <p className="core-body-text-large-medium ">
                        Deferral election
                      </p>

                      <Field
                        isRequired
                        name={fields.useDefaultElection}
                        label="Use default plan deferral election"
                        size="sm"
                        onClick={() => {}}
                        options={yesNoOptions}
                        selectedValue={
                          values[fields.useDefaultElection] ?? false
                        }
                        onChange={(value) => {
                          if (
                            value &&
                            values[fields.useDefaultElection] === false
                          ) {
                            customDeferralValuesRef.current = get(
                              values,
                              "enrolledSources",
                              []
                            ).map((source) => ({
                              ...source,
                            }));
                          }
                          setFieldValue(fields.useDefaultElection, value);
                          if (!value) {
                            setFieldValue(
                              "enrolledSources",
                              isEmployeeEnrolled &&
                                !isEmpty(customDeferralValuesRef.current)
                                ? customDeferralValuesRef.current.map(
                                    (source) => ({
                                      ...source,
                                    })
                                  )
                                : sourcesList
                                    .filter(
                                      (x) =>
                                        x.sourceType === 1 &&
                                        x.sourceCategory === 2
                                    )
                                    .map((_) => {
                                      return {
                                        ..._,
                                        election: null,
                                        excludeFromEnrollment: false,
                                        contributionFieldType:
                                          _?.contributionType === "Both"
                                            ? 1
                                            : _?.contributionType === "Dollar"
                                            ? 2
                                            : 1,
                                      };
                                    })
                            );
                          }
                          //commented out because of the new flow
                          // else if (
                          //   value &&
                          //   getParticipantEnrollmentInfo?.useDefaultElection
                          // )
                          //   setFieldValue(
                          //     "enrolledSources",
                          //     enrolledSourcesInitialValues
                          //   );
                          else
                            setFieldValue(
                              "enrolledSources",
                              sourcesList
                                .filter(
                                  (x) =>
                                    x.sourceType === 1 && x.sourceCategory === 2
                                )
                                .map((_) => {
                                  let Details = get(
                                    getDefaultElection,
                                    "sourceList",
                                    []
                                  ).find(
                                    (i) => i.sourceContributionId === _.sourceId
                                  );
                                  const contributionType =
                                    Details?.contributionType ??
                                    _?.contributionType;
                                  return {
                                    ..._,
                                    election: Details?.contributionRate,
                                    excludeFromEnrollment: false,
                                    contributionFieldType:
                                      contributionType === "Dollar" ||
                                      contributionType ===
                                        CONTRIBUTION_TYPE.Dollar
                                        ? Details?.contributionFieldType ?? 2
                                        : Details?.contributionFieldType ?? 1,
                                  };
                                })
                            );
                        }}
                        disabled={
                          !isSave || !getDefaultElection.defaultElection
                        }
                        component={FieldButtonGroup}
                      />

                      {values[fields.useDefaultElection] === true
                        ? sameSourceElectionArrayToRender
                            .concat(
                              !getDefaultElection.defaultElection
                                ? addSource
                                : []
                            )
                            .map((e, i) => {
                              const fieldName = `${fields.contributionType}${e.sourceId}`;
                              const FieldContributionType =
                                e.contributionType ===
                                  CONTRIBUTION_TYPE.Dollar ||
                                sourcesList.find(
                                  (_) => _.sourceId == e.sourceId
                                )?.contributionType == "Dollar" ||
                                ((e.contributionType ===
                                  CONTRIBUTION_TYPE.Both ||
                                  e.contributionType === "Both") &&
                                  e.contributionFieldType === 2)
                                  ? FieldInputDollar
                                  : FieldInputPercentage;
                              const valueOfField =
                                e.contributionRate ?? e.election;
                              return (
                                <div key={i}>
                                  <>
                                    <div className="core-body-text-regular-medium-sl text-nowrap mb-10 d-flex">
                                      {e.sourceName}
                                      {e?.isCatchUp && (
                                        <AddToolTip
                                          name={
                                            "Eligibility limited to participants aged 50 and above, or as defined by plan rules."
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={infocircle}
                                            className="core-body-text-regular-medium-sl ml-4p"
                                          />
                                        </AddToolTip>
                                      )}
                                    </div>
                                    <Field
                                      key={i}
                                      size="xs"
                                      isRequired
                                      name={e.sourceName}
                                      // label={e.sourceName}
                                      value={valueOfField}
                                      disabled={true}
                                      component={FieldContributionType}
                                      type="number"
                                      autoComplete="off"
                                    />
                                  </>
                                </div>
                              );
                            })
                        : null}

                      {values[fields.useDefaultElection] === false ||
                      values[fields.useDefaultElection] === null ? (
                        <FieldArray name="enrolledSources">
                          {(fieldArrayProps) =>
                            values["enrolledSources"].map((e, i) => {
                              var source = sourcesList
                                .filter(
                                  (x) =>
                                    x.sourceType === 1 && x.sourceCategory === 2
                                )
                                .find((x) => x.sourceId === e.sourceId);

                              const fieldContributionTypeName =
                                "enrolledSources[" +
                                i +
                                "].contributionFieldType";
                              const fieldName =
                                "enrolledSources[" + i + "].election";
                              const checkBoxName =
                                "enrolledSources[" +
                                i +
                                "].excludeFromEnrollment";
                              const DScontrolType =
                                e.contributionType === "Dollar" ||
                                (e.contributionType === "Both" &&
                                  values["enrolledSources"][i]
                                    .contributionFieldType === 2)
                                  ? FieldInputDollar
                                  : FieldInputPercentage;
                              const minMaxDescription =
                                e.contributionType === "Dollar" ||
                                (e.contributionType === "Both" &&
                                  values["enrolledSources"][i]
                                    .contributionFieldType === 2)
                                  ? "Minimum $" +
                                    e.dollarLimitMinimum +
                                    " / " +
                                    "Maximum $" +
                                    e.dollarLimitMaximum
                                  : "Minimum " +
                                    e.percentageLimitMinimum +
                                    "% / " +
                                    "Maximum " +
                                    e.percentageLimitMaximum +
                                    "%";

                              return (
                                <div key={i}>
                                  <div className="d-flex mb-10 mt-10">
                                    <input
                                      name={checkBoxName}
                                      type="checkbox"
                                      id={checkBoxName}
                                      value={get(values, checkBoxName)}
                                      onChange={(value) => {
                                        setFieldValue(
                                          checkBoxName,
                                          value.target.checked
                                        );
                                        if (value.target.checked) {
                                          if (
                                            !isEmpty(
                                              get(
                                                values,
                                                "employeeADI.adiSources",
                                                []
                                              )
                                            )
                                          ) {
                                            setFieldValue(
                                              "employeeADI.adiSources",
                                              get(
                                                values,
                                                "employeeADI.adiSources",
                                                []
                                              ).filter(
                                                (adiSource) =>
                                                  adiSource.sourceId !==
                                                  get(
                                                    values,
                                                    `enrolledSources.${i}.sourceId`
                                                  )
                                              )
                                            );
                                          }
                                        } else {
                                          const sourceId = get(
                                            values,
                                            `enrolledSources.${i}.sourceId`
                                          );
                                          const currentSources = get(
                                            values,
                                            "employeeADI.adiSources",
                                            []
                                          );
                                          const employeeADIId =
                                            get(values, "employeeADI.id", 0) ??
                                            0;
                                          setFieldValue(
                                            "employeeADI.adiSources",
                                            updatedAdiSources(
                                              currentSources,
                                              sourceId,
                                              employeeAdiSources,
                                              adiData,
                                              employeeADIId
                                            )
                                          );
                                        }
                                      }}
                                      checked={get(values, checkBoxName)}
                                      disabled={isEdit && !isSave}
                                      className="mt-1"
                                    />
                                    <div className="core-body-text-regular-medium-sl ml-1">
                                      Exclude from Enrollment
                                    </div>
                                  </div>
                                  <>
                                    <div className="core-body-text-regular-medium-sl text-nowrap mb-10 d-flex">
                                      {e.sourceName}
                                      {e?.isCatchUp && (
                                        <AddToolTip
                                          name={
                                            "Eligibility limited to participants aged 50 and above, or as defined by plan rules."
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={infocircle}
                                            className="core-body-text-regular-medium-sl ml-4p"
                                          />
                                        </AddToolTip>
                                      )}
                                    </div>
                                    <div className="d-flex">
                                      <Field
                                        size="xs"
                                        isRequired
                                        name={fieldName}
                                        // label={e.sourceName}
                                        // hasSuggestion
                                        // suggestionDefaultText={minMaxDescription}
                                        // shouldDisplaySuggestion
                                        component={DScontrolType}
                                        type="number"
                                        autoComplete="off"
                                        onChange={(e) => handleChange(e)}
                                        disabled={
                                          isDisabled ||
                                          get(values, checkBoxName)
                                        }
                                      />
                                      &nbsp;&nbsp;&nbsp;
                                      {(e.contributionType === "Both" ||
                                        sourcesList.find(
                                          (_) => _.sourceId == e.sourceId
                                        )?.contributionType === "Both") && (
                                        <Field
                                          size="xs"
                                          name={fieldContributionTypeName}
                                          defaultValue={1}
                                          label={""}
                                          showNoLabelSpacer={false}
                                          value={
                                            values["enrolledSources"][i]
                                              .contributionFieldType
                                          }
                                          selectedValue={
                                            values["enrolledSources"][i]
                                              .contributionFieldType
                                              ? values["enrolledSources"][i]
                                                  .contributionFieldType
                                              : e.contributionType ===
                                                  "Dollar" ||
                                                sourcesList.find(
                                                  (_) =>
                                                    _.sourceId == e.sourceId
                                                )?.contributionType == "Dollar"
                                              ? 2
                                              : 1
                                          }
                                          // selectedValue={
                                          //   values["enrolledSources"][i]
                                          //     .contributionFieldType
                                          //     ? values["enrolledSources"][i]
                                          //         .contributionFieldType
                                          //     : e.contributionType === "Both" ||
                                          //       sourcesList.find(
                                          //         (_) => _.sourceId == e.sourceId
                                          //       )?.contributionType == "Both"
                                          //     ? values["enrolledSources"][i]
                                          //         .contributionFieldType === 1
                                          //         :values["enrolledSources"][i]
                                          //         .contributionFieldType === 2
                                          // }
                                          options={dollarOrPercentage}
                                          onChange={(value) => {
                                            sourcesList
                                              ?.filter(
                                                (e) =>
                                                  e.sourceType === 1 &&
                                                  e.sourceCategory === 2 &&
                                                  adiSourceIds.includes(
                                                    e.sourceId
                                                  )
                                              )
                                              .map((e, i) => {
                                                setFieldValue(
                                                  `employeeADI.adiSources.${i}.autoDeferralIncreasePercentage`,
                                                  adiData.find(
                                                    (m) =>
                                                      m.sourceId === e?.sourceId
                                                  )
                                                    ?.autoDeferralIncreasePercentage
                                                );
                                                setFieldValue(
                                                  `employeeADI.adiSources.${i}.maximumADIPercentage`,
                                                  adiData.find(
                                                    (m) =>
                                                      m.sourceId === e?.sourceId
                                                  )?.maximumADIPercentage
                                                );
                                                setFieldValue(
                                                  `employeeADI.adiSources.${i}.autoDeferralIncreaseDollar`,
                                                  adiData.find(
                                                    (m) =>
                                                      m.sourceId === e?.sourceId
                                                  )?.autoDeferralIncreaseDollar
                                                );
                                                setFieldValue(
                                                  `employeeADI.adiSources.${i}.maximumADIDollar`,
                                                  adiData.find(
                                                    (m) =>
                                                      m.sourceId === e?.sourceId
                                                  )?.maximumADIDollar
                                                );
                                              });
                                            setFieldValue(
                                              fieldContributionTypeName,
                                              value
                                            );
                                          }}
                                          component={FieldButtonGroup}
                                          disabled={
                                            isDisabled ||
                                            get(values, checkBoxName)
                                          }
                                        />
                                      )}
                                    </div>
                                  </>
                                  <div className="fieldSuggestionDE">
                                    {minMaxDescription}
                                  </div>
                                </div>
                              );
                            })
                          }
                        </FieldArray>
                      ) : null}
                    </div>
                    <Field
                      isRequired
                      name={fields.autoDeferralIncrease}
                      label="Auto Deferral Increase"
                      size="sm"
                      options={yesNoOptions}
                      selectedValue={returnOnlyIfBoolean(
                        values[fields.autoDeferralIncrease]
                      )}
                      onChange={(value) => {
                        setFieldValue(fields.autoDeferralIncrease, value);
                        setFieldValue(
                          "employeeADI.adiSources",
                          get(values, "employeeADI.adiSources", [])
                        );
                        setFieldValue(
                          "employeeADI.periodOfIncrease",
                          periodOfIncreaseField
                        );
                        if (value) {
                          setFieldValue(fields.planAutoDeferralIncrease, true);
                        }
                      }}
                      disabled={isDisabled}
                      component={FieldButtonGroup}
                    />

                    {values[fields.autoDeferralIncrease] && (
                      <Field
                        isRequired
                        name={fields.planAutoDeferralIncrease}
                        label="Use default plan Auto deferral increase values?"
                        size="sm"
                        options={yesNoOptions}
                        selectedValue={returnOnlyIfBoolean(
                          values[fields.planAutoDeferralIncrease]
                        )}
                        onChange={(value) => {
                          setFieldValue(fields.planAutoDeferralIncrease, value);
                          if (value) {
                            employeeAdiSources?.map((e, i) => {
                              setFieldValue(
                                `employeeADI.adiSources.${i}.autoDeferralIncrease`,
                                adiData.find((m) => m.sourceId === e?.sourceId)
                                  ?.autoDeferralIncrease
                              );
                              setFieldValue(
                                `employeeADI.adiSources.${i}.autoDeferralIncreasePercentage`,
                                adiData.find((m) => m.sourceId === e?.sourceId)
                                  ?.autoDeferralIncreasePercentage ?? ""
                              );
                              setFieldValue(
                                `employeeADI.adiSources.${i}.maximumADIPercentage`,
                                adiData.find((m) => m.sourceId === e?.sourceId)
                                  ?.maximumADIPercentage ?? ""
                              );
                              setFieldValue(
                                `employeeADI.adiSources.${i}.autoDeferralIncreaseDollar`,
                                adiData.find((m) => m.sourceId === e?.sourceId)
                                  ?.autoDeferralIncreaseDollar ?? ""
                              );
                              setFieldValue(
                                `employeeADI.adiSources.${i}.maximumADIDollar`,
                                adiData.find((m) => m.sourceId === e?.sourceId)
                                  ?.maximumADIDollar ?? ""
                              );
                              setFieldValue(
                                `employeeADI.adiSources.${i}.maximumADI`,
                                adiData.find((m) => m.sourceId === e?.sourceId)
                                  ?.maximumADI ?? ""
                              );
                            });
                            const updatedErrors = { ...errors };
                            if (
                              Object.keys(updatedErrors).length !== 0 &&
                              updatedErrors.hasOwnProperty("employeeADI")
                            )
                              delete updatedErrors?.employeeADI;
                            setErrors(updatedErrors);
                          }
                        }}
                        disabled={isDisabled}
                        component={FieldButtonGroup}
                      />
                    )}
                    {values[fields.autoDeferralIncrease] === true && (
                      <div>
                        <Field
                          size="md1"
                          isRequired
                          name="employeeADI.periodOfIncrease"
                          label={"Period of increase"}
                          options={Enrollment_periodOfIncrease}
                          selectedValue={get(
                            values,
                            "employeeADI.periodOfIncrease"
                          )}
                          value="employeeADI.periodOfIncrease"
                          onChange={(value) => {
                            setFieldValue(
                              `employeeADI.periodOfIncrease`,
                              value
                            );
                          }}
                          component={FieldButtonGroup}
                          //validate={required}
                          disabled={isEdit && !isSave}
                        />

                        {get(values, fields.autoDeferralIncrease, false) && (
                          <>
                            {get(values, "employeeADI.adiSources", []).length >
                              0 && (
                              <div className="d-flex ADI_width">
                                {columnsADI.map((item, index) => {
                                  return (
                                    <div
                                      className={`${item.className} ${
                                        {
                                          ADI_increaseUpto: "pl-10px",
                                        }[item.className] || ""
                                      }`}
                                      key={index}
                                    >
                                      {item.label}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {get(values, "employeeADI.adiSources", [])
                              .sort((a, b) => a?.sourceId - b?.sourceId)
                              .map((sourceDeferral, index) => {
                                const fieldNameAutoDeferralIncreasePercentage = `employeeADI.adiSources.${index}.autoDeferralIncreasePercentage`;
                                const fieldNameMaximumADIPercentage = `employeeADI.adiSources.${index}.maximumADIPercentage`;
                                const fieldNameAutoDeferralIncreaseDollar = `employeeADI.adiSources.${index}.autoDeferralIncreaseDollar`;
                                const fieldNameMaximumADIDollar = `employeeADI.adiSources.${index}.maximumADIDollar`;
                                const adiOri = sourcesList?.find(
                                  (e, i) =>
                                    e.sourceId === sourceDeferral?.sourceId
                                );
                                const contributionTypes = {
                                  Percentage: 1,
                                  Dollar: 2,
                                  Both: 3,
                                };
                                const defaultSource =
                                  getEnrolledSources(values);
                                const valuesOfSource = {
                                  ...adiOri,
                                  limitMinimumDollar:
                                    adiOri?.dollarLimitMinimum,
                                  limitMaximumDollar:
                                    adiOri?.dollarLimitMaximum,
                                  limitMinimumPercentage:
                                    adiOri?.percentageLimitMinimum,
                                  limitMaximumPercentage:
                                    adiOri?.percentageLimitMaximum,
                                  contributionType:
                                    contributionTypes[adiOri?.contributionType],
                                };
                                return (
                                  <div className={`${styles["m-b-1r"]}`}>
                                    <ADIApplicableCard
                                      values={values}
                                      setFieldValue={setFieldValue}
                                      isEdit={isEdit}
                                      isSave={isSave}
                                      handleChange={handleChange}
                                      sourceDeferral={valuesOfSource}
                                      transformedEmployeeDeferralSourceList={[
                                        valuesOfSource,
                                      ]}
                                      index={0}
                                      fieldNameAutoDeferralIncreasePercentage={
                                        fieldNameAutoDeferralIncreasePercentage
                                      }
                                      fieldNameAutoDeferralIncreaseDollar={
                                        fieldNameAutoDeferralIncreaseDollar
                                      }
                                      fieldNameMaximumADIDollar={
                                        fieldNameMaximumADIDollar
                                      }
                                      fieldNameMaximumADIPercentage={
                                        fieldNameMaximumADIPercentage
                                      }
                                      isDefault={
                                        values[fields.planAutoDeferralIncrease]
                                          ? true
                                          : false
                                      }
                                      fields={fields}
                                      defaultSource={defaultSource}
                                      defaultSourceId={sourceDeferral?.sourceId}
                                      isManual={true}
                                    />
                                  </div>
                                );
                              })}
                          </>
                        )}
                      </div>
                    )}

                    <Field
                      size="md"
                      isRequired
                      name={fields.optInForAdvisor}
                      label={"Opt for Advisor Directed Services"}
                      options={optInForAdvisorOptions}
                      selectedValue={values[fields.optInForAdvisor]}
                      value={values[fields.optInForAdvisor]}
                      onChange={(value) => {
                        setFieldValue(fields.optInForAdvisor, value);
                        setFieldValue(fields.advisorRepresentative, "");
                        setFieldValue(fields.advisorRepresentativeId, null);
                      }}
                      component={FieldButtonGroup}
                      disabled={isEdit && !isSave}
                    />

                    {values[fields.optInForAdvisor] && (
                      <Field
                        size="md"
                        noLabelTransform
                        label="Advisor Representative"
                        isRequired
                        name={fields.advisorRepresentative}
                        value={values[fields.advisorRepresentative]}
                        placeholder="Select"
                        direction="right"
                        popupContent={
                          <SearchableList
                            size="md"
                            label="Select"
                            page="managePayroll"
                            options={advisorRepresentativeData.filterData}
                            onSearch={(search) => {
                              const searchText = search?.toLowerCase() ?? "";
                              setAdvisorRepresentativeData((prev) => ({
                                ...prev,
                                filterData: prev.originalData.filter(
                                  (x) =>
                                    x.name
                                      ?.toLowerCase()
                                      .includes(searchText) ||
                                    x.number?.toLowerCase().includes(searchText)
                                ),
                              }));
                            }}
                            onSelect={(value) =>
                              onAdvisorRepresentativeChange(
                                value,
                                setFieldValue
                              )
                            }
                            selectedValue={values[fields.advisorRepresentative]}
                          />
                        }
                        component={FieldDropSide}
                        disabled={isEdit && !isSave}
                      />
                    )}

                    <div className="enrollment-deferal-card">
                      <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <p className="core-body-text-large-medium">
                          Investment election
                        </p>
                        <div className="d-flex flex-wrap align-items-center gap-3">
                          <Button
                            type="button"
                            className="add-btn"
                            variant="secondary"
                            onClick={() => communicationTrigger()}
                            disabled={getIsOptedOut == true}
                          >
                            Participant Optout
                          </Button>
                        </div>
                      </div>
                      <>
                        <div className="core-body-text-regular-medium-sl text-nowrap mb-10 d-flex">
                          Opt for Managed Account Services
                          {isEmpty(serviceProviderOptions) && (
                            <AddToolTip
                              name={
                                "Managed account services not available for this plan."
                              }
                            >
                              <FontAwesomeIcon
                                icon={infocircle}
                                className="core-body-text-regular-medium-sl ml-4p"
                              />
                            </AddToolTip>
                          )}
                        </div>
                        <Field
                          isRequired
                          name={fields.optForManagedAccountService}
                          //label="Opt for Managed Account Services"
                          size="sm"
                          options={yesNoOptions}
                          selectedValue={returnOnlyIfBoolean(
                            values[fields.optForManagedAccountService]
                          )}
                          onChange={(value) => {
                            //setFieldValue("sourceWiseInvestments", []);
                            setFieldValue(
                              fields.optForManagedAccountService,
                              value
                            );
                            if (value == true && values.id == 0) {
                              setFieldValue(fields.useDefaultAllocation, true);
                            } else if (value == false && values.id == 0) {
                              setFieldValue(fields.useDefaultAllocation, null);
                            }
                          }}
                          disabled={
                            ![null, undefined, ""].includes(
                              getParticipantEnrollmentInfo?.serviceProviderPlanMapId
                            ) ||
                            isDisabled ||
                            isEmpty(serviceProviderOptions)
                          }
                          component={FieldButtonGroup}
                        />
                      </>

                      {values[fields.optForManagedAccountService] && (
                        <>
                          <Field
                            isRequired
                            size="md"
                            value={values[fields.serviceProviderPlanMapId]}
                            name={fields.serviceProviderPlanMapId}
                            options={serviceProviderOptions}
                            direction="right"
                            placeholder="Select"
                            disabled={
                              ![null, undefined, ""].includes(
                                getParticipantEnrollmentInfo?.serviceProviderPlanMapId
                              ) || isDisabled
                            }
                            popupContent={
                              <SearchableList
                                label="Select"
                                isNotTypeAhead
                                options={serviceProviderOptions}
                                onSelect={(value, label) => {
                                  setFieldValue(
                                    fields.serviceProviderPlanMapId,
                                    value
                                  );
                                  setServiceProviderName(label);
                                }}
                                selectedValue={
                                  values[fields.serviceProviderPlanMapId]
                                }
                              />
                            }
                            component={FieldDropSide}
                          />

                          <ManagedAccountInvestmentCard
                            columns={columns}
                            serviceProvider={serviceProviderData}
                            investmentElections={
                              getParticipantEnrollmentInfo?.isActive
                                ? getParticipantEnrollmentInfo?.electedInvestments
                                : []
                            }
                          />
                        </>
                      )}

                      {!values[fields.optForManagedAccountService] && (
                        <>
                          <Field
                            isRequired
                            name={fields.useDefaultAllocation}
                            label="Select method of election"
                            size="sm"
                            options={investmentElectionOptions}
                            selectedValue={returnOnlyIfBoolean(
                              values[fields.useDefaultAllocation]
                            )}
                            onChange={(value) => {
                              setFieldValue("sourceWiseInvestments", []);
                              setFieldValue(fields.useDefaultAllocation, value);
                              setFieldValue(
                                fields.doesAllSourcesFollowSameElection,
                                true
                              );
                              if (addedInvestments?.[0]?.length > 0)
                                setAddedInvestments({ 0: [] });
                              if (saveInvestments?.length > 0)
                                setSaveInvestments([]);
                            }}
                            disabled={isDisabled}
                            component={FieldButtonGroup}
                          />

                          {values[fields.useDefaultAllocation] === true ? (
                            <InvestmentAllocation
                              columns={columns}
                              investmentElection={
                                !isEmpty(saveInvestments)
                                  ? saveInvestments ?? []
                                  : getDefaultElection?.investmentDetails ?? []
                              }
                            />
                          ) : null}

                          {values[fields.useDefaultAllocation] === false ? (
                            <div>
                              <Field
                                isRequired
                                name={fields.doesAllSourcesFollowSameElection}
                                label="Does All Sources Follow Same Election"
                                size="sm"
                                options={yesNoOptions}
                                ref={doesAllSourcesFollowSameElection}
                                selectedValue={
                                  values[
                                    fields.doesAllSourcesFollowSameElection
                                  ]
                                }
                                onChange={(value) => {
                                  setAddedInvestments({ 0: [] });
                                  setSourceDetails(null);
                                  doesAllSourcesFollowSameElection.current =
                                    value;
                                  setValues({
                                    ...values,
                                    sourceWiseInvestments: {},
                                    sameSourcesInvestmentElection: [],
                                    doesAllSourcesFollowSameElection: value,
                                  });
                                  setSaveInvestments([]);
                                }}
                                disabled={isDisabled}
                                component={FieldButtonGroup}
                              />
                              <div className="mb-10">
                                <div className="core-body-text-regular-medium-sl mb-10 d-flex">
                                  Opt in for SDB
                                  {/* <AddToolTip
                                    name={
                                      "Select Yes to enable Self-Directed Brokerage options for this participant."
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={infocircle}
                                      className="core-body-text-regular-medium-sl ml-4p"
                                    />
                                  </AddToolTip> */}
                                </div>
                                <Field
                                  size="sm"
                                  name="optInForSdb"
                                  isRequired
                                  options={yesNoOptions}
                                  selectedValue={values.optInForSdb ?? false}
                                  onChange={(value) => {
                                    setFieldValue("optInForSdb", value);
                                    // Reset the Track Traditional and Roth field when opting out
                                    if (!value) {
                                      setFieldValue(
                                        fields.participantTrackTraditionalAndRothSDBSeparately,
                                        false
                                      );
                                    }
                                  }}
                                  component={FieldButtonGroup}
                                  disabled={
                                    isDisabled ||
                                    getParticipantEnrollmentInfo?.optInForSdb ===
                                      true
                                  }
                                />
                              </div>
                              {values.optInForSdb && planSDBTrackingEnabled && (
                                <div className="mb-10">
                                  <div className="core-body-text-regular-medium-sl mb-10 d-flex">
                                    Track Traditional and Roth SDB separately
                                    <AddToolTip
                                      name={
                                        "Selecting Yes will enable the participant to separately track SDB for Traditional and Roth sources. Once selected, this option cannot be changed."
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={infocircle}
                                        className="core-body-text-regular-medium-sl ml-4p"
                                      />
                                    </AddToolTip>
                                  </div>
                                  <Field
                                    size="sm"
                                    name={
                                      fields.participantTrackTraditionalAndRothSDBSeparately
                                    }
                                    isRequired
                                    options={yesNoOptions}
                                    selectedValue={
                                      values[
                                        fields
                                          .participantTrackTraditionalAndRothSDBSeparately
                                      ] ?? false
                                    }
                                    onChange={(value) => {
                                      setFieldValue(
                                        fields.participantTrackTraditionalAndRothSDBSeparately,
                                        value
                                      );
                                    }}
                                    component={FieldButtonGroup}
                                    disabled={
                                      isDisabled ||
                                      getParticipantEnrollmentInfo?.participantTrackTraditionalAndRothSDBSeparately !=
                                        null ||
                                      enrollmentStatus !== "Not Enrolled"
                                    }
                                  />
                                </div>
                              )}
                              {console.log("saveInvestments", saveInvestments)}
                              {values[
                                fields.doesAllSourcesFollowSameElection
                              ] ? (
                                //!isEmpty(getDefaultElection?.investmentDetails) ||
                                !isEmpty(saveInvestments) ? (
                                  <div className="mt-40px w-70p">
                                    <div className="d-flex justify-content-between align-baseline">
                                      <p className="mt-20 plan-heading-plan">
                                        List of Investment Election Added
                                      </p>
                                      <Button
                                        variant="secondary"
                                        onClick={() => setModalOpen(true)}
                                        disabled={isDisabled}
                                        className=""
                                      >
                                        Add investment
                                      </Button>
                                    </div>
                                    <div>
                                      <FieldArray name="investmentList">
                                        {(fieldArrayProps) => (
                                          <Table>
                                            <Table.Thead>
                                              {columnsWithAction.map(
                                                (item, index) => {
                                                  return (
                                                    <Table.Th
                                                      key={index}
                                                      className={`${item.className} fw-500`}
                                                    >
                                                      {item.label}
                                                    </Table.Th>
                                                  );
                                                }
                                              )}
                                            </Table.Thead>
                                            <Table.Tbody>
                                              {saveInvestments.map(
                                                (source, index) => {
                                                  const fieldName =
                                                    "sameSourcesInvestmentElection[" +
                                                    index +
                                                    "].allocationPercentage";
                                                  return (
                                                    <Table.Tr
                                                      key={index}
                                                      className="d-flex align-items-baseline"
                                                    >
                                                      <Table.Td className="column-investment-name-own">
                                                        <div className="d-flex flex-column">
                                                          <div>
                                                            {
                                                              source.investmentName
                                                            }
                                                          </div>
                                                          {(source?.type ==
                                                            10 ||
                                                            source?.investmentType ==
                                                              10) && (
                                                            <div className="w-100 d-flex flex-wrap core-body-text-small-bold-sl">
                                                              <span className="me-1">
                                                                Account
                                                                Number(s):
                                                              </span>
                                                              {source?.sdbAccountDetails?.map(
                                                                (
                                                                  item,
                                                                  index,
                                                                  arr
                                                                ) => (
                                                                  <React.Fragment
                                                                    key={index}
                                                                  >
                                                                    <AddToolTip
                                                                      name={
                                                                        item?.accountNumber
                                                                      }
                                                                    >
                                                                      <span className="me-1">
                                                                        {item
                                                                          ?.accountNumber
                                                                          ?.length >
                                                                        15
                                                                          ? `${item?.accountNumber.slice(
                                                                              0,
                                                                              15
                                                                            )}...`
                                                                          : item?.accountNumber}
                                                                        {index !==
                                                                          arr.length -
                                                                            1 &&
                                                                          ","}
                                                                      </span>
                                                                    </AddToolTip>
                                                                  </React.Fragment>
                                                                )
                                                              )}
                                                            </div>
                                                          )}
                                                        </div>
                                                      </Table.Td>
                                                      <Table.Td className="column-investment-percentage-own">
                                                        <Form
                                                          autoComplete="off"
                                                          className="h-100p percentage-field"
                                                        >
                                                          <Field
                                                            size="xs"
                                                            isRequired
                                                            name={fieldName}
                                                            hasSuggestion
                                                            shouldDisplaySuggestion
                                                            component={
                                                              FieldInputPercentage
                                                            }
                                                            type="number"
                                                            value={get(
                                                              values,
                                                              fieldName
                                                            )}
                                                            //defaultValue={get(values, fieldName)}
                                                            onChange={
                                                              handleChange
                                                            }
                                                            disabled={
                                                              isDisabled
                                                            }
                                                            autoComplete="off"
                                                            validate={(value) =>
                                                              [
                                                                "",
                                                                undefined,
                                                                null,
                                                                "Select One",
                                                              ].includes(value)
                                                                ? "Required"
                                                                : sdBValidation(
                                                                    source?.investmentId,
                                                                    value
                                                                  ) === true
                                                                ? `Percentage should not exceed ${sdBInvestment[0]?.maximumSdbAllocation}`
                                                                : null
                                                            }
                                                          />
                                                        </Form>
                                                      </Table.Td>
                                                      <Table.Td className="column-investment-action-own">
                                                        <Link>
                                                          <FontAwesomeIcon
                                                            icon={faTrashAlt}
                                                            color="var(--semantics-critical-text)"
                                                            onClick={() =>
                                                              !isDisabled &&
                                                              deletefunction(
                                                                source.investmentName
                                                              )
                                                            }
                                                          />
                                                        </Link>
                                                      </Table.Td>
                                                    </Table.Tr>
                                                  );
                                                }
                                              )}
                                            </Table.Tbody>

                                            <div className="line-separator-total" />
                                            <Table.Tbody>
                                              <Table.Tr>
                                                <Table.Td className="column-investment-name-own fw-500">
                                                  Total
                                                </Table.Td>
                                                <Table.Td className="column-investment-percentage-own">
                                                  <Form
                                                    autoComplete="off"
                                                    className="h-100p percentage-field"
                                                  >
                                                    <Field
                                                      size="xs"
                                                      isRequired
                                                      name="totalBox"
                                                      hasSuggestion
                                                      shouldDisplaySuggestion
                                                      component={
                                                        FieldInputPercentage
                                                      }
                                                      type="number"
                                                      value={Invsum1()}
                                                      autoComplete="off"
                                                      disabled
                                                      validate={() =>
                                                        Invsum1() != 100
                                                          ? ` `
                                                          : undefined
                                                      }
                                                    />
                                                    <div className="error-message-deferral">
                                                      {Invsum1() != 100
                                                        ? `The total value of investment election should be 100%`
                                                        : ``}
                                                    </div>
                                                  </Form>
                                                </Table.Td>
                                                <Table.Td
                                                  className={
                                                    "column-investment-action-own"
                                                  }
                                                />
                                              </Table.Tr>
                                            </Table.Tbody>
                                          </Table>
                                        )}
                                      </FieldArray>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="mt-40px">
                                    <p className="mt-20 plan-heading-plan">
                                      Investment election
                                    </p>
                                    <AddPlans
                                      buttonstyle={"button-css"}
                                      content="No investments added."
                                      buttonLabel="Add investment"
                                      onPrimaryClick={onViewButtonClick}
                                      disabled={isDisabled}
                                    />
                                    <div className="error-message-deferral">
                                      {errors?.sameElectionInvestment}
                                    </div>
                                  </div>
                                )
                              ) : (
                                <>
                                  {values[
                                    fields.doesAllSourcesFollowSameElection
                                  ] === false ? (
                                    <div>
                                      {sourcesList.map((s, i) => {
                                        return (
                                          // remove inline styling
                                          <div className="mt-40px w-70p">
                                            <div
                                              className={`${styles["m-b-15px-flex"]}`}
                                            >
                                              <p className="mt-20 plan-heading-plan">
                                                {s.sourceName}
                                              </p>
                                              {!isEmpty(
                                                values.sourceWiseInvestments?.[
                                                  i
                                                ]
                                              ) ? (
                                                <Button
                                                  variant="secondary"
                                                  disabled={isDisabled}
                                                  onClick={() => {
                                                    setSourceInd(i);
                                                    setModalOpen(true);
                                                    setSourceDetails(s);
                                                  }}
                                                  className={`h-40px `}
                                                >
                                                  Add investment
                                                </Button>
                                              ) : (
                                                <></>
                                              )}
                                            </div>
                                            {/* <div className="d-flex justify-content-between align-baseline">
                                            List of Investment Election Added
                                            </div> */}
                                            {isEmpty(
                                              values.sourceWiseInvestments?.[i]
                                            ) ? (
                                              <div className="mt-40px">
                                                <p className="mt-20 plan-heading-plan">
                                                  List of Investment Election
                                                  Added
                                                </p>
                                                <AddPlans
                                                  buttonstyle={"button-css"}
                                                  content="No investments added."
                                                  buttonLabel="Add investment"
                                                  onPrimaryClick={() => {
                                                    setSourceInd(i);
                                                    onViewButtonClick();
                                                    setSourceDetails(s);
                                                  }}
                                                  disabled={isDisabled}
                                                />
                                                <div className="error-message-deferral">
                                                  {get(
                                                    errors,
                                                    `differentElectionInvestment.${i}`
                                                  )}
                                                </div>
                                              </div>
                                            ) : (
                                              <div>
                                                <FieldArray name="investmentList">
                                                  {(fieldArrayProps) => (
                                                    <Table>
                                                      <Table.Thead>
                                                        {columnsWithAction.map(
                                                          (item, index) => {
                                                            return (
                                                              <Table.Th
                                                                key={index}
                                                                className={`${item.className} fw-500`}
                                                              >
                                                                {item.label}
                                                              </Table.Th>
                                                            );
                                                          }
                                                        )}
                                                      </Table.Thead>
                                                      <Table.Tbody>
                                                        {values.sourceWiseInvestments[
                                                          i
                                                        ]?.map(
                                                          (source, index) => {
                                                            const fieldName =
                                                              "sourceWiseInvestments[" +
                                                              i +
                                                              "][" +
                                                              index +
                                                              "].allocationPercentage";

                                                            return (
                                                              <Table.Tr
                                                                key={index}
                                                                className="d-flex align-items-baseline"
                                                              >
                                                                <Table.Td className="column-investment-name-own">
                                                                  <div className="d-flex flex-column">
                                                                    <div>
                                                                      {
                                                                        source.investmentName
                                                                      }
                                                                    </div>
                                                                    {(source?.type ==
                                                                      10 ||
                                                                      source?.investmentType ==
                                                                        10) && (
                                                                      <div className="w-100 d-flex flex-wrap core-body-text-small-bold-sl">
                                                                        <span className="me-1">
                                                                          Account
                                                                          Number(s)
                                                                          :
                                                                        </span>
                                                                        {(() => {
                                                                          const accounts =
                                                                            source?.sdbAccountDetails ||
                                                                            [];
                                                                          const {
                                                                            sourceCategory,
                                                                            sourceSubCategory,
                                                                          } =
                                                                            sourcesList?.filter(
                                                                              (
                                                                                i
                                                                              ) =>
                                                                                i.sourceId ===
                                                                                source.sourceId
                                                                            )?.[0] ||
                                                                            {};
                                                                          const traditionalCategory =
                                                                            [
                                                                              5,
                                                                              6,
                                                                              9,
                                                                              10,
                                                                              11,
                                                                              12,
                                                                            ];
                                                                          const traditionalSubCategory =
                                                                            [
                                                                              4,
                                                                              7,
                                                                            ];

                                                                          const rothCategory =
                                                                            [
                                                                              7,
                                                                              8,
                                                                            ];
                                                                          const rothSubCategory =
                                                                            [
                                                                              5,
                                                                              6,
                                                                              8,
                                                                              9,
                                                                            ];

                                                                          const isTraditional =
                                                                            traditionalCategory.includes(
                                                                              sourceCategory
                                                                            ) ||
                                                                            traditionalSubCategory.includes(
                                                                              sourceSubCategory
                                                                            );

                                                                          const isRoth =
                                                                            rothCategory.includes(
                                                                              sourceCategory
                                                                            ) ||
                                                                            rothSubCategory.includes(
                                                                              sourceSubCategory
                                                                            );
                                                                          const isSdbTracking =
                                                                            values?.participantTrackTraditionalAndRothSDBSeparately;
                                                                          const filteredAccounts =
                                                                            !isSdbTracking
                                                                              ? accounts
                                                                              : accounts.filter(
                                                                                  ({
                                                                                    isRothSdb,
                                                                                  }) =>
                                                                                    (isTraditional &&
                                                                                      isRothSdb ===
                                                                                        false) ||
                                                                                    (isRoth &&
                                                                                      isRothSdb ===
                                                                                        true)
                                                                                );

                                                                          return filteredAccounts.map(
                                                                            (
                                                                              {
                                                                                accountNumber,
                                                                              },
                                                                              index
                                                                            ) => (
                                                                              <React.Fragment
                                                                                key={
                                                                                  index
                                                                                }
                                                                              >
                                                                                <AddToolTip
                                                                                  name={
                                                                                    accountNumber
                                                                                  }
                                                                                >
                                                                                  <span className="me-1">
                                                                                    {accountNumber?.length >
                                                                                    15
                                                                                      ? `${accountNumber.slice(
                                                                                          0,
                                                                                          15
                                                                                        )}...`
                                                                                      : accountNumber}
                                                                                  </span>
                                                                                </AddToolTip>

                                                                                {index <
                                                                                  filteredAccounts.length -
                                                                                    1 && (
                                                                                  <span className="me-1">
                                                                                    ,
                                                                                  </span>
                                                                                )}
                                                                              </React.Fragment>
                                                                            )
                                                                          );
                                                                        })()}
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </Table.Td>
                                                                <Table.Td className="column-investment-percentage-own">
                                                                  <Form
                                                                    autoComplete="off"
                                                                    className="h-100p percentage-field"
                                                                  >
                                                                    <Field
                                                                      size="xs"
                                                                      isRequired
                                                                      name={
                                                                        fieldName
                                                                      }
                                                                      hasSuggestion
                                                                      shouldDisplaySuggestion
                                                                      component={
                                                                        FieldInputPercentage
                                                                      }
                                                                      type="number"
                                                                      value={get(
                                                                        values,
                                                                        fieldName
                                                                      )}
                                                                      //defaultValue={get(values, fieldName)}
                                                                      onChange={
                                                                        handleChange
                                                                      }
                                                                      disabled={
                                                                        isDisabled
                                                                      }
                                                                      autoComplete="off"
                                                                      validate={(
                                                                        value
                                                                      ) =>
                                                                        [
                                                                          "",
                                                                          undefined,
                                                                          null,
                                                                          "Select One",
                                                                        ].includes(
                                                                          value
                                                                        )
                                                                          ? "Required"
                                                                          : sdBValidation(
                                                                              source?.investmentId,
                                                                              value
                                                                            ) ===
                                                                            true
                                                                          ? `Percentage should not exceed ${sdBInvestment[0]?.maximumSdbAllocation}`
                                                                          : null
                                                                      }
                                                                    />
                                                                  </Form>
                                                                </Table.Td>
                                                                <Table.Td className="column-investment-action-own">
                                                                  <Link>
                                                                    <FontAwesomeIcon
                                                                      icon={
                                                                        faTrashAlt
                                                                      }
                                                                      color="var(--semantics-critical-text)"
                                                                      onClick={() =>
                                                                        !isDisabled &&
                                                                        deleteSourceInvestment(
                                                                          source.investmentName,
                                                                          i,
                                                                          index
                                                                        )
                                                                      }
                                                                    />
                                                                  </Link>
                                                                </Table.Td>
                                                              </Table.Tr>
                                                            );
                                                          }
                                                        )}
                                                      </Table.Tbody>

                                                      <div className="line-separator-total" />
                                                      <Table.Tbody>
                                                        <Table.Tr>
                                                          <Table.Td className="column-investment-name-own fw-500">
                                                            Total
                                                          </Table.Td>
                                                          <Table.Td className="column-investment-percentage-own">
                                                            <Form
                                                              autoComplete="off"
                                                              className="h-100p percentage-field"
                                                            >
                                                              <Field
                                                                size="xs"
                                                                isRequired
                                                                name={`totalBox.${i}`}
                                                                hasSuggestion
                                                                shouldDisplaySuggestion
                                                                component={
                                                                  FieldInputPercentage
                                                                }
                                                                type="number"
                                                                value={Invsum2(
                                                                  i
                                                                )}
                                                                autoComplete="off"
                                                                disabled
                                                                validate={(
                                                                  value
                                                                ) =>
                                                                  Invsum2(i) !=
                                                                  100
                                                                    ? ` `
                                                                    : undefined
                                                                }
                                                              />
                                                              <div className="error-message-deferral">
                                                                {Invsum2(i) !=
                                                                100
                                                                  ? `The total value of investment election should be 100%`
                                                                  : ``}
                                                              </div>
                                                            </Form>
                                                          </Table.Td>
                                                          <Table.Td
                                                            className={
                                                              "column-investment-action-own"
                                                            }
                                                          />
                                                        </Table.Tr>
                                                      </Table.Tbody>
                                                    </Table>
                                                  )}
                                                </FieldArray>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : null}
                                </>
                              )}
                            </div>
                          ) : null}
                          <div className="investment-container-basic-details">
                            <AddSlider
                              initialValuesData={values}
                              isOpen={isModalOpen}
                              setIsOpen={setModalOpen}
                              isSdb={true}
                              filters={[
                                {
                                  label: "Type",
                                  name: "type",
                                  placeholder: "Investment Type",
                                  isMultiselect: true,
                                  options:
                                    investmentTypes?.length > 0
                                      ? investmentTypes
                                      : [],
                                },
                                {
                                  label: "Status",
                                  name: "status",
                                  placeholder: "Investment Status",
                                  isMultiselect: true,
                                  options:
                                    toOptionValuesFromMapper(
                                      OPTIONS_DATA_MAPPER.INVESTMENT_STATUS_MASTER
                                    ).length > 0
                                      ? toOptionValuesFromMapper(
                                          OPTIONS_DATA_MAPPER.INVESTMENT_STATUS_MASTER
                                        )
                                      : [],
                                },
                              ]}
                              payloadExtraProps={{
                                isModelPortfolio: true,
                                planId: planId,
                                addedData: "investmentIds",
                                employeeId: censusId,
                              }}
                              apiFunction={
                                GetPlanInvestmentsByPlanIdAndEmployeeId
                              }
                              responseMapper={{
                                heading: "investmentTypeName",
                                subHeading: "name",
                                columns: [
                                  { subTitle: "CUSIP", data: "cusip" },
                                  { subTitle: "Ticker", data: "ticker" },
                                ],
                              }}
                              onSaveClick={(data) => {
                                const updatedData = data.map((item) => ({
                                  ...item,
                                  investmentName: item.name,
                                }));
                                addInvestmentsAndSourceIdToPlan(updatedData);

                                if (
                                  !values.useDefaultAllocation &&
                                  values.doesAllSourcesFollowSameElection
                                ) {
                                  onSubmit(updatedData);
                                } else {
                                  addSourceWiseInvestments(
                                    updatedData,
                                    sourceInd
                                  );
                                }
                              }}
                              existingData={
                                get(addedInvestments, sourceInd, [])?.map((_) =>
                                  _?.id != 0
                                    ? {
                                        ..._,
                                        name: _?.investmentName,
                                        isAddButton: false,
                                        isRemoveButton: false,
                                        heading: _?.investmentTypeName,
                                        subHeading: _?.investmentName,
                                        columns: [
                                          {
                                            subTitle: "CUSIP",
                                            data: _?.cusip,
                                          },
                                          {
                                            subTitle: "Ticker",
                                            data: _?.ticker,
                                          },
                                        ],
                                      }
                                    : { ..._ }
                                ) ?? []
                              }
                              sourceDetails={sourceDetails}
                              setSourceDetails={setSourceDetails}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {!values[fields.optForManagedAccountService] && (
                      <>
                        <div className="core-body-text-regular-medium-sl text-nowrap mb-10 d-flex">
                          Opt in for Smart Rebalancing?
                          <AddToolTip
                            name={
                              "With Smart Rebalancing, for every pay period, the contributions are allocated to minimize the deviations of current portfolio from the investment election %"
                            }
                          >
                            <FontAwesomeIcon
                              icon={infocircle}
                              className="core-body-text-regular-medium-sl ml-4p"
                            />
                          </AddToolTip>
                        </div>

                        <Field
                          isRequired
                          name={fields.optInForSmartRebalancing}
                          size="sm"
                          options={yesNoOptions}
                          selectedValue={returnOnlyIfBoolean(
                            values[fields.optInForSmartRebalancing]
                          )}
                          onChange={(value) => {
                            setFieldValue(
                              fields.optInForSmartRebalancing,
                              value
                            );
                            if (
                              !value &&
                              transferData.periodicRebalancingRequired === true
                            ) {
                              setFieldValue(fields.optInForAutoRebalance, true);
                            }
                          }}
                          disabled={isDisabled}
                          component={FieldButtonGroup}
                        />
                      </>
                    )}

                    {!values[fields.optForManagedAccountService] &&
                      !values[fields.optInForSmartRebalancing] &&
                      transferData.periodicRebalancingRequired === true && (
                        <>
                          <div className="core-body-text-regular-medium-sl mb-10 d-flex">
                            Opt in for Auto-rebalance?
                          </div>
                          <Field
                            isRequired
                            name={fields.optInForAutoRebalance}
                            size="sm"
                            options={yesNoOptions}
                            selectedValue={returnOnlyIfBoolean(
                              values[fields.optInForAutoRebalance]
                            )}
                            onChange={(value) => {
                              setFieldValue(
                                fields.optInForAutoRebalance,
                                value
                              );
                            }}
                            disabled={isDisabled}
                            component={FieldButtonGroup}
                          />

                          {values[fields.optInForAutoRebalance] && (
                            <>
                              <div className="font-head-threshold mb-10 d-flex">
                                Threshold %
                                <AddToolTip
                                  name={`Auto-rebalance occurs ${
                                    OPTIONS_DATA_MAPPER.TRANSFER_FREQUENCY[
                                      transferData.rebalanceFrequency
                                    ]
                                  }, when portfolio deviates from the original investment election by the threshold % specified. Plan recommends a threshold of ${
                                    transferData.rebalancingThreshold
                                  }%`}
                                >
                                  <FontAwesomeIcon
                                    icon={infocircle}
                                    className="ml-10"
                                  />
                                </AddToolTip>
                              </div>
                              <Field
                                size="xs"
                                isRequired
                                name={fields.threshold}
                                type="number"
                                autoComplete="off"
                                value={values[fields.threshold]}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                disabled={isDisabled}
                                component={FieldInputPercentage}
                              />
                            </>
                          )}
                        </>
                      )}
                  </div>
                </Form>
              </LoaderWrapper>
              <ModalNotification
                show={isModalVisible}
                header={`${serviceProviderName} Authentication`}
                message={
                  "You will be redirected to the service provider page by saving this election page."
                }
                onHide={() => setIsModalVisible(false)}
                infoType={1}
                primaryButtonAction={() => {
                  setIsModalVisible(false);
                  formSubmit(
                    values,
                    { setFieldError, setErrors, setFieldTouched },
                    false
                  );
                }}
                primaryButtonLabel={`Go to ${serviceProviderName}`}
                secondaryButtonAction={() => setIsModalVisible(false)}
                secondaryButtonLabel={"Cancel"}
              />
            </>
          );
        }}
      </Formik>
      <ToastNotification
        showToast={showToast}
        toastMessage={"Data Saved Successfully"}
        handleClose={() => setShowToast(false)}
        infoType={4}
        autoHide
        position={{
          position: "fixed",
          top: "15rem",
          right: "4rem",
          zIndex: "100",
        }}
        delay={3000}
      />
    </div>
  );
};

export default ManualEnrollmentContainer;
