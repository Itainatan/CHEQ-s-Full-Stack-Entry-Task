import React from "react";
import { connect } from "react-redux";
import Vast from "./Vast";
import TableHeader from "./TableHeader"

const VastTable = props => {

  const showVasts = () =>
    props.list.map((value, index) =>
      <tbody key={index}>
        <tr>
          <Vast key={index} vast={value} />
        </tr>
      </tbody>
    );

  const { error, list } = props
  return (
    <div>
      {error}
      <table>
        <TableHeader />
        {list && showVasts()}
      </table>
    </div>
  )
}

const maStateToProps = store => {
  return {
    list: store && store.vasts && store.vasts.list,
    error: store && store.sets && store.sets.error
  };
};

export default connect(maStateToProps, {})(VastTable);
