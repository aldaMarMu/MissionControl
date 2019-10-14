import React, { useState } from "react";
import styled from "@emotion/styled";

import MainLayout from "../components/mainLayout";
import { Section } from "../components/mainHeader";
import { useQuery } from "@apollo/react-hooks";
import { USERS_ANALYTICS_QUERY } from "../apollo/queries";
import { ErrorLoadingPage } from "../components/errorLoading";

function getPercent(data: number, total: number) {
  return ((data / total) * 100).toFixed(2);
}

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

  const { usersAnalytics: usersData } = data;

  return (
    <MainLayout activeSection={Section.Analytics}>
      <h1>Bitbloq mission analytics</h1>
      {data && data.usersAnalytics && (
        <>
          <DataTable>
            <TitleRow>
              <NameColumn>Tipos de usuarios</NameColumn>
              <DataColumn>Número de usuarios</DataColumn>
              <DataColumn>Porcentaje</DataColumn>
            </TitleRow>
            <DataRow>
              <NameColumn>Registrados: </NameColumn>
              <DataColumn> {usersData.registered} </DataColumn>
              <DataColumn>-</DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Activos: </NameColumn>
              <DataColumn> {usersData.active}</DataColumn>
              <DataColumn>
                {getPercent(usersData.active, usersData.registered)}%
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Total administradores: </NameColumn>
              <DataColumn> {usersData.admin}</DataColumn>
              <DataColumn>
                {getPercent(usersData.admin, usersData.registered)}%
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Publicadores: </NameColumn>
              <DataColumn> {usersData.publisher}</DataColumn>
              <DataColumn>
                {getPercent(usersData.publisher, usersData.registered)}%
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Profesores: </NameColumn>
              <DataColumn> {usersData.teacher}</DataColumn>
              <DataColumn>
                {getPercent(usersData.teacher, usersData.registered)}%
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Profesores pro: </NameColumn>
              <DataColumn> {usersData.teacherPro}</DataColumn>
              <DataColumn>
                {getPercent(usersData.teacherPro, usersData.registered)}%
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Familias: </NameColumn>
              <DataColumn> {usersData.family}</DataColumn>
              <DataColumn>
                {getPercent(usersData.family, usersData.registered)}%
              </DataColumn>
            </DataRow>
          </DataTable>
          <DataTable>
            <DataRow>
              <NameColumn>Logados esta semana</NameColumn>
              <DataColumn> {usersData.lastWeekLogin}</DataColumn>
              <DataColumn>
                {getPercent(usersData.lastWeekLogin, usersData.registered)}%
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Logados hace dos semanas</NameColumn>
              <DataColumn> {usersData.twoWeeksAgoLogin}</DataColumn>
              <DataColumn>
                {getPercent(usersData.twoWeeksAgoLogin, usersData.registered)}%
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Logados hace tres semanas</NameColumn>
              <DataColumn> {usersData.threeWeeksAgoLogin}</DataColumn>
              <DataColumn>
                {getPercent(usersData.threeWeeksAgoLogin, usersData.registered)}
                %
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Logados hace cuatro semanas</NameColumn>
              <DataColumn> {usersData.fourWeeksAgoLogin}</DataColumn>
              <DataColumn>
                {getPercent(usersData.fourWeeksAgoLogin, usersData.registered)}%
              </DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Logados hace cinco semanas</NameColumn>
              <DataColumn> {usersData.fiveWeeksAgoLogin}</DataColumn>
              <DataColumn>
                {getPercent(usersData.fiveWeeksAgoLogin, usersData.registered)}%
              </DataColumn>
            </DataRow>
          </DataTable>

          <DataTable>
            <TitleRow>
              <NameColumn>Estadísticas documentos</NameColumn>
              <DataColumn>Número de documentos</DataColumn>
              <DataColumn>Porcentaje</DataColumn>
            </TitleRow>
            <DataRow>
              <NameColumn>Media de documentos por usuario</NameColumn>
              <DataColumn> {usersData.docsByUserAvg.toFixed(2)}</DataColumn>
              <DataColumn>-</DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Mínimo número de documentos por usuario</NameColumn>
              <DataColumn> {usersData.docsByUserMin}</DataColumn>
              <DataColumn>-</DataColumn>
            </DataRow>
            <DataRow>
              <NameColumn>Máximo número de documentos por usuario</NameColumn>
              <DataColumn> {usersData.docsByUserMax}</DataColumn>
              <DataColumn>-</DataColumn>
            </DataRow>
          </DataTable>
        </>
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
  border: 1px solid blue;
`;

const TitleRow = styled.div`
  border-bottom: 1px solid blue;
  border-top: 1px solid blue;

  align-items: middle;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  height: 40px;
`;

const DataRow = styled.div`
  border-bottom: 1px solid blue;

  align-items: middle;
  display: flex;
  align-items: center;
  justify-content: space-around;
  :hover {
    background-color: #99ccff;
    opacity: 1;
  }
`;

const NameColumn = styled.div`
  border-right: 1px solid blue;
  border-left: 1px solid blue;
  width: 40%;
  margin: 1px;
  padding: 10px;
  align-items: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: black;
  display: flex;
  flex-direction: column;
`;

const DataColumn = styled.div`
  border-right: 1px solid blue;
  width: 30%;
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
  font-size: 15px;
  margin: 0px 10px;
  padding: 1px;
  margin: 1px;
  height: 20px;
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
