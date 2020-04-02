import {
  TRAER_TODAS,
  LOADING,
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
  LIMPIAR
} from "../types/tareasTypes";

const INITIAL_STATE = {
  tareas: {},
  loading: false,
  error: null,
  usuario_id: "",
  titulo: "",
  regresar: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODAS:
      return {
        ...state,
        tareas: action.payload,
        loading: false,
        error: null,
        regresar: false
      };

    case CAMBIO_USUARIO_ID:
      return { ...state, usuario_id: action.payload };

    case CAMBIO_TITULO:
      return { ...state, titulo: action.payload };

    case GUARDAR:
      return {
        ...state,
        tareas: {},
        loading: false,
        error: null,
        titulo: "",
        usuario_id: "",
        regresar: true
      };

    case ACTUALIZAR:
      return {...state, tareas: action.payload};

    case LIMPIAR:
      return {...state, usuario_id: "", titulo: ""};

    case LOADING:
      return { ...state, loading: true};

    case ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
