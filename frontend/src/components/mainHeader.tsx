import React from "react";
import styled from "@emotion/styled";

import {
  useMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
  MenuDisclosure
} from "reakit/Menu";

import logobeta from "../images/logo-beta.svg";

export enum Section {
  Users = "users",
  Analytics = "analytics"
}
export interface MainHeaderProps {
  activeSection?: Section;
}

const MainHeader: React.FC<MainHeaderProps> = ({ activeSection }) => {
  const sections = useMenuState({ placement: "auto-start" });
  const profile = useMenuState({ placement: "auto-end" });
  return (
    <Header>
      <a href="/">
        <img src={logobeta} />
      </a>
      <Left>
        <MainNav aria-label="Navegación principal" role="navigation">
          <MenuItems>
            <MenuItem selected={activeSection === Section.Users}>
              <a href="/usersTable">Tabla de usuarios</a>
            </MenuItem>
            <MenuItem selected={activeSection === Section.Analytics}>
              <a href="/usersAnalytics">Analíticas</a>
            </MenuItem>
          </MenuItems>
        </MainNav>
      </Left>
      <HeaderUser>
        {window.localStorage.getItem("token") ? (
          <div>
            <p>Administrador/a</p>
            <HeaderButton
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Cerrar sesión
            </HeaderButton>
          </div>
        ) : (
          <a href="/login">Iniciar sesión</a>
        )}
      </HeaderUser>
    </Header>
  );
};

export default MainHeader;

const Header = styled.div`
  background-color: white;
  display: flex;
  min-height: 70px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  margin: 0px 50px;
  border-bottom: 1px solid rgb(204, 204, 204);
  width: 100%;

  img {
    margin-left: 50px;
    height: 55px;
  }
`;

const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
  a {
    color: black;
    text-decoration: none;
    font-size: 20px;
  }
`;

const HeaderButton = styled.button`
  padding: 0px 20px;
  svg {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
`;

const MainNav = styled.nav``;

const MenuItems = styled.ul`
  display: flex;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
`;

interface MenuItemProps {
  selected: boolean;
}
const MenuItem = styled.li<MenuItemProps>`
  font-size: 20px;
  text-decoration: none;
  margin-right: 10px;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: ${props => (props.selected ? "blue" : "black")};
    text-decoration: none;
    margin: 0px 20px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const ParentMenuItem = styled(MenuDisclosure)`
  font-family: Arial, Helvetica, sans-serif;
  padding: 0px;
  cursor: pointer;
  border: none;
  background: none;
  height: 76px;
  box-sizing: content-box;
  border-bottom: 2px solid blue;

  &:focus {
    outline: none;
  }
`;

const SubMenu = styled(ReakitMenu)`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  background-color: blue;
  z-index: 20;
`;

const SubMenuItem = styled(ReakitMenuItem)`
  background: none;
  border: none;
  height: 40px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }

  &:focus {
    outline: none;
  }
`;
