import React from "react";

import styled from "@emotion/styled";

export const MainLayout = styled.div`
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