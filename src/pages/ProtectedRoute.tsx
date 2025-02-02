import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthorized = true;
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/tests"); // Redirect to home if not authorized
    }
  }, [isAuthorized, navigate]);

  return <>{isAuthorized ? children : null}</>;
}

export default ProtectedRoute;
