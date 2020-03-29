import {
  LOADING,
  ERROR,
  ACTUALIZAR,
  COM_LOADING,
  COM_ERROR,
  COM_ACTUALIZAR
} from "../types/publicacionesTypes";

const INITIAL_STATE = {
  publicaciones: [],
  loading: false,
  error: null,
  com_loading: false,
  com_error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        loading: false,
        error: null
      };

    case LOADING:
      return { ...state, loading: true };

    case ERROR:
      return { ...state, error: action.payload, loading: false };

    case COM_ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        com_loading: false,
        com_error: null
      };

    case COM_LOADING:
      return { ...state, com_loading: true };

    case COM_ERROR:
      return { ...state, com_error: action.payload, com_loading: false };

    default:
      return state;
  }
};
