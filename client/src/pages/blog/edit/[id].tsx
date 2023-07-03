import UpdateBlog from "@/components/Editor/UpdateBlog";
import Layout from "@/components/Layout/Layout";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import React, { useState } from "react";

export default function Edit() {
  return (
    <>
      <PrivateRoute>
        <Layout>
          <div className="container">
            <h1 className=" text-2xl font-bold my-6">Create Blog</h1>
            <UpdateBlog />
          </div>
        </Layout>
      </PrivateRoute>
    </>
  );
}
