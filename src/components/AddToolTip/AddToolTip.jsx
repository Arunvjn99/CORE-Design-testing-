import React, { useRef } from "react";
import { Tooltip } from "@progress/kendo-react-tooltip";

const AddToolTip = ({
  name,
  className = "",
  toolTipSafeHarbour,
  children = null,
  placement = "top",
  style = {},
  widthSelectedValue = 100,
  displayTooltip = true,
  anchorElement = "target",
  toolTipWidth,
  showOnEllipsisOnly = false, // Use this flag when need tooltip alone
}) => {
  const textRef = useRef(null);

  const handleMouseEnter = (e) => {
    const el = textRef.current;
    if (!el) return;

    // 1. If tooltips are manually disabled, ensure no title is present
    if (!displayTooltip) {
      el.removeAttribute("title");
      return;
    }

    // 2. Grab the text to display (fallback to DOM text if 'name' isn't passed)
    const tooltipText = name || el.textContent || "";

    // 3. Ellipsis logic
    if (showOnEllipsisOnly) {
      if (el.scrollWidth > el.clientWidth) {
        el.setAttribute("title", tooltipText);
      } else {
        el.removeAttribute("title"); // Clean up if it resizes and fits
      }
    } else {
      // 4. Default behavior (always show)
      el.setAttribute("title", tooltipText);
    }
  };
  return (
    <Tooltip
      anchorElement={anchorElement}
      position={placement}
      parentTitle={true}
      style={{
        width: toolTipWidth || "auto",
        maxWidth: toolTipWidth || "200px",
        zIndex: 1000001,
      }}
    >
      <div
        ref={textRef}
        className={`core-add-tooltip-content ${className}`}
        onMouseEnter={handleMouseEnter}
        style={{
          width: "auto",
          display: "block",
          textOverflow: "ellipsis",
          maxWidth: `${widthSelectedValue}%`,
          overflow: "hidden",
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {children || name}
      </div>
    </Tooltip>
  );
};

export default AddToolTip;
