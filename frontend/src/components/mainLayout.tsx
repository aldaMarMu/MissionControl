import React from "react";

import styled from "@emotion/styled";
import MainHeader, { Section } from "./mainHeader";

export interface MainLayoutProps {
  activeSection?: Section;
}

const MainLayout: React.FC<MainLayoutProps> = ({ activeSection, children }) => {
  return (
    <Content>
      <MainHeader activeSection={activeSection} />
      <Main role="main">{children}</Main>
    </Content>
  );
};

export default MainLayout;

const Main = styled.main`
  margin-top: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Content = styled.div`
/* flex: 1; */
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
/* h1 {
  font-size: 60px;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${props => "blue"};
}

p {
  font-size: 24px;
} */
`;
