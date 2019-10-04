import React from "react";

import MainLayout from "../components/mainLayout";

export const ErrorLoadingPage: React.FC<{
  error?: boolean;
  loading?: boolean;
}> = ({ error, loading }) => {
  return (
    <MainLayout>
      {error && <div>Error... ¿Has iniciado sesión?</div>}
      {loading && <div>Loading...</div>}
    </MainLayout>
  );
};
