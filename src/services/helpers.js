import AppConfig from "./../config/AppConfig";
export const apiDetails = {
  baseUrl: AppConfig.get("VITE_API_BASE_URL"),
  // baseUrl: "http://localhost:8080/api",
};

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
