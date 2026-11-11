import { isEmpty, toLower } from "lodash-es";

export const required = (value) => {
  return [undefined, null, ""].includes(value) || value.toString().trim() === ""
    ? "Required"
    : undefined;
};

export const requiredNumber = (value) => {
  return [undefined, null, "", 0].includes(value) ? "Required" : undefined;
};

export const requiredList = (value) => {
  return isEmpty(value) ? "Required" : undefined;
};

export const requiredWithErrorCode = (value, errorCode) => {
  return [undefined, null, ""].includes(value)
    ? `${errorCode} : Required`
    : undefined;
};

export const minMaxValidation = (min, max, value, requiredCode, minMaxCode) => {
  return [undefined, null, ""].includes(value)
    ? requiredCode + ": Required"
    : value < min || value > max
    ? minMaxCode +
      ": The deferral contribution rate should be between minimum and maximum values"
    : undefined;
};

export const endDateValition = (startDate, endDate, code) => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return (
        code +
        " : Effective end date should be greater than the effective start date."
      );
    }
  }
  return undefined;
};

export const adiminMaxValidation = (
  min,
  max,
  value,
  requiredCode,
  minCode,
  maxCode
) => {
  return [undefined, null, ""].includes(value)
    ? requiredCode + ": Required"
    : value > max
    ? maxCode +
      ": ADI stops at value cannot be greater than Maximum Contribution limit set for the Source"
    : value <= min
    ? minCode +
      ": ADI stops at value cannot be lesser than or equal to the Minimum Contribution limit set for the Source"
    : undefined;
};

export const adiValidation = (maxAdi, value, requiredCode, maxCode) => {
  return [undefined, null, ""].includes(value)
    ? requiredCode + ": Required"
    : Number(value) > Number(maxAdi)
    ? maxCode +
      ": Auto Deferral Increase cannot be more than ADI stops at value"
    : undefined;
};

export const validateDateRange = (value) => {
  if (!value || !value.fromDate || !value.toDate) {
    return "Required";
  }
  return undefined;
};

export const getAutoCompleteAttr = (fieldName, fieldType) => {
  if (["name", "firstName", "lastName", "middleName"].includes(fieldName)) {
    return { autoComplete: "new-name" };
  }

  if (fieldType === "password") {
    return { autoComplete: "new-password" };
  }

  if (fieldName === "email") {
    return { autoComplete: "new-email" };
  }

  if (
    toLower(fieldName).indexOf("postal") !== -1 ||
    toLower(fieldName).indexOf("zip") !== -1
  ) {
    return { autoComplete: "new-zip" };
  }

  return { autoComplete: "off" };
};
