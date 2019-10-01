import React from "react";
import styled from "@emotion/styled";

import MainLayout from "../components/mainLayout";
import { Section } from "../components/mainHeader";

export function UsersAnalytics() {
  return (
    <MainLayout activeSection={Section.Analytics}>
      <h1>Bitbloq mission control</h1>
      <p>¡Solo para administradores!</p>
    </MainLayout>
  );
}
