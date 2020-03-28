import axios from "axios";
import { LOADING, ERROR, ACTUALIZAR } from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

/*
  Al ya existir en los publicacionesTypes debemos
  desestructurarlo con otro nombre.
*/
const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

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

    const nuevas = response.data.map(publicacion => ({
      ...publicacion,
      comentarios: [],
      abierto: false
    }));

    /*
        Concatenamos las publicaciones que ya estan
        con las que vienen nuevas para evitar nuevos
        procesamientos, solo en este caso ya que no 
        se crean nuevas publicaciones por id de usuario.
      */
    const publicaciones_actualizadas = [...publicaciones, nuevas];

    dispatch({
      type: ACTUALIZAR,
      payload: publicaciones_actualizadas
    });

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key
    };

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

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][com_key];

  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto
  };

  const publicaciones_actualizadas = [...publicaciones];
  publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];

  publicaciones_actualizadas[pub_key][com_key] = actualizada;

  dispatch({
    type: ACTUALIZAR,
    payload: publicaciones_actualizadas
  });
};

export const traerComentarios = (pub_key, com_key) => async (
  dispatch,
  getState
) => {
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][com_key];

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`
    );

    const actualizada = {
      ...seleccionada,
      comentarios: response.data
    };

    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];

    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
      type: ACTUALIZAR,
      payload: publicaciones_actualizadas
    });

  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error
    });
  }
};
