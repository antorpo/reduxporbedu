import React, { Component } from "react";
import { connect } from "react-redux"; 
import * as usuariosActions from "../../actions/usuariosActions";

/*
  Componentes funcionales (Stateless), se declaran como funcion.
  Componentes clase (Stateful), se declaran como clases.
*/
class Usuarios extends Component {

  ponerFilas = () =>
    this.props.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));

  componentDidMount() {
    this.props.traerTodos();
  }

 
  render() {
    return (
      <div className="margen">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Enlace</th>
            </tr>
          </thead>
          <tbody>{this.ponerFilas()}</tbody>
        </table>
      </div>
    );
  }
}

// mapeamos el state a los props.
const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

// connect(_que reducers voy a brindar_, _ActionCreators_)
export default connect(mapStateToProps, usuariosActions)(Usuarios);
