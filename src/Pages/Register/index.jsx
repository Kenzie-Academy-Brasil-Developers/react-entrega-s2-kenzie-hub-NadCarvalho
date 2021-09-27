import { Box, Typography } from "@material-ui/core";

import Container from "../../Components/Container";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Select from "../../Components/Select";

import React from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createUserRequest } from '../../Api'

const courseModules = [
  "Primeiro módulo (Introdução ao Frontend)",
  "Segundo módulo (Frontend Avançado)",
  "Terceiro módulo (Introdução ao Backend)",
  "Quarto módulo (Backend Avançado)"
]

const Index = ({ onRegister }) => {
  let history = useHistory();

  const goToWelcome = () => {
    history.push("/");
  };

  const registerUser = (data) => {
    console.log('ON_REGISTER', data);
    createUserRequest(data).then((response) => {
      console.log('REGISTER', response);
      onRegister(response);
      alert('User created!');
      goToWelcome();
    }).catch((error) => {
      console.error('REGISTER_FAILED', error);
      let message = 'Failed to create user!'
      if (error?.response?.data?.message) {
        message = error?.response?.data?.message;
      }
      alert(message);
    })
  };

  const schema = yup.object().shape({
    name: yup.string().min(3, "Invalid Name").required("Name required")
      .matches(/^[aA-zZ\s]+$/, "Letters only"),
    email: yup.string().email("Invalid Email").required("Email required"),
    contact: yup.string().min(3, "Invalid Contact").required("Contact required"),
    bio: yup.string().min(3, "Invalid Bio").required("Bio required"),
    course_module: yup.string().required("Course Module required").oneOf(courseModules, "Invalid Course Module"),
    password: yup
      .string()
      .required("Password required")
      .min(6, "Must be at least 6 characters")
      .matches(
        /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must have at least one character: uppercase, lowercase, numeric and symbol"
      ),
    passwordConfirm: yup.string().required("Password required").oneOf([yup.ref("password")], "Passwords must be the same"),

  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <Container>
      <Card>
        <Typography variant="subtitle1">Register</Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(registerUser)}>
          <Input
            label="Name"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            input={{ ...register("name") }}
          />
          <Input
            label="Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            input={{ ...register("email") }}
          />
          <Input
            label="Contact"
            error={Boolean(errors.contact)}
            helperText={errors.contact?.message}
            input={{ ...register("contact") }}
          />
          <Input
            label="Bio"
            error={Boolean(errors.bio)}
            helperText={errors.bio?.message}
            multiline
            maxRows={4}
            input={{ ...register("bio") }}
          />
          <Select
            label="Course Module"
            error={Boolean(errors.course_module)}
            helperText={errors.course_module?.message}
            select={register("course_module")}
            menuProps={{ style : { fontSize: '0.88rem' }}}
            defaultValue={''}
            items={courseModules}
          />
          <Input
            label="Password"
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            input={{ ...register("password") }}
          />
          <Input
            label="Password Confirm"
            type="password"
            error={Boolean(errors.passwordConfirm)}
            helperText={errors.passwordConfirm?.message}
            input={{ ...register("passwordConfirm") }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: 12 }}
          >
            <Button type="submit">Register</Button>
            <Button color="secondary" onClick={() => goToWelcome()}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default Index;
