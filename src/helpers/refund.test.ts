import { expect, describe, it } from 'vitest'

import { getHourTimeLimit, isValidRefund } from './refund'; 
import { RefundRequest } from "../types/request";


describe("getHourTimeLimit", () => {
  it("returns 4 hours for phone requests with old TOS", () => {
    const result = getHourTimeLimit("phone", true);
    expect(result).toBe(4);
  });

  it("returns 8 hours for phone requests with new TOS", () => {
    const result = getHourTimeLimit("phone", false);
    expect(result).toBe(8);
  });

  it("returns 8 hours for non-phone requests with old TOS", () => {
    const result = getHourTimeLimit("web app", true);
    expect(result).toBe(8);
  });

  it("returns 16 hours for non-phone requests with new TOS", () => {
    const result = getHourTimeLimit("web app", false);
    expect(result).toBe(16);
  });
});

describe("isValidRefund", () => {
  it("returns true for a valid refund request", () => {
    const investment: RefundRequest = {
      name: "Emma Smith",
      customerLocation: "US",
      signUpDate: "1/2/2020",
      requestSource: "phone",
      investmentDate: "1/2/2021",
      investmentTime: "06:00",
      refundRequestDate: "1/2/2021",
      refundRequestTime: "09:00",
    };

    const result = isValidRefund(investment);
    expect(result).toBe(true);
  });

  it("returns false for an invalid refund request", () => {
    const investment: RefundRequest = {
      name: "Emma Smith",
      customerLocation: "US",
      signUpDate: "1/2/2020",
      requestSource: "phone",
      investmentDate: "1/2/2021",
      investmentTime: "06:00",
      refundRequestDate: "1/2/2021",
      refundRequestTime: "20:00",
    };

    const result = isValidRefund(investment);
    expect(result).toBe(false);
  });
});


