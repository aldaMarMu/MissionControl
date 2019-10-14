import React, { useState } from "react";
import styled from "@emotion/styled";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { Section } from "../components/mainHeader";
import Switch from "react-switch";

import { USERS_QUERY, UPDATEUSERSROLE_MUTATION } from "../apollo/queries";
import MainLayout from "../components/mainLayout";
import { ErrorLoadingPage } from "../components/errorLoading";

type User = {
  id: string;
  email: string;
  admin: boolean;
  publisher: boolean;
  teacher: boolean;
  teacherPro: boolean;
  family: boolean;
};

export function UsersTable() {
  const [editActive, setEditActive] = useState("");
  const [admin, setAdmin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [teacherPro, setTeacherPro] = useState(false);
  const [publisher, setPublisher] = useState(false);
  const [family, setFamily] = useState(false);

  const [updateUserRoles] = useMutation(UPDATEUSERSROLE_MUTATION);
  const { data, error, loading } = useQuery(USERS_QUERY);

  if (loading) {
    return <ErrorLoadingPage loading={true} />;
  }
  if (error) {
    return <ErrorLoadingPage error={true} />;
  }
  return (
    <MainLayout activeSection={Section.Users}>
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
        {data &&
          data.users &&
          (data.users as User[]).map(user =>
            user.email === editActive ? (
              <DataRow active={true} key={user.email}>
                {console.log(user)}
                <NameColumn active={true}>
                  <p>{user.email}</p>
                </NameColumn>
                <TableColumn editActive={true}>
                  <label>
                    <Switch
                      onChange={value => {
                        console.log(value);
                        setAdmin(value);
                      }}
                      checked={user.admin}
                    />
                  </label>
                </TableColumn>
                <TableColumn editActive={true}>
                  <label>
                    <Switch
                      onChange={value => {
                        console.log(value);
                        setPublisher(value);
                      }}
                      checked={user.publisher}
                    />
                  </label>
                </TableColumn>
                <TableColumn editActive={true}>
                  <label>
                    <Switch
                      onChange={value => {
                        console.log(value);
                        setTeacher(value);
                      }}
                      checked={user.teacher}
                    />
                  </label>
                </TableColumn>
                <TableColumn editActive={true}>
                  <label>
                    <Switch
                      onChange={value => {
                        console.log(value);
                        setTeacherPro(value);
                      }}
                      checked={user.teacherPro}
                    />
                  </label>
                </TableColumn>
                <TableColumn editActive={true}>
                  <label>
                    <Switch
                      onChange={value => {
                        console.log(value);
                        setFamily(value);
                      }}
                      checked={user.family}
                    />
                  </label>
                </TableColumn>
                <TableColumn editActive={true}>
                  <ButtonEdit
                    save={true}
                    value={user.email}
                    onClick={async event => {
                      await updateUserRoles({
                        variables: {
                          id: user.id,
                          input: {
                            admin,
                            publisher,
                            teacher,
                            teacherPro,
                            family
                          }
                        }
                      });
                      setEditActive("");
                      window.location.reload(); //TODO: actualizar con el resultado de la mutation
                    }}
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
              <DataRow active={false} key={user.email}>
                <NameColumn active={false}>
                  <p>{user.email}</p>
                </NameColumn>
                <TableColumn>
                  <label>
                    <Switch
                      onChange={() => null}
                      disabled={true}
                      checked={user.admin}
                    />
                  </label>
                </TableColumn>
                <TableColumn>
                  <label>
                    <Switch
                      onChange={() => null}
                      disabled={true}
                      checked={user.publisher}
                    />
                  </label>
                </TableColumn>
                <TableColumn>
                  <label>
                    <Switch
                      onChange={() => null}
                      disabled={true}
                      checked={user.teacher}
                    />
                  </label>
                </TableColumn>
                <TableColumn>
                  <label>
                    <Switch
                      onChange={() => null}
                      disabled={true}
                      checked={user.teacherPro}
                    />
                  </label>
                </TableColumn>
                <TableColumn>
                  <label>
                    <Switch
                      onChange={() => null}
                      disabled={true}
                      checked={user.family}
                    />
                  </label>
                </TableColumn>
                <TableColumn isTitle={true}>
                  <ButtonEdit
                    edit={true}
                    value={user.email}
                    onClick={event => {
                      console.log(event);
                      setEditActive(user.email);
                      setAdmin(user.admin);
                      setTeacher(user.teacher);
                      setTeacherPro(user.teacherPro);
                      setPublisher(user.publisher);
                      setFamily(user.family);
                    }}
                  >
                    Editar
                  </ButtonEdit>
                </TableColumn>
              </DataRow>
            )
          )}
      </DataTable>
    </MainLayout>
  );
}

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
  width: 12%;
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
  width: 29%;
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

interface ButtonEditProps {
  edit?: boolean;
  cancel?: boolean;
  save?: boolean;
}
const ButtonEdit = styled.button<ButtonEditProps>`
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
  font-family: Arial, Helvetica, sans-serif;

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
