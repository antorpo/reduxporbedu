/*
    Cuando se lanza una accion se pregunta por quien
    tiene dicho type entre todos los reducers, es 
    por esto que nombres repetidos causan errores, ya 
    que se activaran todos los reducers que manejan 
    acciones con el type repetido.
 */
export const TRAER_TODOS = "usuarios_traer_todos";

export const LOADING = "usuarios_loading";

export const ERROR = "usuarios_error";
