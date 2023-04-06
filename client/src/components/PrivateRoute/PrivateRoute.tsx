import useAuth from "@/hooks/useAuth";
import useAuthCheck from "@/hooks/useAuthCheck";
import { useRouter } from "next/router";
import React from "react";

const PrivateRoute = (props: any) => {
  const { children } = props;
  const isAuthintication = useAuth();
  const router = useRouter();
  const check = useAuthCheck();

  if (!check) {
    return <div>Loading</div>;
  } else if (isAuthintication) {
    return <>{children}</>;
  }
  router.push("/login");
};

export default PrivateRoute;
