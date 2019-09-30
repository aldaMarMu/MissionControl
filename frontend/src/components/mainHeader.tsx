import React from "react";
import styled from "@emotion/styled";

import {
  useMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
  MenuDisclosure
} from "reakit/Menu";

import logobeta from "../images/logo-beta.svg";

const MainHeader: React.FC = () => {
  const sections = useMenuState({ placement: "auto-start" });
  const profile = useMenuState({ placement: "auto-end" });
  return (
    <Header>
      <img src={logobeta} />
      <HeaderUser>
        {window.localStorage.getItem("authToken") ? (
          <p>Usuario</p>
        ) : (
          <p>Iniciar sesión</p>
        )}
      </HeaderUser>
    </Header>
  );
};

export default MainHeader;

const Header = styled.div`
  background-color: white;
  display: flex;
  min-height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  margin: 0px 50px;
  border-bottom: 1px solid rgb(204, 204, 204);
  width: 100%;

  img {
    margin-left: 50px;
    height: 50px;
  }
`;

const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const HeaderButton = styled.button`
  padding: 0px 20px;
  svg {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
`;
