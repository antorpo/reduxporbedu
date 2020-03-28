import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import Loader from "../Loader";
import Tabla from "./Tabla";

/*
  Componentes funcionales (Stateless), se declaran como funcion.
  Componentes clase (Stateful), se declaran como clases.
*/
class Usuarios extends Component {

  componentDidMount() {
    this.props.traerTodos();
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    if (this.props.error) {
      return (
        <h3 className="text-danger">{`Error: ${this.props.error.message}`}</h3>
      );
    }

    return (
      <React.Fragment>
        <h1 className="margen">Usuarios</h1>
        <Tabla />
      </React.Fragment>
    );
  }
}

// mapeamos el state a los props.
const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

// connect(_que reducers voy a brindar_, _ActionCreators_)
export default connect(mapStateToProps, usuariosActions)(Usuarios);
