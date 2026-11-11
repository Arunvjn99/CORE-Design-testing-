import styles from "./ManageCensusLayout.module.scss";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { get, find, isEmpty } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { faExclamationTriangle } from "@fortawesome/pro-solid-svg-icons";
import InnerLayoutButtons from "@/components/InnerLayoutButtons";
import ModalNotification from "@/components/ModalNotification";
import ToastNotification from "@/components/ToastNotification";
import {
  manageCensusStore,
  setManageCensusFlow,
  setManageCensusToastInfo,
  getCensusDetailsAction,
  appLayoutStore,
  setBackNavigationPath,
} from "../../contexts";
import { useDeepEffect, useRouterParams } from "@/abstracts/hooks";
import {
  ALL_MANAGE_CENSUS_ROUTES,
  MANAGE_CENSUS_ROUTES,
  manageCensusFormNames,
} from "@/utils/constants/employee";
import { ROUTES } from "@/utils/constants/common";
import { apiErrors } from "@/utils/errorMessages";
import { getPathWithParam, getAdvancedPathWithParam } from "@/utils/helpers";
import { useFormikContext } from "formik";
import RouteLeavingGuard from "../RouteLeavingGuard";
import NoteManagerWrapper from "../NoteManagerWrapper";

const ManageCensusLayout = ({
  children,
  buttons = [],
  tabs,
  pageFlow,
  layoutHeader,
  customBreadCrumbs,
  blockNavigation,
  blockCensusNavigation,
  requestOptions = [],
  disableRequestOptions,
  transactionStatus,
  transaction,
  isAllowed,
  page,
  hasNotes = false,
  entityId,
  entityType,
  notesData,
  backNavigation,
  childrenClassName = "",
  layoutHeaderClassName = "",
}) => {
  const [showError, setShowError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inProgress, setInProgress] = useState();
  const { state, dispatch } = useContext(manageCensusStore);
  const censusName = get(
    state,
    `${manageCensusFormNames.ELIGIBILITY_PROCESS}.censusName`
  );
  const { censusId, flow } = useRouterParams();
  const { showToast, toastMessage } = state;
  const { isSubmitting, dirty, resetForm, setSubmitting, errors } =
    useFormikContext() || { dirty: false };
  const apiError = get(state, "api.error", {});
  const apiData = get(state, "api.data", {});
  console.log(
    ALL_MANAGE_CENSUS_ROUTES,
    get(state, "selectedMenu", "").indexOf(`"employee-information"`),
    "ALL_MANAGE_CENSUS_ROUTES"
  );
  const menuDetails = find(ALL_MANAGE_CENSUS_ROUTES, (item) => {
    // console.log(item, "state");
    if (get(state, "selectedMenu", "").indexOf(get(item, "path")) !== -1) {
      return true;
    }
    return false;
  });

  const { state: state2 } = useContext(appLayoutStore);
  const location = useLocation();
  const selectedMenuURl = location.pathname.split("/").filter(Boolean)[2];
  const navigate = useNavigate();

  useDeepEffect(() => {
    if (isEmpty(apiData) && censusId) {
      dispatch(getCensusDetailsAction(censusId, dispatch, state));
      dispatch(setManageCensusFlow({ flow, censusId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [censusId]);

  useDeepEffect(() => {
    if (transaction == "withdrawal") {
      if (transactionStatus == "Request In Progress") setInProgress(true);
      else setInProgress(false);
    }
  }, [transaction, transactionStatus]);

  useDeepEffect(
    () => {
      if (!isEmpty(apiError)) {
        setShowError(true);
      }
    },
    [apiError],
    true
  );
  useDeepEffect(() => {
    if (backNavigation) dispatch(setBackNavigationPath(backNavigation));
  }, [backNavigation]);

  const breadCrumOptions = [
    {
      label: "Home",
      link: ROUTES.HOME,
    },
    {
      label: "Manage Employees",
      link: ROUTES.MANAGE_EMPLOYEE,
    },
  ];

  if (censusName) {
    breadCrumOptions.push({
      label: censusName,
      link: getPathWithParam({
        path: MANAGE_CENSUS_ROUTES.ELIGIBILITY,
        pathParam: [flow, censusId],
      }),
    });
  }

  const breadCrumbsFromMenuDetails = get(menuDetails, "breadCrumbs", []);
  if (!isEmpty(customBreadCrumbs)) {
    breadCrumOptions.push(...customBreadCrumbs);
  } else if (!isEmpty(breadCrumbsFromMenuDetails)) {
    breadCrumOptions.push(
      ...breadCrumbsFromMenuDetails.map((item) => ({
        ...item,
        link: getPathWithParam({
          path: item.link,
          pathParam: [flow, censusId],
        }),
      }))
    );
  }

  const onRefresh = () => {
    if (resetForm) {
      resetForm();
      setSubmitting(false);
    }
  };

  const onHide = () => {
    setModalVisible(false);
  };

  const errorStatus = get(apiError, "response.status", 500);
  const errorData = apiErrors[errorStatus];
  const employeeNavigate = () => {
    navigate(
      getAdvancedPathWithParam({
        path: ROUTES.MANAGE_EMPLOYEE,
      })
    );
  };

  const handleCloseToast = () => {
    dispatch(
      setManageCensusToastInfo({
        showToast: false,
        toastMessage: "",
      })
    );
  };

  return (
    <div
      className={`d-flex flex-column manage-company h-100p w-100 table-responsive-container ${layoutHeaderClassName}`}
    >
      <div className="d-flex flex-column car-lay-hea layout-header pl-0 pr-0">
        <div className="d-flex align-items-center justify-content-space-between">
          <div className="pl-1p5r">
            <div className="d-flex align-items-center">
              <div className="core-page-titles">
                {layoutHeader || get(menuDetails, "contentHeader", "")}
              </div>
              {hasNotes && (
                <NoteManagerWrapper
                  entityId={entityId}
                  entityType={entityType}
                  data={notesData}
                />
              )}
            </div>
          </div>
          {tabs && (
            <div className="d-flex align-items-center justify-content-center tab-wrapper">
              {tabs}
            </div>
          )}
          <div className="ml-auto">
            <InnerLayoutButtons
              menu="employees"
              subMenu={get(menuDetails, "id", "")}
              buttonsList={buttons}
              flow={pageFlow}
            />
          </div>
          {get(menuDetails, "contentHeader", "") == "Transactions" &&
            isAllowed &&
            (disableRequestOptions ? (
              <Button
                className="core-button-flair md"
                onClick={() => setModalVisible(true)}
              >
                New Request
              </Button>
            ) : (
              <DropdownButton
                title="New Request"
                align="end"
                id="dropdown-menu-align-end"
                className={
                  "request-dropdown new-request-dropdown button-css core-button-flair md"
                }
              >
                {requestOptions.map((data, index) => (
                  <>
                    {state2.appUsage !== "IRA" && index !== 0 && (
                      <Dropdown.Divider />
                    )}
                    <Dropdown.Item disabled={data.disabled === true}>
                      <Link
                        to={getPathWithParam({
                          path: data.path,
                          pathParam: data.pathParam,
                        })}
                        className={`text-decoration-none`}
                      >
                        {data.value == 4 && data.disabled === true ? (
                          <p className={`${styles["m-t-20px-text-v2"]}`}>
                            Rebalance request
                          </p>
                        ) : (
                          data.label
                        )}
                      </Link>
                      {data.value == 4 &&
                        data.disabled === true &&
                        data.reason && (
                          <>
                            <FontAwesomeIcon
                              icon={faExclamationTriangle}
                              className={`${styles["m-b-100px-text"]}`}
                            />
                            <p
                              className={`${styles["m-t-123px-m-l-25px-text"]}`}
                            >
                              {data.reason}
                            </p>
                          </>
                        )}
                    </Dropdown.Item>
                  </>
                ))}
              </DropdownButton>
            ))}
          {showError && (
            <div
              className={`error-banner d-flex align-items-center ${
                (showError && "enable") || ""
              }`}
            >
              <div>
                <div className="error-heading">{errorData.heading}</div>
                <div className="error-reason">{errorData.reason}</div>
              </div>
              <div className="ml-auto">
                <Button variant="link" onClick={() => setShowError(false)}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    color="var(--neutral-text-default)"
                    className={`fs-24px`}
                  />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`${childrenClassName} p-1r layout-content h-100p`}>
        {children}
      </div>
      <ToastNotification
        showToast={showToast}
        toastMessage={toastMessage}
        handleClose={handleCloseToast}
        infoType={4}
        autoHide
        position={{
          position: "fixed",
          top: "10rem",
          right: "2rem",
          zIndex: "100",
        }}
        delay={3000}
      />
      <ModalNotification
        show={modalVisible}
        message={
          inProgress ? (
            <p>
              Kindly complete or delete the pending transaction to raise a new
              request.
            </p>
          ) : (
            <p>
              There is a transaction in {transactionStatus} state, kindly wait
              until the transaction is completed.
            </p>
          )
        }
        onHide={onHide}
        infoType={4}
        primaryButtonAction={onHide}
        primaryButtonLabel={`Ok`}
        onlyOneButton={true}
      />
      {console.log("isSubmitting: ", isSubmitting, dirty)}
      <RouteLeavingGuard
        when={
          ((!isSubmitting && (dirty || !!blockNavigation)) ||
            (isSubmitting && !isEmpty(errors))) ??
          false
        }
        navigate={(path) => navigate(path)}
        onRefresh={onRefresh}
        blockNavigation={blockCensusNavigation}
      />
    </div>
  );
};

export default ManageCensusLayout;
