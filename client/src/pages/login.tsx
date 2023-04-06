import Layout from "@/components/Layout/Layout";
import React, { useState, useRef, useEffect } from "react";
import registerInputFiled from "@/data/loginInputField.json";
import InputField from "@/components/InputField/InputField";
import { useForm } from "react-hook-form";
import SubmitBtn from "@/components/InputField/SubmitBtn";
import Link from "next/link";
import { useLoginMutation } from "@/features/auth/authApi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
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
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { data, isLoading, isError, error }] =
    useLoginMutation<UserType>();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (data || isError) {
      if (isError) toast.error(error?.data?.message);
      else {
        toast.success("Successfully Logedin!");
        router.push("/");
      }
    }
  }, [data, isLoading, isError, error, router]);

  const submit = (data: any) => {
    login(data);
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
                  {...register(inputField.name, { required: true })}
                  register={register}
                  {...inputField}
                  watch={watch}
                />
              ))}
              <SubmitBtn value="Login" />
            </div>
          </form>

          <p className="text-sm  text-center text-blue-800">
            <Link href={`/forgot`}>I forgot my password</Link>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Login;
