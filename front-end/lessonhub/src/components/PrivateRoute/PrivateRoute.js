/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

/**
 * THE SOURCE CODE FOR THIS PORTION WAS REFERENCED FROM THIS ARTICLE:
 * ALL CREDIT GOES TO CREATOR
 * https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/
 */

import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const PrivateRoute = () => {
 
 // Fetching the user from the user context.
 const { user } = useContext(UserContext);
 const location = useLocation();
 const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;
 
 // If the user is not logged in we are redirecting them
 // to the login page. Otherwise we are letting them to
 // continue to the page as per the URL using <Outlet />.
 return !user ? <Navigate to={redirectLoginUrl} /> : <Outlet /> ;
}
 
export default PrivateRoute;