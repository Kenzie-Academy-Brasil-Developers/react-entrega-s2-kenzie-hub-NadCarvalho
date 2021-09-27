import { Box, Typography } from "@material-ui/core";

import Container from "../../Components/Container";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

import React from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const Welcome = ({onLogin}) => {
  let history = useHistory();

  const goToRegister = () => {
    history.push("/register");
  };

  const logUser = (data) => {
    onLogin(data.email);
    console.log(data);
  };

  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Required Email"),
    password: yup
      .string()
      .min(6, "At least 6 characters required")
      .required("Required Password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <Container>
      <Card>
        <Typography variant="subtitle1">Login to access KenzieHub</Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(logUser)}>
          <Input
            label="Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            input={{ ...register("email") }}
          />
          <Input
            label="Password"
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            input={{ ...register("password") }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: 12 }}
          >
            <Button type="submit">Login</Button>
            <Button color="secondary" onClick={() => goToRegister()}>
              Register
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default Welcome;
