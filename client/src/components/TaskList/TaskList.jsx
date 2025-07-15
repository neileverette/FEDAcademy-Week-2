import PropTypes from 'prop-types';
import classNames from 'classnames';
import TaskCard from '../TaskCard/TaskCard';

import './task-list.scss';
import { useEffect, useRef, useState } from 'react';
import { useAppDataContext } from '../AppData';
import { EditTask } from '../EditTask';
import { Button, Checkbox, Search } from '@carbon/react';

const blockClass = `task-list`;

export const TaskList = ({ actions, className, taskFilter, options }) => {
  const appData = useAppDataContext();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchedTasks, setSearchedTasks] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const refEditTaskDialog = useRef();
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (id) => {
    const editTask = appData.state.tasks.find((task) => task.id === id);
    setEditingTask(editTask);
  };

  const handleEditTaskForm = (newTask) => {
    const task = { ...editingTask, ...newTask };
    setEditingTask(null);
    appData.updateTask(task);
  };

  const handleEditTaskClose = () => {
    setEditingTask(null);
  };

  useEffect(() => {
    setSearchedTasks(
      search.length > 0
        ? tasks.filter((task) => {
            const rgx = new RegExp(search);
            return rgx.test(task.title);
          })
        : tasks,
    );
  }, [search, tasks]);

  useEffect(() => {
    setSearch('');
  }, [tasks]);

  useEffect(() => {
    setTasks(
      appData.state?.tasks
        ?.filter(taskFilter)
        .sort((a, b) => b.created.value.localeCompare(a.created.value)),
    );
  }, [appData.state.tasks, taskFilter]);

  const handleSelectMode = () => {
    setSelectMode((prev) => !prev);
  };

  useEffect(() => {
    // reset selected
    setSelected([]);
  }, [selectMode]);

  const handleDone = (checked, id) => {
    appData.updateTask({
      done: checked,
      doneDate: checked
        ? { type: 'date', value: new Date().toISOString() }
        : undefined,
      id,
    });
  };

  const handleSelect = (checked, id) => {
    setSelected((prev) => {
      const newSelected = [...prev];

      if (checked) {
        newSelected.push(id);
      } else {
        const index = newSelected.indexOf(id);
        if (index > -1) {
          newSelected.splice(index, 1);
        }
      }

      return newSelected;
    });
  };

  const handleActionClick = async (action) => {
    await action.onClick(selected);
    if (action.selectMode) {
      setSelectMode(false);
    }
  };

  const handleSearchChange = (ev) => {
    console.log('handling search');
    setSearch(ev.target.value);
  };

  return (
    <div>
      <div className={`${blockClass}__controls`}>
        <Search
          className={`${blockClass}__search`}
          aria-label='Task search'
          onChange={handleSearchChange}
          value={search}
          placeholder='Search tasks'
          type='search'
          size='lg'
          labelText='Search tasks'
        />
        {actions &&
          actions.map(
            (action) =>
              ((selectMode && action.selectMode) ||
                (!selectMode && !action.selectMode)) && (
                <Button
                  className={action.className}
                  key={action.label}
                  onClick={() => handleActionClick(action)}
                  disabled={action.selectMode && selected.length === 0}
                  kind={action.kind}
                >
                  {action.label}
                </Button>
              ),
          )}

        {selectMode ? (
          <Button onClick={handleSelectMode} kind='secondary'>
            Cancel
          </Button>
        ) : (
          <Button
            onClick={handleSelectMode}
            disabled={tasks.length === 0}
            kind='secondary'
          >
            Select...
          </Button>
        )}
      </div>

      <ul className={classNames(className, blockClass)}>
        {searchedTasks?.map(({ id, done, portfolio, description, title }) => {
          const footer = (
            <>
              <div className={`${blockClass}__state`} key={`done-${id}`}>
                <Checkbox
                  className={`${blockClass}__state-input`}
                  id={`done-${id}`}
                  checked={done}
                  onChange={(ev) => handleDone(ev.target.checked, id)}
                  disabled={!options?.canComplete}
                  labelText='Task completed'
                />
              </div>
              {selectMode && (
                <div className={`${blockClass}__state`} key={`selected-${id}`}>
                  <Checkbox
                    className={`${blockClass}__state-input`}
                    id={`selected-${id}`}
                    type='checkbox'
                    checked={selected.includes(id)}
                    onChange={(ev) => handleSelect(ev.target.checked, id)}
                    labelText='Selected'
                  />
                </div>
              )}
            </>
          );

          return (
            <li className='task-list__item' key={id}>
              <TaskCard
                id={id}
                onClick={() => handleEditTask(id)}
                // href={`/tasks/task/:${id}`}
                description={description}
                title={title}
                done={done}
                portfolio={portfolio}
                footer={footer}
              ></TaskCard>
            </li>
          );
        })}
      </ul>

      <EditTask
        ref={refEditTaskDialog}
        onSubmit={handleEditTaskForm}
        task={editingTask}
        open={editingTask !== null}
        onClose={handleEditTaskClose}
      />
    </div>
  );
};

TaskList.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func,
      selectMode: PropTypes.bool,
    }),
  ),
  className: PropTypes.string,
  taskFilter: PropTypes.func,
  options: PropTypes.shape({
    canComplete: PropTypes.bool,
  }),
};

export default TaskList;
