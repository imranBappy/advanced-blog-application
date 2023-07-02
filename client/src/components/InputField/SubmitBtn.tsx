import React from "react";

type Props = {
  value: string;
  disabled: boolean;
};

const SubmitBtn = (props: Props) => {
  return (
    <div className="w-full px-3 mb-6 md:mb-0 mt-3 cursor-pointer">
      <input
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  );
};

export default SubmitBtn;
