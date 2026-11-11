import styles from "./LoaderWrapper.module.scss";
import React from "react";
import { Spinner } from "react-bootstrap";

// import camp from "../../assets/icons/gif/ai-auto-mapper-animation.gif";
// import bar from "../../assets/icons/gif/loadbar.gif";
import automapper from "../../assets/gif/mapper.gif";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loader = ({ loaderText, size }) => {
  return (
    <div className="spinner-row d-flex align-items-center">
      <Spinner size={size} role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      &nbsp;&nbsp;{loaderText}
    </div>
  );
};

Loader.defaultProps = {
  loaderText: "Loading...",
};

const LoaderWrapper = ({
  children,
  isLoading,
  className = "",
  loaderText,
  isAutoMapper = false,
  isDeterminate = false,
  isCore = false,
  style,
}) => {
  return (
    <div className={`loader-wrapper ${className}`} style={style}>
      {isAutoMapper
        ? isLoading && (
            <div className="automapper-loader-wrapper-overlay">
              {/* <img src={bar} className="loadbar"></img>
              <img src={camp} className="centre-image" /> */}
              <img src={automapper} className="centre-image" />
              <div className="textline">
                Sit tight while our AI seamlessly maps your fields
              </div>
            </div>
          )
        : isLoading && (
            <div className="loader-wrapper-overlay-outer">
              {isCore ? (
                // <div className="spinner-loader">
                //   <div className="mb-2 loader-wrapper-overlay-core">
                //     <div className="line-horizontal-outer-extension">
                //       <div className="line-horizontal-outer" />
                //     </div>
                //     <div className="line-vertical-outer-extension">
                //       <div className="line-vertical-outer" />
                //     </div>
                //     <div className="loader-wrapper-overlay-inner-core">
                //       <div className="line-vertical" />
                //       <div className="line-horizontal" />
                //     </div>
                //   </div>
                //   <div className="textloader">Loading</div>
                // </div>

                <div className="spinner-loader">
                  <DotLottieReact
                    src="https://lottie.host/bacad74b-d094-492d-9219-ebd4dbe562a6/nYD0VTd8Xw.lottie"
                    autoplay
                    loop
                    className={`${styles["w-20p-h-20p"]}`}
                  ></DotLottieReact>
                  <div className="textloader">Loading</div>
                </div>
              ) : isDeterminate ? (
                <div className="spinner-loader">
                  <div className="mb-2 loader-wrapper-overlay-determinate" />
                </div>
              ) : (
                <div className="spinner-loader">
                  <div className="mb-2 loader-wrapper-overlay" />
                  <div className="mt-3 textloader">Loading</div>
                </div>
              )}
            </div>
          )}
      {children}
    </div>
  );
};

export default LoaderWrapper;
