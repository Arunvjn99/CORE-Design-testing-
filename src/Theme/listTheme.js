import { listAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

// Initialize the helpers for multi-style configuration
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  container: {
    paddingLeft: "1.275rem",
    listStyleProps: "center",
    width: "100%",
    borderLeft: "1.63px solid var(--neutral-text-subtle-least)",
    height: "100%",
  },
  item: {
    paddingBottom: 2,
    justifyContent: "center",
    "&::marker": {
      color: "var(--brand-text-primary-default)",
      transform: "translateY(100rem)",
      fontSize: "32px",
    },
  },
  icon: {
    size: "12.78px",

    marginTop: "100px",
    color: "var(--brand-text-primary-default)",
  },
}));

export const listTheme = defineMultiStyleConfig({ baseStyle });
