import dayjs from "dayjs";

const formatDate = (location: string, date: string, time?: string) => {
  const fullDate = date + " " + time;

  let dateFormat = location === "US" ? "MM/DD/YYYY" : "D/MM/YYYY";

  if (time) {
    dateFormat += " HH:mm";
  }

  return dayjs(fullDate, { format: dateFormat });
};

export default formatDate;
