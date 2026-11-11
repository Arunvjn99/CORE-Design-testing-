import React from "react";
import { useNavigate } from "react-router";
import error404 from "../../assets/png/error-404.png";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="div-under-construction">
      <img src={error404} alt="warning." />
      <div>
        <h1 className="header-under-construction1">
          <span>Something is Wrong</span>
        </h1>
        <h2 className="header-under-construction2">
          <span>
            The page you are looking for might have been renamed,removed or
            might never exist.
          </span>
        </h2>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
          className="button-under-construction"
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export default Error;
