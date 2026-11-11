import { useState, useRef } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangle } from "@fortawesome/pro-solid-svg-icons";
import styles from "./HeaderDropdown.module.scss";
import { useDeepEffect } from "@/abstracts/hooks";
import AddToolTip from "@/components/AddToolTip";

// type BottomDropdownProps = {
//   list: string[];
//   onSelect?: (value: string) => void;
// };

export default function HeaderDropdown({
  list,
  onSelect,
  productData,
  defaultUserProd,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const arrowRef = useRef(null);
  const ARROW_HEIGHT = 10;
  const ARROW_WIDTH = 14;
  useDeepEffect(() => {
    if (
      window.localStorage.getItem("defaultProductId") != null &&
      productData?.some(
        (product) =>
          String(product.id) === window.localStorage.getItem("defaultProductId")
      ) &&
      !selected
    ) {
      const selectedProduct = productData.find(
        (product) =>
          String(product.id) === window.localStorage.getItem("defaultProductId")
      );
      if (selectedProduct) {
        setSelected(`${selectedProduct.name}`);
      } else {
        const defaultProd = productData.find(
          (product) => product.id == defaultUserProd
        );
        if (defaultProd) {
          setSelected(`${defaultProd.name}`);
        }
      }
    } else if (list?.length > 0 && !selected) {
      const defaultProd = productData?.find(
        (product) => product.id == defaultUserProd
      );
      if (defaultProd) {
        setSelected(`${defaultProd.name}`);
      }
    }
  }, [list, defaultUserProd]);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-end",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(20),
      flip(),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);
  const setSelectedPortalOption = (value) => {
    if (productData?.length > 0) {
      const selectedProduct = productData.find(
        (product) => `${product.name}` === value
      );
      if (selectedProduct) {
        window.localStorage.setItem("defaultProductId", selectedProduct.id);
      }
    }
  };
  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    onSelect?.(value);
    setSelectedPortalOption(value);
  };

  return (
    <div className={styles.headerDropdown}>
      {/* Trigger Button */}
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={styles.triggerButton}
      >
        <span className={styles.buttonText}>
          {" "}
          {selected ? (
            <span className={styles.selectedText}>
              {selected.length > 15 ? (
                <AddToolTip name={selected} placement="bottom">
                  {selected.slice(0, 15)}...
                </AddToolTip>
              ) : (
                selected
              )}
            </span>
          ) : (
            "Select Product"
          )}
        </span>
        <FontAwesomeIcon icon={faTriangle} className={styles.dropdownIcon} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles.dropdownContainer}
            {...getFloatingProps()}
          >
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={ARROW_WIDTH}
              height={ARROW_HEIGHT}
              style={{ right: 16, left: "auto" }}
              fill="var(--brand-border-primary-default)"
            />
            {list.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className={styles.dropdownItem}
              >
                {item.length > 15 ? (
                  <AddToolTip name={item} placement="bottom">
                    <span>{item.slice(0, 15)}...</span>
                  </AddToolTip>
                ) : (
                  item
                )}
              </div>
            ))}
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
