import axios from "axios";
import {
  TRAER_TODAS,
  LOADING,
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  AGREGADA
} from "../types/tareasTypes";

export const traerTodas = () => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {};
    response.data.map(
      tar =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar
          }
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error
    });
  }
};

export const cambioUsuarioId = usuario_id => dispatch => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id
  });
};

export const cambioTitulo = titulo => dispatch => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  });
};

export const agregar = nueva_tarea => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    await axios.post("https://jsonplaceholder.typicode.com/todos", nueva_tarea);

    dispatch({
      type: AGREGADA
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      error: error
    });
  }
};
