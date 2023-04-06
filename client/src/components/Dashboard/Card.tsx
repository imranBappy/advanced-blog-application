import React from "react";

const Card = (props: any) => {
  const { title, value } = props;
  return (
    <div className=" flex-grow shadow-xl ring-1 ring-gray-400 p-5 rounded basis-[300px]">
      <h6 className=" font-bold text-4xl">{value}</h6>
      <p className="mt-4 text-gray-700 ">{title}</p>
    </div>
  );
};

export default Card;
