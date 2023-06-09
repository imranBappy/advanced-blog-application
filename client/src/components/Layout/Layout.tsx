import { useEffect } from "react";
import Head from "next/head";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout(props: any) {
  const { children } = props;
  // console.log(children.props.id); //index-page

  return (
    <>
      <Head>
        <title>Blog Website</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className=" mt-20">{children}</main>
      {/* {children?.props?.id !== "index-page" ? <Footer /> : null} */}
    </>
  );
}
