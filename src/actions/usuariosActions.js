import axios from "axios";
import { TRAER_TODOS, LOADING, ERROR } from "../types/usuariosTypes";

// () => () => {} Una funcion que retorna otra funcion.
export const traerTodos = () => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    // dispatch: Lanza la accion y se encarga de contactar con el reducer.
    dispatch({
      type: TRAER_TODOS,
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error
    });
  }
};
