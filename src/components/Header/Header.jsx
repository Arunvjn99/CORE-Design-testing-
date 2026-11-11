import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { get } from "lodash-es";
import { Image, Row, Col, Dropdown } from "react-bootstrap";
import {
  MANAGE_DASHBOARD_SIDEBAR_2,
  MANAGE_PLAN_CONFIG_ROUTES,
  ROUTES,
} from "@/utils/constants/common";
import IconDropDown from "@/components/IconDropDown";
import HeaderPopover from "@/components/HeaderPopover";
import VerticalTripleDots from "../../assets/svg/vertical-triple-dots.svg?react";
import { LoginMenu } from "../api-authorization/LoginMenu";
// import CompanyLogo from "../../assets/JH logo.png";
import { appLayoutStore, setAppUseage } from "../../contexts";
import { useNavigate, useLocation } from "react-router";
import { getLogo } from "@/services/home";
import { getTenantProducts } from "@/services/userManagement";
import AppConfig from "./../../config/AppConfig";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import { AuthorizeService } from "../api-authorization/AuthorizeService";

const menuList = [
  {
    path: ROUTES.HOME,
    label: "Home",
    childRoutes: [
      ROUTES.DASHBOARD,
      MANAGE_PLAN_CONFIG_ROUTES.COMPANY_LINK,
      ROUTES.MANAGE_COMPANY,
      MANAGE_PLAN_CONFIG_ROUTES.PLAN,
      ROUTES.CREATE_PLAN,
      ROUTES.MANAGE_PLAN,
      ROUTES.MANAGE_ELIGIBILITY,
      ROUTES.MANAGE_EMPLOYEE,
      ROUTES.MANAGE_CENSUS,
      ROUTES.ENROLLMENT,
    ],
  },
  // {
  //   path: ROUTES.DASHBOARD,
  //   label: "Dashboard",
  // },
];

const Header = ({ onMenuChange, seletedRoute }) => {
  const navigate = useNavigate();
  const [logoURL, setLogoURL] = useState(AppConfig.get("VITE_LOGO_API_URL"));
  const authService = new AuthorizeService();

  const [products, setProducts] = useState(null);
  const [userproductData, setUserProductData] = useState([]);
  const [defaultProd, setdefaultProd] = useState(1);
  useEffect(() => {
    authService.getUser().then((value) => {
      const defaultProductId =
        window.localStorage.getItem("defaultProductId") ||
        value?.["defaultTenantProduct"];
      setdefaultProd(parseInt(defaultProductId));
    });
    const fetchTenantLogo = async () => {
      try {
        const tenantId = 1; // or dynamically get it from props/context/etc.
        const response = await getLogo();
        const tenantDetails = response;
        if (tenantDetails && tenantDetails !== "-") {
          setLogoURL(tenantDetails);
        }
      } catch (error) {
        console.error("Error fetching tenant details:", error);
      }
    };

    fetchTenantLogo();
    getTenantProducts().then((res) => {
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
        setProducts(res?.productList.map((product) => `${product.name}`) || []);
      }
    });
  }, []);
  const location = useLocation();
  const { state, dispatch } = useContext(appLayoutStore);
  const permissions = get(state, "permissions");

  const availableItems = MANAGE_DASHBOARD_SIDEBAR_2.filter(
    (item) => permissions?.dashBoardMenu?.[item.id]
  );
  const IRARoles = [
    // "ADMINISTRATOR",
    "IRA SUPERVISOR",
    "AUDITOR",
    "TRADING SPECIALIST",
  ];
  const isIRARoles = IRARoles.includes(state?.userRole);
  const handlePortalSelect = (option) => {
    if (option.includes("Retirement")) {
      dispatch(setAppUseage("IRA"));
      if (location.pathname !== `/${ROUTES.SDUIPLANIRA}`) {
        navigate(`/${ROUTES.SDUIPLANIRA}`);
      }
    } else if (option.includes("Sponsored")) {
      dispatch(setAppUseage("ESP"));
      if (location.pathname !== `/${ROUTES.PAYROLL}`) {
        navigate(`/${ROUTES.PAYROLL}`);
      }
    }
  };
  return (
    // <Navbar bg="light" expand="md" sticky="top" className="header-nav">
    //   <Container fluid>
    // <Row className="header-nav-row align-items-center">
    //   <Col xs={12} className="d-flex justify-content-end">
    //     <IconDropDown icon={<UserIcon />}>
    //       <HeaderPopover>
    //         <LoginMenu />
    //       </HeaderPopover>
    //     </IconDropDown>
    //     <IconDropDown icon={<VerticalTripleDots />}>
    //       <HeaderPopover>
    //         <Link to={ROUTES.DOCO_CENTER}>
    //           <Dropdown.Item as="button">Help</Dropdown.Item>
    //         </Link>
    //         <Link to={ROUTES.HOME}>
    //           <Dropdown.Item as="button">Search</Dropdown.Item>
    //         </Link>
    //       </HeaderPopover>
    //     </IconDropDown>
    //   </Col>
    // </Row>
    //   </Container>
    // </Navbar>
    <div className="new-layout-header">
      <Row className="header-nav-row align-items-center h-100p ml-0 mr-0 justify-content-between">
        <Col xs={4} className="d-flex company-logo-new">
          {["SPONSOR", "TPA"].includes(state?.userRole) ? (
            <Image
              src={`${AppConfig.get("VITE_SPONSOR_LOGO_API_URL")}`}
              alt="company-logo"
            />
          ) : (
            <Image src={logoURL} alt="company-logo" />
          )}
        </Col>
        <Col xs={8} className="d-flex justify-content-end pr-0">
          {/* {isIRARoles ? (
            <>
              <div className="ira_default">
                <div className="ira_content">
                  <span className="core-body-text-small-medium-d">
                    Portal:&nbsp;
                  </span>
                  <span className="core-body-text-regular-semi-bold">
                    Individual Retirement Plans
                  </span>
                </div>
              </div>
            </>
          ) : (
            state?.userRole === "ADMINISTRATOR" && (
              <PortalDropdown
                options={[
                  "Employer Sponsored Plans",
                  "Individual Retirement Plans",
                ]}
                onSelect={handlePortalSelect}
                keyword="Portal"
              />
            )
          )} */}

          <HeaderDropdown
            list={products?.length > 0 ? products : []}
            onSelect={(value) => {}}
            productData={userproductData}
            defaultUserProd={defaultProd}
          />
          <LoginMenu permissions={permissions} />

          {availableItems.length > 0 && (
            <IconDropDown icon={<VerticalTripleDots />}>
              <HeaderPopover>
                {availableItems.map((item) => (
                  <Link key={item.id} to={item.path}>
                    <Dropdown.Item as="button">{item.label}</Dropdown.Item>
                  </Link>
                ))}
              </HeaderPopover>
            </IconDropDown>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
