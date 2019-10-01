import React, { FC, useState } from "react";

import styled from "@emotion/styled";

import { useMutation } from "@apollo/react-hooks";
import AccessLayout from "../components/accessLayout";
import { LOGIN_MUTATION } from "../apollo/queries";
import { Redirect, Route } from "react-router";
import { Home } from "./home";

export const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [login] = useMutation(LOGIN_MUTATION);

  const onLoginClick = async () => {
    try {
      const result = await login({ variables: { email, password } });
      await onLoginSuccess(result.data.login);
    } catch (e) {
      setLoginError(true);
      setLoginSuccess(false);
      console.log(e);
    }
  };

  const onLoginSuccess = async (token: string) => {
    await localStorage.setItem("token", token);
    setLoginSuccess(true);
    setLoginError(false);
  };

  return (
    <AccessLayout title="Bitbloq - Login" panelTitle="Entrar">
      {loginSuccess && <Redirect to="/" />}
      <LoginPanel>
        <FormGroup>
          <label>Correo electrónico</label>
          <Input
            name="email"
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>Contraseña</label>
          <Input
            name="email"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        {loginError && (
          <ErrorMessage>
            Correo electrónico o contraseña no válidos
          </ErrorMessage>
        )}
        <Button onClick={() => onLoginClick()}>Entrar</Button>
      </LoginPanel>
    </AccessLayout>
  );
};

const LoginPanel = styled.div`
  button {
    width: 100%;
    margin-bottom: 10px;
  }

  a {
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    color: #00ade5;
    text-align: center;
    display: block;
    text-decoration: none;
    margin-top: 4px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 10px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  font-style: italic;
  color: #d82b32;
  margin-bottom: 30px;
`;

const Button = styled.button`
  color: blue;
`;

const Link = styled.a`
  text-decoration: none;
`;

const Input = styled.input`
  font-family: Arial, Helvetica, sans-serif;
`;
