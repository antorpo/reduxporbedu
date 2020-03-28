import axios from "axios";
import { LOADING, ERROR , TRAER_POR_USUARIO} from "../types/publicacionesTypes";

  export const traerPorUsuario = (key) => async (dispatch, getState) => {
    const {usuarios} = getState().usuariosReducer;
    const {publicaciones} = getState().publicacionesReducer;
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
      const publicaciones_actualizadas = [
        ...publicaciones, 
        response.data
      ];
  
      dispatch({
        type: TRAER_POR_USUARIO,
        payload: publicaciones_actualizadas
      });
  
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      });
    }
  };