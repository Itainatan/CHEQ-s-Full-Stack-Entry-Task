import React from "react";
import { connect } from "react-redux";
import { ContainerStyle } from "../styles/ContainerStyle";
import Navbar from "./NavBar";
import VastTable from "./VastTable";
import VastForm from "./VastForm";
import { fetchList } from "../store/actions";

const Main = (props) => {
  props.fetchList();

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


export default connect(null, { fetchList })(Main);