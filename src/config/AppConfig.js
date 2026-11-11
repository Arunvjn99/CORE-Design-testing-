import chroma from "chroma-js";

class AppConfig {
  static config = {
    VITE_API_BASE_URL:
      import.meta.env.VITE_API_BASE_URL || window.location.origin,

    VITE_AUTHENTICATION_BASE_URL:
      import.meta.env.VITE_AUTHENTICATION_BASE_URL || window.location.origin,

    VITE_INSIGHTS_INSTRUMENTATION_KEY:
      import.meta.env.VITE_INSIGHTS_INSTRUMENTATION_KEY || "",

    VITE_ENABLE_APP_INSIGHTS: import.meta.env.VITE_ENABLE_APP_INSIGHTS,

    VITE_LOGO_API_URL: import.meta.env.VITE_LOGO_API_URL || "",

    VITE_SPONSOR_LOGO_API_URL:
      import.meta.env.VITE_SPONSOR_LOGO_API_URL || window.location.origin,

    VITE_SECONDARY_COLOR: import.meta.env.VITE_SECONDARY_COLOR || "#3a3956",

    VITE_PRIMARY_COLOR: import.meta.env.VITE_PRIMARY_COLOR || "#004dcb",

    VITE_PRIMARY_CHECKBOX_COLOR:
      import.meta.env.VITE_PRIMARY_CHECKBOX_COLOR || "#059c8f",

    VITE_URL: import.meta.env.VITE_URL || window.location.origin,

    VITE_CLIENTID: import.meta.env.VITE_CLIENTID || "",

    VITE_ENABLE_AUTO_MAPPER: import.meta.env.VITE_ENABLE_AUTO_MAPPER,

    VITE_ENABLE_TEST_IDS: import.meta.env.VITE_ENABLE_TEST_IDS === "true",

    VITE_PADNUMBER: import.meta.env.VITE_PADNUMBER,

    VITE_FILE_LOCK: import.meta.env.VITE_FILE_LOCK,

    VITE_FUND_BY_PAYDATE: import.meta.env.VITE_FUND_BY_PAYDATE,

    VITE_LOCK_DURATION: import.meta.env.VITE_LOCK_DURATION,

    VITE_FOOTER: import.meta.env.VITE_FOOTER,

    VITE_FONT_URL: import.meta.env.VITE_FONT_URL,

    VITE_FONT_FAMILY: import.meta.env.VITE_FONT_FAMILY,

    VITE_TEXT_PRIMARY_COLOR:
      import.meta.env.VITE_TEXT_PRIMARY_COLOR || "#292929",

    VITE_TEXT_SECONDARY_COLOR:
      import.meta.env.VITE_TEXT_SECONDARY_COLOR || "#7c7c80",

    VITE_SUBTLE_COLOR: import.meta.env.VITE_SUBTLE_COLOR || "#3d3d3d",

    VITE_SUBTLE_LEAST_COLOR:
      import.meta.env.VITE_SUBTLE_LEAST_COLOR || "#575757",

    VITE_BRAND_TERTIARY_BACKGROUND:
      import.meta.env.VITE_BRAND_TERTIARY_BACKGROUND || "#e6edfa",

    VITE_IDLE_TIMEOUT: import.meta.env.VITE_IDLE_TIMEOUT || "900000",

    VITE_WARNING_PERIOD: import.meta.env.VITE_WARNING_PERIOD || "30000",

    VITE_ENABLE_IDLE_SESSION:
      import.meta.env.VITE_ENABLE_IDLE_SESSION || "true",

    NODE_ENV: import.meta.env.MODE,
  };

  // Get any config value
  static get(key) {
    return this.config[key];
  }

  // Update config dynamically
  static set(key, value) {
    this.config[key] = value;
  }

  // Bulk update
  static load(newConfig = {}) {
    this.config = {
      ...this.config,
      ...newConfig,
    };
  }

  // Debug helper
  static print() {
    console.table(this.config);
  }
}

// Generate a 9-shade accessible color palette using chroma-js
function generateColorShades(baseColor, type = "primary") {
  const cleanColor = baseColor.trim().toLowerCase();

  if (type === "text") {
    return chroma
      .scale([
        chroma(cleanColor).brighten(2.5),
        cleanColor,
        chroma(cleanColor).darken(0.6),
      ])
      .mode("rgb")
      .colors(9);
  }

  return chroma
    .scale([
      chroma(cleanColor).luminance(0.9),
      cleanColor,
      chroma(cleanColor).darken(3).desaturate(0.5),
    ])
    .mode("lch")
    .colors(9);
}

// Apply generated shades dynamically to primary variables
function applyColorShades(prefix, baseColor, type = "primary", shadesArr = []) {
  const shades = generateColorShades(baseColor, type);
  const allShadeKeys = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const shadeKeys = shadesArr.length > 0 ? shadesArr : allShadeKeys;

  shadeKeys.forEach((key) => {
    const index = allShadeKeys.indexOf(key);
    document.documentElement.style.setProperty(
      `${prefix}${key}`,
      shades[index]
    );
  });
}

// shade index → semantic CSS variable mapping
const TEXT_SHADE_MAP = [
  { index: 0, variable: "--semantics-disabled-text" },
  { index: 2, variable: "--neutral-text-subtle-least" },
  { index: 3, variable: "--neutral-text-subtle" },
  { index: 4, variable: "--neutral-text-default" },
];

// Directly sets semantic text variables from generated shades
function applyTextColorShades(baseColor) {
  const shades = generateColorShades(baseColor, "text");
  const root = document.documentElement;
  TEXT_SHADE_MAP.forEach(({ index, variable }) =>
    root.style.setProperty(variable, shades[index])
  );
}

// --- Assign: font-family from env ---
const fontFamily = AppConfig.get("VITE_FONT_FAMILY")?.trim();
if (fontFamily) {
  document.documentElement.style.setProperty("--font-family", fontFamily);
}

// --- Trigger: Primary Blue ---
const primary = AppConfig.get("VITE_PRIMARY_COLOR")?.trim().toLowerCase();
const primary500 = getComputedStyle(document.documentElement)
  .getPropertyValue("--theme-primitive-color-primary-500")
  .trim()
  .toLowerCase();

if (primary && primary !== primary500) {
  applyColorShades("--theme-primitive-color-primary-", primary, "primary");
}

// --- Trigger: Text Grey ---
const textPrimary = AppConfig.get("VITE_TEXT_PRIMARY_COLOR")
  ?.trim()
  .toLowerCase();
const neutralText500 = getComputedStyle(document.documentElement)
  .getPropertyValue("--theme-colors-neutral-500")
  .trim()
  .toLowerCase();

if (textPrimary && textPrimary !== neutralText500) {
  applyTextColorShades(textPrimary);
}

export default AppConfig;
