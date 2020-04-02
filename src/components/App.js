import React from "react";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Menu from "./Menu";
import Usuarios from "./usuarios";
import Publicaciones from "./publicaciones";
import Tareas from "./tareas";
import Guardar from "./tareas/Guardar";

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
        <Route exact path="/tareas/guardar" component={Guardar} />
        <Route exact path="/tareas/guardar/:usu_id/:tar_id" component={Guardar} />
        <Route exact path="/404" component={NotFound} />
        <Redirect from="*" to="/404"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
