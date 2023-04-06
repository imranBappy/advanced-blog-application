import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Editor from "../Editor/UpdateBlog";

const Create = () => {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <>
      <Layout>
        <div className="container">
          <Editor state={[value, setValue]} />
        </div>
      </Layout>
    </>
  );
};

export default Create;
