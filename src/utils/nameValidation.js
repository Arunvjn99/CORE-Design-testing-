const EXTENDED_LATIN = "\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF";

// Blocklist: only truly invalid special chars (allows - / & ' . ( ) @ ^ *)
export const INVALID_SPECIAL_CHARS_PATTERN = /[!#$%_+=\[\]{};:"\\|,<>?`~]+/;

// Same blocklist + digits (for bank name / address fields that block numbers)
export const INVALID_SPECIAL_CHARS_AND_DIGITS_PATTERN =
  /[0-9!#$%_+=\[\]{};:"\\|,<>?`~]+/;

// Returns true if value contains INVALID chars (for Yup .test())
export const checkSplChar = (val) => {
  if (!val) return false;
  return INVALID_SPECIAL_CHARS_PATTERN.test(val);
};

// Returns true if value contains INVALID chars OR digits (for bank names)
export const checkSplCharNoNumbers = (val) => {
  if (!val) return false;
  return INVALID_SPECIAL_CHARS_AND_DIGITS_PATTERN.test(val);
};

// Allowlist for FieldInput noSpecialChar — allows extended Latin + allowed special chars
export const VALID_NAME_PATTERN = new RegExp(
  `^[a-zA-Z0-9\\s${EXTENDED_LATIN}\\-/&'.()@^*]+$`
);

// Keydown/keypress blocker — blocks only invalid special chars
export const BLOCKED_KEYS_PATTERN = /^[!#$%_+=\[\]{};:"\\|,<>?`~]$/;

// Allowlist for FieldInput noSpecialChar — ASCII letters and digits only (no spaces or special characters)
export const ALPHA_NUMERIC_PATTERN = new RegExp(`^[a-zA-Z0-9]+$`);
