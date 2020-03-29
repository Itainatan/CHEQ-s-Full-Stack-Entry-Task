import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";
import { Routes } from "./Routes";
import { ERROR, SET_LIST } from "./store/types";

async function fetchList() {
  try {
    const res = await axios.get("/api/vasts/fetch_vasts");
    store.dispatch({ type: SET_LIST, payload: res.data.list });
  }
  catch (err) {
    store.dispatch({ type: ERROR, payload: err });
  }
};

const App = () => {
  fetchList();

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
};

export default App;
