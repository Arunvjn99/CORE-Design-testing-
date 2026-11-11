import styles from "./DateInputField.module.scss";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  allowOnlyNumbers,
  isValidDate,
  isWeekEnd,
  usDateFormat,
} from "@/utils/helpers";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/pro-solid-svg-icons";
import { useRef } from "react";

const DateInputField = ({
  onChange,
  onDateChange,
  value,
  setCurrDate,
  minDate,
  maxDate,
  disableBeforeDate,
  disableWeekends = false,
  disabledDates = [],
}) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    if (value != false) {
      const date = value ? new Date(value) : "";
      const day = date != "" ? `${date.getDate()}` : "";
      const month = date != "" ? `${date.getMonth() + 1}` : "";
      const year = date != "" ? `${date.getFullYear()}` : "";
      if (month != "") setMonth(month.padStart(2, "0"));
      if (day != "") setDay(day.padStart(2, "0"));
      if (year != "") setYear(year);
    }
  }, [value]);

  useEffect(() => {
    if (isSelectAll) {
      setIsSelectAll(false);
      return;
    }
    if (
      isValidDate(day, month, year, minDate, maxDate) &&
      day.length === 2 &&
      month.length === 2 &&
      year.length === 4
    ) {
      if (
        (disableWeekends &&
          isWeekEnd(new Date(year, parseInt(month) - 1, day))) ||
        disabledDates.some((disabledDate) => {
          return (
            usDateFormat(disabledDate) ===
            usDateFormat(new Date(year, parseInt(month) - 1, day))
          );
        }) ||
        (disableBeforeDate &&
          new Date(year, parseInt(month) - 1, day) <
            new Date(disableBeforeDate))
      ) {
        setCurrDate(false);
        return;
      }
      const date = new Date(year, parseInt(month) - 1, day);
      setCurrDate(date);
    } else {
      setCurrDate(false);
    }
  }, [month, day, year]);

  const onApplyClick = () => {
    if (
      isValidDate(day, month, year, minDate, maxDate) &&
      day.length === 2 &&
      month.length === 2 &&
      year.length === 4
    ) {
      if (
        (disableWeekends &&
          isWeekEnd(new Date(year, parseInt(month) - 1, day))) ||
        disabledDates.some((disabledDate) => {
          return (
            disabledDate ===
            usDateFormat(new Date(year, parseInt(month) - 1, day))
          );
        }) ||
        (disableBeforeDate &&
          new Date(year, month - 1, day) < new Date(disableBeforeDate))
      ) {
        setError(true);
        return;
      }
      setError(false);
      const date = new Date(year, month - 1, day);
      if (onDateChange) {
        onDateChange(null);
        setTimeout(() => {
          onDateChange(date);
        }, 100);
      }
    } else {
      setError(true);
    }
  };

  const handleMonthChange = (e) => {
    setIsManual(true);
    let value = e.target.value.slice(0, 2);
    if (!/^\d*$/.test(value)) return;
    if (value === "") {
      setMonth("");
    } else {
      setMonth(value);
    }
    window.setTimeout(() => {
      if (value.length === 2) {
        skipSelectRef.current = true;
        dayRef.current.focus();
        dayRef.current.setSelectionRange(0, 0);
      }
    }, 50);
  };

  const handleDayChange = (e) => {
    setIsManual(true);
    let value = e.target.value.slice(0, 2);
    if (!/^\d*$/.test(value)) return;
    if (value === "") {
      setDay("");
    } else {
      setDay(value);
    }
    window.setTimeout(() => {
      if (value.length === 2) {
        skipSelectRef.current = true;
        yearRef.current.focus();
        yearRef.current.setSelectionRange(0, 0);
      }
    }, 50);
  };

  const handleYearChange = (e) => {
    let value = e.target.value.slice(0, 4);
    if (!/^\d*$/.test(value)) return;
    if (value === "") {
      setYear("");
    } else {
      setYear(value);
    }
  };

  const handleKeyDown = (e, dateField) => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    if (isSelectAll) {
      e.preventDefault();
      if (e.key === "Backspace" || e.key === "Delete") {
        setMonth("");
        setDay("");
        setYear("");
        setIsSelectAll(false);
        skipSelectRef.current = true;
        monthRef.current.focus();
        monthRef.current.setSelectionRange(0, 0);
      } else if (e.key === "ArrowLeft") {
        setIsSelectAll(false);
        skipSelectRef.current = true;
        monthRef.current.focus();
        monthRef.current.setSelectionRange(0, 0);
      } else if (e.key === "ArrowRight") {
        setIsSelectAll(false);
        skipSelectRef.current = true;
        yearRef.current.focus();
        yearRef.current.setSelectionRange(
          yearRef.current.value.length,
          yearRef.current.value.length
        );
      } else if (/^[0-9]$/.test(e.key)) {
        setDay("");
        setYear("");
        setMonth(e.key);
        setIsManual(true);
        setIsSelectAll(false);
        skipSelectRef.current = true;
        monthRef.current.focus();
      }
      return;
    }
    if (e.key.toLowerCase() === "a" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsSelectAll(true);
      return;
    }

    const isDigit = /^[0-9]$/.test(e.key);
    const maxLen = dateField === "year" ? 4 : 2;
    const currentValue = e.target.value;

    if (
      isDigit &&
      start === end &&
      start < maxLen &&
      currentValue.length === maxLen
    ) {
      e.preventDefault();
      const newValue =
        currentValue.slice(0, start) + e.key + currentValue.slice(start + 1);

      if (dateField === "month") {
        setIsManual(true);
        setMonth(newValue);
      } else if (dateField === "day") {
        setIsManual(true);
        setDay(newValue);
      } else {
        setYear(newValue);
      }

      if (start + 1 < maxLen) {
        window.setTimeout(() => {
          e.target.setSelectionRange(start + 1, start + 1);
        }, 0);
      } else {
        const nextRef =
          dateField === "month" ? dayRef : dateField === "day" ? yearRef : null;
        if (nextRef) {
          window.setTimeout(() => {
            skipSelectRef.current = true;
            nextRef.current.focus();
            nextRef.current.setSelectionRange(0, 0);
          }, 0);
        }
      }
      return;
    }
    if (e.key === "Backspace" && start !== end) {
      e.preventDefault();
      setIsManual(true);
      if (dateField === "month") {
        setMonth((prev) => prev.slice(0, start) + prev.slice(end));
      } else if (dateField === "day") {
        setDay((prev) => prev.slice(0, start) + prev.slice(end));
      } else if (dateField === "year") {
        setYear((prev) => prev.slice(0, start) + prev.slice(end));
      }
    } else if (e.key === "Backspace" && start === 0) {
      e.preventDefault();
      setIsManual(true);
      if (dateField === "day") {
        setMonth((prev) => prev.slice(0, -1));
        skipSelectRef.current = true;
        window.setTimeout(() => {
          monthRef.current.focus();
          const len = monthRef.current.value.length;
          monthRef.current.setSelectionRange(len, len);
        }, 0);
      } else if (dateField === "year") {
        setDay((prev) => prev.slice(0, -1));
        skipSelectRef.current = true;
        window.setTimeout(() => {
          dayRef.current.focus();
          const len = dayRef.current.value.length;
          dayRef.current.setSelectionRange(len, len);
        }, 0);
      }
    } else if (
      e.key === "Delete" &&
      dateField !== "year" &&
      (e.target.selectionStart === 2 || e.target.value.length === 0)
    ) {
      e.preventDefault();
      setIsManual(true);
      const focusStart = (ref) => {
        skipSelectRef.current = true;
        window.setTimeout(() => {
          ref.current.focus();
          ref.current.setSelectionRange(0, 0);
        }, 0);
      };
      if (dateField === "month") {
        if (day.length !== 0) {
          setDay((prev) => prev.slice(1));
          focusStart(dayRef);
        } else if (year.length !== 0) {
          setYear((prev) => prev.slice(1));
          focusStart(yearRef);
        }
      } else if (dateField === "day") {
        if (year.length !== 0) {
          setYear((prev) => prev.slice(1));
          focusStart(yearRef);
        }
      }
    } else if (
      e.key === "ArrowRight" &&
      (e.target.selectionStart === 2 ||
        monthRef.current.value.length === 0 ||
        dayRef.current.value.length === 0)
    ) {
      if (
        dateField === "month" &&
        (e.target.selectionStart === 2 || monthRef.current.value.length === 0)
      ) {
        e.preventDefault();
        skipSelectRef.current = true;
        dayRef.current.focus();
        dayRef.current.setSelectionRange(0, 0);
      } else if (
        dateField === "day" &&
        (e.target.selectionStart === 2 || dayRef.current.value.length === 0)
      ) {
        e.preventDefault();
        skipSelectRef.current = true;
        yearRef.current.focus();
        yearRef.current.setSelectionRange(0, 0);
      }
    } else if (e.key === "ArrowLeft" && e.target.selectionStart === 0) {
      e.preventDefault();
      skipSelectRef.current = true;
      if (dateField === "day") {
        monthRef.current.focus();
        monthRef.current.setSelectionRange(
          monthRef.current.value.length,
          monthRef.current.value.length
        );
      } else if (dateField === "year") {
        dayRef.current.focus();
        dayRef.current.setSelectionRange(
          dayRef.current.value.length,
          dayRef.current.value.length
        );
      } else {
        allowOnlyNumbers(e);
      }
    }
  };

  const handleMonthKeyDown = (e) => {
    handleKeyDown(e, "month");
  };

  const handleDayKeyDown = (e) => {
    handleKeyDown(e, "day");
  };

  const handleyearKeyDown = (e) => {
    handleKeyDown(e, "year");
  };

  const handleFormatMonthNumber = (e) => {
    if (month.length === 1 && isManual) {
      setMonth(`0${month}`);
    }
  };

  const handleFormatDayNumber = (e) => {
    if (day.length == 1 && isManual) {
      setDay(`0${day}`);
    }
  };

  const clearSelection = () => {
    if (isSelectAll) {
      setIsSelectAll(false);
    }
  };

  const skipSelectRef = useRef(false);
  const mouseDownFieldRef = useRef(null);

  const handleMouseDown = (e) => {
    mouseDownFieldRef.current = e.currentTarget;
  };

  const handleContainerMouseUp = (e) => {
    const downField = mouseDownFieldRef.current;
    mouseDownFieldRef.current = null;
    const fields = [monthRef.current, dayRef.current, yearRef.current];
    const selection = window.getSelection();

    const releasedOnOtherField =
      fields.includes(downField) &&
      fields.includes(e.target) &&
      downField !== e.target;
    const spannedSeparator = !!selection && selection.toString().includes("/");
    if (releasedOnOtherField || spannedSeparator) {
      if (selection) selection.removeAllRanges();
      setIsSelectAll(true);
      skipSelectRef.current = true;
      window.setTimeout(() => {
        if (monthRef.current) monthRef.current.focus();
      }, 0);
    }
  };

  const handleContainerBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsSelectAll(false);
    }
  };

  const handleFieldFocus = (e) => {
    if (skipSelectRef.current) {
      skipSelectRef.current = false;
      return;
    }
    clearSelection();

    if (mouseDownFieldRef.current) {
      return;
    }
    const target = e.target;
    window.setTimeout(() => {
      target.select();
    }, 0);
  };

  return (
    <>
      <div className="bb-1px-solid-neutral-border-strong d-flex py-2 px-3 align-items-center justify-content-between">
        <div className="core-body-text-large-bold-s">Select date</div>
        <Button
          variant="primary"
          className="py-1 dif-apply-btn"
          onClick={onApplyClick}
        >
          Apply
        </Button>
      </div>
      <div className="w-100 px-3 my-2">
        <div className="core-body-text-regular-semi-bold-sl">Enter date</div>
        <div
          className="date-input-border"
          onMouseUp={handleContainerMouseUp}
          onBlur={handleContainerBlur}
        >
          <input
            type="text"
            id="month"
            value={month.length === 1 && !isManual ? `0${month}` : month}
            onChange={handleMonthChange}
            onKeyDown={handleMonthKeyDown}
            onBlur={handleFormatMonthNumber}
            onFocus={handleFieldFocus}
            onMouseDown={handleMouseDown}
            ref={monthRef}
            autoComplete="off"
            placeholder="MM"
            style={{
              width: month != "" ? "40px" : "60px",
              textAlign: "center",
              padding: "0px",
            }}
            className={`core-heading-2 date-input-field ${
              isSelectAll ? styles.selected : ""
            }`}
          />
          <span
            className={`core-heading-2 ${
              !(day || month || year) && "disabled-text-color"
            }`}
          >
            /
          </span>
          <input
            type="text"
            id="day"
            value={day.length === 1 && !isManual ? `0${day}` : day}
            onChange={handleDayChange}
            onKeyDown={handleDayKeyDown}
            onBlur={handleFormatDayNumber}
            ref={dayRef}
            onFocus={handleFieldFocus}
            onMouseDown={handleMouseDown}
            autoComplete="off"
            placeholder="DD"
            style={{
              width: day != "" ? "40px" : "50px",
              textAlign: "center",
              padding: "0px",
            }}
            className={`core-heading-2 date-input-field ${
              isSelectAll ? styles.selected : ""
            }`}
          />
          <span
            className={`core-heading-2 ${
              !(day || month || year) && "disabled-text-color"
            }`}
          >
            /
          </span>
          <input
            type="text"
            id="year"
            maxLength={4}
            value={year}
            onChange={handleYearChange}
            onKeyDown={handleyearKeyDown}
            ref={yearRef}
            onFocus={handleFieldFocus}
            onMouseDown={handleMouseDown}
            autoComplete="off"
            placeholder="YYYY"
            className={`${
              styles["w-80px-p-0px-p-l-5px"]
            } core-heading-2 date-input-field ${
              isSelectAll ? styles.selected : ""
            }`}
          />
        </div>
      </div>
      {error != "" && (
        <div className="px-3 my-2 core-body-text-regular-semi-bold-red">
          <FontAwesomeIcon icon={faExclamationTriangle} /> Invalid date
        </div>
      )}
    </>
  );
};

export default DateInputField;
