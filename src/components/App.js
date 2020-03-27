import React from "react";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Menu from "./Menu";
import Usuarios from "./usuarios";
import Publicaciones from "./publicaciones";

function Tareas(props) {
  return <h1>Tareas Working!</h1>;
}

function NotFound(props){
  return <h1>Error 404: Not found!</h1>
}

function App(props) {
  return (
    <BrowserRouter>
      <Menu />

      <Switch>
        <Route exact path="/" component={Usuarios} />
        <Route exact path="/tareas" component={Tareas} />
        <Route exact path="/publicaciones/:key" component={Publicaciones} />
        <Route exact path="/404" component={NotFound} />
        <Redirect from="*" to="/404"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
