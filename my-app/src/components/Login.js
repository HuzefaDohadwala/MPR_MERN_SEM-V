import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Login = () => {
  const history = useNavigate(); // Use useNavigate hook at the component's top-level scope
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext); // Use the setUser function from the UserContext
  // error state
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login form submitted");
      console.log("Sending request to /login route");
      const res = await axios.post("http://localhost:5000/login", inputs);
      console.log(res);
      console.log("Setting user in state");
      console.log(res.data);
      setUser(res.data); // Set the user state using the setUser function from the UserContext
      history("/member/landing");
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Login</Typography>

          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
            required
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
            required
          />
          <Button variant="contained" type="submit">
            "Login"
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </form>
    </div>
  );
};

export default Login;