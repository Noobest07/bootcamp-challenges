import React, { useState, useEffect, useReducer } from 'react';
import Formulario from '../components/formulario';
import ListaTareas from '../components/listaTareas';
import tareas from '../utils/tareas';

const ACTIONS = {
  CARGAR_TAREAS: 'upload-todos',
  CREAR_TAREA: 'create-todo',
  TOGGLE_TAREA: 'toggle-tarea',
  EDITAR_TAREA: 'editar-tarea',
  ELIMINAR_TAREA: 'eliminar-tarea',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CARGAR_TAREAS:
      return tareas;
    case ACTIONS.CREAR_TAREA:
      return [...state, crearTodo(action.payload.tarea)];
    case ACTIONS.TOGGLE_TAREA:
      return toggleTodo(state, action.payload.id);
    case ACTIONS.EDITAR_TAREA:
      return editarTodo(state, action.payload.nuevaTarea);
    case ACTIONS.ELIMINAR_TAREA:
      return eliminarTodo(state, action.payload.id);
    default:
      return state;
  }
}

function crearTodo(tarea) {
  return {
    id: Math.floor(Math.random * 100),
    titulo: tarea,
    completado: false,
  };
}

function toggleTodo(state, id) {
  return state.map((tarea) =>
    tarea.id === id ? { ...tarea, completado: !tarea.completado } : tarea
  );
}

function editarTodo(state, nuevaTarea) {
  return state.map((tarea) =>
    tarea.id === nuevaTarea.id
      ? {
          id: nuevaTarea.id,
          titulo: nuevaTarea.titulo,
          completado: nuevaTarea.completado,
        }
      : tarea
  );
}

function eliminarTodo(state, id) {
  return state
    .map((tarea) => (tarea.id === id ? null : tarea))
    .filter((tarea) => tarea != null);
}

export default function Principal() {
  // Estados del componente
  const [state, dispatch] = useReducer(reducer, []);
  const [editable, setEditable] = useState(null);

  // Ciclo de vida con hook useEffect
  useEffect(() => {
    dispatch({ type: ACTIONS.CARGAR_TAREAS });
  }, []);

  // función para agregar una nueva tarea
  const handleRegistrar = (tarea) => {
    dispatch({ type: ACTIONS.CREAR_TAREA, payload: { tarea } });
  };

  // función para cambiar el estado de una tarea
  const handleToggle = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_TAREA, payload: { id } });
  };

  // funcion para recibir una tarea que se va a editar
  const recibirEditable = (tarea) => {
    setEditable(tarea);
  };

  // funcion para editar una tarea
  const handleEditar = (nuevaTarea) => {
    dispatch({ type: ACTIONS.EDITAR_TAREA, payload: { nuevaTarea } });
    setEditable(null);
  };

  // Eliminar una tarea
  const handleEliminar = (id) => {
    dispatch({ type: ACTIONS.ELIMINAR_TAREA, payload: { id } });
  };

  // Renderizar el componente
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5 mb-5">Todo list</h1>
        <Formulario
          handleRegistrar={handleRegistrar}
          handleEditar={handleEditar}
          editable={editable}
        />
        <ListaTareas
          listaTareas={state}
          handleToggle={handleToggle}
          handleEliminar={handleEliminar}
          recibirEditable={recibirEditable}
        />
      </div>
    </>
  );
}
