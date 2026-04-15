import React from "react";

const SMASummaryReport = () => {
  const headers = [
    {
      displayName: "ALLOCATION DURING THE MONTH",
      children: [
        { displayName: "PARTICULARS", field: "particular" },
        { displayName: "NO_OF_A_C_ALLOC", field: "noOfAlloc" },
        { displayName: "AMT_ALLOC", field: "amtAlloc" },
      ],
    },
    {
      displayName: "RESOLUTION DURING THE MONTH",
      children: [
        { displayName: "NO_OF_A_C_RESO", field: "noOfAcreso" },
        { displayName: "AMT_RESO", field: "amtReso" },
        { displayName: "PERCENT_RESO", field: "percentReso" },
      ],
    },
    {
      displayName: "PARTIAL PAID DURING THE MONTH",
      children: [
        { displayName: "NO_OF_A_C_PP", field: "noAcpp" },
        { displayName: "AMT_PP", field: "amtPp" },
        { displayName: "PP_PERCENT", field: "ppPercent" },
      ],
    },
    {
      displayName: "MOVED TO SMA2",
      children: [
        { displayName: "NO_OF_A_C_SMA2", field: "noSma2" },
        { displayName: "AMT_SMA2", field: "amtSma2" },
      ],
    },
    {
      displayName: "MOVED TO SMA1",
      children: [
        { displayName: "NO_OF_A_C_SMA1", field: "noSma1" },
        { displayName: "AMT_SMA1", field: "amtSma1" },
      ],
    },
    {
      displayName: "MOVED TO SMA0",
      children: [
        { displayName: "NO_OF_A_C_SMA0", field: "noSma0" },
        { displayName: "AMT_SMA0", field: "amtSma0" },
      ],
    },
    {
      displayName: "MOVED TO STANDARD ASSET",
      children: [
        { displayName: "NO_OF_A_C_STDASSET", field: "noStdasset" },
        { displayName: "AMT_STDASSET", field: "amtStdasset" },
      ],
    },
    {
      displayName: "SLIPPED TO NPA",
      children: [
        { displayName: "NO_OF_A_C_NPA", field: "noOfNpa" },
        { displayName: "AMT_NPA", field: "amtNpa" },
      ],
    },
  ];
  return <div></div>;
};

export default SMASummaryReport;
