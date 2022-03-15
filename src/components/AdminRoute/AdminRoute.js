import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import CheckToken from "../../hooks/CheckToken";

function AdminRoute({ children }) {
	const { checkJwtToken } = CheckToken();
	const location = useLocation();
	const user = useSelector((state) => state.user);

	if (checkJwtToken() && (user.username==='blentell')) {
		return children;
	} else {
		return <Navigate to="/" state={{ from: location }} />;
	}
}

export default AdminRoute;
