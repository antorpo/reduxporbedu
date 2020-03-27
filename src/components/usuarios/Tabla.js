import React from "react";

function Tabla(props) {
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
        <tbody>{props.ponerFilas()}</tbody>
      </table>
    </div>
  );
}

export default Tabla;
