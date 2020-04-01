import React, { Component } from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";
import Loader from "../Loader";
import Guardar from "./Guardar";
import { Link } from "react-router-dom";

class Tareas extends Component {
  componentDidMount() {
    if (!this.props.tareas.length) {
      this.props.traerTodas();
    }
  }

  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;

    if (error) {
      return <h3 className="text-danger">{`Error: ${error.message}`}</h3>;
    }

    if (cargando) {
      return <Loader />;
    }

    return Object.keys(tareas).map(usu_id => (
      <div key={usu_id}>
        <h2>Usuario {usu_id}</h2>
        <div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
      </div>
    ));
  };

  ponerTareas = usu_id => {
    const { tareas } = this.props;
    const por_usuario = {
      ...tareas[usu_id]
    };

    return Object.keys(por_usuario).map(tar_id => (
      <div key={tar_id}>
        <input type="checkbox" defaultChecked={por_usuario[tar_id].completed} />
        {por_usuario[tar_id].title}
      </div>
    ));
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Link className="btn btn-primary" to="/tareas/guardar">
          Agregar
        </Link>
        <div>{this.mostrarContenido()}</div>;
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
