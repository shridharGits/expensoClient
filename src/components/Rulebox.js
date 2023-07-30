import React from "react";

const Rulebox = ({ needs, wants, saving }) => {
  const boxSetup = [
    { title: "NEEDS", color: "bg-yellow-300", value: needs },
    { title: "WANTS", color: "bg-red-400", value: wants },
    { title: "SAVING", color: "bg-green-300", value: saving },
  ];
  const Box = boxSetup.map((item) => {
    const cssForHigherValue = `pt-2`;
    const cssForNormalValue = `ml-2 mr-2 justify-between`;
    return (
      <div
        className={`flex w-full flex-col pt-1 pl-2 pr-2 h-16 mt-2 items-center font-semibold justify-center rounded-lg ${
          needs > 10000 || wants > 10000 || saving > 10000
            ? cssForHigherValue
            : cssForNormalValue
        } ${item.color}`}
        key={item.title}>
        <p className="h-1/3 text-lg">₹ {item.value}</p>
        <p className="h-1/3 text-sm opacity-60 font-bold">{item.title}</p>
      </div>
    );
  });
  return (
    <div
      className={`flex ${
        needs > 10000 || wants > 10000 || saving > 10000
          ? "flex-col"
          : "flex-row"
      } justify-between`}>
      {Box}
    </div>
  );
};

export default Rulebox;
