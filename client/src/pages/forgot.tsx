import InputField from "@/components/InputField/InputField";
import SubmitBtn from "@/components/InputField/SubmitBtn";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Forgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <Layout>
        <div className="shadow-md p-10 w-full mx-auto max-w-[500px] my-40">
          <h1 className="py-5 text font-semibold text-xl ">
            Forgot your password?
          </h1>
          <p className="text-md my-4">
            If the account exists, we&sbquo;ll email you instructions to reset
            the password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <InputField
                error={errors.email}
                name="email"
                label="Email"
                type="email"
                placeholder="john@gmail.com"
                required="Email Address is required"
                register={register}
              />
              <SubmitBtn value="Reset password" />
            </div>
          </form>
          <p className="text-sm  text-center text-blue-800">
            <Link href={`/login`}>Return to login</Link>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Forgot;
