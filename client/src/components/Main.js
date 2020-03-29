import React from "react";
import { ContainerStyle } from "../styles/ContainerStyle";
import Navbar from "./NavBar";
import VastTable from "./VastTable";
import VastForm from "./VastForm";

const Main = (props) => {

  return (
    <>
      <Navbar />
      <ContainerStyle>
        <VastTable />
        <VastForm />
      </ContainerStyle>
    </>
  )
};

export default Main;