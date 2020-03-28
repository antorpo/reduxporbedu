import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";
import Loader from "../Loader";

// Al haber llamado igual los actions aca desestructuramos para poder diferenciar:
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {
  async componentDidMount() {
    /* 
       Volvemos asincrono el metodo para esperar siempre 
       que se ejecute primero traer los usuarios, y luego
       traer las publicaciones para no tener un error.
    */
    if (!this.props.usuariosReducer.usuarios.length) {
      await this.props.usuariosTraerTodos();
    }

    this.props.publicacionesTraerPorUsuario(this.props.match.params.key);
  }

  render() {
    const keyUser = this.props.match.params.key;
    console.log(this.props);

    if (
      this.props.publicacionesReducer.loading ||
      this.props.usuariosReducer.loading
    ) {
      return <Loader />;
    }

    if (this.props.publicacionesReducer.error) {
      return (
        <h3 className="text-danger">{`Error: ${this.props.publicacionesReducer.error.message}`}</h3>
      );
    }

    return (
      <div className="margen">
        <h1>Publicaciones de {keyUser}</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return { usuariosReducer, publicacionesReducer };
};

const mapDispacthToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario
};

export default connect(mapStateToProps, mapDispacthToProps)(Publicaciones);
