import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./Theme/inputTheme.js";
import { listTheme } from "./Theme/listTheme.js";

const theme = extendTheme({
  components: {
    //Buttons
    Button: {
      baseStyle: {
        paddingTop: "0.625rem ",
        paddingBottom: "0.625rem",
        paddingLeft: "10rem",
        paddingRight: "1rem",
        fontWeight: "500",

        fontSize: "var(--fs-16)",
      },
      variants: {
        primary: {
          bg: "var(--neutral-surface-layer-01)",
          color: "var(--semantics-critical-text)",
          border: "1px solid var(--semantics-critical-border)",
          borderRadius: "4px",
          _hover: {
            opacity: 0.6,
          },
        },
        primary2: {
          bg: "var(--neutral-surface-layer-01)",
          color: "var(--semantics-critical-text)",
          border: "1px solid var(--semantics-critical-border)",
          marginLeft: "0.75rem",
          borderRadius: "4px",
          _hover: {
            opacity: 0.6,
          },
        },
        primary3: {
          bg: "var(--neutral-surface-layer-01)",
          color: "var(--semantics-critical-text)",
          border: "1px solid var(--semantics-critical-border)",
          width: "8.375rem",
          // height: '2.348rem',
          padding: "1rem 0.625rem 1rem 0.625rem",
          borderRadius: "4px",
          _hover: {
            opacity: 0.6,
          },
        },

        secondary: {
          bg: "var(--semantics-critical-background-strong)",
          color: "var(--neutral-text-on-color)",
          marginLeft: "10px",
          borderRadius: "4px",

          _hover: {
            opacity: 0.6,
          },
        },
        secondary2: {
          bg: "var(--semantics-critical-background-strong)",
          color: "var(--neutral-text-on-color)",
          width: "6.75rem",
          height: "2.438rem",

          borderRadius: "4px",
          _hover: {
            opacity: 0.6,
          },
        },
        secondary3: {
          bg: "var(--semantics-critical-background-strong)",
          color: "var(--neutral-text-on-color)",
          width: "8.375rem",
          // height: '2.348rem',
          padding: "1rem 0.625rem 1rem 0.625rem",
          borderRadius: "4px",
          _hover: {
            opacity: 0.6,
          },
        },
        secondarySlider: {
          marginTop: "10px",
          bg: "var(--semantics-critical-background-strong)",
          color: "var(--neutral-text-on-color)",
          marginLeft: "10px",
          borderRadius: "2px",
          _hover: {
            bg: "var(--semantics-critical-background-strong)",
            color: "var(--neutral-text-on-color)",
          },
        },
        secondary2Slider: {
          bg: "var(--semantics-critical-background-strong)",
          color: "var(--neutral-text-on-color)",
          marginLeft: "10px",
          borderRadius: "2px",
          _hover: {
            bg: "var(--semantics-critical-background-strong)",
            color: "var(--neutral-text-on-color)",
          },
        },
        navigation: {
          padding: "16px 15px 16px 15px",
          height: "51px",
          cursor: "pointer",
          transition: "background 0.3s ease",
          fontSize: "1rem",
          fontWeight: "500",
          justifyContent: "start",
          color: "var(--neutral-text-subtle)",
        },
        navSelected: {
          padding: "16px 15px 16px 15px",
          height: "51px",
          cursor: "pointer",
          transition: "background 0.3s ease",
          fontSize: "1rem",
          background: "var(--neutral-surface-layer-01)",
          borderRadius: "8px",
          fontWeight: "600",
          width: "100%",
          fontWeight: "600",
          justifyContent: "start",
          color: "var(--neutral-text-subtle)",

          ".faHeart": {
            // WebkitBackgroundClip: 'text',
            // WebkitTextFillColor: 'transparent',
            color: "var(--semantics-highlight-text)",
          },
          ".faBriefcase": {
            color: "var(--semantics-highlight-text)",
          },
          ".faUniversity": {
            color: "var(--semantics-highlight-text)",
          },
        },
      },
      defaultProps: {},
    },

    Text: {
      baseStyle: {},
      variants: {
        sections: {
          fontSize: "1.25rem",
          fontWeight: "600",
          paddingTop: "0px",
          paddingBottom: "15px",
          color: "var(--neutral-text-subtle)",
        },
        section: {
          fontSize: "1.25rem",
          fontWeight: "600",

          color: "var(--neutral-text-subtle)",
        },
        smallSections: {
          fontSize: "1rem",
          fontWeight: "600",
          paddingTop: "0px",
        },
        largeText: {
          padding: 0,
          fontSize: "1rem",
          fontWeight: "500",
          color: "var(--neutral-text-subtle)",
          margin: 0,
        },
        subtitles: {
          padding: 0,
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "var(--neutral-text-default)",
        },
        paragraphTitle: {
          fontSize: "1rem",
          fontWeight: "700",
          lineHeight: "1.21rem",
          paddingBottom: "0.4rem",
        },
        paragraph: {
          fontSize: "var(--fs-14)",
          fontWeight: "500",
          lineHeight: "1.21rem",
          paddingBottom: "0.4rem",
        },
        smallsubtext: {
          fontSize: "var(--fs-14)",
          fontWeight: "500",
          lineHeight: "1.059rem",
          color: "var(--neutral-text-subtle-least)",
        },
        progress: {
          fontWeight: "700",
          fontSize: "0.75rem",
          color: "var(--brand-text-primary-default)",
        },
        completed: {
          fontWeight: "700",
          fontSize: "0.75rem",

          color: "var(--semantics-success-text)",
        },
        error: {
          fontSize: "0.9rem",
          color: "var(--semantics-critical-text)",
        },
        disabledLink: {
          color: "var(--brand-text-primary-default)",
          fontSize: "1rem",
        },
      },
    },

    Card: {
      baseStyle: {
        padding: 0,
      },
      variants: {
        primary: {
          container: {
            paddingBottom: 0,
            boxShadow:
              "0px 2px 4px -1px color-mix(in srgb, var(--neutral-surface-high-contrast) 10%, transparent)",
          },
        },
        accordion: {
          container: {
            border: "1px solid var(--neutral-border-strong)",
            padding: "0.5rem",
            marginTop: "1rem",
            marginBottom: "1rem",
          },
        },
      },
      defaultProps: {},
    },

    //Input
    FormLabel: {
      baseStyle: {
        fontSize: "var(--fs-15)",

        paddingTop: "10px",
      },
      variants: {
        readOnly: {
          fontWeight: "500",
          color: "var(--neutral-text-subtle-least)",
        },
        primary: {
          fontWeight: "500",
          color: "var(--neutral-text-subtle-least)",
        },
        maskAddOn: {
          fontWeight: "500",
          color: "var(--neutral-text-subtle-least)",
        },
      },
      defaultProps: {},
    },

    Input: inputTheme,

    HStack: {
      baseStyle: {
        spacing: 0, // Set spacing between items to 0
        p: 0, // Set padding to 0 by default
        m: 0, // Set margin to 0 by default
        gap: 0,
      },
    },
    VStack: {
      baseStyle: {
        spacing: 0, // Set spacing between items to 0
        p: 0, // Set padding to 0 by default
        m: 0, // Set margin to 0 by default
        gap: 0,
      },
    },

    Tabs: {
      baseStyle: {
        tab: {
          fontWeight: "600",
          fontSize: "var(--fs-16)",
          margin: 0,
        },
        tablist: {
          margin: 0,
          width: "100%",

          borderBottom:
            "1px solid var(--Border-border-light, var(--neutral-border-strong))",
        },
      },
      variants: {
        primary: {
          tab: {
            _selected: {
              borderBottom: "4px solid",
              borderImage: "var(--semantics-critical-border)",
              borderImageRadius: "8px, 8px, 0px, 0px",
              borderImageSlice: "1",
            },
          },

          tabpanel: {
            overflowY: "scroll",
            height: "54vh",

            "::-webkit-scrollbar": {
              display: "none",
            },
            /* Hide scrollbars for Firefox */
            scrollbarWidth: "none",
            /* Hide scrollbars for other browsers */
            msOverflowStyle: "none",
          },
        },
        enrolled: {
          tab: {
            height: "4.9rem",
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            textAlign: "left", // Ensures text is aligned to the left
            justifyContent: "flex-end", // Aligns content to the left
            fontSize: "var(--fs-14)",
            color: "var(--neutral-text-subtle-least)",
            borderBottom:
              "2px solid var(--Border-border-light, var(--neutral-border-strong))",

            ".enrolled-plans-tab-header-plan-icon": {
              padding: "0 0.375rem",
              fontSize: "0.625rem",
              borderRadius: "0.875rem",
              backgroundColor: "var(--neutral-surface-layer-02)",
              color: "var(--neutral-text-subtle-least)",
              marginBottom: "0.4rem",
            },

            _selected: {
              bg: "var(--neutral-surface-layer-01)",
              borderBottom: "2px solid",
              borderImageSource: "var(--semantics-critical-border)",
              borderImageSlice: 1,
              fontSize: "1.125rem",
              fontWeight: "700",
              lineHeight: "1.361rem",

              ".enrolled-plans-tab-header-plan-icon": {
                padding: "0 0.375rem",

                borderRadius: "0.875rem",
                backgroundColor: "var(--semantics-success-background-strong)",
                color: "var(--neutral-text-on-color)",
                marginBottom: "0.5rem",
              },
            },
          },

          tabpanel: {
            overflowY: "auto",
            height: "33vh",
            padding: "1rem",
            boxSizing: "content-box",
            "::-webkit-scrollbar": {
              // display: "none",
              width: "4px",
            },
            "::-webkit-scrollbar-track": {
              background: "var(--scrollbar-track)",
              marginRight: "0.5rem",
            },
            "::-webkit-scrollbar-thumb": {
              background: "var(--scrollbar-thumb)",
              borderRadius: "4px",
            },
            /* Hide scrollbars for Firefox */
            // scrollbarWidth: "none",
            /* Hide scrollbars for other browsers */
            // msOverflowStyle: "none",
          },
        },
      },
    },

    Select: {
      baseStyle: {},
      variants: {
        primary: {
          field: {
            bg: "var(--neutral-surface-layer-01)",
            border: "1px solid var(--neutral-border-strong)",
            width: "54%",
            // minWidth: "382px",
          },
        },
        readOnly: {
          field: {
            _disabled: {
              cursor: "text", // Optional: change cursor style to indicate disabled state
              opacity: 1,
              bg: "var(--neutral-surface-layer-04)",
            },
          },
          icon: {
            color: "transparent",
            opacity: 1,
          },
        },
      },
    },

    Drawer: {
      baseStyle: {
        dialog: {
          bg: "var(--neutral-surface-layer-01)",
          borderRadius: 0,
        },
        header: {
          padding: "1rem",
        },
        body: {
          padding: 0,
        },
        footer: {
          padding: 0,
        },
        closeButton: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
      sizes: {
        sm: {
          dialog: {
            maxWidth: "638px", // For small size
          },
        },
        sd: {
          dialog: {
            minWidth: "500px",
          },
        },
        md: {
          dialog: {
            maxWidth: "60%", // For medium size
          },
        },
        lg: {
          dialog: {
            maxWidth: "60vw", // For large size
            minWidth: "450px",
          },
        },
        xlg: {
          dialog: {
            maxWidth: "80vw", // For xlarge size
            minWidth: "80vw",
          },
        },
        lmd: {
          dialog: {
            minWidth: "65vw",
            width: "65vw",
            maxWidth: "65vw",
            // minWidth: "450px",
          },
        },
        smd: {
          dialog: {
            minWidth: "35vw",
          },
        },
      },
      variants: {
        primary: {
          body: {
            padding: "1rem",
          },
          closeButton: {
            _focus: {
              boxShadow: "none",
            },
          },
        },
        secondary: {
          dialog: {
            padding: 0,
          },
          header: {
            borderBottom: "1px solid var(--neutral-border-strong)",
          },

          body: {
            bg: "var(--neutral-surface-layer-02)",
          },
          closeButton: {
            _focus: {
              boxShadow: "none",
            },
          },
        },
        subtle: {
          dialog: {
            bg: "gray.50", // Background color of the drawer for subtle variant
          },
        },
      },
      defaultProps: {},
    },

    Divider: {
      baseStyle: {},
    },

    Radio: {
      baseStyle: {
        control: {
          borderColor: "var(--neutral-border-strong)",
          padding: 0,
          fontSize: "20px",
          _checked: {
            bg: "var(--neutral-surface-layer-01)",
            borderColor: "blue.500",
            color: "var(--neutral-text-on-color)",
            // Increase size of the checked indicator

            "::after": {
              content: '""',
              display: "block",
              width: "1rem", // Adjust size as needed
              height: "1rem", // Adjust size as needed
              borderRadius: "50%",
              backgroundColor: "blue.500",
              position: "absolute",
              // top: '50%',
              // left: '50%',
              // transform: 'translate(-50%, -50%)',
            },
          },
          _focus: {
            bg: "var(--neutral-surface-layer-01)",
            borderColor: "blue.500",
            color: "var(--neutral-text-on-color)",
            opacity: 1,
            boxShadow: "none",
          },
        },
        label: {
          fontWeight: "lg",
          width: "100%",
        },
      },
      sizes: {
        md: {
          control: {
            width: "24px",
            height: "24px",
          },
        },
        lg: {
          control: {
            width: "32px",
            height: "32px",
          },
        },
      },

      defaultProps: {},
    },

    List: listTheme,

    Accordion: {
      baseStyle: {
        container: {
          padding: 0,
          margin: "0",
          border: "none",
        },
        button: {
          bg: "var(--neutral-surface-layer-01)",
          border: "none",
          padding: "0",
          _expanded: {
            bg: "var(--neutral-surface-layer-01)",
            borderBottom: "1px solid var(--neutral-border-strong)",
            paddingBottom: "1rem",
            marginBottom: 0,
          },

          _hover: {
            bg: "none",
          },
        },
        panel: {
          padding: 0,
          marginTop: "10px",
        },
      },

      variants: {
        primary: {
          button: {
            bg: "transparent",
            padding: "0.8rem 0rem",
            width: "54%",
            minWidth: "382px",
            fontSize: "1rem",
            color: "var(--neutral-text-subtle)",
            marginTop: "0.8rem",
            justifyContent: "space-between",
            border: "1px solid var(--neutral-border-strong)",
            borderLeft: "none",
            borderRight: "none",
            _expanded: {
              bg: "none",
            },
          },
        },
        secondary: {
          container: {
            border: "none",

            bg: "none",
          },
          button: {
            justifyContent: "space-between",
            border: "none",
            _expanded: {
              bg: "none",
            },
          },
        },
      },
    },

    Table: {
      baseStyle: {},
      variants: {
        primary: {
          table: {},
          th: {
            fontWeight: "bold",
            color: "teal.600",
            borderBottom: "2px solid",
            borderColor: "gray.200",
          },
          td: {
            padding: "1rem 0.5rem 1rem 0.5rem",
            borderBottom: "1px solid",
            borderColor: "gray.100",

            fontSize: "var(--fs-14)",
            fontWeight: "500",
            lineHeight: "16.94px",
            textAlign: "left",
          },
          tr: {
            _hover: {
              bg: "gray.50",
            },
          },

          thead: {
            padding: "0.5rem",
            borderBottom: "2px solid var(--neutral-border-strong)",
          },
          tbody: {},
        },
      },
    },

    Switch: {
      baseStyle: {
        track: {
          bg: "var(--neutral-surface-layer-05)",
          boxShadow: "var(--elevation-01)",

          _checked: {
            bg: "var(--semantics-critical-background-strong)", // Track background when checked
            boxShadow: "var(--elevation-01)",
          },
        },
        thumb: {
          boxShadow:
            "0px 1.95px 1.95px 0px color-mix(in srgb, var(--semantics-highlight-background-strong) 20%, transparent)",
        },
      },
    },

    Slider: {
      baseStyle: {
        track: {},
        thumb: {
          boxSize: 5,
          boxShadow: "var(--elevation-01)",
          padding: "0.2rem",
          _focus: {
            boxSize: 5,
            boxShadow: "var(--elevation-01)",
            padding: "0.2rem",
          },
        },
        valueLabel: {},
      },
    },
    Modal: {
      baseStyle: {
        padding: 0,
      },
      variants: {
        primary: {
          container: {
            padding: "1rem",
            boxShadow:
              "0px 2px 4px -1px color-mix(in srgb, var(--neutral-surface-high-contrast) 10%, transparent)",
          },
          body: {
            padding: "1rem",
            justifyContent: "center",
          },
          footer: {
            justifyContent: "center",
          },
        },
      },
      defaultProps: {},
    },
    //component styles till here
  },

  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
        margin: 0, // Set global margin to 0
        padding: 0,
        verticalAlign: "bottom",
      },
      body: {
        fontFamily: "var(--font-family)", // Set global font family
      },
      ".subnav-container": {
        background: "var(--neutral-surface-layer-02)",
        height: "100vh",
        minWidth: "280px",
      },
      ".secondary-divider": {
        marginTop: "15px",
        marginBottom: "15px",
      },

      ".primary-text": {
        fontSize: "var(--fs-14)",
        color: "var(--neutral-text-subtle)",
        fontWeight: "600",
      },

      //Subpage Headers

      ".core-layout-subpage-container": {
        padding: "15px 20px",
        gap: "8px",
        display: "flex",
      },
      ".core-layout-subpage-header-text": {
        fontSize: "1.125rem",
        fontWeight: "600",
      },
      ".core-layout-subpage-subheader-text": {
        fontSize: "var(--fs-16)",
        fontWeight: "400",
        color: "var(--neutral-text-subtle)",
      },
      ".home-page-subpage-container": {
        // padding: "15px 20px",
        // gap: "8px",
        // display: "flex",
        // borderBottom: "1px solid var(--neutral-border-strong)"
      },
      ".home-page-subpage-header-text": {
        fontSize: "1.5rem",
        fontWeight: "600",
      },
      ".edit-plan-header-card-subpage-header-text": {
        fontSize: ".875rem",
        fontWeight: "500",
        letterSpacing: 0,
        color: "var(--neutral-text-subtle-least)",
        textAlign: "left",
      },
      ".edit-plan-header-card-subpage-subheader-text": {
        fontSize: "1rem",
        fontWeight: "600",
        letterSpacing: 0,
        color: "var(--neutral-text-subtle)",
        textAlign: "left",
      },
      ".field-rollover-source-subpage-header-text": {
        fontSize: ".875rem",
        fontWeight: 500,
        letterSpacing: 0,
        color: "var(--neutral-text-subtle-least)",
      },
      ".home-page-subpage-subheader-text": {
        fontSize: ".875rem",
        fontWeight: "400",
        color: "var(--neutral-text-subtle)",
        marginTop: "-10px",
      },

      ".manage-core-layout": {
        margin: "0px 30px",
        "&.flexWrapper": {
          display: "flex",
          flexWrap: "wrap",
        },
      },
      ".manage-company-layout2": {
        margin: "0px 30px ",
        height: "calc(100vh - 6rem - 6.5rem)",

        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
        /* Hide scrollbars for Firefox */
        scrollbarWidth: "none",
        /* Hide scrollbars for other browsers */
        msOverflowStyle: "none",
      },

      ".form-layout": {
        padding: "1rem",
        // paddingTop: '0rem',
        height: "calc(100vh - 9rem - var(--footer-height, 0px))",
        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
        /* Hide scrollbars for Firefox */
        scrollbarWidth: "none",
        /* Hide scrollbars for other browsers */
        msOverflowStyle: "none",
      },

      ".scroll-y": {
        overflowY: "auto ",
        scrollbarWidth: "thin ",
      },

      ".plan-card-container-col-container": {
        background: "var(--neutral-surface-layer-02)",
        padding: "16px",
        borderRadius: "8px",

        display: "flex",
        justifyContent: "space-between",
      },
      ".form-plan-details-layout": {
        padding: "1rem",
        paddingTop: 0,
        height: "calc(100vh - 6rem - 3rem)",
        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      },
      ".core-heading-subpage-subheader-text": {
        fontSize: "1.125rem",
        fontWeight: "700",
      },
      ".manage-company-layout": {
        // margin: '0px 30px',
        maxHeight: "calc(100vh - 6rem - 5rem)",
        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
        /* Hide scrollbars for Firefox */
        scrollbarWidth: "none",
        /* Hide scrollbars for other browsers */
        msOverflowStyle: "none",
      },
      ".manage-company-layout-chip-tag": {
        margin: "0px 30px",
      },
      ".manage-company-layout.optional": {
        height: "auto",
        maxHeight: "300px",
        overflow: "auto",
      },
      ".manage-company-layout-row-container": {
        margin: "0px 30px",
      },
      ".source-layout-subpage-container": {
        margin: "0px 0px",
      },
      ".manage-company-layout-subpage-container": {
        //marginRight: '2rem'
        // margin: '10px 30px',
      },
      ".trustee-subpage-container": {
        margin: "0px 30px",
      },
      ".plan-config-side-bar-subpage-container": {
        margin: "0px 16px",
      },
      ".plan-config-side-bar-subpage-header-text": {
        fontSize: "22px",
      },
      ".manage-company-layout-subpage-header-text": {
        fontSize: "1.5rem",
      },
      ".company-details-header-actions": {
        marginTop: "0px",
      },
      ".trustee-subpage-header-text": {
        fontSize: "1.5rem",
      },
      ".manage-core-layout-subpage-subheader-text": {
        fontSize: "1.125rem",
      },
      ".trustee-subHeader-text-subpage-subheader-text": {
        fontSize: "18px",
        fontFamily: "var(--font-family)",
        fontWeight: "700",
      },
      ".manage-subHeader-text-subpage-subheader-text": {
        fontSize: "var(--fs-15)",
        fontFamily: "var(--font-family)",
        fontWeight: "600",
      },
      ".manage-subHeader-text-subpage-header-text": {
        fontSize: "13px",
        fontFamily: "var(--font-family)",
        fontWeight: "300",
      },
      ".manage-eclipse-text-subpage-subheader-text": {
        fontSize: "var(--fs-15)",
        fontFamily: "var(--font-family)",
        fontWeight: "600",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        maxWidth: "80px",
      },
      ".manage-eclipse-text-subpage-header-text": {
        fontSize: "13px",
        fontFamily: "var(--font-family)",
        fontWeight: "300",
        textAlign: "center",
      },

      "&.custom-calendar.hide-weekdays": {
        ".react-calendar__viewContainer .react-calendar__month-view": {
          ".react-calendar__month-view__days": {
            paddingTop: "10px",
            "&::before": {
              borderTop: "none",
            },
          },
        },

        ".react-calendar__month-view__weekdays": {
          display: "none ",
        },
      },

      ".beneficiary-header-title": {
        fontSize: "1.5rem",
        fontWeight: "600",
      },
      ".eligibility-header-title": {
        fontSize: "1.5rem",
        fontWeight: "600",
      },
      ".eligibility-slider-header": {
        borderBottom: "1px solid var(--neutral-border-strong)",
      },

      //Profile layout right content
      ".profile-layout-right-content": {
        backgroundColor: "var(--neutral-surface-layer-02)",
        width: "100%",
        height: "90vh",
        padding: "16px",

        ".profile-detail-box-container": {
          width: "100%",
          //profile detail profile card
          ".profile-detail-profile-card-box-container": {
            height: "96px",
            width: "100%",
            padding: "0px",
            margin: "0px",

            borderBottom: "1px solid var(--neutral-border-strong)",
            ".profile-detail-profile-card-box-container2": {
              width: "100%",
              padding: "0px",
              margin: "0px",
            },

            ".profile-detail-profile-card-col-container": {
              padding: "0px",
              margin: "0px",

              ".edit-button-box-container": {
                width: "100%",
                ".edit-button-box-container2": {
                  bg: "var(--semantics-critical-background-strong)",
                  display: "flex",
                  justifyContent: "flex-end",
                },
              },
            },
          },
        },
      },

      /* Profile Page Layout Styles */
      ".navigation-core-layout": {
        li: {
          padding: "8px 16px",
          cursor: "pointer",
          transition: "background 0.3s ease",
          fontSize: "var(--fs-16)",
          borderColor: "var(--neutral-border-strong)",
        },
        "li.selected": {
          backgroundColor:
            "color-mix(in srgb, var(--brand-background-primary-strong) 10%, transparent)",
          borderRadius: "0",
          borderRight: "3px solid var(--brand-border-primary-default)",
          color: "var(--neutral-text-default)",
        },
      },
      ".core-layout .has-tick": {
        gap: "0.25rem",
      },
      ".core-layout .has-tick > svg:not(.angle)": {
        fontSize: "0.75rem",
      },
      ".core-layout-navigationBar-container": {
        minWidth: "280px",
        height: "100%",
        ".navigationBar": {
          "&-item-container": {
            padding: "0.5em 2em",
            cursor: "pointer",
            transition: "background 0.3s ease",
            fontSize: "var(--fs-16)",
          },
          "&-item-icon-active": {
            marginRight: "1vw",
            fontSize: "var(--fs-12)",
            color: "var(--semantics-critical-text)",
          },
          "&-item-icon-not-active": {
            marginRight: "1vw",
            fontSize: "var(--fs-12)",
          },
          "&-item-text-not-active": {
            fontWeight: "300",
          },
          "&-item-text-not-active.disabled": {
            opacity: "0.5",
            cursor: "default",
          },
          "&-item-active": {
            background: "var(--brand-background-primary-light)",
          },
          "&-item-active .navigationBar-item-text-active": {
            color: "var(--semantics-critical-text)",
            fontWeight: "600",
          },
          "&-item-text-active": {
            color: "var(--neutral-text-on-color)",
          },
          "&-item-inner": {
            color: "var(--neutral-text-default)",
            fontSize: "var(--fs-14)",
            textAlign: "left",
          },
        },
      },
      ".overflow-hide-scroll": {
        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
        /* Hide scrollbars for Firefox */
        scrollbarWidth: "none",
        /* Hide scrollbars for other browsers */
        msOverflowStyle: "none",
      },

      ".core-layout-right-content": {
        overflow: "auto",
      },

      // global style end
    },
  },
  breakpoints: {
    sm: "58.75rem", // for small screens
    md: "75rem", // for medium screens
    lg: "100rem", // for large screens (example)
  },
});

export default theme;
