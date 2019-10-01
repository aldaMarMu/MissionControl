import React from "react";
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
  const { data, error, loading } = useQuery(
    USERS_ANALYTICS_QUERY
    //   {
    //   variables: { loginAfter: date }
    // }
  );
  if (loading) {
    return <ErrorLoadingPage loading={true} />;
  }
  if (error) {
    return <ErrorLoadingPage error={true} />;
  }
  return (
    <MainLayout activeSection={Section.Analytics}>
      <h1>Bitbloq mission analytics</h1>
      {data && data.usersAnalytics && (
        <div>
          <p>Total registrados: {data.usersAnalytics.registered}</p>
          <p>Total activos: {data.usersAnalytics.active}</p>
          <p>Total administradores: {data.usersAnalytics.admin}</p>
          <p>Total logados hoy: {data.usersAnalytics.lastLogin}</p>
        </div>
      )}
    </MainLayout>
  );
}
