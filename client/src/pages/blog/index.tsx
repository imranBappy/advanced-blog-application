import React, { useState } from "react";

import Editor from "@/components/Editor/Editor";
import Layout from "@/components/Layout/Layout";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
export default function Index() {
  const [value, setValue] = useState("");
  return (
    <>
      <PrivateRoute>
        <Layout>
          <div className="container">
            <h1 className=" text-2xl font-bold my-6">Create Blog</h1>
            <Editor />
          </div>
        </Layout>
      </PrivateRoute>
    </>
  );
}
