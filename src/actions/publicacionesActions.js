import axios from "axios";
import { LOADING, ERROR, TRAER_POR_USUARIO } from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

/*
  Al ya existir en los publicacionesTypes debemos
  desestructurarlo con otro nombre.
*/
const {TRAER_TODOS: USUARIOS_TRAER_TODOS} =  usuariosTypes;

export const traerPorUsuario = key => async (dispatch, getState) => {
  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.get(
      `http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );

    /*
        Concatenamos las publicaciones que ya estan
        con las que vienen nuevas para evitar nuevos
        procesamientos, solo en este caso ya que no 
        se crean nuevas publicaciones por id de usuario.
      */
    const publicaciones_actualizadas = [...publicaciones, response.data];

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key
    };

    dispatch({
      type: TRAER_POR_USUARIO,
      payload: publicaciones_actualizadas
    });

    /*
      Aca se ve como el dispatch puede llamar a cualquier
      reducer todo depende del type, por esto mucho cuidado
      con los types repetidos por que se puede llamar varios
      reducers.
    */
    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error
    });
  }
};
