import { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import React, { useState, useRef } from "react";
import registerInputFiled from "@/data/registerInputField.json";
import InputField from "@/components/InputField/InputField";
import { useForm } from "react-hook-form";
import SubmitBtn from "@/components/InputField/SubmitBtn";
import Link from "next/link";
import { useRegisterMutation } from "@/features/auth/authApi";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type UserType = {
  requestId?: undefined;
  data?: {
    isAuthintication: Boolean;
    data: {};
    message: String;
    token: String;
  };
  error?: { data: { message: String } };
  isLoading: Boolean;
  isError: Boolean;
};
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, { data, isLoading, isError, error }] =
    useRegisterMutation<UserType>({});
  const {
    register: registerUser,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data || isError) {
      if (isError) toast.error(error?.data?.message);
      else {
        toast.success(data?.message);
        router.push("/");
      }
    }
  }, [data, isLoading, isError, error, dispatch, router]);

  const submit = (user: any) => {
    register({ ...user, role: "User" });
  };

  return (
    <>
      <Layout>
        <div className="shadow-md p-10 w-full mx-auto max-w-[500px] my-40">
          <h1 className="py-5 text font-semibold text-xl uppercase">
            Register
          </h1>
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              {registerInputFiled.map((inputField) => (
                <InputField
                  errors={errors}
                  error={errors[inputField.name]}
                  key={inputField.id}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  register={registerUser}
                  {...inputField}
                  watch={watch}
                />
              ))}
              <SubmitBtn
                disabled={isLoading}
                value={isLoading ? "Loading..." : "Register"}
              />
            </div>
          </form>
          <p className="text-sm  text-center">
            Already have an account?
            <Link className=" text-blue-800" href={`/login`}>
              &nbsp;Log in.
            </Link>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Register;


