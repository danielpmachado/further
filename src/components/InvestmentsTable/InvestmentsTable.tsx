import { Investment } from "./data";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const formatDate = (location: string, date: string, time?: string) => {
  const fullDate = date + " " + time;

  let dateFormat = location === "US" ? "MM/DD/YYYY" : "D/MM/YYYY";

  if (time) {
    dateFormat += " HH:mm";
  }

  console.log(dateFormat);

  return dayjs(fullDate, dateFormat);
};

const isOldTOS = (dayjsObject: dayjs.Dayjs) => {
  // New Terms of Service were introduced on Jan 2nd 2020
  const oldTOS = dayjs("01/02/2020", "MM/DD/YYYY");

  return dayjsObject.isBefore(oldTOS);
};

const getHourTimeLimit = (requestSource: string, isOldTOS: boolean) => {
  if (requestSource === "phone") {
    return isOldTOS ? 4 : 8;
  } else {
    return isOldTOS ? 8 : 16;
  }
};

const isValidRefund = (investment: Investment) => {
  const {
    signUpDate,
    investmentDate,
    investmentTime,
    customerLocation,
    refundRequestDate,
    refundRequestTime,
    requestSource,
  } = investment;

  const signupDate = formatDate(customerLocation, signUpDate);

  const investmentDateFormat = formatDate(
    customerLocation,
    investmentDate,
    investmentTime
  );

  const requestDate = formatDate(
    customerLocation,
    refundRequestDate,
    refundRequestTime
  );

  const hourTimeLimit = getHourTimeLimit(requestSource, isOldTOS(signupDate));
  const hoursDifference = requestDate.diff(investmentDateFormat, "hour");

  if (hoursDifference < hourTimeLimit) {
    return true;
  }

  return false;
};

interface InvestmentTableProps {
  data: Investment[];
}

const InvestmentTable = ({ data }: InvestmentTableProps) => {
  const myDate = formatDate("Europe", "02/06/2022", "01:00");

  console.log(myDate);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Customer Location</th>
            <th>Sign up date</th>
            <th>Request Source</th>
            <th>Investment Date</th>
            <th>Investment Time</th>
            <th>Refund Request Date</th>
            <th>Refund Request Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: Investment, index: number) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
              <td> {isValidRefund(row) ? "Approve" : "Decline"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5>Customers' reversal requests.</h5>
    </div>
  );
};

export default InvestmentTable;
