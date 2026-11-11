import AppConfig from "../../config/AppConfig";

export const getTestId = (testId) => {
  const enabled = AppConfig.get("VITE_ENABLE_TEST_IDS");
  return (enabled === true || enabled === "true") && testId
    ? testId
    : undefined;
};
