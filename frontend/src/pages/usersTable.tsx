import React, { useState } from "react";

import styled from "@emotion/styled";
import MainHeader from "../components/mainHeader";
//import Checkbox from "../components/checkbox" ;
import Switch from "react-switch";

import { usersExample } from "./users_example";

export function UsersTable() {
  const [editActive, setEditActive] = useState("");

  return (
    <Content>
      <MainHeader />
      <h1>Usuarios de Bitbloq</h1>
      <DataTable>
        <TitleRow>
          <NameColumn>
            <h2>e-Mail</h2>
          </NameColumn>
          <TableColumn isTitle={true}>
            <h2>Administrador/a</h2>
          </TableColumn>
          <TableColumn isTitle={true}>
            <h2>Publicador/a</h2>
          </TableColumn>
          <TableColumn isTitle={true}>
            <h2>Profesor/a</h2>
          </TableColumn>
          <TableColumn isTitle={true}>
            <h2>Profesor/a Pro</h2>
          </TableColumn>
          <TableColumn isTitle={true}>
            <h2>Familia</h2>
          </TableColumn>
          <TableColumn isTitle={true}></TableColumn>
        </TitleRow>
        {usersExample.map(user =>
          user.email === editActive ? (
            <DataRow active={true}>
              <NameColumn active={true}>
                <p>{user.email}</p>
              </NameColumn>
              <TableColumn editActive={true}>
                <Switch onChange={() => null} checked={user.admin} />
              </TableColumn>
              <TableColumn editActive={true}>
                <Switch onChange={() => null} checked={user.publisher} />
              </TableColumn>
              <TableColumn editActive={true}>
                <Switch onChange={() => null} checked={user.teacher} />
              </TableColumn>
              <TableColumn editActive={true}>
                <Switch onChange={() => null} checked={user.teacherPro} />
              </TableColumn>
              <TableColumn editActive={true}>
                <Switch onChange={() => null} checked={user.family} />
              </TableColumn>
              <TableColumn editActive={true}>
                <ButtonEdit
                  save={true}
                  value={user.email}
                  onClick={event => setEditActive("")}
                >
                  Guardar
                </ButtonEdit>
                <ButtonEdit
                  cancel={true}
                  value={user.email}
                  onClick={event => setEditActive("")}
                >
                  Cancelar
                </ButtonEdit>
              </TableColumn>
            </DataRow>
          ) : (
            <DataRow active={false}>
              <NameColumn active={false}>
                <p>{user.email}</p>
              </NameColumn>
              <TableColumn>
                <Switch onChange={() => null} checked={user.admin} />
              </TableColumn>
              <TableColumn>
                <Switch onChange={() => null} checked={user.publisher} />
              </TableColumn>
              <TableColumn>
                <Switch onChange={() => null} checked={user.teacher} />
              </TableColumn>
              <TableColumn>
                <Switch onChange={() => null} checked={user.teacherPro} />
              </TableColumn>
              <TableColumn>
                <Switch onChange={() => null} checked={user.family} />
              </TableColumn>
              <TableColumn isTitle={true}>
                <ButtonEdit
                  edit={true}
                  value={user.email}
                  onClick={event => {
                    console.log(event);
                    setEditActive(user.email);
                  }}
                >
                  Editar
                </ButtonEdit>
              </TableColumn>
            </DataRow>
          )
        )}
      </DataTable>
    </Content>
  );
}

export const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 60px;
    margin-bottom: 20px;
    font-weight: 600;
    color: ${props => "blue"};
  }

  p {
    font-size: 24px;
  }
`;

const DataTable = styled.div`
  margin-top: 21px;
  margin-bottom: 21px;
  border-collapse: collapse;
  font-family: Arial, Helvetica, sans-serif;
  color: #333333;
  width: 90%;
  align-items: center;
`;

interface RowProps {
  active?: boolean;
}

const TitleRow = styled.div`
  border-bottom: 1px solid blue;
  border-top: 1px solid blue;
  margin-right: 14px;
  height: 50px;
  align-items: middle;
  display: flex;
  align-items: center;
  height: 51px;
  justify-content: space-around;
  background-color: white;
`;

const DataRow = styled.div<RowProps>`
  border-bottom: 1px solid blue;
  border-top: 1px solid blue;
  margin-right: 14px;
  height: 50px;
  align-items: middle;
  display: flex;
  align-items: center;
  height: 51px;
  justify-content: space-around;
  :hover {
    background-color: #99ccff;
    opacity: 1;
  }
`;

const TableColumn = styled.div<{ isTitle?: boolean; editActive?: boolean }>`
  border-right: 1px solid blue;
  width: 15%;
  margin: 1px;
  padding: 10px;
  align-items: middle;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${props => (props.isTitle ? 1 : props.editActive ? 1 : 0.3)};

  h2 {
    font-size: 15px;
    color: blue;
  }
  p {
    font-size: 15px;
  }
`;

const NameColumn = styled.div<RowProps>`
  border-right: 1px solid blue;
  border-left: 1px solid blue;
  width: 20%;
  margin: 1px;
  padding: 10px;
  align-items: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 15px;
    color: blue;
  }
  p {
    font-size: 15px;
    color: black;
  }
`;

const ButtonEdit = styled.button<{
  edit?: boolean;
  cancel?: boolean;
  save?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => {
    if (props.edit) {
      return "blue";
    }
    if (props.save) {
      return "green";
    }
    if (props.cancel) {
      return "red";
    }
    return "white";
  }};
  color: white;
  font-size: 15px;
  width: 60px;
  height: 40px;
  border-radius: 50px;
  border: none;
  margin-right: 2px;
  &:focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
`;
