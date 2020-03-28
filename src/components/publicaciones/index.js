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
    const {
      usuariosTraerTodos,
      match: {
        params: { key }
      },
      publicacionesTraerPorUsuario
    } = this.props;

    /* 
       Volvemos asincrono el metodo para esperar siempre 
       que se ejecute primero traer los usuarios, y luego
       traer las publicaciones para no tener un error.
    */
    if (!this.props.usuariosReducer.usuarios.length) {
      await usuariosTraerTodos();
    }

    if (!("publicaciones_key" in this.props.usuariosReducer.usuarios[key])) {
      await publicacionesTraerPorUsuario(key);
    }
  }

  ponerUsuario = () => {
    const {
      usuariosReducer,
      match: {
        params: { key }
      }
    } = this.props;

    if (usuariosReducer.error) {
      return (
        <h3 className="text-danger">{`Error: ${usuariosReducer.error}`}</h3>
      );
    }

    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
      return <Loader />;
    }

    const nombre = usuariosReducer.usuarios[key].name;

    return (
      <div className="margen">
        <h1>Publicaciones de {nombre}</h1>
      </div>
    );
  };

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: {
        params: { key }
      }
    } = this.props;

    if (!usuarios.length) return; // No retornamos nada.
    if (usuariosReducer.error) return; // No hacemos nada porque este error ya se maneja en ponerUsuario().

    if (publicacionesReducer.loading) {
      return <Loader />;
    }

    if (publicacionesReducer.error) {
      return (
        <h3 className="text-danger">{`Error: ${publicacionesReducer.error}`}</h3>
      );
    }

    if (!publicaciones.length) return;

    if (!("publicaciones_key" in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key];

    return publicaciones[publicaciones_key].map(publicacion => (
      <div className="pub_titulo">
        <h3>{publicacion.title}</h3>
        <p>{publicacion.body}</p>
      </div>
    ));
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
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
