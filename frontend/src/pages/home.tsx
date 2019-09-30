import React from "react";
import styled from "@emotion/styled";

import MainHeader from "../components/mainHeader";

export function Home() {
  return (
    <div>
      <Content>
        <MainHeader></MainHeader>
        <h1>Bitbloq mission control</h1>
        <p>¡Solo para administradores!</p>
      </Content>
    </div>
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
