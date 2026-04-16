import React from "react";

const DashboardHeading = ({
  heading,
  slogan,
}: {
  heading: string;
  slogan: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-700 font-semibold text-2xl">{heading}</h1>
      <p>{slogan}</p>
    </div>
  );
};

export default DashboardHeading;
