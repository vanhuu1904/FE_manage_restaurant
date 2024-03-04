import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const userGroupId = user.groupId;

  if (isAdminRoute && +userGroupId === 3) {
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
