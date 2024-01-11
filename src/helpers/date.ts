import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Location } from "../types/request";

dayjs.extend(customParseFormat);

export const formatDate = (location: Location, date: string, time?: string) => {
  let fullDate = date;
  let dateFormat = location === "US" ? "M/D/YYYY" : "D/M/YYYY";

  if (time) {
    dateFormat += " HH:mm";
    fullDate += ` ${time}`;
  }

  return dayjs(fullDate, dateFormat);
};

export const isOldTOS = (dayjsObject: dayjs.Dayjs) => {
  const oldTOS = dayjs("01/02/2020", "MM/DD/YYYY");  // New Terms of Service were introduced on Jan 2nd 2020

  return dayjsObject.isBefore(oldTOS);
};


