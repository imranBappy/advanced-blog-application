import DashboardBlog from "@/components/Blog/DashboardBlog";
import Card from "@/components/Dashboard/Card";
import Layout from "@/components/Layout/Layout";
import Post from "@/components/Post/Post";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <PrivateRoute>
        <Layout>
          <div className=" container">
            <h1 className="font-bold text-3xl py-3">Dashboard</h1>
            <div className=" flex flex-wrap justify-between gap-5 flex-shrink my-5">
              <Card title="Total post reactions" value="0" />
              <Card title="Total post reactions" value="0" />
              <Card title="Total post reactions" value="0" />
            </div>
            <DashboardBlog />
          </div>
        </Layout>
      </PrivateRoute>
    </>
  );
};

export default Dashboard;
