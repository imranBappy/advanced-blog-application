import useAuth from "@/hooks/useAuth";
import useAuthCheck from "@/hooks/useAuthCheck";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const PrivateRoute: React.FunctionComponent<any> = (
  props
): ReactElement | any => {
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
