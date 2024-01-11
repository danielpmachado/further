import { RefundRequest } from "../../types/request";

import { isValidRefund } from "../../helpers/refund";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

import "./style.css";

interface RefundsTableProps {
  data: RefundRequest[];
}

const RefundsTable = ({ data }: RefundsTableProps) => {
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: RefundRequest, index: number) => (
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

export default RefundsTable;
