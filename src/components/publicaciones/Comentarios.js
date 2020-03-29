import React from "react";
import Loader from "../Loader";
import { connect } from "react-redux";

function Comentarios(props) {
  
  if (props.com_error) {
    return (
      <h3 className="text-danger">{`Error: ${props.com_error.message}`}</h3>
    );
  }

  if (props.com_loading && !props.comentarios.length) {
    return <Loader />;
  }


  const ponerComentarios = () =>
    props.comentarios.map(comentario => (
      <li>
        <b>
          <u>{comentario.email}</u>
        </b>
        <br />
        {comentario.body}
      </li>
    ));

  return <ul>{ponerComentarios()}</ul>;
}

const mapStateToPros = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToPros)(Comentarios);
