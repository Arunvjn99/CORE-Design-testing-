import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useLayoutEffect,
  forwardRef,
} from "react";
import {
  useFloating,
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  useId,
  hide,
  limitShift,
  size,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";
import { useDeepEffect } from "@/abstracts/hooks";
import { useIsVisible } from "./CoreDropVisiblehook";

// import { size } from 'lodash'

const PopoverContext = createContext(null);

/**==================================   Dont edit this file ====================================================== */

export function usePopover({
  initialOpen = false,
  placement = "bottom-start",
  offset = 0,
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  hideOnElementHidden,
  changePositiononSpace,
  dropWidthSameAsFiled,
  aRef,
  setPos,
  hideRightAttachment,
  turnonShift,
  ref,
} = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState();
  const [descriptionId, setDescriptionId] = useState();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  var dc =
    document.querySelector(".panel ") != null
      ? document.querySelector(".panel ")
      : document.querySelector(".app-layout");
  const data = useFloating({
    placement,
    open,
    hideOnElementHidden,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset,
      hide({
        strategy: "referenceHidden",
        padding: 30, //hides if 30px is left for field 30px is default
        boundary: dc,
      }),
      turnonShift === false
        ? shift({
            crossAxis: turnonShift,
            mainAxis: turnonShift,
            limiter: limitShift({
              // mainAxis: false,
            }),
            boundary: dc,
          })
        : shift({
            limiter: limitShift({}),
            boundary: dc,
          }),
      flip({
        mainAxis: changePositiononSpace,
        crossAxis: changePositiononSpace,
        fallbackAxisSideDirection: "end",
        boundary: dc,
      }),
      size(({ rects, elements }) => {
        const floatingWidth = dropWidthSameAsFiled
          ? `${rects.reference.width}`
          : null;
        if (floatingWidth === "0" || floatingWidth === "0px") {
          elements.floating.style.removeProperty("width");
          return {};
        }
        return Object.assign(elements.floating.style, {
          width: floatingWidth,
        });
      }),
      arrow({
        element: aRef,
        padding: 5,
      }),

      // arrow({ element: aRef }),
    ],
    elements: {
      reference: ref?.current,
      domReference: ref?.current,
      floating: ref?.current,
    },
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  useDeepEffect(() => {
    setPos(data.placement);
  }, [data]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId]
  );
}

const Popover = (props) => {
  const {
    title,
    description,
    alignment,
    children,
    placement,
    hideOnElementHidden,
    modal = false,
    ...restOptions
  } = props;
  const popover = usePopover({
    modal,
    placement,
    hideOnElementHidden,
    ...restOptions,
  });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};

// Popover
const PopoverTrigger = forwardRef(
  (
    { children, asChild = false, disabled, setfieldHide, ...props },
    propRef
  ) => {
    const context = useContext(PopoverContext);

    const childrenRef = children.ref;

    const isVisible = useIsVisible(childrenRef);

    useDeepEffect(() => {
      setfieldHide(isVisible);
    }, [isVisible]);

    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
          "data-state": context.open ? "open" : "closed",
        })
      );
    }

    // return (
    //   <button
    //     ref={ref}
    //     type="button"
    //     data-state={context.open ? "open" : "closed"}
    //     {...context.getReferenceProps(props)}
    //     style={{backgroundColor : disabled ? "var(--semantics-critical-background-strong)" : "var(--neutral-surface-layer-01)", outline : "none",  display : "block"}}
    //   >
    //     {children}
    //   </button>
    // );
  }
);

const PopoverContent = forwardRef(({ style, ...props }, propRef) => {
  const [h, sh] = useState();
  const NewX = props?.NewX;
  const NewY = props?.NewY;

  const { context: floatingContext, ...context } = useContext(PopoverContext);
  const {
    hideOnElementHidden,
    aRef,
    pos,
    hideRightAttachment,
    isDateRangePicker,
    nref,
    fieldHide,
    rightAttachmentTransalateY = null,
  } = props;

  useDeepEffect(() => {
    sh(floatingContext?.middlewareData?.hide?.referenceHidden);
  }, [floatingContext?.middlewareData]);

  // sh(floatingContext?.middlewareData?.hide?.referenceHidden)
  const ref = useMergeRefs([context.refs.setFloating, propRef, nref]);

  if (!floatingContext.open) return null;
  //  let hd = undefined;

  function createSVGPath(width, height) {
    return `M 0 0 L 0 ${height} L ${width} ${height} L ${width} 0 Z`;
  }
  const customWidth = 100;
  const customHeight = 100;

  const svgPath = createSVGPath(customWidth, customHeight);
  const offsetMap = new Map([
    ["top", 1],
    ["bottom", -1],
    ["right", 1],
    ["left", -1],
  ]);

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={context.modal}>
        <div
          ref={ref}
          style={{
            zIndex: "1000000",
            ...context.floatingStyles,
            ...style,
            visibility: hideOnElementHidden
              ? h || !fieldHide
                ? "hidden"
                : "visible"
              : undefined,
          }}
          // className="cd-popup-content-font"
          aria-labelledby={context.labelId}
          aria-describedby={context.descriptionId}
          {...context.getFloatingProps(props)}
        >
          {props.children}
          {/* <FloatingArrow
                ref={aRef}
                context={context}
                width={43}
                height={5}
                fill="var(--neutral-surface-layer-01)"
                style={{
                  transform: "translateY(-1px) scaleX(-1)",
                  background:"var(--neutral-surface-high-contrast)"
                  // transform: translateY(-1px) rotate(270deg);
     
                }}
                // staticOffset={ '15%' }
              /> */}

          {pos?.includes("right") && hideRightAttachment === false ? (
            <FloatingArrow
              ref={aRef}
              context={context}
              width={20}
              height={10}
              // height={3}
              // offset={}
              fill="var(--neutral-surface-layer-01)"
              // d={svgPath}

              style={{
                width: "35px",
                transform:
                  rightAttachmentTransalateY == null
                    ? isDateRangePicker
                      ? "translateY(1px)"
                      : "translateY(-3px)"
                    : rightAttachmentTransalateY, // if its  double drp 1px
                right: "calc(98% + -5px)",
                height: "9px",
                // zIndex:"999",
                // "box-shadow": "var(--elevation-01)",
                background: "var(--neutral-surface-layer-01)",
              }}
            />
          ) : null}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

const PopoverHeading = forwardRef((props, ref) => {
  const { setLabelId } = useContext(PopoverContext);
  const id = useId();

  useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <h2 {...props} ref={ref} id={id}>
      {props.children}
    </h2>
  );
});

const PopoverDescription = forwardRef((props, ref) => {
  const { setDescriptionId } = useContext(PopoverContext);
  const id = useId();

  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return <p {...props} ref={ref} id={id} />;
});

const PopoverClose = forwardRef((props, ref) => {
  const { setOpen } = useContext(PopoverContext);
  return (
    <button
      type="button"
      ref={ref}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        setOpen(false);
      }}
    />
  );
});

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeading,
  PopoverDescription,
  PopoverClose,
};

/**==================================   Dont edit this file ======================================================
 * MIT ©  | Release date: Feb-2024 | Authors: venkatesh mylaram , manish patil | version : 1.0.1 | core-vm-popper
 */
