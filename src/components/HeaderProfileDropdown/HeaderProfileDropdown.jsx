import { useState, useRef, useContext } from "react";

import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faKey,
  faList,
  faSignOutAlt,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "./HeaderProfileDropdown.module.scss";
import { ApplicationPaths } from "../api-authorization/ApiAuthorizationConstants";
import { ROUTES } from "@/utils/constants/common";
import SliderPanel from "../SliderPanel";
import { Field, Formik } from "formik";
import SearchableList from "../SearchableList";
import { isEmpty } from "lodash-es";
import { FieldDropSide } from "../Forms";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { useDeepEffect } from "@/abstracts/hooks";
import {
  getTenantProducts,
  saveUserDefaultProduct,
} from "@/services/userManagement";
import { appLayoutStore, globalToastInfo } from "../../contexts";
import ToastNotification from "../ToastNotification";
import LoaderWrapper from "../LoaderWrapper";

// type HeaderProfileDropdownProps = {
//   profileName?: string;
//   role?: string;
//   onSelect?: (action: string) => void;
// };

export default function HeaderProfileDropdown({
  profileName = "John Doe",
  role = "Administrator",
  onSelect,
  permissions,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [lightMode, setLightMode] = useState(true);
  const arrowRef = useRef(null);
  const [productData, setUserProductData] = useState([]);
  const ARROW_HEIGHT = 10;
  const ARROW_WIDTH = 14;

  const [isModalOpen, setModalOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-end",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(20),
      flip(),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);
  const nav = useNavigate();
  const handleMenuClick = (action) => {
    setIsOpen(false);
    onSelect?.(action);
  };
  useDeepEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      getTenantProducts()
        .then((res) => {
          if (res.isSuccessful) {
            setUserProductData(
              res?.productList.map((product) => ({
                id: product.productId,
                productId: product.productId,
                code: product.code,
                name: product.name,
                isDefault: product.isDefault,
              })) || []
            );
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, [isModalOpen]);
  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state: state2, dispatch: dispatch2 } = useContext(appLayoutStore);
  const { showToast, toastMessage } = state2;
  const handleCloseToast = () => {
    dispatch2(
      globalToastInfo({
        showToast: false,
        toastMessage: "",
      })
    );
  };
  return (
    <div className={styles.headerDropdown}>
      {/* Trigger Icon */}
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={styles.triggerIcon}
      >
        <FontAwesomeIcon icon={faUser} />
      </div>
      {/* Dropdown */}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles.dropdownContainer}
            {...getFloatingProps()}
          >
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={ARROW_WIDTH}
              height={ARROW_HEIGHT}
              style={{ right: 16, left: "auto" }}
              fill="var(--brand-border-primary-default)"
            />

            <div className={styles.profileHeader}>
              <div className={styles.triggerIcon}>
                <FontAwesomeIcon icon={faUser} className="fs-16px" />
              </div>

              <div className="d-flex flex-column">
                <div className={styles.profileName}>{profileName}</div>
                <div className={styles.profileRole}>{role}</div>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.dropdownItem} onClick={toggleLightMode}>
              <FontAwesomeIcon icon={faCog} className={styles.itemIcon} />
              <span>Light Mode</span>
              <FontAwesomeIcon
                icon={lightMode ? faToggleOn : faToggleOff}
                className={`${styles.toggleIcon} ${
                  lightMode ? "default-text-color" : styles.toggleOff
                }`}
              />
            </div>

            <div className={styles.divider}></div>
            {permissions?.dashBoardMenu &&
              permissions.dashBoardMenu["changePassword"] && (
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    handleMenuClick("changePassword");
                    nav(ROUTES.CHANGEPASSWORDINFO);
                  }}
                >
                  <FontAwesomeIcon icon={faKey} className={styles.itemIcon} />
                  <span>Change Password</span>
                </div>
              )}

            <div
              className={styles.dropdownItem}
              onClick={() => handleMenuClick("activityLog")}
            >
              <FontAwesomeIcon icon={faList} className={styles.itemIcon} />
              <span>Activity Log</span>
            </div>

            <div
              className={`${styles.dropdownItem} ${styles.cursorItemDisabled}`}
              onClick={() => {
                handleMenuClick("profileSettings");
                setModalOpen(!isModalOpen);
              }}
              disabled={true}
            >
              <FontAwesomeIcon icon={faCog} className={styles.itemIcon} />
              <span>Profile Settings</span>
            </div>

            <div className={styles.divider}></div>
            {!(
              permissions?.dashBoardMenu &&
              permissions.dashBoardMenu["ssoLogoutDisabled"]
            ) && (
              <div
                className={styles.dropdownItem}
                onClick={() => {
                  handleMenuClick("logout");
                  nav(ApplicationPaths.LogOutLink);
                  window.localStorage.removeItem("defaultProductId");
                }}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className={styles.itemIcon}
                />
                <span>Logout</span>
              </div>
            )}
          </div>
        </FloatingPortal>
      )}
      <SliderPanel
        isOpen={isModalOpen}
        width="40%"
        className={styles["prof-header-slider"]}
        // onClose={() => setModalOpen(false)}
        // onEdit={()=>{}}
        showCancel={false}
        showHeader={true}
        showSeparator={false}
        backdropClicked={() => setModalOpen(false)}
        showSeparatorSlider={false}
      >
        <Formik
          initialValues={{
            productAccess: productData?.find((prod) => prod.isDefault)
              ?.productId,
          }}
          onSubmit={(values) => {
            setIsLoading(true);
            saveUserDefaultProduct(values.productAccess)
              .then((res) => {
                if (res.message.isSuccessful) {
                  setIsLoading(false);
                  dispatch2(
                    globalToastInfo({
                      showToast: true,
                      toastMessage: "Saved successfully",
                    })
                  );
                  setEdit(!edit);
                }
              })
              .catch((error) => {
                setIsLoading(false);
              });
          }}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, setFieldValue, handleSubmit, values, ...rest }) => {
            return (
              <LoaderWrapper
                isLoading={isLoading}
                className="overflow-auto pb-5"
              >
                <Form
                  autoComplete="off"
                  className={`h-100p ${styles.formContainer}`}
                  onSubmit={handleSubmit}
                  validated={!isEmpty(rest.errors)}
                >
                  <div className="d-flex space-between pb-2">
                    <span className="core-page-titles">
                      Permission And Access
                    </span>
                    {edit == false ? (
                      <>
                        {" "}
                        <Button
                          className=""
                          variant="primary"
                          onClick={() => {
                            setEdit(!edit);
                          }}
                        >
                          Edit
                        </Button>
                      </>
                    ) : (
                      <div className="d-flex ">
                        <Button
                          className=""
                          variant="secondary"
                          onClick={() => {
                            setEdit(!edit);
                            setModalOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className=" ml-1r"
                          variant="primary"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="bb-1px-solid-light pb-2"></div>

                  {
                    <>
                      <div className={styles.accessDetails}>Access details</div>
                      <div className="mr-1r">
                        <Field
                          label="Default product"
                          isRequired
                          name={"productAccess"}
                          value={values.productAccess}
                          direction={"bottom"}
                          options={
                            productData?.map((prod) => ({
                              label: `${prod.name}`,
                              value: prod.productId,
                            })) || []
                          }
                          size="sm"
                          popupContent={
                            <SearchableList
                              label="Select Default product"
                              options={
                                productData?.map((prod) => ({
                                  label: `${prod.name}`,
                                  value: prod.productId,
                                })) || []
                              }
                              name={"productAccess"}
                              onSelect={(value, label) => {
                                setFieldValue("productAccess", value);
                              }}
                              value={values.productAccess}
                            />
                          }
                          component={FieldDropSide}
                          disabled={!edit}
                        />
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="core-body-text-regular-semi-bold-sl"
                          size="sm"
                        />
                        <div className="core-body-text-regular-semi-bold-sl ml-2">
                          This product will open by default every time you log
                          in
                        </div>
                      </div>
                    </>
                  }
                </Form>
              </LoaderWrapper>
            );
          }}
        </Formik>
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
      </SliderPanel>
    </div>
  );
}
