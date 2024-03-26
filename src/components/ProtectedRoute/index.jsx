import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";
import { useEffect } from "react";

const RoleBaseRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account);
  console.log(">>>check user: ", user);
  const userGroupId = user.groupWithRoles.id;
  useEffect(() => {
    console.log(
      ">>>check href : ",
      window.location.pathname.includes("/admin")
    );
  }, [window.location.pathname]);
  if (window.location.pathname.includes("/admin") && +userGroupId === 3) {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to="/auth/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
