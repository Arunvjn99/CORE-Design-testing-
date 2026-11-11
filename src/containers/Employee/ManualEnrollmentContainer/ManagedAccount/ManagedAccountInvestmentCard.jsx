import React from "react";
// import FinchLogo from "../../../../assets/svg/finch-logo.svg";
import { Image } from "react-bootstrap";
import InvestmentAllocation from "./InvestmentAllocation";
import { isEmpty } from "lodash-es";
import futureCapital from "../../../../assets/svg/future-capital-logo.svg";

const ManagedAccountInvestmentCard = ({
  columns,
  serviceProvider,
  investmentElections,
}) => {
  return (
    <>
      {!isEmpty(serviceProvider) && (
        <>
          <div className="managed-account-card w-75">
            <h7 className="fs-14px grey-text fw-600 ml-1">Service provider</h7>
            <div className="mt-1">
              <span className="d-flex flex-row">
                {serviceProvider?.logoUrl != null ? (
                  <Image
                    className="provider-logo"
                    src={serviceProvider?.logoUrl}
                  />
                ) : (
                  <>
                    <Image
                      className="future-capital-logo-var"
                      src={futureCapital}
                    />
                  </>
                )}
                <div>
                  <p className="fs-16px fw-500 mb-0px">
                    {serviceProvider?.name}
                  </p>
                  <p
                    className={`fs-14px fw-500 mb-0px ${
                      serviceProvider?.isActive == 1 ? "active" : "in-progress"
                    }`}
                  >
                    {serviceProvider?.isActive == 1 ? "Active" : "Inprogress"}
                  </p>
                </div>
              </span>
            </div>

            {!isEmpty(investmentElections) && (
              <>
                <div className="border-bottom" />
                {/* <p className="fs-10px mt-1 mb-1">
                <FontAwesomeIcon icon={faInfoCircle} className="fs-10px mr-1" />
                Fee split amount showm here.
                </p> */}

                <InvestmentAllocation
                  columns={columns}
                  investmentElection={investmentElections}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ManagedAccountInvestmentCard;
