import React, { Component } from "react";
import axios from "axios";
import Loader from "../components/Loader";

/*
  Componentes funcionales (Stateless), se declaran como funcion.
  Componentes clase (Stateful), se declaran como clases.
*/
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarios: [],
      loading: true,
      error: null
    };
  }

  ponerFilas = () =>
    this.state.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      this.setState({
        loading: false,
        usuarios: response.data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.error) {
      return (
        <h3 className="text-danger">{`Error: ${this.state.error.message}`}</h3>
      );
    }

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

export default App;
