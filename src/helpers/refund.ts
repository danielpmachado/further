import { formatDate, isOldTOS } from "./date";
import { RefundRequest, RequestSource } from "../types/request";

export const getHourTimeLimit = (requestSource: RequestSource, isOldTOS: boolean) => {
  if (requestSource === "phone") {
    return isOldTOS ? 4 : 8;
  } else {
    return isOldTOS ? 8 : 16; 
  }
};

export const isValidRefund = (investment: RefundRequest) => {
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
