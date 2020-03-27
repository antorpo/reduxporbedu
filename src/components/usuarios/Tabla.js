import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/*
    En ningun momento pasamos props entre componente padre-hijo,
    sino que nos conectamos directamente con el store a traves de 
    reducer mapeando props con (mapStateToProps).
*/
function Tabla(props) {
  const ponerFilas = () =>
    props.usuarios.map((usuario, key) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
        <td>
          <Link to={`/publicaciones/${key}`}>
            <div className="eye-solid icon" />
          </Link>
        </td>
      </tr>
    ));

  return (
    <div className="margen">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Enlace</th>
            <th scope="col"/>
          </tr>
        </thead>
        <tbody>{ponerFilas()}</tbody>
      </table>
    </div>
  );
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps)(Tabla);
