import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const primary = definePartsStyle({
  field: {
    width: "54%",
    // minWidth: '382px',
    bg: "white",
    border: "1px solid var(--neutral-text-subtle-least)",

    _dark: {
      borderColor: "gray.600",
      background: "gray.800",
    },
  },
  addon: {
    border: "1px solid",

    _dark: {
      borderColor: "gray.600",
      background: "gray.600",
      color: "gray.400",
    },
  },
});
const primaryAddOn = definePartsStyle({
  field: {
    width: "15%",
    minWidth: "90px",
    bg: "white",
    border: "1px solid var(--neutral-text-subtle-least)",

    _dark: {
      borderColor: "gray.600",
      background: "gray.800",
    },
  },
  addon: {
    border: "1px solid var(--neutral-text-subtle-least)",
    bg: "var(--neutral-surface-layer-03)",
    fontSize: "1rem",
    color: "var(--neutral-text-default)",

    _dark: {
      borderColor: "gray.600",
      background: "gray.600",
      color: "gray.400",
    },
  },
});
const maskAddOn = definePartsStyle({
  field: {
    width: "46%",
    minWidth: "320px",
    bg: "var(--neutral-surface-layer-03)",
    borderRight: "none",
    _disabled: {
      opacity: 1,
    },

    _dark: {
      borderColor: "gray.600",
      background: "gray.800",
    },
  },
  addon: {
    bg: "var(--neutral-surface-layer-03)",
  },
});
const readOnlyAddOn = definePartsStyle({
  field: {
    width: "15%",
    minWidth: "90px",

    bg: "var(--neutral-surface-layer-03)",
    _dark: {
      borderColor: "gray.600",
      background: "gray.800",
    },
  },
  addon: {
    bg: "var(--neutral-surface-layer-03)",
    _dark: {
      borderColor: "gray.600",
      background: "gray.600",
      color: "gray.400",
    },
  },
});
const secondary = definePartsStyle({
  field: {
    width: "54%",
    minWidth: "382px",
    bg: "var(--neutral-surface-layer-02)",

    _dark: {
      borderColor: "gray.600",
      background: "gray.800",
    },
  },
  addon: {
    border: "1px solid",
    borderColor: "gray.200",
    background: "gray.200",
    borderRadius: "full",
    color: "gray.500",

    _dark: {
      borderColor: "gray.600",
      background: "gray.600",
      color: "gray.400",
    },
  },
});

const readOnly = definePartsStyle({
  field: {
    width: "54%",
    minWidth: "382px",
    bg: "var(--neutral-surface-layer-03)",

    // Dark mode styles
    _dark: {
      borderColor: "gray.600",
      background: "gray.800",
    },
  },
  addon: {
    width: "54%",
    minWidth: "250px",
    bg: "var(--neutral-surface-layer-03)",
  },
});

const rehireDate = definePartsStyle({
  field: {
    width: "289px",
    border: "1px solid var(--neutral-text-subtle-least)",
    bg: "var(--neutral-surface-layer-01)",
  },
});

const stepper = definePartsStyle({
  field: {
    border: "2px solid",
    borderColor: "gray.300",

    padding: "0.5rem",
    width: "80px",
    height: "40px",
    _placeholder: {
      color: "gray.500",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: {
    primary,
    secondary,
    readOnly,
    primaryAddOn,
    readOnlyAddOn,
    maskAddOn,
    rehireDate,
    stepper,
  },
});
