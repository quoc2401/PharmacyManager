import React, { FC } from "react";
import { useTitle } from "../../hooks/useTitle";

const Admin: FC = () => {
  useTitle('Pharmacy - Dashboard')

  return (
    <div>Dashboard</div>
  );
};

export default Admin;
