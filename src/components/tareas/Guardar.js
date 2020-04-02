import React, { Component } from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";
import Loader from "../Loader";
import { Redirect } from "react-router-dom";

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id }
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo
    } = this.props;

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    }
  }

  cambioUsuarioId = event => {
    this.props.cambioUsuarioId(event.target.value);
  };

  cambioTitulo = event => {
    this.props.cambioTitulo(event.target.value);
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      usuario_id,
      titulo,
      agregar,
      match: {
        params: { usu_id, tar_id }
      },
      tareas,
      editar
    } = this.props;

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };

    if(usu_id && tar_id){
      const tarea = tareas[usu_id][tar_id];
      const tareaEditada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id
      };

      editar(tareaEditada);
    }else{
      agregar(nueva_tarea);
    }
    
  };

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
      <div className="container">
        {this.props.regresar ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar Tarea</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User Id</label>
            <input
              className="form-control"
              type="number"
              value={this.props.usuario_id}
              onChange={this.cambioUsuarioId}
            />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              value={this.props.titulo}
              onChange={this.cambioTitulo}
            />
          </div>

          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
