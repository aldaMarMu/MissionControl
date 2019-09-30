import React, { useState } from "react";

import styled from "@emotion/styled";
import MainHeader from "../components/mainHeader";
//import Checkbox from "../components/checkbox" ;
import Switch from "react-switch";

type User = {
  id: string;
  email: string;
  admin: boolean;
  publisher: boolean;
  teacher: boolean;
  teacherPro: boolean;
  family: boolean;
};

const usersExample: User[] = [
  {
    id: "aa",
    email: "Pepe",
    admin: false,
    publisher: false,
    teacher: false,
    teacherPro: false,
    family: false
  },
  {
    id: "bb",
    email: "Raúl",
    admin: false,
    publisher: false,
    teacher: false,
    teacherPro: false,
    family: false
  },
  {
    id: "cc",
    email: "Juan",
    admin: false,
    publisher: false,
    teacher: true,
    teacherPro: false,
    family: false
  },
  {
    id: "dd",
    email: "Jacinta",
    admin: false,
    publisher: false,
    teacher: false,
    teacherPro: false,
    family: true
  },
  {
    id: "ee",
    email: "Lucia",
    admin: true,
    publisher: false,
    teacher: false,
    teacherPro: false,
    family: false
  },
  {
    id: "ff",
    email: "Julia",
    admin: false,
    publisher: true,
    teacher: false,
    teacherPro: false,
    family: false
  }
  // {id: "aa", email: "Pepe", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Raúl", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Juan", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Jacinta", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Lucia", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Julia", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Pepe", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Raúl", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Juan", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Jacinta", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Lucia", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Julia", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Pepe", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Raúl", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Juan", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Jacinta", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Lucia", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
  // {id: "aa", email: "Julia", admin: false, publisher: false, teacher: false, teacherPro: false, family: false},
];

export function UsersTable() {
  const [editActive, setEditActive] = useState("");

  return (
    <Content>
      <MainHeader />
      <h1>Usuarios de Bitbloq</h1>
      <DataTable>
        <DataRow>
          <NameColumn>
            <h2>e-Mail</h2>
          </NameColumn>
          <TableColumn>
            <h2>Administrador/a</h2>
          </TableColumn>
          <TableColumn>
            <h2>Publicador/a</h2>
          </TableColumn>
          <TableColumn>
            <h2>Profesor/a</h2>
          </TableColumn>
          <TableColumn>
            <h2>Profesor/a Pro</h2>
          </TableColumn>
          <TableColumn>
            <h2>Familia</h2>
          </TableColumn>
          <TableColumn></TableColumn>
        </DataRow>
        {usersExample.map(user =>
          user.email === editActive ? (
            <DataRow active={true}>
              <NameColumn active={true}>
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
              <TableColumn>
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
              <TableColumn>
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

export const DataTable = styled.div`
  margin-top: 21px;
  margin-bottom: 21px;
  border-collapse: collapse;
  font-family: VodafoneRg, Arial, Helvetica, sans-serif;
  color: #333333;
  width: 80%;
  /* justify-content: center; */
  align-items: center;
`;

interface RowProps {
  active?: boolean;
}

const DataRow = styled.div<RowProps>`
  border-bottom: 1px solid #ebebeb;
  border-top: 1px solid #ebebeb;
  margin-right: 14px;
  height: 50px;
  align-items: middle;
  display: flex;
  align-items: center;
  height: 51px;
  justify-content: space-around;
  background-color: ${props => (props.active ? "blue" : "white")};
`;

const TableColumn = styled.div`
  border-right: 1px solid #ebebeb;
  width: 15%;
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
  }
`;

const NameColumn = styled.div<RowProps>`
  border-right: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
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
    color: ${props => (props.active ? "white" : "black")};
  }
`;

const CheckRole = styled.div`
  /* height: 50px; */
`;

const ButtonEdit = styled.button<{ edit?: boolean; cancel?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => {
    if (props.edit) {
      return "blue";
    }
    if (props.cancel) {
      return "red";
    }
    return "white";
  }};
  color: white;
  font-size: 15px;
  width: 80px;
  height: 40px;
  border-radius: 50px;
  border: none;
  margin-right: 5px;
  &:focus {
    outline: none;
  }
`;
