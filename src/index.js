import React from "react";
import ReactDOM from "react-dom";
import "./styles/Common.css";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import Main from "./components/Main";
import store from "./store";
import Header from './router/header';
import GameRoutes from "./components/Routes";

ReactDOM.render(
  // <Router>
  //   <Header />
  //   <Routes>
  //     <Route path="section1" element={<Main />}/>
  //     <Route path="instruction"/>
      
  //   </Routes>
  // </Router>,


  <React.StrictMode>
    <Provider store={store}>
      <GameRoutes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
