import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai";
import DashboardBlog from "@/components/Blog/DashboardBlog";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import InputField from "@/components/InputField/InputField";
import { useForm } from "react-hook-form";
import { useUpdateMutation } from "@/features/auth/authApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect } from "react";
import InputFiledData from "../../../data/editProfileInputField.json";
import SubmitBtn from "@/components/InputField/SubmitBtn";
import { useState } from "react";
import ProfileImage from "@/components/Profile/ProfileImage";

const Profile = () => {
  const { name, email, bio, address, website, github }: any =
    useSelector((state: any) => state?.auth?.user) || {};
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState<any>(null);
  const [editMutation, { isLoading, isError, error, isSuccess }] =
    useUpdateMutation();
  const router = useRouter();

  useEffect(() => {
    if (image) {
      setUrl(URL.createObjectURL(image));
    }
  }, [image]);

  useEffect(() => {
    if (isSuccess) {
      router.push(`/user/${router?.query?.userId}`);
    }
  }, [isSuccess, router]);
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { name, email },
  });

  useEffect(() => {
    reset({ name, email, bio, address, website, github });
  }, [name, email, bio, address, website, github, reset]);

  const submit = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (element) {
          formData.append(key, element);
        }
      }
    }
    formData.append("url", image);
    editMutation(formData);
  };
  return (
    <PrivateRoute>
      <Layout>
        <form onSubmit={handleSubmit(submit)}>
          <div className="card">
            <ProfileImage setImage={setImage} url={url} />
          </div>
          <div className="card">
            <div className="flex flex-wrap -mx-3 mb-6">
              {InputFiledData.map((inputField) => (
                <InputField
                  errors={errors}
                  error={errors[inputField.name]}
                  key={inputField.id}
                  {...register(inputField.name, { required: true })}
                  register={register}
                  {...inputField}
                  watch={watch}
                />
              ))}
              <SubmitBtn
                value={isLoading ? "Loading..." : "Update"}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </Layout>
    </PrivateRoute>
  );
};

export default Profile;
