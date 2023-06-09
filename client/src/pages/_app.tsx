import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../app/store";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <>
        <ToastContainer position="bottom-right" />
        <Component {...pageProps} />
      </>
    </Provider>
  );
}
