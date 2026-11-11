/* Non - Overridable CSS values are given as style | styledComponents */

/* Relative Container to hold absolute children of items */
const dropSideContainerStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const previewContainerStyle = {
  width: "60%",
  marginLeft: "1rem",
};
const customTitleStyle = {
  display: "flex",
  flexWrap: "wrap",
  whiteSpace: "pre-line",
  lineHeight: "1.2",
  overflow: "hidden",
};
const mapperPreviewStyle = {
  marginTop: "1.25rem",
  width: "100%",
};
/* hide default <select> element: */
const selectStyle = {
  display: "none",
};

const customSelectPopUpState = {
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  borderRight: "none",
  zIndex: 10,
};

const arrowButtonStyle = {};

const popUpWrapperStyle = {};

export {
  dropSideContainerStyle,
  selectStyle,
  customSelectPopUpState,
  arrowButtonStyle,
  popUpWrapperStyle,
  previewContainerStyle,
  customTitleStyle,
  mapperPreviewStyle,
};
