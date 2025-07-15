import PropTypes from 'prop-types';

import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  apiDeleteTasks,
  apiGetProfile,
  apiGetTasks,
  apiPostNewTask,
  apiPostProfile,
  apiPutReset,
  apiPutTask,
  apiPutTasks,
} from '../../utils/api-calls';

const AppDataContext = createContext();
const defaultState = { tasks: [] };

const appDataReducer = (state, action) => {
  if (action.reset) {
    apiPutReset();
    return { ...defaultState };
  }

  const persist = action.persist != false;
  const newState = { ...defaultState };

  if (typeof action?.profile !== 'undefined') {
    newState.profile = action.profile;

    if (persist) {
      apiPostProfile(newState.profile);
    }
  } else {
    newState.profile = state.profile;
  }

  if (typeof action?.tasks !== 'undefined') {
    newState.tasks = [...action.tasks];

    if (persist) {
      apiPutTasks(action.tasks);
    }
  } else {
    newState.tasks = state.tasks;
  }

  return newState;
};

export const AppDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appDataReducer, { ...defaultState });

  const init = async () => {
    const profile = await apiGetProfile();
    dispatch({ profile, persist: false });

    if (profile) {
      const tasks = await apiGetTasks();
      dispatch({ tasks, persist: false });
    }
  };

  const newTask = async (task) => {
    const response = await apiPostNewTask(task);
    dispatch({ tasks: [response, ...(state.tasks ?? [])], persist: false });
  };

  const updateTask = async ({ id, ...task }) => {
    const newTasks = [...state.tasks];

    const updTask = newTasks.find((t) => t.id === id);
    Object.assign(updTask, task);

    const result = await apiPutTask(updTask);

    Object.assign(updTask, result.data);

    dispatch({ tasks: newTasks, persist: false });
  };

  const deleteTasks = async (ids) => {
    await apiDeleteTasks(ids);
    const newTasks = [];

    state.tasks.forEach((task) => {
      // not efficient but this are a small app
      if (!ids.includes(task.id)) {
        newTasks.push(task);
      }
    });
    dispatch({ tasks: newTasks, persist: false });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        state,
        dispatch,
        newTask,
        updateTask,
        deleteTasks,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

AppDataProvider.propTypes = {
  children: PropTypes.node,
};

export const useAppDataContext = () => {
  return useContext(AppDataContext);
};
