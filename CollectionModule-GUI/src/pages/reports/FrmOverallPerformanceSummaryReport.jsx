import React, { useState } from "react";

const FrmOverallPerformanceSummaryReport = () => {
  const headers = [
    {
      displayName: "In Count",
      children: [
        { displayName: "Zone", field: "zone" },
        { displayName: "Allocation", field: "allocation" },
        { displayName: "Weightage", field: "weightage" },
        { displayName: "Paid", field: "paid" },
        { displayName: "Paid (%)", field: "paidPercent" },
        { displayName: "Fully Paid", field: "fullyPaid" },
        { displayName: "Fully Paid (%)", field: "fullyPaidPercent" },
        { displayName: "Partial Paid", field: "partialPaid" },
        { displayName: "Partial Paid (%)", field: "partialPaidPercent" },
        { displayName: "Unpaid", field: "unpaid" },
        { displayName: "Unpaid (%)", field: "unpaidPercent" },
        { displayName: "NPA", field: "npa" },
        { displayName: "NPA (%)", field: "npaPercent" },
      ],
    },
    {
      displayName: "In Value",
      children: [
        { displayName: "Allocation", field: "valueAllocation" },
        { displayName: "Weightage", field: "valueWeightage" },
        { displayName: "Paid", field: "valuePaid" },
        { displayName: "Paid(%)", field: "valuePaidPercent" },
        { displayName: "Fully Paid", field: "valueFullyPaid" },
        { displayName: "Full Paid(%)", field: "valueFullyPaidPercent" },
        { displayName: "Partial Paid", field: "valuePartialPaid" },
        { displayName: "Partial Paid (%)", field: "valuePartialPaidPercent" },
        { displayName: "Unpaid", field: "valueUnpaid" },
        { displayName: "Unpaid(%)", field: "valueUnpaidPercent" },
        { displayName: "NPA", field: "valueNpa" },
        { displayName: "NPA(%)", field: "valueNpaPercent" },
      ],
    },
  ];
  const [tableData, setTableData] = useState([]);
  return <div></div>;
};

export default FrmOverallPerformanceSummaryReport;
