import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";
import Loader from "../Loader";
import Comentarios from "./Comentarios";

// Al haber llamado igual los actions aca desestructuramos para poder diferenciar:
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const {
  traerPorUsuario: publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios
} = publicacionesActions;

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

    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    );
  };

  mostrarInfo = (publicaciones, pub_key) =>
    publicaciones.map((publicacion, com_key) => (
      <div
        className="pub_titulo"
        key={publicacion.id}
        onClick={() =>
          this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)
        }
      >
        <h3>{publicacion.title}</h3>
        <p>{publicacion.body}</p>

        {publicacion.abierto ? <Comentarios /> : ""}
      </div>
    ));

  mostrarComentarios = (pub_key, com_key, comentarios) => {
    this.props.abrirCerrar(pub_key, com_key);
    this.props.traerComentarios(pub_key, com_key);
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
  publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios
};

export default connect(mapStateToProps, mapDispacthToProps)(Publicaciones);
