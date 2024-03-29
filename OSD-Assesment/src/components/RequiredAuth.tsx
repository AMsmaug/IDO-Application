import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

type propsType = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: propsType) => {
  if (!Cookies.get(`token`)) {
    return <Navigate to={`/login`} />;
  } else {
    return children;
  }
};
