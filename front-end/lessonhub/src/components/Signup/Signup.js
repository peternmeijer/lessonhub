import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import logo from '../../assets/logo-color.png'

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // As explained in the Login page.
  const { emailPasswordSignup } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // As explained in the Login page.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };


  // As explained in the Login page.
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  // As explained in the Login page.
  const onSubmit = async () => {
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  return <form style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
    <img src={logo} width='500rem'></img>
    <h2>Sign Up</h2>
    <br></br>
    <TextField
      type="email"
      name="email"
      value={form.email}
      onInput={onFormInputChange}
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
      onInput={onFormInputChange}
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
      Sign Up
    </Button>
    <br></br>
    <p>Have an account already? <Link to="/login">Login</Link></p>
  </form>
}

export default Signup;