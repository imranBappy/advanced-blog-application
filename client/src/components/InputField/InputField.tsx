import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const InputField = (props: any) => {
  const {
    showPassword,
    id,
    setShowPassword,
    label,
    type,
    name,
    required,
    register,
    error,
    watch,
    ...rest
  } = props;
  if (type === "password") {
    return (
      <div className="w-full px-3 mt-2 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-first-name"
        >
          Password
        </label>
        <div className="flex items-center flex-grow mb-3">
          <div className=" flex-shrink flex-1">
            {name === "password" ? (
              <input
                className="appearance-none rounded-r-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={showPassword ? "text" : "password"}
                name={name}
                {...rest}
                {...register(name, { required: required })}
              />
            ) : (
              <input
                className="appearance-none rounded-r-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={showPassword ? "text" : "password"}
                name={name}
                {...rest}
                {...register(name, {
                  validate: (value: any) =>
                    watch("password") === value || "The passwords do not match",
                })}
              />
            )}
          </div>
          <div className=" rounded-lg w-9 flex items-center justify-center  rounded-l-none border border-l-0 h-[46px] bg-gray-200">
            {!showPassword ? (
              <AiFillEye
                onClick={() => setShowPassword(true)}
                className="cursor-pointer"
              />
            ) : (
              <AiFillEyeInvisible
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-xs italic">{error.message}</p>
        )}
      </div>
    );
  }
  return (
    <div className="w-full px-3 mt-2 md:mb-0">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        name={name}
        type={type}
        {...rest}
        {...register(name, { required: required })}
      />
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  );
};

export default InputField;
