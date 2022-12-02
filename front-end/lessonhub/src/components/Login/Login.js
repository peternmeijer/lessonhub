/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

/**
 * THE SOURCE CODE FOR THIS PORTION WAS REFERENCED FROM THIS ARTICLE:
 * ALL CREDIT GOES TO CREATOR
 * https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/
 */
import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import logo from '../../assets/logo-color.png'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // We are consuming our user-management context to
  // get & set the user details here
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  // We are using React's "useState" hook to keep track
  //  of the form values.
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  // This function will be called whenever the user edits the form.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // This function will redirect the user to the
  // appropriate page once the authentication is done.
  const redirectNow = () => {

    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/about");
  }

  // Once a user logs in to our app, we don’t want to ask them for their
  // credentials again every time the user refreshes or revisits our app, 
  // so we are checking if the user is already logged in and
  // if so we are redirecting the user to the home page.
  // Otherwise we will do nothing and let the user to login.
  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {

        // Redirecting them once fetched.
        redirectNow();
      }
    }
  }

  // This useEffect will run only once when the component is mounted.
  // Hence this is helping us in verifying whether the user is already logged in
  // or not.
  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function gets fired when the user clicks on the "Login" button.
  const onSubmit = async (event) => {
    try {
      // Here we are passing user details to our emailPasswordLogin
      // function that we imported from our realm/authentication.js
      // to validate the user credentials and log in the user into our App.
      const user = await emailPasswordLogin(form.username, form.password);

      if (user) {
        redirectNow();
      }

    } catch (error) {
      if (error.statusCode === 401) {
        alert("Invalid username/password. Try again!");
      } else {
        alert(error);
      }

    }
  };

  return <form style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
    <img src={logo} width='500rem'></img>
    <h2>Login</h2>
    <br></br>
    <TextField
      type="text"
      variant="outlined"
      name="username"
      value={form.username}
      onChange={onFormInputChange}
      InputProps={{
        sx: {
          "& input": {
            textAlign: "center"
          }
        }
      }}
      placeholder="Username"
      style={{ marginBottom: "1rem" }}
    />
    <TextField
      type="password"
      variant="outlined"
      name="password"
      value={form.password}
      onChange={onFormInputChange}
      InputProps={{
        sx: {
          "& input": {
            textAlign: "center"
          }
        }
      }}
      placeholder="Password"
      style={{ marginBottom: "1rem" }}
    />
    <Button variant="contained" color="primary" onClick={onSubmit}>
      Login
    </Button>
    <br></br>
    <p>Don't have an account? Ask your Administrator or Instructor for a token.</p><p><Link to="/register"> Register</Link></p>
  </form>
}

export default Login;