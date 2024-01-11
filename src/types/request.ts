export type Location = "US" | "Europe";

export type RequestSource = "phone" | "web app";

export interface RefundRequest {
  name: string;
  customerLocation: Location;
  signUpDate: string;
  requestSource: RequestSource;
  investmentDate: string;
  investmentTime: string;
  refundRequestDate: string;
  refundRequestTime: string;
}
