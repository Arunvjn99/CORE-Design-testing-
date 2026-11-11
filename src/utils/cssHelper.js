export const getCSSVar = (name) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return ""; // Safe fallback for non-browser contexts
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

export const safeGetCssVar = (name, fallback) =>
  typeof window !== "undefined" && typeof document !== "undefined"
    ? getCSSVar(name) || fallback
    : fallback;
