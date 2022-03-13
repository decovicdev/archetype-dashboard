import { useState } from "react";
import { Calendar } from "react-date-range";
import Image from "next/image";

import classnames from "classnames";
import CalenderIcon from "./../../public/icons/calendar.svg";

const Component = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const openCalender = () => setIsOpen(!isOpen);

  const getNextDay = () => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    setDate(nextDay);
  };

  const getPrevDay = () => {
    const prevDay = new Date(date);
    prevDay.setDate(date.getDate() - 1);
    setDate(prevDay);
  };

  const CalenderPreview = ({ className }) => (
    <Calendar
      color="#E545E7"
      className={classnames("calendar", className)}
      date={date}
      showPreview={false}
      showDateDisplay={false}
      showMonthAndYearPickers={false}
      dateDisplayFormat="dd MMMM yyyy"
      onChange={setDate}
      // navigatorRenderer={renderNavigation} // this for days navigation part
    />
  );

  return (
    <div className={classnames("calendarWrapper")}>
      <div>
        <div className="datePreview">
          <a className="arrow" onClick={getPrevDay}>
            <i className="prev-arrow"></i>
          </a>
          <span>{date.toDateString()}</span>
          <a className="arrow" onClick={getNextDay}>
            <i className="next-arrow"></i>
          </a>
        </div>
        <a className={classnames("calenderBtn", { active: isOpen })}>
          <Image
            src={CalenderIcon}
            width={15}
            height={17}
            onClick={openCalender}
            alt="Open calendar"
          />
        </a>
      </div>
      {isOpen && <CalenderPreview className="preview" />}
    </div>
  );
};

export default Component;
