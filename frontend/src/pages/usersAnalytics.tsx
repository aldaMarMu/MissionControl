import React, { useState } from "react";
import styled from "@emotion/styled";

import MainLayout from "../components/mainLayout";
import { Section } from "../components/mainHeader";
import { useQuery } from "@apollo/react-hooks";
import { USERS_ANALYTICS_QUERY } from "../apollo/queries";
import { ErrorLoadingPage } from "../components/errorLoading";

// const today = new Date();
export function UsersAnalytics() {
  // const date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [date, setDate] = useState("");
  const [dateQ, setDateQ] = useState("");
  const { data, error, loading } = useQuery(USERS_ANALYTICS_QUERY, {
    variables: { loginAfter: dateQ }
  });
  if (loading) {
    return <ErrorLoadingPage loading={true} />;
  }
  if (error) {
    return <ErrorLoadingPage error={true} />;
  }
  return (
    <MainLayout activeSection={Section.Analytics}>
      <h1>Bitbloq mission analytics</h1>
      <Form>
        <Label>Introducir fecha: </Label>
        <Input
          type="text"
          name="date"
          placeholder="MM/DD/AAAA"
          value={date}
          onChange={event => setDate(event.target.value)}
        ></Input>
        <Button
          type="submit"
          value="Seleccionar"
          onClick={() => setDateQ(date)}
        >
          Actualizar
        </Button>
      </Form>
      {data && data.usersAnalytics && (
        <DataTable>
          <DataRow>
            <NameColumn>Total registrados: </NameColumn>
            <NameColumn> {data.usersAnalytics.registered} </NameColumn>
          </DataRow>
          <DataRow>
            <NameColumn>Total activos: </NameColumn>
            <NameColumn> {data.usersAnalytics.active}</NameColumn>
          </DataRow>
          <DataRow>
            <NameColumn>Total administradores: </NameColumn>
            <NameColumn> {data.usersAnalytics.admin}</NameColumn>
          </DataRow>
          <DataRow>
            <NameColumn>
              Total logados a partir de la fecha indicada {dateQ}:{" "}
            </NameColumn>
            <NameColumn> {data.usersAnalytics.lastLogin}</NameColumn>
          </DataRow>
        </DataTable>
      )}
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

const DataRow = styled.div`
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

const NameColumn = styled.div`
  border-right: 1px solid blue;
  border-left: 1px solid blue;
  width: 50%;
  margin: 1px;
  padding: 10px;
  align-items: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: black;
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const Input = styled.input`
  font-size: 20px;
  margin: 0px 10px;
  padding: 1px;
  margin: 1px;
  height: 30px;
`;

const Label = styled.label`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  font-family: Arial, Helvetica, sans-serif;

  justify-content: center;
  align-items: center;
  background-color: blue;
  color: white;
  font-size: 18px;
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
