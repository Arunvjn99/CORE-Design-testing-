import styles from "./AddToolTip.module.scss";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const AddToolTip = ({
  name,
  className,
  toolTipSafeHarbour,
  children = null,
  placement,
  style = {},
  widthSelectedValue = 100,
  displayTooltip = true,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  //const slicedName = (name || "").slice(0, length);
  return (
    <OverlayTrigger
      placement={placement}
      overlay={
        showTooltip ? (
          <Tooltip className={`${styles.addtooltip}`}>{name}</Tooltip>
        ) : (
          <div></div>
        )
      }
    >
      <div
        className={className}
        onMouseEnter={() =>
          displayTooltip ? setShowTooltip(true) : setShowTooltip(false)
        }
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          width: " auto",
          display: "inline-block",
          textOverflow: "ellipsis",
          maxWidth: `${widthSelectedValue}%`,
          overflow: "hidden",
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {children ? children : name}
      </div>
    </OverlayTrigger>
  );
};

export default AddToolTip;
