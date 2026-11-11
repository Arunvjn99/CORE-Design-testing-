import React, { useEffect, useMemo } from "react";
import DatePicker from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";
import { getSingleCharDayName, isWeekEnd, usDateFormat } from "@/utils/helpers";
import DateInputField from "../DateInputField/DateInputField";
import { useState } from "react";

const CsplDatePicker = ({
  onDayClick,
  value,
  isDay = false,
  minDate,
  maxDate,
  disableBeforeDate,
  disableWeekends = false,
  disabledDates = [],
  ...props
}) => {
  const [currDate, setCurrDate] = useState(value);
  const [key, setKey] = useState(0);

  const datepickerinput = useMemo(
    () => (
      <DateInputField
        onDateChange={(date) => onDayClick(date)}
        value={currDate}
        setCurrDate={setCurrDate}
        minDate={minDate}
        maxDate={maxDate}
        disableBeforeDate={disableBeforeDate}
        disableWeekends={disableWeekends}
        disabledDates={disabledDates}
      />
    ),
    [currDate]
  );

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [currDate]);

  return (
    <div className="date-picker-container">
      {!isDay && datepickerinput}
      <DatePicker
        key={key}
        isOpen
        showNeighboringMonth={false}
        shouldCloseOnSelect={false}
        onChange={(value) => {
          if (isDay) {
            onDayClick(value);
          }
          setCurrDate(value);
        }}
        formatShortWeekday={(val, date) => {
          const dayName = date.getDay();
          return getSingleCharDayName(dayName);
        }}
        value={
          currDate == false ? null : currDate ? new Date(currDate) : new Date()
        }
        minDetail="decade"
        prev2Label={null}
        tileClassName="date-picker-tile"
        next2Label={null}
        prevLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        minDate={minDate}
        maxDate={maxDate}
        tileDisabled={({ date }) => {
          return (
            (isWeekEnd(date) && disableWeekends) ||
            disabledDates.some((disabledDate) => {
              return usDateFormat(disabledDate) === usDateFormat(date);
            }) ||
            (disableBeforeDate && date < new Date(disableBeforeDate))
          );
        }}
        {...props}
      />
    </div>
  );
};

export default CsplDatePicker;
