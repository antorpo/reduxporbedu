import axios from "axios";


// () => () => {} Una funcion que retorna otra funcion.
export const traerTodos = () => async (dispatch) => {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

    // dispatch: Lanza la accion y se encarga de contactar con el reducer.
    dispatch({
        type: "traer_usuarios",
        payload: response.data
    });
};

 